import {useEffect} from "react";
import {useRouter} from "next/router";
import useUserId from "@/hooks/use-user-id";

const useRedirectEffect = () => {
    const { push } = useRouter();

    const userId = useUserId();

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (!userId) return;

            void push('/dashboard');
        }, 0);

        return () => {
            clearTimeout(timeoutId)
        };

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId]);
}

export default useRedirectEffect;