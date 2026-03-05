import { useState, useRef } from "react";
import type { FormEvent } from "react";
import { content } from "../config/content.ts";
import { useScrollReveal } from "../hooks/useScrollReveal.ts";

export function Contact() {
  const ref = useScrollReveal<HTMLDivElement>();
  const [submitted, setSubmitted] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const { subtitle, title, description, info } = content.contact;

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitted(true);
    formRef.current?.reset();
    setTimeout(() => setSubmitted(false), 3000);
  }

  return (
    <section id="contact" className="section">
      <div className="section__inner reveal" ref={ref}>
        <span className="section__subtitle">{subtitle}</span>
        <h2 className="section__title">{title}</h2>
        <p className="section__description">{description}</p>

        <div className="contact-grid">
          <form className="contact-form" ref={formRef} onSubmit={handleSubmit}>
            <div className="contact-form__group">
              <label className="contact-form__label" htmlFor="name">
                Name
              </label>
              <input
                className="contact-form__input"
                type="text"
                id="name"
                name="name"
                placeholder="Your name"
                required
              />
            </div>
            <div className="contact-form__group">
              <label className="contact-form__label" htmlFor="email">
                Email
              </label>
              <input
                className="contact-form__input"
                type="email"
                id="email"
                name="email"
                placeholder="you@example.com"
                required
              />
            </div>
            <div className="contact-form__group">
              <label className="contact-form__label" htmlFor="message">
                Message
              </label>
              <textarea
                className="contact-form__textarea"
                id="message"
                name="message"
                placeholder="How can I help?"
                required
              />
            </div>
            <button
              className="contact-form__submit"
              type="submit"
              disabled={submitted}
            >
              {submitted ? "Message sent!" : "Send Message \u2192"}
            </button>
          </form>

          <div className="contact-info">
            <div className="contact-info__item">
              <span className="contact-info__icon">@</span>
              <div>
                <div className="contact-info__label">Email</div>
                <a className="contact-info__value" href={`mailto:${info.email}`}>
                  {info.email}
                </a>
              </div>
            </div>
            <div className="contact-info__item">
              <span className="contact-info__icon">~</span>
              <div>
                <div className="contact-info__label">Location</div>
                <div className="contact-info__value">{info.location}</div>
              </div>
            </div>
            <div className="contact-info__item">
              <span className="contact-info__icon">+</span>
              <div>
                <div className="contact-info__label">Availability</div>
                <div className="contact-info__value">{info.availability}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
