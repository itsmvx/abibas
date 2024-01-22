'use client';
import Link from "next/link";
import { ChangeEvent, useState } from "react";
import { signUpAction } from "@/app/(account)/AccountServerActions";
import { signOut } from "next-auth/react";


export const SignUpComponents = ({ rolesData }: { rolesData: RolesModelType[]}) => {
    signOut();
    const formInitialState: {
        fullname: {
            value: string
            isValid: boolean | null
            isVerified: boolean | null
            isVerifying: boolean
        }
        username: {
            value: string
            isValid: boolean | null
            isVerified: boolean | null
            isVerifying: boolean
        }
        password: string
        passwordView: boolean
        email: {
            value: string
            isValid: boolean | null
            isValidating: boolean
        }
        roleIndex: number
        roleOpen: boolean
        actionStatus: boolean | null
        onSubmit: boolean
    } = {
        fullname: {
            value: '',
            isValid: null,
            isVerified: null,
            isVerifying: false
        },
        username: {
            value: '',
            isValid: null,
            isVerified: null,
            isVerifying: false
        },
        email: {
            value: '',
            isValid: null,
            isValidating: false
        },
        password: '',
        passwordView: false,
        roleIndex: 0,
        roleOpen: false,
        actionStatus: null,
        onSubmit: false
    };
    const [ formState, setFormState ] = useState<{
        fullname: {
            value: string
            isValid: boolean | null
            isVerified: boolean | null
            isVerifying: boolean
        }
        username: {
            value: string
            isValid: boolean | null
            isVerified: boolean | null
            isVerifying: boolean
        }
        password: string
        passwordView: boolean
        email: {
            value: string
            isValid: boolean | null
            isValidating: boolean
        }
        roleIndex: number
        roleOpen: boolean
        actionStatus: boolean | null
        onSubmit: boolean
    }>(formInitialState);
    const emailInputRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const usernameInputRegex: RegExp = /^[a-zA-Z0-9\s!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]*$/;


    const handleFormSubmit = async (event: ChangeEvent<HTMLFormElement>) => {
        event.preventDefault();
        const { fullname, username, password, email, roleIndex } = formState;
        const signUpForm = new FormData();
        signUpForm.append('fullname', fullname.value);
        signUpForm.append('username', username.value);
        signUpForm.append('password', password);
        signUpForm.append('role', rolesData[roleIndex].id);
        signUpForm.append('email', email.value);
        const signUp = await signUpAction(signUpForm);

        console.log(signUp);
    };


    return (
        <>
            <div className="mt-16 md:mt-10 flex flex-col justify-between w-full">
                <div className="mx-auto flex flex-col items-center gap-y-7 w-full md:w-2/5 ">
                    <section className="space-y-0.5">
                        <h1 className="font-garamond font-medium text-4xl text-center subpixel-antialiased">
                            {`Ya Hallo, Let's Sign Up!`}
                        </h1>
                        <p className="text-xs text-center">
                            hayaku umete kudasai
                        </p>
                    </section>
                    <form className="w-80 flex flex-col gap-y-3" onSubmit={handleFormSubmit}>
                        <label
                            htmlFor="fullname-input"
                            className="text-xs font-sans font-medium">Fullname
                        </label>
                        <div
                            className={`relative w-full h-full py-1.5 border-[1px] ${formState.fullname.isVerified ? 'border-green-600' : formState.fullname.isValid ? 'border-zinc-600/50' : 'border-red-600'} rounded-[0.4rem] shadow-sm shadow-zinc-400/80 flex items-center justify-end gap-x-2`}>
                            <input
                                id="fullname-input"
                                className="w-full ml-7 text-sm indent-2 outline-none"
                                type="text"
                                name="fullname"
                                onChange={(event: ChangeEvent<HTMLInputElement>) => {
                                    setFormState ((prevState) => ({
                                        ...prevState,
                                        fullname: {
                                            ...prevState.username,
                                            value: event.target.value,
                                            isValid: !!event.target.value.match (usernameInputRegex)
                                        },
                                    }));
                                }}
                            />
                            <span className="absolute top-1 left-1">
                                 <iconify-icon
                                     width={25}
                                     icon="mdi:card-account-details-outline"
                                 />
                            </span>
                            <p className={`${formState.username.isValid === null ? 'block' : formState.username.isValid ? 'hidden' : 'block'} absolute right-2 -top-5 text-xs font-semibold`}>
                                Error bg
                            </p>
                        </div>
                        <label
                            htmlFor="username-input"
                            className="text-xs font-sans font-medium">Username
                        </label>
                        <div
                            className={`relative w-full h-full py-1.5 border-[1px] ${formState.username.isVerified ? 'border-green-600' : formState.username.isValid ? 'border-zinc-600/50' : 'border-red-600'} rounded-[0.4rem] shadow-sm shadow-zinc-400/80 flex items-center justify-end gap-x-2`}>
                            <input
                                id="username-input"
                                className="w-full ml-7 text-sm indent-2 outline-none"
                                type="text"
                                name="username"
                                onChange={(event: ChangeEvent<HTMLInputElement>) => {
                                    setFormState ((prevState) => ({
                                        ...prevState,
                                        username: {
                                            ...prevState.username,
                                            value: event.target.value,
                                            isValid: !!event.target.value.match (usernameInputRegex)
                                        },
                                    }));
                                }}
                            />
                            <span className="absolute top-1 left-1">
                                 <iconify-icon
                                     width={25}
                                     icon="mdi:card-account-details-outline"
                                 />
                            </span>
                            <p className={`${formState.username.isValid === null ? 'block' : formState.username.isValid ? 'hidden' : 'block'} absolute right-2 -top-5 text-xs font-semibold`}>
                                Error bg
                            </p>
                        </div>
                        <label
                            htmlFor="email-input"
                            className="text-xs font-sans font-medium">Email
                        </label>
                        <div
                            className="relative w-full h-full py-1.5 border-[1px] border-zinc-600/50 rounded-[0.4rem] shadow-sm shadow-zinc-400/80 flex items-center justify-end gap-x-2">
                            <input
                                id="email-input"
                                className="w-full ml-7 text-sm indent-2 outline-none"
                                type="text"
                                name="email"
                                onChange={(event: ChangeEvent<HTMLInputElement>) => {
                                    setFormState ((prevState) => ({
                                        ...prevState,
                                        email: {
                                            ...prevState.email,
                                            value: event.target.value,
                                            isValid: !!event.target.value.match (emailInputRegex)
                                        },
                                    }));
                                }}
                            />
                            <span className="absolute top-1 left-1">
                                 <iconify-icon
                                     width={25}
                                     icon="mdi:at"
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
                                setFormState ((prevState) => ({
                                    ...prevState,
                                    password: event.target.value
                                }));
                            }}
                        />

                        <div>
                            <label id="listbox-label" className="block text-sm font-medium leading-6 text-gray-900">
                                Role
                            </label>
                            <div
                                className={`relative ${formState.roleOpen ? '' : 'overflow-hidden'}`}
                                onClick={() => {
                                    setFormState ((prevState) => ({
                                        ...prevState,
                                        roleOpen: !prevState.roleOpen
                                    }));
                                }}>
                                <button type="button"
                                        className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6"
                                        aria-haspopup="listbox" aria-expanded="true" aria-labelledby="listbox-label">
                                    <span className="flex items-center">
                                        <span
                                            className="ml-3 block truncate capitalize">{rolesData[formState.roleIndex].name.toLowerCase()}</span>
                                    </span>
                                    <span
                                        className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                                        <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor"
                                             aria-hidden="true">
                                            <path fillRule="evenodd"
                                                  d="M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.2a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z"
                                                  clipRule="evenodd"/>
                                        </svg>
                                    </span>
                                </button>

                                <ul className={`${formState.roleOpen ? 'h-32 overflow-y-hidden' : 'h-0 overflow-hidden'} absolute z-10 mt-1 max-h-56 w-full rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm transition-all duration-150 ease-linear`}
                                    role="listbox" aria-labelledby="listbox-label"
                                    aria-activedescendant="listbox-option-3">
                                    {
                                        rolesData.map ((role: RolesModelType, index: number) => ((
                                            <li key={index}
                                                className="text-gray-900 relative cursor-pointer hover:bg-gray-200 select-none py-2 pl-3 pr-9"
                                                role="option"
                                                aria-selected={role.id === rolesData[formState.roleIndex].id}
                                                onClick={() => {
                                                    setFormState ((prevState) => ({
                                                        ...prevState,
                                                        role: role.id
                                                    }));
                                                }}
                                            >
                                                <div className="flex items-center">
                                                    <span
                                                        className="font-normal ml-3 block truncate capitalize">{role.name.toLowerCase ()}</span>
                                                </div>

                                                {
                                                    role.id === rolesData[formState.roleIndex].id
                                                        ? (
                                                            <span
                                                                className="text-indigo-600 absolute inset-y-0 right-0 flex items-center pr-4">
                                                                <svg className="h-5 w-5" viewBox="0 0 20 20"
                                                                     fill="currentColor">
                                                                    <path fillRule="evenodd"
                                                                          d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                                                                          clipRule="evenodd"/>
                                                                </svg>
                                                            </span>
                                                        )
                                                        : (
                                                            <></>
                                                        )
                                                }
                                            </li>
                                        )))
                                    }
                                </ul>
                            </div>
                        </div>

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
