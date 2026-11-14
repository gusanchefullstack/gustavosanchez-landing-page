import { content } from "../config/content.ts";
import { useScrollReveal } from "../hooks/useScrollReveal.ts";
import { useForm, ValidationError } from "@formspree/react";

export function Contact() {
  const ref = useScrollReveal<HTMLDivElement>();
  const [state, handleSubmit] = useForm("xwkjerpe");
  const { subtitle, title, description, info } = content.contact;

  return (
    <section id="contact" className="section" aria-labelledby="contact-title">
      <header className="section__head">
        <span className="section__eyebrow">{subtitle}</span>
        <h2 id="contact-title" className="section__title">
          {title}
        </h2>
        <p className="section__description">{description}</p>
      </header>
      <div className="reveal" ref={ref}>
        <div className="contact-grid">
          <form className="contact-form" onSubmit={handleSubmit}>
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
            <ValidationError
              prefix="Email"
              field="email"
              errors={state.errors}
            />
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
            <ValidationError
              prefix="Message"
              field="message"
              errors={state.errors}
            />
            <button
              className="button button--primary contact-form__submit"
              type="submit"
              disabled={state.submitting}
            >
              {state.submitting ? "Sending..." : "Send Message \u2192"}
            </button>
            {state.succeeded ? (
              <p className="contact-form__success" role="status">
                Message sent!
              </p>
            ) : null}
          </form>

          <div className="contact-info">
            <div className="contact-info__item">
              <span className="contact-info__icon">@</span>
              <div>
                <div className="contact-info__label">Email</div>
                <a
                  className="contact-info__value"
                  href={`mailto:${info.email}`}
                >
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
            <div className="contact-info__item">
              <span className="contact-info__icon">✓</span>
              <div>
                <div className="contact-info__label">Work authorization</div>
                <div className="contact-info__value">
                  U.S. work authorized · No sponsorship required
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
