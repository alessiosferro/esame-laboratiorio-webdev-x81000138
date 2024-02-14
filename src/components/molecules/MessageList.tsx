import {Flex, Heading, Text} from "@chakra-ui/react";
import {UserMessage} from "@/model/user.model";

interface MessageListProps {
    messages: UserMessage[];
}

const MessageList = (props: MessageListProps) => {
    const {
        messages
    } = props;

    return (
        <section>
            <Heading mb=".5rem" variant="h2">Chat</Heading>

            {!messages?.length ? (
                <Text>Al momento non è presente alcun messaggio.</Text>
            ) : (
                <Flex direction="column" gap=".5rem">
                    {messages.map((message, index) => (
                        <Text key={index}>
                            <strong>{message.fullName}</strong>:{" "}
                            {message.message}
                        </Text>
                    ))}
                </Flex>
            )}
        </section>
    );
}

export default MessageList;