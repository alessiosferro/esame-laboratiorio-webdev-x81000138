import type {AppProps} from "next/app";
import {Box, Button, ChakraProvider, defineStyleConfig, extendTheme, Flex, Heading} from "@chakra-ui/react";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import useUserId from "@/hooks/use-user-id";
import {useRouter} from "next/router";
import AppContextProvider from "@/app.context";

const queryClient = new QueryClient();

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
    const userId = useUserId();

    const {push} = useRouter();

    const logoutHandler = () => {
        sessionStorage.removeItem('logged-user-id');
        push('/');
    }

    return (
        <QueryClientProvider client={queryClient}>
            <ChakraProvider theme={theme}>
                <AppContextProvider>
                    <Flex minHeight="100dvh" direction="column">
                        <Box mb="2rem" py="2rem" backgroundColor="gray.100" as="header" textAlign="center">
                            <Heading as="h1">Morra Cinese</Heading>
                            {userId && <Button onClick={logoutHandler}>Logout</Button>}
                        </Box>
                        <Component {...pageProps} />
                    </Flex>
                </AppContextProvider>
            </ChakraProvider>
        </QueryClientProvider>
    );
}
