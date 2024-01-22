import { AdminViewModeContextType } from "@/context/AdminViewModeProvider";
import { usePathname, useRouter } from "next/navigation";

type AdminContentHeadingPropsType = {
    adminViewMode: AdminViewModeContextType["adminViewMode"],
    setAdminViewMode: AdminViewModeContextType["setAdminViewMode"],
    tittle: string,
    webKey: string | null
}
const AdminContentHeading = ({ adminViewMode, setAdminViewMode, tittle, webKey }: AdminContentHeadingPropsType ) => {
    const router = useRouter();
    const path = usePathname();
    return (
        <>
            <section className="w-full h-14 flex items-center justify-end pr-7 gap-x-8">
                {
                    adminViewMode === 'TABLE'
                        ? (
                            <>
                                <h1 className="mr-auto text-xl md:text-2xl font-semibold antialiased animate-fade animate-duration-500 animate-ease-in-out animate-once transition-all duration-200 ease-in-out">
                                    List of { tittle }
                                </h1>
                                <button
                                    onClick={() => {
                                        router.push (`${path}/create?key=${webKey}`);
                                    }}
                                    className="w-28 sm:w-32 px-3 py-2 flex items-center justify-center gap-x-3 rounded-md ring-[0.5px] hover:bg-neutral-900 hover:text-white transition-colors duration-200 ring-zinc-400 shadow-md bg-white">
                                    <p className="text-xs sm:text-sm">Add New</p>
                                    <div className="flex items-center justify-center scale-90 sm:scale-100">
                                        <iconify-icon
                                            width={25}
                                            icon="line-md:plus"
                                        />

                                    </div>
                                </button>
                            </>
                        )
                        : <></>
                }
                <div className="w-auto p-1.5 flex items-center justify-evenly bg-zinc-300 rounded-md">
                    <button
                        onClick={() => setAdminViewMode ('CARD')}
                        disabled={adminViewMode === 'CARD'}
                        className={`w-11 h-8 flex items-center justify-center transition-all duration-300 ease-in-out ${adminViewMode === 'CARD' ? 'bg-zinc-700 text-white' : 'bg-transparent text-black hover:bg-zinc-400'}`}
                    >
                        <iconify-icon
                            icon="ph:cards"
                            width={25}
                        />
                    </button>
                    <button
                        onClick={() => setAdminViewMode ('TABLE')}
                        disabled={adminViewMode === 'TABLE'}
                        className={`w-11 h-8 flex items-center justify-center transition-all duration-300 ease-in-out ${adminViewMode === 'TABLE' ? 'bg-zinc-700 text-white ' : 'bg-transparent text-black hover:bg-zinc-400'}`}
                    >
                        <iconify-icon
                            icon="mdi:table"
                            width={25}
                        />
                    </button>
                </div>
            </section>
        </>
    );
};

export default AdminContentHeading;
