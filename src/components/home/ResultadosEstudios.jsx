import React, {useState, useEffect} from 'react'
import { ThreeDots } from 'react-loader-spinner';
import useAxios from '../../api/api.auth';
import Sidebar from './Sidebar'

const ResultadosEstudios = () => {
  const [resultados, setResultados] = useState([]);
  const intanceAPI = useAxios();

  useEffect(() => {
    const getResultados = async () => {
      try {
        const result = await intanceAPI.get('/resultados_estudios');
        setResultados(result.data);
      } catch (error) {
        console.log(error);
      }
    }
    getResultados();
  }, [])

  return (
    <>
      <Sidebar />
      <div className="p-4 sm:ml-64">
        <div>
          <div className="flex justify-between">
            <h1 className="text-3xl font-bold">Resultados de estudios</h1>
            <button className="bg-gray-900 rounded-full px-4 font-semibold text-center text-gray-100 mr-10">
              Nuevo Resultado
            </button>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-2 gap-4 mt-10">
            {resultados.length == 0 ? (
              <div className="flex justify-center items-center mt-12 text-center">
                <p className="text-xl font-bold">Aún no hay estudios</p>
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
              resultados.map((resultado) => (
                <div key={resultado.id} className="border p-2 rounded-lg hover:bg-gray-100">
                  <p className="font-semibold text-lg">{resultado.Resultados}</p>
                  <p>{resultado.Observaciones}</p>
                  <p>{resultado.Folio}</p>
                  <p>{resultado.Estatus}</p>
                  <p>{resultado.Paciente_ID}</p>
                  <div className="flex justify-between mx-10 py-1 mt-2">
                    <button className="bg-gray-900 text-white font-semibold px-10 rounded-full">
                      Editar
                    </button>
                    <button className="border font-semibold px-10 rounded-full">
                      Eliminar
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default ResultadosEstudios