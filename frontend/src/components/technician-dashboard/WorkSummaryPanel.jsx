import React from 'react';
import { BiBarChartAlt2, BiCheckCircle, BiWrench, BiTimer } from 'react-icons/bi';

const MetricItem = ({ icon, label, value, progress, color }) => (
  <div className="mb-4">
    <div className="d-flex justify-content-between align-items-center mb-2">
      <div className="d-flex align-items-center gap-2">
         {React.cloneElement(icon, { size: 18, className: `text-${color}` })}
         <span className="text-secondary small fw-medium">{label}</span>
      </div>
      <span className="text-white small fw-bold">{value}</span>
    </div>
    <div className="progress bg-white bg-opacity-5" style={{ height: '6px' }}>
      <div 
        className={`progress-bar bg-${color}`} 
        role="progressbar" 
        style={{ width: `${progress}%`, borderRadius: '3px' }}
      ></div>
    </div>
  </div>
);

const WorkSummaryPanel = () => {
  return (
    <div className="glass-card p-4 border border-white border-opacity-10 h-100 shadow-lg">
      <h3 className="h6 fw-bold mb-4 d-flex align-items-center gap-2 text-white">
        <BiBarChartAlt2 size={18} className="text-secondary" />
        Weekly Work Summary
      </h3>

      <div className="mt-2">
        <MetricItem 
          icon={<BiCheckCircle />} 
          label="Tickets Resolved" 
          value="12 / 15" 
          progress={80} 
          color="success" 
        />
        <MetricItem 
          icon={<BiWrench />} 
          label="Active Tasks" 
          value="3" 
          progress={40} 
          color="warning" 
        />
        <MetricItem 
          icon={<BiTimer />} 
          label="Avg. Response Time" 
          value="45m" 
          progress={90} 
          color="info" 
        />
        
        <div className="mt-5 p-3 rounded-4 bg-primary bg-opacity-5 border border-primary border-opacity-10">
          <p className="small text-secondary mb-1">Performance Rating</p>
          <div className="d-flex align-items-center gap-2">
            <h4 className="h3 fw-bold text-white mb-0">4.9</h4>
            <div className="d-flex text-warning">
              {Array(5).fill(0).map((_, i) => <span key={i} className="small">★</span>)}
            </div>
          </div>
          <p className="text-secondary opacity-50 mb-0 mt-1" style={{ fontSize: '0.65rem' }}>Top 5% of campus technicians</p>
        </div>
      </div>
    </div>
  );
};

export default WorkSummaryPanel;
