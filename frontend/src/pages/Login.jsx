import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../api';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const ROLE_ROUTES = {
    ADMIN: '/admin',
    RESIDENT: '/resident',
    SECURITY: '/security',
    SERVICE: '/service',
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await api.post('/auth/login', { email, password });
      login(res.data.data.token);
      navigate(ROLE_ROUTES[res.data.data.user.role] || '/admin');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #0A0F1E 0%, #0D1B2A 100%)',
      fontFamily: "'Inter', sans-serif",
      padding: '20px',
    }}>
      {/* Ambient glow orbs */}
      <div style={{
        position: 'fixed', top: '20%', left: '10%',
        width: '300px', height: '300px',
        background: 'rgba(79, 142, 247, 0.12)',
        borderRadius: '50%', filter: 'blur(80px)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'fixed', bottom: '20%', right: '10%',
        width: '250px', height: '250px',
        background: 'rgba(139, 92, 246, 0.12)',
        borderRadius: '50%', filter: 'blur(80px)',
        pointerEvents: 'none',
      }} />

      <div style={{
        width: '100%', maxWidth: '420px',
        background: 'rgba(255, 255, 255, 0.07)',
        backdropFilter: 'blur(20px) saturate(180%)',
        WebkitBackdropFilter: 'blur(20px) saturate(180%)',
        border: '1px solid rgba(255, 255, 255, 0.12)',
        borderRadius: '24px',
        padding: '40px',
        boxShadow: '0 16px 48px rgba(0, 0, 0, 0.4)',
        position: 'relative',
        zIndex: 1,
      }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{
            width: '52px', height: '52px',
            background: 'linear-gradient(135deg, #4F8EF7, #8B5CF6)',
            borderRadius: '14px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 16px',
            fontSize: '24px',
            boxShadow: '0 4px 20px rgba(79, 142, 247, 0.4)',
          }}>🏢</div>
          <h1 style={{ color: '#F0F4FF', fontSize: '24px', fontWeight: '700', margin: 0 }}>
            SocietyOS
          </h1>
          <p style={{ color: '#8A9BB0', fontSize: '14px', marginTop: '8px' }}>
            Sign in to your account
          </p>
        </div>

        {error && (
          <div style={{
            background: 'rgba(239, 68, 68, 0.12)',
            border: '1px solid rgba(239, 68, 68, 0.3)',
            borderRadius: '12px',
            padding: '12px 16px',
            color: '#EF4444',
            fontSize: '14px',
            marginBottom: '20px',
          }}>{error}</div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', color: '#8A9BB0', fontSize: '13px', fontWeight: '500', marginBottom: '8px' }}>
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              style={{
                width: '100%',
                background: 'rgba(255, 255, 255, 0.06)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                borderRadius: '12px',
                padding: '14px 16px',
                color: '#F0F4FF',
                fontSize: '15px',
                outline: 'none',
                boxSizing: 'border-box',
                transition: 'border-color 0.2s',
              }}
              onFocus={e => e.target.style.borderColor = 'rgba(79, 142, 247, 0.5)'}
              onBlur={e => e.target.style.borderColor = 'rgba(255, 255, 255, 0.12)'}
            />
          </div>

          <div style={{ marginBottom: '28px' }}>
            <label style={{ display: 'block', color: '#8A9BB0', fontSize: '13px', fontWeight: '500', marginBottom: '8px' }}>
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              style={{
                width: '100%',
                background: 'rgba(255, 255, 255, 0.06)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                borderRadius: '12px',
                padding: '14px 16px',
                color: '#F0F4FF',
                fontSize: '15px',
                outline: 'none',
                boxSizing: 'border-box',
                transition: 'border-color 0.2s',
              }}
              onFocus={e => e.target.style.borderColor = 'rgba(79, 142, 247, 0.5)'}
              onBlur={e => e.target.style.borderColor = 'rgba(255, 255, 255, 0.12)'}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              background: loading ? 'rgba(79, 142, 247, 0.4)' : 'linear-gradient(135deg, #4F8EF7, #8B5CF6)',
              border: 'none',
              borderRadius: '12px',
              padding: '15px',
              color: 'white',
              fontSize: '16px',
              fontWeight: '600',
              cursor: loading ? 'not-allowed' : 'pointer',
              boxShadow: loading ? 'none' : '0 4px 20px rgba(79, 142, 247, 0.35)',
              transition: 'all 0.2s ease',
              letterSpacing: '0.3px',
            }}
          >
            {loading ? 'Signing in...' : 'Sign In →'}
          </button>
        </form>

        <p style={{ textAlign: 'center', color: '#8A9BB0', fontSize: '13px', marginTop: '24px' }}>
          Admin portal only. Use the mobile app for resident & guard access.
        </p>
      </div>
    </div>
  );
}