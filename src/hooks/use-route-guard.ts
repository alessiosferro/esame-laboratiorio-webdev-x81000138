import {useContext, useEffect} from "react";
import {useRouter} from "next/router";
import {AppContext} from "@/app.context";

const useRouteGuard = () => {
    const {state: {userId}} = useContext(AppContext);
    const {push} = useRouter();

    useEffect(() => {
        if (userId) return;

        void push('/');

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId]);
}

export default useRouteGuard;