'use client';
import { useContext } from "react";
import { UserPreferencesContext, UserPreferencesContextType } from "@/context/UserPreferencesProvider";
const useUserPreferencesContext = () => {
    const { userPreferencesState, userPreferencesDispatch  } = useContext(UserPreferencesContext) as UserPreferencesContextType;
    return {
        userPrefsState: userPreferencesState, userPrefsDispatch: userPreferencesDispatch
    };
};

export const useUserPrefsContext = useUserPreferencesContext;