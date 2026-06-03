import { Link } from 'react-router-dom';
import { CodeBlock } from '../components/CodeBlock';
import { useRouteScrollTop } from '../hooks/useRouteScrollTop';

export function GetStartedPage() {
  useRouteScrollTop();

  return (
    <article className="get-started">
      <header className="get-started-hero">
        <h1 className="page-title">Get Started</h1>
        <p className="get-started-lead">
          <strong>ReactTeacher</strong> is React interview prep you can start immediately — challenges,
          flashcards, React patterns, and system design walkthroughs, no install required. Your progress saves in this
          browser; no account needed.
        </p>
        <p className="get-started-lead get-started-lead--secondary">
          New to React or JavaScript? Skim <Link to="/js-basics">JS Basics</Link> first, then try the{' '}
          <Link to="/challenges">easy challenges</Link>. To write code locally, set up a project on your
          machine — flashcards and system design work fully here without that step.
        </p>
      </header>

      <section className="get-started-section get-started-path">
        <h2>Two ways to use ReactTeacher</h2>
        <div className="get-started-path-grid">
          <div className="get-started-path-card">
            <h3>Study here</h3>
            <p>
              Read challenges, study flashcards, explore React patterns, and browse system design in the sidebar. No download
              required.
            </p>
            <p className="get-started-path-cta">
              <Link to="/flashcards">Try flashcards</Link> or{' '}
              <Link to="/challenges">browse challenges</Link>.
            </p>
          </div>
          <div className="get-started-path-card">
            <h3>Coding challenges on your computer</h3>
            <p>
              You need your own project folder (
              <a
                href="https://github.com/betexcr/react-teacher"
                target="_blank"
                rel="noopener noreferrer"
              >
                clone this repo
              </a>{' '}
              or create a new React app). You write code
              in an editor like Cursor, run a local dev server, and read the challenge text here in the
              browser.
            </p>
            <p className="get-started-path-cta">
              Follow the steps below when you are ready to code.
            </p>
          </div>
        </div>
      </section>

      <section className="get-started-section">
        <h2>Using ReactTeacher in the browser</h2>
        <ol className="get-started-steps">
          <li>
            Use the sidebar: <Link to="/js-basics">JS Basics</Link>,{' '}
            <Link to="/challenges">React Challenges</Link>,{' '}
            <Link to="/flashcards">Flashcards</Link>, <Link to="/react-patterns">React Patterns</Link>,{' '}
            <Link to="/system-design">System Design</Link>.
          </li>
          <li>
            For challenges: read the problem and acceptance criteria here. Check off criteria as you
            finish (saved in this browser). Open the solution only when stuck.
          </li>
          <li>
            For flashcards: study questions and explanations; mark cards complete or filter to uncompleted
            only.
          </li>
        </ol>
      </section>

      <section className="get-started-section get-started-section--local">
        <h2>Coding challenges on your computer</h2>
        <p className="get-started-section-intro">
          The sections below are only if you want to run and edit code locally. Skip them if you are only
          studying in the browser for now.
        </p>

        <div className="get-started-install-block">
          <h3>What you need to install</h3>
          <p>Install once. Pick the notes for your operating system.</p>
          <p className="get-started-install-note">
            <strong>Windows:</strong> use{' '}
            <a
              href="https://learn.microsoft.com/en-us/windows/package-manager/winget/"
              target="_blank"
              rel="noopener noreferrer"
            >
              winget
            </a>{' '}
            in PowerShell or Terminal for the commands below (built into Windows 10 and 11).
          </p>
          <p className="get-started-install-note">
            <strong>Mac / Linux:</strong> use Terminal —{' '}
            <a href="https://brew.sh/" target="_blank" rel="noopener noreferrer">
              Homebrew
            </a>{' '}
            on Mac, or your distro package manager on Linux (examples below).
          </p>

          <h4 className="get-started-install-sub">Node.js (LTS)</h4>
          <p>
            Runs JavaScript on your machine. <strong>npm</strong> (installs packages) comes with it.{' '}
            <a href="https://nodejs.org/" target="_blank" rel="noopener noreferrer">
              Download Node.js LTS
            </a>
          </p>
          <p className="get-started-install-note">
            <strong>Windows (terminal):</strong>
          </p>
          <CodeBlock code="winget install OpenJS.NodeJS.LTS -e" />
          <p className="get-started-install-note">
            <strong>Mac (terminal):</strong> with Homebrew installed —
          </p>
          <CodeBlock code="brew install node" />
          <p className="get-started-install-note">
            <strong>Linux (terminal):</strong> Debian/Ubuntu example —
          </p>
          <CodeBlock code="sudo apt update && sudo apt install -y nodejs npm" />
          <p className="get-started-install-note">
            Distro packages can lag behind LTS; <strong>nvm</strong> below is often better on Linux.
          </p>
          <p className="get-started-install-note">Optional version managers:</p>
          <ul className="get-started-os-list">
            <li>
              <strong>Windows:</strong>{' '}
              <a
                href="https://github.com/coreybutler/nvm-windows"
                target="_blank"
                rel="noopener noreferrer"
              >
                nvm-windows
              </a>{' '}
              or:
              <CodeBlock code="winget install CoreyButler.NVMforWindows -e" />
            </li>
            <li>
              <strong>Mac / Linux:</strong>{' '}
              <a href="https://github.com/nvm-sh/nvm" target="_blank" rel="noopener noreferrer">
                nvm
              </a>{' '}
              — install in Terminal:
              <CodeBlock
                code={`curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.4/install.sh | bash

# Restart the terminal, then install Node LTS:
nvm install --lts
nvm use --lts`}
              />
            </li>
          </ul>

          <h4 className="get-started-install-sub">Cursor (recommended editor)</h4>
          <p>
            <a href="https://cursor.com/" target="_blank" rel="noopener noreferrer">
              Download Cursor
            </a>{' '}
            — includes AI Chat and Agent to help while you code.
          </p>
          <p className="get-started-install-note">
            <strong>Windows (terminal):</strong>
          </p>
          <CodeBlock code="winget install Anysphere.Cursor -e" />
          <p className="get-started-install-note">
            <strong>Mac (terminal):</strong> with Homebrew —
          </p>
          <CodeBlock code="brew install --cask cursor" />

          <h4 className="get-started-install-sub">Git (optional but recommended)</h4>
          <ul className="get-started-os-list">
            <li>
              <strong>Windows:</strong>{' '}
              <a
                href="https://git-scm.com/download/win"
                target="_blank"
                rel="noopener noreferrer"
              >
                git-scm.com/download/win
              </a>{' '}
              or in PowerShell / Terminal:
              <CodeBlock code="winget install Git.Git -e" />
            </li>
            <li>
              <strong>Mac:</strong> in Terminal — Xcode Command Line Tools (includes Git):
              <CodeBlock code="xcode-select --install" />
              Or with Homebrew:
              <CodeBlock code="brew install git" />
              Or install{' '}
              <a
                href="https://git-scm.com/download/mac"
                target="_blank"
                rel="noopener noreferrer"
              >
                Git for Mac
              </a>{' '}
              from the website.
            </li>
            <li>
              <strong>Linux:</strong> (Debian/Ubuntu example; use your package manager if different)
              <CodeBlock code="sudo apt install git" />
              <a
                href="https://git-scm.com/download/linux"
                target="_blank"
                rel="noopener noreferrer"
              >
                More install options
              </a>
            </li>
          </ul>

          <div className="get-started-verify">
            <p>
              <strong>Verify Node</strong> — in any terminal:
            </p>
            <CodeBlock code={`node -v\nnpm -v`} />
            <p className="get-started-verify-hint">
              You should see version numbers. Restart the terminal after installing if a command is not
              found.
            </p>
          </div>
        </div>

        <div className="get-started-install-block">
          <h3>Get the project on your machine</h3>
          <p>Choose one way to get a folder you can open in Cursor:</p>
          <ul className="get-started-os-list get-started-os-list--blocks">
            <li>
              <strong>Clone this repo (HTTPS):</strong>
              <CodeBlock code="git clone https://github.com/betexcr/react-teacher.git" />
            </li>
            <li>
              <strong>Clone with SSH:</strong>
              <CodeBlock code="git clone git@github.com:betexcr/react-teacher.git" />
            </li>
            <li>
              <strong>Download ZIP:</strong>{' '}
              <a
                href="https://github.com/betexcr/react-teacher/archive/refs/heads/main.zip"
                target="_blank"
                rel="noopener noreferrer"
              >
                github.com/betexcr/react-teacher
              </a>{' '}
              (Code → Download ZIP), unzip, and open the folder.
            </li>
            <li>
              <strong>Start fresh:</strong> create a new React + TypeScript app, then read challenge prompts
              here in the browser:
              <CodeBlock code="npm create vite@latest my-react-app -- --template react-ts" />
            </li>
          </ul>
          <p>Example folder paths (yours will differ):</p>
          <p className="get-started-install-note">
            <strong>Windows</strong>
          </p>
          <CodeBlock code="C:\Users\You\Projects\react-teacher" />
          <p className="get-started-install-note">
            <strong>macOS / Linux</strong>
          </p>
          <CodeBlock code="~/Projects/react-teacher" />
        </div>

        <div className="get-started-install-block">
          <h3>Open your project folder in Cursor</h3>
          <p>
            Open the folder you downloaded or created — not the ReactTeacher website tab. In Cursor:
          </p>
          <ul className="get-started-os-list">
            <li>
              <strong>Windows:</strong> <code>File → Open Folder</code> → choose your project (e.g.{' '}
              <code>react-teacher</code>).
            </li>
            <li>
              <strong>macOS:</strong> <code>File → Open…</code> → select the folder; or drag the folder
              onto the Cursor icon in the Dock.
            </li>
            <li>
              <strong>Linux:</strong> <code>File → Open Folder</code> → select your project path.
            </li>
          </ul>
        </div>

        <div className="get-started-install-block">
          <h3>Open a terminal</h3>
          <ul className="get-started-os-list">
            <li>
              <strong>Windows:</strong> in Cursor, <code>View → Terminal</code> or press{' '}
              <kbd>Ctrl</kbd>+<kbd>`</kbd>. Or use Windows Terminal from the Start menu.
            </li>
            <li>
              <strong>macOS:</strong> Cursor integrated terminal (<code>View → Terminal</code> or{' '}
              <kbd>Ctrl</kbd>+<kbd>`</kbd>) or Terminal.app.
            </li>
            <li>
              <strong>Linux:</strong> Cursor integrated terminal or <kbd>Ctrl</kbd>+<kbd>Alt</kbd>+
              <kbd>T</kbd> for your system terminal.
            </li>
          </ul>
        </div>

        <div className="get-started-install-block">
          <h3>Run the dev server (your code project)</h3>
          <p>In the terminal, go to your project folder if you are not already there:</p>
          <CodeBlock
            code={`cd path/to/your-project\nnpm install\nnpm run dev`}
          />
          <p>Examples for <code>cd</code> (use your real path):</p>
          <p className="get-started-install-note">
            <strong>Windows</strong>
          </p>
          <CodeBlock code="cd C:\Users\You\Projects\react-teacher" />
          <p className="get-started-install-note">
            <strong>macOS / Linux</strong>
          </p>
          <CodeBlock code="cd ~/Projects/react-teacher" />
          <p>
            Open the <strong>localhost URL</strong> shown in the terminal (often{' '}
            <code>http://localhost:5173</code>) — that is <em>your</em> app where you edit code.
          </p>
          <p className="get-started-install-note">
            ReactTeacher in the browser (this site) is separate: use it to read challenges, flashcards,
            and system design. You can have both tabs open — study here, code on localhost.
          </p>
          <p>
            In Cursor, use <strong>Chat</strong> or <strong>Agent</strong> when stuck — paste the challenge
            text from ReactTeacher; avoid opening solutions too early.
          </p>
        </div>

        <div className="get-started-install-block">
          <h3>How coding challenges fit together</h3>
          <ol className="get-started-steps">
            <li>
              On ReactTeacher: <Link to="/challenges">pick a challenge</Link> and read the problem here.
            </li>
            <li>
              In your local project: create files under{' '}
              <code>src/practice/&lt;difficulty&gt;/&lt;slug&gt;/</code> in your local React app (or any folder you prefer).
            </li>
            <li>
              Run your app and test your UI on localhost:
              <CodeBlock code="npm run dev" />
            </li>
            <li>
              Back on ReactTeacher: check off <strong>Acceptance criteria</strong> when done (saved in this
              browser).
            </li>
            <li>Open <strong>Solution</strong> here only when you need help.</li>
          </ol>
        </div>
      </section>

      <section className="get-started-section">
        <h2>Official docs</h2>
        <ul className="get-started-links">
          <li>
            <a href="https://react.dev/learn" target="_blank" rel="noopener noreferrer">
              React — Learn React
            </a>
          </li>
          <li>
            <a
              href="https://www.typescriptlang.org/docs/handbook/react.html"
              target="_blank"
              rel="noopener noreferrer"
            >
              TypeScript — React handbook
            </a>
          </li>
        </ul>
      </section>

      <section className="get-started-section get-started-section--compact">
        <h2>Other sections</h2>
        <ul className="get-started-pointers">
          <li>
            <Link to="/flashcards">Flashcards</Link> — interview Q&amp;A; works entirely in the browser.
          </li>
          <li>
            <Link to="/react-patterns">React Patterns</Link> — component and state patterns with copyable examples.
          </li>
          <li>
            <Link to="/system-design">System Design</Link> — architecture guides; no local setup required.
          </li>
        </ul>
      </section>

      <footer className="get-started-cta">
        <Link to="/challenges" className="get-started-cta-btn primary">
          Browse Challenges
        </Link>
        <Link to="/flashcards" className="get-started-cta-btn">
          Study Flashcards
        </Link>
      </footer>
    </article>
  );
}
