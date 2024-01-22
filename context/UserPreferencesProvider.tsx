'use client';
import { createContext, Dispatch, ReactNode, useReducer } from "react";
import Cookies from "js-cookie";
import { COOKIES_NAME } from "@/lib/CookiesLib";
import { USER_PREFERENCES } from "@/lib/UserPreferencesVariable";

export const UserPreferencesContext = createContext<UserPreferencesContextType | null>(null);
export type UserPreferencesContextType = {
    userPreferencesState: UserPreferencesStateType,
    userPreferencesDispatch: Dispatch<UserPreferencesReducerType>
};
interface UserPreferencesStateType {
    settingsOpen: boolean,
    theme: string,
    sideNavMainColor: string,
    sideNavSubColor: string,
    sideNavOpacity: string,
    navbarFixed: boolean,
    navbarRecall: boolean,
    navbarColor: string,
    navbarOpacity: string
}
interface ActionToggleSettings {
    type: 'TOGGLE_SETTINGS'
}
interface ActionToggleTheme {
    type: 'TOGGLE_THEME',
    payload: string
}
interface ActionSideNavMainColor {
    type: 'TOGGLE_SIDENAV_MAIN_COLOR',
    payload: string
}
interface ActionSideNavSubColor {
    type: 'TOGGLE_SIDENAV_SUB_COLOR',
    payload: string
}
interface ActionSideNavOpacity {
    type: 'TOGGLE_SIDENAV_OPACITY',
    payload: string
}
interface ActionNavbarColor {
    type: 'TOGGLE_NAVBAR_COLOR',
    payload: string
}
interface ActionNavbarFixed {
    type: 'TOGGLE_NAVBAR_FIXED',
    payload: boolean
}
interface ActionNavbarRecall {
    type: 'TOGGLE_NAVBAR_RECALL',
    payload: boolean
}
interface ActionNavbarOpacity {
    type: 'TOGGLE_NAVBAR_OPACITY',
    payload: string
}
type UserPreferencesReducerType = ActionToggleTheme | ActionToggleSettings | ActionSideNavMainColor
    | ActionSideNavSubColor | ActionSideNavOpacity | ActionNavbarColor | ActionNavbarFixed
    | ActionNavbarRecall | ActionNavbarOpacity
const UserPreferencesProvider = ({ children }: { children: ReactNode }) => {
    const userPreferencesReducer = (state: UserPreferencesStateType, action: UserPreferencesReducerType) => {
        switch (action.type) {
            case 'TOGGLE_THEME':
                return {
                    ...state,
                    theme: action.payload
                };
            case 'TOGGLE_SETTINGS':
                return {
                    ...state,
                    settingsOpen: !state.settingsOpen
                };
            case 'TOGGLE_SIDENAV_MAIN_COLOR':
                Cookies.set(COOKIES_NAME.SIDENAV_MAIN_COLOR, btoa(action.payload), { expires: 365 });
                return {
                    ...state,
                    sideNavMainColor: action.payload
                };
            case 'TOGGLE_SIDENAV_SUB_COLOR':
                Cookies.set(COOKIES_NAME.SIDENAV_SUB_COLOR, btoa(action.payload), { expires: 365 });
                return {
                    ...state,
                    sideNavSubColor: action.payload
                };
            case "TOGGLE_SIDENAV_OPACITY":
                Cookies.set(COOKIES_NAME.SIDENAV_OPACITY, btoa(action.payload), { expires: 365 });
                return {
                    ...state,
                    sideNavOpacity: action.payload
                };
            case 'TOGGLE_NAVBAR_COLOR':
                return {
                    ...state,
                    navbarColor: action.payload
                };
            case 'TOGGLE_NAVBAR_FIXED':
                Cookies.set(COOKIES_NAME.NAVBAR_FIXED, action.payload ? `1` : `0`, { expires: 365 });
                return {
                    ...state,
                    navbarFixed: action.payload
                };
            case 'TOGGLE_NAVBAR_RECALL':
                Cookies.set(COOKIES_NAME.NAVBAR_RECALL, action.payload ? `1` : `0`, { expires: 365 });
                return {
                    ...state,
                    navbarRecall: action.payload
                };
            case 'TOGGLE_NAVBAR_OPACITY':
                return {
                    ...state,
                    navbarOpacity: action.payload
                };
            default:
                return state;
        }
    };
    const getThemeValue = (): string => {
        const themeValue: string | undefined = Cookies.get(COOKIES_NAME.THEME);
        if (themeValue) {
            return atob(themeValue);
        }
        Cookies.set(COOKIES_NAME.THEME, btoa(USER_PREFERENCES.THEME.LIGHT), { expires: 365 });
        return USER_PREFERENCES.THEME.LIGHT;
    };
    const getSideNavMainColorValue = (): string => {
        const sideNavSubColorValue: string | undefined = Cookies.get(COOKIES_NAME.SIDENAV_MAIN_COLOR);
        if (sideNavSubColorValue) {
            return atob(sideNavSubColorValue);
        }
        Cookies.set(COOKIES_NAME.SIDENAV_MAIN_COLOR, btoa(USER_PREFERENCES.COLOR.BLACK), { expires: 365 });
        return USER_PREFERENCES.COLOR.BLACK;
    };
    const getSideNavSubColorValue = (): string => {
        const sideNavSubColorValue: string | undefined = Cookies.get(COOKIES_NAME.SIDENAV_SUB_COLOR);
        if (sideNavSubColorValue) {
            return atob(sideNavSubColorValue);
        }
        Cookies.set(COOKIES_NAME.SIDENAV_SUB_COLOR, btoa(USER_PREFERENCES.COLOR.WHITE), { expires: 365 });
        return USER_PREFERENCES.COLOR.WHITE;
    };
    const getSideNavOpacityValue = (): string => {
        const sideNavOpacityValue: string | undefined = Cookies.get(COOKIES_NAME.SIDENAV_OPACITY);
        if (sideNavOpacityValue) {
            return atob(sideNavOpacityValue);
        }
        Cookies.set(COOKIES_NAME.SIDENAV_OPACITY, btoa('100'), { expires: 365 });
        return '100';
    };
    const getNavbarColorValue = (): string => {
        const navbarColorValue: string | undefined = Cookies.get(COOKIES_NAME.NAVBAR_COLOR);
        if (navbarColorValue) {
            return atob(navbarColorValue);
        }
        Cookies.set(COOKIES_NAME.NAVBAR_COLOR, btoa(USER_PREFERENCES.COLOR.WHITE), { expires: 365 });
        return USER_PREFERENCES.COLOR.WHITE;
    };
    const getNavbarFixedValue = (): boolean => {
        const navbarFixedValue: string | undefined = Cookies.get(COOKIES_NAME.NAVBAR_FIXED);
        if (navbarFixedValue) {
            return !!Number(navbarFixedValue);
        }
        Cookies.set(COOKIES_NAME.NAVBAR_FIXED, `1`, { expires: 365 });
        return true;
    };
    const getNavbarRecallValue = (): boolean => {
        const navbarRecallValue: string | undefined = Cookies.get(COOKIES_NAME.NAVBAR_RECALL);
        if (navbarRecallValue) {
            return !!Number(navbarRecallValue);
        }
        Cookies.set(COOKIES_NAME.NAVBAR_RECALL, `1`, { expires: 365 });
        return true;
    };
    const getNavbarOpacityValue = (): string => {
        const navbarOpacityValue: string | undefined = Cookies.get(COOKIES_NAME.NAVBAR_OPACITY);
        if (navbarOpacityValue) {
            return atob(navbarOpacityValue);
        }
        Cookies.set(COOKIES_NAME.NAVBAR_OPACITY, btoa(USER_PREFERENCES.OPACITY["100"]), { expires: 365 });
        return USER_PREFERENCES.OPACITY["100"];
    };

    const [ userPreferencesState, userPreferencesDispatch ] = useReducer(userPreferencesReducer, {
        theme: getThemeValue(),
        settingsOpen: false,
        sideNavMainColor: getSideNavMainColorValue(),
        sideNavSubColor: getSideNavSubColorValue(),
        sideNavOpacity: getSideNavOpacityValue(),
        navbarColor: getNavbarColorValue(),
        navbarFixed: getNavbarFixedValue(),
        navbarRecall: getNavbarRecallValue(),
        navbarOpacity: getNavbarOpacityValue()
    });

    return (
        <>
            <UserPreferencesContext.Provider value={{
                userPreferencesState,
                userPreferencesDispatch
            }}>
                { children }
            </UserPreferencesContext.Provider>
        </>
    );
};
export default UserPreferencesProvider;
