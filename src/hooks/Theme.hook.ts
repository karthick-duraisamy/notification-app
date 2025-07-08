import { useEffect, useState } from 'react';

// remeber the previous theme while app reloads
const useTheming = () => {
  const [theme, setTheme] = useState('light');
  //in applifecycle, store the previous selected theme is browser storage
  // in app init, set that theme or init new one
  useEffect(() => {
    const existingTheme = localStorage.getItem('theme');
    const theme = existingTheme ? existingTheme : 'light';
    changeTheme(theme);
  }, []);

  const changeTheme = (theme: string) => {
    if (document && document.body.classList) {
      const body = document.body;
      const themes = ['dark', 'light', 'contrast-bw', 'contrast-by', 'contrast-yb', 'XY', 'Indigo', 'QR'];
      themes.map((value) => {
        if (body.classList.contains(value)) body.classList.remove(value);
        return true;
      });
      body.classList.add(theme);
      localStorage.setItem('theme', theme);
      setTheme(theme);
    }
    return true;
  };
  return { theme, changeTheme };
};

export { useTheming };
