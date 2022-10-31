import MainNavigator from "./navigation/MainNavigator";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";

import store from "./store/store";

export default function App() {
	return (
		<Provider store={store}>
			<SafeAreaProvider>
				<MainNavigator />
			</SafeAreaProvider>
		</Provider>
	);
}
