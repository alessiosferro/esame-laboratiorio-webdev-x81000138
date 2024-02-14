import {Heading, List, ListItem, Text} from "@chakra-ui/react";
import {UserConnected} from "@/model/user.model";

interface DashboardUsersProps {
    users: UserConnected[];
}

const DashboardUsers = (props: DashboardUsersProps) => {
    const {
        users
    } = props;

    return (
        <section>
            <Heading mb=".5rem" variant="h2">Utenti connessi</Heading>

            {!users.length ? (
                <Text>Al momento nessun utente è connesso.</Text>
            ) : (
                <List>
                    {users.map((user, index) => (
                        <ListItem key={index}>
                            {user.fullName}
                        </ListItem>
                    ))}
                </List>
            )}
        </section>
    )
}

export default DashboardUsers;