
/**
 * Backend health API.
 *
 * Contains functions responsible for communicating
 * with the backend's health-check endpoint.
 */

import type { HealthResponse } from "../types/health";

const API_URL = import.meta.env.VITE_API_URL;

export async function checkBackend(): Promise<HealthResponse> {
  const response = await fetch(`${API_URL}/health`);

  if (!response.ok) {
    throw new Error(`Erreur HTTP : ${response.status}`);
  }

  return response.json();
}
