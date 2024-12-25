"use client";

import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";

interface TweetPreviewProps {
  content: string;
  onPost: () => Promise<void>;
  isPosting: boolean;
}

export function TweetPreview({
  content,
  onPost,
  isPosting,
}: TweetPreviewProps) {
  return (
    <div className="space-y-4">
      <div className="p-4 rounded-lg bg-muted">{content}</div>

      {/* <Button
        onClick={onPost}
        disabled={isPosting}
        variant="secondary"
        className="w-full"
      >
        <Send className="w-4 h-4 mr-2" />
        {isPosting ? "Posting..." : "Post Tweet"}
      </Button> */}
    </div>
  );
}
