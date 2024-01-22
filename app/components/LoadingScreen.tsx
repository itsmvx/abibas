'use client';
import { useLoadingScreenContext } from "@/hooks/useLoadingScreenContext";

export const LoadingScreen = () => {
    const { loadingScreen } = useLoadingScreenContext();
    return (
        <section className={`${ loadingScreen.isVisible ? 'fixed z-50 bg-white/70' : 'hidden bg-transparent' }  top-0 bottom-0 left-0 right-0 block w-screen h-screen transition-all duration-300 ease-in-out`}>
            <div className="w-full h-full flex flex-col items-center justify-center">

            </div>
        </section>
    );
};
