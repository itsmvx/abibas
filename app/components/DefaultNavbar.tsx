import Image from "next/image";
import { AbibasLogo } from "@/lib/StaticImagesLib";
import Link from "next/link";

const DefaultNavbar = () => {
    return (
        <>
            <nav className="fixed top-0 w-full h-16 flex flex-row justify-between">
                <section className="basis-1/2 relative">
                    <Image
                        src={AbibasLogo}
                        alt="abibas-logo"
                        width={60}
                        className="absolute top-1/2 -translate-y-1/2 left-1/4 overflow-hidden"
                    />
                </section>
                <section className="basis-1/2 flex flex-row items-center justify-evenly text-base font-semibold tracking-wide">
                    <Link
                        href={`/`}
                    >
                        MEN
                    </Link>
                    <Link
                        href={`/`}
                    >
                        WOMEN
                    </Link>
                    <Link
                        href={`/`}
                    >
                        KID
                    </Link>
                    <div className="w-16 h-24 bg-neutral-900 -skew-y-12 rounded-sm flex flex-col items-center justify-center gap-y-2">
                        <h1 className="text-white font-semibold text-xs skew-y-12 brightness-90">
                            Abibas
                        </h1>
                        <Image
                            src={AbibasLogo}
                            alt="abibas-logo"
                            width={30}
                            quality={100}
                            className="invert skew-y-12 contrast-200"
                        />
                    </div>
                    <button className="w-9 h-9 flex items-center justify-center hover:scale-110 transition-scale duration-200 ease-in-out">
                        <iconify-icon
                            icon="mdi:magnify"
                            width={30}
                        />
                    </button>
                    <button className="w-9 h-9 flex items-center justify-center hover:scale-110 transition-scale duration-200 ease-in-out">
                        <iconify-icon
                            icon="mdi:account-outline"
                            width={30}
                        />
                    </button>
                    <button className="w-9 h-9 flex items-center justify-center hover:scale-110 transition-scale duration-200 ease-in-out">
                        <iconify-icon
                            icon="mdi:cog"
                            width={25}
                        />
                    </button>
                </section>
            </nav>
        </>
    );
};

export default DefaultNavbar;
