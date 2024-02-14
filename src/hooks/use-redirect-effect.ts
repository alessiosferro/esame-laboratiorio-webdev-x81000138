import {useContext, useEffect} from "react";
import {useRouter} from "next/router";
import {AppContext} from "@/app.context";

const useRedirectEffect = () => {
    const {push} = useRouter();

    const {state: {userId}} = useContext(AppContext);

    useEffect(() => {
        if (!userId) return;

        void push('/dashboard');

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId]);
}

export default useRedirectEffect;