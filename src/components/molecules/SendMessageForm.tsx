import {Button, Flex, FormControl, FormLabel, Heading, VisuallyHidden} from "@chakra-ui/react";
import {Controller, FormProvider, SubmitHandler, useForm} from "react-hook-form";
import {Input} from "@chakra-ui/input";
import {socket} from "@/pages/_app";

interface SendMessageFormProps {
    userId: string;
}

const SendMessageForm = (props: SendMessageFormProps) => {
    const {
        userId
    } = props;

    const form = useForm({
        defaultValues: {
            message: ""
        }
    });

    const sendMessageHandler: SubmitHandler<{ message: string }> = ({message}) => {
        socket.emit('message', {userId, message});
        form.setValue("message", "");
    }

    return (
        <FormProvider {...form}>
            <section>
                <Heading mb="1rem" variant="h2">Cosa stai pensando?</Heading>

                <Flex as="form" align="flex-end" gap=".5rem" onSubmit={form.handleSubmit(sendMessageHandler)}>
                    <Controller name="message" render={({field: {onChange, value}}) => (
                        <FormControl flex={1}>
                            <VisuallyHidden>
                                <FormLabel>Nuovo messaggio</FormLabel>
                            </VisuallyHidden>
                            <Input placeholder="Messaggio" value={value} onChange={onChange}/>
                        </FormControl>
                    )}/>

                    <Button type="submit">Invia</Button>
                </Flex>
            </section>
        </FormProvider>
    )
}

export default SendMessageForm;