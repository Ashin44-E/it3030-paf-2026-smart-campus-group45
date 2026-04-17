import React from 'react';
import { motion } from 'framer-motion';
import { BiGroup, BiUserCircle, BiShieldQuarter, BiWrench, BiDotsVerticalRounded } from 'react-icons/bi';

const UserManagementPanel = ({ users = [], onChangeRole }) => {
  const getRoleBadge = (role) => {
    switch (role) {
      case 'ADMIN': return 'badge bg-danger bg-opacity-10 text-danger border border-danger border-opacity-25';
      case 'TECHNICIAN': return 'badge bg-warning bg-opacity-10 text-warning border border-warning border-opacity-25';
      default: return 'badge bg-primary bg-opacity-10 text-primary border border-primary border-opacity-25';
    }
  };

  const getProviderIcon = (provider) => {
    if (provider === 'GOOGLE') return <span className="text-info small ms-1" title="Google OAuth">G</span>;
    return <span className="text-secondary small ms-1" title="Local Account">L</span>;
  };

  return (
    <div className="glass-card p-4 border border-white border-opacity-10 h-100 shadow-lg">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="h6 fw-bold mb-0 d-flex align-items-center gap-2 text-white">
          <BiGroup size={18} className="text-secondary" />
          System User Directory
        </h3>
        <div className="input-group input-group-sm w-auto">
          <input type="text" className="form-control bg-dark bg-opacity-25 border-white border-opacity-10 text-white small" placeholder="Filter users..." style={{ fontSize: '0.75rem' }} />
        </div>
      </div>

      <div className="table-responsive">
        <table className="table table-dark table-hover table-borderless align-middle mb-0">
          <thead className="text-secondary small text-uppercase" style={{ fontSize: '0.7rem', letterSpacing: '0.05em' }}>
            <tr>
              <th className="fw-medium">User Profile</th>
              <th className="fw-medium text-center">Status</th>
              <th className="fw-medium">Role</th>
              <th className="fw-medium text-end">Action</th>
            </tr>
          </thead>
          <tbody style={{ fontSize: '0.85rem' }}>
            {users.length > 0 ? users.map((user, index) => (
              <motion.tr 
                key={user.id || index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.05 * index }}
                className="border-bottom border-white border-opacity-5"
              >
                <td>
                  <div className="d-flex align-items-center gap-3 py-2">
                    <BiUserCircle size={32} className="text-secondary opacity-50" />
                    <div>
                      <div className="fw-bold text-white d-flex align-items-center">
                        {user.name}
                        {getProviderIcon(user.provider)}
                      </div>
                      <div className="text-secondary small" style={{ fontSize: '0.7rem' }}>{user.email}</div>
                    </div>
                  </div>
                </td>
                <td className="text-center">
                   <span className="p-1 rounded-circle bg-success d-inline-block" style={{ width: '8px', height: '8px' }} title="Active Account"></span>
                </td>
                <td>
                  <span className={getRoleBadge(user.role)}>
                    {user.role}
                  </span>
                </td>
                <td className="text-end">
                  <div className="dropdown position-static">
                    <button className="btn btn-link text-secondary p-0" data-bs-toggle="dropdown">
                      <BiDotsVerticalRounded size={20} />
                    </button>
                    <ul className="dropdown-menu dropdown-menu-end shadow-lg border-white border-opacity-10 bg-dark bg-opacity-100 p-2 mt-2">
                      <li className="dropdown-header text-uppercase small" style={{ fontSize: '0.65rem' }}>Change Role</li>
                      <li>
                        <button className="dropdown-item rounded-2 text-white small py-2 d-flex align-items-center gap-2" onClick={() => onChangeRole(user.id, 'USER')}>
                          Set as Student/User
                        </button>
                      </li>
                      <li>
                        <button className="dropdown-item rounded-2 text-warning small py-2 d-flex align-items-center gap-2" onClick={() => onChangeRole(user.id, 'TECHNICIAN')}>
                          <BiWrench /> Promote to Technician
                        </button>
                      </li>
                      <li>
                        <button className="dropdown-item rounded-2 text-danger small py-2 d-flex align-items-center gap-2" onClick={() => onChangeRole(user.id, 'ADMIN')}>
                          <BiShieldQuarter /> Grant Admin Rights
                        </button>
                      </li>
                    </ul>
                  </div>
                </td>
              </motion.tr>
            )) : (
              <tr>
                <td colSpan="4" className="text-center py-5 text-secondary small">No user records found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <style>{`
        .dropdown-item:hover { background-color: rgba(255, 255, 255, 0.05) !important; color: #fff !important; }
      `}</style>
    </div>
  );
};

export default UserManagementPanel;
