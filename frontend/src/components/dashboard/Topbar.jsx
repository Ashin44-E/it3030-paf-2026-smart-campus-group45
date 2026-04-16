import React from 'react';
import { BiBell, BiLogOut, BiUserCircle } from 'react-icons/bi';
import { useAuth } from '../../context/AuthContext';

const Topbar = ({ notificationCount = 0 }) => {
  const { user, role, logout } = useAuth();

  return (
    <div 
      className="bg-dark bg-opacity-25 border-bottom border-white border-opacity-10 py-2 px-4 position-sticky top-0" 
      style={{ zIndex: 900, backdropFilter: 'blur(20px)' }}
    >
      <div className="d-flex justify-content-between align-items-center">
        <div className="d-lg-none">
          <h3 className="h5 fw-bold gradient-text mb-0">SmartCampus</h3>
        </div>
        
        <div className="ms-auto d-flex align-items-center gap-4">
          <div className="position-relative cursor-pointer">
            <BiBell size={22} className="text-secondary" />
            {notificationCount > 0 && (
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style={{ fontSize: '0.6rem' }}>
                {notificationCount}
              </span>
            )}
          </div>

          <div className="d-flex align-items-center gap-3 border-start border-white border-opacity-10 ps-4">
            <div className="text-end d-none d-sm-block">
              <p className="small fw-semibold mb-0 text-white">{user}</p>
              <span className="badge bg-primary bg-opacity-10 text-primary border border-primary border-opacity-25" style={{ fontSize: '0.65rem' }}>
                {role}
              </span>
            </div>
            <div className="dropdown">
              <div 
                className="cursor-pointer" 
                data-bs-toggle="dropdown" 
                aria-expanded="false"
              >
                <BiUserCircle size={36} className="text-secondary" />
              </div>
              <ul className="dropdown-menu dropdown-menu-end shadow-lg border-white border-opacity-10 bg-dark bg-opacity-100 p-2 mt-2">
                <li>
                  <button className="dropdown-item rounded-2 text-white small py-2 d-flex align-items-center gap-2" onClick={() => logout()}>
                    <BiLogOut />
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
