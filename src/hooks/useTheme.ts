// useThemeState.ts
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@/store/store';
import { toggleTheme } from '@/store/ui/ui.slice';

export const useThemeState = () => {
    const theme = useSelector((state: RootState) => state.ui.theme);
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
        localStorage.setItem('theme', theme);
    }, [theme]);

    const changeTheme = () => dispatch(toggleTheme());

    return { theme, changeTheme };
};