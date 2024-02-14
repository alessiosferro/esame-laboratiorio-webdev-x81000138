import {Button, Heading, Link as ChakraLink, List, ListItem, Text} from "@chakra-ui/react";
import Link from "next/link";
import {socket} from "@/pages/_app";
import {useMemo} from "react";
import useGetUsers from "@/hooks/use-get-users";

interface DashboardRoomsProps {
    rooms: string[];
    userId: string;
}

const DashboardRooms = (props: DashboardRoomsProps) => {
    const {
        userId,
        rooms
    } = props;

    const {data: dbUsers} = useGetUsers();

    const currentUser = useMemo(() => {
        return dbUsers?.find(user => user.id === userId) || null;
    }, [userId, dbUsers]);

    const addRoomHandler = () => {
        socket.emit('addRoom', `Stanza di ${currentUser?.nome} ${currentUser?.cognome}`);
    }

    return (
        <section>
            <Heading variant="h2">Stanze di gioco</Heading>

            {!rooms.length ? (
                <Text mt=".5rem">Al momento non è ancora stata creata alcuna stanza.</Text>
            ) : (
                <List mt=".5rem">
                    {rooms.map((room, index) => (
                        <ListItem key={index}>
                            <Link href={`/rooms/${room}`} passHref legacyBehavior>
                                <ChakraLink>
                                    Unisciti alla stanza {room}
                                </ChakraLink>
                            </Link>
                        </ListItem>
                    ))}
                </List>
            )}

            <Button mt="1rem" alignSelf="flex-start" onClick={addRoomHandler}>Crea nuova stanza di gioco</Button>
        </section>
    )
}

export default DashboardRooms;