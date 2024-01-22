'use client';
import { ChakraProvider } from '@chakra-ui/react';
import { ReactNode } from "react";

export const ChakraUiProvider = ({ children }: { children: ReactNode }) => {
    return (
        <ChakraProvider>
            {children}
        </ChakraProvider>
    );
};
