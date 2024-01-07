import { getUserCount } from '@/helpers/getUserCount'
import { Register } from '@/app/register/(c)/Register'
import { EmptyState } from '@/components/EmptyState'

const RegisterPage = async () => {
  try {
    const usersCount = await getUserCount()
    return <Register isRegistered={!!usersCount} />
  } catch (err) {
    console.error('Failed to get users count: ', err)
    return <EmptyState title='Something went wrong' />
  }
}

export default RegisterPage
