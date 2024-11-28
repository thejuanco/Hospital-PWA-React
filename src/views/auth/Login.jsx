import React from 'react'
import { useForm } from 'react-hook-form'

const Login = () => {

    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
        reset
    } = useForm();

    const onSubmit = (data) => {
        console.log(data);
        reset();
    }

  return (
    <>
      <div>
        <div className="flex justify-center items-center">
          <div className="mt-16 md:w-1/4 sm:w-1/2 sm:m-10">
            <h1 className="text-black font-semibold text-2xl">
              Radiologia e Imagen
            </h1>
            <h1 className="text-gray-500 text-2xl font-semibold ">
              Inicia Sesión en cuenta
            </h1>

            <form onSubmit={handleSubmit(onSubmit)} className="mt-10 mb-6">
              <div className="space-y-4">
                <div className='space-y-2'>
                    <label className="font-semibold" htmlFor="Nombre_Usuario">Nombre</label>
                    <input type="text" placeholder="Tu nombre" id='Nombre_Usuario' className="w-full p-2 rounded-lg border"/>
                </div>

                <div className='space-y-2'>
                    <label className="font-semibold" htmlFor="Correo_Electronico">Correo Electronico</label>
                    <input type="text" id='Correo_Electronico' placeholder="Tu correo electronico" className="w-full p-2 rounded-lg border"/>
                </div>

                <div className='space-y-2'>
                    <label className="font-semibold" htmlFor="Contrasena">Contraseña</label>
                    <input type="text" id='Contrasena' placeholder="**********" className="w-full p-2 rounded-lg border"/>
                </div>

                <div className='space-y-2'>
                    <label className="font-semibold" htmlFor="Numero_Telefonico_Movil">Telefono</label>
                    <input type="text" id='Numero_Telefonico_Movil' placeholder="776113****" className="w-full p-2 rounded-lg border"/>
                </div>
              </div>

              <button className="bg-purple-800 text-white w-full mt-8 py-2 font-semibold rounded-lg hover:bg-purple-700">
                Continuar
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login