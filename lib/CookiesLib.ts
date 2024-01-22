import Cookies from "js-cookie";

type CookieNameType = {
    THEME: string,
    SIDENAV_MAIN_COLOR: string
    SIDENAV_SUB_COLOR: string,
    SIDENAV_OPACITY: string,
    NAVBAR_COLOR: string
    NAVBAR_FIXED: string,
    NAVBAR_RECALL: string,
    NAVBAR_OPACITY: string
}
export const COOKIES_NAME: CookieNameType = {
    THEME: 'UP_MYTHM',
    SIDENAV_MAIN_COLOR: 'UP_SNMCL',
    SIDENAV_SUB_COLOR: 'UP_SNSCL',
    SIDENAV_OPACITY: 'UP_SNVOP',
    NAVBAR_COLOR: 'UP_NVVCL',
    NAVBAR_FIXED: 'UP_NVFXE',
    NAVBAR_RECALL: 'UP_NVRCL',
    NAVBAR_OPACITY: 'UP_NVOPC'
};

export const getMyCookie = (cookieName: keyof CookieNameType | string, config?: { type: 'boolean' | string })
    : string | boolean | undefined => {
    const myCookie: string | undefined = Cookies.get(cookieName);
    return myCookie
        ? config?.type === 'boolean'
            ? !!Number(myCookie)
            : btoa(myCookie)
        : undefined;
};
