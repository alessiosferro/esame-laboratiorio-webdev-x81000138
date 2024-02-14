import {Button, ButtonProps} from "@chakra-ui/react";
import useUserId from "@/hooks/use-user-id";
import {useContext} from "react";
import {AppContext} from "@/app.context";
import {socket} from "@/pages/_app";

const LogoutButton = (props?: ButtonProps) => {
    const userId = useUserId();

    const {dispatch} = useContext(AppContext);

    const logoutHandler = () => {
        sessionStorage.removeItem('logged-user-id');

        dispatch({userId: ""});

        socket.disconnect();
    }

    if (!userId) return null;

    return (
        <Button {...props} onClick={logoutHandler}>Logout</Button>
    )
}

export default LogoutButton;