import { Header } from "./components/Header.tsx";
import { Intro } from "./components/Intro.tsx";
import { CaseStudies } from "./components/CaseStudies.tsx";
import { Process } from "./components/Process.tsx";
import { Experience } from "./components/Experience.tsx";
import { Social } from "./components/Social.tsx";
import { Contact } from "./components/Contact.tsx";
import { ResumeDock } from "./components/ResumeDock.tsx";
import { content } from "./config/content.ts";
import { useTheme } from "./hooks/useTheme.ts";

export function App() {
  const { theme, toggleTheme } = useTheme();

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Header theme={theme} onToggleTheme={toggleTheme} />
      <main id="main" className="main">
        <Intro />
        <CaseStudies />
        <Process />
        <Experience />
        <Social />
        <Contact />
      </main>
      <ResumeDock />
      <footer className="footer">
        <div className="footer__inner">
          <p className="footer__name">{content.siteTitle}</p>
          <p className="footer__meta">
            <span dangerouslySetInnerHTML={{ __html: content.footer }} /> © {new Date().getFullYear()}
          </p>
        </div>
      </footer>
    </>
  );
}
