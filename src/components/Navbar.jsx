import React from 'react'

const Navbar = () => {
    const nameUser = localStorage.getItem('nombre_usuario')
    
    return (
      <nav className="bg-white shadow-md px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="bg-purple-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-lg font-bold">
            W
          </div>
          <span className="font-semibold text-lg">weihu</span>
        </div>

        <div className="flex-1 ml-8">
          <span className="text-gray-500">Welcome,</span>
          <span className="ml-1 font-medium text-gray-800">
            {nameUser}
          </span>
        </div>

        <div className="relative flex items-center">
          <input
            type="text"
            placeholder="Find something"
            className="bg-gray-100 text-sm rounded-full px-4 py-2 w-72 outline-none focus:ring-2 focus:ring-purple-500"
          />
          <div className="absolute right-3 text-gray-400 text-sm">⌘ K</div>
        </div>

        <div className="flex items-center space-x-4">
          <button className="text-gray-400 hover:text-gray-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 6h7.5m-7.5 6h7.5m-7.5 6h7.5M6 6h.008v.008H6V6zm0 6h.008v.008H6V12zm0 6h.008v.008H6V18z"
              />
            </svg>
          </button>
          <button className="text-gray-400 hover:text-gray-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 17h5l-1.405-1.405a2.032 2.032 0 00-1.28-.595H15v2zm6-3a1.5 1.5 0 00-1.5-1.5H4a1.5 1.5 0 00-1.5 1.5v.75c0 .621.504 1.125 1.125 1.125H20a1.125 1.125 0 001.125-1.125V14z"
              />
            </svg>
          </button>
        </div>
      </nav>
    );
}

export default Navbar