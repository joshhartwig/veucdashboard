import React from 'react'


interface WorkspaceRequest {
  id: string;
  cpu: number;
  ram: string;
  os: 'Windows';
  description: string;
}

const ManageUserPage = () => {
  const workspaceRequests: WorkspaceRequest[] = [
    {
      id: 'workspace-1',
      cpu: 2,
      ram: '4GiB',
      os: 'Windows',
      description: '2 CPU, 4GiB RAM, Windows instance',
    },
    {
      id: 'workspace-2',
      cpu: 4,
      ram: '8GiB',
      os: 'Windows',
      description: '4 CPU, 8GiB RAM, Windows instance',
    },
    {
      id: 'workspace-3',
      cpu: 8,
      ram: '16GiB',
      os: 'Windows',
      description: '8 CPU, 16GiB RAM, Windows instance',
    },
  ];


  return (
    <div className="min-h-screen flex flex-col">
    <header className="flex justify-between items-center p-4 bg-blue-900 shadow-md">
      <span className="text-xl font-bold text-white">Manage Products</span>
    </header>
    <main className="w-full p-6">
      <h1 className="text-3xl font-bold mb-6">Request Products</h1>
      {/* Display workspace requests in a more constrained, single-row layout */}
      <div className="flex flex-wrap justify-start gap-4">
        {workspaceRequests.map((workspace) => (
          <div key={workspace.id} className="w-1/6 p-2 bg-gray-100 rounded-lg flex flex-col items-center shadow-lg">
            <div>
              <h2 className="text-l font-semibold text-center">{workspace.description}</h2>
              <p>CPU: {workspace.cpu}</p>
              <p>RAM: {workspace.ram}</p>
              <p>OS: {workspace.os}</p>
            </div>
            {workspace.os === 'Windows' && (
              <img src="/windows.png" alt="Windows Logo" className="h-12 w-12 mt-2" />
            )}
            <button className="mt-4 py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-700 transition duration-150">
              Request
            </button>
          </div>
        
        ))}
      </div>
      <div>
      <h1 className="text-3xl font-bold mb-6 mt-6">Manage My Products</h1>
      </div>
    </main>
  </div>
  )
}

export default ManageUserPage