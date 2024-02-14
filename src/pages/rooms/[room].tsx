import {useRouter} from "next/router";
import {Box, Flex, Heading, Link as ChakraLink, Text} from "@chakra-ui/react";
import Link from "next/link";
import {useContext, useEffect, useMemo, useState} from "react";
import {socket} from "@/pages/_app";
import MessageList from "@/components/molecules/MessageList";
import {UserMessage, UserMove} from "@/model/user.model";
import SendMessageForm from "@/components/molecules/SendMessageForm";
import useRouteGuard from "@/hooks/use-route-guard";
import {AppContext} from "@/app.context";
import PlayerMoveForm from "@/components/molecules/PlayerMoveForm";
import PlayerMoves from "@/components/molecules/PlayerMoves";

const RoomNumberPage = () => {
    const {query} = useRouter();
    const [moves, setMoves] = useState<UserMove[]>([]);
    const [messages, setMessages] = useState<UserMessage[]>([]);
    const [winnerUser, setWinnerUser] = useState<string | null>(null);
    const {state: {userId}} = useContext(AppContext);

    const onWinner = (winnerUser: string | null) => setWinnerUser(winnerUser);
    const onResetWinner = () => setWinnerUser(null);
    const onRoomMessages = (messages: UserMessage[]) => setMessages(messages);
    const onRoomMoves = (moves: UserMove[]) => setMoves(moves);

    useEffect(() => {
        socket.emit("joinRoom", query.room);
        socket.emit('getRoomMessages', query.room);
        socket.emit('getRoomMoves', query.room);

        socket.on('winner', onWinner);
        socket.on('resetWinner', onResetWinner)
        socket.on('roomMessages', onRoomMessages);
        socket.on('move', onRoomMoves);

        return () => {
            socket.emit("leaveRoom", query.room);

            socket.off('winner', onWinner);
            socket.off('resetWinner', onResetWinner);
            socket.off('roomMessages', onRoomMessages);
            socket.off('move', onRoomMoves);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    const sendMessageHandler = (message: string) => {
        socket.emit('roomMessage', {roomName: query.room, userId, message});
    }


    const resetRoomHandler = () => {
        socket.emit('resetRoomMoves', query.room);
    }

    const hasPlayed = useMemo(() => moves.find(move => move.userId === userId), [moves, userId]);

    useRouteGuard();

    return (
        <Flex as="section" direction="column" gap="2rem">
            <Box>
                <Link href="/dashboard" passHref legacyBehavior>
                    <ChakraLink>Torna indietro</ChakraLink>
                </Link>

                <Heading my="1rem" variant="h2">Stanza di gioco {query.room}</Heading>
                <Text>Scegli una mossa e attendi la mossa dell&apos;altro giocatore.</Text>
            </Box>

            {!hasPlayed && <PlayerMoveForm/>}

            <PlayerMoves moves={moves} winnerUser={winnerUser}/>
            <MessageList messages={messages}/>
            <SendMessageForm onSubmit={sendMessageHandler}/>
        </Flex>
    );
}

export default RoomNumberPage;