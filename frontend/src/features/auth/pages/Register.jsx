import { useState, useId } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import {useAuth} from '../hook/useAuth';

import AuthLayout, {
  IconUser,
  IconMail,
  IconPhone,
  IconLock,
  IconEye,
  IconEyeOff, 
  IconAlert,
  IconHome,
  IconBriefcase,
  IconKey,
} from '../components/AuthLayout';

// ─── Register Page ───────────────────────────────────────────
const Register = () => {
  const navigate = useNavigate();

  const { handleRegister } = useAuth();
  const nameId     = useId();
  const emailId    = useId();
  const phoneId    = useId();
  const passId     = useId();
  const confirmId  = useId();

  const [form, setForm] = useState({
    fullName:        '',
    email:           '',
    phone:           '',
    password:        '',
    confirmPassword: '',
    role:            'user',   // 'user' | 'owner'
  });

  const [errors, setErrors]       = useState({});
  const [showPass, setShowPass]   = useState(false);
  const [showConf, setShowConf]   = useState(false);
  const [loading, setLoading]     = useState(false);

  // ── Validation
  const validate = () => {
    const e = {};

    if (!form.fullName.trim()) {
      e.fullName = 'Full name is required.';
    } else if (form.fullName.trim().length < 2) {
      e.fullName = 'Name must be at least 2 characters.';
    }

    if (!form.email.trim()) {
      e.email = 'Email address is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      e.email = 'Please enter a valid email address.';
    }

    if (!form.phone.trim()) {
      e.phone = 'Contact number is required.';
    } else if (!/^\+?[\d\s\-().]{7,15}$/.test(form.phone)) {
      e.phone = 'Please enter a valid contact number.';
    }

    if (!form.password) {
      e.password = 'Password is required.';
    } else if (form.password.length < 8) {
      e.password = 'Password must be at least 8 characters.';
    }

    if (!form.confirmPassword) {
      e.confirmPassword = 'Please confirm your password.';
    } else if (form.password !== form.confirmPassword) {
      e.confirmPassword = 'Passwords do not match.';
    }

    return e;
  };

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleRoleChange = (value) => {
    setForm((prev) => ({ ...prev, role: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errs = validate();

    if (Object.keys(errs).length) {
        setErrors(errs);
        return;
    }

    setLoading(true);

    try {

        await handleRegister({
            fullname: form.fullName,
            email: form.email,
            password: form.password,
            contact: form.phone,
            role: form.role,
        });

        navigate("/login");

    } catch (err) {

        console.log(err);

    } finally {

        setLoading(false);

    }
};

  const isDisabled = loading
    || !form.fullName
    || !form.email
    || !form.phone
    || !form.password
    || !form.confirmPassword;

  // Password strength
  const getStrength = (p) => {
    if (!p) return null;
    const checks = [p.length >= 8, /[A-Z]/.test(p), /[0-9]/.test(p), /[^A-Za-z0-9]/.test(p)];
    const score = checks.filter(Boolean).length;
    if (score <= 1) return { label: 'Weak', color: '#EF4444', width: '25%' };
    if (score === 2) return { label: 'Fair', color: '#F59E0B', width: '50%' };
    if (score === 3) return { label: 'Good', color: '#10B981', width: '75%' };
    return { label: 'Strong', color: '#059669', width: '100%' };
  };

  const strength = getStrength(form.password);

  return (
    <AuthLayout>
      {/* Header */}
      <div className="auth-card__header">
        <h2 className="auth-card__title">Create your account</h2>
        <p className="auth-card__subtitle">
          Join thousands of buyers and owners on 360Views.
        </p>
      </div>

      {/* Form */}
      <form className="auth-form" onSubmit={handleSubmit} noValidate>

        {/* Full Name */}
        <div className="form-group">
          <label htmlFor={nameId} className="form-label">Full Name</label>
          <div className="input-wrapper">
            <span className="input-icon"><IconUser /></span>
            <input
              id={nameId}
              type="text"
              autoComplete="name"
              placeholder="John Doe"
              value={form.fullName}
              onChange={handleChange('fullName')}
              className={`form-input${errors.fullName ? ' input--error' : ''}`}
              aria-describedby={errors.fullName ? `${nameId}-err` : undefined}
              aria-invalid={!!errors.fullName}
              disabled={loading}
            />
          </div>
          {errors.fullName && (
            <span id={`${nameId}-err`} className="form-error" role="alert">
              <IconAlert /> {errors.fullName}
            </span>
          )}
        </div>

        {/* Email */}
        <div className="form-group">
          <label htmlFor={emailId} className="form-label">Email Address</label>
          <div className="input-wrapper">
            <span className="input-icon"><IconMail /></span>
            <input
              id={emailId}
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={handleChange('email')}
              className={`form-input${errors.email ? ' input--error' : ''}`}
              aria-describedby={errors.email ? `${emailId}-err` : undefined}
              aria-invalid={!!errors.email}
              disabled={loading}
            />
          </div>
          {errors.email && (
            <span id={`${emailId}-err`} className="form-error" role="alert">
              <IconAlert /> {errors.email}
            </span>
          )}
        </div>

        {/* Phone */}
        <div className="form-group">
          <label htmlFor={phoneId} className="form-label">Contact Number</label>
          <div className="input-wrapper">
            <span className="input-icon"><IconPhone /></span>
            <input
              id={phoneId}
              type="tel"
              autoComplete="tel"
              placeholder="+91 98765 43210"
              value={form.phone}
              onChange={handleChange('phone')}
              className={`form-input${errors.phone ? ' input--error' : ''}`}
              aria-describedby={errors.phone ? `${phoneId}-err` : undefined}
              aria-invalid={!!errors.phone}
              disabled={loading}
            />
          </div>
          {errors.phone && (
            <span id={`${phoneId}-err`} className="form-error" role="alert">
              <IconAlert /> {errors.phone}
            </span>
          )}
        </div>

        {/* Password */}
        <div className="form-group">
          <label htmlFor={passId} className="form-label">Password</label>
          <div className="input-wrapper">
            <span className="input-icon"><IconLock /></span>
            <input
              id={passId}
              type={showPass ? 'text' : 'password'}
              autoComplete="new-password"
              placeholder="Min. 8 characters"
              value={form.password}
              onChange={handleChange('password')}
              className={`form-input has-toggle${errors.password ? ' input--error' : ''}`}
              aria-describedby={errors.password ? `${passId}-err` : `${passId}-hint`}
              aria-invalid={!!errors.password}
              disabled={loading}
            />
            <button
              type="button"
              className="input-toggle"
              onClick={() => setShowPass((v) => !v)}
              aria-label={showPass ? 'Hide password' : 'Show password'}
              tabIndex={0}
            >
              {showPass ? <IconEyeOff /> : <IconEye />}
            </button>
          </div>
          {/* Password strength bar */}
          {strength && !errors.password && (
            <div id={`${passId}-hint`} style={{ marginTop: '6px' }}>
              <div
                style={{
                  height: '3px',
                  background: '#E2E8F0',
                  borderRadius: '99px',
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    height: '100%',
                    width: strength.width,
                    background: strength.color,
                    borderRadius: '99px',
                    transition: 'width 0.3s ease, background 0.3s ease',
                  }}
                />
              </div>
              <span
                className="form-hint"
                style={{ color: strength.color, fontWeight: 600 }}
              >
                {strength.label} password
              </span>
            </div>
          )}
          {errors.password && (
            <span id={`${passId}-err`} className="form-error" role="alert">
              <IconAlert /> {errors.password}
            </span>
          )}
        </div>

        {/* Confirm Password */}
        <div className="form-group">
          <label htmlFor={confirmId} className="form-label">Confirm Password</label>
          <div className="input-wrapper">
            <span className="input-icon"><IconKey /></span>
            <input
              id={confirmId}
              type={showConf ? 'text' : 'password'}
              autoComplete="new-password"
              placeholder="Re-enter your password"
              value={form.confirmPassword}
              onChange={handleChange('confirmPassword')}
              className={`form-input has-toggle${errors.confirmPassword ? ' input--error' : ''}`}
              aria-describedby={errors.confirmPassword ? `${confirmId}-err` : undefined}
              aria-invalid={!!errors.confirmPassword}
              disabled={loading}
            />
            <button
              type="button"
              className="input-toggle"
              onClick={() => setShowConf((v) => !v)}
              aria-label={showConf ? 'Hide confirm password' : 'Show confirm password'}
              tabIndex={0}
            >
              {showConf ? <IconEyeOff /> : <IconEye />}
            </button>
          </div>
          {errors.confirmPassword && (
            <span id={`${confirmId}-err`} className="form-error" role="alert">
              <IconAlert /> {errors.confirmPassword}
            </span>
          )}
        </div>

        {/* Role Selector */}
        <div className="form-group">
          <span className="form-label" id="role-label">I am a</span>
          <div className="role-selector" role="radiogroup" aria-labelledby="role-label">
            {/* Buyer */}
            <div className="role-option">
              <input
                type="radio"
                id="role-buyer"
                name="role"
                value="user"
                checked={form.role === 'user'}
                onChange={() => handleRoleChange('user')}
                disabled={loading}
              />
              <label htmlFor="role-buyer" className="role-option__label">
                <span className="role-option__icon"><IconHome /></span>
                <span className="role-option__text">Buyer</span>
              </label>
            </div>
            {/* Property Owner */}
            <div className="role-option">
              <input
                type="radio"
                id="role-owner"
                name="role"
                value="owner"
                checked={form.role === 'owner'}
                onChange={() => handleRoleChange('owner')}
                disabled={loading}
              />
              <label htmlFor="role-owner" className="role-option__label">
                <span className="role-option__icon"><IconBriefcase /></span>
                <span className="role-option__text">Property Owner</span>
              </label>
            </div>
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="btn-primary"
          disabled={isDisabled}
          aria-busy={loading}
          style={{ marginTop: '6px' }}
        >
          {loading ? (
            <>
              <span className="spinner" aria-hidden="true" />
              Creating account…
            </>
          ) : (
            'Create Account'
          )}
        </button>

      </form>

      {/* Footer */}
      <p className="auth-footer">
        Already have an account?&nbsp;
        <Link to="/login">Sign In</Link>
      </p>
    </AuthLayout>
  );
};

export default Register;
