import {useEffect, useState} from "react";

const useUserId = () => {
    const [userId, setUserId] = useState<string>("");

    useEffect(() => {
        const userId = window.sessionStorage.getItem('logged-user-id');

        if (!userId) return;

        setUserId(userId);
    }, []);

    return userId;
}

export default useUserId;
