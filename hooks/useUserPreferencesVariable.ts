// type UserPrefsVariableType =

const useUserPreferencesVariable = () => {
    const bgColor: { [index: string]: string }  = {
        white: 'bg-white text-black',
        zinc: 'bg-zinc-200 text-black',
        black: 'bg-neutral-900 text-white',
        green: 'bg-green-600 text-white',
        orange: 'bg-orange-600 text-white',
        red: 'bg-red-600 text-white',
        pink: 'bg-pink-600 text-white',
        fuchsia: 'bg-fuchsia-600 text-white',
        transparent: 'bg-transparent',
        dark: 'bg-neutral-900 text-white',
    };
    const bgOpacity: { [ index: string ]: string } = {
        0: 'bg-opacity-0',
        20: 'bg-opacity-20',
        40: 'bg-opacity-40',
        60: 'bg-opacity-60',
        80: 'bg-opacity-80',
        100: 'bg-opacity-100',
    };

    return {
        bgColor: bgColor,
        bgOpacity: bgOpacity
    };
};

export default useUserPreferencesVariable;

