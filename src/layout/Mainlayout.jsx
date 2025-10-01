import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import Topbar from '../components/topbar'

const Mainlayout = () => {
    return (
        <>
            <div className='flex h-screen bg-gray-100'>
                <Sidebar />

                <div className='flex flex-col flex-1'>
                    <Topbar />

                    <main className='flex-1 p-6 bg-gray-50 overflow-y-auto'>
                        <Outlet />
                    </main>
                </div>
            </div>
        </>
    )
}

export default Mainlayout