/** Shared API types mirroring backend/api/schemas.py */

export type ChatMode = "kg" | "rag" | "both" | "chat";

export interface Source {
  source: string;
  content_preview: string;
  page?: number | null;
  cypher?: string | null;
  rows?: unknown;
}

export interface ChatResponse {
  answer: string;
  sources: Source[];
  mode: ChatMode;
  thread_id?: string | null;
  error?: string | null;
  gemini_used: boolean;
  cache_hit: boolean;
  kg_status?: string | null;
  kg_records_count?: number | null;
  kg_filtered_count?: number | null;
}

export interface HistoryItem {
  role: "user" | "assistant";
  content: string;
  timestamp?: unknown;
  sources_json: string;
  mode: string;
}

export interface ThreadItem {
  thread_id: string;
  title: string;
  created_at?: unknown;
  updated_at?: unknown;
  last_message: string;
  message_count: number;
  is_favorite: boolean;
}

export interface Preferences {
  display_name: string;
  voice_responses: boolean;
  system_persona: string;
  llm_temperature: number;
}

export interface SearchResult {
  thread_id: string;
  thread_title: string;
  role: string;
  content: string;
  timestamp?: string | null;
}

export interface DocSearchResult {
  source: string;
  content_preview: string;
  score?: number | null;
}

export interface SuggestionsResponse {
  suggestions: string[];
}

export interface ShareResponse {
  share_token: string;
}

export interface SharedMessage {
  role: string;
  content: string;
  timestamp?: unknown;
  sources_json: string;
  mode: string;
}

export interface SharedThread {
  title: string;
  created_at?: unknown;
  messages: SharedMessage[];
}

export interface UploadResponse {
  filename?: string;
  size?: number;
  extracted_text?: string;
  chars?: number;
  error?: string;
}

/* --- Knowledge graph --- */

export type KGNodeType =
  | "Satellite"
  | "Product"
  | "Parameter"
  | "Region"
  | "Payload"
  | "Algorithm";

export interface KGNode {
  id: number;
  label: string;
  type: KGNodeType | string;
  properties: Record<string, unknown>;
}

export interface KGEdge {
  source: number;
  target: number;
  label: string;
}

export interface KGGraph {
  nodes: KGNode[];
  edges: KGEdge[];
  error?: string;
}

export interface Satellite {
  name: string;
  products: string[];
  [key: string]: unknown;
}

export interface SatelliteProduct {
  name: string;
  parameters: string[];
  regions: string[];
  algorithms?: string[];
  [key: string]: unknown;
}

export interface SatelliteDetail {
  name: string;
  payloads: Record<string, unknown>[];
  products: SatelliteProduct[];
  [key: string]: unknown;
}

export interface DocPage {
  url?: string;
  title?: string;
  headings?: string[];
  paragraphs?: string[];
  pdf_links?: string[];
  metadata?: Record<string, unknown>;
  [key: string]: unknown;
}

/** Local chat message model used by the UI */
export interface UIMessage {
  type: "user" | "bot";
  text: string;
  timestamp: string;
  sources?: Source[];
  mode?: string;
}
