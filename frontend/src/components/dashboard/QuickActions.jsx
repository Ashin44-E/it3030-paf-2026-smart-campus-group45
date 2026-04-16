import React from 'react';
import { BiPlusCircle, BiWrench, BiSearch } from 'react-icons/bi';
import { motion } from 'framer-motion';

const QuickActionBtn = ({ label, icon, color, delay }) => (
  <motion.button
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay }}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    className={`btn btn-lg bg-${color} bg-opacity-10 py-3 px-4 border border-${color} border-opacity-25 rounded-4 d-flex align-items-center gap-3 w-100 mb-2 transition-all`}
  >
    {React.cloneElement(icon, { size: 24, className: `text-${color}` })}
    <span className={`text-${color} fw-semibold small`}>{label}</span>
  </motion.button>
);

const QuickActions = () => {
  const actions = [
    { label: 'Create Booking', icon: <BiPlusCircle />, color: 'primary', delay: 0.5 },
    { label: 'Report Incident', icon: <BiWrench />, color: 'warning', delay: 0.6 },
    { label: 'View Resources', icon: <BiSearch />, color: 'info', delay: 0.7 },
  ];

  return (
    <div className="glass-card p-4 border border-white border-opacity-10 h-100">
      <h3 className="h6 fw-bold mb-4 d-flex align-items-center gap-2">
        Quick Actions
      </h3>
      <div className="d-flex flex-column gap-2">
        {actions.map((action, index) => (
          <QuickActionBtn key={index} {...action} />
        ))}
      </div>
    </div>
  );
};

export default QuickActions;
