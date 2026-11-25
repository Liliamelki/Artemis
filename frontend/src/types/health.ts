
/**
 * Health API types.
 *
 * Defines the TypeScript types used to represent
 * the responses returned by the backend health endpoint.
 */

export type HealthResponse = {
  status: string;
  application: string;
};
