'use client';

import { useState } from 'react';
import { ArrowUpRight, Check, Copy, FileText, Mail, MessageCircle, Phone } from 'lucide-react';
import { site } from '@/config/site';
import { external } from '@/lib/utils';
import { SocialIcon } from './Icons';
import Magnetic from './Magnetic';
import Reveal from './Reveal';

const { contact, identity, labels: L } = site;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validate(values) {
  const errors = {};
  if (!values.name.trim()) errors.name = 'Please tell me your name.';
  if (!EMAIL_RE.test(values.email.trim())) errors.email = 'Please enter a valid email address.';
  if (values.message.trim().length < 10) errors.message = 'Your message needs at least 10 characters.';
  return errors;
}

function ContactForm() {
  const reasons = contact.reasons || [];
  const [values, setValues] = useState({ reason: reasons[0] || '', name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('');

  const update = (e) => {
    const { name, value } = e.target;
    setValues((v) => ({ ...v, [name]: value }));
    if (errors[name]) setErrors((err) => ({ ...err, [name]: undefined }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length) {
      setStatus('');
      e.currentTarget.querySelector(`[name="${Object.keys(found)[0]}"]`)?.focus();
      return;
    }
    // Static site: hand the message to the visitor's email app instead of pretending to send it.
    const subject = `${values.reason ? `${values.reason}: ` : ''}enquiry from ${values.name.trim()}`;
    const body = `${values.message.trim()}\n\n— ${values.name.trim()} (${values.email.trim()})`;
    window.location.href = `mailto:${contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setStatus(`Your email app should now open with this message ready to send. If nothing happened, email me at ${contact.email}.`);
  };

  const field = (name, label, props = {}) => {
    const Tag = props.rows ? 'textarea' : 'input';
    const errId = `${name}-error`;
    return (
      <div className={`field${errors[name] ? ' has-error' : ''}`}>
        <label htmlFor={`f-${name}`}>{label}</label>
        <Tag
          id={`f-${name}`}
          name={name}
          value={values[name]}
          onChange={update}
          aria-invalid={errors[name] ? 'true' : undefined}
          aria-describedby={errors[name] ? errId : undefined}
          {...props}
        />
        {errors[name] ? (
          <p className="field__error" id={errId}>
            {errors[name]}
          </p>
        ) : null}
      </div>
    );
  };

  return (
    <form className="contact-form" onSubmit={onSubmit} noValidate aria-labelledby="form-title">
      <h3 className="label-heading" id="form-title">
        Write to me
      </h3>
      {reasons.length ? (
        <fieldset className="reasons">
          <legend>I’m reaching out about</legend>
          <div className="reasons__options">
            {reasons.map((r) => (
              <label key={r} className="reason">
                <input type="radio" name="reason" value={r} checked={values.reason === r} onChange={update} />
                <span>{r}</span>
              </label>
            ))}
          </div>
        </fieldset>
      ) : null}
      <div className="contact-form__row">
        {field('name', L.formName, { type: 'text', autoComplete: 'name', required: true })}
        {field('email', L.formEmail, { type: 'email', autoComplete: 'email', required: true })}
      </div>
      {field('message', L.formMessage, { rows: 5, required: true })}
      <div className="contact-form__foot">
        <button type="submit" className="btn btn--primary">
          <Mail size={17} aria-hidden="true" /> {L.formSend}
        </button>
        <p className="footnote">Opens your email app with the message filled in. Nothing is stored on this site.</p>
      </div>
      <p className="form-status" role="status">
        {status}
      </p>
    </form>
  );
}

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(contact.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      setCopied(false);
    }
  };

  const whatsappHref = contact.whatsapp
    ? `https://wa.me/${contact.whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent(`Hi ${identity.nameLines[0]}, I saw your portfolio and would like to talk.`)}`
    : '';

  return (
    <section id="contact" className="section contact" aria-labelledby="contact-title">
      <div className="container">
        <Reveal as="header" className="contact__hero">
          <h2 id="contact-title" className="contact__big">
            <span>{contact.heading[0]}</span> <span className="accent">{contact.heading[1]}</span>
          </h2>
          <p className="contact__blurb">{contact.blurb}</p>
        </Reveal>

        <div className="contact__grid">
          <Reveal className="contact__direct">
            <h3 className="label-heading">Email</h3>
            <div className="email-row">
              <Magnetic strength={0.12}>
                <a className="email-link" href={`mailto:${contact.email}`}>
                  {contact.email}
                </a>
              </Magnetic>
              <button type="button" className="icon-btn" onClick={copy}>
                {copied ? <Check size={18} aria-hidden="true" /> : <Copy size={18} aria-hidden="true" />}
                <span className="sr-only">{L.copyEmail}</span>
              </button>
              <span className="copy-status" role="status">
                {copied ? L.copied : ''}
              </span>
            </div>

            <h3 className="label-heading">Elsewhere</h3>
            <ul className="socials">
              {contact.socials.map((s) => (
                <li key={s.href}>
                  <a href={s.href} {...external}>
                    <SocialIcon name={s.icon} size={20} />
                    <span className="socials__label">{s.label}</span>
                    <span className="socials__handle">{s.handle}</span>
                    <ArrowUpRight size={18} aria-hidden="true" />
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </li>
              ))}
              {identity.resume ? (
                <li>
                  <a href={identity.resume} {...external}>
                    <FileText size={20} aria-hidden="true" />
                    <span className="socials__label">{L.resume}</span>
                    <span className="socials__handle">Google Drive · PDF</span>
                    <ArrowUpRight size={18} aria-hidden="true" />
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </li>
              ) : null}
              {contact.phone ? (
                <li>
                  <a href={`tel:${contact.phone.replace(/\s/g, '')}`}>
                    <Phone size={20} aria-hidden="true" />
                    <span className="socials__label">Phone</span>
                    <span className="socials__handle">{contact.phone}</span>
                  </a>
                </li>
              ) : null}
              {whatsappHref ? (
                <li>
                  <a href={whatsappHref} {...external}>
                    <MessageCircle size={20} aria-hidden="true" />
                    <span className="socials__label">WhatsApp</span>
                    <span className="socials__handle">Opens a draft message</span>
                    <ArrowUpRight size={18} aria-hidden="true" />
                  </a>
                </li>
              ) : null}
            </ul>
          </Reveal>

          {site.sections.contactForm ? (
            <Reveal delay={0.08}>
              <ContactForm />
            </Reveal>
          ) : null}
        </div>
      </div>
    </section>
  );
}
