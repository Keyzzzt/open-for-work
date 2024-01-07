/**
 * Validates request body
 * @param body - request payload
 * @param Schema - zod schema for validation
 */
export const validateBody = (body: unknown, Schema: any) => {
  const result = Schema.safeParse(body)
  let zodErrors = {}
  if (!result.success) {
    result.error.issues.forEach((issue: any) => {
      zodErrors = { ...zodErrors, [issue.path[0]]: issue.message }
    })
  }
  if (Object.keys(zodErrors).length > 0) {
    return zodErrors
  } else {
    return null
  }
}
