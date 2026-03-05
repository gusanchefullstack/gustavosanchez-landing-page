import "./style.css";

import { renderSidebar, initSidebar } from "./components/Sidebar.ts";
import { renderIntro } from "./components/Intro.ts";
import { renderStack } from "./components/Stack.ts";
import { renderProjects } from "./components/Projects.ts";
import { renderSocial } from "./components/Social.ts";
import { renderContact, initContact } from "./components/Contact.ts";
import { content } from "./config/content.ts";

/* -------------------------------------------------------
   Compose the full page
   ------------------------------------------------------- */
const app = document.querySelector<HTMLDivElement>("#app")!;

app.innerHTML = `
  ${renderSidebar()}
  <main class="main">
    ${renderIntro()}
    ${renderStack()}
    ${renderProjects()}
    ${renderSocial()}
    ${renderContact()}
    <footer class="footer">
      <p>${content.footer}</p>
    </footer>
  </main>
`;

/* -------------------------------------------------------
   Initialise interactive behaviour
   ------------------------------------------------------- */
initSidebar();
initContact();

/* -------------------------------------------------------
   Scroll-reveal: fade-in elements with class "reveal"
   ------------------------------------------------------- */
const revealElements = document.querySelectorAll<HTMLElement>(".reveal");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("reveal--visible");
      }
    });
  },
  { threshold: 0.15 },
);

revealElements.forEach((el) => revealObserver.observe(el));
