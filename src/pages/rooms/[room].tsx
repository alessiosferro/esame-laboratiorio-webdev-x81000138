import {useRouter} from "next/router";
import {Flex, Heading, Link as ChakraLink} from "@chakra-ui/react";
import Link from "next/link";
import {useEffect, useState} from "react";
import {socket} from "@/pages/_app";

const RoomNumberPage = () => {
    const {query} = useRouter();

    const [messages, setMessages] = useState<string[]>([]);

    useEffect(() => {
        socket.emit('getRoomMessages', query.room);
    }, []);

    return (
        <Flex mx="2rem" gap="2rem" direction="column">
            <Heading variant="h2">Stanza di gioco {query.room}</Heading>

            <Link href="/dashboard" passHref legacyBehavior>
                <ChakraLink>Torna indietro</ChakraLink>
            </Link>
        </Flex>
    );
}

export default RoomNumberPage;