import React from 'react';
import { motion } from 'framer-motion';
import { BiCalendarCheck, BiInfoCircle } from 'react-icons/bi';
import AdminLayout from '../components/admin-dashboard/AdminLayout';

const ManageBookings = () => {
  return (
    <AdminLayout>
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-5 d-flex justify-content-between align-items-end"
      >
        <div>
          <h2 className="display-6 fw-bold text-slate-900 mb-2">
            Booking <span className="gradient-text">Management</span>
          </h2>
          <p className="text-slate-500 mb-0">Review and moderate campus resource reservation requests</p>
        </div>
      </motion.div>

      <div className="glass-card p-5 text-center border border-white border-opacity-10">
        <div className="p-4 rounded-circle bg-primary bg-opacity-10 d-inline-block mb-4">
          <BiCalendarCheck size={48} className="text-primary" />
        </div>
        <h3 className="h4 fw-bold text-slate-900 mb-3">Booking System Module</h3>
        <p className="text-slate-500 mb-4 mx-auto" style={{ maxWidth: '400px' }}>
          This module is currently integrated into the main dashboard overview. A dedicated reservation management view is coming soon as part of Module B.
        </p>
        <div className="d-flex align-items-center justify-content-center gap-2 text-primary small">
          <BiInfoCircle /> Priority: High
        </div>
      </div>
    </AdminLayout>
  );
};

export default ManageBookings;
