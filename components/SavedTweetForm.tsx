'use client'

import { useState, useEffect } from 'react'
import { format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Textarea } from "@/components/ui/textarea"

type Tweet = {
  id: number
  content: string
  scheduledDate: string
  scheduledTime: string
  status: 'DRAFT' | 'SCHEDULED' | 'POSTED'
}

type TweetFormProps = {
  onSave: (tweet: Omit<Tweet, 'id' | 'status'>) => void
  initialTweet?: Tweet | null
}

export function SavedTweetForm({ onSave, initialTweet }: TweetFormProps) {
  const [content, setContent] = useState(initialTweet?.content || '')
  const [scheduledDate, setScheduledDate] = useState<Date | undefined>(
    initialTweet?.scheduledDate ? new Date(initialTweet.scheduledDate) : undefined
  )
  const [scheduledTime, setScheduledTime] = useState(initialTweet?.scheduledTime || '')

  useEffect(() => {
    if (initialTweet) {
      setContent(initialTweet.content)
      setScheduledDate(new Date(initialTweet.scheduledDate))
      setScheduledTime(initialTweet.scheduledTime)
    }
  }, [initialTweet])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!scheduledDate || !scheduledTime) return

    onSave({
      content,
      scheduledDate: scheduledDate.toISOString(),
      scheduledTime: new Date(`${format(scheduledDate, 'yyyy-MM-dd')}T${scheduledTime}`).toISOString(),
    })

    // Reset form
    setContent('')
    setScheduledDate(undefined)
    setScheduledTime('')
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="content">Tweet Content</Label>
        <Textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          className="mt-1"
        />
      </div>
      <div className="flex space-x-4">
        <div>
          <Label>Scheduled Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={`w-[240px] justify-start text-left font-normal ${
                  !scheduledDate && "text-muted-foreground"
                }`}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {scheduledDate ? format(scheduledDate, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={scheduledDate}
                onSelect={setScheduledDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
        <div>
          <Label htmlFor="scheduledTime">Scheduled Time</Label>
          <Input
            id="scheduledTime"
            type="time"
            value={scheduledTime}
            onChange={(e) => setScheduledTime(e.target.value)}
            required
            className="mt-1"
          />
        </div>
      </div>
      <Button type="submit">
        {initialTweet ? 'Update Tweet' : 'Schedule Tweet'}
      </Button>
    </form>
  )
}

