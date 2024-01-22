'use client';
import Link from "next/link";
import { usePathname } from "next/navigation";
import { getRouteSegment } from "@/lib/RouteSegmentLib";
import { useUserPrefsContext } from "@/hooks/useUserPreferencesContext";
import styles from "./AdminNavbar.module.css";
const AdminNavbar = () => {
    const { userPrefsState, userPrefsDispatch } = useUserPrefsContext();
    const pathName: string = usePathname();
    // const [ windowScrollDown, setWindowScrollDown ] = useState<boolean>(false);
    const getNavbarClass = (): string => {
        return styles.navbarBaseClass + ` ${ userPrefsState.navbarFixed 
            ? styles.navbarFixed 
            : styles.navbarStatic
        }`;
    };
    // useEffect(() => {
    //     let lastScrollY: number;
    //     const handleScroll = () => {
    //         const currentScrollY: number = window.scrollY;
    //         if (currentScrollY > 40) {
    //             currentScrollY > lastScrollY
    //                 ? setWindowScrollDown(true)
    //                 : setWindowScrollDown(false);
    //         }
    //         lastScrollY = currentScrollY;
    //     };
    //     lastScrollY = window?.scrollY;
    //     window.addEventListener('scroll', handleScroll);
    //
    //     return () => {
    //         window.removeEventListener('scroll', handleScroll);
    //     };
    // }, []);

    return (
        <>
            <nav className={`${ getNavbarClass() } translate-y-5`}>
                <button
                    className="ml-3.5 w-11 h-11 flex items-center justify-center lg:hidden hover:bg-zinc-300 rounded-md">
                    <iconify-icon width={36} icon="ph:list-bold"></iconify-icon>
                </button>

                <div className={`${ userPrefsState.navbarFixed ? 'ml-4 mx-2' : 'ml-0 mx-0'} w-80 space-y-1 text-sm transition-all duration-200 ease-in-out`}>
                    <div className="flex flex-row items-center gap-x-1 text-sm font-semibold">
                        <h1 className="text-zinc-700 cursor-auto capitalize">
                            <iconify-icon
                                icon="mdi:home"
                                width={22}
                                style={{
                                    color: 'black'
                                }}
                            />
                        </h1>
                        <span className="flex items-center justify-center text-base -mt-0.5"> <iconify-icon icon="eva:arrow-right-outline" width={20}></iconify-icon> </span>
                        <Link
                            href={`/admin/${ getRouteSegment(pathName, 2) }`}
                            className="text-black cursor-pointer capitalize hover:underline hover:underline-offset-4 hover:decoration-2">
                            { getRouteSegment(pathName, 2) }
                        </Link>
                        {
                            getRouteSegment(pathName, 3)
                                ? (
                                    <>
                                        <span> / </span>
                                        <Link
                                            href={`/admin/${ getRouteSegment(pathName, 3) }`}
                                            className="text-black cursor-pointer capitalize font-medium hover:underline hover:underline-offset-4 hover:decoration-2 truncate">
                                            { getRouteSegment(pathName, 3) }
                                        </Link>
                                    </>
                                )
                                : <></>
                        }
                    </div>
                    <p className="font-bold text-base capitalize">
                        { getRouteSegment(pathName, 3) ?? getRouteSegment(pathName, 2) }
                    </p>
                </div>
                <div className="flex-1 flex flex-row-reverse items-start text-zinc-600">
                    <button
                        onClick={() => {
                            userPrefsDispatch({
                                type: 'TOGGLE_SETTINGS'
                            });
                        }}
                        className="w-10 h-10 hidden lg:flex items-center justify-center hover:text-black hover:bg-zinc-300 rounded-md mr-2">
                        <iconify-icon width={20} icon="mdi:cog"></iconify-icon>
                    </button>
                    <button className="w-10 h-10 flex items-center justify-center hover:text-black hover:bg-zinc-300 rounded-md mr-2">
                        <iconify-icon width={20} icon="mdi:bell"></iconify-icon>
                    </button>
                    <button className="w-10 h-10 md:hidden flex items-center justify-center hover:text-black hover:bg-zinc-300 rounded-md mr-2">
                        <iconify-icon width={20} icon="ph:list-bold"></iconify-icon>
                    </button>
                    <form className="rounded-md relative mr-2 hidden lg:block">
                        <input
                            id="admin-nav-search"
                            type="text"
                            className="peer border-2 border-gray-500 transition-colors duration-200 ease-in-out focus:border-black bg-transparent indent-1.5 py-1.5 outline-none rounded-md"
                        />
                        <label className="absolute left-3 text-sm peer-focus:text-xs block z-0 bg-transparent peer-focus:bg-white tracking-wide top-2 peer-focus:top-1.5 peer-focus:-translate-y-3.5 peer-focus:-translate-x-1 peer-focus:font-semibold peer-focus:text-black cursor-text transition-all duration-200 ease-in-out" htmlFor="admin-nav-search">
                            Search
                        </label>
                    </form>
                </div>
            </nav>

        </>
    );
};

export default AdminNavbar;