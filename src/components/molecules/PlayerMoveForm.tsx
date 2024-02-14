import {Box, Button, Radio, RadioGroup, Stack} from "@chakra-ui/react";
import {Controller, FormProvider, SubmitHandler, useForm} from "react-hook-form";
import {socket} from "@/pages/_app";
import {useRouter} from "next/router";
import {useContext} from "react";
import {AppContext} from "@/app.context";

const PlayerMoveForm = () => {
    const {query} = useRouter();
    const {state: {userId}} = useContext(AppContext);

    const form = useForm({
        defaultValues: {
            move: ""
        }
    });
    const submitMoveHandler: SubmitHandler<{ move: string }> = ({move}) => {
        form.reset();
        socket.emit('newMove', {roomName: query.room, userId, move});
    }

    return (
        <FormProvider {...form}>
            <Box as="form" onSubmit={form.handleSubmit(submitMoveHandler)}>
                <fieldset>
                    <Box as="legend" fontWeight="bold" mb=".5rem">Mossa</Box>
                    <Controller name="move"
                                render={({field: {onChange, value}}) => <RadioGroup onChange={onChange}
                                                                                    value={value}>
                                    <Stack spacing="1rem" direction='row'>
                                        <Radio value="sasso">Sasso</Radio>
                                        <Radio value="forbice">Forbice</Radio>
                                        <Radio value="carta">Carta</Radio>
                                    </Stack>
                                </RadioGroup>}
                    />
                </fieldset>

                <Button mt="2rem" type="submit">Invia</Button>
            </Box>
        </FormProvider>
    )
}

export default PlayerMoveForm;