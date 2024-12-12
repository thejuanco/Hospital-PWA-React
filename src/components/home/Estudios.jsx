import React, { useEffect, useState } from "react";
import useAxios from "../../api/api.auth";
import Sidebar from "./Sidebar";
import { ThreeDots } from "react-loader-spinner";
import Modal from "react-modal";

const Estudios = () => {
  const [estudios, setEstudios] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedEstudio, setSelectedEstudio] = useState(null);
  const [formData, setFormData] = useState({});
  const intanceAPI = useAxios();

  useEffect(() => {
    const getStudios = async () => {
      try {
        const result = await intanceAPI.get("/estudios");
        setEstudios(result.data);
      } catch (error) {
        console.log(error);
      }
    };
    getStudios();
  }, []);

  const openModal = (estudio) => {
    setSelectedEstudio(estudio);
    setFormData(estudio); // Rellenar el formulario con los datos actuales
    setIsModalOpen(true);
  };

  const openCreateModal = () => {
    setFormData({
      Tipo: "",
      Nivel_Urgencia: "",
      Solicitud_ID: 0,
      Consumibles_ID: 0,
      Estatus: "",
      Total_Costo: 0,
      Dirigido_A: "",
      Observaciones: "",
      Fecha_Registro: new Date().toISOString(),
      Fecha_Actualizacion: new Date().toISOString(),
    });
    setIsCreateModalOpen(true);
  };

  const closeCreateModal = () => setIsCreateModalOpen(false);

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedEstudio(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      // Realiza la actualización mediante la API
      await intanceAPI.put(`/estudios/${selectedEstudio.id}`, formData);
      // Actualiza el estado local
      setEstudios((prev) =>
        prev.map((estudio) =>
          estudio.id === selectedEstudio.id ? formData : estudio
        )
      );
      closeModal();
    } catch (error) {
      console.error("Error al guardar los cambios:", error);
    }
  };

  const handleDelete = async (estudio) => {
    try {
      await intanceAPI.delete(`/estudios/${estudio.id}`);
      setEstudios((prev) => prev.filter((e) => e.id !== estudio.id));
    } catch (error) {
      console.error("Error al eliminar el estudio:", error);
    }
  };

  const handleCreateEstudio = async () => {
    try {
      const response = await intanceAPI.post("/estudios", formData);
      setEstudios((prev) => [...prev, response.data]);
      closeCreateModal();
    } catch (error) {
      console.log("Error al crear el estudio:", error);
    }
  };

  return (
    <>
      <Sidebar />
      <div className="p-4 sm:ml-64">
        <div>
          <div className="flex justify-between">
            <h1 className="text-3xl font-bold">Estudios</h1>
            <button className="bg-gray-900 rounded-full px-4 font-semibold text-center text-gray-100 mr-10"
              onClick={openCreateModal}
            >
              Nuevo Estudio
            </button>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-2 gap-4 mt-10 ">
            {estudios.length == 0 ? (
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
              estudios.map((estudio) => (
                <div
                  key={estudio.id}
                  className="border p-2 rounded-lg hover:bg-gray-100"
                >
                  <p className="font-semibold text-lg">{estudio.Tipo}</p>
                  <p>{estudio.Observaciones}</p>
                  <p>Nivel Urgencia: {estudio.Nivel_Urgencia}</p>
                  <p>{estudio.Dirigido_A}</p>
                  <p>{estudio.Total_Costo}</p>
                  <p>{estudio.Estatus}</p>
                  <div className="flex justify-between mx-10 py-1 mt-2">
                    <button
                      className="bg-gray-900 text-white font-semibold px-10 rounded-full"
                      onClick={() => openModal(estudio)}
                    >
                      Editar
                    </button>
                    <button
                      className="border font-semibold px-10 rounded-full"
                      onClick={() => handleDelete(estudio)}
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
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          contentLabel="Editar Estudio"
          className="bg-white p-8 rounded-lg shadow-lg max-w-2xl mx-auto"
          overlayClassName="bg-black bg-opacity-50 fixed inset-0 flex justify-center items-center"
        >
          <h2 className="text-2xl font-bold mb-6">Editar Estudio</h2>
          {selectedEstudio && (
            <form>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="mb-4">
                  <label className="block font-semibold">Tipo</label>
                  <input
                    type="text"
                    name="Tipo"
                    value={formData.Tipo || ""}
                    onChange={handleChange}
                    className="border rounded-lg w-full px-4 py-2"
                  />
                </div>
                <div className="mb-4">
                  <label className="block font-semibold">
                    Nivel de Urgencia
                  </label>
                  <input
                    type="text"
                    name="Nivel_Urgencia"
                    value={formData.Nivel_Urgencia || ""}
                    onChange={handleChange}
                    className="border rounded-lg w-full px-4 py-2"
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
                <div className="mb-4">
                  <label className="block font-semibold">Total Costo</label>
                  <input
                    type="number"
                    name="Total_Costo"
                    value={formData.Total_Costo || ""}
                    onChange={handleChange}
                    className="border rounded-lg w-full px-4 py-2"
                  />
                </div>
                <div className="mb-4 col-span-2">
                  <label className="block font-semibold">Dirigido A</label>
                  <input
                    type="text"
                    name="Dirigido_A"
                    value={formData.Dirigido_A || ""}
                    onChange={handleChange}
                    className="border rounded-lg w-full px-4 py-2"
                  />
                </div>
                <div className="mb-4 col-span-2">
                  <label className="block font-semibold">Observaciones</label>
                  <textarea
                    name="Observaciones"
                    value={formData.Observaciones || ""}
                    onChange={handleChange}
                    className="border rounded-lg w-full px-4 py-2 h-24"
                  />
                </div>
              </div>
              <div className="flex justify-end mt-6">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 mr-4 rounded-lg border"
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  onClick={handleSave}
                  className="bg-gray-900 text-white px-4 py-2 rounded-lg"
                >
                  Guardar
                </button>
              </div>
            </form>
          )}
        </Modal>

        <Modal
          isOpen={isCreateModalOpen}
          onRequestClose={closeCreateModal}
          contentLabel="Crear Estudio"
          className="bg-white p-8 rounded-lg shadow-lg max-w-2xl mx-auto"
          overlayClassName="bg-black bg-opacity-50 fixed inset-0 flex justify-center items-center"
        >
          <h2 className="text-2xl font-bold mb-6">Crear Estudio</h2>
          <form>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="mb-4">
                <label className="block font-semibold">Tipo</label>
                <input
                  type="text"
                  name="Tipo"
                  value={formData.Tipo || ""}
                  onChange={handleChange}
                  className="border rounded-lg w-full px-4 py-2"
                />
              </div>
              <div className="mb-4">
                <label className="block font-semibold">Nivel de Urgencia</label>
                <input
                  type="text"
                  name="Nivel_Urgencia"
                  value={formData.Nivel_Urgencia || ""}
                  onChange={handleChange}
                  className="border rounded-lg w-full px-4 py-2"
                />
              </div>
              <div className="mb-4">
                <label className="block font-semibold">Solicitud ID</label>
                <input
                  type="number"
                  name="Solicitud_ID"
                  value={formData.Solicitud_ID || ""}
                  onChange={handleChange}
                  className="border rounded-lg w-full px-4 py-2"
                />
              </div>
              <div className="mb-4">
                <label className="block font-semibold">Consumibles ID</label>
                <input
                  type="number"
                  name="Consumibles_ID"
                  value={formData.Consumibles_ID || ""}
                  onChange={handleChange}
                  className="border rounded-lg w-full px-4 py-2"
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
              <div className="mb-4">
                <label className="block font-semibold">Total Costo</label>
                <input
                  type="number"
                  name="Total_Costo"
                  value={formData.Total_Costo || ""}
                  onChange={handleChange}
                  className="border rounded-lg w-full px-4 py-2"
                />
              </div>
              <div className="mb-4 col-span-2">
                <label className="block font-semibold">Dirigido A</label>
                <input
                  type="text"
                  name="Dirigido_A"
                  value={formData.Dirigido_A || ""}
                  onChange={handleChange}
                  className="border rounded-lg w-full px-4 py-2"
                />
              </div>
              <div className="mb-4 col-span-2">
                <label className="block font-semibold">Observaciones</label>
                <textarea
                  name="Observaciones"
                  value={formData.Observaciones || ""}
                  onChange={handleChange}
                  className="border rounded-lg w-full px-4 py-2 h-24"
                />
              </div>
            </div>
            <div className="flex justify-end mt-6">
              <button
                type="button"
                onClick={closeCreateModal}
                className="px-4 py-2 mr-4 rounded-lg border"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleCreateEstudio}
                className="bg-gray-900 text-white px-4 py-2 rounded-lg"
              >
                Crear
              </button>
            </div>
          </form>
        </Modal>
      </div>
    </>
  );
};

export default Estudios;
