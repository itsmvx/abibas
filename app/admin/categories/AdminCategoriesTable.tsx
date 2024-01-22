'use client';
import { dateFormat } from "@/lib/DateFormatLib";
import { AdminCategoryDataType } from "@/app/admin/categories/page";
import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogCloseButton,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogOverlay,
    Box,
    Button,
    Card,
    CardBody,
    CardHeader,
    Heading,
    Skeleton,
    Stack,
    StackDivider,
    Text,
    useDisclosure
} from "@chakra-ui/react";
import Image from "next/image";
import { ChickenImg } from "@/lib/StaticImagesLib";
import { useEffect, useRef, useState } from "react";

const AdminCategoriesTable = ({ categoriesData }: { categoriesData: AdminCategoryDataType[]}) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [ imageState, setImageState ] = useState<{
        isLoaded: boolean
        isError: boolean
    }>({
        isLoaded: false,
        isError: false
    });
    const cancelRef = useRef<HTMLButtonElement | null>(null);
    const [ indexSelected, setIndexSelected ] = useState<number>(0);

    useEffect (() => {
        if (!isOpen) {
            setImageState({
                isError: false,
                isLoaded: false
            });
        }
    }, [ isOpen ]);

    return (
        <>
            <section
                className="h-full bg-white border-[0.5px] border-zinc-300 shadow-sm shadow-zinc-400 overflow-x-auto animate-fade animate-duration-[600ms] animate-ease-in-out animate-once">
                <table className="items-center bg-transparent w-full border-collapse">
                    <thead className="font-semibold text-left">
                    <tr>
                        <th className="px-2.5 py-3 text-xs uppercase whitespace-nowrap">
                            No.
                        </th>
                        <th className="px-6 py-3 text-xs uppercase whitespace-nowrap">
                            Name
                        </th>
                        <th className="px-6 py-3 text-xs uppercase whitespace-nowrap">
                            Slug
                        </th>
                        <th className="max-w-24 flex flex-col px-6 py-3 text-xs uppercase whitespace-nowrap">
                            <p>Total</p>
                            <p>Products</p>
                        </th>
                        <th className="px-6 py-3 text-xs uppercase whitespace-nowrap">
                            Date Created
                        </th>
                        <th className="px-6 py-3 text-xs uppercase whitespace-nowrap">
                            Last Update
                        </th>
                        <th className="px-6 py-3 text-xs uppercase whitespace-nowrap">
                            Actions
                        </th>
                    </tr>
                    </thead>

                    <tbody>
                    {
                        categoriesData && categoriesData.map ((category: AdminCategoryDataType, index: number) => {
                            return (
                                <tr key={index}>
                                    <td className="text-center text-sm whitespace-nowrap">
                                        {index + 1}
                                    </td>
                                    <td className="indent-2 text-xs whitespace-nowrap p-4 capitalize">
                                        {category.name ?? 'Not Set yet'}
                                    </td>
                                    <td className="indent-2 text-xs whitespace-nowrap p-4">
                                        {category.slug ?? `Not Set yet`}
                                    </td>
                                    <td className="indent-2 text-xs whitespace-nowrap p-4">
                                        {category._count.products ?? 0}
                                    </td>
                                    <td className="indent-2 text-xs whitespace-nowrap p-4">
                                        {category.createdAt ? `${dateFormat (category.createdAt.toString (), 'YYYY-MM-DD, hh:mm A')}` : '-'}
                                    </td>
                                    <td className="indent-2 text-xs whitespace-nowrap p-4">
                                        {category.updatedAt ? `${dateFormat (category.updatedAt.toString (), 'YYYY-MM-DD, hh:mm A')}` : '-'}
                                    </td>
                                    <td className="text-xs whitespace-nowrap p-4">
                                        <div className="relative flex flex-row gap-x-3">
                                            <button
                                                className="group relative w-6 h-6 hover:text-blue-700 transition-colors duration-200 rounded-full">
                                                <iconify-icon width={24} icon="mdi:pencil-outline"></iconify-icon>
                                                <p className="absolute -top-[110%] -left-1.5 text-xs text-white rounded-md bg-neutral-900 scale-100 group-hover:visible invisible px-2 py-1">
                                                    Edit
                                                </p>
                                            </button>

                                            <button
                                                onClick={() => {
                                                    onOpen ();
                                                    setIndexSelected (index);
                                                }}
                                                className="peer flex items-center justify-center w-6 h-6 hover:text-red-500 hover:scale-125 transition-scale duration-200 rounded-full">
                                                <iconify-icon width={24} icon="mdi:delete-outline"></iconify-icon>
                                            </button>

                                            <p className="absolute -top-[110%] left-5 text-xs text-white rounded-md bg-neutral-900 scale-100 peer-hover:visible invisible px-2 py-1">
                                                Delete
                                            </p>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })
                    }
                    </tbody>
                </table>
            </section>

            <AlertDialog
                motionPreset='slideInBottom'
                leastDestructiveRef={cancelRef}
                onClose={onClose}
                isOpen={isOpen}
                isCentered
            >
                <AlertDialogOverlay/>

                <AlertDialogContent>
                    <AlertDialogHeader>Delete this event?</AlertDialogHeader>
                    <AlertDialogCloseButton/>
                    <AlertDialogBody>
                        <Card>
                            <CardHeader>
                                <Skeleton
                                    aria-hidden={false}
                                    color='white'
                                    fadeDuration={1}
                                    className="aspect-[4/3] flex items-center justify-center overflow-hidden"
                                    isLoaded={imageState.isLoaded}
                                >
                                    <Image
                                        src={ categoriesData[indexSelected].images[0]
                                            ? !imageState.isError
                                                ? categoriesData[indexSelected].images[0]
                                                : ChickenImg
                                            : ChickenImg
                                        }
                                        alt={categoriesData[indexSelected].images[0]
                                            ? categoriesData[indexSelected].name
                                            : 'chicken'
                                        }
                                        width={ categoriesData[indexSelected].images[0]
                                            ? !imageState.isError
                                                ? 420
                                                : 200
                                            : 200
                                        }
                                        height={ categoriesData[indexSelected].images[0]
                                            ? !imageState.isError
                                                ? 250
                                                : 100
                                            : 100
                                        }
                                        className={ categoriesData[indexSelected].images[0]
                                            ? !imageState.isError
                                                ? 'w-full h-full object-center object-cover'
                                                : 'object-center object-cover'
                                            : 'object-center object-cover'
                                        }
                                        onError={() => {
                                            setImageState({
                                                isError: true,
                                                isLoaded: true
                                            });
                                        }}
                                        onLoad={() => setImageState((prevState) => ({ ...prevState, isLoaded: true }))}
                                        placeholder={`blur`}
                                        blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mO8cwQAAoIBoqsmkL0AAAAASUVORK5CYII="
                                    />
                                </Skeleton>

                            </CardHeader>
                            <CardHeader textTransform='uppercase'>
                                <Heading size='md'>{ categoriesData[indexSelected].name }</Heading>
                            </CardHeader>

                            <CardBody>
                                <Stack divider={<StackDivider />} spacing='4'>
                                    <Box>
                                        <Heading size='xs' textTransform='uppercase'>
                                            Total Products in this event
                                        </Heading>
                                        <Text pt='2' fontSize='sm' className="capitalize">
                                            { categoriesData[indexSelected]._count.products } Products
                                        </Text>
                                    </Box>
                                </Stack>
                            </CardBody>
                        </Card>
                    </AlertDialogBody>
                    <AlertDialogFooter>
                        <Button ref={cancelRef} onClick={onClose}>
                            No
                        </Button>
                        <Button
                            onClick={() => {

                            }}
                            colorScheme='red' ml={3}
                        >
                            Yes
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
};

export default AdminCategoriesTable;
