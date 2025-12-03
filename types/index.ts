// ユーザー関連の型定義
export type UserRole = "author" | "creator" | "admin";

export interface Profile {
  id: string;
  role: UserRole;
  handle: string | null;
  display_name: string | null;
  bio: string | null;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
}

// 作品関連の型定義
export interface Work {
  id: string;
  author_id: string;
  title: string;
  summary: string | null;
  genre: string | null;
  external_url: string | null;
  sample_text: string | null;
  ai_outline_json: AIOutline | null;
  is_public: boolean;
  created_at: string;
  updated_at: string;
}

export interface AIOutline {
  emotion_arc: string[];
  scenes: Scene[];
  atmosphere: string;
  key_metaphors: string[];
}

export interface Scene {
  description: string;
  emotion: string;
  camera_work: string;
}

// クリエイタープロファイル
export interface CreatorProfile {
  user_id: string;
  specialties: string[];
  tools: string[];
  price_min: number | null;
  price_max: number | null;
  portfolio_url: string | null;
  skill_tags: string[];
  created_at: string;
  updated_at: string;
}

// プロジェクト関連
export type ProjectStatus =
  | "open"
  | "in_negotiation"
  | "contracted"
  | "in_progress"
  | "delivered"
  | "completed"
  | "cancelled";

export interface Project {
  id: string;
  work_id: string;
  author_id: string;
  creator_id: string | null;
  title: string;
  purpose: string | null;
  duration_seconds: number | null;
  budget_min: number | null;
  budget_max: number | null;
  deadline: string | null;
  status: ProjectStatus;
  created_at: string;
  updated_at: string;
}

// 提案関連
export type ProposalStatus = "pending" | "accepted" | "rejected";

export interface Proposal {
  id: string;
  project_id: string;
  creator_id: string;
  message: string | null;
  price: number | null;
  estimated_days: number | null;
  status: ProposalStatus;
  created_at: string;
}

// メッセージ関連
export interface Message {
  id: string;
  project_id: string;
  sender_id: string;
  message_text: string;
  file_url: string | null;
  created_at: string;
}

// ギャラリー関連
export interface GalleryItem {
  id: string;
  project_id: string;
  video_url: string;
  thumbnail_url: string | null;
  is_published: boolean;
  created_at: string;
}








