
'use client';

import { 
  Users, 
  Plus, 
  Search, 
  BarChart3, 
  Calendar as CalendarIcon, 
  ClipboardList,
  ChevronRight
} from 'lucide-react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

const PATIENTS = [
  { id: '1', name: 'Rahul Sharma', plan: '14-Day Detox', status: 'Active', progress: 35, lastVisit: '2024-03-20' },
  { id: '2', name: 'Ananya Iyer', plan: 'Stress Management', status: 'Pending', progress: 0, lastVisit: '2024-03-21' },
  { id: '3', name: 'Rajesh Nair', plan: 'Pain Relief (Gout)', status: 'Active', progress: 80, lastVisit: '2024-03-18' },
  { id: '4', name: 'Megha Gupta', plan: 'Weight Management', status: 'Completed', progress: 100, lastVisit: '2024-03-15' },
];

const ANALYTICS_DATA = [
  { month: 'Jan', patients: 45, recovery: 85 },
  { month: 'Feb', patients: 52, recovery: 88 },
  { month: 'Mar', patients: 61, recovery: 92 },
  { month: 'Apr', patients: 58, recovery: 90 },
];

export default function DoctorDashboard() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
        <div>
          <h1 className="text-3xl font-bold text-primary">Doctor's Command Center</h1>
          <p className="text-muted-foreground">Manage therapy plans and monitor patient success.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">Schedule Multi-Day Session</Button>
          <Button className="bg-primary gap-2">
            <Plus className="h-4 w-4" />
            New Therapy Plan
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Stats Cards */}
        <Card className="border-primary/10 shadow-md">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground uppercase font-bold tracking-widest">Total Patients</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <h3 className="text-3xl font-bold text-primary">124</h3>
              <Users className="h-8 w-8 text-accent opacity-20" />
            </div>
            <p className="text-xs text-secondary font-medium mt-2">+12% from last month</p>
          </CardContent>
        </Card>

        <Card className="border-primary/10 shadow-md">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground uppercase font-bold tracking-widest">Recovery Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <h3 className="text-3xl font-bold text-primary">92%</h3>
              <BarChart3 className="h-8 w-8 text-accent opacity-20" />
            </div>
            <p className="text-xs text-secondary font-medium mt-2">Highest in Kerala region</p>
          </CardContent>
        </Card>

        <Card className="border-primary/10 shadow-md">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground uppercase font-bold tracking-widest">Active Plans</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <h3 className="text-3xl font-bold text-primary">48</h3>
              <ClipboardList className="h-8 w-8 text-accent opacity-20" />
            </div>
            <p className="text-xs text-secondary font-medium mt-2">8 finishing this week</p>
          </CardContent>
        </Card>

        <Card className="border-primary/10 shadow-md">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground uppercase font-bold tracking-widest">Today's Appointments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <h3 className="text-3xl font-bold text-primary">14</h3>
              <CalendarIcon className="h-8 w-8 text-accent opacity-20" />
            </div>
            <p className="text-xs text-secondary font-medium mt-2">Next at 2:00 PM</p>
          </CardContent>
        </Card>

        {/* Patient Table */}
        <Card className="lg:col-span-3 border-primary/10 shadow-xl overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between border-b bg-muted/20">
            <div>
              <CardTitle className="text-xl">Recent Patients</CardTitle>
              <CardDescription>Monitor ongoing recovery and session attendance.</CardDescription>
            </div>
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search patients..." className="pl-10" />
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Patient Name</TableHead>
                  <TableHead>Therapy Plan</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Progress</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {PATIENTS.map((p) => (
                  <TableRow key={p.id}>
                    <TableCell className="font-medium text-primary">{p.name}</TableCell>
                    <TableCell>{p.plan}</TableCell>
                    <TableCell>
                      <Badge variant={p.status === 'Active' ? 'default' : p.status === 'Pending' ? 'secondary' : 'outline'} className={p.status === 'Active' ? 'bg-primary' : ''}>
                        {p.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="w-24 flex items-center gap-2">
                        <div className="h-2 flex-1 bg-muted rounded-full overflow-hidden">
                          <div className="h-full bg-accent" style={{ width: `${p.progress}%` }} />
                        </div>
                        <span className="text-xs font-bold">{p.progress}%</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" className="text-accent hover:text-accent/80 hover:bg-accent/10">
                        View Details
                        <ChevronRight className="h-4 w-4 ml-1" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Side Stats */}
        <Card className="border-primary/10 shadow-xl">
          <CardHeader>
            <CardTitle>Performance Insights</CardTitle>
            <CardDescription>Monthly growth and patient outcomes.</CardDescription>
          </CardHeader>
          <CardContent className="h-[250px] p-0 pb-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={ANALYTICS_DATA}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} />
                <Tooltip 
                  cursor={{ fill: 'rgba(27, 67, 50, 0.05)' }}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                />
                <Bar dataKey="patients" fill="#1B4332" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
          <CardHeader className="pt-0 border-t">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Patient Satisfaction</span>
                <span className="text-sm font-bold text-accent">4.8/5.0</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Average Recovery Time</span>
                <span className="text-sm font-bold text-accent">11.2 Days</span>
              </div>
            </div>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
}
