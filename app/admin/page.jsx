'use client';

import { useCallback, useEffect, useState } from 'react';

function formatWhen(iso) {
  if (!iso) return '—';
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;
  return date.toLocaleString('en-IN', {
    dateStyle: 'medium',
    timeStyle: 'short',
  });
}

export default function AdminPanel() {
  const [authed, setAuthed] = useState(false);
  const [checking, setChecking] = useState(true);
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [tab, setTab] = useState('messages');
  const [messages, setMessages] = useState([]);
  const [events, setEvents] = useState([]);
  const [storage, setStorage] = useState('');
  const [busyId, setBusyId] = useState('');
  const [formDrafts, setFormDrafts] = useState({});
  const [notice, setNotice] = useState('');

  const loadData = useCallback(async () => {
    const [msgRes, evtRes] = await Promise.all([
      fetch('/api/admin/messages'),
      fetch('/api/admin/events'),
    ]);

    if (msgRes.status === 401 || evtRes.status === 401) {
      setAuthed(false);
      return;
    }

    const msgData = await msgRes.json();
    const evtData = await evtRes.json();

    if (msgData.success) {
      setMessages(msgData.messages || []);
      setStorage(msgData.storage || '');
    }
    if (evtData.success) {
      setEvents(evtData.events || []);
      const drafts = {};
      for (const event of evtData.events || []) {
        drafts[event.id] = event.registrationFormUrl || '';
      }
      setFormDrafts(drafts);
    }

    setAuthed(true);
  }, []);

  useEffect(() => {
    loadData()
      .catch(() => setAuthed(false))
      .finally(() => setChecking(false));
  }, [loadData]);

  const handleLogin = async (event) => {
    event.preventDefault();
    setLoginError('');
    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    });
    const data = await res.json();
    if (!res.ok || !data.success) {
      setLoginError(data.error || 'Login failed');
      return;
    }
    setPassword('');
    setChecking(true);
    await loadData();
    setChecking(false);
  };

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' });
    setAuthed(false);
    setMessages([]);
    setEvents([]);
  };

  const markStatus = async (id, status) => {
    setBusyId(id);
    setNotice('');
    try {
      const res = await fetch('/api/admin/messages', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status }),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.error);
      setMessages((prev) => prev.map((m) => (m.id === id ? { ...m, status } : m)));
    } catch (err) {
      setNotice(err.message || 'Could not update status');
    } finally {
      setBusyId('');
    }
  };

  const saveFormUrl = async (eventId) => {
    setBusyId(eventId);
    setNotice('');
    try {
      const res = await fetch('/api/admin/events', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: eventId,
          registrationFormUrl: formDrafts[eventId] || '',
        }),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.error);

      setEvents((prev) =>
        prev.map((e) =>
          e.id === eventId
            ? {
                ...e,
                registrationFormUrl: data.registrationFormUrl,
                externalLink: data.registrationFormUrl,
              }
            : e
        )
      );
      setNotice('Registration form saved. Students will see a Register button on this event.');
    } catch (err) {
      setNotice(err.message || 'Could not save form link');
    } finally {
      setBusyId('');
    }
  };

  if (checking) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-brand-offwhite text-sm text-brand-ink/60">
        Loading admin…
      </div>
    );
  }

  if (!authed) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-brand-offwhite px-6">
        <form
          onSubmit={handleLogin}
          className="w-full max-w-sm rounded-2xl border border-brand-skyDeep/60 bg-white p-8 shadow-sm"
        >
          <p className="font-heading text-sm uppercase tracking-[0.25em] text-brand-indigo/70">
            Infinitus
          </p>
          <h1 className="mt-2 font-heading text-2xl font-semibold text-brand-ink">Club admin</h1>
          <p className="mt-2 text-sm text-brand-ink/60">
            Sign in to view contact messages and attach Google Form registration links to events.
          </p>
          <label className="mt-6 block text-sm font-medium text-brand-ink/80" htmlFor="admin-password">
            Admin password
          </label>
          <input
            id="admin-password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="interactive-input mt-1 w-full rounded-lg border border-brand-skyDeep/70 bg-white px-4 py-2.5 text-sm outline-none ring-brand-indigo/40 focus:ring-2"
            autoComplete="current-password"
            required
          />
          {loginError && (
            <p role="alert" className="mt-2 text-sm text-red-600">
              {loginError}
            </p>
          )}
          <button
            type="submit"
            className="interactive-btn mt-5 w-full rounded-full bg-brand-indigo px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-indigoDeep"
          >
            Sign in
          </button>
        </form>
      </div>
    );
  }

  const upcoming = events.filter((e) => e.status === 'upcoming');
  const past = events.filter((e) => e.status !== 'upcoming');

  return (
    <div className="min-h-screen bg-brand-offwhite px-4 py-10 sm:px-8">
      <div className="mx-auto max-w-4xl">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="font-heading text-sm uppercase tracking-[0.25em] text-brand-indigo/70">
              Infinitus admin
            </p>
            <h1 className="mt-1 font-heading text-3xl font-semibold text-brand-ink">Dashboard</h1>
            <p className="mt-2 text-sm text-brand-ink/55">
              Storage: {storage === 'supabase' ? 'Supabase' : 'Local file (data/)'}
            </p>
          </div>
          <div className="flex gap-2">
            <a
              href="/"
              className="rounded-full border border-brand-skyDeep px-4 py-2 text-sm font-medium text-brand-ink/70 hover:bg-white"
            >
              View site
            </a>
            <button
              type="button"
              onClick={handleLogout}
              className="rounded-full bg-brand-indigo px-4 py-2 text-sm font-semibold text-white hover:bg-brand-indigoDeep"
            >
              Sign out
            </button>
          </div>
        </div>

        <div className="mt-8 flex gap-2 border-b border-brand-skyDeep/50 pb-2">
          {[
            { id: 'messages', label: `Messages (${messages.length})` },
            { id: 'events', label: `Event forms (${upcoming.length})` },
          ].map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setTab(item.id)}
              className={`rounded-full px-4 py-2 text-sm font-medium ${
                tab === item.id
                  ? 'bg-brand-indigo text-white'
                  : 'text-brand-ink/65 hover:bg-white'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {notice && (
          <p className="mt-4 rounded-lg border border-brand-skyDeep/60 bg-white px-4 py-3 text-sm text-brand-ink/80">
            {notice}
          </p>
        )}

        {tab === 'messages' && (
          <div className="mt-6 space-y-4">
            {messages.length === 0 ? (
              <p className="rounded-2xl border border-dashed border-brand-skyDeep bg-white/60 p-8 text-center text-sm text-brand-ink/50">
                No contact messages yet. Submissions from the website contact form will appear here.
              </p>
            ) : (
              messages.map((msg) => (
                <article
                  key={msg.id}
                  className="rounded-2xl border border-brand-skyDeep/60 bg-white p-5 shadow-sm"
                >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <h2 className="font-heading text-lg font-semibold text-brand-ink">{msg.name}</h2>
                      <a
                        href={`mailto:${msg.email}`}
                        className="text-sm text-brand-indigo hover:underline"
                      >
                        {msg.email}
                      </a>
                    </div>
                    <div className="text-right">
                      <span
                        className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${
                          msg.status === 'new'
                            ? 'bg-brand-amber/15 text-brand-amber'
                            : msg.status === 'replied'
                              ? 'bg-brand-indigo/10 text-brand-indigo'
                              : 'bg-brand-sky text-brand-ink/60'
                        }`}
                      >
                        {msg.status}
                      </span>
                      <p className="mt-1 text-xs text-brand-ink/40">{formatWhen(msg.created_at)}</p>
                    </div>
                  </div>
                  <p className="mt-4 whitespace-pre-wrap text-sm leading-relaxed text-brand-ink/75">
                    {msg.message}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {msg.status !== 'read' && (
                      <button
                        type="button"
                        disabled={busyId === msg.id}
                        onClick={() => markStatus(msg.id, 'read')}
                        className="rounded-full border border-brand-skyDeep px-3 py-1.5 text-xs font-medium text-brand-ink/70 hover:bg-brand-sky/50 disabled:opacity-50"
                      >
                        Mark read
                      </button>
                    )}
                    {msg.status !== 'replied' && (
                      <button
                        type="button"
                        disabled={busyId === msg.id}
                        onClick={() => markStatus(msg.id, 'replied')}
                        className="rounded-full border border-brand-skyDeep px-3 py-1.5 text-xs font-medium text-brand-ink/70 hover:bg-brand-sky/50 disabled:opacity-50"
                      >
                        Mark replied
                      </button>
                    )}
                  </div>
                </article>
              ))
            )}
          </div>
        )}

        {tab === 'events' && (
          <div className="mt-6 space-y-8">
            <section>
              <h2 className="font-heading text-xl font-semibold text-brand-ink">Upcoming events</h2>
              <p className="mt-1 text-sm text-brand-ink/55">
                Paste a Google Form link for each event. Students will open event details and register
                directly through that form.
              </p>
              <div className="mt-4 space-y-4">
                {upcoming.length === 0 ? (
                  <p className="text-sm text-brand-ink/50">No upcoming events.</p>
                ) : (
                  upcoming.map((event) => (
                    <div
                      key={event.id}
                      className="rounded-2xl border border-brand-skyDeep/60 bg-white p-5 shadow-sm"
                    >
                      <div className="flex flex-wrap items-start justify-between gap-2">
                        <div>
                          <h3 className="font-heading text-lg font-semibold text-brand-ink">
                            {event.title}
                          </h3>
                          <p className="mt-1 text-sm text-brand-ink/50">
                            {event.eventDate}
                            {event.venue ? ` · ${event.venue}` : ''}
                          </p>
                        </div>
                        {event.registrationFormUrl ? (
                          <span className="rounded-full bg-brand-indigo/10 px-2.5 py-1 text-xs font-semibold text-brand-indigo">
                            Form linked
                          </span>
                        ) : (
                          <span className="rounded-full bg-brand-amber/15 px-2.5 py-1 text-xs font-semibold text-brand-amber">
                            Needs form
                          </span>
                        )}
                      </div>
                      {event.description && (
                        <p className="mt-3 text-sm text-brand-ink/70">{event.description}</p>
                      )}
                      <label className="mt-4 block text-xs font-semibold uppercase tracking-wide text-brand-ink/50">
                        Google Form registration URL
                      </label>
                      <div className="mt-1 flex flex-col gap-2 sm:flex-row">
                        <input
                          type="url"
                          placeholder="https://forms.gle/… or https://docs.google.com/forms/…"
                          value={formDrafts[event.id] || ''}
                          onChange={(e) =>
                            setFormDrafts((prev) => ({ ...prev, [event.id]: e.target.value }))
                          }
                          className="interactive-input w-full flex-1 rounded-lg border border-brand-skyDeep/70 bg-white px-3 py-2 text-sm outline-none ring-brand-indigo/40 focus:ring-2"
                        />
                        <button
                          type="button"
                          disabled={busyId === event.id}
                          onClick={() => saveFormUrl(event.id)}
                          className="interactive-btn shrink-0 rounded-full bg-brand-indigo px-5 py-2 text-sm font-semibold text-white hover:bg-brand-indigoDeep disabled:opacity-50"
                        >
                          {busyId === event.id ? 'Saving…' : 'Save form'}
                        </button>
                      </div>
                      {event.registrationFormUrl && (
                        <a
                          href={event.registrationFormUrl}
                          target="_blank"
                          rel="noreferrer noopener"
                          className="mt-2 inline-block text-xs font-medium text-brand-indigo hover:underline"
                        >
                          Open current form →
                        </a>
                      )}
                    </div>
                  ))
                )}
              </div>
            </section>

            {past.length > 0 && (
              <section>
                <h2 className="font-heading text-xl font-semibold text-brand-ink">Past events</h2>
                <p className="mt-1 text-sm text-brand-ink/55">
                  You can still attach a form if a past event needs late registration.
                </p>
                <div className="mt-4 space-y-3">
                  {past.map((event) => (
                    <div
                      key={event.id}
                      className="rounded-xl border border-brand-skyDeep/40 bg-white/70 p-4"
                    >
                      <h3 className="font-heading font-semibold text-brand-ink">{event.title}</h3>
                      <div className="mt-2 flex flex-col gap-2 sm:flex-row">
                        <input
                          type="url"
                          placeholder="Optional Google Form URL"
                          value={formDrafts[event.id] || ''}
                          onChange={(e) =>
                            setFormDrafts((prev) => ({ ...prev, [event.id]: e.target.value }))
                          }
                          className="w-full flex-1 rounded-lg border border-brand-skyDeep/60 bg-white px-3 py-2 text-sm"
                        />
                        <button
                          type="button"
                          disabled={busyId === event.id}
                          onClick={() => saveFormUrl(event.id)}
                          className="rounded-full border border-brand-skyDeep px-4 py-2 text-sm font-medium text-brand-ink/70 hover:bg-white disabled:opacity-50"
                        >
                          Save
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
