import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { StepIndicator } from './StepIndicator';
import { PersonalInfoForm } from './PersonalInfoForm';
import { ExperienceForm } from './ExperienceForm';
import { EducationForm } from './EducationForm';
import { SkillsForm } from './SkillsForm';
import { ResumePreview } from './ResumePreview';
import { ThemeSwitcher } from './ThemeSwitcher';
import { ChevronLeft, ChevronRight, Download, FileText, Eye, Palette } from 'lucide-react';
import html2pdf from 'html2pdf.js';
import { toast } from '@/hooks/use-toast';

const steps = [
  { component: PersonalInfoForm },
  { component: ExperienceForm },
  { component: EducationForm },
  { component: SkillsForm },
];

export function ResumeBuilder() {
  const [currentStep, setCurrentStep] = useState(0);
  const [showPreview, setShowPreview] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);

  const CurrentStepComponent = steps[currentStep].component;

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleDownloadPDF = async () => {
    if (!previewRef.current) return;

    toast({
      title: 'Generating PDF...',
      description: 'Please wait while we create your resume',
    });

    const element = previewRef.current;
    const opt = {
      margin: 0,
      filename: 'resume.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
    };

    try {
      await html2pdf().set(opt).from(element).save();
      toast({
        title: 'Success!',
        description: 'Your resume has been downloaded',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to generate PDF. Please try again.',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-card/80 backdrop-blur-xl border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <FileText className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <h1 className="font-heading font-bold text-lg text-foreground">Resume Builder</h1>
                <p className="text-xs text-muted-foreground">Create your professional resume</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                className="lg:hidden"
                onClick={() => setShowPreview(!showPreview)}
              >
                <Eye className="h-4 w-4 mr-2" />
                {showPreview ? 'Edit' : 'Preview'}
              </Button>
              <Button
                onClick={handleDownloadPDF}
                size="sm"
                className="bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity"
              >
                <Download className="h-4 w-4 mr-2" />
                Download PDF
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
          {/* Form Panel */}
          <div className={`space-y-6 ${showPreview ? 'hidden lg:block' : ''}`}>
            {/* Step Indicator */}
            <Card className="shadow-soft border-border/60">
              <CardContent className="p-4 md:p-6">
                <StepIndicator currentStep={currentStep} onStepClick={setCurrentStep} />
              </CardContent>
            </Card>

            {/* Form Content */}
            <Card className="shadow-soft border-border/60">
              <CardContent className="p-5 md:p-8">
                <CurrentStepComponent />
              </CardContent>
            </Card>

            {/* Navigation */}
            <div className="flex justify-between">
              <Button
                variant="outline"
                onClick={handlePrev}
                disabled={currentStep === 0}
                className="gap-2"
              >
                <ChevronLeft className="h-4 w-4" />
                Previous
              </Button>
              
              {currentStep < steps.length - 1 ? (
                <Button onClick={handleNext} className="gap-2">
                  Next
                  <ChevronRight className="h-4 w-4" />
                </Button>
              ) : (
                <Button
                  onClick={handleDownloadPDF}
                  className="gap-2 bg-gradient-to-r from-primary to-accent"
                >
                  <Download className="h-4 w-4" />
                  Download PDF
                </Button>
              )}
            </div>
          </div>

          {/* Preview Panel */}
          <div className={`space-y-4 ${showPreview ? '' : 'hidden lg:block'}`}>
            <Card className="shadow-soft border-border/60">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                    <Palette className="h-4 w-4 text-primary" />
                    Theme
                  </div>
                  <ThemeSwitcher />
                </div>
              </CardContent>
            </Card>

            <div className="sticky top-28">
              <div className="bg-muted/50 rounded-xl p-4 md:p-6">
                <div className="aspect-[8.5/11] overflow-auto rounded-lg bg-card shadow-card">
                  <ResumePreview ref={previewRef} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
