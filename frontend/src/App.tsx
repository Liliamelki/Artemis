
/**
 * Main application component.
 *
 * Coordinates the application layout, navigation
 * and the top-level interface state.
 */

import { useEffect, useState } from "react";
import { checkBackend } from "./api/health";
import type { HealthResponse } from "./types/health";
import "./App.css";

type Section = "cycle" | "sport" | "journal" | "statistics";

const sections: {
  id: Section;
  label: string;
  icon: string;
  description: string;
}[] = [
  {
    id: "cycle",
    label: "Cycle",
    icon: "◒",
    description: "Suis ton cycle et découvre tes tendances.",
  },
  {
    id: "sport",
    label: "Sport",
    icon: "✳",
    description: "Retrouve tes entraînements et ton évolution.",
  },
  {
    id: "journal",
    label: "Journal",
    icon: "♡",
    description: "Prends un moment pour noter comment tu te sens.",
  },
  {
    id: "statistics",
    label: "Statistiques",
    icon: "▥",
    description: "Explore tes données et tes progrès personnels.",
  },
];

function App() {
  const [activeSection, setActiveSection] =
    useState<Section>("cycle");

  const [apiResponse, setApiResponse] =
    useState<HealthResponse | null>(null);

  const [apiError, setApiError] =
    useState<string | null>(null);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadBackendStatus() {
      try {
        const data = await checkBackend();
        setApiResponse(data);
      } catch (err) {
        setApiError(
          err instanceof Error
            ? err.message
            : "Une erreur inconnue est survenue."
        );
      } finally {
        setIsLoading(false);
      }
    }

    loadBackendStatus();
  }, []);

  const currentSection = sections.find(
    (section) => section.id === activeSection
  )!;

  return (
    <div className="app-shell" data-section={activeSection}>
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-symbol">A</div>
          <span>artemis</span>
        </div>

        <div className="sidebar-label">ESPACE PERSONNEL</div>

        <nav className="navigation" aria-label="Navigation principale">
          {sections.map((section) => (
            <button
              key={section.id}
              className={`nav-item ${
                activeSection === section.id ? "active" : ""
              }`}
              onClick={() => setActiveSection(section.id)}
              aria-current={
                activeSection === section.id ? "page" : undefined
              }
            >
              <span className="nav-icon" aria-hidden="true">
                {section.icon}
              </span>
              <span>{section.label}</span>
            </button>
          ))}
        </nav>

        <div className="sidebar-footer">
          <div
            className={`backend-status ${
              apiResponse ? "connected" : apiError ? "disconnected" : ""
            }`}
          >
            <span className="status-dot" />
            <div>
              <strong>Artemis API</strong>
              <span>
                {isLoading
                  ? "Connexion..."
                  : apiResponse
                    ? "Connectée"
                    : "Déconnectée"}
              </span>
            </div>
          </div>
        </div>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <span className="topbar-label">MON ESPACE</span>
          <div className="profile-placeholder">M</div>
        </header>

        <section className="page-content">
          <div className="page-header">
            <div>
              <span className="eyebrow">BIENVENUE SUR ARTEMIS</span>
              <h1>{currentSection.label}</h1>
              <p>{currentSection.description}</p>
            </div>

            <div className="date-placeholder">
              Ton espace personnel
            </div>
          </div>

          <section className="welcome-card">
            <div>
              <span className="welcome-tag">TON ESPACE, TON RYTHME</span>
              <h2>Apprends à mieux te connaître.</h2>
              <p>
                Chaque petit détail compte. Commence à construire
                une meilleure compréhension de ton bien-être.
              </p>
            </div>
            <div className="welcome-decoration" aria-hidden="true">
              ✳
            </div>
          </section>

          <div className="section-heading">
            <div>
              <h2>Vue d'ensemble</h2>
              <p>Ton activité récente apparaîtra ici.</p>
            </div>
          </div>

          <div className="dashboard-grid">
            <article className="dashboard-card">
              <span className="card-icon">◒</span>
              <h3>Mon cycle</h3>
              <p>
                Tes informations de cycle seront regroupées ici.
              </p>
              <span className="card-link">À découvrir →</span>
            </article>

            <article className="dashboard-card">
              <span className="card-icon">✳</span>
              <h3>Mon activité</h3>
              <p>
                Tes séances et tes entraînements seront affichés ici.
              </p>
              <span className="card-link">À découvrir →</span>
            </article>

            <article className="dashboard-card">
              <span className="card-icon">♡</span>
              <h3>Mon journal</h3>
              <p>
                Tes notes et tes ressentis seront conservés ici.
              </p>
              <span className="card-link">À découvrir →</span>
            </article>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
