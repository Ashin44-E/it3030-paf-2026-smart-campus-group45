import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import TechnicianSidebar from '../components/technician-dashboard/TechnicianSidebar';
import TechnicianTopbar from '../components/technician-dashboard/TechnicianTopbar';
import TechnicianStatsCards from '../components/technician-dashboard/TechnicianStatsCards';
import AssignedTicketsPanel from '../components/technician-dashboard/AssignedTicketsPanel';
import TicketDetailsModal from '../components/technician-dashboard/TicketDetailsModal';
import NotificationsPanel from '../components/technician-dashboard/NotificationsPanel';
import WorkSummaryPanel from '../components/technician-dashboard/WorkSummaryPanel';
import { useAuth } from '../context/AuthContext';
import axiosInstance from '../api/axiosInstance';

const TechnicianDashboard = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const [data, setData] = useState({
    stats: {
      assignedTickets: 0,
      inProgressTickets: 0,
      resolvedTickets: 0,
      notifications: 0
    },
    tickets: [],
    notifications: []
  });

  useEffect(() => {
    const fetchTechnicianData = async () => {
      try {
        const [resTickets, resNotifs] = await Promise.all([
          axiosInstance.get('/tickets/assigned').catch(() => ({ data: [] })),
          axiosInstance.get('/notifications').catch(() => ({ data: [] }))
        ]);

        // Mock data for initial development
        const mockTickets = resTickets.data.length ? resTickets.data : [
          { 
            id: 'T-882', 
            title: 'AC Unit Malfunction - Hall 3', 
            category: 'HVAC', 
            priority: 'HIGH', 
            status: 'IN_PROGRESS', 
            reportedBy: 'Dr. Sarah Miller',
            reportedDate: '2026-04-16',
            resourceName: 'Lecture Hall 3',
            description: 'The AC unit is making loud grinding noises and not cooling the room. It started during a lecture this morning.'
          },
          { 
            id: 'T-885', 
            title: 'Broken Projector Screen', 
            category: 'IT / AV', 
            priority: 'MEDIUM', 
            status: 'OPEN', 
            reportedBy: 'Student Union',
            reportedDate: '2026-04-15',
            resourceName: 'Meeting Room B',
            description: 'The automated screen is stuck halfway and wont respond to controls.'
          }
        ];

        const mockNotifs = resNotifs.data.length ? resNotifs.data : [
          { id: 1, type: 'ASSIGNMENT', message: 'New high priority ticket assigned: AC Unit Hall 3', timestamp: '1 hour ago', read: false },
          { id: 2, type: 'COMMENT', message: 'Admin Alice added a comment to Ticket #T-882', timestamp: '2 hours ago', read: true }
        ];

        setData({
          stats: {
            assignedTickets: mockTickets.length,
            inProgressTickets: mockTickets.filter(t => t.status === 'IN_PROGRESS').length,
            resolvedTickets: 12, // Dummy historical stat
            notifications: mockNotifs.filter(n => !n.read).length
          },
          tickets: mockTickets,
          notifications: mockNotifs
        });
      } catch (err) {
        console.error("Failed to fetch technician data", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTechnicianData();
  }, []);

  const handleUpdateStatus = async (id, newStatus) => {
    try {
      // Real API: await axiosInstance.patch(`/tickets/${id}/status`, { status: newStatus });
      setData(prev => ({
        ...prev,
        tickets: prev.tickets.map(t => t.id === id ? { ...t, status: newStatus } : t)
      }));
      if (selectedTicket && selectedTicket.id === id) {
        setSelectedTicket({ ...selectedTicket, status: newStatus });
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleSaveResolution = async (id, resolution) => {
     console.log("Saving resolution for", id, resolution);
     // Real API: await axiosInstance.patch(`/tickets/${id}/resolution`, resolution);
  };

  const openTicketDetails = (ticket) => {
    setSelectedTicket(ticket);
    setIsModalOpen(true);
  };

  return (
    <div className="d-flex bg-light min-vh-100 overflow-hidden">
      {/* Technician Sidebar */}
      <TechnicianSidebar />

      {/* Main Content Area */}
      <div className="flex-grow-1 d-flex flex-column overflow-auto" style={{ marginLeft: '280px' }}>
        <TechnicianTopbar notificationCount={data.stats.notifications} />

        <main className="p-4 p-lg-5">
          {/* Welcome Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-5 d-flex justify-content-between align-items-end border-bottom border-white pb-4"
          >
            <div>
              <h1 className="h2 fw-bold text-slate-900 mb-2">
                Technician <span className="text-primary">Console</span>
              </h1>
              <p className="text-slate-500 fw-medium">Smart Campus Infrastructure Management System</p>
            </div>
            <div className="text-end d-none d-md-block">
              <span className="badge bg-white border border-light text-success fw-bold px-3 py-2 shadow-sm rounded-pill d-flex align-items-center gap-2">
                 <div className="p-1 rounded-circle bg-success shadow-sm" style={{ width: '8px', height: '8px' }}></div>
                 System Operative: Online
              </span>
            </div>
          </motion.div>

          {/* Stats Section */}
          <TechnicianStatsCards stats={data.stats} />

          <div className="row g-4 mb-4">
            {/* Main Work Panel */}
            <div className="col-12 col-xl-8">
              <AssignedTicketsPanel 
                tickets={data.tickets} 
                onViewDetails={openTicketDetails}
                onUpdateStatus={handleUpdateStatus}
              />
            </div>

            {/* Notifications & Metrics Side Column */}
            <div className="col-12 col-xl-4 d-flex flex-column gap-4">
              <NotificationsPanel notifications={data.notifications} />
              <WorkSummaryPanel />
            </div>
          </div>
        </main>
      </div>

      {/* Detail Modal Container */}
      <TicketDetailsModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        ticket={selectedTicket}
        onUpdateStatus={handleUpdateStatus}
        onSaveNote={handleSaveResolution}
      />

      <style>{`
        .text-slate-900 { color: #0f172a; }
        .text-slate-800 { color: #1e293b; }
        .text-slate-500 { color: #64748b; }
        .border-light { border-color: #f1f5f9 !important; }
        @media (max-width: 991.98px) {
          .flex-grow-1 { margin-left: 0 !important; }
        }
      `}</style>
    </div>
  );
};

export default TechnicianDashboard;
