import Link from "next/link";
import {Input} from "@chakra-ui/input";
import {Button, Flex, FormControl, FormLabel, Heading, Link as ChakraLink} from "@chakra-ui/react";
import {Controller, FormProvider, useForm, useWatch} from "react-hook-form";
import LoginUserModel from "@/model/login-user.model";
import useGetUserByEmail from "@/hooks/use-get-user-by-email";
import useRedirectEffect from "@/hooks/use-redirect-effect";
import useIsClientLoaded from "@/hooks/use-is-client-loaded";
import {socket} from "@/pages/_app";
import {useContext} from "react";
import {AppContext} from "@/app.context";

export default function Home() {
    const isClientLoaded = useIsClientLoaded();

    const form = useForm<LoginUserModel>({
        defaultValues: {
            email: ""
        }
    });

    const email = useWatch({control: form.control, name: 'email'});

    const {refetch: getUserByEmail} = useGetUserByEmail(email);

    const {state: {userId}} = useContext(AppContext);

    const submitHandler = async () => {
        const {data: user} = await getUserByEmail();

        if (!user) return;

        socket.emit('login', {socketId: socket.id, id: user.id});

        sessionStorage.setItem('logged-user-id', user.id);
    }

    useRedirectEffect();

    if (!isClientLoaded || !!userId) return null;

    return (
        <FormProvider {...form}>
            <Flex gap="2rem"
                  direction="column"
                  as="section"
                  flex={1}>
                <Heading variant="h2">Login</Heading>

                <Flex as="form" direction="column" gap="1rem" onSubmit={form.handleSubmit(submitHandler)}>
                    <Controller rules={{required: true}} name="email" render={({field: {onChange}}) => (
                        <FormControl>
                            <FormLabel>E-Mail</FormLabel>
                            <Input type="email" onChange={onChange}/>
                        </FormControl>
                    )}/>

                    <Button type="submit">Login</Button>
                </Flex>

                <Link passHref legacyBehavior href="/register">
                    <ChakraLink>
                        Non sei ancora registrato?
                    </ChakraLink>
                </Link>
            </Flex>
        </FormProvider>
    );
}
