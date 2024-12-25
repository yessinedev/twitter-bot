"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Sparkles } from "lucide-react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";

interface TweetFormProps {
  onGenerate: (prompt: string, count: number) => Promise<void>;
  isGenerating: boolean;
}

export function TweetForm({ onGenerate, isGenerating }: TweetFormProps) {
  const [prompt, setPrompt] = useState("");
  const [count, setCount] = useState(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onGenerate(prompt, count);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="prompt" className="block text-sm font-medium mb-2">
          What would you like to tweets about?
        </Label>
        <Textarea
          id="prompt"
          placeholder="Enter a topic or idea for your tweet..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="min-h-[100px]"
          required
        />
      </div>
      <div>
        <Label htmlFor="count" className="block text-sm font-medium mb-2">
          Tweets Number
        </Label>
        <Input
          type="number"
          value={count}
          id="count"
          onChange={(e) => setCount(parseInt(e.target.value))}
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
