import { cn } from '@/lib/utils';
import { User, Briefcase, GraduationCap, Sparkles, Check } from 'lucide-react';

const steps = [
  { id: 0, label: 'Personal', icon: User },
  { id: 1, label: 'Experience', icon: Briefcase },
  { id: 2, label: 'Education', icon: GraduationCap },
  { id: 3, label: 'Skills', icon: Sparkles },
];

interface StepIndicatorProps {
  currentStep: number;
  onStepClick: (step: number) => void;
}

export function StepIndicator({ currentStep, onStepClick }: StepIndicatorProps) {
  return (
    <div className="flex items-center justify-between">
      {steps.map((step, index) => {
        const Icon = step.icon;
        const isCompleted = currentStep > step.id;
        const isCurrent = currentStep === step.id;

        return (
          <div key={step.id} className="flex items-center">
            <button
              onClick={() => onStepClick(step.id)}
              className={cn(
                'flex flex-col items-center gap-2 transition-all',
                isCurrent && 'scale-105'
              )}
            >
              <div
                className={cn(
                  'w-10 h-10 rounded-full flex items-center justify-center transition-all',
                  isCompleted
                    ? 'bg-primary text-primary-foreground'
                    : isCurrent
                    ? 'bg-primary/20 text-primary ring-2 ring-primary ring-offset-2 ring-offset-background'
                    : 'bg-secondary text-muted-foreground'
                )}
              >
                {isCompleted ? <Check className="h-5 w-5" /> : <Icon className="h-5 w-5" />}
              </div>
              <span
                className={cn(
                  'text-xs font-medium transition-colors hidden sm:block',
                  isCurrent ? 'text-primary' : 'text-muted-foreground'
                )}
              >
                {step.label}
              </span>
            </button>

            {index < steps.length - 1 && (
              <div
                className={cn(
                  'w-12 md:w-20 h-0.5 mx-2 transition-colors',
                  currentStep > step.id ? 'bg-primary' : 'bg-border'
                )}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
