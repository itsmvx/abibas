import { useContext } from "react";
import { LoadingScreenContext, LoadingScreenContextType } from "@/context/LoadingScreenProvider";

export const useLoadingScreenContext = () => {
    const { loadingScreen, setLoadingScreen  } = useContext(LoadingScreenContext) as LoadingScreenContextType;
    return {
        loadingScreen,
        setLoadingScreen
    };
};
