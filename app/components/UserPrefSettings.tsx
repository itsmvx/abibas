'use client';
import { useUserPrefsContext } from "@/hooks/useUserPreferencesContext";
import styles from "./UserPrefSettings.module.css";
import { ChangeEvent, JSX } from "react";
import { USER_PREFERENCES } from "@/lib/UserPreferencesVariable";

const UserPrefSettings = ({ mode }: { mode: 'Admin' | 'Default' }) => {
    const { userPrefsState, userPrefsDispatch } = useUserPrefsContext();

    const isNotCustomTheme = (): boolean => !(userPrefsState.theme === USER_PREFERENCES.THEME.CUSTOM);
    const getColorTogglerClass = (): string => {
        const scaleClass: string = userPrefsState.theme === USER_PREFERENCES.THEME.CUSTOM
            ? 'hover:scale-110 hover:ring-[0.5px] ring-black transition-scale ease-in-out duration-200'
            : '';
        return `w-6 h-6 flex items-center justify-center rounded-full ${ scaleClass }`;
    };
    const getThemeTogglerClass = (btnTheme: string): string => {
        const btnColor: string = userPrefsState.theme === btnTheme
            ? 'bg-neutral-900 text-white'
            : 'bg-white text-black';
        return styles.themeToggleBtn + ` ${ btnColor }`;
    };
    const AdminSideNavMenu = (): JSX.Element => {
        return (
            <>
                <section className={`${ isNotCustomTheme() ? 'opacity-60' : 'opacity-100' } w-full h-20 space-y-2 transition-opacity duration-200 ease-in-out`}>
                    <h1 className="font-semibold">
                        Side Navbar Main Color
                    </h1>
                    <div className="mx-1 grid grid-cols-10 gap-x-5">
                        <button
                            disabled={isNotCustomTheme()}
                            className={`${ getColorTogglerClass() } bg-white`}
                            onClick={() => {
                                userPrefsDispatch({
                                    type: 'TOGGLE_SIDENAV_MAIN_COLOR',
                                    payload: USER_PREFERENCES.COLOR.WHITE
                                });
                            }}
                        >
                            {
                                userPrefsState.sideNavMainColor === USER_PREFERENCES.COLOR.WHITE
                                    ? (
                                        <iconify-icon icon="mdi:check-bold"></iconify-icon>
                                    )
                                    : <></>
                            }
                        </button>
                        <button
                            disabled={isNotCustomTheme()}
                            className={`${ getColorTogglerClass() } bg-zinc-200`}
                            onClick={() => {
                                userPrefsDispatch({
                                    type: 'TOGGLE_SIDENAV_MAIN_COLOR',
                                    payload: USER_PREFERENCES.COLOR.ZINC
                                });
                            }}
                        >
                            {
                                userPrefsState.sideNavMainColor === USER_PREFERENCES.COLOR.ZINC
                                    ? (
                                        <iconify-icon icon="mdi:check-bold"></iconify-icon>
                                    )
                                    : <></>
                            }
                        </button>
                        <button
                            disabled={isNotCustomTheme()}
                            className={`${ getColorTogglerClass() } bg-neutral-900 text-white`}
                            onClick={() => {
                                userPrefsDispatch({
                                    type: 'TOGGLE_SIDENAV_MAIN_COLOR',
                                    payload: 'black'
                                });
                            }}
                        >
                            {
                                userPrefsState.sideNavMainColor === USER_PREFERENCES.COLOR.BLACK
                                    ? (
                                        <iconify-icon icon="mdi:check-bold"></iconify-icon>
                                    )
                                    : <></>
                            }
                        </button>
                        <button
                            disabled={isNotCustomTheme()}
                            className={`${ getColorTogglerClass() } bg-green-600`}
                            onClick={() => {
                                userPrefsDispatch({
                                    type: 'TOGGLE_SIDENAV_MAIN_COLOR',
                                    payload: 'green'
                                });
                            }}
                        >
                            {
                                userPrefsState.sideNavMainColor === USER_PREFERENCES.COLOR.GREEN
                                    ? (
                                        <iconify-icon icon="mdi:check-bold"></iconify-icon>
                                    )
                                    : <></>
                            }
                        </button>
                        <button
                            disabled={isNotCustomTheme()}
                            className={`${ getColorTogglerClass() } bg-orange-600`}
                            onClick={() => {
                                userPrefsDispatch({
                                    type: 'TOGGLE_SIDENAV_MAIN_COLOR',
                                    payload: USER_PREFERENCES.COLOR.ORANGE
                                });
                            }}
                        >
                            {
                                userPrefsState.sideNavMainColor === USER_PREFERENCES.COLOR.ORANGE
                                    ? (
                                        <iconify-icon icon="mdi:check-bold"></iconify-icon>
                                    )
                                    : <></>
                            }
                        </button>
                        <button
                            disabled={isNotCustomTheme()}
                            className={`${ getColorTogglerClass() } bg-red-600`}
                            onClick={() => {
                                userPrefsDispatch({
                                    type: 'TOGGLE_SIDENAV_MAIN_COLOR',
                                    payload: USER_PREFERENCES.COLOR.RED
                                });
                            }}
                        >
                            {
                                userPrefsState.sideNavMainColor === USER_PREFERENCES.COLOR.RED
                                    ? (
                                        <iconify-icon icon="mdi:check-bold"></iconify-icon>
                                    )
                                    : <></>
                            }
                        </button>
                        <button
                            disabled={isNotCustomTheme()}
                            className={`${ getColorTogglerClass() } bg-pink-600`}
                            onClick={() => {
                                userPrefsDispatch({
                                    type: 'TOGGLE_SIDENAV_MAIN_COLOR',
                                    payload: USER_PREFERENCES.COLOR.PINK
                                });
                            }}
                        >
                            {
                                userPrefsState.sideNavMainColor === USER_PREFERENCES.COLOR.PINK
                                    ? (
                                        <iconify-icon icon="mdi:check-bold"></iconify-icon>
                                    )
                                    : <></>
                            }
                        </button>
                        <button
                            disabled={isNotCustomTheme()}
                            className={`${ getColorTogglerClass() } bg-fuchsia-600`}
                            onClick={() => {
                                userPrefsDispatch({
                                    type: 'TOGGLE_SIDENAV_MAIN_COLOR',
                                    payload: USER_PREFERENCES.COLOR.FUCHSIA
                                });
                            }}
                        >
                            {
                                userPrefsState.sideNavMainColor === USER_PREFERENCES.COLOR.FUCHSIA
                                    ? (
                                        <iconify-icon icon="mdi:check-bold"></iconify-icon>
                                    )
                                    : <></>
                            }
                        </button>
                    </div>
                </section>

                <section className={`${ isNotCustomTheme() ? 'opacity-60' : 'opacity-100' } w-full h-20 space-y-2 transition-opacity duration-200 ease-in-out`}>
                    <h1 className="font-semibold">
                        Side Navbar Sub Color
                    </h1>
                    <div className="mx-1 grid grid-cols-10 gap-x-5">
                        <button
                            disabled={isNotCustomTheme()}
                            className={`${ getColorTogglerClass() } bg-white`}
                            onClick={() => {
                                userPrefsDispatch({
                                    type: 'TOGGLE_SIDENAV_SUB_COLOR',
                                    payload: USER_PREFERENCES.COLOR.WHITE
                                });
                            }}
                        >
                            {
                                userPrefsState.sideNavSubColor === USER_PREFERENCES.COLOR.WHITE
                                    ? (
                                        <iconify-icon icon="mdi:check-bold"></iconify-icon>
                                    )
                                    : <></>
                            }
                        </button>
                        <button
                            disabled={isNotCustomTheme()}
                            className={`${ getColorTogglerClass() } bg-zinc-200`}
                            onClick={() => {
                                userPrefsDispatch({
                                    type: 'TOGGLE_SIDENAV_SUB_COLOR',
                                    payload: USER_PREFERENCES.COLOR.ZINC
                                });
                            }}
                        >
                            {
                                userPrefsState.sideNavSubColor === USER_PREFERENCES.COLOR.ZINC
                                    ? (
                                        <iconify-icon icon="mdi:check-bold"></iconify-icon>
                                    )
                                    : <></>
                            }
                        </button>
                        <button
                            disabled={isNotCustomTheme()}
                            className={`${ getColorTogglerClass() } bg-neutral-900 text-white`}
                            onClick={() => {
                                userPrefsDispatch({
                                    type: 'TOGGLE_SIDENAV_SUB_COLOR',
                                    payload: 'black'
                                });
                            }}
                        >
                            {
                                userPrefsState.sideNavSubColor === USER_PREFERENCES.COLOR.BLACK
                                    ? (
                                        <iconify-icon icon="mdi:check-bold"></iconify-icon>
                                    )
                                    : <></>
                            }
                        </button>
                        <button
                            disabled={isNotCustomTheme()}
                            className={`${ getColorTogglerClass() } bg-green-600`}
                            onClick={() => {
                                userPrefsDispatch({
                                    type: 'TOGGLE_SIDENAV_SUB_COLOR',
                                    payload: 'green'
                                });
                            }}
                        >
                            {
                                userPrefsState.sideNavSubColor === USER_PREFERENCES.COLOR.GREEN
                                    ? (
                                        <iconify-icon icon="mdi:check-bold"></iconify-icon>
                                    )
                                    : <></>
                            }
                        </button>
                        <button
                            disabled={isNotCustomTheme()}
                            className={`${ getColorTogglerClass() } bg-orange-600`}
                            onClick={() => {
                                userPrefsDispatch({
                                    type: 'TOGGLE_SIDENAV_SUB_COLOR',
                                    payload: USER_PREFERENCES.COLOR.ORANGE
                                });
                            }}
                        >
                            {
                                userPrefsState.sideNavSubColor === USER_PREFERENCES.COLOR.ORANGE
                                    ? (
                                        <iconify-icon icon="mdi:check-bold"></iconify-icon>
                                    )
                                    : <></>
                            }
                        </button>
                        <button
                            disabled={isNotCustomTheme()}
                            className={`${ getColorTogglerClass() } bg-red-600`}
                            onClick={() => {
                                userPrefsDispatch({
                                    type: 'TOGGLE_SIDENAV_SUB_COLOR',
                                    payload: USER_PREFERENCES.COLOR.RED
                                });
                            }}
                        >
                            {
                                userPrefsState.sideNavSubColor === USER_PREFERENCES.COLOR.RED
                                    ? (
                                        <iconify-icon icon="mdi:check-bold"></iconify-icon>
                                    )
                                    : <></>
                            }
                        </button>
                        <button
                            disabled={isNotCustomTheme()}
                            className={`${ getColorTogglerClass() } bg-pink-600`}
                            onClick={() => {
                                userPrefsDispatch({
                                    type: 'TOGGLE_SIDENAV_SUB_COLOR',
                                    payload: USER_PREFERENCES.COLOR.PINK
                                });
                            }}
                        >
                            {
                                userPrefsState.sideNavSubColor === USER_PREFERENCES.COLOR.PINK
                                    ? (
                                        <iconify-icon icon="mdi:check-bold"></iconify-icon>
                                    )
                                    : <></>
                            }
                        </button>
                        <button
                            disabled={isNotCustomTheme()}
                            className={`${ getColorTogglerClass() } bg-fuchsia-600`}
                            onClick={() => {
                                userPrefsDispatch({
                                    type: 'TOGGLE_SIDENAV_SUB_COLOR',
                                    payload: USER_PREFERENCES.COLOR.FUCHSIA
                                });
                            }}
                        >
                            {
                                userPrefsState.sideNavSubColor === USER_PREFERENCES.COLOR.FUCHSIA
                                    ? (
                                        <iconify-icon icon="mdi:check-bold"></iconify-icon>
                                    )
                                    : <></>
                            }
                        </button>
                    </div>
                </section>

                <section>
                    <div className="relative space-y-2">
                        <label
                            htmlFor="input-nav-opacity"
                            className="font-semibold"
                        >
                            Side Navbar Opacity
                        </label>
                        <input
                            id="input-nav-opacity"
                            type="range"
                            className="appearance-none w-full h-1 accent-zinc-700 hover:accent-black cursor-pointer bg-neutral-900 transition-all duration-200 ease-linear rounded-xl"
                            min="0"
                            max="100"
                            step="20"
                            value={userPrefsState.sideNavOpacity}
                            onChange={(event: ChangeEvent<HTMLInputElement>) => {
                                userPrefsDispatch({
                                    type: 'TOGGLE_SIDENAV_OPACITY',
                                    payload: event.target.value.toString()
                                });
                            }}
                        />
                        <div className="absolute left-1 -right-1 -bottom-5 flex flex-row justify-between text-xs font-semibold">
                            <p>0</p>
                            <p className="ml-1">20</p>
                            <p>40</p>
                            <p>60</p>
                            <p>80</p>
                            <p>100</p>
                        </div>
                    </div>
                </section>

            </>
        );
    };
    return (
        <>
            <section className={`${ styles.mainClass } ${ userPrefsState.settingsOpen ? 'translate-x-0 ' : 'translate-x-96'} transition-all duration-200 ease-in-out overflow-y-auto`}>
                <aside className="mx-auto w-10/12 h-full flex flex-col gap-y-7">
                    <section className="w-full h-24 flex flex-row items-end">
                        <div className="basis-[85%] flex flex-col gap-y-1">
                            <h1 className="text-lg lg:text-xl font-semibold tracking-tighter">
                                { mode === 'Admin'
                                    ? 'Dashboard Configurator'
                                    : 'Custom Configurator'
                                }
                            </h1>
                            <p className="text-sm text-zinc-600">
                                You can setup preferences options available
                            </p>
                        </div>
                        <div className="flex-1 h-full flex items-center justify-center">
                            <button
                                onClick={() => {
                                    userPrefsDispatch({
                                       type: 'TOGGLE_SETTINGS'
                                    });
                                }}
                                className="flex items-center justify-center w-10 h-10 rounded-md hover:bg-zinc-300 transition-colors duration-200 ease-linear"
                            >
                                <iconify-icon
                                    icon="mdi:window-close"
                                    width={25}
                                />
                            </button>
                        </div>
                    </section>

                    <section className="space-y-3">
                        <div>
                            <h1 className="font-semibold">
                                Theme
                            </h1>
                            <p className="text-sm text-zinc-600">
                                Choose between 3 different theme
                            </p>
                        </div>
                        <div className="flex flex-row gap-x-2 text-sm font-semibold">
                            <button
                                onClick={() => {
                                    userPrefsDispatch({
                                        type: 'TOGGLE_THEME',
                                        payload: USER_PREFERENCES.THEME.DARK
                                    });
                                }}
                                className={getThemeTogglerClass(USER_PREFERENCES.THEME.DARK)}>
                                DARK
                            </button>
                            <button
                                onClick={() => {
                                    userPrefsDispatch({
                                        type: 'TOGGLE_THEME',
                                        payload: USER_PREFERENCES.THEME.CUSTOM
                                    });
                                }}
                                className={`${ getThemeTogglerClass(USER_PREFERENCES.THEME.CUSTOM) } flex-1 `}>
                                CUSTOM
                            </button>
                            <button
                                onClick={() => {
                                    userPrefsDispatch({
                                        type: 'TOGGLE_THEME',
                                        payload: USER_PREFERENCES.THEME.LIGHT
                                    });
                                }}
                                className={getThemeTogglerClass(USER_PREFERENCES.THEME.LIGHT)}>
                                LIGHT
                            </button>
                        </div>
                    </section>

                    {
                        mode === 'Admin'
                            ? <AdminSideNavMenu />
                            : <></>
                    }

                    <section className="border-y-[1.5px] flex flex-col justify-center border-zinc-500 h-28">
                        <div className="w-full h-full flex flex-row justify-between items-center">
                            <h1 className="font-semibold">
                                Navbar Fixed
                            </h1>
                            <div className="relative w-8 h-2 bg-zinc-400 rounded-xl">
                                <button
                                    onClick={() => {
                                        userPrefsDispatch({
                                            type: 'TOGGLE_NAVBAR_FIXED',
                                            payload: !userPrefsState.navbarFixed
                                        });
                                    }}
                                    className={`${ styles.navbarFixedBtn } ${ userPrefsState.navbarFixed ? 'translate-x-6' : 'translate-x-0' }`}>
                                </button>
                            </div>
                        </div>
                        <div className="w-full h-full flex flex-row justify-between items-center">
                            <h1 className="font-semibold">
                                Navbar Recall On Scroll
                            </h1>
                            <div className="relative w-8 h-2 bg-zinc-400 rounded-xl">
                                <button
                                    onClick={() => {
                                        userPrefsDispatch({
                                            type: 'TOGGLE_NAVBAR_RECALL',
                                            payload: !userPrefsState.navbarRecall
                                        });
                                    }}
                                    className={`${ styles.navbarFixedBtn } ${ userPrefsState.navbarRecall ? 'translate-x-6' : 'translate-x-0' }`}>
                                </button>
                            </div>
                        </div>
                    </section>
                </aside>
            </section>
        </>
    );
};

export default UserPrefSettings;