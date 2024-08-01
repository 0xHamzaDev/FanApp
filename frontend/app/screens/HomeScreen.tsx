import { observer } from "mobx-react-lite"
import React, { FC } from "react";
import { View } from "react-native";
import { Screen, Button } from "../components";
import { AppStackScreenProps } from "../navigators";
import { colors, spacing } from "../theme";
import { useAuth } from "../context";
import tw from 'twrnc';

interface HomeScreenProps extends AppStackScreenProps<"Home"> { }

export const HomeScreen: FC<HomeScreenProps> = observer(function HomeScreen(_props) {
	const { navigation } = _props;
	const { SignOut } = useAuth();

	const handleLogout = async () => {
		await SignOut();
		navigation.navigate("Login");
	};

	return (
		<Screen preset="auto" style={{ paddingHorizontal: spacing.sm }} backgroundColor={colors.mainBackground} safeAreaEdges={["top"]}>
			<View>
				<Button
					text="Logout"
					onPress={handleLogout}
					style={{ marginTop: spacing.md }}
				/>
			</View>
		</Screen>
	);
});