// Types and enums shared by server and client code. Safe to import from
// client components: no database or runtime dependencies.

export const leadStatuses = [
  "new",
  "contacted",
  "qualified",
  "won",
  "archived",
] as const
export type LeadStatus = (typeof leadStatuses)[number]

export const notificationStatuses = ["pending", "sent", "failed"] as const
export type NotificationStatus = (typeof notificationStatuses)[number]

export type LeadRecord = {
  id: string
  created_at: string
  name: string | null
  email: string
  phone: string | null
  company: string | null
  website: string | null
  service: string | null
  budget: string | null
  message: string | null
  source: string
  status: LeadStatus
  notification_status: NotificationStatus
  notified_at: string | null
}

export function isLeadStatus(value: unknown): value is LeadStatus {
  return (
    typeof value === "string" && (leadStatuses as readonly string[]).includes(value)
  )
}
