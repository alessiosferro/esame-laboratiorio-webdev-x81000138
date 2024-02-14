import useRouteGuard from "@/hooks/use-route-guard";
import useUserId from "@/hooks/use-user-id";
import useIsClientLoaded from "@/hooks/use-is-client-loaded";
import {Flex, Heading} from "@chakra-ui/react";

const DashboardPage = () => {
    const isClientLoaded = useIsClientLoaded();

    useRouteGuard();

    const userId = useUserId();

    if (!isClientLoaded || !userId) {
        return null;
    }

    return (
        <>
            <Flex direction="column" mx="2rem">
                <Heading variant="h2">Dashboard</Heading>
            </Flex>
        </>
    )
}

export default DashboardPage;