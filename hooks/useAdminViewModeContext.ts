import { useContext } from "react";
import { AdminViewModeContext, AdminViewModeContextType } from "@/context/AdminViewModeProvider";

const useAdminViewModeContext = () => {
    const { adminViewMode, setAdminViewMode } = useContext(AdminViewModeContext) as AdminViewModeContextType;
    return {
        adminViewMode: adminViewMode,
        setAdminViewMode: setAdminViewMode
    };
};
export default useAdminViewModeContext;
