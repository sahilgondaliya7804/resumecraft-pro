import { useState } from 'react';
import { useResume, Experience } from '@/context/ResumeContext';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent } from '@/components/ui/card';
import { Plus, Trash2, Briefcase, Building2, Calendar } from 'lucide-react';

const generateId = () => Math.random().toString(36).substr(2, 9);

const emptyExperience: Omit<Experience, 'id'> = {
  company: '',
  position: '',
  startDate: '',
  endDate: '',
  current: false,
  description: '',
};

export function ExperienceForm() {
  const { state, dispatch } = useResume();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<Omit<Experience, 'id'>>(emptyExperience);

  const handleAdd = () => {
    if (!form.company || !form.position) return;
    dispatch({
      type: 'ADD_EXPERIENCE',
      payload: { ...form, id: generateId() },
    });
    setForm(emptyExperience);
  };

  const handleUpdate = () => {
    if (!editingId || !form.company || !form.position) return;
    dispatch({
      type: 'UPDATE_EXPERIENCE',
      payload: { ...form, id: editingId },
    });
    setEditingId(null);
    setForm(emptyExperience);
  };

  const handleEdit = (exp: Experience) => {
    setEditingId(exp.id);
    setForm({
      company: exp.company,
      position: exp.position,
      startDate: exp.startDate,
      endDate: exp.endDate,
      current: exp.current,
      description: exp.description,
    });
  };

  const handleDelete = (id: string) => {
    dispatch({ type: 'DELETE_EXPERIENCE', payload: id });
    if (editingId === id) {
      setEditingId(null);
      setForm(emptyExperience);
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setForm(emptyExperience);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="space-y-2">
        <h2 className="text-2xl font-heading font-semibold text-foreground">Work Experience</h2>
        <p className="text-muted-foreground">Add your professional experience</p>
      </div>

      {/* Existing experiences */}
      {state.experiences.length > 0 && (
        <div className="space-y-3">
          {state.experiences.map((exp) => (
            <Card key={exp.id} className="border-border/60 shadow-soft">
              <CardContent className="p-4">
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <h3 className="font-semibold text-foreground">{exp.position}</h3>
                    <p className="text-sm text-muted-foreground">{exp.company}</p>
                    <p className="text-xs text-muted-foreground">
                      {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEdit(exp)}
                      className="text-primary hover:text-primary/80"
                    >
                      Edit
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(exp.id)}
                      className="text-destructive hover:text-destructive/80"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Form */}
      <Card className="border-primary/20 bg-card shadow-soft">
        <CardContent className="p-5 space-y-4">
          <div className="flex items-center gap-2 text-primary font-medium">
            <Briefcase className="h-5 w-5" />
            {editingId ? 'Edit Experience' : 'Add New Experience'}
          </div>

          <div className="grid gap-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="position" className="flex items-center gap-2 text-foreground">
                  <Briefcase className="h-4 w-4 text-primary" />
                  Job Title
                </Label>
                <Input
                  id="position"
                  value={form.position}
                  onChange={(e) => setForm({ ...form, position: e.target.value })}
                  placeholder="Software Engineer"
                  className="h-11"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="company" className="flex items-center gap-2 text-foreground">
                  <Building2 className="h-4 w-4 text-primary" />
                  Company
                </Label>
                <Input
                  id="company"
                  value={form.company}
                  onChange={(e) => setForm({ ...form, company: e.target.value })}
                  placeholder="Tech Company Inc."
                  className="h-11"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="startDate" className="flex items-center gap-2 text-foreground">
                  <Calendar className="h-4 w-4 text-primary" />
                  Start Date
                </Label>
                <Input
                  id="startDate"
                  type="month"
                  value={form.startDate}
                  onChange={(e) => setForm({ ...form, startDate: e.target.value })}
                  className="h-11"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="endDate" className="flex items-center gap-2 text-foreground">
                  <Calendar className="h-4 w-4 text-primary" />
                  End Date
                </Label>
                <Input
                  id="endDate"
                  type="month"
                  value={form.endDate}
                  onChange={(e) => setForm({ ...form, endDate: e.target.value })}
                  disabled={form.current}
                  className="h-11"
                />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="current"
                checked={form.current}
                onCheckedChange={(checked) =>
                  setForm({ ...form, current: checked as boolean, endDate: '' })
                }
              />
              <Label htmlFor="current" className="text-sm text-muted-foreground cursor-pointer">
                I currently work here
              </Label>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description" className="text-foreground">Description</Label>
              <Textarea
                id="description"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                placeholder="Describe your responsibilities and achievements..."
                className="min-h-[100px] resize-none"
              />
            </div>

            <div className="flex gap-2 pt-2">
              {editingId ? (
                <>
                  <Button onClick={handleUpdate} className="flex-1">
                    Save Changes
                  </Button>
                  <Button variant="outline" onClick={handleCancel}>
                    Cancel
                  </Button>
                </>
              ) : (
                <Button onClick={handleAdd} className="w-full">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Experience
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
