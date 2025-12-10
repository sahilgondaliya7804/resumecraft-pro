import { useState } from 'react';
import { useResume, Education } from '@/context/ResumeContext';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Plus, Trash2, GraduationCap, Building2, Calendar, BookOpen } from 'lucide-react';

const generateId = () => Math.random().toString(36).substr(2, 9);

const emptyEducation: Omit<Education, 'id'> = {
  institution: '',
  degree: '',
  field: '',
  startDate: '',
  endDate: '',
  gpa: '',
};

export function EducationForm() {
  const { state, dispatch } = useResume();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<Omit<Education, 'id'>>(emptyEducation);

  const handleAdd = () => {
    if (!form.institution || !form.degree) return;
    dispatch({
      type: 'ADD_EDUCATION',
      payload: { ...form, id: generateId() },
    });
    setForm(emptyEducation);
  };

  const handleUpdate = () => {
    if (!editingId || !form.institution || !form.degree) return;
    dispatch({
      type: 'UPDATE_EDUCATION',
      payload: { ...form, id: editingId },
    });
    setEditingId(null);
    setForm(emptyEducation);
  };

  const handleEdit = (edu: Education) => {
    setEditingId(edu.id);
    setForm({
      institution: edu.institution,
      degree: edu.degree,
      field: edu.field,
      startDate: edu.startDate,
      endDate: edu.endDate,
      gpa: edu.gpa,
    });
  };

  const handleDelete = (id: string) => {
    dispatch({ type: 'DELETE_EDUCATION', payload: id });
    if (editingId === id) {
      setEditingId(null);
      setForm(emptyEducation);
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setForm(emptyEducation);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="space-y-2">
        <h2 className="text-2xl font-heading font-semibold text-foreground">Education</h2>
        <p className="text-muted-foreground">Add your educational background</p>
      </div>

      {/* Existing education */}
      {state.education.length > 0 && (
        <div className="space-y-3">
          {state.education.map((edu) => (
            <Card key={edu.id} className="border-border/60 shadow-soft">
              <CardContent className="p-4">
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <h3 className="font-semibold text-foreground">{edu.degree} in {edu.field}</h3>
                    <p className="text-sm text-muted-foreground">{edu.institution}</p>
                    <p className="text-xs text-muted-foreground">
                      {edu.startDate} - {edu.endDate}
                      {edu.gpa && ` • GPA: ${edu.gpa}`}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEdit(edu)}
                      className="text-primary hover:text-primary/80"
                    >
                      Edit
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(edu.id)}
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
            <GraduationCap className="h-5 w-5" />
            {editingId ? 'Edit Education' : 'Add New Education'}
          </div>

          <div className="grid gap-4">
            <div className="space-y-2">
              <Label htmlFor="institution" className="flex items-center gap-2 text-foreground">
                <Building2 className="h-4 w-4 text-primary" />
                Institution
              </Label>
              <Input
                id="institution"
                value={form.institution}
                onChange={(e) => setForm({ ...form, institution: e.target.value })}
                placeholder="University of Technology"
                className="h-11"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="degree" className="flex items-center gap-2 text-foreground">
                  <GraduationCap className="h-4 w-4 text-primary" />
                  Degree
                </Label>
                <Input
                  id="degree"
                  value={form.degree}
                  onChange={(e) => setForm({ ...form, degree: e.target.value })}
                  placeholder="Bachelor of Science"
                  className="h-11"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="field" className="flex items-center gap-2 text-foreground">
                  <BookOpen className="h-4 w-4 text-primary" />
                  Field of Study
                </Label>
                <Input
                  id="field"
                  value={form.field}
                  onChange={(e) => setForm({ ...form, field: e.target.value })}
                  placeholder="Computer Science"
                  className="h-11"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="eduStartDate" className="flex items-center gap-2 text-foreground">
                  <Calendar className="h-4 w-4 text-primary" />
                  Start Date
                </Label>
                <Input
                  id="eduStartDate"
                  type="month"
                  value={form.startDate}
                  onChange={(e) => setForm({ ...form, startDate: e.target.value })}
                  className="h-11"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="eduEndDate" className="flex items-center gap-2 text-foreground">
                  <Calendar className="h-4 w-4 text-primary" />
                  End Date
                </Label>
                <Input
                  id="eduEndDate"
                  type="month"
                  value={form.endDate}
                  onChange={(e) => setForm({ ...form, endDate: e.target.value })}
                  className="h-11"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="gpa" className="text-foreground">GPA (Optional)</Label>
                <Input
                  id="gpa"
                  value={form.gpa}
                  onChange={(e) => setForm({ ...form, gpa: e.target.value })}
                  placeholder="3.8"
                  className="h-11"
                />
              </div>
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
                  Add Education
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
