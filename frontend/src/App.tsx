
import { useEffect, useState } from "react";
import "./App.css";

type HealthResponse = {
  status: string;
  application: string;
};

function App() {
  const [apiResponse, setApiResponse] = useState<HealthResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function checkBackend() {
      try {
        const response = await fetch("http://127.0.0.1:8000/health");

        if (!response.ok) {
          throw new Error(`Erreur HTTP : ${response.status}`);
        }

        const data: HealthResponse = await response.json();
        setApiResponse(data);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Une erreur inconnue est survenue."
        );
      } finally {
        setIsLoading(false);
      }
    }

    checkBackend();
  }, []);

  return (
    <main>
      <h1>Artemis</h1>
      <h2>Connexion au backend</h2>

      {isLoading && <p>Connexion en cours...</p>}

      {apiResponse && (
        <p>
          Backend : {apiResponse.status} — {apiResponse.application}
        </p>
      )}

      {error && <p>Erreur : {error}</p>}
    </main>
  );
}

export default App;
