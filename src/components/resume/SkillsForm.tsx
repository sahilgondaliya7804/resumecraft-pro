import { useState } from 'react';
import { useResume } from '@/context/ResumeContext';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, X, Sparkles } from 'lucide-react';

const suggestedSkills = [
  'JavaScript', 'TypeScript', 'React', 'Node.js', 'Python', 'SQL',
  'Git', 'AWS', 'Docker', 'Agile', 'Communication', 'Leadership',
  'Problem Solving', 'Project Management', 'Data Analysis',
];

export function SkillsForm() {
  const { state, dispatch } = useResume();
  const [newSkill, setNewSkill] = useState('');

  const handleAdd = () => {
    if (!newSkill.trim()) return;
    if (state.skills.includes(newSkill.trim())) return;
    
    dispatch({
      type: 'SET_SKILLS',
      payload: [...state.skills, newSkill.trim()],
    });
    setNewSkill('');
  };

  const handleRemove = (skill: string) => {
    dispatch({
      type: 'SET_SKILLS',
      payload: state.skills.filter((s) => s !== skill),
    });
  };

  const handleSuggestionClick = (skill: string) => {
    if (state.skills.includes(skill)) return;
    dispatch({
      type: 'SET_SKILLS',
      payload: [...state.skills, skill],
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAdd();
    }
  };

  const availableSuggestions = suggestedSkills.filter(
    (skill) => !state.skills.includes(skill)
  );

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="space-y-2">
        <h2 className="text-2xl font-heading font-semibold text-foreground">Skills</h2>
        <p className="text-muted-foreground">Add your technical and soft skills</p>
      </div>

      {/* Add skill input */}
      <div className="flex gap-2">
        <Input
          value={newSkill}
          onChange={(e) => setNewSkill(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Enter a skill..."
          className="h-11 flex-1"
        />
        <Button onClick={handleAdd} className="h-11 px-6">
          <Plus className="h-4 w-4 mr-2" />
          Add
        </Button>
      </div>

      {/* Current skills */}
      {state.skills.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">Your Skills</h3>
          <div className="flex flex-wrap gap-2">
            {state.skills.map((skill) => (
              <Badge
                key={skill}
                variant="secondary"
                className="pl-3 pr-2 py-1.5 text-sm bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
              >
                {skill}
                <button
                  onClick={() => handleRemove(skill)}
                  className="ml-2 hover:text-destructive transition-colors"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* Suggestions */}
      {availableSuggestions.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
            <Sparkles className="h-4 w-4" />
            Suggestions
          </div>
          <div className="flex flex-wrap gap-2">
            {availableSuggestions.map((skill) => (
              <button
                key={skill}
                onClick={() => handleSuggestionClick(skill)}
                className="px-3 py-1.5 text-sm rounded-full border border-border bg-card hover:bg-secondary hover:border-primary/30 transition-all text-muted-foreground hover:text-foreground"
              >
                + {skill}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Empty state */}
      {state.skills.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          <Sparkles className="h-12 w-12 mx-auto mb-3 opacity-50" />
          <p>Add skills to showcase your expertise</p>
        </div>
      )}
    </div>
  );
}
