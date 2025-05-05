import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import AdminHeader from './AdminHeader';


const AdminLayout = () => {
  return (
    <div className='flex'>
        <Sidebar />
        <div className='flex-1'>
         <AdminHeader /> 
         <div className='p-8'>
         <Outlet />
          </div>  
        </div>
    </div>
  )
}

export default AdminLayout