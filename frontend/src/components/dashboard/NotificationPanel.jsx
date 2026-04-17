import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BiBell, BiCheckCircle, BiInfoCircle, BiX } from 'react-icons/bi';

const NotificationItem = ({ notification }) => {
  const getIcon = (type) => {
    switch (type) {
      case 'SUCCESS': return <BiCheckCircle className="text-success" />;
      default: return <BiInfoCircle className="text-primary" />;
    }
  };

  return (
    <div className="p-3 border-bottom border-white border-opacity-5 hover-bg-white-5 transition-all">
      <div className="d-flex gap-3">
        <div className="mt-1">
          {getIcon(notification.type)}
        </div>
        <div className="flex-grow-1">
          <p className="text-white small mb-1">{notification.message}</p>
          <span className="text-secondary" style={{ fontSize: '0.65rem' }}>{notification.timestamp}</span>
        </div>
      </div>
    </div>
  );
};

const NotificationPanel = ({ notifications = [], isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, x: 300 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 300 }}
          className="position-fixed end-0 top-0 vh-100 bg-dark bg-opacity-75 border-start border-white border-opacity-10 shadow-2xl"
          style={{ width: '320px', zIndex: 2000, backdropFilter: 'blur(30px)' }}
        >
          <div className="p-4 d-flex justify-content-between align-items-center border-bottom border-white border-opacity-10">
            <h3 className="h6 fw-bold mb-0 d-flex align-items-center gap-2">
              <BiBell /> Notifications
            </h3>
            <button className="btn btn-link text-secondary p-0 border-0" onClick={onClose}>
              <BiX size={24} />
            </button>
          </div>

          <div className="flex-grow-1 overflow-auto">
            {notifications.length > 0 ? (
              notifications.map((notif, index) => (
                <NotificationItem key={notif.id || index} notification={notif} />
              ))
            ) : (
              <div className="text-center py-5 mt-5">
                <BiBell size={48} className="text-secondary opacity-10 mb-3" />
                <p className="text-secondary small">No new notifications</p>
              </div>
            )}
          </div>
          
          <div className="p-3 mt-auto border-top border-white border-opacity-10">
            <button className="btn btn-outline-secondary btn-sm w-100 py-2 rounded-3 border-opacity-25 opacity-75">
              Mark all as read
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default NotificationPanel;
