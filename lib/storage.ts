import { ImageStory, ImageSettings, UserProfile } from "@/types";

const STORIES_KEY = "image_stories";
const SETTINGS_KEY = "image_settings";
const PROFILE_KEY = "user_profile";

// Default settings
export const defaultSettings: ImageSettings = {
  width: 1024,
  height: 1024,
  guidance_scale: 0,
  num_inference_steps: 4,
};

export const defaultProfile: UserProfile = {
  name: "User",
  email: "",
  apiKey: "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",
};

// Stories
export const getStories = (): ImageStory[] => {
  if (typeof window === "undefined") return [];
  const stored = localStorage.getItem(STORIES_KEY);
  const stories = stored ? JSON.parse(stored) : [];
  // Sort by most recent first
  return stories.sort((a: ImageStory, b: ImageStory) =>
    new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  );
};

export const saveStory = (story: ImageStory): void => {
  const stories = getStories();
  const existingIndex = stories.findIndex((s) => s.id === story.id);

  if (existingIndex >= 0) {
    stories[existingIndex] = story;
  } else {
    stories.unshift(story);
  }

  localStorage.setItem(STORIES_KEY, JSON.stringify(stories));
};

export const deleteStory = (id: string): void => {
  const stories = getStories().filter((s) => s.id !== id);
  localStorage.setItem(STORIES_KEY, JSON.stringify(stories));
};

// Settings
export const getSettings = (): ImageSettings => {
  if (typeof window === "undefined") return defaultSettings;
  const stored = localStorage.getItem(SETTINGS_KEY);
  return stored ? JSON.parse(stored) : defaultSettings;
};

export const saveSettings = (settings: ImageSettings): void => {
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
};

// Profile
export const getProfile = (): UserProfile => {
  if (typeof window === "undefined") return defaultProfile;
  const stored = localStorage.getItem(PROFILE_KEY);
  return stored ? JSON.parse(stored) : defaultProfile;
};

export const saveProfile = (profile: UserProfile): void => {
  localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
};
