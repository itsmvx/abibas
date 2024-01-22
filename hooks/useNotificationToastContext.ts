import { useContext } from 'react';
import { NotificationToastContext, NotificationToastContextType } from "@/context/NotificationToastProvider";

export const useNotificationToastContext = () => {
    const { notificationToast, setNotificationToast } = useContext(NotificationToastContext) as NotificationToastContextType
    return {
        notificationToast,
        setNotificationToast
    };
};

