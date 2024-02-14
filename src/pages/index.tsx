import Link from "next/link";
import {Input} from "@chakra-ui/input";
import {Button, Flex, Link as ChakraLink, FormControl, FormLabel} from "@chakra-ui/react";
import {Controller, FormProvider, useForm, useWatch} from "react-hook-form";
import LoginUserModel from "@/model/login-user.model";
import useGetUserByEmail from "@/hooks/use-get-user-by-email";
import useRedirectEffect from "@/hooks/use-redirect-effect";
import useUserId from "@/hooks/use-user-id";
import useIsClientLoaded from "@/hooks/use-is-client-loaded";
import {useRouter} from "next/router";

export default function Home() {
    const isClientLoaded = useIsClientLoaded();

    const form = useForm<LoginUserModel>({
        defaultValues: {
            email: ""
        }
    });

    const email = useWatch({control: form.control, name: 'email'});

    const {refetch: getUserByEmail} = useGetUserByEmail(email);

    const userId = useUserId();

    const { push } = useRouter();

    const submitHandler = async () => {
        const {data: user} = await getUserByEmail();

        if (!user) return;

        const {id} = user;

        window.sessionStorage.setItem('logged-user-id', id);

        void push('/dashboard');
    }

    useRedirectEffect();

    if (!isClientLoaded || !!userId) return null;

    return (
        <FormProvider {...form}>
            <Flex gap="2rem"
                  direction="column"
                  px="5rem"
                  as="main"
                  flex={1}>
                <Flex as="form" direction="column" gap="1rem" onSubmit={form.handleSubmit(submitHandler)}>
                    <Controller name="email" render={({field: {onChange}}) => (
                        <FormControl>
                            <FormLabel>E-Mail</FormLabel>
                            <Input onChange={onChange}/>
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
