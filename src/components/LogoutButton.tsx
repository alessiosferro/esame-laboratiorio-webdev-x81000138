import {Button} from "@chakra-ui/react";
import useUserId from "@/hooks/use-user-id";
import {useContext} from "react";
import {AppContext} from "@/app.context";
import {socket} from "@/pages/_app";

const LogoutButton = () => {
    const userId = useUserId();

    const {dispatch} = useContext(AppContext);

    const logoutHandler = () => {
        sessionStorage.removeItem('logged-user-id');

        dispatch({userId: ""});

        socket.disconnect();
    }

    return (
        <>
            {userId && <Button onClick={logoutHandler}>Logout</Button>}
        </>
    )
}

export default LogoutButton;