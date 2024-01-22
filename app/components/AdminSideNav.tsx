'use client';
import { AbibasLogo } from "@/lib/StaticImagesLib";
import Image from "next/image";
import { useUserPrefsContext } from "@/hooks/useUserPreferencesContext";
import useUserPreferencesVariable from "@/hooks/useUserPreferencesVariable";
import styles from './AdminSideNav.module.css';
import { usePathname } from "next/navigation";
import { checkRouteSegment } from "@/lib/RouteSegmentLib";
import Link from "next/link";
import { CheckThemeType, USER_PREFERENCES } from "@/lib/UserPreferencesVariable";

const AdminSideNav = () => {
    const { userPrefsState } = useUserPrefsContext();

    const { bgColor, bgOpacity } = useUserPreferencesVariable();
    const pathName: string = usePathname();


    const getSideNavMainClass = (): string => {
        const sideNavColor: string = userPrefsState.theme === USER_PREFERENCES.THEME.CUSTOM
            ? bgColor[userPrefsState.sideNavMainColor]
            : userPrefsState.theme === USER_PREFERENCES.THEME.LIGHT
                ? bgColor[USER_PREFERENCES.COLOR.WHITE]
                : bgColor[USER_PREFERENCES.COLOR.BLACK];
        return styles.sideNavMain + ` ${ sideNavColor } ${ bgOpacity[userPrefsState.sideNavOpacity] }`;
    };
    const getSideNavLogoClass = (): string => {
        const themeSchema: CheckThemeType = USER_PREFERENCES.UTILS.CHECK_THEME(userPrefsState.theme, userPrefsState.navbarOpacity);
        const logoStyle: "invert-0" | "invert" = userPrefsState.theme === USER_PREFERENCES.THEME.CUSTOM
            ? themeSchema === 'LIGHT'
                ? 'invert-0'
                : 'invert'
            : userPrefsState.theme === USER_PREFERENCES.THEME.LIGHT
                ? 'invert-0'
                : 'invert';
        return styles.sideNavLogo + ` ${ logoStyle }`;
    };
    const getSideNavHeadingClass = (): string => {
        const themeSchema: CheckThemeType = USER_PREFERENCES.UTILS.CHECK_THEME(userPrefsState.theme, userPrefsState.navbarOpacity);
        const headingStyle = userPrefsState.theme === USER_PREFERENCES.THEME.CUSTOM
            ? themeSchema === 'LIGHT'
                ? 'text-black'
                : 'text-zinc-200'
            : userPrefsState.theme === USER_PREFERENCES.THEME.LIGHT
                ? 'text-black'
                : 'text-zinc-200';
        return styles.sideNavHeading + ` ${ headingStyle }`;
    };
    const getSideNavLinkBtnClass = (btnPath: string): string => {
        const linkBtnStyle: string = checkRouteSegment(pathName, 2, btnPath)
            ? userPrefsState.theme === USER_PREFERENCES.THEME.CUSTOM
                ? bgColor[userPrefsState.sideNavSubColor]
                : userPrefsState.theme === USER_PREFERENCES.THEME.LIGHT
                    ? 'bg-neutral-900 text-white'
                    : userPrefsState.theme === USER_PREFERENCES.THEME.DARK
                        ? 'bg-white text-black'
                        : bgColor[USER_PREFERENCES.COLOR.BLACK]
            : styles.sideNavLinkBtnInactive ;

        return styles.sideNavLinkBtnMain + ` ${ linkBtnStyle }`;
    };
    const getSideNavLogoutBtnClass = (): string => {
        const btnColor = userPrefsState.theme === USER_PREFERENCES.THEME.CUSTOM
            ? bgColor[userPrefsState.sideNavSubColor]
            : userPrefsState.theme === USER_PREFERENCES.THEME.LIGHT
                ? 'bg-neutral-900 text-white'
                : userPrefsState.theme === USER_PREFERENCES.THEME.DARK
                    ? 'bg-zinc-50 text-black'
                    : 'bg-neutral-900 text-white';

        return `${ styles.sideNavLogoutBtn } ${ btnColor }`;
    };
    return (
        <>
            <section className="fixed top-0 lg:top-5 left-0 lg:left-5 bottom-0 lg:bottom-5 w-72 -translate-x-80 lg:translate-x-0 rounded-xl subpixel-antialiased transition-all duration-200 ease-in-out shadow-md ring-1 ring-zinc-300 select-none overflow-hidden">
                <aside className={`${ getSideNavMainClass() } ${ userPrefsState.sideNavOpacity ? bgOpacity[userPrefsState.sideNavOpacity] : 'bg-opacity-60'}`}>
                    <div className={`h-20 flex items-center justify-center`}>
                        <Image
                            src={AbibasLogo}
                            alt="abibas-logo"
                            quality={100}
                            className={getSideNavLogoClass()}
                        />
                        <h1 className={getSideNavHeadingClass()}>
                            ABIBAS
                        </h1>
                    </div>

                    <div className="w-full space-y-4 tracking-wider">
                        <Link
                            href={`/admin/dashboard`}
                            className={getSideNavLinkBtnClass('dashboard')}
                        >
                            <div className="mt-1 ml-2 basis-1/5 ">
                                <iconify-icon width={24} icon="mdi:home"></iconify-icon>
                            </div>
                            <p >Dashboard</p>
                        </Link>
                        <Link
                            href={`/admin/audiences`}
                            className={getSideNavLinkBtnClass('audiences')}
                        >
                            <div className="mt-1 ml-2 basis-1/5 ">
                                <iconify-icon width={24} icon="mdi:account-group-outline"></iconify-icon>
                            </div>
                            <p >Audiences</p>
                        </Link>
                        <Link
                            href={`/admin/categories`}
                            className={getSideNavLinkBtnClass('categories')}
                        >
                            <div className="mt-1 ml-2 basis-1/5 ">
                                <iconify-icon width={24} icon="mdi:folder-multiple-outline"></iconify-icon>
                            </div>
                            <p >Categories</p>
                        </Link>
                        <Link
                            href={`/admin/genres`}
                            className={getSideNavLinkBtnClass('genres')}
                        >
                            <div className="mt-1 ml-2 basis-1/5 ">
                                <iconify-icon width={24} icon="mdi:folder-star-multiple-outline"></iconify-icon>
                            </div>
                            <p >Genres</p>
                        </Link>
                        <Link
                            href={`/admin/series`}
                            className={getSideNavLinkBtnClass('series')}
                        >
                            <div className="mt-1 ml-2 basis-1/5 ">
                                <iconify-icon width={24} icon="mdi:cards"></iconify-icon>
                            </div>
                            <p >Series</p>
                        </Link>
                        <Link
                            href={`/admin/products`}
                            className={getSideNavLinkBtnClass('products')}
                        >
                            <div className="mt-1 ml-2 basis-1/5 ">
                                <iconify-icon width={24} icon="mdi:shopping-outline"></iconify-icon>
                            </div>
                            <p >Products</p>
                        </Link>

                        <Link
                            href={`/admin/events`}
                            className={getSideNavLinkBtnClass('events')}
                        >
                            <div className="mt-1 ml-2 basis-1/5 ">
                                <iconify-icon width={24} icon="mdi:calendar-month-outline"></iconify-icon>
                            </div>
                            <p >Events</p>
                        </Link>
                        <div className={getSideNavLogoutBtnClass()}>
                            <div className="w-10 h-10 flex flex-row items-center justify-center">
                                <iconify-icon width={30} icon="mdi:account-circle"></iconify-icon>
                            </div>
                            <p className="flex-1 overflow-ellipsis truncate">
                                ....
                            </p>
                            <div className="peer order-last w-10 ">
                                <button className="w-full mx-auto flex items-center justify-center">
                                    <iconify-icon width={26} icon="mdi:logout-variant"></iconify-icon>
                                </button>
                            </div>
                            <span className={`peer-hover:opacity-100 transition-opacity px-2 py-1 text-sm rounded-md absolute -right-2.5 -translate-y-[150%] opacity-0 ${ bgColor[userPrefsState.sideNavSubColor] }`}>
                                Logout
                        </span>
                        </div>
                    </div>
                </aside>
            </section>
        </>
    );
};

export default AdminSideNav;