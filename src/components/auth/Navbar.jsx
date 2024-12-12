import React, { useState } from 'react'
import { Link } from 'react-router'
import { useAuth } from '../../context/AuthContext'

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const { isAuthenticated, signOut } = useAuth() // Accede al contexto de autenticación
  const toggleMenu = () => setMenuOpen(!menuOpen)

  return (
    <nav className='bg-gray-100 w-full flex justify-between items-center px-6 py-4 relative'>
      <h1 className='font-bold text-2xl'>Privilege Care</h1>
      <button
        onClick={toggleMenu}
        className='block md:hidden text-gray-800 text-3xl focus:outline-none'
      >
        <span className="material-symbols-rounded ml-2">
          menu
        </span> 
      </button>

      <div className={`md:flex md:space-x-4 ${menuOpen ? 'block' : 'hidden'} absolute md:static top-16 right-6 md:top-0 bg-gray-100 md:bg-transparent rounded-lg p-4 md:p-0 shadow-lg md:shadow-none`}>
        {isAuthenticated ? (
          // Si está autenticado, muestra el botón de Dashboard
          <>
            <Link 
              to='/dashboard'
              className='text-gray-800 font-semibold py-2 px-4 block md:inline-block rounded-md hover:bg-gray-200 transition-colors duration-300'>
              Dashboard
            </Link>
            <button 
              onClick={signOut} 
              className='bg-gray-900 text-white font-semibold py-2 px-4 block md:inline-block rounded-md hover:bg-gray-700 transition-transform duration-300 transform hover:scale-105'>
              Cerrar sesión
            </button>
          </>
        ) : (
          // Si no está autenticado, muestra los botones de login y register
          <>
            <Link 
              to='/auth/login' 
              className='text-gray-800 font-semibold py-2 px-4 block md:inline-block rounded-md hover:bg-gray-200 transition-colors duration-300'>
              Iniciar Sesión
            </Link>
            <Link 
              to='/auth/register' 
              className='bg-gray-900 text-white font-semibold py-2 px-4 block md:inline-block rounded-md hover:bg-gray-700 transition-transform duration-300 transform hover:scale-105'>
              Crear una cuenta
            </Link>
          </>
        )}
      </div> 
    </nav>
  )
}

export default Navbar
