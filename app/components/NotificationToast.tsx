'use client';

import { useNotificationToastContext } from "@/hooks/useNotificationToastContext";
import { useEffect } from "react";

const NotificationToast = () => {
    const { notificationToast, setNotificationToast } = useNotificationToastContext();

    const getPositionClass = ():string => {
        switch (notificationToast.position) {
            case "top-right":
                return 'top-20 right-0';
            case "top-left":
                return 'top-20 left-0';
            case "bottom-right":
                return 'bottom-20 right-0';
            case "bottom-left":
                return 'bottom-20 left-0';
            default:
                return 'top-20 right-0';
        }
    };

    const getVisibilityClass = (): string => {
        switch (notificationToast.position) {
            case "top-right":
                return notificationToast.play
                    ? 'translate-x-0'
                    : 'translate-x-full';
            case "top-left":
                return notificationToast.play
                    ? '-translate-x-0'
                    : 'translate-x-full';
            case "bottom-right":
                return notificationToast.play
                    ? 'translate-x-full'
                    : 'translate-x-0';
            case "bottom-left":
                return notificationToast.play
                ? 'translate-x-full'
                : 'translate-x-0';
            default:
                return notificationToast.play
                    ? '-translate-x-0'
                    : 'translate-x-full';
        }
    };

    useEffect (() => {
        const notificationTimer = setTimeout(() => {
            if (notificationToast.play) {
                setNotificationToast((prevState) => ({
                    ...prevState,
                    play: false
                }));
            }
        }, 5000);


        return () => {
            clearTimeout(notificationTimer);
        };
    }, [ notificationToast.play, setNotificationToast ]);

    return (
        <div className={`fixed z-50 ${ getPositionClass() } ${ getVisibilityClass() } text-red-700 font-sans font-medium px-4 py-2 flex items-center justify-center gap-x-2 bg-red-100 border border-red-400 opacity-80 rounded transition-all duration-300 ease-in-out`} role="alert">
            <iconify-icon
                icon="line-md:alert"
                width={20}
            />
            <strong className="font-bold"> { notificationToast.slug }!! </strong>
            <span className=""> { notificationToast.message } </span>
            <button
                onClick={() => {
                    setNotificationToast((prevState) => ({
                        ...prevState,
                        play: false
                    }));
                }}
                className="flex items-center justify-center hover:scale-125 transition-all duration-200 ease-in-out"
            >
                <iconify-icon icon="line-md:close-circle" width={20}></iconify-icon>
            </button>
        </div>
    );
};

export default NotificationToast;
