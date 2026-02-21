
'use client';

import { useState } from 'react';
import { 
  Building2, 
  Upload, 
  FileText, 
  CheckCircle2, 
  Loader2, 
  AlertCircle 
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
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { summarizeClinicDocument, ClinicDocSummarizationOutput } from '@/ai/flows/clinic-doc-summarization';
import { toast } from '@/hooks/use-toast';

export default function ClinicOnboarding() {
  const [docContent, setDocContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState<ClinicDocSummarizationOutput | null>(null);

  const handleSummarize = async () => {
    if (!docContent.trim()) {
      toast({ title: "Error", description: "Please paste the document content first.", variant: "destructive" });
      return;
    }
    setLoading(true);
    try {
      const result = await summarizeClinicDocument({ documentContent: docContent });
      setSummary(result);
    } catch (error) {
      toast({ title: "Error", description: "Could not process document. Please try again.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="text-center mb-12 space-y-4">
        <div className="inline-flex items-center justify-center p-4 bg-primary/10 rounded-full mb-4">
          <Building2 className="h-10 w-10 text-primary" />
        </div>
        <h1 className="text-3xl font-bold text-primary">Clinic Registration</h1>
        <p className="text-muted-foreground">Register your Ayurvedic clinic and get verified by our admin team using AI-guided onboarding.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Registration Form */}
        <Card className="border-primary/10 shadow-lg">
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
            <CardDescription>Enter your clinic's primary details.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Clinic Name</Label>
              <Input id="name" placeholder="Vedic Wellness Center" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input id="location" placeholder="Kochi, Kerala" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="docs">Certification Upload (OCR Text)</Label>
              <Textarea 
                id="docs" 
                className="h-40" 
                placeholder="Paste the text from your certification documents here for AI verification..."
                value={docContent}
                onChange={(e) => setDocContent(e.target.value)}
              />
            </div>
            <Button 
              className="w-full bg-primary" 
              onClick={handleSummarize}
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Analyzing Documents...
                </>
              ) : (
                <>
                  <Upload className="h-4 w-4 mr-2" />
                  Verify & Submit
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* AI Result / Preview */}
        <div className="space-y-6">
          {summary ? (
            <Card className="border-accent/20 bg-accent/5 shadow-xl animate-fade-in">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-primary">
                  <CheckCircle2 className="h-5 w-5 text-accent" />
                  AI Document Analysis
                </CardTitle>
                <CardDescription>Summary extracted from your certification text.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 text-sm">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <p className="font-bold text-xs uppercase text-muted-foreground">Clinic Name</p>
                    <p>{summary.clinicName}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="font-bold text-xs uppercase text-muted-foreground">Type</p>
                    <p>{summary.certificationType}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="font-bold text-xs uppercase text-muted-foreground">Issue Date</p>
                    <p>{summary.issueDate || 'N/A'}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="font-bold text-xs uppercase text-muted-foreground">Expiry Date</p>
                    <p>{summary.expiryDate || 'N/A'}</p>
                  </div>
                </div>
                <div className="pt-4 border-t border-accent/20">
                  <p className="font-bold text-xs uppercase text-muted-foreground mb-1">Key Summary</p>
                  <p className="text-muted-foreground leading-relaxed italic">
                    "{summary.keySummary}"
                  </p>
                </div>
                <Button variant="outline" className="w-full border-accent text-accent hover:bg-accent/10 mt-4">
                  Confirm & Finalize
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="h-full flex flex-col items-center justify-center p-8 bg-muted/20 border-2 border-dashed border-muted rounded-3xl text-center space-y-4">
              <FileText className="h-12 w-12 text-muted-foreground opacity-30" />
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-primary opacity-40">Awaiting Documentation</h3>
                <p className="text-sm text-muted-foreground max-w-xs">
                  Once you paste your certification text and click verify, our AI will instantly extract key validity metrics.
                </p>
              </div>
            </div>
          )}

          <div className="p-4 bg-primary/5 rounded-2xl flex gap-3 items-start border border-primary/10">
            <AlertCircle className="h-5 w-5 text-primary mt-0.5" />
            <div className="text-xs text-muted-foreground space-y-1">
              <p className="font-bold text-primary">Why verify?</p>
              <p>Verified clinics appear higher in search results and gain the "Holistic Trust" badge, increasing bookings by up to 40%.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
