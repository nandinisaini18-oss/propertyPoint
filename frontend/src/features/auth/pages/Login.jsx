import { useState, useId } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { useAuth } from '../hook/useAuth';
import AuthLayout, {
  IconMail,
  IconLock,
  IconEye,
  IconEyeOff,
  IconAlert,
} from '../components/AuthLayout';

// ─── Login Page ──────────────────────────────────────────────
const Login = () => {
  const navigate = useNavigate();
  const { handleLogin } = useAuth();
  const emailId    = useId();
  const passwordId = useId();
  const rememberId = useId();

  const [form, setForm] = useState({ email: '', password: '', remember: false });
  const [errors, setErrors]     = useState({});
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading]   = useState(false);

  // ── Validation
  const validate = () => {
    const e = {};
    if (!form.email.trim()) {
      e.email = 'Email address is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      e.email = 'Please enter a valid email address.';
    }
    if (!form.password) {
      e.password = 'Password is required.';
    } else if (form.password.length < 6) {
      e.password = 'Password must be at least 6 characters.';
    }
    return e;
  };

  const handleChange = (field) => (e) => {
    const val = field === 'remember' ? e.target.checked : e.target.value;
    setForm((prev) => ({ ...prev, [field]: val }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
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
    const data = await handleLogin({
    email: form.email,
    password: form.password,
});

if (data.user.role === "admin") {
    navigate("/admin/dashboard");
} else {
    navigate("/");
}

  } catch (err) {
      console.log(err);

      setErrors({
        general:
          err.response?.data?.message || "Invalid email or password",
      });
    } finally {
      setLoading(false);
    }
  };

  const isDisabled = loading || !form.email || !form.password;

  return (
    <AuthLayout>
      {/* Header */}
      <div className="auth-card__header">
        <h2 className="auth-card__title">Welcome back</h2>
        <p className="auth-card__subtitle">
          Sign in to your account to continue exploring properties.
        </p>
      </div>

      {/* Form */}
      <form className="auth-form" onSubmit={handleSubmit} noValidate>

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

        {/* Password */}
        <div className="form-group">
          <label htmlFor={passwordId} className="form-label">Password</label>
          <div className="input-wrapper">
            <span className="input-icon"><IconLock /></span>
            <input
              id={passwordId}
              type={showPass ? 'text' : 'password'}
              autoComplete="current-password"
              placeholder="Enter your password"
              value={form.password}
              onChange={handleChange('password')}
              className={`form-input has-toggle${errors.password ? ' input--error' : ''}`}
              aria-describedby={errors.password ? `${passwordId}-err` : undefined}
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
          {errors.password && (
            <span id={`${passwordId}-err`} className="form-error" role="alert">
              <IconAlert /> {errors.password}
            </span>
          )}
        </div>

        {/* Remember Me + Forgot Password */}
        <div className="form-meta">
          <label htmlFor={rememberId} className="checkbox-group">
            <input
              id={rememberId}
              type="checkbox"
              checked={form.remember}
              onChange={handleChange('remember')}
              disabled={loading}
            />
            <span className="checkbox-label">Remember me</span>
          </label>
          <a href="#forgot" className="forgot-link">Forgot Password?</a>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="btn-primary"
          disabled={isDisabled}
          aria-busy={loading}
        >
          {loading ? (
            <>
              <span className="spinner" aria-hidden="true" />
              Signing in…
            </>
          ) : (
            'Sign In'
          )}
        </button>

      </form>

      {/* Footer */}
      <p className="auth-footer">
        Don&apos;t have an account?&nbsp;
        <Link to="/register">Create Account</Link>
      </p>
    </AuthLayout>
  );
};

export default Login;
