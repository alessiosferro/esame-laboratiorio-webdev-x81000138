import {Flex, Heading, Text} from "@chakra-ui/react";
import {UserMessage} from "@/model/user.model";
import useGetUsers from "@/hooks/use-get-users";

interface MessageListProps {
    messages: UserMessage[];
}

const MessageList = (props: MessageListProps) => {
    const {
        messages
    } = props;

    const {data: dbUsers} = useGetUsers();

    return (
        <section>
            <Heading mb=".5rem" variant="h2">Chat</Heading>

            {!messages.length ? (
                <Text>Al momento non è presente alcun messaggio.</Text>
            ) : (
                <Flex direction="column" gap=".5rem">
                    {messages.map((message, index) => (
                        <Text key={index}>
                            {dbUsers &&
                                <strong>{dbUsers?.find(user => user.id === message.userId)?.nome}</strong>}:{" "}
                            {message.message}
                        </Text>
                    ))}
                </Flex>
            )}
        </section>
    );
}

export default MessageList;