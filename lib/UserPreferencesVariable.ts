// type UserPreferencesVariable = {
//     COLOR: {
//         WHITE: 'white',
//         ZINC: 'zinc',
//         BLACK: 'black',
//         GREEN: 'green',
//         ORANGE: 'orange',
//         RED: 'red',
//         PINK: 'pink',
//         FUCHSIA: 'fuchsia'
//     },
//     THEME: {
//         [ key: string]: UserPreferencesValuesType["THEME"]
//     },
//     OPACITY: {
//         [ key: string]: UserPreferencesValuesType["OPACITY"]
//     }
// }
export type UserPreferencesValuesType = {
    COLOR: 'white' | 'zinc' | 'black' | 'green' | 'orange' | 'red' | 'pink' | 'fuchsia',
    OPACITY: '100' | '80' | '60' | '40' | '20' | '0'
    THEME: 'system' | 'light' | 'dark' | 'custom',
    NAVBAR_FIXED: true | false,
    NAVBAR_RECALL: true | false,
};
const USER_PREFERENCES_VARIABLE = {
    COLOR: {
        WHITE: 'white',
        ZINC: 'zinc',
        BLACK: 'black',
        GREEN: 'green',
        ORANGE: 'orange',
        RED: 'red',
        PINK: 'pink',
        FUCHSIA: 'fuchsia',
        DARK: 'black'
    },
    THEME: {
        LIGHT: 'light',
        DARK: 'dark',
        CUSTOM: 'custom'
    },
    OPACITY: {
        100: '100',
        80: '80',
        60: '60',
        40: '40',
        20: '20',
        0: '0'
    },
    UTILS: {
        CHECK_THEME: (theme: string, opacity: string) => checkTheme(theme, opacity)
    }
};

const lightColorList: string[] = [
    USER_PREFERENCES_VARIABLE.COLOR.ZINC,
    USER_PREFERENCES_VARIABLE.COLOR.WHITE
];
const lightOpacityList: string[] = Object.keys(USER_PREFERENCES_VARIABLE.OPACITY).filter((opacity: string) => {
    return opacity !== '100' && opacity !== '80';
});
export type CheckThemeType = 'LIGHT' | 'DARK' | null;
const checkTheme = (theme: string, opacity: string): CheckThemeType => {
    if (theme.toUpperCase() in USER_PREFERENCES.COLOR) {
        if (lightColorList.includes(theme) && lightOpacityList.includes(opacity)) {
            return 'LIGHT';
        }
        return 'DARK';
    }
    return null;
};

export const USER_PREFERENCES = USER_PREFERENCES_VARIABLE;