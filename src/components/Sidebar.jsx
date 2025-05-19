import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function Sidebar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const navItems = [
    { to: '/dashboard', label: 'Dashboard' },
    { to: '/revenue', label: 'Revenue Analysis' },
    { to: '/inventory', label: 'Inventory Management' },
    { to: '/register', label: 'Product Registration' },
  ];

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={toggleSidebar}
          className="p-2 bg-gray-800 rounded-md text-white focus:outline-none"
        >
          {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      <div
        className={`
          bg-gray-900 text-white
          lg:w-64 lg:fixed lg:inset-y-0 lg:flex lg:flex-col
          transition-all duration-300 ease-in-out
          ${isSidebarOpen
            ? 'fixed inset-y-0 left-0 w-64 z-40'
            : 'fixed -left-64 w-64 inset-y-0 z-40 lg:left-0'
          }
        `}
      >
        <div className="p-4 border-b border-gray-700 lg:mt-0 mt-12">
          <h1 className="text-xl font-bold text-center">Admin Dashboard</h1>
        </div>
        <nav className="flex-1 pt-4 pb-4 overflow-y-auto">
          <ul className="space-y-2 px-2">
            {navItems.map(item => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  className={({ isActive }) => `
                    flex items-center px-4 py-3 rounded-md
                    transition-colors duration-200
                    hover:bg-gray-800
                    ${isActive ? 'text-blue-400 font-semibold bg-gray-800' : 'text-white'}
                  `}
                  onClick={() => {
                    if (window.innerWidth < 768) {
                      setIsSidebarOpen(false);
                    }
                  }}
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {isSidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-opacity-50 z-30"
          onClick={toggleSidebar}
        />
      )}
      <div className="lg:ml-64 transition-all duration-300">
      </div>
    </>
  );
}