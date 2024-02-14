import {useContext, useEffect} from "react";
import {AppContext} from "@/app.context";

const useUserId = () => {
    const {state: {userId}, dispatch} = useContext(AppContext);

    useEffect(() => {
        const id = window.sessionStorage.getItem('logged-user-id');

        if (!id) return;

        dispatch({
            userId: id
        });

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return userId;
}

export default useUserId;
