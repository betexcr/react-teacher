import { Link } from 'react-router-dom';
import { CodeBlock } from '../../components/CodeBlock';

export function GetStartedLocalSetup() {
  return (
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
  );
}
