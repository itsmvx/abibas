'use client';
import { createContext, Dispatch, ReactNode, SetStateAction, useEffect, useState } from "react";

export type LoadingScreenContextType = {
    loadingScreen: {
        isVisible: boolean
        progress: number
    }
    setLoadingScreen: Dispatch<SetStateAction<{
        isVisible: boolean
        progress: number
    }>>
}
export const LoadingScreenContext = createContext<LoadingScreenContextType | null>(null);
const LoadingScreenProvider = ({ children } : { children: ReactNode }) => {
    const [ loadingScreen, setLoadingScreen ] = useState<{
        isVisible: boolean
        progress: number
    }>({
        isVisible: false,
        progress: 0
    });

    useEffect(() => {
        if (loadingScreen.isVisible) {
            document.body.classList.add('overflow-hidden');
        } else {
            setLoadingScreen((prevState) => ({
                ...prevState,
                progress: 0
            }));
            document.body.classList.remove('overflow-hidden');
        }
    }, [ loadingScreen.isVisible ]);

    return (
        <LoadingScreenContext.Provider value={{
            loadingScreen,
            setLoadingScreen
        }}>
            { children }
        </LoadingScreenContext.Provider>
    );
};

export default LoadingScreenProvider;
