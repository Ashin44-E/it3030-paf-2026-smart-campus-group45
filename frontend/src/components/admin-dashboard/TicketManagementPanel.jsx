import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BiWrench, BiUserVoice, BiInfoCircle, BiCheckCircle } from 'react-icons/bi';

const TicketManagementPanel = ({ tickets = [], onAssign, onStatusChange }) => {
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
      case 'OPEN': return 'badge bg-primary bg-opacity-10 text-primary';
      case 'IN_PROGRESS': return 'badge bg-warning bg-opacity-10 text-warning';
      case 'CLOSED': return 'badge bg-secondary bg-opacity-10 text-secondary';
      case 'REJECTED': return 'badge bg-danger bg-opacity-10 text-danger';
      default: return 'badge bg-primary bg-opacity-10 text-primary';
    }
  };

  return (
    <div className="glass-card p-4 border border-white border-opacity-10 h-100 shadow-lg">
      <div className="d-flex justify-content-between align-items-center mb-4 pb-2 border-bottom border-white border-opacity-5">
        <h3 className="h6 fw-bold mb-0 d-flex align-items-center gap-2 text-white">
          <BiWrench size={18} className="text-secondary" />
          Active Incident Tickets
        </h3>
        <span className="badge bg-dark border border-white border-opacity-10 text-secondary px-3 py-1 fw-medium" style={{ fontSize: '0.7rem' }}>
          {tickets.filter(t => t.status !== 'CLOSED').length} ACTIVE
        </span>
      </div>

      <div className="d-flex flex-column gap-3">
        {tickets.length > 0 ? tickets.map((ticket, index) => (
          <motion.div
            key={ticket.id || index}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 * index }}
            className="p-3 rounded-4 bg-dark bg-opacity-25 border border-white border-opacity-5 hover-bg-white-5 transition-all"
          >
            <div className="d-flex justify-content-between align-items-start mb-3">
              <div>
                <h4 className="h6 fw-bold text-white mb-1">{ticket.title}</h4>
                <div className="d-flex gap-2 align-items-center">
                  <span className="text-secondary small" style={{ fontSize: '0.7rem' }}>CAT: {ticket.category || 'Maintenance'}</span>
                  <span className={getPriorityBadge(ticket.priority)} style={{ fontSize: '0.6rem' }}>{ticket.priority}</span>
                </div>
              </div>
              <span className={getStatusBadge(ticket.status)} style={{ fontSize: '0.65rem' }}>{ticket.status}</span>
            </div>

            <div className="row g-2 mb-3">
              <div className="col-6">
                <div className="text-secondary small mb-0" style={{ fontSize: '0.65rem' }}>Reported By</div>
                <div className="text-white small d-flex align-items-center gap-1">
                  <BiUserVoice size={12} className="text-secondary" />
                  {ticket.reportedBy}
                </div>
              </div>
              <div className="col-6">
                <div className="text-secondary small mb-0" style={{ fontSize: '0.65rem' }}>Technician</div>
                <div className="text-white small d-flex align-items-center gap-1">
                  <BiCheckCircle size={12} className={ticket.assignedTechnician ? 'text-success' : 'text-secondary'} />
                  {ticket.assignedTechnician || 'Unassigned'}
                </div>
              </div>
            </div>

            <div className="d-flex justify-content-between align-items-center pt-2 border-top border-white border-opacity-5">
              <span className="text-secondary italic" style={{ fontSize: '0.65rem' }}>{ticket.createdDate || 'Just now'}</span>
              <div className="d-flex gap-2">
                <button className="btn btn-primary btn-sm rounded-pill px-3 py-1 btn-action-small" onClick={() => onAssign(ticket.id)}>
                  Assign
                </button>
                <button className="btn btn-outline-secondary btn-sm rounded-pill px-3 py-1 btn-action-small border-opacity-25" onClick={() => onStatusChange(ticket.id)}>
                  Status
                </button>
                <div className="ms-1 d-flex align-items-center opacity-75 cursor-pointer hover-text-primary">
                  <BiInfoCircle size={18} className="text-secondary" />
                </div>
              </div>
            </div>
          </motion.div>
        )) : (
          <div className="text-center py-5">
            <BiWrench size={48} className="text-secondary opacity-10 mb-3" />
            <p className="text-secondary small">No active tickets found.</p>
          </div>
        )}
      </div>

      <style>{`
        .btn-action-small { font-size: 0.65rem; font-weight: 600; }
        .hover-bg-white-5:hover { background-color: rgba(255, 255, 255, 0.05); }
        .hover-text-primary:hover svg { color: var(--bs-primary) !important; transition: color 0.2s; }
        .italic { font-style: italic; }
      `}</style>
    </div>
  );
};

export default TicketManagementPanel;
