import {useContext, useEffect, useState} from "react";
import useIsClientLoaded from "@/hooks/use-is-client-loaded";
import useRouteGuard from "@/hooks/use-route-guard";
import {socket} from "@/pages/_app";
import DashboardRooms from "@/components/molecules/DashboardRooms";
import DashboardUsers from "@/components/molecules/DashboardUsers";
import MessageList from "@/components/molecules/MessageList";
import SendMessageForm from "@/components/molecules/SendMessageForm";
import {UserConnected, UserMessage} from "@/model/user.model";
import {Rooms} from "@/model/room.model";
import {AppContext} from "@/app.context";

const DashboardPage = () => {
    const [users, setUsers] = useState<UserConnected[]>([]);
    const [messages, setMessages] = useState<UserMessage[]>([]);
    const [rooms, setRooms] = useState<Rooms>({});

    const isClientLoaded = useIsClientLoaded();
    const {state: {userId}} = useContext(AppContext);

    const onUsers = (usersConnected: UserConnected[]) => setUsers(usersConnected);
    const onRooms = (rooms: Rooms) => setRooms(rooms);

    console.log(users);

    const onMessages = (messages: UserMessage[]) => setMessages(messages);

    useEffect(() => {
        if (!userId) return;

        // retrieve latest data
        socket.emit('getRooms');
        socket.emit('getUsers');
        socket.emit('getMessages');

        // update data
        socket.on('users', onUsers);
        socket.on('rooms', onRooms);
        socket.on('messages', onMessages);

        return () => {
            socket.off('users', onUsers);
            socket.off('rooms', onRooms);
            socket.off('messages', onMessages);
            socket.off('connect');
        }
    }, [userId]);

    useRouteGuard();

    const sendMessageHandler = (message: string) => {
        socket.emit('message', {userId, message});
    }

    if (!isClientLoaded || !userId) {
        return null;
    }

    return (
        <>
            <DashboardUsers users={users}/>

            <DashboardRooms rooms={rooms}/>

            <MessageList messages={messages}/>

            <SendMessageForm onSubmit={sendMessageHandler}/>
        </>
    );
}

export default DashboardPage;