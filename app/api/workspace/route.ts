import { NextResponse } from "next/server";
import { workspaces } from "@/utils/awsConfig";

// return all workspaces instances
export const GET = async (req: Request, res: Response) => {
  const ws = await workspaces.describeWorkspaces().promise()
  return NextResponse.json({
    data: ws
  })
}