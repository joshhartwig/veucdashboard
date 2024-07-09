"use client"
import Image from "next/image";
import { useEffect, useState } from "react";

type Workspace = {
  WorkspaceId: string;
  DirectoryId: string;
  UserName: string;
  IpAddress: string;
  State: string;
  BundleId: string;
  SubnetId: string;
  ComputerName: string;
  WorkspaceProperties: {
    RunningMode: string;
    RunningModeAutoStopTimeoutInMinutes: number;
    RootVolumeSizeGib: number;
    UserVolumeSizeGib: number;
    ComputeTypeName: string;
    OperatingSystemName: string;
  };
  Protocols: string[];
  ModificationStates: string[];
};

type AppStreamFleet = {
  Name: string;
  Arn: string;
  InstanceType: string;
  FleetType: string;
  ComputeCapacityStatus: {
    DesiredInstances: number;
    RunningInstances: number;
    InUseInstances: number;
    AvailableInstances: number;
  };
  MaxUserDurationInSeconds: number;
  DisconnectTimeoutInSeconds: number;
  State: string;
  VpcConfig: {
    SubnetIds: string[];
    SecurityGroupIds: string[];
  };
  CreatedTime: string;
  FleetErrors: {
    ErrorCode: string;
    ErrorMessage: string;
  }[];
};

type Products = {
  workspaces: Workspace[];
  workspacesWeb: Workspace[];
  appstream: AppStreamFleet[];
};

export default function Home() {

  const [products, setProducts] = useState<Products>({
    workspaces: [],
    workspacesWeb: [],
    appstream: []
  })

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products')
        if (!response.ok) {
          throw new Error('Failed to fetch products')
        }

        const data = await response.json()
        setProducts(data)

      } catch (error) {
        console.error('Erorr fetching products')
      }
    }
    fetchProducts()
  }, [])

  const getLogoSrc = (osName: string) => {
    if (osName.toLowerCase().includes('windows')) {
      return '/windows.png';
    } else if (osName.toLowerCase().includes('linux') || osName.toLowerCase().includes('ubuntu')) {
      return '/linux.png';
    } else {
      return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
    <header className="flex justify-between items-center p-4 bg-white shadow-md">
      <div className="flex items-center">
        {/* <img src="vm.png" alt="Logo" className="h-20 w-auto mr-4" /> */}
        <span className="text-xl font-bold">Virtual Request Portal</span>
      </div>
      <nav>
        <a href="/admin" className="text-blue-500 hover:underline">Administration</a>
      </nav>
    </header>
    <div className="flex flex-grow">
      <aside className="w-1/5 p-6 bg-gray-800 text-white">
        <nav>
          <ul>
            <li className="mb-4">
              <a href="/pending-requests" className="text-blue-400 hover:underline">Pending Requests</a>
            </li>
            <li className="mb-4">
              <a href="/new-requests" className="text-blue-400 hover:underline">New Requests</a>
            </li>
            <li className="mb-4">
              <a href="/manage" className="text-blue-400 hover:underline">Manage</a>
            </li>
          </ul>
        </nav>
      </aside>
      <main className="w-3/4 p-6">
        <h1 className="text-3xl font-bold mb-6">My Products</h1>

        <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">WorkSpaces</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.workspaces.map((workspace) => (
                <div key={workspace.WorkspaceId} className="border p-4 rounded-lg shadow flex flex-col items-center">
                  {getLogoSrc(workspace.WorkspaceProperties.OperatingSystemName) && (
                    <img
                      src={getLogoSrc(workspace.WorkspaceProperties.OperatingSystemName)}
                      alt="OS Logo"
                      className="h-14 w-15 mb-4"
                    />
                  )}
                  <p className="text-sm text-gray-600">Operating System: {workspace.WorkspaceProperties.OperatingSystemName}</p>
                  <p className="text-sm text-gray-600">State: {workspace.State}</p>
                  <p className="text-sm text-gray-600">IP Address: {workspace.IpAddress}</p>
                  <button
                    className="bg-blue-500 text-white p-2 mt-4 rounded"
                    onClick={() => launchWorkspaces(workspace.WorkspaceId)}
                  >
                    Launch
                  </button>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">WorkSpaces Web</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.workspacesWeb.map((workspaceWeb) => (
                <div key={workspaceWeb.WorkspaceId} className="border p-4 rounded-lg shadow flex flex-col items-center">
                  {/* {getLogoSrc(workspaceWeb.WorkspaceProperties.OperatingSystemName) && (
                    <img
                      src={getLogoSrc(workspaceWeb.WorkspaceProperties.OperatingSystemName)}
                      alt="OS Logo"
                      className="h-16 w-16 mb-4"
                    />
                  )} */}
                  <h3 className="text-lg font-medium">{workspaceWeb.UserName}</h3>
                  <p className="text-sm text-gray-600">Operating System: {workspaceWeb.WorkspaceProperties.OperatingSystemName}</p>
                  <p className="text-sm text-gray-600">State: {workspaceWeb.State}</p>
                  <p className="text-sm text-gray-600">IP Address: {workspaceWeb.IpAddress}</p>
                  <button
                    className="bg-blue-500 text-white p-2 mt-4 rounded"
                    onClick={() => launchWorkspacesWeb(workspaceWeb.WorkspaceId)}
                  >
                    Launch
                  </button>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">AppStream</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.appstream.map((fleet) => (
                <div key={fleet.Name} className="border p-4 rounded-lg shadow flex flex-col items-center">
                  <h3 className="text-lg font-medium">{fleet.Name}</h3>
                  {/* Assuming you also want to display the OS logo for AppStream, you can adjust based on actual data */}
                  {getLogoSrc(fleet.InstanceType) && (
                    <img
                      src={getLogoSrc(fleet.InstanceType)}
                      alt="OS Logo"
                      className="h-16 w-16 mb-4"
                    />
                  )}
                  <p className="text-sm text-gray-600">State: {fleet.State}</p>
                  <button
                    className="bg-blue-500 text-white p-2 mt-4 rounded"
                    onClick={() => launchAppStream(fleet.Name)}
                  >
                    Launch
                  </button>
                </div>
              ))}
            </div>
          </section>
      </main>
    </div>
  </div>
  );
}

const launchWorkspaces = (workspaceId: string) => {
  window.open(`https://client.workspaces.aws/web/${workspaceId}`, '_blank')
}

const launchWorkspacesWeb = (workspaceId: string) => {
  window.open(`https://client.workspaces.aws/web/${workspaceId}`, '_blank')
}

const launchAppStream = (fleetName: string) => {
  window.open(`https://appstream2.aws.amazon.com/fleets/${fleetName}`, '_blank')
}
