import { DarkThemeToDoList } from "./DarkThemeToDoList";
import { LightThemeToDoList } from "./LightThemeToDoList";
import { PrimaryThemeToDoList } from "./PrimaryThemeToDoList";

export const ThemeOption = [
    {
        id:1,
        name: 'Dark theme',
        theme: DarkThemeToDoList,
    },
    {
        id:2,
        name: 'Light theme',
        theme: LightThemeToDoList,
    },
    {
        id:3,
        name: 'Primary theme',
        theme: PrimaryThemeToDoList,
    }

]