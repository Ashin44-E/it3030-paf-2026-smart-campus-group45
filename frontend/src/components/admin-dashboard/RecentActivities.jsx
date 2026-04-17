import React from 'react';
import { motion } from 'framer-motion';
import { BiTimeFive, BiCheckCircle, BiWrench, BiUserVoice, BiPlusCircle } from 'react-icons/bi';

const ActivityItem = ({ activity, index, total }) => {
  const getIcon = (type) => {
    switch (type) {
      case 'BOOKING_APPROVED': return <BiCheckCircle className="text-success" />;
      case 'TICKET_ASSIGNED': return <BiWrench className="text-primary" />;
      case 'RESOURCE_UPDATED': return <BiPlusCircle className="text-info" />;
      case 'USER_REGISTERED': return <BiUserVoice className="text-warning" />;
      default: return <BiTimeFive className="text-secondary" />;
    }
  };

  return (
    <div className="position-relative ps-4 pb-4">
      {/* Timeline Line */}
      {index !== total - 1 && (
        <div 
          className="position-absolute start-0 h-100 bg-white bg-opacity-10" 
          style={{ width: '1px', left: '10px', top: '24px' }}
        ></div>
      )}
      
      {/* Timeline Dot/Icon */}
      <div 
        className="position-absolute start-0 bg-dark rounded-circle d-flex align-items-center justify-content-center p-1" 
        style={{ width: '22px', height: '22px', left: '0', top: '2px', border: '1px solid rgba(255,255,255,0.1)' }}
      >
        {React.cloneElement(getIcon(activity.type), { size: 12 })}
      </div>

      <div className="ms-2">
        <p className="small text-white mb-0 fw-medium">{activity.message}</p>
        <span className="text-secondary opacity-75 d-block mt-1" style={{ fontSize: '0.65rem' }}>
          {activity.timestamp} • {activity.user || 'System'}
        </span>
      </div>
    </div>
  );
};

const RecentActivities = ({ activities = [] }) => {
  return (
    <div className="glass-card p-4 border border-white border-opacity-10 h-100 shadow-lg">
      <h3 className="h6 fw-bold mb-4 d-flex align-items-center gap-2 text-white">
        <BiTimeFive size={18} className="text-secondary" />
        Recent System Activities
      </h3>

      <div className="mt-2">
        {activities.length > 0 ? activities.map((act, index) => (
          <motion.div
            key={act.id || index}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 * index }}
          >
            <ActivityItem activity={act} index={index} total={activities.length} />
          </motion.div>
        )) : (
          <p className="text-secondary text-center py-5 small italic">No recent activities recorded.</p>
        )}
      </div>

      <style>{`
        .italic { font-style: italic; }
      `}</style>
    </div>
  );
};

export default RecentActivities;
