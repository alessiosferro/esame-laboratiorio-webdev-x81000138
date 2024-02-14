import {Button, Heading, List, ListItem, Text} from "@chakra-ui/react";
import {UserMove} from "@/model/user.model";
import {socket} from "@/pages/_app";
import {useRouter} from "next/router";

interface PlayerMovesProps {
    moves: UserMove[];
    winnerUser: string | null;
}

const PlayerMoves = (props: PlayerMovesProps) => {
    const {
        moves,
        winnerUser
    } = props;

    const {query} = useRouter();

    const resetRoomHandler = () => {
        socket.emit('resetRoomMoves', query.room);
    }

    return (
        <section>
            <Heading mb="1rem">Mosse</Heading>

            {!moves?.length ? (
                <Text>Nessun giocatore ha fatto una mossa</Text>
            ) : (
                <List>
                    {moves.map((move, index) => (
                        <ListItem key={index}>Il giocatore {move.fullName} {winnerUser ? <>ha
                            giocato {move.move}</> : <>ha fatto la sua mossa</>}.</ListItem>
                    ))}
                </List>
            )}

            {winnerUser && (
                <>
                    <Text mb="1rem">Il giocatore {winnerUser} ha vinto!</Text>

                    <Button onClick={resetRoomHandler}>Riprova</Button>
                </>
            )}
        </section>
    )
}

export default PlayerMoves;