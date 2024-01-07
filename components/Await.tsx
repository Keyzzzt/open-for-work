import { ReactElement } from 'react'

export default async function Await<T>({
  promise,
  children,
}: {
  promise: Promise<T>
  children: (value: T) => ReactElement
}) {
  let data = await promise

  return children(data)
}
