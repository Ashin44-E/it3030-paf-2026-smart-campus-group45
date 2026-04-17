import React from 'react';
import { BiBell, BiTask, BiChat, BiCircle } from 'react-icons/bi';

const NotificationsPanel = ({ notifications = [] }) => {
  const getIcon = (type) => {
    switch (type) {
      case 'ASSIGNMENT': return <BiTask className="text-primary" />;
      case 'COMMENT': return <BiChat className="text-info" />;
      default: return <BiBell className="text-secondary" />;
    }
  };

  return (
    <div className="glass-card p-4 border border-white border-opacity-10 h-100 shadow-lg">
      <div className="d-flex justify-content-between align-items-center mb-4 pb-2 border-bottom border-white border-opacity-5">
        <h3 className="h6 fw-bold mb-0 d-flex align-items-center gap-2 text-white">
          <BiBell /> Tech Alerts
        </h3>
        <span className="badge bg-primary bg-opacity-10 text-primary small rounded-3 border border-primary border-opacity-25" style={{ fontSize: '0.6rem' }}>
          {notifications.filter(n => !n.read).length} NEW
        </span>
      </div>

      <div className="d-flex flex-column gap-1 overflow-auto custom-scrollbar" style={{ maxHeight: '350px' }}>
        {notifications.length > 0 ? notifications.map((notif, index) => (
          <div 
            key={notif.id || index} 
            className={`p-3 rounded-3 d-flex gap-3 transition-all ${!notif.read ? 'bg-primary bg-opacity-5' : 'hover-bg-white-5 opacity-75'}`}
          >
            <div className="mt-1">{getIcon(notif.type)}</div>
            <div className="flex-grow-1">
              <div className="d-flex justify-content-between align-items-start gap-2">
                <p className={`small mb-1 ${!notif.read ? 'text-white fw-medium' : 'text-secondary'}`}>{notif.message}</p>
                {!notif.read && <BiCircle size={8} className="text-primary fill-current mt-1" style={{ minWidth: '8px' }} />}
              </div>
              <span className="text-secondary opacity-50" style={{ fontSize: '0.65rem' }}>{notif.timestamp}</span>
            </div>
          </div>
        )) : (
          <div className="text-center py-5">
            <BiBell size={32} className="text-secondary opacity-10 mb-2" />
            <p className="text-secondary small">Everything up to date</p>
          </div>
        )}
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

export default NotificationsPanel;
