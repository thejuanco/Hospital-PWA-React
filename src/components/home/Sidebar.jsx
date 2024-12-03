import React from "react";
import { Link } from "react-router";

const Sidebar = () => {
  return (
    <>
      <div className='class="flex flex-col flex-auto flex-shrink-0 antialiased bg-gray-50 text-gray-800'>
        <div className='class="fixed flex flex-col top-0 left-0 w-64 bg-white h-full border-r'>
          <div className="overflow-y-auto overflow-x-hidden flex-grow">
            <ul className="flex flex-col py-4 space-y-1">
              <li>
                <Link
                  to="/dashboard"
                  className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6"
                >
                  <span class="inline-flex justify-center items-center ml-4">
                    <span className="material-symbols-rounded">home</span>
                  </span>
                  <span className="ml-2 text-sm tracking-wide truncate">
                    Dashboard
                  </span>
                </Link>
              </li>

              <li>
                <Link
                  to="/dashboard/estudios"
                  className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6"
                >
                  <span className="inline-flex justify-center items-center ml-4">
                    <span className="material-symbols-rounded">task</span>
                  </span>
                  <span className="ml-2 text-sm tracking-wide truncate">
                    Estudios
                  </span>
                </Link>
              </li>

              <li>
                <Link
                  to="/dashboard/resultados-estudios"
                  className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6"
                >
                  <span className="inline-flex justify-center items-center ml-4">
                    <span className="material-symbols-rounded">workspaces</span>
                  </span>
                  <span className="ml-2 text-sm tracking-wide truncate">
                    Resultados Estudios
                  </span>
                </Link>
              </li>

              <li>
                <button className="relative flex flex-row items-center h-11 focus:outline-none w-full hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6">
                  <Link to="/">
                    <span className="inline-flex justify-center items-center ml-4">
                      <span className="material-symbols-rounded">logout</span>
                    </span>
                    <span className="ml-2 text-sm tracking-wide truncate">
                      Cerrar Sesión
                    </span>
                  </Link>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
