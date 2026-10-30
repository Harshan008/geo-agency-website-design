import {
  clientIpFrom,
  honeypotField,
  intakeLead,
  turnstileField,
} from "@/lib/intake"

const maxBodyBytes = 16 * 1024

function json(body: unknown, status: number) {
  return Response.json(body, {
    status,
    headers: {
      "Cache-Control": "no-store",
      // No Access-Control-Allow-Origin: this endpoint is same-origin only.
      "X-Content-Type-Options": "nosniff",
    },
  })
}

// Same-origin guard. The browser's own CORS rules already block cross-origin
// reads, but a cross-origin POST still reaches the server, so reject it here.
function sameOrigin(request: Request): boolean {
  const origin = request.headers.get("origin")
  if (!origin) return true // non-browser client, e.g. curl
  try {
    const host = request.headers.get("host")
    return new URL(origin).host === host
  } catch {
    return false
  }
}

async function readFields(
  request: Request,
): Promise<Record<string, unknown> | null> {
  const declared = Number(request.headers.get("content-length") ?? "0")
  if (declared > maxBodyBytes) return null

  const contentType = request.headers.get("content-type") ?? ""

  if (contentType.includes("application/json")) {
    const text = await request.text()
    if (text.length > maxBodyBytes) return null
    try {
      const parsed = JSON.parse(text)
      if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return null
      return parsed as Record<string, unknown>
    } catch {
      return null
    }
  }

  if (
    contentType.includes("application/x-www-form-urlencoded") ||
    contentType.includes("multipart/form-data")
  ) {
    const form = await request.formData()
    const fields: Record<string, unknown> = {}
    for (const [key, value] of form.entries()) {
      if (typeof value === "string") fields[key] = value
    }
    return fields
  }

  return null
}

export async function POST(request: Request) {
  if (!sameOrigin(request)) {
    return json({ ok: false, error: "Request rejected." }, 403)
  }

  let fields: Record<string, unknown> | null
  try {
    fields = await readFields(request)
  } catch {
    fields = null
  }

  if (!fields) {
    return json(
      { ok: false, error: "Send a JSON or form body under 16KB." },
      400,
    )
  }

  try {
    const result = await intakeLead(fields, {
      source: typeof fields.source === "string" ? fields.source : "api",
      clientIp: clientIpFrom(request),
      turnstileToken:
        typeof fields[turnstileField] === "string"
          ? (fields[turnstileField] as string)
          : null,
      honeypotValue:
        typeof fields[honeypotField] === "string"
          ? (fields[honeypotField] as string)
          : null,
    })

    if (result.ok) {
      return json({ ok: true, id: result.id, duplicate: result.duplicate }, 201)
    }

    switch (result.kind) {
      case "validation":
        return json({ ok: false, error: "Check the highlighted fields.", fields: result.errors }, 422)
      case "challenge":
        return json({ ok: false, error: "Verification failed. Please try again." }, 400)
      case "bot":
        // Silent success: a bot learns nothing about why it was dropped.
        return json({ ok: true, id: null, duplicate: false }, 201)
      case "rate-limit":
        return json(
          { ok: false, error: "Too many submissions. Try again shortly." },
          429,
        )
      case "unavailable":
        return json(
          { ok: false, error: "We could not save your enquiry. Please email us instead." },
          503,
        )
    }
  } catch (error) {
    // Log server-side only; the client gets no internal detail.
    console.error("[leads] unhandled intake failure:", error)
    return json(
      { ok: false, error: "Something went wrong. Please email us instead." },
      500,
    )
  }
}

export async function GET() {
  return json({ ok: false, error: "Method not allowed." }, 405)
}
