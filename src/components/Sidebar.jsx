
import { NavLink } from 'react-router-dom';

export default function Sidebar() {
  const navItems = [
    { to: '/dashboard', label: 'Dashboard' },
    { to: '/revenue', label: 'Revenue Analysis' },
    { to: '/inventory', label: 'Inventory Management' },
    { to: '/register', label: 'Product Registration' },
  ];

  return (
    <aside className="w-64 bg-gray-800 text-white h-full p-4">
      <h2 className="text-xl font-bold mb-6">Admin Dashboard</h2>
      <nav className="flex flex-col gap-4">
        {navItems.map(item => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              isActive ? 'text-blue-400 font-semibold' : 'text-white'
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
