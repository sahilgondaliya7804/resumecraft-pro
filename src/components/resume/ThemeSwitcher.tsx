import { useResume, ResumeData } from '@/context/ResumeContext';
import { cn } from '@/lib/utils';

const themes: { id: ResumeData['theme']; name: string; preview: string }[] = [
  {
    id: 'modern',
    name: 'Modern',
    preview: 'bg-gradient-to-r from-primary to-accent',
  },
  {
    id: 'classic',
    name: 'Classic',
    preview: 'bg-foreground',
  },
  {
    id: 'minimal',
    name: 'Minimal',
    preview: 'bg-muted',
  },
];

export function ThemeSwitcher() {
  const { state, dispatch } = useResume();

  return (
    <div className="flex gap-2">
      {themes.map((theme) => (
        <button
          key={theme.id}
          onClick={() => dispatch({ type: 'SET_THEME', payload: theme.id })}
          className={cn(
            'flex flex-col items-center gap-1.5 p-2 rounded-lg transition-all',
            state.theme === theme.id
              ? 'bg-primary/10 ring-2 ring-primary'
              : 'hover:bg-secondary'
          )}
        >
          <div className={cn('w-10 h-6 rounded', theme.preview)} />
          <span className="text-xs font-medium text-foreground">{theme.name}</span>
        </button>
      ))}
    </div>
  );
}
