import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { BiLogIn, BiEnvelope, BiLock, BiGlobe } from 'react-icons/bi';
import axiosInstance from '../api/axiosInstance';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const response = await axiosInstance.post('/auth/login', { email, password });
      login(response.data);
      if (response.data.role === 'ADMIN') {
        navigate('/admin');
      } else {
        navigate('/dashboard');
      }
    } catch (err) {
      setError(err.response?.data || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = 'http://localhost:8080/oauth2/authorization/google';
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
            <BiLogIn size={32} className="text-primary" />
          </div>
          <h1 className="h3 fw-bold gradient-text">Welcome Back</h1>
          <p className="text-secondary">Sign in to your Smart Campus account</p>
        </div>

        {error && (
          <div className="alert alert-danger py-2 px-3 small border-0 bg-danger bg-opacity-10 text-danger mb-4 rounded-3">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-3 position-relative">
            <span className="position-absolute h-100 d-flex align-items-center ps-3 text-secondary">
              <BiEnvelope />
            </span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control form-control-lg bg-dark bg-opacity-25 border-secondary border-opacity-25 text-white ps-5"
              placeholder="Password"
              required
              style={{ fontSize: '0.95rem' }}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary btn-lg w-100 fw-semibold rounded-3 shadow-sm mb-3"
          >
            {loading ? (
              <span className="spinner-border spinner-border-sm me-2"></span>
            ) : null}
            Sign In
          </button>
        </form>

        <div className="my-4 position-relative text-center">
          <hr className="text-secondary opacity-25" />
          <span className="position-absolute top-50 start-50 translate-middle px-3 bg-dark text-secondary small">
            Or continue with
          </span>
        </div>

        <button
          onClick={handleGoogleLogin}
          className="btn btn-light btn-lg w-100 fw-semibold rounded-3 d-flex align-items-center justify-content-center gap-2 mb-4"
        >
          <BiGlobe size={20} className="text-primary" />
          Sign in with Google
        </button>

        <p className="text-center mb-0 text-secondary">
          Don't have an account?{' '}
          <Link to="/register" className="text-primary text-decoration-none">
            Create one
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
