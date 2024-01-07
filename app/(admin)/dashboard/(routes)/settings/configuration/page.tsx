import { ConfigurationForm } from '@/app/(admin)/dashboard/(routes)/settings/configuration/ConfigurationForm'
import { prismaClient } from '@/prisma/prismaClient'

const ConfigurationPage = async () => {
  const config = await prismaClient.config.findFirst({})

  return <ConfigurationForm taxRate={config?.taxRate ? config.taxRate : 0} />
}

export default ConfigurationPage
