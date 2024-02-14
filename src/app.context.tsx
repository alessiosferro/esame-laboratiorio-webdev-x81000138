import {createContext, Dispatch, PropsWithChildren, Reducer, ReducerAction, useReducer} from "react";

interface AppState {
    userId: string
}

interface ContextModel {
    state: AppState;
    dispatch: Dispatch<ReducerAction<AppReducer>>;
}

export type AppReducer = Reducer<
    AppState,
    AppState
>;

export const AppContext = createContext<ContextModel>({
    state: {userId: ""},
    dispatch: () => {
    }
})

const AppContextProvider = (props: PropsWithChildren) => {
    const [state, dispatch] = useReducer<AppReducer>(
        (state, action) => ({...state, ...action}),
        {userId: ""}
    );

    return (
        <AppContext.Provider value={{state, dispatch}}>{props.children}</AppContext.Provider>
    )
}

export default AppContextProvider;