import React, { useState, useEffect } from 'react';
import Sidebar from '../components/dashboard/Sidebar';
import Topbar from '../components/dashboard/Topbar';
import StatsCards from '../components/dashboard/StatsCards';
import BookingList from '../components/dashboard/BookingList';
import TicketList from '../components/dashboard/TicketList';
import QuickActions from '../components/dashboard/QuickActions';
import NotificationPanel from '../components/dashboard/NotificationPanel';
import { useAuth } from '../context/AuthContext';
import axiosInstance from '../api/axiosInstance';
import { motion } from 'framer-motion';

const UserDashboard = () => {
  const { user } = useAuth();
  const [data, setData] = useState({
    bookings: [],
    tickets: [],
    notifications: [],
    stats: {
      totalBookings: 0,
      activeBookings: 0,
      openTickets: 0,
      notifications: 0
    }
  });
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Fetching real data from endpoints
        const [bookingsRes, ticketsRes, notifRes] = await Promise.all([
          axiosInstance.get('/bookings/my').catch(() => ({ data: [] })),
          axiosInstance.get('/tickets/my').catch(() => ({ data: [] })),
          axiosInstance.get('/notifications').catch(() => ({ data: [] }))
        ]);

        // Sample data if API returns empty (for demonstration)
        const sampleBookings = bookingsRes.data.length ? bookingsRes.data : [
          { id: 1, resourceName: 'Conference Room A', date: '2026-04-20', time: '10:00 AM', status: 'APPROVED' },
          { id: 2, resourceName: 'Projector #4', date: '2026-04-22', time: '02:30 PM', status: 'PENDING' },
          { id: 3, resourceName: 'Auditorium Main', date: '2026-04-25', time: '09:00 AM', status: 'REJECTED' },
        ];

        const sampleTickets = ticketsRes.data.length ? ticketsRes.data : [
          { id: 1, title: 'AC Leakage in Room 302', priority: 'HIGH', status: 'IN_PROGRESS', assignedTechnician: 'John Smith' },
          { id: 2, title: 'Network Connectivity Issue', priority: 'MEDIUM', status: 'OPEN', assignedTechnician: null },
        ];

        setData({
          bookings: sampleBookings,
          tickets: sampleTickets,
          notifications: notifRes.data,
          stats: {
            totalBookings: sampleBookings.length,
            activeBookings: sampleBookings.filter(b => b.status === 'APPROVED').length,
            openTickets: sampleTickets.filter(t => t.status === 'OPEN').length,
            notifications: notifRes.data.length
          }
        });
      } catch (error) {
        console.error("Error fetching dashboard data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div className="d-flex bg-dark" style={{ minHeight: '100vh' }}>
      {/* Sidebar - Fixed on desktop */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-grow-1 d-flex flex-column" style={{ marginLeft: '260px' }}>
        <Topbar notificationCount={data.stats.notifications} />

        <main className="p-4 p-lg-5 overflow-auto">
          {/* Welcome Section */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-5"
          >
            <h2 className="display-6 fw-bold text-white mb-2 underline-primary">
              Welcome back, <span className="gradient-text">{user}</span>
            </h2>
            <p className="text-secondary">Here's what's happening on campus today.</p>
          </motion.div>

          {/* Stats Cards Section */}
          <StatsCards stats={data.stats} />

          <div className="row g-4">
            {/* Recent Bookings Section */}
            <div className="col-12 col-xl-8">
              <BookingList bookings={data.bookings} />
            </div>

            <div className="col-12 col-xl-4">
              <div className="d-flex flex-column gap-4 h-100">
                {/* Quick Actions Component */}
                <QuickActions />
                
                {/* Recent Tickets Component */}
                <TicketList tickets={data.tickets} />
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Slide-in Notifications Panel */}
      <NotificationPanel 
        notifications={data.notifications} 
        isOpen={isNotifOpen} 
        onClose={() => setIsNotifOpen(false)} 
      />

      <style>{`
        .underline-primary {
          position: relative;
          display: inline-block;
        }
        .underline-primary::after {
          content: '';
          position: absolute;
          left: 0;
          bottom: -10px;
          width: 50px;
          height: 4px;
          background: var(--primary-color);
          border-radius: 2px;
        }
        @media (max-width: 991.98px) {
          .flex-grow-1 {
            margin-left: 0 !important;
          }
        }
      `}</style>
    </div>
  );
};

export default UserDashboard;
