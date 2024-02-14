import {Button, Flex, FormControl, FormLabel, Heading, VisuallyHidden} from "@chakra-ui/react";
import {Controller, FormProvider, SubmitHandler, useForm} from "react-hook-form";
import {Input} from "@chakra-ui/input";

interface SendMessageFormProps {
    onSubmit: (message: string) => void;
}

const SendMessageForm = (props: SendMessageFormProps) => {
    const {
        onSubmit,
    } = props;

    const form = useForm({
        defaultValues: {
            message: ""
        }
    });

    const submitHandler: SubmitHandler<{ message: string }> = ({message}) => {
        form.reset();
        onSubmit(message);
    }

    return (
        <FormProvider {...form}>
            <section>
                <Heading mb="1rem" variant="h2">Cosa stai pensando?</Heading>

                <Flex as="form" align="flex-end" gap=".5rem"
                      onSubmit={form.handleSubmit(submitHandler)}>
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