import { Link } from "@react-navigation/native"
import { Settings } from "@screens/Settings"
import { Text } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

export const Chat: React.FC = () => {
	return (
		<SafeAreaView>
			<Text>Chat</Text>
			<Link screen={'Settings'}>
				<Text>Settings</Text>
			</Link>
			<Link screen={'MapDirections'}>
				<Text>MapDirections</Text>
			</Link>
		</SafeAreaView>
	)
}
