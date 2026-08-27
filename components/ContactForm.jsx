'use client';

import { useState } from 'react';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const initialState = { name: '', email: '', message: '', company: '' };

export default function ContactForm() {
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | submitting | success | error
  const [serverError, setServerError] = useState('');

  const handleChange = (field) => (event) => {
    setValues((v) => ({ ...v, [field]: event.target.value }));
  };

  const validate = () => {
    const next = {};
    if (!values.name.trim()) next.name = 'Name is required';
    if (!values.email.trim()) next.email = 'Email is required';
    else if (!EMAIL_RE.test(values.email)) next.email = 'Enter a valid email';
    if (!values.message.trim()) next.message = 'Message is required';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setServerError('');
    if (!validate()) return;

    setStatus('submitting');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      const data = await res.json();

      if (!res.ok || !data.success) {
        setServerError(data.error || 'Something went wrong — please try again.');
        setStatus('error');
        return;
      }

      setStatus('success');
      setValues(initialState);
    } catch {
      setServerError('Network error — please try again.');
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div role="status" className="rounded-2xl border border-brand-skyDeep/60 bg-white/70 p-8 text-center">
        <p className="font-heading text-lg font-semibold text-brand-ink">Message sent!</p>
        <p className="mt-2 text-sm text-brand-ink/60">
          Thanks for reaching out — we&apos;ll get back to you soon.
        </p>
        <button
          type="button"
          onClick={() => setStatus('idle')}
          className="mt-4 text-sm font-semibold text-brand-indigo hover:text-brand-indigoDeep"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      <div className="hidden" aria-hidden="true">
        <label htmlFor="company">Company</label>
        <input
          id="company"
          name="company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={values.company}
          onChange={handleChange('company')}
        />
      </div>

      <div>
        <label htmlFor="name" className="block text-sm font-medium text-brand-ink/80">
          Name
        </label>
        <input
          id="name"
          type="text"
          value={values.name}
          onChange={handleChange('name')}
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? 'name-error' : undefined}
          className="mt-1 w-full rounded-lg border border-brand-skyDeep/70 bg-white/80 px-4 py-2.5 text-sm text-brand-ink outline-none ring-brand-indigo/40 focus:ring-2"
        />
        {errors.name && (
          <p id="name-error" className="mt-1 text-xs text-red-600">
            {errors.name}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-brand-ink/80">
          Email
        </label>
        <input
          id="email"
          type="email"
          value={values.email}
          onChange={handleChange('email')}
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? 'email-error' : undefined}
          className="mt-1 w-full rounded-lg border border-brand-skyDeep/70 bg-white/80 px-4 py-2.5 text-sm text-brand-ink outline-none ring-brand-indigo/40 focus:ring-2"
        />
        {errors.email && (
          <p id="email-error" className="mt-1 text-xs text-red-600">
            {errors.email}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-brand-ink/80">
          Message
        </label>
        <textarea
          id="message"
          rows={4}
          value={values.message}
          onChange={handleChange('message')}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? 'message-error' : undefined}
          className="mt-1 w-full resize-none rounded-lg border border-brand-skyDeep/70 bg-white/80 px-4 py-2.5 text-sm text-brand-ink outline-none ring-brand-indigo/40 focus:ring-2"
        />
        {errors.message && (
          <p id="message-error" className="mt-1 text-xs text-red-600">
            {errors.message}
          </p>
        )}
      </div>

      {serverError && (
        <p role="alert" className="text-sm text-red-600">
          {serverError}
        </p>
      )}

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="w-full rounded-full bg-brand-indigo px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-indigoDeep disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === 'submitting' ? 'Sending…' : 'Send message'}
      </button>
    </form>
  );
}
