import React from 'react';
import { motion } from 'framer-motion';
import { BiWrench, BiInfoCircle, BiCheckCircle, BiPlayCircle } from 'react-icons/bi';

const AssignedTicketsPanel = ({ tickets = [], onViewDetails, onUpdateStatus }) => {
  const getPriorityBadge = (priority) => {
    switch (priority) {
      case 'HIGH': return 'badge bg-danger bg-opacity-10 text-danger border border-danger border-opacity-25';
      case 'MEDIUM': return 'badge bg-warning bg-opacity-10 text-warning border border-warning border-opacity-25';
      case 'LOW': return 'badge bg-info bg-opacity-10 text-info border border-info border-opacity-25';
      default: return 'badge bg-secondary bg-opacity-10 text-secondary border border-secondary border-opacity-25';
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'RESOLVED': return 'badge bg-success bg-opacity-10 text-success';
      case 'IN_PROGRESS': return 'badge bg-warning bg-opacity-10 text-warning';
      case 'OPEN': return 'badge bg-primary bg-opacity-10 text-primary';
      default: return 'badge bg-secondary bg-opacity-10 text-secondary';
    }
  };

  return (
    <div className="glass-card p-4 border border-white border-opacity-10 h-100 shadow-lg">
      <div className="d-flex justify-content-between align-items-center mb-4 pb-2 border-bottom border-white border-opacity-5">
        <h3 className="h6 fw-bold mb-0 d-flex align-items-center gap-2 text-white">
          <BiWrench size={18} className="text-secondary" />
          My Assigned Tasks
        </h3>
        <span className="badge bg-dark border border-white border-opacity-10 text-secondary px-3 py-1 fw-medium" style={{ fontSize: '0.7rem' }}>
          {tickets.length} ACTIVE
        </span>
      </div>

      <div className="row g-4">
        {tickets.length > 0 ? tickets.map((ticket, index) => (
          <motion.div
            key={ticket.id || index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index }}
            className="col-12 col-md-6"
          >
            <div className="p-4 rounded-4 bg-dark bg-opacity-25 border border-white border-opacity-5 hover-bg-white-5 transition-all h-100 d-flex flex-column">
              <div className="d-flex justify-content-between align-items-start mb-3">
                <div className="flex-grow-1">
                  <h4 className="h6 fw-bold text-white mb-2">{ticket.title}</h4>
                  <div className="d-flex flex-wrap gap-2">
                    <span className="text-secondary small" style={{ fontSize: '0.7rem' }}>{ticket.category}</span>
                    <span className={getPriorityBadge(ticket.priority)} style={{ fontSize: '0.65rem' }}>{ticket.priority}</span>
                  </div>
                </div>
                <span className={getStatusBadge(ticket.status)} style={{ fontSize: '0.65rem' }}>{ticket.status}</span>
              </div>

              <div className="mb-4">
                <p className="text-secondary small mb-1">Location:</p>
                <p className="text-white small mb-0">{ticket.resourceName || 'Unknown Site'}</p>
              </div>

              <div className="mt-auto pt-3 border-top border-white border-opacity-5 d-flex gap-2">
                <button 
                  className="btn btn-outline-primary btn-sm rounded-pill px-3 py-1 flex-grow-1 d-flex align-items-center justify-content-center gap-2"
                  onClick={() => onViewDetails(ticket)}
                >
                  <BiInfoCircle /> Details
                </button>
                {ticket.status === 'OPEN' && (
                  <button 
                    className="btn btn-primary btn-sm rounded-pill px-3 py-1 flex-grow-1 d-flex align-items-center justify-content-center gap-2 shadow-sm"
                    onClick={() => onUpdateStatus(ticket.id, 'IN_PROGRESS')}
                  >
                    <BiPlayCircle /> Start
                  </button>
                )}
                {ticket.status === 'IN_PROGRESS' && (
                  <button 
                    className="btn btn-success btn-sm rounded-pill px-3 py-1 flex-grow-1 d-flex align-items-center justify-content-center gap-2 shadow-sm"
                    onClick={() => onUpdateStatus(ticket.id, 'RESOLVED')}
                  >
                    <BiCheckCircle /> Resolve
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )) : (
          <div className="col-12 text-center py-5">
            <BiWrench size={48} className="text-secondary opacity-10 mb-3" />
            <p className="text-secondary small">No assigned tickets found.</p>
          </div>
        )}
      </div>

      <style>{`
        .hover-bg-white-5:hover { 
          background-color: rgba(255, 255, 255, 0.05) !important; 
          border-color: rgba(255, 255, 255, 0.1) !important;
        }
      `}</style>
    </div>
  );
};

export default AssignedTicketsPanel;
