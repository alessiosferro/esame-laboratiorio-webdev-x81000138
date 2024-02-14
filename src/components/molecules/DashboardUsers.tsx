import {Heading, List, ListItem, Text} from "@chakra-ui/react";
import {UserConnected} from "@/model/user.model";
import {useMemo} from "react";
import useGetUsers from "@/hooks/use-get-users";

interface DashboardUsersProps {
    users: UserConnected[];
}

const DashboardUsers = (props: DashboardUsersProps) => {
    const {
        users
    } = props;

    const {data: dbUsers} = useGetUsers();

    const usersConnected = useMemo(() => {
        if (!dbUsers) {
            return users.map(user => user.id);
        }

        return users.map(user => {
            const dbUser = dbUsers.find(u => u.id === user.id);

            if (!dbUser) {
                return user.id;
            }

            const {nome, cognome} = dbUser;

            return `${nome} ${cognome}`;
        });
    }, [users, dbUsers]);


    return (
        <section>
            <Heading mb=".5rem" variant="h2">Utenti connessi</Heading>

            {!usersConnected.length ? (
                <Text>Al momento nessun utente è connesso.</Text>
            ) : (
                <List>
                    {usersConnected.map((user, index) => (
                        <ListItem key={index}>
                            {user}
                        </ListItem>
                    ))}
                </List>
            )}

        </section>
    )
}

export default DashboardUsers;