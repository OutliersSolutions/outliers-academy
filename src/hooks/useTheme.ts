// Simple theme hook for Next.js compatibility
import { useTheme as useNextTheme } from 'next-themes';

export const useThemeState = () => {
    const { theme, setTheme } = useNextTheme();
    
    const changeTheme = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark');
    };

    return { theme, changeTheme };
};