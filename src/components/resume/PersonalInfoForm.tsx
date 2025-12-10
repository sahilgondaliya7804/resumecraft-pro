import { useResume, PersonalInfo } from '@/context/ResumeContext';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { User, Mail, Phone, MapPin, Linkedin, Globe } from 'lucide-react';

export function PersonalInfoForm() {
  const { state, dispatch } = useResume();
  const { personalInfo } = state;

  const handleChange = (field: keyof PersonalInfo, value: string) => {
    dispatch({
      type: 'SET_PERSONAL_INFO',
      payload: { ...personalInfo, [field]: value },
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="space-y-2">
        <h2 className="text-2xl font-heading font-semibold text-foreground">Personal Information</h2>
        <p className="text-muted-foreground">Let's start with your basic details</p>
      </div>

      <div className="grid gap-5">
        <div className="space-y-2">
          <Label htmlFor="fullName" className="flex items-center gap-2 text-foreground">
            <User className="h-4 w-4 text-primary" />
            Full Name
          </Label>
          <Input
            id="fullName"
            value={personalInfo.fullName}
            onChange={(e) => handleChange('fullName', e.target.value)}
            placeholder="John Doe"
            className="h-11"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="flex items-center gap-2 text-foreground">
              <Mail className="h-4 w-4 text-primary" />
              Email
            </Label>
            <Input
              id="email"
              type="email"
              value={personalInfo.email}
              onChange={(e) => handleChange('email', e.target.value)}
              placeholder="john@example.com"
              className="h-11"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone" className="flex items-center gap-2 text-foreground">
              <Phone className="h-4 w-4 text-primary" />
              Phone
            </Label>
            <Input
              id="phone"
              type="tel"
              value={personalInfo.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
              placeholder="+1 (555) 000-0000"
              className="h-11"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="location" className="flex items-center gap-2 text-foreground">
            <MapPin className="h-4 w-4 text-primary" />
            Location
          </Label>
          <Input
            id="location"
            value={personalInfo.location}
            onChange={(e) => handleChange('location', e.target.value)}
            placeholder="New York, NY"
            className="h-11"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="linkedin" className="flex items-center gap-2 text-foreground">
              <Linkedin className="h-4 w-4 text-primary" />
              LinkedIn
            </Label>
            <Input
              id="linkedin"
              value={personalInfo.linkedin}
              onChange={(e) => handleChange('linkedin', e.target.value)}
              placeholder="linkedin.com/in/johndoe"
              className="h-11"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="website" className="flex items-center gap-2 text-foreground">
              <Globe className="h-4 w-4 text-primary" />
              Website
            </Label>
            <Input
              id="website"
              value={personalInfo.website}
              onChange={(e) => handleChange('website', e.target.value)}
              placeholder="johndoe.com"
              className="h-11"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="summary" className="text-foreground">Professional Summary</Label>
          <Textarea
            id="summary"
            value={personalInfo.summary}
            onChange={(e) => handleChange('summary', e.target.value)}
            placeholder="A brief professional summary highlighting your key strengths and career objectives..."
            className="min-h-[120px] resize-none"
          />
        </div>
      </div>
    </div>
  );
}
