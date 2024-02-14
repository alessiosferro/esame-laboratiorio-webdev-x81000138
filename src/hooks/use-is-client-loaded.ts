import {useEffect, useState} from "react";

const useIsClientLoaded = () => {
    const [isClientLoaded, setIsClientLoaded] = useState(false);

    useEffect(() => {
        setIsClientLoaded(true);
    }, []);

    return isClientLoaded;
}

export default useIsClientLoaded;