import {useEffect, useState} from "react";
import useIsClientLoaded from "@/hooks/use-is-client-loaded";
import useRouteGuard from "@/hooks/use-route-guard";
import useUserId from "@/hooks/use-user-id";
import {socket} from "@/pages/_app";
import DashboardRooms from "@/components/molecules/DashboardRooms";
import DashboardUsers from "@/components/molecules/DashboardUsers";
import MessageList from "@/components/molecules/MessageList";
import SendMessageForm from "@/components/molecules/SendMessageForm";

const DashboardPage = () => {
    const [users, setUsers] = useState<{ id: string, socketId: string }[]>([]);
    const [messages, setMessages] = useState<{ userId: string, message: string }[]>([]);
    const [rooms, setRooms] = useState<string[]>([]);

    const isClientLoaded = useIsClientLoaded();
    const userId = useUserId();

    useEffect(() => {
        if (!userId) return;

        // add new userId
        socket.on('connect', () => {
            socket.emit('newUser', {socketId: socket.id, id: userId});
        });

        // retrieve latest data
        socket.emit('getRooms');
        socket.emit('getUsers');
        socket.emit('getMessages');

        // update data
        socket.on('users', usersConnected => setUsers(usersConnected));
        socket.on('rooms', rooms => setRooms(rooms));
        socket.on('messages', messages => setMessages(messages));

    }, [userId]);

    useRouteGuard();

    if (!isClientLoaded || !userId) {
        return null;
    }

    return (
        <>
            <DashboardUsers users={users}/>

            <DashboardRooms rooms={rooms} userId={userId}/>

            <MessageList messages={messages}/>

            <SendMessageForm userId={userId}/>
        </>
    );
}

export default DashboardPage;