import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { BiUserPlus, BiUser, BiEnvelope, BiLock } from 'react-icons/bi';
import axiosInstance from '../api/axiosInstance';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const response = await axiosInstance.post('/auth/register', formData);
      login(response.data);
      if (response.data.role === 'ADMIN') {
        navigate('/admin');
      } else {
        navigate('/dashboard');
      }
    } catch (err) {
      setError(err.response?.data || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-5 shadow-lg w-100" 
        style={{ maxWidth: '450px' }}
      >
        <div className="text-center mb-4">
          <div className="d-inline-flex align-items-center justify-content-center rounded-4 bg-primary bg-opacity-10 p-3 mb-3">
            <BiUserPlus size={32} className="text-primary" />
          </div>
          <h1 className="h3 fw-bold gradient-text">Create Account</h1>
          <p className="text-secondary">Join the Smart Campus Operations Hub</p>
        </div>

        {error && (
          <div className="alert alert-danger py-2 px-3 small border-0 bg-danger bg-opacity-10 text-danger mb-4 rounded-3">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-3 position-relative">
            <span className="position-absolute h-100 d-flex align-items-center ps-3 text-secondary">
              <BiUser />
            </span>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="form-control form-control-lg bg-dark bg-opacity-25 border-secondary border-opacity-25 text-white ps-5"
              placeholder="Full Name"
              required
              style={{ fontSize: '0.95rem' }}
            />
          </div>

          <div className="mb-3 position-relative">
            <span className="position-absolute h-100 d-flex align-items-center ps-3 text-secondary">
              <BiEnvelope />
            </span>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="form-control form-control-lg bg-dark bg-opacity-25 border-secondary border-opacity-25 text-white ps-5"
              placeholder="Email address"
              required
              style={{ fontSize: '0.95rem' }}
            />
          </div>

          <div className="mb-4 position-relative">
            <span className="position-absolute h-100 d-flex align-items-center ps-3 text-secondary">
              <BiLock />
            </span>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="form-control form-control-lg bg-dark bg-opacity-25 border-secondary border-opacity-25 text-white ps-5"
              placeholder="Password"
              required
              minLength={6}
              style={{ fontSize: '0.95rem' }}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary btn-lg w-100 fw-semibold rounded-3 shadow-sm mb-4"
          >
            {loading ? (
              <span className="spinner-border spinner-border-sm me-2"></span>
            ) : null}
            Create Account
          </button>
        </form>

        <p className="text-center mb-0 text-secondary">
          Already have an account?{' '}
          <Link to="/login" className="text-primary text-decoration-none">
            Sign In
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Register;
