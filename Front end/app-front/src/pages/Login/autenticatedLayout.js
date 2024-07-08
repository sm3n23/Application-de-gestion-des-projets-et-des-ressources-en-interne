import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../../layout/sidebar'

const AuthenticatedLayout = () => {
    return (
        <div>
            <Sidebar />
            <div className="main-content">
                <Outlet />
            </div>
        </div>
    );
};

export default AuthenticatedLayout;