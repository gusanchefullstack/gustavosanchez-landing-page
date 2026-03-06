import { content } from "../config/content.ts";
import { useScrollReveal } from "../hooks/useScrollReveal.ts";
import { useForm, ValidationError } from "@formspree/react";

export function Contact() {
  const ref = useScrollReveal<HTMLDivElement>();
  const [state, handleSubmit] = useForm("xwkjerpe");
  const { subtitle, title, description, info } = content.contact;

  return (
    <section id="contact" className="section">
      <div className="section__inner reveal" ref={ref}>
        <span className="section__subtitle">{subtitle}</span>
        <h2 className="section__title">{title}</h2>
        <p className="section__description">{description}</p>

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
              className="contact-form__submit"
              type="submit"
              disabled={state.submitting}
            >
              {state.submitting ? "Sending..." : "Send Message \u2192"}
            </button>
            {state.succeeded ? <p>Message sent!</p> : null}
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
