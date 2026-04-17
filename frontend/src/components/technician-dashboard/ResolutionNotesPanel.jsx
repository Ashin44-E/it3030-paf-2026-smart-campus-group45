import React, { useState } from 'react';
import { BiCheckCircle, BiWrench, BiEditAlt } from 'react-icons/bi';

const ResolutionNotesPanel = ({ ticketId, currentStatus, onSave, onResolve }) => {
  const [resolutionData, setResolutionData] = useState({
    summary: '',
    actionsTaken: '',
    partsUsed: '',
    completionNotes: ''
  });
  const [isEditing, setIsEditing] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(ticketId, resolutionData);
    setIsEditing(false);
  };

  return (
    <div className="glass-card p-4 bg-dark bg-opacity-25 border border-white border-opacity-5 rounded-4 shadow-sm">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="h6 fw-bold text-white mb-0 d-flex align-items-center gap-2">
          <BiWrench className="text-secondary" /> Resolution Details
        </h3>
        {!isEditing && (
           <button className="btn btn-link text-primary btn-sm p-0" onClick={() => setIsEditing(true)}>
            <BiEditAlt className="me-1" /> Edit Notes
           </button>
        )}
      </div>

      {isEditing ? (
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label text-secondary small uppercase tracking-wider">Resolution Summary</label>
            <input 
              type="text" 
              className="form-control bg-dark text-white border-white border-opacity-10 shadow-none small"
              placeholder="e.g., Repaired faulty wiring in the control box"
              required
              value={resolutionData.summary}
              onChange={(e) => setResolutionData({...resolutionData, summary: e.target.value})}
            />
          </div>

          <div className="mb-3">
            <label className="form-label text-secondary small uppercase tracking-wider">Actions Taken</label>
            <textarea 
              className="form-control bg-dark text-white border-white border-opacity-10 shadow-none small"
              rows="3"
              placeholder="Detail the steps performed..."
              value={resolutionData.actionsTaken}
              onChange={(e) => setResolutionData({...resolutionData, actionsTaken: e.target.value})}
            ></textarea>
          </div>

          <div className="mb-3">
            <label className="form-label text-secondary small uppercase tracking-wider">Parts / Replacements (Optional)</label>
            <input 
              type="text" 
              className="form-control bg-dark text-white border-white border-opacity-10 shadow-none small"
              placeholder="List any parts used..."
              value={resolutionData.partsUsed}
              onChange={(e) => setResolutionData({...resolutionData, partsUsed: e.target.value})}
            />
          </div>

          <div className="d-flex gap-2 pt-3">
            <button type="submit" className="btn btn-outline-primary btn-sm rounded-pill px-4">Save Progress</button>
            {currentStatus === 'IN_PROGRESS' && (
              <button 
                type="button" 
                className="btn btn-success btn-sm rounded-pill px-4 d-flex align-items-center gap-2"
                onClick={onResolve}
                disabled={!resolutionData.summary.trim()}
              >
                <BiCheckCircle /> Mark as Resolved
              </button>
            )}
          </div>
        </form>
      ) : (
        <div className="text-white small">
          <p className="mb-2"><span className="text-secondary">Summary:</span> {resolutionData.summary}</p>
          <p className="mb-2"><span className="text-secondary">Actions:</span> {resolutionData.actionsTaken || 'Not specified'}</p>
          {resolutionData.partsUsed && <p className="mb-0"><span className="text-secondary">Parts:</span> {resolutionData.partsUsed}</p>}
          
          <div className="mt-4 pt-4 border-top border-white border-opacity-5">
            {currentStatus === 'IN_PROGRESS' ? (
              <button className="btn btn-success btn-sm rounded-pill w-100 d-flex align-items-center justify-content-center gap-2" onClick={onResolve}>
                 <BiCheckCircle size={18} /> Confirm Resolution & Close Ticket
              </button>
            ) : (
              <div className="alert alert-success bg-success bg-opacity-10 border-0 text-success small mb-0 d-flex align-items-center gap-2">
                <BiCheckCircle /> Resolved Status Confirmed
              </div>
            )}
          </div>
        </div>
      )}
      <style>{`
        .uppercase { text-transform: uppercase; }
        .tracking-wider { letter-spacing: 0.1em; font-size: 0.65rem; }
      `}</style>
    </div>
  );
};

export default ResolutionNotesPanel;
