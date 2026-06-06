// src/services/api.js
//
// All backend/AI API calls live here.
// The frontend never holds API keys directly.
//
// Production setup:
//   Set VITE_API_BASE_URL in .env to your backend URL.
//   Your backend proxies the Anthropic API and adds the key server-side.
//
// Development fallback:
//   If VITE_API_BASE_URL is not set, calls go to /api (Vite proxy → your local server).

const API_BASE = import.meta.env.VITE_API_BASE_URL ?? '/api';

/**
 * Converts internal message format to the shape the backend expects.
 * Backend should forward these to Anthropic (or any LLM) with the system prompt.
 *
 * @param {Array<{role: 'user'|'agent', text: string}>} messages
 * @returns {Array<{role: 'user'|'assistant', content: string}>}
 */
function toApiMessages(messages) {
  return messages.map((m) => ({
    role: m.role === 'agent' ? 'assistant' : 'user',
    content: m.text,
  }));
}

/**
 * Send chat messages to the AI agent.
 *
 * Expected backend endpoint: POST /api/agent/chat
 * Expected request body: { messages: [{role, content}] }
 * Expected response body: { text: string }
 *
 * @param {Array<{role: string, text: string, time: string}>} messages
 * @returns {Promise<string>} Agent reply text
 */
export async function sendAgentMessage(messages) {
  const response = await fetch(`${API_BASE}/agent/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ messages: toApiMessages(messages) }),
  });

  if (!response.ok) {
    throw new Error(`API error: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();

  if (!data.text) {
    throw new Error('Unexpected response format from API');
  }

  return data.text;
}

/**
 * Download a document template by filename.
 * Backend serves files from a protected storage.
 *
 * @param {string} filename
 * @returns {Promise<Blob>}
 */
export async function downloadTemplate(filename) {
  const response = await fetch(`${API_BASE}/documents/${encodeURIComponent(filename)}`);

  if (!response.ok) {
    throw new Error(`Download failed: ${response.status}`);
  }

  return response.blob();
}
