import { ResumeProvider } from '@/context/ResumeContext';
import { ResumeBuilder } from '@/components/resume/ResumeBuilder';

const Index = () => {
  return (
    <ResumeProvider>
      <ResumeBuilder />
    </ResumeProvider>
  );
};

export default Index;
