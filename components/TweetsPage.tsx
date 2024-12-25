"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { TwitterIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { TweetForm } from "./TweetForm";
import { TweetPreview } from "./TweetPreview";

export default function TweetsPage() {
  const [generatedContent, setGeneratedContent] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isPosting, setIsPosting] = useState(false);
  const { toast } = useToast();

  const generateTweet = async (prompt: string, count: number) => {
    setIsGenerating(true);
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, count }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to generate tweet");
      }
      console.log(data.tweets);
      setGeneratedContent(data.tweets);
      toast({
        title: "Tweet generated!",
        description: "Your tweet content has been generated successfully.",
      });
    } catch (error: any) {
      console.error("Generate Tweet Error:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to generate tweet content.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const postTweet = async (tweet: string) => {
    if (!generatedContent) return;

    setIsPosting(true);
    try {
      const response = await fetch("/api/tweet", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: tweet }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to post tweet");
      }

      toast({
        title: "Success!",
        description: "Your tweet has been posted.",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to post tweet.",
        variant: "destructive",
      });
    } finally {
      setIsPosting(false);
    }
  };

  return (
    <main className="container mx-auto p-4 max-w-2xl">
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-6">
          <TwitterIcon className="w-6 h-6 text-blue-400" />
          <h1 className="text-2xl font-bold">Tweet Generator</h1>
        </div>

        <div className="space-y-6">
          <TweetForm onGenerate={generateTweet} isGenerating={isGenerating} />

          {generatedContent?.map((tweet, index) => (
            <TweetPreview
            key={index}
              content={tweet}
              onPost={() => postTweet(tweet)}
              isPosting={isPosting}
            />
          ))}
        </div>
      </Card>
    </main>
  );
}
