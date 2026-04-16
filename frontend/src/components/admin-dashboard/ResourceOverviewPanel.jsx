import React from 'react';
import { motion } from 'framer-motion';
import { BiBuilding, BiPlus, BiDotsHorizontalRounded, BiCheckCircle, BiBlock } from 'react-icons/bi';

const ResourceOverviewPanel = ({ resources = [], onStatusUpdate, onEdit }) => {
  const getStatusBadge = (status) => {
    switch (status) {
      case 'AVAILABLE': return 'badge bg-success bg-opacity-10 text-success border border-success border-opacity-25';
      case 'MAINTENANCE': return 'badge bg-warning bg-opacity-10 text-warning border border-warning border-opacity-25';
      case 'OCCUPIED': return 'badge bg-primary bg-opacity-10 text-primary border border-primary border-opacity-25';
      case 'OUT_OF_SERVICE': return 'badge bg-danger bg-opacity-10 text-danger border border-danger border-opacity-25';
      default: return 'badge bg-secondary bg-opacity-10 text-secondary border border-secondary border-opacity-25';
    }
  };

  return (
    <div className="glass-card p-4 border border-white border-opacity-10 h-100 shadow-lg">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="h6 fw-bold mb-0 d-flex align-items-center gap-2 text-white">
          <BiBuilding size={18} className="text-secondary" />
          Campus Resource Catalogue
        </h3>
        <button className="btn btn-primary btn-sm d-flex align-items-center gap-2 px-3 py-1 fw-semibold rounded-pill" style={{ fontSize: '0.7rem' }}>
          <BiPlus size={16} /> ADD RESOURCE
        </button>
      </div>

      <div className="table-responsive">
        <table className="table table-dark table-hover table-borderless align-middle mb-0">
          <thead className="text-secondary small" style={{ fontSize: '0.75rem' }}>
            <tr>
              <th className="fw-medium text-uppercase tracking-wider">Resource Name</th>
              <th className="fw-medium text-uppercase tracking-wider">Type</th>
              <th className="fw-medium text-uppercase tracking-wider">Location</th>
              <th className="fw-medium text-uppercase tracking-wider">Status</th>
              <th className="fw-medium text-uppercase tracking-wider text-end">Actions</th>
            </tr>
          </thead>
          <tbody style={{ fontSize: '0.85rem' }}>
            {resources.length > 0 ? resources.map((res, index) => (
              <motion.tr 
                key={res.id || index}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.05 * index }}
                className="border-bottom border-white border-opacity-5"
              >
                <td>
                  <div className="fw-bold text-white">{res.name}</div>
                  <div className="text-secondary small" style={{ fontSize: '0.7rem' }}>CAP: {res.capacity || 'N/A'} Persons</div>
                </td>
                <td className="text-secondary">{res.type}</td>
                <td className="text-secondary small">{res.location}</td>
                <td>
                  <span className={getStatusBadge(res.status)}>
                    {res.status}
                  </span>
                </td>
                <td className="text-end">
                  <div className="dropdown position-static">
                    <button className="btn btn-link text-secondary p-0" data-bs-toggle="dropdown">
                      <BiDotsHorizontalRounded size={20} />
                    </button>
                    <ul className="dropdown-menu dropdown-menu-end shadow-lg border-white border-opacity-10 bg-dark bg-opacity-100 p-2 mt-2">
                      <li>
                        <button className="dropdown-item rounded-2 text-white small py-2 d-flex align-items-center gap-2" onClick={() => onEdit(res)}>
                          Edit Resource
                        </button>
                      </li>
                      <li>
                        <button className="dropdown-item rounded-2 text-warning small py-2 d-flex align-items-center gap-2" onClick={() => onStatusUpdate(res.id, 'MAINTENANCE')}>
                          Mark for Maintenance
                        </button>
                      </li>
                      <li><hr className="dropdown-divider border-white border-opacity-5" /></li>
                      <li>
                        {res.status === 'OUT_OF_SERVICE' ? (
                          <button className="dropdown-item rounded-2 text-success small py-2 d-flex align-items-center gap-2" onClick={() => onStatusUpdate(res.id, 'AVAILABLE')}>
                            <BiCheckCircle /> Activate
                          </button>
                        ) : (
                          <button className="dropdown-item rounded-2 text-danger small py-2 d-flex align-items-center gap-2" onClick={() => onStatusUpdate(res.id, 'OUT_OF_SERVICE')}>
                            <BiBlock /> Deactivate
                          </button>
                        )}
                      </li>
                    </ul>
                  </div>
                </td>
              </motion.tr>
            )) : (
              <tr>
                <td colSpan="5" className="text-center py-5 text-secondary small italic">No resources defined in the catalogue.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <style>{`
        .tracking-wider { letter-spacing: 0.05em; }
        .italic { font-style: italic; }
        .dropdown-item:hover { background-color: rgba(255, 255, 255, 0.05) !important; color: #fff !important; }
      `}</style>
    </div>
  );
};

export default ResourceOverviewPanel;
