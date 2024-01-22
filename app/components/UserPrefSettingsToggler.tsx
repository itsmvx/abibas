'use client';
import { useUserPrefsContext } from "@/hooks/useUserPreferencesContext";

export const UserPrefSettingsToggler = () => {
    const { userPrefsState, userPrefsDispatch } = useUserPrefsContext();
    return (
        <>
            <button
                onClick={() => {
                    userPrefsDispatch({ type: 'TOGGLE_SETTINGS' });
                }}
                className={`${ userPrefsState.settingsOpen ? 'hidden' : 'fixed' } lg:hidden bottom-11 right-11 w-12 h-12 flex items-center justify-center rounded-full shadow-sm shadow-zinc-500 bg-zinc-200 hover:bg-zinc-400 transition-colors duration-200 ease-linear`}
            >
                <iconify-icon
                    icon="mdi:cog"
                    width={25}
                />
            </button>
        </>
    );
};