import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';

interface DashboardLayoutProps {
    children: React.ReactNode;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {

    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Sidebar for desktop - always visible */}
            <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
                <Sidebar isOpen={true} onClose={() => { }} />
            </div>

            {/* Mobile sidebar overlay */}
            <div className={`lg:hidden fixed inset-0 bg-black/35 bg-opacity-50 z-40 transition-opacity duration-300 ${sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
                }`} onClick={() => setSidebarOpen(false)} />

            {/* Mobile sidebar with animation */}
            <div className={`lg:hidden fixed inset-y-0 left-0 z-50 w-64 transform transition-transform duration-300 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'
                }`}>
                <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
            </div>

            {/* main content area  */}
            <div className="lg:pl-64">
                {/* Top header */}
                <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

                {/* Main content  < here we put all content of each page in dashvoard >*/}
                <main className="p-6 pt-26">
                    {children}
                </main>
            </div>
        </div>
    );
};