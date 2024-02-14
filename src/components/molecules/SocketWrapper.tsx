import {PropsWithChildren, useContext, useEffect} from "react";
import {socket} from "@/pages/_app";
import {AppContext} from "@/app.context";

const SocketWrapper = (props: PropsWithChildren) => {
    const {dispatch} = useContext(AppContext);

    useEffect(() => {
        socket.on('newUser', userId => {
            dispatch({userId});
        });

        socket.on('connect', () => {
            const userId = sessionStorage.getItem('logged-user-id');

            if (!userId) return;

            socket.emit('login', {socketId: socket.id, id: userId});
        });

        return () => {
            socket.off('connect');
            socket.off('newUser');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>{props.children}</>
    );
}

export default SocketWrapper;