'use client';
import Link from "next/link";
import { ChangeEvent, useState } from "react";
import { signInAction } from "@/app/(account)/AccountServerActions";


export const SignInComponents = () => {
    const formInitialState: {
        username: string
        password: string
        passwordView: boolean
        email: string
        mode: 'email' | 'username'
        actionStatus: boolean | null
        onSubmit: boolean
    } = {
        username: '',
        password: '',
        passwordView: false,
        email: '',
        mode: 'username',
        actionStatus: null,
        onSubmit: false
    };
    const [ formState, setFormState ] = useState<{
        username: string
        password: string
        passwordView: boolean
        email: string
        mode: 'email' | 'username'
        actionStatus: boolean | null
        onSubmit: boolean
    }>(formInitialState);
    const emailInputRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const handleFormSubmit = async (event: ChangeEvent<HTMLFormElement>) => {
        event.preventDefault();
        const { email, username, password, mode } = formState;
        const auth = mode === 'email'
            ? await signInAction(email, username, 'email')
            : await signInAction(username, password, 'username');

        console.log(auth);
    };
    return (
        <>
            <div className="mt-16 md:mt-10 flex flex-col justify-between w-full">
                <div className="mx-auto flex flex-col items-center gap-y-7 w-full md:w-2/5 ">
                    <section className="space-y-0.5">
                        <h1 className="font-garamond font-medium text-4xl text-center subpixel-antialiased">
                            {`Hello, Let's Sign In`}
                        </h1>
                        <p className="text-xs text-center">
                            Please Sign in or Register
                        </p>
                    </section>
                    <form className="w-80 flex flex-col gap-y-3" onSubmit={handleFormSubmit}>
                        <label
                            htmlFor="username-email-input"
                            className="text-xs font-sans font-medium">Username or Email
                        </label>
                        <div className="relative w-full h-full py-1.5 border-[1px] border-zinc-600/50 rounded-[0.4rem] shadow-sm shadow-zinc-400/80 flex items-center justify-end gap-x-2">
                            <input
                                id="username-email-input"
                                className="w-full ml-7 text-sm indent-2 outline-none"
                                type="text"
                                name="username"
                                onChange={(event: ChangeEvent<HTMLInputElement>) => {
                                    setFormState((prevState) => ({
                                        ...prevState,
                                        username: event.target.value,
                                        mode: event.target.value.match(emailInputRegex) ? 'email' : 'username'
                                    }));
                                }}
                            />
                            <span className="absolute top-1 left-1">
                                 <iconify-icon
                                     width={25}
                                     icon={
                                        formState.mode === 'username'
                                            ? 'mdi:card-account-details-outline'
                                            : 'mdi:at'
                                     }
                                 />
                            </span>
                        </div>
                        <label
                            htmlFor="password-input"
                            className="text-xs font-sans font-medium">Password
                        </label>
                        <input
                            id="password-input"
                            type="password"
                            className="py-1.5 text-sm indent-2 outline-none border-[1px] border-zinc-600/50 rounded-[0.4rem] shadow-sm shadow-zinc-400/80"
                            onChange={(event: ChangeEvent<HTMLInputElement>) => {
                                setFormState((prevState) => ({
                                    ...prevState,
                                    password: event.target.value
                                }));
                            } }
                        />
                        <button
                            type="button"
                            className="text-right text-xs font-semibold text-zinc-800"
                        >
                            Forgot your password?
                        </button>
                        <button
                            type="submit"
                            className="mt-5 w-full py-2 text-sm text-white bg-black rounded-md">
                            SIGN IN
                        </button>
                    </form>
                    <section className="w-80 flex flex-col gap-y-6">
                        <p className="text-center text-xs font-semibold">
                            Or continue with
                        </p>
                        <div className="w-full flex flex-row gap-x-2 justify-between items-center">
                            <Link
                                href="/"
                                className="w-36 flex items-center justify-start gap-x-1 text-white bg-[#0057e7] rounded-sm"
                            >
                                <div className="m-[0.2rem] flex items-center justify-center w-9 h-9 bg-white">
                                    <iconify-icon
                                        icon="devicon:google"
                                        width={25}
                                    />
                                </div>
                                <p className="text-base font-sans font-medium">Google</p>
                            </Link>
                            <Link
                                href="/"
                                className="w-36 flex items-center justify-start gap-x-1 text-white bg-gray-800 rounded-sm"
                            >
                                <div className="m-[0.2rem] flex items-center justify-center w-9 h-9">
                                    <iconify-icon
                                        icon="ion:logo-discord"
                                        width={25}
                                    />
                                </div>
                                <p className="text-base font-sans font-medium">Discord</p>
                            </Link>
                        </div>
                        <Link
                            href="/"
                            className="mx-auto flex flex-row items-center underline-hover"
                        >
                            <p className="uppercase text-sm tracking-wider font-medium">
                                CREATE AN ACCOUNT
                            </p>
                            <iconify-icon
                                icon="material-symbols-light:chevron-right"
                                width={25}
                                className="-ml-1"
                            />
                        </Link>
                    </section>
                </div>
            </div>
        </>
    );
};
