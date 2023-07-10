import { Provider } from "react-redux";
import { store } from "./store";

export const Providers: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => <Provider store={store}>{children}</Provider>;
