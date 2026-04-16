import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  BiGridAlt, 
  BiTask, 
  BiCalendarCheck, 
  BiWrench, 
  BiGroup, 
  BiBell, 
  BiBarChartSquare, 
  BiUser, 
  BiLogOut 
} from 'react-icons/bi';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';

const AdminSidebar = () => {
  const { logout } = useAuth();

  const menuItems = [
    { name: 'Dashboard', icon: <BiGridAlt />, path: '/admin/dashboard' },
    { name: 'Manage Resources', icon: <BiTask />, path: '/admin/resources' },
    { name: 'Manage Bookings', icon: <BiCalendarCheck />, path: '/admin/bookings' },
    { name: 'Manage Tickets', icon: <BiWrench />, path: '/admin/tickets' },
    { name: 'Manage Users', icon: <BiGroup />, path: '/admin/users' },
    { name: 'Notifications', icon: <BiBell />, path: '/admin/notifications' },
    { name: 'Reports / Analytics', icon: <BiBarChartSquare />, path: '/admin/reports' },
    { name: 'Profile', icon: <BiUser />, path: '/admin/profile' },
  ];

  return (
    <motion.div 
      initial={{ x: -280 }}
      animate={{ x: 0 }}
      className="bg-dark bg-opacity-75 vh-100 position-fixed start-0 top-0 border-end border-white border-opacity-10 d-none d-lg-flex flex-column"
      style={{ width: '280px', zIndex: 1000, backdropFilter: 'blur(30px)' }}
    >
      <div className="p-4 mb-3 border-bottom border-white border-opacity-5">
        <h3 className="h5 fw-bold gradient-text mb-0">Admin Central</h3>
        <p className="small text-secondary mb-0">Smart Campus Hub</p>
      </div>

      <nav className="flex-grow-1 px-3 mt-3 overflow-auto">
        {menuItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) => 
              `nav-link d-flex align-items-center gap-3 px-3 py-3 rounded-3 mb-1 transition-all ${
                isActive ? 'bg-primary text-white shadow-sm' : 'text-secondary hover-bg-white-10'
              }`
            }
          >
            {item.icon}
            <span className="small fw-medium">{item.name}</span>
          </NavLink>
        ))}
      </nav>

      <div className="p-3 border-top border-white border-opacity-10">
        <button
          onClick={logout}
          className="btn btn-link nav-link d-flex align-items-center gap-3 px-3 py-3 rounded-3 w-100 text-danger border-0 text-start text-decoration-none hover-bg-danger-10"
        >
          <BiLogOut />
          <span className="small fw-medium">Logout</span>
        </button>
      </div>

      <style>{`
        .hover-bg-white-10:hover { background-color: rgba(255, 255, 255, 0.05); }
        .hover-bg-danger-10:hover { background-color: rgba(220, 53, 69, 0.1); }
      `}</style>
    </motion.div>
  );
};

export default AdminSidebar;
