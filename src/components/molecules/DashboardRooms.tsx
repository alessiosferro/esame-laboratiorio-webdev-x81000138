import {Button, Heading, Link as ChakraLink, List, ListItem, Text} from "@chakra-ui/react";
import Link from "next/link";
import {socket} from "@/pages/_app";
import {useMemo} from "react";
import RoomModel from "@/model/room.model";

interface DashboardRoomsProps {
    rooms: Record<number, RoomModel>;
}

const DashboardRooms = (props: DashboardRoomsProps) => {
    const {
        rooms
    } = props;

    const roomEntries = useMemo(() => Object.entries(rooms), [rooms]);

    const addRoomHandler = () => {
        socket.emit('addRoom');
    }

    return (
        <section>
            <Heading variant="h2">Stanze di gioco</Heading>

            {!roomEntries?.length ? (
                <Text mt=".5rem">Al momento non è ancora stata creata alcuna stanza.</Text>
            ) : (
                <List mt=".5rem">
                    {roomEntries.filter(([, {usersConnected}]) => usersConnected < 2).map(([roomName, {usersConnected}], index) => (
                        <ListItem key={index}>
                            <Link href={`/rooms/${roomName}`} passHref legacyBehavior>
                                <ChakraLink>
                                    Unisciti alla stanza {roomName} ({usersConnected}/2)
                                </ChakraLink>
                            </Link>
                        </ListItem>
                    ))}
                </List>
            )}

            <Button mt="1rem" alignSelf="flex-start" onClick={addRoomHandler}>Crea nuova stanza</Button>
        </section>
    )
}

export default DashboardRooms;