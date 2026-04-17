import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BiCheck, BiX, BiInfoCircle } from 'react-icons/bi';

const BookingApprovalPanel = ({ bookings = [], onApprove, onReject }) => {
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [rejectReason, setRejectReason] = useState('');

  const handleOpenReject = (booking) => {
    setSelectedBooking(booking);
    setShowRejectModal(true);
  };

  const handleConfirmReject = () => {
    onReject(selectedBooking.id, rejectReason);
    setShowRejectModal(false);
    setRejectReason('');
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'APPROVED': return 'badge bg-success bg-opacity-10 text-success border border-success border-opacity-25';
      case 'PENDING': return 'badge bg-warning bg-opacity-10 text-warning border border-warning border-opacity-25';
      case 'REJECTED': return 'badge bg-danger bg-opacity-10 text-danger border border-danger border-opacity-25';
      case 'CANCELLED': return 'badge bg-secondary bg-opacity-10 text-secondary border border-secondary border-opacity-25';
      default: return 'badge bg-primary bg-opacity-10 text-primary border border-primary border-opacity-25';
    }
  };

  return (
    <div className="glass-card p-4 border border-white border-opacity-10 h-100 shadow-lg">
      <div className="d-flex justify-content-between align-items-center mb-4 pb-2 border-bottom border-white border-opacity-5">
        <h3 className="h6 fw-bold mb-0 d-flex align-items-center gap-2 text-white">
          <BiInfoCircle size={18} className="text-secondary" />
          Booking Approval Queue
        </h3>
        <button className="btn btn-outline-secondary btn-sm rounded-pill px-3 py-1 border-opacity-25 small" style={{ fontSize: '0.75rem' }}>View History</button>
      </div>

      <div className="table-responsive">
        <table className="table table-dark table-hover table-borderless align-middle mb-0">
          <thead className="text-secondary small" style={{ fontSize: '0.75rem' }}>
            <tr>
              <th className="fw-medium text-uppercase tracking-wider">User</th>
              <th className="fw-medium text-uppercase tracking-wider">Resource</th>
              <th className="fw-medium text-uppercase tracking-wider text-center">Date & Time</th>
              <th className="fw-medium text-uppercase tracking-wider">Status</th>
              <th className="fw-medium text-uppercase tracking-wider text-end">Actions</th>
            </tr>
          </thead>
          <tbody style={{ fontSize: '0.85rem' }}>
            {bookings.length > 0 ? bookings.map((booking, index) => (
              <motion.tr 
                key={booking.id || index}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * index }}
                className="border-bottom border-white border-opacity-5"
              >
                <td>
                  <div className="fw-bold text-white">{booking.userName}</div>
                  <div className="text-secondary small" style={{ fontSize: '0.7rem' }}>ID: {booking.userId || 'N/A'}</div>
                </td>
                <td className="text-secondary">{booking.resourceName}</td>
                <td className="text-center">
                  <div className="text-white">{booking.date}</div>
                  <div className="text-secondary small" style={{ fontSize: '0.75rem' }}>{booking.timeRange}</div>
                </td>
                <td>
                  <span className={getStatusBadge(booking.status)}>
                    {booking.status}
                  </span>
                </td>
                <td className="text-end">
                  <div className="d-flex gap-2 justify-content-end">
                    {booking.status === 'PENDING' && (
                      <>
                        <button 
                          onClick={() => onApprove(booking.id)}
                          className="btn btn-success btn-icon-sm bg-opacity-10 hover-bg-success-dark transition-all border-0 rounded-circle"
                          title="Approve"
                        >
                          <BiCheck size={18} />
                        </button>
                        <button 
                          onClick={() => handleOpenReject(booking)}
                          className="btn btn-danger btn-icon-sm bg-opacity-10 hover-bg-danger-dark transition-all border-0 rounded-circle"
                          title="Reject"
                        >
                          <BiX size={18} />
                        </button>
                      </>
                    )}
                    <button className="btn btn-light btn-icon-sm bg-opacity-10 hover-bg-white-5 transition-all border-0 rounded-circle" title="View Details">
                      <BiInfoCircle size={18} className="text-secondary" />
                    </button>
                  </div>
                </td>
              </motion.tr>
            )) : (
              <tr>
                <td colSpan="5" className="text-center py-5 text-secondary small italic">No pending bookings in the queue.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Rejection Reason Modal */}
      {showRejectModal && (
        <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(5px)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content glass-card border border-white border-opacity-10 shadow-2xl">
              <div className="modal-header border-bottom border-white border-opacity-5">
                <h5 className="modal-title text-white">Reject Booking Request</h5>
                <button type="button" className="btn-close btn-close-white" onClick={() => setShowRejectModal(false)}></button>
              </div>
              <div className="modal-body">
                <p className="text-secondary small mb-3">Please provide a reason for rejecting the booking for <strong>{selectedBooking?.resourceName}</strong> by <strong>{selectedBooking?.userName}</strong>.</p>
                <textarea 
                  className="form-control bg-dark bg-opacity-50 border border-white border-opacity-10 text-white shadow-none" 
                  rows="4"
                  placeholder="e.g., Resource undergoing maintenance, invalid purpose, etc."
                  value={rejectReason}
                  onChange={(e) => setRejectReason(e.target.value)}
                  style={{ fontSize: '0.85rem' }}
                ></textarea>
              </div>
              <div className="modal-footer border-top border-white border-opacity-5">
                <button type="button" className="btn btn-link text-secondary text-decoration-none" onClick={() => setShowRejectModal(false)}>Cancel</button>
                <button type="button" className="btn btn-danger px-4 rounded-3" onClick={handleConfirmReject} disabled={!rejectReason.trim()}>
                  Confirm Rejection
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .btn-icon-sm { width: 34px; height: 34px; display: flex; align-items: center; justify-content: center; padding: 0; }
        .hover-bg-success-dark:hover { background-color: rgba(25, 135, 84, 0.4) !important; color: #fff !important; }
        .hover-bg-danger-dark:hover { background-color: rgba(220, 53, 69, 0.4) !important; color: #fff !important; }
        .hover-bg-white-5:hover { background-color: rgba(255, 255, 255, 0.1) !important; }
        .tracking-wider { letter-spacing: 0.05em; }
        .italic { font-style: italic; }
      `}</style>
    </div>
  );
};

export default BookingApprovalPanel;
