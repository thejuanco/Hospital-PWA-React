import React, { useEffect, useState } from 'react'
import useAxios from '../../api/api.auth';
import Sidebar from './Sidebar'
import { ThreeDots } from 'react-loader-spinner';

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

              <div className='grid sm:grid-cols-2 md:grid-cols-2 gap-4 mt-10 '>
                {estudios.length == 0 ? (
                  <div className='flex justify-center items-center mt-12 text-center'>
                    <p className='text-xl font-bold'>Aún no hay estudios</p>
                    <ThreeDots
                      visible={true}
                      height="70"
                      width="70"
                      color="#000000"
                      radius="9"
                      ariaLabel="three-dots-loading"
                      wrapperStyle={{}}
                      wrapperClass="mx-6"
                    />
                  </div>
                ) : (
                  estudios.map(estudio => (
                    <div key={estudio.id} className='border p-2 rounded-lg hover:bg-gray-100'>
                      <p className='font-semibold text-lg'>{estudio.Tipo}</p>
                      <p>{estudio.Observaciones}</p>
                      <p>{estudio.Nivel_Urgencia}</p>
                      <p>{estudio.Dirigido_A}</p>
                      <div className='flex justify-between mx-10 py-1 mt-2'>
                        <button className='bg-gray-900 text-white font-semibold px-10 rounded-full'>Editar</button>
                        <button className='border font-semibold px-10 rounded-full'>Eliminar</button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
        </div>
    </>
  )
}

export default Estudios