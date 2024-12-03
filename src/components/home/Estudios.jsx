import React, { useEffect, useState } from 'react'
import useAxios from '../../api/api.auth';
import Sidebar from './Sidebar'

const Estudios = () => {

  const intanceAPI = useAxios();

  useEffect(() => {
    const getStudios = async () => {
      try {
        const result = await intanceAPI.get('/estudios')
        console.log(result.data)
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
              Desde estudios
            </div>
        </div>
    </>
  )
}

export default Estudios