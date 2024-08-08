import { observer } from "mobx-react-lite"
import React, { FC } from "react";
import { View, StyleSheet } from "react-native";
import { Screen, Button } from "../components";
import { AppStackScreenProps } from "../navigators";
import { colors, spacing } from "../theme";
import { useAuth } from "../context";


interface SettingsScreenProps extends AppStackScreenProps<"Settings"> { }

export const SettingsScreen: FC<SettingsScreenProps> = observer(function SettingsScreen(_props) {
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
					textStyle={styles.text}
				/>
			</View>
		</Screen>
	);
});

const styles = StyleSheet.create({
	text: {
		color: colors.background,
	},
});