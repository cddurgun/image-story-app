"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ImageStory } from "@/types";
import { getStories, deleteStory } from "@/lib/storage";
import { ImagePlus, Trash2, Grid3x3, LayoutList } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Storyboard() {
  const searchParams = useSearchParams();
  const storyId = searchParams.get("id");
  const [stories, setStories] = useState<ImageStory[]>([]);
  const [selectedStory, setSelectedStory] = useState<ImageStory | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  useEffect(() => {
    loadStories();

    // Auto-refresh every 2 seconds to catch new stories
    const interval = setInterval(loadStories, 2000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (storyId && stories.length > 0) {
      const story = stories.find((s) => s.id === storyId);
      if (story) {
        setSelectedStory(story);
      }
    }
  }, [storyId, stories]);

  const loadStories = () => {
    const loadedStories = getStories();
    setStories(loadedStories);
  };

  const handleDeleteStory = (id: string) => {
    if (confirm("Are you sure you want to delete this story?")) {
      deleteStory(id);
      loadStories();
      if (selectedStory?.id === id) {
        setSelectedStory(null);
      }
    }
  };

  if (selectedStory) {
    return (
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <Button
              variant="ghost"
              onClick={() => setSelectedStory(null)}
              className="mb-2"
            >
              ← Back to all stories
            </Button>
            <h1 className="text-4xl font-bold mb-2">{selectedStory.title}</h1>
            <p className="text-muted-foreground">{selectedStory.description}</p>
          </div>
          <Button
            variant="destructive"
            onClick={() => handleDeleteStory(selectedStory.id)}
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Delete Story
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {selectedStory.images.map((image, index) => (
            <Card key={image.id} className="overflow-hidden">
              <div className="aspect-video relative bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-950 dark:to-pink-950">
                <Image
                  src={image.imageUrl}
                  alt={image.prompt}
                  fill
                  className="object-cover"
                />
              </div>
              <CardContent className="p-6">
                <p className="text-sm font-semibold text-purple-600 mb-2">
                  Frame {index + 1}
                </p>
                <p className="text-sm">{image.prompt}</p>
                <p className="text-xs text-muted-foreground mt-2">
                  {new Date(image.createdAt).toLocaleString()}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold mb-2">Storyboard</h1>
          <p className="text-muted-foreground">
            View and manage all your AI-generated image stories
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant={viewMode === "grid" ? "default" : "outline"}
            size="icon"
            onClick={() => setViewMode("grid")}
          >
            <Grid3x3 className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === "list" ? "default" : "outline"}
            size="icon"
            onClick={() => setViewMode("list")}
          >
            <LayoutList className="h-4 w-4" />
          </Button>
          <Link href="/create">
            <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
              <ImagePlus className="h-4 w-4 mr-2" />
              New Story
            </Button>
          </Link>
        </div>
      </div>

      {stories.length === 0 ? (
        <Card className="p-12">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-950 dark:to-pink-950 flex items-center justify-center">
              <Grid3x3 className="h-8 w-8 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold">No stories yet</h3>
            <p className="text-muted-foreground">
              Create your first image story to see it here
            </p>
            <Link href="/create">
              <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                Create Your First Story
              </Button>
            </Link>
          </div>
        </Card>
      ) : (
        <div
          className={
            viewMode === "grid"
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              : "space-y-4"
          }
        >
          {stories.map((story) => (
            <Card
              key={story.id}
              className={`overflow-hidden group cursor-pointer hover:shadow-lg transition-shadow ${
                viewMode === "list" ? "flex flex-row" : ""
              }`}
              onClick={() => setSelectedStory(story)}
            >
              <div
                className={`${
                  viewMode === "list"
                    ? "w-48 h-32"
                    : "aspect-video w-full"
                } relative bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-950 dark:to-pink-950`}
              >
                {story.images.length > 0 && (
                  <Image
                    src={story.images[0].imageUrl}
                    alt={story.title}
                    fill
                    className="object-cover"
                  />
                )}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
              </div>
              <div className="flex-1">
                <CardHeader>
                  <CardTitle className="line-clamp-1">{story.title}</CardTitle>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {story.description}
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>{story.images.length} images</span>
                    <span>
                      {new Date(story.updatedAt).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="mt-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteStory(story.id);
                      }}
                      className="text-red-500 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="h-3 w-3 mr-1" />
                      Delete
                    </Button>
                  </div>
                </CardContent>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
