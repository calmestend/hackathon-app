import { LocationProvider } from "@contexts/locationContext";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Chat } from "./tabs/Chat";

const Home: React.FC = () => {
	const Tabs = createBottomTabNavigator();

	return (
		<LocationProvider>
			<Tabs.Navigator
				screenOptions={{
					headerShown: false,
				}}
			>
				<Tabs.Screen name="Chat" component={Chat} />
			</Tabs.Navigator>
		</LocationProvider>
	);
};

export default Home;

