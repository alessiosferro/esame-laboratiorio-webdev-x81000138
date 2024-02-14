import type {AppProps} from "next/app";
import {Box, ChakraProvider, defineStyleConfig, extendTheme, Flex, Heading} from "@chakra-ui/react";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import AppContextProvider from "@/app.context";
import LogoutButton from "@/components/LogoutButton";
import io from "socket.io-client";

const queryClient = new QueryClient();

export const socket = io("ws://localhost:3001");

const theme = extendTheme({
    components: {
        Heading: defineStyleConfig({
            variants: {
                h2: {
                    fontSize: "1.5rem"
                }
            }
        }),
        Link: defineStyleConfig({
            baseStyle: {
                color: "blue.400"
            }
        })
    }
});


export default function App({Component, pageProps}: AppProps) {


    return (
        <QueryClientProvider client={queryClient}>
            <ChakraProvider theme={theme}>
                <AppContextProvider>
                    <Flex minHeight="100dvh" direction="column">
                        <Box mb="2rem" py="2rem" backgroundColor="gray.100" as="header" textAlign="center">
                            <Heading as="h1">Morra Cinese</Heading>
                            <LogoutButton/>
                        </Box>
                        <Component {...pageProps} />
                    </Flex>
                </AppContextProvider>
            </ChakraProvider>
        </QueryClientProvider>
    );
}
