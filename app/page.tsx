"use client"
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {

  const [products, setProducts] = useState({
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

  return (
   <div className="flex min-h-screen">
    <aside className="w-1/4 p-6 bg-gray-800 text-white">
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
              <div key={workspace.WorkspaceId} className="border p-4">
                <h3 className="text-lg font-medium">{workspace.UserName}</h3>
                <p className="text-sm text-gray-600">{workspace.State}</p>
                <button
                  className="bg-blue-500 text-white p-2 mt-2 rounded"
                  onClick={() => launchWorkspace(workspace.WorkspaceId)}
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
              <div key={fleet.Name} className="border p-4 rounded-lg shadow">
                <h3 className="text-lg font-medium">{fleet.Name}</h3>
                <p className="text-sm text-gray-600">{fleet.State}</p>
                <button
                  className="bg-blue-500 text-white p-2 mt-2 rounded"
                  onClick={() => launchAppStream(fleet.Name)}
                >
                  Launch
                </button>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">AppStream</h2>
          <div className="grid grid-cols-3 gap-4">
            {products.appstream.map((fleet) => (
              <div key={fleet.Name} className="border p-4">
                <h3 className="text-lg">{fleet.Name}</h3>
                <p>{fleet.State}</p>
                <button
                  className="bg-blue-500 text-white p-2 mt-2"
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
