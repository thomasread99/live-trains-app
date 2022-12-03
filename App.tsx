import MainNavigator from "./navigation/MainNavigator";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";

import store from "./store/store";
import { StatusBar } from "react-native";

export default function App() {
	return (
		<Provider store={store}>
			<StatusBar backgroundColor="black"/>
			<SafeAreaProvider>
				<MainNavigator />
			</SafeAreaProvider>
		</Provider>
	);
}
