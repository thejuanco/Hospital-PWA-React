import React, { useState, useEffect } from "react";
import useAxios from "../../api/api.auth";
import UrgencyChart from "./UrgencyChart";
import StudyStatusChart from "./StudyStatusChart";

const Home = () => {
  //Estados
  const [studios, setStudios] = useState([]);
  const axiosInstance = useAxios();
  const [queryAPI, setQueryAPI] = useState(true);

  useEffect(() => {
    const fetchStudios = async () => {
      try {
        const response = await axiosInstance.get("/estudios");
        setStudios(response.data);
        console.log(response.data);
        setQueryAPI(false);
      } catch (error) {
        console.error("Error fetching estudios:", error);
      }
    };

    if (queryAPI) {
      fetchStudios();
    }
  }, [queryAPI]);

  return (
    <>
      <div className="p-6">
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <h2 className="font-semibold text-xl p-4">Estudios Pendientes</h2>
          <table className="min-w-full table-auto">
            <thead>
              <tr className="bg-gray-200 text-gray-600 text-sm leading-normal">
                <th className="py-3 px-6 text-left">Tipo</th>
                <th className="py-3 px-6 text-left">Nivel de Urgencia</th>
                <th className="py-3 px-6 text-left">Estatus</th>
                <th className="py-3 px-6 text-left">Costo Total</th>
                <th className="py-3 px-6 text-left">Dirigido A</th>
                <th className="py-3 px-6 text-left">Fecha de Registro</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm font-light">
              {studios.length > 0 ? (
                studios.map((studio) => (
                  <tr
                    key={studio.id}
                    className="border-b border-gray-200 hover:bg-gray-100"
                  >
                    <td className="py-3 px-6 text-left whitespace-nowrap">
                      {studio.Tipo}
                    </td>
                    <td className="py-3 px-6 text-left">
                      {studio.Nivel_Urgencia}
                    </td>
                    <td className="py-3 px-6 text-left">{studio.Estatus}</td>
                    <td className="py-3 px-6 text-left">
                      ${studio.Total_Costo}
                    </td>
                    <td className="py-3 px-6 text-left">{studio.Dirigido_A}</td>
                    <td className="py-3 px-6 text-left">
                      {new Date(studio.Fecha_Registro).toLocaleDateString()}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center py-4">
                    No hay estudios pendientes.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <div className="flex flex-row justify-between items-center mt-6 gap-4">
        <div className="flex-1 min-w-[300px]">
          <UrgencyChart studios={studios} />
        </div>
        <div className="flex-1 min-w-[400px]">
          <StudyStatusChart />
        </div>
      </div>
    </>
  );
};

export default Home;
