import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router"; // Cambié `react-router` a `react-router-dom`
import { useAuth } from "../../context/AuthContext";

const Sidebar = () => {
  const { signOut } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false); // Estado para controlar el sidebar
  const sidebarRef = useRef(); // Ref para detectar clics fuera del sidebar

  // Cerrar el sidebar al hacer clic fuera de él
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setSidebarOpen(false); // Cerrar sidebar
      }
    };

    // Añadir el listener para el clic fuera del sidebar
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      // Limpiar el listener cuando el componente se desmonte
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      {/* Contenedor general para el sidebar */}
      <div className="flex flex-col flex-auto flex-shrink-0 antialiased bg-gray-50 text-gray-800">
        {/* Botón de menú para abrir el sidebar en móvil */}
        <div className="md:hidden">
          <button
            className="p-4 text-gray-900"
            onClick={() => setSidebarOpen(!sidebarOpen)} // Cambiar estado para abrir/cerrar
          >
            <span className="material-symbols-rounded">menu</span>
          </button>
        </div>

        {/* Sidebar en dispositivos grandes */}
        <div
          className={`fixed top-0 left-0 w-64 bg-white h-full border-r ${sidebarOpen ? "block" : "hidden"} md:block`} // Mostrar u ocultar en móvil
          ref={sidebarRef}
        >
          <div className="overflow-y-auto overflow-x-hidden flex-grow">
            <ul className="flex flex-col py-4 space-y-1">
              <li>
                <Link
                  to="/dashboard"
                  className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6"
                >
                  <span className="inline-flex justify-center items-center ml-4">
                    <span className="material-symbols-rounded">home</span>
                  </span>
                  <span className="ml-2 text-sm tracking-wide truncate">Dashboard</span>
                </Link>
              </li>

              <li>
                <Link
                  to="/dashboard/estudios"
                  className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6"
                >
                  <span className="inline-flex justify-center items-center ml-4">
                    <span className="material-symbols-rounded">monitor_heart</span>
                  </span>
                  <span className="ml-2 text-sm tracking-wide truncate">Estudios</span>
                </Link>
              </li>

              <li>
                <Link
                  to="/dashboard/resultados-estudios"
                  className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6"
                >
                  <span className="inline-flex justify-center items-center ml-4">
                    <span className="material-symbols-rounded">biotech</span>
                  </span>
                  <span className="ml-2 text-sm tracking-wide truncate">Resultados Estudios</span>
                </Link>
              </li>

              <li>
                <button
                  className="relative flex flex-row items-center h-11 focus:outline-none w-full hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6"
                  onClick={() => {
                    localStorage.clear();
                    signOut();
                    console.log('Sesión cerrada');
                  }}
                >
                  <Link to="/">
                    <span className="inline-flex justify-center items-center ml-4">
                      <span className="material-symbols-rounded">logout</span>
                    </span>
                    <span className="ml-2 text-sm tracking-wide truncate">Cerrar Sesión</span>
                  </Link>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Sidebar desplegable para móviles */}
      {sidebarOpen && (
        <div
          className="fixed top-0 left-0 w-64 bg-white h-full shadow-lg z-50 md:hidden"
          ref={sidebarRef}
        >
          <ul className="flex flex-col py-4 space-y-1">
            <li>
              <Link
                to="/dashboard"
                className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6"
              >
                <span className="inline-flex justify-center items-center ml-4">
                  <span className="material-symbols-rounded">home</span>
                </span>
                <span className="ml-2 text-sm tracking-wide truncate">Dashboard</span>
              </Link>
            </li>

            <li>
              <Link
                to="/dashboard/estudios"
                className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6"
              >
                <span className="inline-flex justify-center items-center ml-4">
                  <span className="material-symbols-rounded">monitor_heart</span>
                </span>
                <span className="ml-2 text-sm tracking-wide truncate">Estudios</span>
              </Link>
            </li>

            <li>
              <Link
                to="/dashboard/resultados-estudios"
                className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6"
              >
                <span className="inline-flex justify-center items-center ml-4">
                  <span className="material-symbols-rounded">biotech</span>
                </span>
                <span className="ml-2 text-sm tracking-wide truncate">Resultados Estudios</span>
              </Link>
            </li>

            <li>
              <button
                className="relative flex flex-row items-center h-11 focus:outline-none w-full hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6"
                onClick={() => {
                  localStorage.clear();
                  signOut();
                  console.log('Sesión cerrada');
                }}
              >
                <Link to="/">
                  <span className="inline-flex justify-center items-center ml-4">
                    <span className="material-symbols-rounded">logout</span>
                  </span>
                  <span className="ml-2 text-sm tracking-wide truncate">Cerrar Sesión</span>
                </Link>
              </button>
            </li>
          </ul>
        </div>
      )}
    </>
  );
};

export default Sidebar;
