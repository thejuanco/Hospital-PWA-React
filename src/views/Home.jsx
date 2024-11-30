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
          <div>
            <h1 className='text-4xl text-center font-bold'>Por qué elegir nuestro departamento</h1>
            <p className='text-center text-gray-600 mt-4 text-xl'>Nos dedicamos a proporcionar diagnósticos precisos y atención de calidad con la última tecnología en imagen médica.</p>
          </div>
          </div>
        </div>
      </>
  );
}

export default Home