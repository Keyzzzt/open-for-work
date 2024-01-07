/**
 * Simple timeout
 * @param ms - milliseconds for the timeout
 */
export const sleep = async (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
