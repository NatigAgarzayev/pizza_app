import React from 'react'
import AdminSidebar from './AdminSidebar'
import { Outlet } from 'react-router-dom'

export default function AdminLayout() {
    return (
        <div className="flex">
            <div>
                <AdminSidebar />
            </div>
            <div className="w-full h-screen bg-orange-50">
                <Outlet />
            </div>
        </div>
    )
}
