import React, { useEffect, useState } from 'react'
import useAxios from '../../api/api.auth';
import Sidebar from './Sidebar'

const Estudios = () => {
  const [estudios, setEstudios] = useState([])

  const intanceAPI = useAxios();

  useEffect(() => {
    const getStudios = async () => {
      try {
        const result = await intanceAPI.get('/estudios')
        setEstudios(result.data)
      } catch (error) {
        console.log(error)
      }
    };
    getStudios();
  }, [])

  return (
    <>  
      <Sidebar />
        <div className='p-4 sm:ml-64'>
            <div>
              <div className='flex justify-between'>
                <h1 className='text-3xl font-bold'>Estudios</h1>
                <button className='bg-gray-900 rounded-full px-4 font-semibold text-center text-gray-100 mr-10'>
                  Nuevo Estudio
                </button>
              </div>

              <div className='grid grid-cols-2 gap-4 mt-10 '>
                {estudios.map(estudio => (
                  <div key={estudio.id} className='border p-2 rounded-lg hover:bg-gray-100'>
                    <p>{estudio.Tipo}</p>
                    <p>{estudio.Nivel_Urgencia}</p>
                    <p>{estudio.Observaciones}</p>
                    <p>{estudio.Dirigido_A}</p>
                  </div>
                ))}
              </div>
            </div>
        </div>
    </>
  )
}

export default Estudios