import React from 'react';
import { motion } from 'framer-motion';
import { BiWrench, BiUser } from 'react-icons/bi';

const TicketList = ({ tickets = [] }) => {
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'HIGH': return 'danger';
      case 'MEDIUM': return 'warning';
      case 'LOW': return 'info';
      default: return 'primary';
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'RESOLVED': return 'badge bg-success bg-opacity-10 text-success';
      case 'OPEN': return 'badge bg-primary bg-opacity-10 text-primary';
      case 'IN_PROGRESS': return 'badge bg-warning bg-opacity-10 text-warning';
      case 'CLOSED': return 'badge bg-secondary bg-opacity-10 text-secondary';
      default: return 'badge bg-primary bg-opacity-10 text-primary';
    }
  };

  return (
    <div className="glass-card p-4 border border-white border-opacity-10 h-100">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="h6 fw-bold mb-0">My Tickets</h3>
        <button className="btn btn-link btn-sm text-primary text-decoration-none small">View All</button>
      </div>

      <div className="d-flex flex-column gap-3">
        {tickets.length > 0 ? tickets.map((ticket, index) => (
          <motion.div
            key={ticket.id || index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 * index }}
            className="p-3 rounded-4 bg-dark bg-opacity-25 border border-white border-opacity-5 hover-bg-white-5 transition-all cursor-pointer"
          >
            <div className="d-flex justify-content-between align-items-start mb-2">
              <h4 className="h6 fw-bold text-white mb-0">{ticket.title}</h4>
              <span className={`badge bg-${getPriorityColor(ticket.priority)} bg-opacity-10 text-${getPriorityColor(ticket.priority)} small rounded-pill border border-${getPriorityColor(ticket.priority)} border-opacity-25`} style={{ fontSize: '0.6rem' }}>
                {ticket.priority}
              </span>
            </div>
            
            <div className="d-flex justify-content-between align-items-center">
              <div className="d-flex align-items-center gap-2 text-secondary small">
                <BiUser size={14} />
                <span>{ticket.assignedTechnician || 'Waiting Assignment'}</span>
              </div>
              <span className={getStatusBadge(ticket.status)}>
                {ticket.status}
              </span>
            </div>
          </motion.div>
        )) : (
          <div className="text-center py-5">
            <BiWrench size={48} className="text-secondary opacity-25 mb-3" />
            <p className="text-secondary small">No maintenance tickets found.</p>
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

export default TicketList;
