'use client';
import { usePathname, useRouter } from "next/navigation";

const AdminTableAddButton = ({ iconProps, webKey }: { iconProps?: string, webKey: { key: string | null, iv: string | null }}) => {
    const router = useRouter();
    const path: string = usePathname();

    return (
        <>
            <button
                onClick={() => {
                    router.push(`${ path }/create?key=${ webKey.key }`);
                }}
                className="w-32 px-3 py-2 flex items-center justify-center gap-x-3 rounded-md ring-[0.5px] hover:bg-neutral-900 hover:text-white transition-colors duration-200 ring-zinc-400 shadow-md bg-white">
                <p className="text-sm">Add New</p>
                <iconify-icon width={30} icon={iconProps ?? `line-md:plus`}></iconify-icon>
            </button>
        </>
    );
};

export default AdminTableAddButton;
