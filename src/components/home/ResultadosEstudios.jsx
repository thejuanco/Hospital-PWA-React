import React, { useState, useEffect } from "react";
import { ThreeDots } from "react-loader-spinner";
import useAxios from "../../api/api.auth";
import Sidebar from "./Sidebar";
import Modal from "react-modal";

const ResultadosEstudios = () => {
  const [resultados, setResultados] = useState([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    Paciente_ID: 0,
    Personal_Medico_ID: 0,
    Estudio_ID: 0,
    Folio: "",
    Resultados: "",
    Observaciones: "",
    Estatus: "",
    Fecha_Registro: new Date().toISOString(),
    Fecha_Actualizacion: new Date().toISOString(),
  });
  const [selectedResultado, setSelectedResultado] = useState(null);
  const intanceAPI = useAxios();

  useEffect(() => {
    const getResultados = async () => {
      try {
        const result = await intanceAPI.get("/resultados_estudios");
        setResultados(result.data);
      } catch (error) {
        console.log(error);
      }
    };
    getResultados();
  }, []);

  const openCreateModal = () => {
    setIsCreateModalOpen(true);
  };
  const closeCreateModal = () => {
    setIsCreateModalOpen(false);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const openEditModal = (resultado) => {
    setSelectedResultado(resultado);
    setFormData(resultado); // Pre-cargar los datos en el formulario
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedResultado(null);
  };

  const handleEditResultado = async () => {
    try {
      const response = await intanceAPI.put(
        `/resultados_estudios/${selectedResultado.id}`,
        formData
      );
      setResultados((prev) =>
        prev.map((resultado) =>
          resultado.id === selectedResultado.id ? response.data : resultado
        )
      );
      closeEditModal();
    } catch (error) {
      console.log("Error al editar el resultado:", error);
    }
  };

  const handleCreateResultado = async () => {
    try {
      const response = await intanceAPI.post("/resultados_estudios/", formData);
      setResultados((prev) => [...prev, response.data]);
      console.log(response.data)
      closeCreateModal();
    } catch (error) {
      console.log("Error al crear el resultado:", error);
    }
  };

  const handleDelete = async (resultado) => {
    try {
      await intanceAPI.delete(`/resultados_estudios/${resultado.id}`);
      setResultados((prev) => prev.filter((r) => r.id !== resultado.id));
      console.log(`Resultado con id ${resultado.id} eliminado con éxito.`);
    } catch (error) {
      console.error("Error al eliminar el resultado de estudio:", error);
    }
  };
  
  return (
    <>
      <Sidebar />
      <div className="p-4 sm:ml-64">
        <div>
          <div className="flex justify-between">
            <h1 className="text-3xl font-bold">Resultados de estudios</h1>
            <button
              className="bg-gray-900 rounded-full px-4 font-semibold text-center text-gray-100 mr-10"
              onClick={openCreateModal}
            >
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
                <div
                  key={resultado.id}
                  className="border p-2 rounded-lg hover:bg-gray-100"
                >
                  <p className="font-semibold text-lg">
                    {resultado.Resultados}
                  </p>
                  <p>{resultado.Observaciones}</p>
                  <p>{resultado.Folio}</p>
                  <p>{resultado.Estatus}</p>
                  <p>{resultado.Paciente_ID}</p>
                  <div className="flex justify-between mx-10 py-1 mt-2">
                    <button className="bg-gray-900 text-white font-semibold px-10 rounded-full"
                      onClick={() => openEditModal(resultado)}
                    >
                      Editar
                    </button>
                    <button className="border font-semibold px-10 rounded-full"
                      onClick={() => handleDelete(resultado)}
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <Modal
          isOpen={isCreateModalOpen}
          onRequestClose={closeCreateModal}
          contentLabel="Crear Resultado de Estudio"
          className="bg-white p-4 rounded-lg shadow-lg max-w-2xl mx-auto"
          overlayClassName="bg-black bg-opacity-50 fixed inset-0 flex justify-center items-center"
        >
          <h2 className="text-2xl font-bold mb-6">
            Crear Resultado de Estudio
          </h2>
          <form>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="mb-4">
                <label className="block font-semibold">Paciente ID</label>{" "}
                <input
                  type="number"
                  name="Paciente_ID"
                  value={formData.Paciente_ID || ""}
                  onChange={handleChange}
                  className="border rounded-lg w-full px-4 py-2"
                />
              </div>
              <div className="mb-4">
                <label className="block font-semibold">
                  Personal Médico ID
                </label>
                <input
                  type="number"
                  name="Personal_Medico_ID"
                  value={formData.Personal_Medico_ID || ""}
                  onChange={handleChange}
                  className="border rounded-lg w-full px-4 py-2"
                />
              </div>
              <div className="mb-4">
                <label className="block font-semibold">Estudio ID</label>{" "}
                <input
                  type="number"
                  name="Estudio_ID"
                  value={formData.Estudio_ID || ""}
                  onChange={handleChange}
                  className="border rounded-lg w-full px-4 py-2"
                />
              </div>
              <div className="mb-4">
                <label className="block font-semibold">Folio</label>{" "}
                <input
                  type="text"
                  name="Folio"
                  value={formData.Folio || ""}
                  onChange={handleChange}
                  className="border rounded-lg w-full px-4 py-2"
                />
              </div>
              <div className="mb-4 col-span-2">
                
                <label className="block font-semibold">Resultados</label>{" "}
                <textarea
                  name="Resultados"
                  value={formData.Resultados || ""}
                  onChange={handleChange}
                  className="border rounded-lg w-full px-4 py-2 h-24"
                />
              </div>
              <div className="mb-4 col-span-2">
                <label className="block font-semibold">
                  Observaciones
                </label>
                <textarea
                  name="Observaciones"
                  value={formData.Observaciones || ""}
                  onChange={handleChange}
                  className="border rounded-lg w-full px-4 py-2 h-18"
                />
              </div>
              <div className="mb-4">
                <label className="block font-semibold">Estatus</label>{" "}
                <input
                  type="text"
                  name="Estatus"
                  value={formData.Estatus || ""}
                  onChange={handleChange}
                  className="border rounded-lg w-full px-4 py-2"
                />
              </div>
            </div>
            <div className="flex justify-end mt-6">
              <button
                type="button"
                onClick={closeCreateModal}
                className="px-4 py-1 mr-4 rounded-lg border"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleCreateResultado}
                className="bg-gray-900 text-white px-4 py-2 rounded-lg"
              >
                Crear
              </button>
            </div>
          </form>
        </Modal>

        <Modal
          isOpen={isEditModalOpen}
          onRequestClose={closeEditModal}
          contentLabel="Editar Resultado de Estudio"
          className="bg-white p-4 rounded-lg shadow-lg max-w-2xl mx-auto"
          overlayClassName="bg-black bg-opacity-50 fixed inset-0 flex justify-center items-center"
        >
          <h2 className="text-2xl font-bold mb-6">Editar Resultado de Estudio</h2>
          {selectedResultado && (
            <form>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="mb-4">
                  <label className="block font-semibold">Folio</label>
                  <input
                    type="text"
                    name="Folio"
                    value={formData.Folio || ""}
                    onChange={handleChange}
                    className="border rounded-lg w-full px-4 py-2"
                  />
                </div>
                <div className="mb-4 col-span-2">
                  <label className="block font-semibold">Resultados</label>
                  <textarea
                    name="Resultados"
                    value={formData.Resultados || ""}
                    onChange={handleChange}
                    className="border rounded-lg w-full px-4 py-2 h-24"
                  />
                </div>
                <div className="mb-4 col-span-2">
                  <label className="block font-semibold">Observaciones</label>
                  <textarea
                    name="Observaciones"
                    value={formData.Observaciones || ""}
                    onChange={handleChange}
                    className="border rounded-lg w-full px-4 py-2 h-18"
                  />
                </div>
                <div className="mb-4">
                  <label className="block font-semibold">Estatus</label>
                  <input
                    type="text"
                    name="Estatus"
                    value={formData.Estatus || ""}
                    onChange={handleChange}
                    className="border rounded-lg w-full px-4 py-2"
                  />
                </div>
              </div>
              <div className="flex justify-end mt-6">
                <button
                  type="button"
                  onClick={closeEditModal}
                  className="px-4 py-1 mr-4 rounded-lg border"
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  onClick={handleEditResultado}
                  className="bg-gray-900 text-white px-4 py-2 rounded-lg"
                >
                  Guardar Cambios
                </button>
              </div>
            </form>
          )}
        </Modal>
      </div>
    </>
  );
};

export default ResultadosEstudios;
