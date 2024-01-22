'use client';
import { createContext, Dispatch, ReactNode, SetStateAction, useState } from "react";

export  type NotificationToastContextType = {
    notificationToast: NotificationToastStateType
    setNotificationToast: Dispatch<SetStateAction<NotificationToastStateType>>
}
type NotificationToastStateType = {
    position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'
    slug?: string
    message: string
    play: boolean
}
export const NotificationToastContext = createContext<NotificationToastContextType | null>(null);
const NotificationToastProvider = ({ children }: { children: ReactNode }) => {
    const [ notificationToast, setNotificationToast ] = useState<NotificationToastStateType>({
        position: "top-right",
        slug: 'Whoops',
        message: '',
        play: false
    });
    return (
        <NotificationToastContext.Provider value={{
            notificationToast: notificationToast,
            setNotificationToast: setNotificationToast
        }}>
            { children }
        </NotificationToastContext.Provider>
    );
};

export default NotificationToastProvider;
