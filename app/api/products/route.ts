import { NextResponse } from "next/server";
import { workspaces, appstream } from "@/utils/awsConfig";


// return all workspaces instances
export const GET = async (req: Request, res: Response) => {
  const workspacesResponse = await workspaces.describeWorkspaces().promise()
  const workspacesWebRespone = await workspaces.describeWorkspaces().promise()
  const appStreamResponse = await appstream.describeFleets().promise()
  return NextResponse.json({
    workspaces: workspacesResponse.Workspaces,
    workspacesWeb: workspacesWebRespone.Workspaces,
    appstream: appStreamResponse.Fleets,
  })
}