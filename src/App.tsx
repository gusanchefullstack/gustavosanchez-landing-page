import { Sidebar } from "./components/Sidebar.tsx";
import { Intro } from "./components/Intro.tsx";
import { Stack } from "./components/Stack.tsx";
import { Projects } from "./components/Projects.tsx";
import { Social } from "./components/Social.tsx";
import { Contact } from "./components/Contact.tsx";
import { content } from "./config/content.ts";

export function App() {
  return (
    <>
      <Sidebar />
      <main className="main">
        <Intro />
        <Stack />
        <Projects />
        <Social />
        <Contact />
        <footer className="footer">
          <p dangerouslySetInnerHTML={{ __html: content.footer }} />
        </footer>
      </main>
    </>
  );
}
