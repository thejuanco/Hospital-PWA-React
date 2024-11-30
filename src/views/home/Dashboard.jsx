import React from 'react';
import "material-symbols";
import Navbar from '../../components/home/Navbar';
import Sidebar from '../../components/home/Sidebar';
import Estudios from '../../components/home/Estudios';
import ResultadosEstudios from '../../components/home/ResultadosEstudios';

const Dashboard = () => {
  return (
    <>
        <Navbar />
        <Sidebar />
        <div className='p-4 sm:ml-64'>
          <Estudios />
          <ResultadosEstudios/>
        </div>
    </>
  )
}

export default Dashboard