import { useState } from 'react';
import { Send, MessageSquare, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useToast } from '@/hooks/use-toast';

interface Message {
  id: string;
  author: string;
  content: string;
  timestamp: string;
  mentions?: string[];
}

interface ProjectDiscussionProps {
  projectId: string;
}

export function ProjectDiscussion({ projectId }: ProjectDiscussionProps) {
  const { toast } = useToast();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      author: 'Sarah Smith',
      content: 'Hey team! I\'ve finished the initial wireframes for the homepage. They\'re ready for review.',
      timestamp: '2024-03-08T10:30:00Z',
    },
    {
      id: '2',
      author: 'Mike Johnson',
      content: 'Great work @Sarah! I\'ll take a look this afternoon and start setting up the development environment.',
      timestamp: '2024-03-08T11:15:00Z',
      mentions: ['Sarah']
    },
    {
      id: '3',
      author: 'Lisa Chen',
      content: 'I\'ve completed the competitor analysis. Found some interesting design patterns we could incorporate.',
      timestamp: '2024-03-08T14:20:00Z',
    },
    {
      id: '4',
      author: 'John Doe',
      content: 'Perfect timing everyone! Let\'s schedule a review meeting for tomorrow to discuss the wireframes and findings.',
      timestamp: '2024-03-08T15:45:00Z',
    }
  ]);

  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const message: Message = {
      id: Date.now().toString(),
      author: 'John Doe', // Current user
      content: newMessage,
      timestamp: new Date().toISOString(),
    };

    setMessages([...messages, message]);
    setNewMessage('');
    
    toast({
      title: "Message sent!",
      description: "Your message has been posted to the discussion",
    });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);

    if (diffInHours < 1) {
      const diffInMinutes = Math.floor(diffInHours * 60);
      return `${diffInMinutes}m ago`;
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)}h ago`;
    } else {
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric'
      });
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <MessageSquare className="h-5 w-5" />
          Project Discussion
        </h2>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Team Chat</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
            {messages.map((message) => (
              <div key={message.id} className="flex gap-3 animate-fade-in">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="text-xs bg-primary text-primary-foreground">
                    {getInitials(message.author)}
                  </AvatarFallback>
                </Avatar>
                
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-sm">{message.author}</span>
                    <span className="text-xs text-muted-foreground">
                      {formatTimestamp(message.timestamp)}
                    </span>
                  </div>
                  
                  <div className="text-sm leading-relaxed">
                    {message.content.split(' ').map((word, index) => {
                      if (word.startsWith('@')) {
                        return (
                          <span key={index} className="text-primary font-medium">
                            {word}{' '}
                          </span>
                        );
                      }
                      return word + ' ';
                    })}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex gap-2">
            <Input
              placeholder="Write a message... (use @username to mention)"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1"
            />
            <Button 
              onClick={handleSendMessage} 
              disabled={!newMessage.trim()}
              size="sm"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Discussion Guidelines</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-muted-foreground space-y-2">
            <p>• Use @username to mention team members</p>
            <p>• Keep discussions project-related and constructive</p>
            <p>• Share updates, ask questions, and collaborate effectively</p>
            <p>• Important decisions should be documented in task descriptions</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}