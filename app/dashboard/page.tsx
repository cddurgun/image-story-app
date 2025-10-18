"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ImageStory } from "@/types";
import { getStories } from "@/lib/storage";
import Link from "next/link";
import { ImagePlus, BookImage, Clock, TrendingUp } from "lucide-react";
import Image from "next/image";

export default function Dashboard() {
  const [stories, setStories] = useState<ImageStory[]>([]);
  const [stats, setStats] = useState({
    totalStories: 0,
    totalImages: 0,
    recentActivity: 0,
  });

  useEffect(() => {
    const loadStories = () => {
      const loadedStories = getStories();
      setStories(loadedStories.slice(0, 6)); // Show only recent 6

      const totalImages = loadedStories.reduce(
        (acc, story) => acc + story.images.length,
        0
      );
      const recentActivity = loadedStories.filter((story) => {
        const dayAgo = new Date();
        dayAgo.setDate(dayAgo.getDate() - 1);
        return new Date(story.updatedAt) > dayAgo;
      }).length;

      setStats({
        totalStories: loadedStories.length,
        totalImages,
        recentActivity,
      });
    };

    // Load initially
    loadStories();

    // Auto-refresh every 2 seconds to catch new stories
    const interval = setInterval(loadStories, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-2">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome to ImageStory AI - Create stunning stories with real-time AI
          image generation
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Stories</CardTitle>
            <BookImage className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalStories}</div>
            <p className="text-xs text-muted-foreground">
              All your created stories
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Images
            </CardTitle>
            <ImagePlus className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalImages}</div>
            <p className="text-xs text-muted-foreground">
              AI-generated images
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Recent Activity
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.recentActivity}</div>
            <p className="text-xs text-muted-foreground">Last 24 hours</p>
          </CardContent>
        </Card>
      </div>

      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Recent Stories</h2>
        <Link href="/create">
          <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
            <ImagePlus className="h-4 w-4 mr-2" />
            Create New Story
          </Button>
        </Link>
      </div>

      {stories.length === 0 ? (
        <Card className="p-12">
          <div className="text-center space-y-4">
            <Clock className="h-12 w-12 mx-auto text-muted-foreground" />
            <h3 className="text-xl font-semibold">No stories yet</h3>
            <p className="text-muted-foreground">
              Start creating your first image story with AI
            </p>
            <Link href="/create">
              <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                Create Your First Story
              </Button>
            </Link>
          </div>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stories.map((story) => (
            <Card key={story.id} className="overflow-hidden group cursor-pointer hover:shadow-lg transition-shadow">
              <Link href={`/storyboard?id=${story.id}`}>
                <div className="aspect-video relative bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-950 dark:to-pink-950">
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
                </CardContent>
              </Link>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
