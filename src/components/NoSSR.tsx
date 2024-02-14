import {PropsWithChildren} from "react";

const NoSSR = (props: PropsWithChildren) => {
    return (
        <>{props.children}</>
    );
}

