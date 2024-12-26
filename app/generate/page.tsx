"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Save, TwitterIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { TweetForm } from "@/components/TweetForm";
import { TweetPreview } from "@/components/TweetPreview";
import { Button } from "@/components/ui/button";

interface Tweet {
    content: string;
    isChecked: boolean;
}

export default function TweetsPage() {
  const [generatedContent, setGeneratedContent] = useState<Tweet[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isPosting, setIsPosting] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
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
      setGeneratedContent(data.tweets.map((tweet: string) => ({ content: tweet, isChecked: false })));
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

//   const postTweet = async (tweet: string) => {
//     if (!generatedContent) return;

//     setIsPosting(true);
//     try {
//       const response = await fetch("/api/tweet", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ content: tweet }),
//       });

//       if (!response.ok) {
//         const data = await response.json();
//         throw new Error(data.error || "Failed to post tweet");
//       }

//       toast({
//         title: "Success!",
//         description: "Your tweet has been posted.",
//       });
//     } catch (error: any) {
//       toast({
//         title: "Error",
//         description: error.message || "Failed to post tweet.",
//         variant: "destructive",
//       });
//     } finally {
//       setIsPosting(false);
//     }
//   };

  const handleCheckChange = (index: number, checked: boolean) => {
    setGeneratedContent(prev => 
      prev.map((tweet, i) => 
        i === index ? { ...tweet, isChecked: checked } : tweet
      )
    );
  };

  const saveTweets = async () => {
    const tweetsToSave = generatedContent.filter(tweet => tweet.isChecked);
    if (tweetsToSave.length === 0) {
      toast({
        title: "No tweets selected",
        description: "Please select at least one tweet to save.",
        variant: "destructive",
      });
      return;
    }

    setIsSaving(true);
    try {
      const response = await fetch("/api/save-tweets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tweets: tweetsToSave.map(t => t.content) }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to save tweets");
      }

      toast({
        title: "Success!",
        description: "Your selected tweets have been saved.",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to save tweets.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
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

          {generatedContent.map((tweet, index) => (
            <TweetPreview
              key={index}
              content={tweet.content}
              isChecked={tweet.isChecked}
              onCheckChange={(checked) => handleCheckChange(index, checked)}
            />
          ))}

          {generatedContent.length > 0 && (
            <Button
              onClick={saveTweets}
              disabled={isSaving}
              className="w-full"
            >
              <Save className="w-4 h-4 mr-2" />
              {isSaving ? "Saving..." : "Save Selected Tweets"}
            </Button>
          )}

        </div>
      </Card>
    </main>
  );
}
