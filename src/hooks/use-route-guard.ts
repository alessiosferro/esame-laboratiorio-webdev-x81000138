import useUserId from "@/hooks/use-user-id";
import {useEffect} from "react";
import {useRouter} from "next/router";

const useRouteGuard = () => {
    const userId = useUserId();
    const { push } = useRouter();

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (userId) return;
            void push('/');
        }, 0);

        return () => {
            clearTimeout(timeoutId);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId]);
}

export default useRouteGuard;