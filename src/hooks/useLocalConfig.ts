import { State } from "@/store/store";
import { Dispatch, SetStateAction } from "react";
import useLocalStorage from "./useLocalStorage";

const useLocalConfig = (
    initialState: State
): [State, Dispatch<SetStateAction<State>>] => {
    const [config, setConfig] = useLocalStorage<State>("config", initialState);

    return [config, setConfig];
};

export default useLocalConfig;
