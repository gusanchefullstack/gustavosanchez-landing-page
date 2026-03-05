import { content } from "../config/content.ts";

/**
 * Contact section with form + info sidebar.
 */
export function renderContact(): string {
  const { subtitle, title, description, info } = content.contact;

  return `
    <section id="contact" class="section">
      <div class="section__inner reveal">
        <span class="section__subtitle">${subtitle}</span>
        <h2 class="section__title">${title}</h2>
        <p class="section__description">${description}</p>

        <div class="contact-grid">
          <!-- Form -->
          <form class="contact-form" id="contact-form">
            <div class="contact-form__group">
              <label class="contact-form__label" for="name">Name</label>
              <input
                class="contact-form__input"
                type="text"
                id="name"
                name="name"
                placeholder="Your name"
                required
              />
            </div>
            <div class="contact-form__group">
              <label class="contact-form__label" for="email">Email</label>
              <input
                class="contact-form__input"
                type="email"
                id="email"
                name="email"
                placeholder="you@example.com"
                required
              />
            </div>
            <div class="contact-form__group">
              <label class="contact-form__label" for="message">Message</label>
              <textarea
                class="contact-form__textarea"
                id="message"
                name="message"
                placeholder="How can I help?"
                required
              ></textarea>
            </div>
            <button class="contact-form__submit" type="submit">
              Send Message &rarr;
            </button>
          </form>

          <!-- Info -->
          <div class="contact-info">
            <div class="contact-info__item">
              <span class="contact-info__icon">@</span>
              <div>
                <div class="contact-info__label">Email</div>
                <a class="contact-info__value" href="mailto:${info.email}">${info.email}</a>
              </div>
            </div>
            <div class="contact-info__item">
              <span class="contact-info__icon">~</span>
              <div>
                <div class="contact-info__label">Location</div>
                <div class="contact-info__value">${info.location}</div>
              </div>
            </div>
            <div class="contact-info__item">
              <span class="contact-info__icon">+</span>
              <div>
                <div class="contact-info__label">Availability</div>
                <div class="contact-info__value">${info.availability}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
}

/**
 * Attach a simple submit handler that prevents default
 * and shows a confirmation (placeholder behavior).
 */
export function initContact(): void {
  const form = document.getElementById("contact-form") as HTMLFormElement | null;
  form?.addEventListener("submit", (e) => {
    e.preventDefault();
    const btn = form.querySelector(".contact-form__submit");
    if (btn) {
      btn.textContent = "Message sent!";
      (btn as HTMLButtonElement).disabled = true;
    }
    form.reset();
    setTimeout(() => {
      if (btn) {
        btn.innerHTML = "Send Message &rarr;";
        (btn as HTMLButtonElement).disabled = false;
      }
    }, 3000);
  });
}
