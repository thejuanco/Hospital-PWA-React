import React from 'react'

const Navbar = () => {
    const nameUser = localStorage.getItem('nombre_usuario')
    
    return (
      <nav className="bg-white shadow-md px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="bg-purple-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-lg font-bold">
            R
          </div>
          <span className="font-semibold text-lg">Radiologia</span>
        </div>

        <div className="flex-1 ml-8">
          <span className="text-gray-500">Bienvenido,</span>
          <span className="ml-1 font-medium text-gray-800">
            {nameUser}
          </span>
        </div>

        <div className="relative flex items-center mr-10">
          <input
            type="text"
            placeholder="Buscar estudios"
            className="bg-gray-100 text-sm rounded-full px-4 py-2 w-72 outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <div className="absolute right-3 text-gray-400 text-sm">R</div>
        </div>
      </nav>
    );
}

export default Navbar