'use client';
import {
    Button,
    FormControl,
    FormLabel,
    Input,
    Modal, ModalBody, ModalCloseButton, ModalContent,
    ModalFooter, ModalHeader,
    ModalOverlay,
} from "@chakra-ui/react";
import { useRef, useState } from "react";

export const AdminDeleteDialog = ({ id, model, isVisible }: { id: string, model: string, isVisible: boolean }) => {
    const [ isOpen, setIsOpen ] = useState<boolean>(isVisible);
    const initialRef = useRef(null);
    return (
        <>
            <Modal
                initialFocusRef={initialRef}
                isOpen={isOpen}
                onClose={() => {
                    setIsOpen(!isOpen);
                }}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Create your account</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <FormControl>
                            <FormLabel>Type <strong className="font-bold">Misuzu sayang</strong><span> below to confirm your action</span></FormLabel>
                            <Input ref={initialRef} placeholder='Misuzu sayang' />
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3}>
                            Save
                        </Button>
                        <Button onClick={() => {
                            setIsOpen(!isOpen);
                        }}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};
