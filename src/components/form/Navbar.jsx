import React from 'react'
import { Link } from 'react-router'

const Navbar = () => {
  return (
    <>
      <nav className="bg-gray-100 w-full flex justify-between items-center px-6 py-3 relative">
        <Link to="/" className="font-bold text-2xl">
          Privilege Care
        </Link>
      </nav>
    </>
  );
}

export default Navbar