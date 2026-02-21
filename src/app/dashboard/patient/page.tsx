
'use client';

import { 
  Activity, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  TrendingUp, 
  ArrowRight,
  Bell
} from 'lucide-react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';

const PROGRESS_DATA = [
  { day: 'Day 1', intensity: 30, recovery: 10 },
  { day: 'Day 2', intensity: 45, recovery: 25 },
  { day: 'Day 3', intensity: 60, recovery: 40 },
  { day: 'Day 4', intensity: 80, recovery: 65 },
  { day: 'Day 5', intensity: 75, recovery: 85 },
  { day: 'Day 6', intensity: 50, recovery: 92 },
  { day: 'Day 7', intensity: 40, recovery: 98 },
];

export default function PatientDashboard() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
        <div>
          <h1 className="text-3xl font-bold text-primary">Welcome Back, Rahul</h1>
          <p className="text-muted-foreground">Day 5 of your 14-day Panchakarma Detox Plan.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 h-3 w-3 bg-destructive rounded-full border-2 border-background" />
          </Button>
          <Button className="bg-primary">Log Daily Wellness</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Progress Overview */}
        <Card className="lg:col-span-2 border-primary/10 shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-2 text-primary">
              <Activity className="h-5 w-5 text-accent" />
              Recovery Progress
            </CardTitle>
            <CardDescription>Track your physiological recovery metrics over the past 7 days.</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={PROGRESS_DATA}>
                <defs>
                  <linearGradient id="colorRec" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#1B4332" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#1B4332" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
                <XAxis dataKey="day" axisLine={false} tickLine={false} />
                <YAxis hide />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="recovery" 
                  stroke="#1B4332" 
                  fillOpacity={1} 
                  fill="url(#colorRec)" 
                  strokeWidth={3}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Current Focus */}
        <Card className="border-primary/10 shadow-lg bg-primary text-primary-foreground">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Today's Schedule
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="bg-white/20 p-2 rounded-lg">
                <Clock className="h-5 w-5" />
              </div>
              <div>
                <p className="font-bold">Abhyanga (Massage)</p>
                <p className="text-sm text-white/70">09:00 AM - 10:30 AM</p>
                <Badge className="mt-2 bg-accent text-white border-none">Coming Up</Badge>
              </div>
            </div>
            <div className="flex items-start gap-4 opacity-50">
              <div className="bg-white/20 p-2 rounded-lg">
                <CheckCircle2 className="h-5 w-5" />
              </div>
              <div>
                <p className="font-bold">Morning Kashayam</p>
                <p className="text-sm text-white/70">07:00 AM</p>
                <p className="text-xs mt-1">Completed</p>
              </div>
            </div>
            <div className="pt-4 border-t border-white/10">
              <p className="text-xs text-white/60 mb-2 uppercase font-bold tracking-widest">Plan Completion</p>
              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span>35% Complete</span>
                  <span>5/14 Days</span>
                </div>
                <Progress value={35} className="bg-white/20" />
              </div>
            </div>
            <Button variant="secondary" className="w-full mt-4 group">
              View Full Schedule
              <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </CardContent>
        </Card>

        {/* Reminders & Notes */}
        <Card className="border-primary/10 shadow-lg">
          <CardHeader>
            <CardTitle className="text-lg">Doctor's Daily Note</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-accent/5 border-l-4 border-accent rounded-r-lg">
              <p className="text-sm italic text-muted-foreground">
                "Rahul, for today's Abhyanga, ensure you remain in a calm state. Avoid heavy meals until 2 hours after therapy. Your Vata levels are stabilizing well."
              </p>
              <p className="text-xs mt-2 font-bold text-primary">— Dr. Arya Sharma</p>
            </div>
            <div className="space-y-2">
              <h4 className="text-sm font-bold text-primary">Prescribed Herbs</h4>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline">Triphala Guggulu</Badge>
                <Badge variant="outline">Ashwagandha</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Card className="border-primary/5 bg-secondary/5">
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground font-medium">Vitality Score</p>
                <h3 className="text-2xl font-bold text-primary">84/100</h3>
              </div>
              <TrendingUp className="h-8 w-8 text-accent" />
            </CardContent>
          </Card>
          <Card className="border-primary/5 bg-secondary/5">
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground font-medium">Next Milestone</p>
                <h3 className="text-2xl font-bold text-primary">Day 7: Virechana</h3>
              </div>
              <Calendar className="h-8 w-8 text-accent" />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
