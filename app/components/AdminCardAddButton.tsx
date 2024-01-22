'use client';
import { usePathname, useRouter } from "next/navigation";

const AdminCardAddButton = ({ webKey }: { webKey: { key: string | null, iv: string | null }}) => {
    const router = useRouter();
    const path: string = usePathname();


    return (
        <>
            <button
                onClick={() => {
                    router.push (`${path}/create?key=${webKey.key}`);
                }}
                className="absolute w-10 h-10 top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 hover:scale-[1.3] transition-all duration-200 ease-in-out">
                <iconify-icon
                    icon="line-md:plus"
                    width={40}
                />
            </button>
        </>
    );
};

export default AdminCardAddButton;
