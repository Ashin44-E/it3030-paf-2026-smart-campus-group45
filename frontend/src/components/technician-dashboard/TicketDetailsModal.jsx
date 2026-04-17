import React from 'react';
import { BiX, BiCalendar, BiMap, BiUser, BiTag, BiCommentDetail, BiCheckCircle } from 'react-icons/bi';
import TicketCommentsPanel from './TicketCommentsPanel';
import ResolutionNotesPanel from './ResolutionNotesPanel';

const TicketDetailsModal = ({ ticket, isOpen, onClose, onUpdateStatus, onSaveNote }) => {
  if (!isOpen || !ticket) return null;

  const getPriorityBadge = (priority) => {
    switch (priority) {
      case 'HIGH': return 'badge bg-danger bg-opacity-10 text-danger border border-danger border-opacity-25';
      case 'MEDIUM': return 'badge bg-warning bg-opacity-10 text-warning border border-warning border-opacity-25';
      case 'LOW': return 'badge bg-info bg-opacity-10 text-info border border-info border-opacity-25';
      default: return 'badge bg-secondary bg-opacity-10 text-secondary border border-secondary border-opacity-25';
    }
  };

  return (
    <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(15, 23, 42, 0.4)', backdropFilter: 'blur(4px)' }}>
      <div className="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable">
        <div className="modal-content glass-card bg-white border-white shadow-2xl overflow-hidden" style={{ minHeight: '80vh' }}>
          
          {/* Modal Header */}
          <div className="modal-header border-bottom border-light p-4 py-3 align-items-start bg-light bg-opacity-50">
            <div className="flex-grow-1">
              <div className="d-flex align-items-center gap-2 mb-2">
                <span className={getPriorityBadge(ticket.priority)}>{ticket.priority} PRIORITY</span>
                <span className="badge bg-white border border-light text-slate-400" style={{ fontSize: '0.7rem' }}>REF: #{ticket.id}</span>
              </div>
              <h2 className="modal-title h4 text-slate-900 fw-bold">{ticket.title}</h2>
            </div>
            <button type="button" className="btn-close shadow-none" onClick={onClose}></button>
          </div>

          {/* Modal Body */}
          <div className="modal-body p-0">
            <div className="row g-0 h-100">
              
              {/* Left Column: Details & Notes */}
              <div className="col-lg-7 p-4 border-end border-light scroll-content">
                <section className="mb-5">
                  <h3 className="h6 fw-bold text-slate-400 text-uppercase mb-3 tracking-wider">Issue Description</h3>
                  <p className="text-slate-700 bg-light p-3 rounded-3 border border-light fw-medium">
                    {ticket.description || 'No detailed description provided.'}
                  </p>
                </section>

                <div className="row g-4 mb-5">
                  <div className="col-md-6">
                    <h3 className="h6 fw-bold text-slate-400 text-uppercase mb-2 tracking-wider">Location & Resource</h3>
                    <div className="d-flex align-items-center gap-2 text-slate-800 fw-bold">
                      <div className="p-1 rounded bg-primary bg-opacity-10 text-primary">
                        <BiMap />
                      </div>
                      <span>{ticket.resourceName || 'Global Campus'}</span>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <h3 className="h6 fw-bold text-slate-400 text-uppercase mb-2 tracking-wider">Category</h3>
                    <div className="d-flex align-items-center gap-2 text-slate-800 fw-bold">
                      <div className="p-1 rounded bg-info bg-opacity-10 text-info">
                        <BiTag />
                      </div>
                      <span>{ticket.category}</span>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <h3 className="h6 fw-bold text-slate-400 text-uppercase mb-2 tracking-wider">Reported By</h3>
                    <div className="d-flex align-items-center gap-2 text-slate-800 fw-bold">
                      <div className="p-1 rounded bg-warning bg-opacity-10 text-warning">
                        <BiUser />
                      </div>
                      <span>{ticket.reportedBy}</span>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <h3 className="h6 fw-bold text-slate-400 text-uppercase mb-2 tracking-wider">Date Reported</h3>
                    <div className="d-flex align-items-center gap-2 text-slate-800 fw-bold">
                      <div className="p-1 rounded bg-primary bg-opacity-10 text-primary">
                        <BiCalendar />
                      </div>
                      <span>{ticket.reportedDate || 'N/A'}</span>
                    </div>
                  </div>
                </div>

                <hr className="border-light my-5" />

                {/* Resolution Notes Section */}
                <section>
                   <ResolutionNotesPanel 
                    ticketId={ticket.id} 
                    currentStatus={ticket.status} 
                    onSave={onSaveNote}
                    onResolve={() => onUpdateStatus(ticket.id, 'RESOLVED')}
                   />
                </section>
              </div>

              {/* Right Column: Comments & Activity */}
              <div className="col-lg-5 p-4 bg-light bg-opacity-30 scroll-content">
                <TicketCommentsPanel ticketId={ticket.id} />
              </div>

            </div>
          </div>

          {/* Modal Footer (Optional status toggle) */}
          <div className="modal-footer border-top border-light bg-light bg-opacity-50 p-3">
             <div className="d-flex gap-2 w-100 justify-content-end">
                <button className="btn btn-link text-slate-500 text-decoration-none fw-bold" onClick={onClose}>Dismiss Panel</button>
                {ticket.status === 'OPEN' && (
                  <button className="btn btn-primary rounded-pill px-4 d-flex align-items-center gap-2 fw-bold shadow-sm" onClick={() => onUpdateStatus(ticket.id, 'IN_PROGRESS')}>
                     Start Working
                  </button>
                )}
             </div>
          </div>

        </div>
      </div>
      <style>{`
        .scroll-content { max-height: 70vh; overflow-y: auto; }
        .tracking-wider { letter-spacing: 0.1em; font-size: 0.65rem; }
        .text-slate-900 { color: #0f172a; }
        .text-slate-800 { color: #1e293b; }
        .text-slate-700 { color: #334155; }
        .text-slate-500 { color: #64748b; }
        .text-slate-400 { color: #94a3b8; }
        .border-light { border-color: #f1f5f9 !important; }
        .bg-light { background-color: #f8fafc !important; }
      `}</style>
    </div>
  );
};

export default TicketDetailsModal;
