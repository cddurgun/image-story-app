export interface ImageStory {
  id: string;
  title: string;
  description: string;
  images: GeneratedImage[];
  createdAt: string;
  updatedAt: string;
}

export interface GeneratedImage {
  id: string;
  prompt: string;
  imageUrl: string;
  createdAt: string;
}

export interface ImageSettings {
  width: number;
  height: number;
  guidance_scale: number;
  num_inference_steps: number;
  seed?: number;
}

export interface UserProfile {
  name: string;
  email: string;
  apiKey: string;
  avatar?: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  password: string;
  createdAt: string;
}

export interface AuthSession {
  user: {
    id: string;
    email: string;
    name: string;
  };
  expiresAt: string;
}
