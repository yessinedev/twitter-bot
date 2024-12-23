"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Sparkles } from "lucide-react";

interface TweetFormProps {
  onGenerate: (prompt: string) => Promise<void>;
  isGenerating: boolean;
}

export function TweetForm({ onGenerate, isGenerating }: TweetFormProps) {
  const [prompt, setPrompt] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onGenerate(prompt);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="prompt" className="block text-sm font-medium mb-2">
          What would you like to tweet about?
        </label>
        <Textarea
          id="prompt"
          placeholder="Enter a topic or idea for your tweet..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="min-h-[100px]"
          required
        />
      </div>

      <Button
        type="submit"
        disabled={!prompt.trim() || isGenerating}
        className="w-full"
      >
        <Sparkles className="w-4 h-4 mr-2" />
        {isGenerating ? "Generating..." : "Generate Tweet"}
      </Button>
    </form>
  );
}