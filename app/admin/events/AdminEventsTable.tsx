'use client';
import { dateFormat } from "@/lib/DateFormatLib";
import { AdminEventDataType } from "@/app/admin/events/page";
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
    CardHeader, FormControl, FormLabel,
    Heading, Input, Modal, ModalBody,
    ModalCloseButton,
    ModalContent, ModalFooter,
    ModalHeader,
    ModalOverlay,
    Stack,
    StackDivider,
    Text,
} from "@chakra-ui/react";
import { Dispatch, SetStateAction, useRef, useState } from "react";
import Image from "next/image";
import { ChickenImg, Rio2L } from "@/lib/StaticImagesLib";
import { deleteEvents } from "@/app/admin/events/EventsServerAction";
import { useNotificationToastContext } from "@/hooks/useNotificationToastContext";

const AdminEventsTable = ({ eventsDataProps, setEventsDataProps }: {
    eventsDataProps: AdminEventDataType[]
    setEventsDataProps: Dispatch<SetStateAction<AdminEventDataType[]>>
}) => {
    const { setNotificationToast } = useNotificationToastContext();
    const deleteInitialState: {
        modal: {
            isOpen: boolean
        }
        formConfirm: {
            isOpen: boolean
            isInvalid: boolean
            id: string
        }
    } = {
        modal: {
            isOpen: false
        },
        formConfirm: {
            isOpen: false,
            isInvalid: true,
            id: ''
        }
    };
    const [ deleteState, setDeleteState ] = useState<{
        modal: {
            isOpen: boolean
        }
        formConfirm: {
            isOpen: boolean
            isInvalid: boolean
            id: string
        }
    }>(deleteInitialState);
    const cancelRef = useRef<HTMLButtonElement | null>(null);
    const initialRef = useRef(null);
    const [ indexSelected, setIndexSelected ] = useState<number>(0);
    const handleDeleteData = async (id: string) => {
        const { status, message } = await deleteEvents(id);
        if (!status){
            setDeleteState(deleteInitialState);
            setNotificationToast((prevState) => ({
                ...prevState,
                slug: 'An error occurred while delete data',
                message: message,
                play: true
            }));
            return;
        }
        let newEventData = [ ...eventsDataProps ];
        newEventData = newEventData.filter((item) => item.id !== id);
        setEventsDataProps(newEventData);
        setDeleteState(deleteInitialState);
    };

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
                            Event
                        </th>
                        <th className="max-w-24 flex flex-col px-6 py-3 text-xs uppercase whitespace-nowrap">
                            <p>Total</p>
                            <p>Products</p>
                        </th>
                        <th className="px-6 py-3 text-xs uppercase whitespace-nowrap">
                            Begin Date
                        </th>
                        <th className="px-6 py-3 text-xs uppercase whitespace-nowrap">
                            End Date
                        </th>
                        <th className="px-6 py-3 text-xs uppercase whitespace-nowrap">
                            Status
                        </th>
                        <th className="px-6 py-3 text-xs uppercase whitespace-nowrap">
                            Actions
                        </th>
                    </tr>
                    </thead>

                    <tbody>
                    {
                        eventsDataProps && eventsDataProps.map ((event: AdminEventDataType, index: number) => {
                            return (
                                <tr key={index}>
                                    <td className="text-center text-sm whitespace-nowrap">
                                        {index + 1}
                                    </td>
                                    <td className="indent-2 text-xs whitespace-nowrap p-4 capitalize">
                                        {event.name ?? 'Not Set yet'}
                                    </td>
                                    <td className="indent-2 text-xs whitespace-nowrap p-4">
                                        {event._count.products ?? 0}
                                    </td>
                                    <td className="indent-2 text-xs whitespace-nowrap p-4">
                                        {event.beginDate ? `${dateFormat (event.beginDate.toString (), 'LLLL')}` : '-'}
                                    </td>
                                    <td className="indent-2 text-xs whitespace-nowrap p-4">
                                        {event.endDate ? `${dateFormat (event.endDate.toString (), 'LLLL')}` : '-'}
                                    </td>
                                    <td className="indent-4 whitespace-nowrap p-4">
                                        {
                                            event.status
                                                ? (
                                                    <iconify-icon
                                                        icon="lets-icons:check-fill"
                                                        width={25}
                                                        class="text-green-600"
                                                    />
                                                ) : (
                                                    <iconify-icon
                                                        icon="lets-icons:close-round-fill"
                                                        width={25}
                                                        class="text-red-500 mx-auto"
                                                    />
                                                )

                                        }
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
                                                    setDeleteState((prevState) => ({
                                                        ...prevState,
                                                        modal: {
                                                            isOpen: true
                                                        }
                                                    }));
                                                    setIndexSelected(index);
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
                onClose={() => {
                    setDeleteState((prevState) => ({
                        ...prevState,
                        modal: {
                            isOpen: false
                        }
                    }));
                }}
                isOpen={deleteState.modal.isOpen}
                isCentered
            >
                <AlertDialogOverlay />

                <AlertDialogContent>
                    <AlertDialogHeader>Delete this event?</AlertDialogHeader>
                    <AlertDialogCloseButton />
                    <AlertDialogBody>
                        <Card>
                            <CardHeader className="aspect-[4/3] overflow-hidden flex items-center justify-center">
                                <Image
                                    src={ eventsDataProps[indexSelected].images[0] ?? ChickenImg }
                                    alt={ eventsDataProps[indexSelected].images[0]
                                        ? eventsDataProps[indexSelected].name
                                        : 'chicken'
                                    }
                                    width={200}
                                    height={100}
                                    className={
                                        `${eventsDataProps[indexSelected].images[0] 
                                            ? 'w-full h-full'
                                            : ''
                                        } object-cover object-center`
                                    }
                                />
                            </CardHeader>
                            <CardHeader textTransform='uppercase'>
                                <Heading size='md'>{ eventsDataProps[indexSelected].name }</Heading>
                            </CardHeader>

                            <CardBody>
                                <Stack divider={<StackDivider />} spacing='4'>
                                    <Box>
                                        <Heading size='xs' textTransform='uppercase'>
                                            Event Status
                                        </Heading>
                                        <Text pt='2' fontSize='sm' className="flex flex-row gap-x-1 subpixel-antialiased font-bold">
                                            { eventsDataProps[indexSelected].status ? 'Active' : 'Inactive' }
                                            <span className="flex items-center">
                                                <iconify-icon
                                                    icon={ eventsDataProps[indexSelected].status
                                                        ? 'mdi:check-circle'
                                                        : 'mdi:close-circle'
                                                    }
                                                    width={20}
                                                    style={{
                                                        color: eventsDataProps[indexSelected].status ? 'green' : 'red'
                                                    }}
                                                />
                                            </span>

                                        </Text>
                                    </Box>
                                    <Box>
                                        <Heading size='xs' textTransform='uppercase'>
                                            Total Products in this event
                                        </Heading>
                                        <Text pt='2' fontSize='sm' className="capitalize">
                                            { eventsDataProps[indexSelected]._count.products } Products
                                        </Text>
                                    </Box>
                                    <Box>
                                        <Heading size='xs' textTransform='uppercase'>
                                            Event begin date
                                        </Heading>
                                        <Text pt='2' fontSize='sm'>
                                            { eventsDataProps[indexSelected].beginDate
                                                ? dateFormat(eventsDataProps[indexSelected].beginDate?.toString(), 'MMMM Do YYYY' )
                                                : 'Not set yet'
                                            }
                                        </Text>
                                    </Box>
                                    <Box>
                                        <Heading size='xs' textTransform='uppercase'>
                                            Event end date
                                        </Heading>
                                        <Text pt='2' fontSize='sm'>
                                            { eventsDataProps[indexSelected].endDate
                                                ? dateFormat(eventsDataProps[indexSelected].endDate?.toString(), 'MMMM Do YYYY' )
                                                : 'Not set yet'
                                            }
                                        </Text>
                                    </Box>
                                </Stack>
                            </CardBody>
                        </Card>
                    </AlertDialogBody>
                    <AlertDialogFooter>
                        <Button ref={cancelRef} onClick={() => setDeleteState(deleteInitialState)}>
                            No
                        </Button>
                        <Button
                            onClick={() => {
                                setDeleteState((prevState) => ({
                                    ...prevState,
                                    modal: {
                                        isOpen: false
                                    },
                                    formConfirm: {
                                        ...prevState.formConfirm,
                                        isOpen: true,
                                        id: eventsDataProps[indexSelected].id
                                    }
                                }));
                            }}
                            colorScheme='red' ml={3}
                        >
                            Yes
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            <Modal
                initialFocusRef={initialRef}
                isOpen={deleteState.formConfirm.isOpen}
                isCentered
                onClose={() => setDeleteState(deleteInitialState)}
            >
                <ModalOverlay
                    className="overflow-hidden"
                >
                    <Image src={Rio2L} alt={`ka rio`} className='blur-md w-full h-full object-cover object-center opacity-85'/>
                </ModalOverlay>
                <ModalContent>
                    <ModalHeader>Confirm Action</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <FormControl>
                            <FormLabel>Type <strong className="font-bold">Misuzu sayang</strong><span> below to confirm your action</span></FormLabel>
                            <Input
                                ref={initialRef}
                                isRequired
                                isInvalid
                                errorBorderColor={'crimson'}
                                focusBorderColor={deleteState.formConfirm.isInvalid ? 'crimson' : 'green'}
                                placeholder='Misuzu sayang'
                                onChange={(event) => {
                                    setDeleteState((prevState) => ({
                                        ...prevState,
                                        formConfirm: {
                                            ...prevState.formConfirm,
                                            isInvalid: event.target.value !== 'Misuzu sayang'
                                        }
                                    }));
                                }}
                            />
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button
                            isDisabled={deleteState.formConfirm.isInvalid}
                            colorScheme={ deleteState.formConfirm.isInvalid ? 'gray': 'blue'}
                            mr={3}
                            onClick={() => handleDeleteData(eventsDataProps[indexSelected].id)}
                        >
                            Confirm
                        </Button>
                        <Button onClick={() => {
                            setDeleteState(deleteInitialState);
                        }}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default AdminEventsTable;
