import { Header } from "./components/Header.tsx";
import { Intro } from "./components/Intro.tsx";
import { Stack } from "./components/Stack.tsx";
import { Projects } from "./components/Projects.tsx";
import { Blog } from "./components/Blog.tsx";
import { Social } from "./components/Social.tsx";
import { Contact } from "./components/Contact.tsx";
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
          <Stack />
          <Projects />
          <Blog />
          <Social />
          <Contact />
        </div>
      </main>
      <footer className="footer">
        <div className="footer__inner">
          <p dangerouslySetInnerHTML={{ __html: content.footer }} />
          <p>© {new Date().getFullYear()} {content.siteTitle}</p>
        </div>
      </footer>
    </>
  );
}
