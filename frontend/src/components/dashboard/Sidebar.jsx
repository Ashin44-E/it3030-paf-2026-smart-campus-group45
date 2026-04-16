import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  BiGridAlt, 
  BiCalendarCheck, 
  BiPlusCircle, 
  BiWrench, 
  BiBell, 
  BiUser, 
  BiLogOut 
} from 'react-icons/bi';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';

const Sidebar = () => {
  const { logout } = useAuth();

  const menuItems = [
    { name: 'Dashboard', icon: <BiGridAlt />, path: '/user/dashboard' },
    { name: 'My Bookings', icon: <BiCalendarCheck />, path: '/user/bookings' },
    { name: 'Create Booking', icon: <BiPlusCircle />, path: '/user/create-booking' },
    { name: 'My Tickets', icon: <BiWrench />, path: '/user/tickets' },
    { name: 'Create Ticket', icon: <BiPlusCircle />, path: '/user/create-ticket' },
    { name: 'Notifications', icon: <BiBell />, path: '/user/notifications' },
    { name: 'Profile', icon: <BiUser />, path: '/user/profile' },
  ];

  return (
    <motion.div 
      initial={{ x: -250 }}
      animate={{ x: 0 }}
      className="bg-dark bg-opacity-50 vh-100 position-fixed start-0 top-0 border-end border-white border-opacity-10 d-none d-lg-flex flex-column"
      style={{ width: '260px', zIndex: 1000, backdropFilter: 'blur(20px)' }}
    >
      <div className="p-4 mb-3">
        <h3 className="h5 fw-bold gradient-text mb-0">SmartCampus</h3>
      </div>

      <nav className="flex-grow-1 px-3">
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
          className="btn btn-link nav-link d-flex align-items-center gap-3 px-3 py-3 rounded-3 w-100 text-secondary border-0 text-start text-decoration-none"
        >
          <BiLogOut />
          <span className="small fw-medium">Logout</span>
        </button>
      </div>
    </motion.div>
  );
};

export default Sidebar;
