import React from 'react'

const StatCard = ({ title, value, color, icon }) => {
  return (
   <>
    <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition flex items-center gap-4">
    
      <div className={`p-3 rounded-full ${color} text-white text-xl`}>
        {icon}
      </div>

    
      <div>
        <h3 className="text-sm text-gray-500">{title}</h3>
        <p className="text-2xl font-bold">{value}</p>
      </div>
    </div>
   </>
  )
}

export default StatCard