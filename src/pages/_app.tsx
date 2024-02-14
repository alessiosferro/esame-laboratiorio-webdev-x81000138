import type {AppProps} from "next/app";
import {Box, ChakraProvider, defineStyleConfig, extendTheme, Flex, Heading} from "@chakra-ui/react";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import AppContextProvider from "@/app.context";
import LogoutButton from "@/components/atoms/LogoutButton";
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
                    <Flex minHeight="100dvh"
                          bgColor="black.50"
                          direction="column">
                        <Box mb="2rem"
                             py="2rem"
                             backgroundColor="gray.100"
                             as="header"
                             textAlign="center">
                            <Heading as="h1">Morra Cinese Multiplayer</Heading>
                        </Box>

                        <Flex direction="column"
                              flex={1}
                              gap="2rem"
                              maxWidth={{base: "100%", lg: "30rem"}}
                              width={{lg: "calc(100% - 4rem)"}}
                              margin={{base: "1rem 2rem 0", lg: "2rem auto 0"}}
                        >
                            <LogoutButton alignSelf="flex-start"/>

                            <Component {...pageProps} />
                        </Flex>

                        <Box py="2rem" bgColor="gray.50" as="footer" textAlign="center">
                            Realizzato da Alessio Sferro – Matricola X81000138
                        </Box>
                    </Flex>
                </AppContextProvider>
            </ChakraProvider>
        </QueryClientProvider>
    );
}
