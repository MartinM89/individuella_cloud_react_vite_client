import { useEffect, useState } from 'react';
import './ThemeSelect.css';

export type Theme = 'system' | 'light' | 'dark';

export default function ThemeSelect() {
  const [theme, setTheme] = useState<Theme>((localStorage.getItem('theme') as Theme) || 'system');

  useEffect(() => {
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <div className='theme-select'>
      <label htmlFor='theme select'>Theme:</label>
      <select
        id='theme select'
        value={theme}
        onChange={e => setTheme(e.target.value as Theme)}
      >
        <option
          id='theme-system'
          value={'system'}
        >
          System
        </option>
        <option
          id='theme-light'
          value={'light'}
        >
          Light
        </option>
        <option
          id='theme-dark'
          value={'dark'}
        >
          Dark
        </option>
      </select>
    </div>
  );
}
