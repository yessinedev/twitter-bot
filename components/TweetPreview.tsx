"use client";

import { Checkbox } from "@/components/ui/checkbox";

interface TweetPreviewProps {
  content: string;
  isChecked: boolean;
  onCheckChange: (checked: boolean) => void;
}

export function TweetPreview({
  content,
  isChecked,
  onCheckChange,
}: TweetPreviewProps) {
  return (
    <div className="space-y-4 flex items-start">
      <Checkbox
        id={`tweet-${content}`}
        checked={isChecked}
        onCheckedChange={onCheckChange}
        className="mt-1 mr-2"
      />
      <div className="flex-grow">
        <label
          htmlFor={`tweet-${content}`}
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          <div className="p-4 rounded-lg bg-muted">{content}</div>
        </label>
      </div>
    </div>
  );
}

