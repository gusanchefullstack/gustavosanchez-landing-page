import { Header } from "./components/Header.tsx";
import { Intro } from "./components/Intro.tsx";
import { CaseStudies } from "./components/CaseStudies.tsx";
import { Process } from "./components/Process.tsx";
import { Experience } from "./components/Experience.tsx";
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
        <div className="main__rails">
          <Intro theme={theme} />
          <CaseStudies />
          <Process />
          <Experience />
          <Contact />
        </div>
      </main>
      <ResumeDock />
      <footer className="footer">
        <div className="footer__inner">
          <p dangerouslySetInnerHTML={{ __html: content.footer }} />
          <p>© {new Date().getFullYear()} {content.siteTitle}</p>
        </div>
      </footer>
    </>
  );
}
