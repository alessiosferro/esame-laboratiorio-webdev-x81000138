import {Button, ButtonProps} from "@chakra-ui/react";
import {useContext} from "react";
import {AppContext} from "@/app.context";
import {socket} from "@/pages/_app";

const LogoutButton = (props?: ButtonProps) => {
    const {dispatch, state: {userId}} = useContext(AppContext);

    const logoutHandler = () => {
        sessionStorage.removeItem('logged-user-id');
        socket.emit('logout', userId);
        dispatch({userId: ""});
    }

    if (!userId) return null;

    return (
        <Button {...props} mt="6rem" minWidth="15rem" onClick={logoutHandler}>Logout</Button>
    )
}

export default LogoutButton;