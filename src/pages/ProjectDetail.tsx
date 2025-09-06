import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, Users, MessageSquare, Calendar, Clock, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Header } from '@/components/layout/Header';
import { TaskBoard } from '@/components/tasks/TaskBoard';
import { ProjectDiscussion } from '@/components/project/ProjectDiscussion';
import { ProjectMembers } from '@/components/project/ProjectMembers';

interface Task {
  id: string;
  title: string;
  description: string;
  assignee: string;
  dueDate: string;
  status: 'todo' | 'in-progress' | 'done';
  priority: 'low' | 'medium' | 'high';
}

interface Project {
  id: string;
  name: string;
  description: string;
  createdDate: string;
  members: Array<{ id: string; name: string; email: string; role: string; avatar?: string }>;
}

export default function ProjectDetail() {
  const { projectId } = useParams();
  const navigate = useNavigate();
  
  // Mock project data
  const [project] = useState<Project>({
    id: projectId || '1',
    name: 'Website Redesign',
    description: 'Complete overhaul of company website with modern design and improved user experience.',
    createdDate: '2024-01-15',
    members: [
      { id: '1', name: 'John Doe', email: 'john@company.com', role: 'Owner' },
      { id: '2', name: 'Sarah Smith', email: 'sarah@company.com', role: 'Designer' },
      { id: '3', name: 'Mike Johnson', email: 'mike@company.com', role: 'Developer' },
      { id: '4', name: 'Lisa Chen', email: 'lisa@company.com', role: 'Developer' },
      { id: '5', name: 'Tom Wilson', email: 'tom@company.com', role: 'QA' }
    ]
  });

  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      title: 'Design new homepage layout',
      description: 'Create wireframes and mockups for the new homepage design',
      assignee: 'Sarah Smith',
      dueDate: '2024-03-15',
      status: 'in-progress',
      priority: 'high'
    },
    {
      id: '2',
      title: 'Set up development environment',
      description: 'Configure build tools and development workflow',
      assignee: 'Mike Johnson',
      dueDate: '2024-03-10',
      status: 'done',
      priority: 'medium'
    },
    {
      id: '3',
      title: 'Research competitor websites',
      description: 'Analyze competitor websites for inspiration and best practices',
      assignee: 'Lisa Chen',
      dueDate: '2024-03-20',
      status: 'todo',
      priority: 'low'
    },
    {
      id: '4',
      title: 'Create content strategy',
      description: 'Develop content guidelines and tone of voice',
      assignee: 'Sarah Smith',
      dueDate: '2024-03-18',
      status: 'todo',
      priority: 'medium'
    }
  ]);

  const taskStats = {
    todo: tasks.filter(t => t.status === 'todo').length,
    inProgress: tasks.filter(t => t.status === 'in-progress').length,
    done: tasks.filter(t => t.status === 'done').length
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto p-6">
        {/* Project Header */}
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
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">{project.name}</h1>
              <p className="text-muted-foreground mb-4">{project.description}</p>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  Created {formatDate(project.createdDate)}
                </div>
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  {project.members.length} members
                </div>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">To Do</p>
                    <p className="text-2xl font-bold">{taskStats.todo}</p>
                  </div>
                  <Clock className="h-8 w-8 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">In Progress</p>
                    <p className="text-2xl font-bold text-primary">{taskStats.inProgress}</p>
                  </div>
                  <User className="h-8 w-8 text-primary" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Completed</p>
                    <p className="text-2xl font-bold text-success">{taskStats.done}</p>
                  </div>
                  <div className="h-8 w-8 rounded-full bg-success flex items-center justify-center">
                    <span className="text-success-foreground text-sm font-bold">✓</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Project Content Tabs */}
        <Tabs defaultValue="tasks" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="tasks">Tasks</TabsTrigger>
            <TabsTrigger value="discussion">Discussion</TabsTrigger>
            <TabsTrigger value="members">Members</TabsTrigger>
          </TabsList>
          
          <TabsContent value="tasks">
            <TaskBoard 
              tasks={tasks} 
              onTasksChange={setTasks}
              projectMembers={project.members}
            />
          </TabsContent>
          
          <TabsContent value="discussion">
            <ProjectDiscussion projectId={project.id} />
          </TabsContent>
          
          <TabsContent value="members">
            <ProjectMembers 
              members={project.members} 
              projectId={project.id}
            />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}