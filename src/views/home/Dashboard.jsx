import React from 'react';
import "material-symbols";
import Navbar from '../../components/home/Navbar';
import Sidebar from '../../components/home/Sidebar';
import Estudios from '../../components/home/Estudios';
import ResultadosEstudios from '../../components/home/ResultadosEstudios';

const Dashboard = () => {
  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex flex-grow">
        <Sidebar />
        <div className="flex-grow p-4 bg-gray-50">
          <Estudios />
          <ResultadosEstudios />
        </div>
      </div>
    </div>
  )
}

export default Dashboard