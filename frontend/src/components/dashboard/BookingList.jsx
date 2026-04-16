import React from 'react';
import { motion } from 'framer-motion';

const BookingList = ({ bookings = [] }) => {
  const getStatusBadge = (status) => {
    switch (status) {
      case 'APPROVED': return 'badge bg-success bg-opacity-10 text-success';
      case 'PENDING': return 'badge bg-warning bg-opacity-10 text-warning';
      case 'REJECTED': return 'badge bg-danger bg-opacity-10 text-danger';
      case 'CANCELLED': return 'badge bg-secondary bg-opacity-10 text-secondary';
      default: return 'badge bg-primary bg-opacity-10 text-primary';
    }
  };

  return (
    <div className="glass-card p-4 border border-white border-opacity-10 h-100 overflow-hidden">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="h6 fw-bold mb-0">Recent Bookings</h3>
        <button className="btn btn-link btn-sm text-primary text-decoration-none small">View All</button>
      </div>
      
      <div className="table-responsive">
        <table className="table table-dark table-hover table-borderless align-middle mb-0 custom-table">
          <thead className="text-secondary small">
            <tr>
              <th className="fw-medium">Resource</th>
              <th className="fw-medium">Date</th>
              <th className="fw-medium">Time</th>
              <th className="fw-medium">Status</th>
            </tr>
          </thead>
          <tbody className="small">
            {bookings.length > 0 ? bookings.map((booking, index) => (
              <motion.tr 
                key={booking.id || index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                <td className="fw-semibold text-white py-3">{booking.resourceName}</td>
                <td className="text-secondary py-3">{booking.date}</td>
                <td className="text-secondary py-3">{booking.time}</td>
                <td className="py-3">
                  <span className={`${getStatusBadge(booking.status)} px-3 py-2 rounded-2`}>
                    {booking.status}
                  </span>
                </td>
              </motion.tr>
            )) : (
              <tr>
                <td colSpan="4" className="text-center text-secondary py-5">No recent bookings found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <style>{`
        .custom-table tbody tr {
          transition: all 0.3s ease;
          border-bottom: 1px solid rgba(255, 255, 255, 0.03);
        }
        .custom-table tbody tr:hover {
          background-color: rgba(255, 255, 255, 0.03) !important;
          transform: translateX(5px);
        }
      `}</style>
    </div>
  );
};

export default BookingList;
