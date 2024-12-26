"use client";

import { useState, useEffect } from "react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Pencil, Trash2, Plus, Loader2 } from "lucide-react";
import { SavedTweetForm } from "@/components/SavedTweetForm";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

type Tweet = {
  id: number;
  content: string;
  scheduledDate: string;
  scheduledTime: string;
  status: "DRAFT" | "SCHEDULED" | "POSTED";
};

export default function TweetsPage() {
  const [tweets, setTweets] = useState<Tweet[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingTweet, setEditingTweet] = useState<Tweet | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchTweets();
  }, []);

  const fetchTweets = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/tweets");
      if (!response.ok) throw new Error("Failed to fetch tweets");
      const data = await response.json();
      setTweets(data);
    } catch (error) {
      console.error("Error fetching tweets:", error);
      toast({
        title: "Error",
        description: "Failed to fetch tweets. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveTweet = async (tweet: Omit<Tweet, "id" | "status">) => {
    try {
      const response = await fetch("/api/tweets", {
        method: editingTweet ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
          editingTweet
            ? { ...tweet, status: "SCHEDULED", id: editingTweet.id }
            : tweet
        ),
      });
      if (!response.ok) throw new Error("Failed to save tweet");
      toast({
        title: "Success",
        description: `Tweet ${
          editingTweet ? "updated" : "created"
        } successfully.`,
      });
      setEditingTweet(null);
      setIsDialogOpen(false);
      fetchTweets();
    } catch (error) {
      console.error("Error saving tweet:", error);
      toast({
        title: "Error",
        description: `Failed to ${
          editingTweet ? "update" : "create"
        } tweet. Please try again.`,
        variant: "destructive",
      });
    }
  };

  const handleDeleteTweet = async (id: number) => {
    if (!confirm("Are you sure you want to delete this tweet?")) return;

    try {
      const response = await fetch(`/api/tweets/${id}`, { method: "DELETE" });
      if (!response.ok) throw new Error("Failed to delete tweet");
      toast({
        title: "Success",
        description: "Tweet deleted successfully.",
      });
      fetchTweets();
    } catch (error) {
      console.error("Error deleting tweet:", error);
      toast({
        title: "Error",
        description: "Failed to delete tweet. Please try again.",
        variant: "destructive",
      });
    }
  };

  const getStatusBadge = (status: Tweet["status"]) => {
    switch (status) {
      case "DRAFT":
        return <Badge variant="secondary">Draft</Badge>;
      case "SCHEDULED":
        return <Badge className="bg-blue-500">Scheduled</Badge>;
      case "POSTED":
        return <Badge className="bg-green-500">Posted</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto p-4 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Scheduled Tweets</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setEditingTweet(null)}>
              <Plus className="mr-2 h-4 w-4" /> New Tweet
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>
                {editingTweet ? "Edit Tweet" : "Schedule a New Tweet"}
              </DialogTitle>
            </DialogHeader>
            <SavedTweetForm
              onSave={handleSaveTweet}
              initialTweet={editingTweet}
            />
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="h-8 w-8 animate-spin" />
            </div>
          ) : tweets.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">
              No tweets scheduled yet. Create your first tweet!
            </p>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[40%]">Content</TableHead>
                    <TableHead>Scheduled For</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tweets.map((tweet) => (
                    <TableRow key={tweet.id}>
                      <TableCell className="font-medium">
                        {tweet.content}
                      </TableCell>
                      <TableCell>
                        {format(new Date(tweet.scheduledDate), "PP")} - {format(new Date(tweet.scheduledTime), "p")}
                      </TableCell>
                      
                      <TableCell>{getStatusBadge(tweet.status)}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <span className="sr-only">Open menu</span>
                              <Pencil className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onClick={() => {
                                setEditingTweet(tweet);
                                setIsDialogOpen(true);
                              }}
                            >
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleDeleteTweet(tweet.id)}
                            >
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
