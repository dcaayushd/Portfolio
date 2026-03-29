'use client';

import { Send } from 'lucide-react';
import { FormEvent, useState } from 'react';

export function ContactForm() {
  const endpoint = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT;
  const [state, setState] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

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
          className={`button ${endpoint ? 'button-primary' : 'button-secondary'}`}
          type="submit"
          disabled={!endpoint || state === 'sending'}
        >
          <Send size={18} />
          {endpoint ? (state === 'sending' ? 'Sending...' : 'Send message') : 'Form unavailable'}
        </button>
        <p className="form-note muted" aria-live="polite">
          {endpoint
            ? state === 'success'
              ? 'Message sent successfully.'
              : state === 'error'
                ? 'Something went wrong. Try again.'
                : 'Ready when you are.'
            : state === 'error'
              ? 'Add NEXT_PUBLIC_FORMSPREE_ENDPOINT in .env.local first.'
              : 'Set NEXT_PUBLIC_FORMSPREE_ENDPOINT in .env.local.'}
        </p>
      </div>
    </form>
  );
}
