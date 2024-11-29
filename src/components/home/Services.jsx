import React from 'react'

const Services = () => {

    const services = [
        {name: 'Radiografía', description: 'Explorar Radiologia', icon_name: 'description'},
        {name: 'Estudio de imagen', description: 'Explorar Estudio de imagen', icon_name: 'medical_services'},
        {name: 'Tomografia computarizada', description: 'Explorar Tomografia', icon_name: 'neurology'},
        {name: 'Resonancia Magentica', description: 'Explorar Resonancia Magentica', icon_name: 'monitor_heart'},
        {name: 'Medicina Nuclear', description: 'Explorar Medicina Nuclear', icon_name: 'biotech'},
        {name: 'Radiologia Intervencionista', description: 'Explorar Radiologia Intervenista', icon_name: 'stethoscope_check'}
    ];

  return (
    <>
      <div className="mx-10">
        <h1 className="font-bold text-3xl m-4">Nuestros servicios</h1>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 p-2">
            {services.map(services => (
                <div className="flex flex-col p-3 border rounded-lg bg-white hover:scale-105 transition-transform duration-300 transform">
                    <div className="flex flex-row items-center space-y-0 pb-2 justify-between">
                        <h2 className="text-xl font-bold">{services.name}</h2>
                        <span className="material-symbols-rounded w-6 h-6 ml-auto">
                            {services.icon_name}
                        </span>
                    </div>
                <p className="text-gray-600">{services.description}</p>
                </div>
            ))}
          </div>
      </div>
    </>
  );
}

export default Services