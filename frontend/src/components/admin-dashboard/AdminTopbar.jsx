import React from 'react';
import { BiBell, BiSearch, BiUserCircle, BiLogOut } from 'react-icons/bi';
import { useAuth } from '../../context/AuthContext';

const AdminTopbar = () => {
  const { user, logout } = useAuth();

  return (
    <div 
      className="bg-dark bg-opacity-50 border-bottom border-white border-opacity-10 py-2 px-4 position-sticky top-0" 
      style={{ zIndex: 999, backdropFilter: 'blur(30px)' }}
    >
      <div className="d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center flex-grow-1" style={{ maxWidth: '400px' }}>
          <div className="input-group input-group-sm bg-dark bg-opacity-25 rounded-3 border border-white border-opacity-10">
            <span className="input-group-text bg-transparent border-0 text-secondary">
              <BiSearch size={18} />
            </span>
            <input 
              type="text" 
              className="form-control bg-transparent border-0 text-white shadow-none" 
              placeholder="Search resources, users, or tickets..." 
              style={{ fontSize: '0.85rem' }}
            />
          </div>
        </div>
        
        <div className="ms-auto d-flex align-items-center gap-4">
          <div className="position-relative cursor-pointer hover-opacity-75">
            <BiBell size={22} className="text-secondary" />
            <span className="position-absolute top-0 start-100 translate-middle p-1 bg-danger border border-light rounded-circle" style={{ width: '8px', height: '8px' }}></span>
          </div>

          <div className="d-flex align-items-center gap-3 border-start border-white border-opacity-10 ps-4">
            <div className="text-end d-none d-sm-block">
              <p className="small fw-bold mb-0 text-white">{user}</p>
              <span className="badge bg-danger bg-opacity-10 text-danger border border-danger border-opacity-25 py-1 px-2" style={{ fontSize: '0.65rem' }}>
                ADMIN PANEL
              </span>
            </div>
            
            <div className="dropdown">
              <div 
                className="cursor-pointer d-flex align-items-center gap-2" 
                data-bs-toggle="dropdown" 
                aria-expanded="false"
              >
                <BiUserCircle size={36} className="text-secondary" />
              </div>
              <ul className="dropdown-menu dropdown-menu-end shadow-lg border-white border-opacity-10 bg-dark bg-opacity-100 p-2 mt-2" style={{ minWidth: '200px' }}>
                <li className="px-3 py-2 mb-2 border-bottom border-white border-opacity-5">
                  <p className="small fw-bold text-white mb-0">{user}</p>
                  <p className="text-secondary mb-0" style={{ fontSize: '0.75rem' }}>System Administrator</p>
                </li>
                <li>
                  <button className="dropdown-item rounded-2 text-danger small py-2 d-flex align-items-center gap-2 mt-1" onClick={logout}>
                    <BiLogOut /> Logout
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <style>{`
        .hover-opacity-75:hover { opacity: 0.75; }
        .cursor-pointer { cursor: pointer; }
      `}</style>
    </div>
  );
};

export default AdminTopbar;
