'use client';

import { Mail, Send } from 'lucide-react';
import { FormEvent, useState } from 'react';

export function ContactForm({ email }: { email: string }) {
  const endpoint = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT;
  const [state, setState] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const mailto = `mailto:${email}?subject=${encodeURIComponent('Portfolio inquiry')}`;

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!endpoint) {
      setState('error');
      return;
    }

    setState('sending');

    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: formData
      });

      if (!response.ok) throw new Error('Form failed');
      setState('success');
      form.reset();
    } catch {
      setState('error');
    }
  }

  if (!endpoint) {
    return (
      <div className="contact-direct">
        <p className="eyebrow">Direct contact</p>
        <h3>Let&apos;s talk about the work.</h3>
        <p className="muted">
          For AI/ML, backend, or Flutter opportunities, email is the quickest way to reach me.
        </p>
        <a className="button button-primary" href={mailto}>
          <Mail size={18} />
          Email Aayush
        </a>
      </div>
    );
  }

  return (
    <form className="contact-form" onSubmit={onSubmit} action={endpoint} method="POST">
      <label className="field">
        <span>Name</span>
        <input className="input" type="text" name="name" placeholder="Your name" required />
      </label>
      <label className="field">
        <span>Email</span>
        <input className="input" type="email" name="email" placeholder="Your email" required />
      </label>
      <label className="field">
        <span>Message</span>
        <textarea className="textarea" name="message" placeholder="Tell me about the role, product, or collaboration." required />
      </label>
      <div className="contact-actions">
        <button
          className="button button-primary"
          type="submit"
          disabled={state === 'sending'}
        >
          <Send size={18} />
          {state === 'sending' ? 'Sending...' : 'Send message'}
        </button>
        <p className="form-note muted" aria-live="polite">
          {state === 'success'
            ? 'Message sent successfully.'
            : state === 'error'
              ? 'Something went wrong. Try again.'
              : 'Ready when you are.'}
        </p>
      </div>
    </form>
  );
}
