import {useEffect, useMemo, useState} from "react";
import useIsClientLoaded from "@/hooks/use-is-client-loaded";
import useRouteGuard from "@/hooks/use-route-guard";
import useGetUsers from "@/hooks/use-get-users";
import useUserId from "@/hooks/use-user-id";
import {Controller, FormProvider, SubmitHandler, useForm} from "react-hook-form";
import {socket} from "@/pages/_app";
import {
    Button,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Link as ChakraLink,
    List,
    ListItem,
    Text
} from "@chakra-ui/react";
import Link from "next/link";
import {Input} from "@chakra-ui/input";

const DashboardPage = () => {
    const [users, setUsers] = useState<{ id: string, socketId: string }[]>([]);
    const [messages, setMessages] = useState<{ userId: string, message: string }[]>([]);
    const [rooms, setRooms] = useState<string[]>([]);

    const isClientLoaded = useIsClientLoaded();

    useRouteGuard();

    const {data: dbUsers} = useGetUsers();

    const userId = useUserId();

    const form = useForm({
        defaultValues: {
            message: ""
        }
    });

    useEffect(() => {
        if (!userId) return;

        socket.on('connect', () => {
            socket.emit('newUser', {socketId: socket.id, id: userId});
        });

        socket.emit('getRooms');

        socket.emit('getUsers');

        socket.emit('getMessages');

        socket.on('users', usersConnected => {
            setUsers(usersConnected)
        });

        socket.on('rooms', rooms => {
            setRooms(rooms);
        });

        socket.on('messages', messages => {
            setMessages(messages);
        });

    }, [userId]);

    const addRoomHandler = () => {
        socket.emit('addRoom');
    }

    const sendMessageHandler: SubmitHandler<{ message: string }> = ({message}) => {
        socket.emit('message', {userId, message});
        form.setValue("message", "");
    }

    const usersConnected = useMemo(() => {
        if (!dbUsers) return users.map(user => user.id);

        return users.map(user => {
            const dbUser = dbUsers.find(u => u.id === user.id);

            if (!dbUser) {
                return user.id;
            }

            const {nome, cognome} = dbUser;

            return `${nome} ${cognome}`;
        });
    }, [users, dbUsers]);

    if (!isClientLoaded || !userId) {
        return null;
    }

    return (
        <FormProvider {...form}>
            <Flex direction="column" gap="1rem" mx="2rem">
                <Heading variant="h2">Utenti connessi</Heading>

                <List>
                    {usersConnected.map((user, index) => (
                        <ListItem key={index}>
                            {user}
                        </ListItem>
                    ))}
                </List>

                <Heading variant="h2">Stanze di gioco</Heading>

                <List>
                    {rooms.map((room, index) => (
                        <ListItem key={index}>
                            <Link href={`/rooms/${room}`} passHref legacyBehavior>
                                <ChakraLink>
                                    {room}
                                </ChakraLink>
                            </Link>
                        </ListItem>
                    ))}
                </List>

                <Button onClick={addRoomHandler}>Crea nuova stanza di gioco</Button>

                <Heading variant="h2">Global Chat</Heading>

                <Flex direction="column" gap=".5rem">
                    {messages.map((message, index) => (
                        <Text key={index}>
                            {dbUsers &&
                                <strong>{dbUsers?.find(user => user.id === message.userId)?.nome}</strong>}:{" "}
                            {message.message}
                        </Text>
                    ))}
                </Flex>

                <Flex as="form" align="flex-end" gap=".5rem" onSubmit={form.handleSubmit(sendMessageHandler)}>
                    <Controller render={({field: {onChange, value}}) => (
                        <FormControl flex={1}>
                            <FormLabel>Messaggio</FormLabel>
                            <Input placeholder="Invia un nuovo messaggio" value={value} onChange={onChange}/>
                        </FormControl>
                    )} name="message"/>

                    <Button type="submit">Invia</Button>
                </Flex>
            </Flex>
        </FormProvider>
    );
}

export default DashboardPage;