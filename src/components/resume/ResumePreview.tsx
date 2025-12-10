import { forwardRef } from 'react';
import { useResume } from '@/context/ResumeContext';
import { Mail, Phone, MapPin, Linkedin, Globe } from 'lucide-react';

const formatDate = (date: string) => {
  if (!date) return '';
  const [year, month] = date.split('-');
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${monthNames[parseInt(month) - 1]} ${year}`;
};

export const ResumePreview = forwardRef<HTMLDivElement>((_, ref) => {
  const { state } = useResume();
  const { personalInfo, experiences, education, skills, theme } = state;

  const hasContent = personalInfo.fullName || experiences.length > 0 || education.length > 0 || skills.length > 0;

  const themeStyles = {
    modern: {
      container: 'bg-card',
      header: 'bg-gradient-to-r from-[hsl(199,89%,48%)] to-[hsl(172,66%,50%)] text-[hsl(0,0%,100%)] p-8',
      section: 'border-l-4 border-[hsl(199,89%,48%)] pl-4',
      sectionTitle: 'text-[hsl(199,89%,48%)] font-bold uppercase tracking-wide text-sm mb-3',
      skillBadge: 'bg-[hsl(199,89%,48%,0.1)] text-[hsl(199,89%,48%)] px-3 py-1 rounded-full text-xs',
    },
    classic: {
      container: 'bg-card',
      header: 'border-b-2 border-foreground p-8 text-foreground',
      section: 'border-b border-border pb-4',
      sectionTitle: 'text-foreground font-serif font-bold text-lg mb-3 border-b border-foreground inline-block',
      skillBadge: 'border border-foreground text-foreground px-3 py-1 rounded text-xs',
    },
    minimal: {
      container: 'bg-card',
      header: 'p-8 text-foreground',
      section: '',
      sectionTitle: 'text-muted-foreground font-medium uppercase tracking-widest text-xs mb-4',
      skillBadge: 'bg-secondary text-foreground px-3 py-1 rounded-sm text-xs',
    },
  };

  const currentTheme = themeStyles[theme];

  if (!hasContent) {
    return (
      <div className="h-full flex items-center justify-center text-muted-foreground">
        <div className="text-center">
          <div className="text-6xl mb-4 opacity-30">📄</div>
          <p className="text-lg">Start filling in your details</p>
          <p className="text-sm mt-1">Your resume preview will appear here</p>
        </div>
      </div>
    );
  }

  return (
    <div ref={ref} className={`${currentTheme.container} shadow-card rounded-lg overflow-hidden`}>
      {/* Header */}
      <div className={currentTheme.header}>
        <h1 className={`text-2xl font-bold ${theme === 'minimal' ? 'text-foreground' : ''}`}>
          {personalInfo.fullName || 'Your Name'}
        </h1>
        
        <div className={`flex flex-wrap gap-x-4 gap-y-1 mt-3 text-sm ${theme === 'modern' ? 'text-[hsl(0,0%,100%)]/90' : 'text-muted-foreground'}`}>
          {personalInfo.email && (
            <span className="flex items-center gap-1">
              <Mail className="h-3 w-3" />
              {personalInfo.email}
            </span>
          )}
          {personalInfo.phone && (
            <span className="flex items-center gap-1">
              <Phone className="h-3 w-3" />
              {personalInfo.phone}
            </span>
          )}
          {personalInfo.location && (
            <span className="flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              {personalInfo.location}
            </span>
          )}
          {personalInfo.linkedin && (
            <span className="flex items-center gap-1">
              <Linkedin className="h-3 w-3" />
              {personalInfo.linkedin}
            </span>
          )}
          {personalInfo.website && (
            <span className="flex items-center gap-1">
              <Globe className="h-3 w-3" />
              {personalInfo.website}
            </span>
          )}
        </div>
      </div>

      <div className="p-8 space-y-6">
        {/* Summary */}
        {personalInfo.summary && (
          <div className={currentTheme.section}>
            <h2 className={currentTheme.sectionTitle}>Summary</h2>
            <p className="text-sm text-foreground/80 leading-relaxed">{personalInfo.summary}</p>
          </div>
        )}

        {/* Experience */}
        {experiences.length > 0 && (
          <div className={currentTheme.section}>
            <h2 className={currentTheme.sectionTitle}>Experience</h2>
            <div className="space-y-4">
              {experiences.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-foreground">{exp.position}</h3>
                      <p className="text-sm text-muted-foreground">{exp.company}</p>
                    </div>
                    <span className="text-xs text-muted-foreground whitespace-nowrap">
                      {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                    </span>
                  </div>
                  {exp.description && (
                    <p className="text-sm text-foreground/80 mt-2 leading-relaxed">{exp.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {education.length > 0 && (
          <div className={currentTheme.section}>
            <h2 className={currentTheme.sectionTitle}>Education</h2>
            <div className="space-y-3">
              {education.map((edu) => (
                <div key={edu.id}>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-foreground">
                        {edu.degree} in {edu.field}
                      </h3>
                      <p className="text-sm text-muted-foreground">{edu.institution}</p>
                    </div>
                    <span className="text-xs text-muted-foreground whitespace-nowrap">
                      {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                    </span>
                  </div>
                  {edu.gpa && (
                    <p className="text-sm text-muted-foreground mt-1">GPA: {edu.gpa}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills */}
        {skills.length > 0 && (
          <div className={currentTheme.section}>
            <h2 className={currentTheme.sectionTitle}>Skills</h2>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <span key={skill} className={currentTheme.skillBadge}>
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
});

ResumePreview.displayName = 'ResumePreview';
