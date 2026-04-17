import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BiBell, BiCalendarEvent, BiWrench, BiUserVoice, BiCircle } from 'react-icons/bi';

const NotificationItem = ({ item }) => {
  const getIcon = (type) => {
    switch (type) {
      case 'BOOKING': return <BiCalendarEvent className="text-primary" />;
      case 'TICKET': return <BiWrench className="text-warning" />;
      case 'USER': return <BiUserVoice className="text-info" />;
      default: return <BiBell className="text-secondary" />;
    }
  };

  return (
    <div className={`p-3 border-bottom border-white border-opacity-5 transition-all ${!item.read ? 'bg-primary bg-opacity-5' : 'hover-bg-white-5'}`}>
      <div className="d-flex gap-3">
        <div className="mt-1">
          {getIcon(item.type)}
        </div>
        <div className="flex-grow-1">
          <div className="d-flex justify-content-between align-items-start gap-2">
            <p className={`small mb-1 ${item.read ? 'text-secondary' : 'text-white fw-bold'}`}>
              {item.message}
            </p>
            {!item.read && <BiCircle size={8} className="text-primary fill-current mt-1" style={{ minWidth: '8px' }} />}
          </div>
          <span className="text-secondary opacity-75" style={{ fontSize: '0.65rem' }}>{item.timestamp}</span>
        </div>
      </div>
    </div>
  );
};

const NotificationPanel = ({ notifications = [] }) => {
  return (
    <div className="glass-card h-100 border border-white border-opacity-10 d-flex flex-column shadow-lg">
      <div className="p-4 border-bottom border-white border-opacity-10 d-flex justify-content-between align-items-center">
        <h3 className="h6 fw-bold mb-0 d-flex align-items-center gap-2 text-white">
          <BiBell /> Admin Notifications
        </h3>
        <span className="badge bg-primary bg-opacity-10 text-primary small rounded-3 border border-primary border-opacity-25" style={{ fontSize: '0.6rem' }}>
          {notifications.filter(n => !n.read).length} NEW
        </span>
      </div>

      <div className="flex-grow-1 overflow-auto custom-scrollbar" style={{ maxHeight: '420px' }}>
        {notifications.length > 0 ? (
          notifications.map((notif, index) => (
            <NotificationItem key={notif.id || index} item={notif} />
          ))
        ) : (
          <div className="text-center py-5">
            <BiBell size={32} className="text-secondary opacity-10 mb-2" />
            <p className="text-secondary small">No active notifications</p>
          </div>
        )}
      </div>
      
      <div className="p-3 border-top border-white border-opacity-10 mt-auto">
        <button className="btn btn-outline-secondary btn-sm w-100 rounded-pill border-opacity-25 py-2 text-decoration-none small transition-all">
          View All Admin Alerts
        </button>
      </div>

      <style>{`
        .hover-bg-white-5:hover { background-color: rgba(255, 255, 255, 0.05); }
        .fill-current { fill: currentColor; }
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255, 255, 255, 0.1); border-radius: 10px; }
      `}</style>
    </div>
  );
};

export default NotificationPanel;
