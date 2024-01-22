'use client';
import { ChangeEvent, SyntheticEvent, useEffect, useRef, useState } from "react";
import { z, ZodError } from "zod";
import { WEB_ERROR_CAUSE, WEB_ERROR_MESSAGE } from "@/lib/ErrorsLib";
import { useNotificationToastContext } from "@/hooks/useNotificationToastContext";
import { eventsCreateData, eventsNameCheck, imagesProcess } from "@/app/admin/events/EventsServerAction";
import EventsImagesPreview from "@/app/admin/events/create/EventsImagesPreview";
import moment from "moment-timezone";

type formStateType = {
    name: {
        value: string,
        isValid: boolean | null
        isFilled: boolean | null
        isChecking: boolean
        isVerified: boolean | null
    },
    slug: {
        value: string
        isFilled: boolean | null
    },
    description: {
        value: string,
        isFilled: boolean | null
    },
    beginDate: {
        value: string
    },
    endDate: {
        value: string
    }
    onSubmit: boolean
    status: boolean
    message: string
}
const EventsCreateForm = () => {
    const { setNotificationToast } = useNotificationToastContext();
    const [ formState, setFormState ] = useState<formStateType>({
        name: {
            value: '',
            isFilled: null,
            isValid: null,
            isChecking: false,
            isVerified: null
        },
        slug: {
            value: '',
            isFilled: null,
        },
        description: {
            value: '',
            isFilled: null,
        },
        beginDate: {
            value: moment.tz('Asia/Jakarta').format('YYYY-MM-DDTHH:mm:ss[Z]')
        },
        endDate: {
            value: moment.tz('Asia/Jakarta').format('YYYY-MM-DDTHH:mm:ss[Z]')
        },
        onSubmit: false,
        status: true,
        message: ''
    });
    const [ imagesUpload, setImagesUpload ] = useState<File[]>([]);
    const [ imagesCompressed, setImageCompressed ] = useState<{ count: number, data: string[], name: string[] }>({
        count: 0,
        data: [],
        name: []
    });
    const nameInputRef = useRef<HTMLInputElement | null>(null);
    const inputRegex: RegExp = /^[a-zA-Z0-9\s!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]*$/;
    const ACCEPTED_IMAGE_TYPES = [ "image/jpeg", "image/jpg", "image/png", "image/webp", "image/heic" ];
    const handleFilesUpload = (files: File[]) => {
        setNotificationToast((prevState) => ({
            ...prevState,
            play: false
        }));
        try {
            const verifiedFiles: File[] = files.map((file: File) => {
                return z.any()
                    .refine((file: File) => ACCEPTED_IMAGE_TYPES.includes(file?.type), "Only .jpg, .jpeg, .png .webp and .heic formats are supported.")
                    .refine((file: File): boolean => file?.size <= 10 * 1024 * 1024, `Maximum image size is 10MB.`)
                    .parse(file);
            });
            setImagesUpload((prevState: File[]) => [ ...prevState, ...verifiedFiles ]);
        } catch (error: any) {
            setNotificationToast ({
                position: 'top-right',
                slug: 'Upload Error',
                message: error.issues[0].message,
                play: true
            });
        }
    };
    const handleFormValueChange = (action: { type: 'name' | 'slug' | 'description', payload: string }) => {
        switch (action.type) {
            case "name":
                setFormState((prevState) => ({
                    ...prevState,
                    name: {
                        ...prevState.name,
                        value: action.payload,
                        isFilled: action.payload.length > 0,
                        isValid: action.payload.length > 0
                            ? z.string().regex(inputRegex).safeParse(action.payload).success
                            : false,
                        isVerified: null
                    }
                }));
                break;
            case "slug":
                setFormState((prevState) => ({
                    ...prevState,
                    slug: {
                        ...prevState.slug,
                        value: action.payload,
                        isFilled: action.payload.length > 0,
                        isVerified: null
                    }
                }));
                break;
            case "description":
                setFormState((prevState) => ({
                    ...prevState,
                    description: {
                        ...prevState.description,
                        value: action.payload,
                        isFilled: action.payload.length > 0,
                        isVerified: null
                    }
                }));
                break;
            default: return setFormState( (prevState) => ({ ...prevState }));
        }
    };
    const handleFormSubmit = async (event: SyntheticEvent<HTMLFormElement>) => {
        event.preventDefault();
        setFormState((prevState) => ({
            ...prevState,
            onSubmit: true,
        }));
        try {
            const imagesUploadFile: File[] = await Promise.all(imagesCompressed.data.map(async (image: string, index) => {
                const res: Response = await fetch(image);
                const blob: Blob = await res.blob();
                return new File ([ blob ], `${imagesCompressed.name[index]}.webp`, { type: 'image/webp' });
            }));
            const imagesForm: FormData = new FormData();
            imagesUploadFile.map((image: File) => {
                imagesForm.append(image.name, image);
            });
            const uploadImagesResponse: Response = await fetch(`/api/v2/images`, {
                method: 'POST',
                body: imagesForm
            });
            if (!uploadImagesResponse.ok) {
                setNotificationToast((prevState) => ({
                    ...prevState,
                    slug: 'Image upload error',
                    message: uploadImagesResponse.statusText,
                    play: true
                }));
                return;
            }
            const uploadedImagesJson = await uploadImagesResponse.json();

            const submitData: {
                name: string
                slug: string
                description: string
                images: string[]
            } = z.object({
                name: z.string()
                    .min(1, { message: `Name can't be empty` })
                    .regex(inputRegex, { message: 'Unique symbol is not allowed in Name input' }),
                slug: z.string().min(1, { message: `Category Slug can't be empty` }),
                description: z.string().min(1, { message: `'Category Description can't be empty` }),
                images: z.string().array().nonempty({ message: `Images File must be Provided` })
            }).parse({
                name: formState.name.value,
                slug: formState.slug.value,
                description: formState.description.value,
                images: uploadedImagesJson.data
            });
            const formData: FormData = new FormData();
            formData.append('name', submitData.name);
            formData.append('slug', submitData.slug);
            formData.append('description', submitData.description);
            formData.append('images', JSON.stringify(submitData.images));
            eventsCreateData(formData)
                .then((res: { success: boolean, message: string }) => {
                    if (!res.success) {
                        setNotificationToast((prevState) => ({
                            ...prevState,
                            slug: 'Form submit error!',
                            message: res.message,
                            play: true
                        }));
                        setFormState((prevState) => ({
                            ...prevState,
                            onSubmit: false,
                            status: res.success,
                            message: res.message
                        }));
                        return;
                    }
                    setFormState((prevState) => ({
                        ...prevState,
                        onSubmit: false,
                        status: res.success,
                        message: res.message
                    }));
                })
                .catch((error) => {
                    setFormState((prevState) => ({
                        ...prevState,
                        onSubmit: false,
                        status: false,
                        message: error.message
                    }));
                });
        } catch (error: any) {
            const errorMessage: string = error instanceof ZodError
                ? error.issues[0].message
                : 'Anonymous error occurred';
            setNotificationToast({
                position: 'top-right',
                slug: 'Invalid Data',
                message: errorMessage,
                play: true
            });
            setFormState((prevState) => ({
                ...prevState,
                onSubmit: false,
                status: false,
                message: errorMessage
            }));
        }
    };
    const getNameInputClass = (): string => {
        return formState.name.isFilled === null
            ? 'border-zinc-400 focus:border-black'
            : !formState.name.isFilled
                ? 'border-red-600 text-red-600 focus:border-red-600'
                : formState.name.isValid
                    ? 'border-black'
                    : 'border-red-600 text-red-600 focus:border-red-600';
    };
    const getSlugInputClass = (): string => {
        return formState.slug.isFilled === null
            ? 'border-zinc-400 focus:border-black'
            : formState.slug.isFilled
                ? 'border-black'
                : 'border-red-600 text-red-600 focus:border-red-600';
    };
    const getDescriptionInputClass = (): string => {
        return formState.description.isFilled === null
            ? 'border-zinc-400 focus:border-black'
            : formState.description.isFilled
                ? 'border-black'
                : 'border-red-600 text-red-600 focus:border-red-600';
    };
    const getNameLabelClass = (): string => {
        return formState.name.isFilled === null
            ? 'bg-transparent text-sm translate-y-0 translate-x-0 font-normal text-zinc-600'
            : !formState.name.isFilled
                ? 'bg-transparent text-sm translate-y-0 translate-x-0 font-normal text-zinc-600'
                : formState.name.isValid
                    ? 'bg-white text-xs -translate-y-3.5 -translate-x-1 font-semibold text-black'
                    : 'bg-white text-xs -translate-y-3.5 -translate-x-1 font-semibold text-red-600';
    };
    const getSlugLabelClass = (): string => {
        return formState.slug.isFilled === null
            ? 'bg-transparent text-sm translate-y-0 translate-x-0 font-normal text-zinc-600'
            : !formState.slug.isFilled
                ? 'bg-transparent text-sm translate-y-0 translate-x-0 font-normal text-zinc-600'
                : 'bg-white text-xs -translate-y-3.5 -translate-x-1 font-semibold text-black';
    };
    const getDescriptionLabelClass = (): string => {
        return formState.description.isFilled === null
            ? 'bg-transparent text-sm translate-y-0 translate-x-0 font-normal text-zinc-600'
            : !formState.description.isFilled
                ? 'bg-transparent text-sm translate-y-0 translate-x-0 font-normal text-zinc-600'
                : 'bg-white text-xs -translate-y-3.5 -translate-x-1 font-semibold text-black';
    };

    useEffect(() => {
        const timeoutId = setTimeout(async () => {
            if (formState.name.value.length > 0) {
                setFormState((prevState) => ({
                    ...prevState,
                    name: {
                        ...prevState.name,
                        isChecking: true
                    }
                }));
                const checkResult: boolean | null = await eventsNameCheck(formState.name.value);
                if (checkResult === null) {
                    throw new Error(WEB_ERROR_MESSAGE.DATABASE_ERROR, { cause: WEB_ERROR_CAUSE.DATABASE_ERROR });
                }
                setFormState((prevState) => ({
                    ...prevState,
                    name: {
                        ...prevState.name,
                        isChecking: false,
                        isVerified: checkResult
                    }
                }));
            }
        }, 2000);

        return () => {
            clearTimeout(timeoutId);
        };
    }, [ formState.name.value ]);

    useEffect (() => {
        setImageCompressed((prevState: { count: number, data: string[], name: string[] }) => ({
            ...prevState,
            count: imagesUpload.length
        }));
        const formData: FormData = new FormData();
        const imagesData: File[] = imagesUpload.filter((_, index: number): boolean => index > imagesCompressed.count - 1 );
        imagesData.map((image: File) => formData.append(image.name, image));
        imagesProcess (formData)
            .then ((res: { data: string[], name: string[] } | null) => {
                if (!res?.name || !res.data) {
                    setNotificationToast ({
                        position: 'top-right',
                        slug: 'Upload Error',
                        message: 'An error occurred while processing image',
                        play: true
                    });
                    return;
                }
                setImageCompressed((prevState: { count: number, data: string[], name: string[] }) => ({
                    ...prevState,
                    name: [ ...prevState.name, ...res.name ],
                    data: [ ...prevState.data, ...res.data ]
                }));
            })
            .catch((error) => {
                setNotificationToast ({
                    position: 'top-right',
                    slug: 'Upload Error',
                    message: error.issues[0].message ?? 'Unknown error occurred',
                    play: true
                });
            });
    }, [ imagesUpload, setNotificationToast ]);


    useEffect(() => {
        setTimeout(() => {
            nameInputRef?.current?.focus();
        }, 150);
    }, []);


    return (
        <>
            <div className="w-full min-h-96 mx-auto flex flex-col md:flex-row px-7 gap-y-5 pb-6">
                <form onSubmit={handleFormSubmit}
                      className="basis-1/2 order-last md:order-first flex flex-col items-center md:items-start w-auto h-full space-y-7 transition-all duration-200 ease-in-out">
                    <div className="relative w-10/12 md:w-11/12 lg:w-10/12 transition-all duration-200 ease-in-out">
                        <input
                            id="name"
                            name="name"
                            ref={nameInputRef}
                            type="text"
                            pattern="([a-zA-Z][a-zA-Z0-9\s]*){1,}"
                            className={`w-full h-full p-2 peer border-[2px] ${getNameInputClass ()} aria-[invalid=true]:border-red-600 transition-all duration-200 ease-in-out bg-transparent outline-none rounded-md ${formState.name.isChecking ? 'opacity-40' : 'opacity-100'}`}
                            disabled={formState.name.isChecking}
                            value={formState.name.value}
                            aria-invalid={formState.name.isFilled === false || formState.name.isValid === false || formState.name.isVerified === false}
                            onBlur={(event) => {
                                event.target.ariaInvalid = event.target.value.length <= 0
                                    ? 'true'
                                    : 'false';
                                if (event.target.value.length <= 0) {
                                    handleFormValueChange ({
                                        type: 'name',
                                        payload: event.target.value
                                    });
                                }
                            }}
                            onChange={(event: ChangeEvent<HTMLInputElement>) => {
                                event.target.ariaInvalid = event.target.value.length <= 0
                                    ? 'true'
                                    : 'false';
                                handleFormValueChange ({
                                    type: 'name',
                                    payload: event.target.value
                                });
                            }}
                            required
                        />
                        <label
                            className={`absolute left-3 top-1.5 px-0.5 text-sm tracking-wide z-0 cursor-text ${getNameLabelClass ()} peer-aria-[invalid=true]:text-red-600 peer-focus:bg-white peer-focus:text-xs peer-focus:-translate-y-3.5 peer-focus:-translate-x-1 peer-focus:font-semibold peer-focus:text-black transition-all duration-200 ease-in-out`}
                            htmlFor="name">
                            Name
                        </label>
                        <p className={
                            `${
                                formState.name.isFilled === null
                                    ? 'hidden'
                                    : !formState.name.isFilled
                                        ? 'block'
                                        : formState.name.isValid && (formState.name.isVerified === null)
                                            ? 'hidden'
                                            : 'block'
                            } absolute text-xs left-1 -bottom-4 ${formState.name.isVerified && formState.name.isValid ? 'text-green-600' : 'text-red-600'}  font-sans font-bold`
                        }>
                            {
                                formState.name.isFilled === false
                                    ? 'Event name is required!'
                                    : formState.name.isValid === false
                                        ? `Event name can't be filled with unique symbol`
                                        : formState.name.isVerified
                                            ? 'Event name can be used'
                                            : 'Event Already exist'
                            }
                        </p>
                        <span className="absolute -right-8 md:-right-7 top-2">
                            <iconify-icon
                                icon={formState.name.isChecking
                                    ? 'line-md:loading-twotone-loop'
                                    : formState.name.isVerified === null
                                        ? 'line-md:question'
                                        : formState.name.isVerified
                                            ? 'line-md:circle-to-confirm-circle-transition'
                                            : 'line-md:close-circle'
                                }
                                width={25}
                                class={
                                    formState.name.isChecking
                                        ? 'text-neutral-900 subpixel-antialiased'
                                        : formState.name.isVerified === null
                                            ? 'text-neutral-900 subpixel-antialiased'
                                            : formState.name.isVerified
                                                ? 'text-green-600'
                                                : 'text-red-600'
                                }
                            />
                        </span>
                    </div>
                    <div className="relative w-10/12 md:w-11/12 lg:w-10/12 transition-all duration-200 ease-in-out">
                        <input
                            id="slug"
                            name="slug"
                            type="text"
                            className={`w-full h-full p-2 peer border-[2px] ${getSlugInputClass ()} aria-[invalid=true]:border-red-600 transition-all duration-200 ease-in-out bg-transparent outline-none rounded-md`}
                            value={formState.slug.value}
                            aria-invalid={false}
                            onBlur={(event) => {
                                event.target.ariaInvalid = event.target.value.length <= 0
                                    ? 'true'
                                    : 'false';
                                if (event.target.value.length <= 0) {
                                    handleFormValueChange ({
                                        type: 'slug',
                                        payload: event.target.value
                                    });
                                }
                            }}
                            onChange={(event: ChangeEvent<HTMLInputElement>) => {
                                event.target.ariaInvalid = event.target.value.length <= 0
                                    ? 'true'
                                    : 'false';
                                handleFormValueChange ({
                                    type: 'slug',
                                    payload: event.target.value
                                });
                            }}
                            required
                        />
                        <label
                            className={`absolute left-3 top-1.5 px-0.5 text-sm tracking-wide z-0 cursor-text ${getSlugLabelClass ()} peer-aria-[invalid=true]:text-red-600 peer-focus:bg-white peer-focus:text-xs peer-focus:-translate-y-3.5 peer-focus:-translate-x-1 peer-focus:font-semibold peer-focus:text-black transition-all duration-200 ease-in-out`}
                            htmlFor="slug">
                            Slug
                        </label>
                        <p className={
                            `${
                                formState.slug.isFilled === null
                                    ? 'hidden'
                                    : !formState.slug.isFilled
                                        ? 'block'
                                        : 'hidden'
                            } absolute text-xs left-1 -bottom-4 text-red-600`
                        }>
                            {
                                formState.slug.isFilled === false
                                    ? 'Event slug is required! Unique symbol is allowed'
                                    : ''
                            }
                        </p>
                    </div>
                    <div className="relative w-10/12 md:w-11/12 lg:w-10/12 transition-all duration-200 ease-in-out">
                        <textarea
                            id="description"
                            name="description"
                            className={`w-full h-60 p-2 rounded-md peer border-[2px] ${getDescriptionInputClass ()} aria-[invalid=true]:border-red-700 transition-all duration-200 ease-in-out bg-transparent outline-none`}
                            aria-invalid={false}
                            onBlur={(event) => {
                                event.target.ariaInvalid = event.target.value.length <= 0
                                    ? 'true'
                                    : 'false';
                                if (event.target.value.length <= 0) {
                                    handleFormValueChange ({
                                        type: 'description',
                                        payload: event.target.value
                                    });
                                }
                            }}
                            onChange={(event: ChangeEvent<HTMLTextAreaElement>) => {
                                event.target.ariaInvalid = event.target.value.length <= 0
                                    ? 'true'
                                    : 'false';
                                handleFormValueChange ({
                                    type: 'description',
                                    payload: event.target.value
                                });
                            }}
                            required
                        />
                        <label
                            className={`absolute left-3 top-1.5 px-0.5 text-sm tracking-wide z-0 cursor-text ${getDescriptionLabelClass ()} peer-aria-[invalid=true]:text-red-600 peer-focus:bg-white peer-focus:text-xs peer-focus:-translate-y-3.5 peer-focus:-translate-x-1 peer-focus:font-semibold peer-focus:text-black transition-all duration-200 ease-in-out`}
                            htmlFor="name">
                            Description
                        </label>
                        <p className={
                            `${
                                formState.description.isFilled === null
                                    ? 'hidden'
                                    : !formState.description.isFilled
                                        ? 'block'
                                        : 'hidden'
                            } absolute text-xs left-1 -bottom-4 text-red-600`
                        }>
                            {
                                formState.description.isFilled === false
                                    ? 'Event description is required! Unique symbol is allowed'
                                    : ''
                            }
                        </p>
                    </div>

                    <div className="relative">
                        <input type="datetime-local"
                               value={moment.utc(formState.beginDate.value).format ('yyyy-MM-DDTHH:mm')} disabled/>
                        <button
                            type="button"
                            aria-hidden={true}
                            className="peer absolute top-0 bottom-0 right-0.5 bg-red-600 flex items-center justify-center"
                            onClick={(event) => {
                                event.currentTarget.ariaHidden = 'false';
                            }}
                        >
                            <iconify-icon
                                icon="mdi:calendar-month"
                                width={25}
                            />
                        </button>

                    </div>

                    <div className="flex flex-row items-center justify-start gap-x-2">
                        <button
                            aria-disabled={formState.name.isVerified !== true || formState.slug.isFilled !== true || formState.description.isFilled !== true}
                            disabled={formState.name.isVerified !== true || formState.slug.isFilled !== true || formState.description.isFilled !== true}
                            type="submit"
                            className="group px-2.5 py-2 rounded-md font-medium flex items-center justify-center gap-x-1.5 bg-neutral-950 scale-100 text-base hover:scale-110 aria-disabled:hover:scale-100 aria-disabled:opacity-70 text-white font-sans transition-all duration-200 ease-in-out"
                        >
                            <p className="subpixel-antialiased">
                                CREATE
                            </p>
                            <iconify-icon
                                icon={formState.onSubmit
                                    ? 'line-md:loading-twotone-loop'
                                    : 'line-md:upload-loop'
                                }
                                width={25}
                                className="group-aria-disabled:hidden block"
                            />
                        </button>
                        <p className={`${formState.message
                            ? 'block'
                            : 'hidden'
                        } ${formState.status ? 'text-green-600' : 'text-red-600'} font-sans font-medium text-sm`}>
                            {formState.message}!
                            <span
                                onClick={() => {
                                    setFormState ((prevState) => ({
                                        ...prevState,
                                        message: ''
                                    }));
                                }}
                                className="font-bold underline underline-offset-4 cursor-pointer"> Okay, got it
                            </span>
                        </p>
                    </div>


                </form>
                <section
                    className="basis-1/2 lg:basis-96 mx-auto w-10/12 md:w-[28rem] lg:w-11/12 flex flex-col gap-5 items-center lg:items-end justify-start overflow-hidden border-l-0 md:border-l-[3px] border-dashed border-neutral-900 transition-all duration-200 ease-in-out">
                    <div
                        className="relative group w-80 aspect-[4/3] flex flex-col items-center justify-center animate-background animate-duration-[6s] bg-gradient-to-r from-indigo-800 via-amber-400 to-violet-700 bg-[length:500%_500%] p-1.5 rounded-lg overflow-hidden"
                        onDragOver={(event) => {
                            event.preventDefault ();
                            event.stopPropagation ();

                        }}
                        onDrop={async (event) => {
                            event.preventDefault ();
                            event.stopPropagation ();
                            if (!event.dataTransfer.files) {
                                return;
                            }
                            const files: File[] = Array.from (event.dataTransfer.files);
                            handleFilesUpload(files);
                        }}
                    >
                        <form className="relative w-full h-full flex items-center justify-center bg-white rounded-md transition-all duration-200 ease-in-out">
                            <label
                                htmlFor="image-file"
                                className="peer absolute top-1/2 left-1/2 z-0 -translate-y-1/2 -translate-x-1/2 w-14 h-14 font-medium font-sans rounded-full"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-14 h-14" viewBox="0 0 24 24">
                                    <g fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="2">
                                        <path strokeDasharray="2 4" strokeDashoffset="6"
                                              d="M12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3">
                                            <animate attributeName="stroke-dashoffset" dur="0.6s"
                                                     repeatCount="indefinite" values="6;0"/>
                                        </path>
                                        <path strokeDasharray="30" strokeDashoffset="30"
                                              d="M12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21">
                                            <animate fill="freeze" attributeName="stroke-dashoffset" begin="0.1s"
                                                     dur="0.3s" values="30;0"/>
                                        </path>
                                        <path strokeDasharray="10" strokeDashoffset="10" d="M12 16v-7.5">
                                            <animate fill="freeze" attributeName="stroke-dashoffset" begin="0.5s"
                                                     dur="0.2s" values="10;0"/>
                                        </path>
                                        <path strokeDasharray="6" strokeDashoffset="6"
                                              d="M12 8.5l3.5 3.5M12 8.5l-3.5 3.5">
                                            <animate fill="freeze" attributeName="stroke-dashoffset" begin="0.7s"
                                                     dur="0.2s" values="6;0"/>
                                        </path>
                                    </g>
                                </svg>
                            </label>
                            <div
                                className="absolute group top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-14 h-14 z-10 rounded-full overflow-hidden ">
                                <input
                                    id="image-file"
                                    type="file"
                                    multiple
                                    accept="image/jpeg,image/png,image/webp,image/heic"
                                    title=" "
                                    onChange={(event) => {
                                        if (!event.target.files) {
                                            return;
                                        }
                                        handleFilesUpload(Array.from(event.target.files));
                                        event.target.value = '';
                                    }}
                                    className="opacity-0 z-30 w-14 h-24 -translate-y-10 cursor-pointer rounded-full appearance-none"
                                />
                            </div>
                            <div className="absolute flex flex-col bottom-3 w-full text-sm font-sans text-center">
                                <p>
                                    Upload photo with max size <strong className="font-bold">10MB</strong>
                                </p>
                                <p className="font-sans font-semibold text-xs">
                                    PNG,JPG,WEBP or HEIC
                                </p>
                                <p className="text-xs font-semibold font-sans">
                                    Resolution <span className="font-bold">1024 x 768</span> for better result
                                </p>
                            </div>
                        </form>
                    </div>
                    <EventsImagesPreview imagesPreview={imagesCompressed}/>
                </section>
            </div>
        </>
    );
};


export default EventsCreateForm;
