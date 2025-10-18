"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ImageStory, GeneratedImage } from "@/types";
import { getSettings, saveStory } from "@/lib/storage";
import { Loader2, Save, Sparkles, ImagePlus } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function CreateStory() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [prompt, setPrompt] = useState("");
  const [images, setImages] = useState<GeneratedImage[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastGeneratedPrompt, setLastGeneratedPrompt] = useState("");
  const [autoGenerate, setAutoGenerate] = useState(true); // Auto-generate enabled by default

  // INSTANT real-time image generation - generates on every keystroke!
  useEffect(() => {
    if (!autoGenerate) return;

    const trimmedPrompt = prompt.trim();

    // Don't generate if prompt is empty or currently generating
    if (!trimmedPrompt || isGenerating) return;

    // Generate immediately if prompt changed
    if (trimmedPrompt !== lastGeneratedPrompt) {
      // Very short delay (just enough to batch rapid keystrokes)
      const timer = setTimeout(() => {
        generateImage(trimmedPrompt);
      }, 300); // 0.3 second - nearly instant!

      return () => clearTimeout(timer);
    }
  }, [prompt, lastGeneratedPrompt, isGenerating, autoGenerate]);

  const generateImage = async (promptText: string) => {
    setIsGenerating(true);
    setError(null);
    setLastGeneratedPrompt(promptText);

    try {
      const settings = getSettings();

      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: promptText,
          settings,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to generate image");
      }

      const data = await response.json();

      const newImage: GeneratedImage = {
        id: Date.now().toString(),
        prompt: promptText,
        imageUrl: data.imageUrl,
        createdAt: new Date().toISOString(),
      };

      setImages((prev) => [newImage, ...prev]); // Add new image at the beginning
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to generate image");
      console.error("Error generating image:", err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleManualGenerate = () => {
    const trimmedPrompt = prompt.trim();
    if (trimmedPrompt && !isGenerating) {
      generateImage(trimmedPrompt);
    }
  };

  const handleSaveStory = () => {
    if (!title.trim()) {
      setError("Please enter a title for your story");
      return;
    }

    if (images.length === 0) {
      setError("Please generate at least one image");
      return;
    }

    const story: ImageStory = {
      id: Date.now().toString(),
      title: title.trim(),
      description: description.trim(),
      images,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    saveStory(story);
    router.push("/storyboard");
  };

  const removeImage = (imageId: string) => {
    setImages((prev) => prev.filter((img) => img.id !== imageId));
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-2">Create Image Story</h1>
        <p className="text-muted-foreground">
          Generate stunning AI images instantly as you type - watch your story come to life!
        </p>
      </div>

      {/* Generated Images - Always at Top */}
      <Card>
        <CardHeader>
          <CardTitle>Generated Images ({images.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {images.length === 0 ? (
            <div className="text-center py-12 space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-950 dark:to-pink-950 flex items-center justify-center">
                <Sparkles className="h-8 w-8 text-purple-600" />
              </div>
              <p className="text-muted-foreground">
                Your generated images will appear here
              </p>
              <p className="text-sm text-muted-foreground">
                Start typing a prompt below to generate images
              </p>
            </div>
          ) : (
            <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
              {images.map((image, index) => (
                <Card key={image.id} className="overflow-hidden">
                  <div className="aspect-video relative bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-950 dark:to-pink-950">
                    <Image
                      src={image.imageUrl}
                      alt={image.prompt}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        {index === 0 && (
                          <p className="text-xs font-semibold text-green-600 mb-1">
                            Latest
                          </p>
                        )}
                        <p className="text-sm line-clamp-2">
                          {image.prompt}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeImage(image.id)}
                        className="text-red-500 hover:text-red-700 hover:bg-red-50"
                      >
                        Remove
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* AI Image Prompt - Second Row */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-purple-600" />
            AI Image Prompt
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-3 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/50 dark:to-pink-950/50 rounded-lg border border-purple-200 dark:border-purple-800">
            <div className="space-y-0.5">
              <Label htmlFor="auto-generate" className="text-sm font-medium">
                ⚡ Instant Generation
              </Label>
              <p className="text-xs text-muted-foreground">
                Images appear as you type!
              </p>
            </div>
            <Switch
              id="auto-generate"
              checked={autoGenerate}
              onCheckedChange={setAutoGenerate}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="prompt">Describe your image</Label>
            <Textarea
              id="prompt"
              placeholder={
                autoGenerate
                  ? "Start typing... Watch images appear above instantly!"
                  : "Type your image description and click 'Generate Now'"
              }
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              rows={5}
              className="resize-none"
            />
            {autoGenerate && (
              <p className="text-xs text-purple-600 dark:text-purple-400 font-medium">
                ⚡ Live mode: Images generate instantly as you type!
              </p>
            )}
          </div>

          <Button
            onClick={handleManualGenerate}
            disabled={!prompt.trim() || isGenerating}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
          >
            {isGenerating ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <ImagePlus className="h-4 w-4 mr-2" />
                Generate Now
              </>
            )}
          </Button>

          {error && (
            <div className="text-sm text-red-500 bg-red-50 dark:bg-red-950 p-3 rounded-md">
              {error}
            </div>
          )}

          {isGenerating && (
            <div className="text-sm text-purple-600 dark:text-purple-400 flex items-center gap-2 bg-purple-50 dark:bg-purple-950/50 p-3 rounded-lg">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span className="font-medium">Creating your image...</span>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Story Details - Third Row */}
      <Card>
        <CardHeader>
          <CardTitle>Story Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Story Title</Label>
            <Input
              id="title"
              placeholder="Enter a title for your story"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description (Optional)</Label>
            <Textarea
              id="description"
              placeholder="Brief description of your story"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <Button
        onClick={handleSaveStory}
        disabled={!title.trim() || images.length === 0}
        className="w-full"
        size="lg"
      >
        <Save className="h-4 w-4 mr-2" />
        Save Story ({images.length} {images.length === 1 ? "image" : "images"})
      </Button>
    </div>
  );
}
