import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminNavbar from './AdminNav';
import AdminSidebar from './AdminSidebar';

const AdminLayout = () => {
    return (
        <div className="h-screen bg-slate-50 flex flex-col overflow-hidden">
            {/* Top Navbar */}
            <AdminNavbar />

            {/* Workspace: Sidebar + Content */}
            <div className="flex flex-1 overflow-hidden">
                {/* Left Sidebar */}
                <AdminSidebar />

                {/* Right Scrollable Panel */}
                <main className="flex-1 p-6 sm:p-8 overflow-y-auto bg-slate-50">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;
