import { workspaces } from './awsConfig'

const verifyWorkspaces = async () => {
  try {
    const res = await workspaces.describeWorkspaces().promise()
    console.log('Workspaces',res.Workspaces)
  } catch (error) {
    console.error('Error describing Workspaces:', error)
  }
}

verifyWorkspaces()