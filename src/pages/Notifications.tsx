import { useState } from 'react';
import { Bell, CheckCircle, Clock, Users, MessageSquare, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { AppLayout } from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

interface Notification {
  id: string;
  type: 'task_assigned' | 'due_date' | 'member_joined' | 'comment' | 'project_update';
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  projectName?: string;
}

export default function Notifications() {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'task_assigned',
      title: 'New task assigned',
      message: 'You have been assigned to "Design homepage layout" in Website Redesign project',
      timestamp: '2024-03-08T10:30:00Z',
      isRead: false,
      projectName: 'Website Redesign'
    },
    {
      id: '2',
      type: 'due_date',
      title: 'Due date approaching',
      message: 'Task "Mobile app wireframes" is due tomorrow',
      timestamp: '2024-03-08T09:15:00Z',
      isRead: false,
      projectName: 'Mobile App Development'
    },
    {
      id: '3',
      type: 'member_joined',
      title: 'New team member',
      message: 'Sarah Smith joined the Marketing Campaign project',
      timestamp: '2024-03-08T08:45:00Z',
      isRead: true,
      projectName: 'Marketing Campaign'
    },
    {
      id: '4',
      type: 'comment',
      title: 'New comment',
      message: 'Mike Johnson commented on your task "Setup development environment"',
      timestamp: '2024-03-07T16:20:00Z',
      isRead: true,
      projectName: 'Website Redesign'
    },
    {
      id: '5',
      type: 'project_update',
      title: 'Project update',
      message: 'Website Redesign project timeline has been updated',
      timestamp: '2024-03-07T14:10:00Z',
      isRead: true,
      projectName: 'Website Redesign'
    }
  ]);

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'task_assigned':
        return <CheckCircle className="h-5 w-5 text-primary" />;
      case 'due_date':
        return <Clock className="h-5 w-5 text-warning" />;
      case 'member_joined':
        return <Users className="h-5 w-5 text-success" />;
      case 'comment':
        return <MessageSquare className="h-5 w-5 text-secondary-accent" />;
      case 'project_update':
        return <Bell className="h-5 w-5 text-muted-foreground" />;
      default:
        return <Bell className="h-5 w-5 text-muted-foreground" />;
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 48) return 'Yesterday';
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, isRead: true }
          : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, isRead: true }))
    );
    toast({
      title: "All notifications marked as read",
      description: "Your notification list has been updated",
    });
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <AppLayout>
      <div className="container mx-auto max-w-4xl">
        <div className="flex items-center gap-4 mb-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/dashboard')}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Button>
        </div>

        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold flex items-center gap-3">
                <Bell className="h-8 w-8" />
                Notifications
                {unreadCount > 0 && (
                  <Badge variant="destructive" className="ml-2">
                    {unreadCount} new
                  </Badge>
                )}
              </h1>
              <p className="text-muted-foreground mt-1">
                Stay updated with your team's activity and important events
              </p>
            </div>
            
            {unreadCount > 0 && (
              <Button variant="outline" onClick={markAllAsRead}>
                Mark all as read
              </Button>
            )}
          </div>

          {notifications.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">No notifications</h3>
                <p className="text-muted-foreground">
                  You're all caught up! New notifications will appear here.
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-3">
              {notifications.map((notification) => (
                <Card 
                  key={notification.id} 
                  className={`cursor-pointer transition-all hover:shadow-md ${
                    !notification.isRead ? 'border-l-4 border-l-primary bg-primary/5' : ''
                  }`}
                  onClick={() => markAsRead(notification.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 mt-1">
                        {getNotificationIcon(notification.type)}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1">
                            <h4 className={`font-medium ${
                              !notification.isRead ? 'text-foreground' : 'text-muted-foreground'
                            }`}>
                              {notification.title}
                            </h4>
                            <p className="text-sm text-muted-foreground mt-1">
                              {notification.message}
                            </p>
                            {notification.projectName && (
                              <Badge variant="secondary" className="mt-2 text-xs">
                                {notification.projectName}
                              </Badge>
                            )}
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-muted-foreground whitespace-nowrap">
                              {formatTimestamp(notification.timestamp)}
                            </span>
                            {!notification.isRead && (
                              <div className="h-2 w-2 rounded-full bg-primary flex-shrink-0" />
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
}