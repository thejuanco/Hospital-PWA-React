import React from 'react'
import Navbar from '../components/auth/Navbar'
import Services from '../components/home/Services';

const Home = () => {
  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
        <Navbar />
        <div className="space-y-20">
          <div className="mt-10">
            <h1 className="font-bold text-5xl text-center">
              Radiogia e Imagen
            </h1>
            <p className="mt-3 font-semibold text-center">
              Diagnosticos precisos con tecnologia de vanguardia
            </p>
          </div>
          <Services />
          </div>
        </div>
      </>
  );
}

export default Home