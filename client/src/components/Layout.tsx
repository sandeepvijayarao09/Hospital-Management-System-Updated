import React, { useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Layout: React.FC = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="flex h-screen bg-gray-100 font-sans text-gray-900 overflow-hidden">
            {/* Sidebar */}
            <aside className={`fixed inset-y-0 left-0 z-30 w-32 bg-white shadow-md transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} flex flex-col`}>
                <div className="h-16 flex items-center justify-center border-b border-gray-100">
                    <div className="text-lg font-bold text-primary-600">MediCare</div>
                </div>
                <nav className="mt-6 flex-1 px-2 space-y-3">
                    <Link to="/" onClick={() => setIsSidebarOpen(false)} className="flex flex-col items-center justify-center py-3 px-2 rounded-lg transition duration-200 hover:bg-primary-50 hover:text-primary-600 group">
                        <svg className="w-6 h-6 mb-1 text-gray-400 group-hover:text-primary-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                        </svg>
                        <span className="text-xs font-medium">Dashboard</span>
                    </Link>

                    {(user?.role === 'admin' || user?.role === 'doctor') && (
                        <Link to="/patients" onClick={() => setIsSidebarOpen(false)} className="flex flex-col items-center justify-center py-3 px-2 rounded-lg transition duration-200 hover:bg-primary-50 hover:text-primary-600 group">
                            <svg className="w-6 h-6 mb-1 text-gray-400 group-hover:text-primary-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                            <span className="text-xs font-medium">Patients</span>
                        </Link>
                    )}

                    <Link to="/appointments" onClick={() => setIsSidebarOpen(false)} className="flex flex-col items-center justify-center py-3 px-2 rounded-lg transition duration-200 hover:bg-primary-50 hover:text-primary-600 group">
                        <svg className="w-6 h-6 mb-1 text-gray-400 group-hover:text-primary-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span className="text-xs font-medium">Appointments</span>
                    </Link>

                    {(user?.role === 'admin' || user?.role === 'patient') && (
                        <Link to="/billing" onClick={() => setIsSidebarOpen(false)} className="flex flex-col items-center justify-center py-3 px-2 rounded-lg transition duration-200 hover:bg-primary-50 hover:text-primary-600 group">
                            <svg className="w-6 h-6 mb-1 text-gray-400 group-hover:text-primary-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            <span className="text-xs font-medium">Billing</span>
                        </Link>
                    )}
                </nav>
            </aside>

            {/* Content Wrapper */}
            <div className="flex-1 flex flex-col h-full relative overflow-hidden">
                {/* Top Header */}
                <header className="h-16 bg-white shadow-sm border-b border-gray-200 flex items-center justify-between px-4 md:px-8 z-20">
                    <div className="flex items-center">
                        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 mr-4 md:hidden focus:outline-none text-gray-600">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                {isSidebarOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                                )}
                            </svg>
                        </button>
                        <h2 className="text-lg font-semibold text-gray-700 hidden md:block">Hospital Portal</h2>
                        <span className="text-lg font-bold text-primary-600 md:hidden">MediCare</span>
                    </div>

                    <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-bold text-sm">
                                {user?.name?.charAt(0).toUpperCase()}
                            </div>
                            <div className="hidden md:flex flex-col text-right">
                                <span className="text-sm font-medium text-gray-900">{user?.name}</span>
                                <span className="text-xs text-gray-500 capitalize">{user?.role}</span>
                            </div>
                        </div>
                        <div className="h-6 w-px bg-gray-200 mx-2"></div>
                        <button onClick={handleLogout} className="text-sm font-medium text-gray-500 hover:text-red-600 transition-colors">
                            Logout
                        </button>
                    </div>
                </header>

                {/* Main Content Area */}
                <main className="flex-1 overflow-y-auto p-4 md:p-8 bg-gray-50 flex flex-col">
                    <div className="flex-grow">
                        <Outlet />
                    </div>

                    {/* Footer */}
                    <footer className="mt-12 pt-6 border-t border-gray-200 text-center text-sm text-gray-500">
                        <p>&copy; {new Date().getFullYear()} MediCare Hospital System. All rights reserved.</p>
                        <div className="mt-2 space-x-4">
                            <a href="#" className="hover:text-primary-600 transition-colors">Privacy Policy</a>
                            <a href="#" className="hover:text-primary-600 transition-colors">Terms of Service</a>
                            <a href="#" className="hover:text-primary-600 transition-colors">Support</a>
                        </div>
                    </footer>
                </main>
            </div>

            {/* Overlay for mobile */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black opacity-50 z-10 md:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                ></div>
            )}
        </div>
    );
};

export default Layout;
