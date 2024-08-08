import { observer } from "mobx-react-lite"
import React, { FC } from "react";
import { View, StyleSheet } from "react-native";
import { Screen, Button } from "../components";
import { AppStackScreenProps } from "../navigators";
import { colors, spacing } from "../theme";
import { useAuth } from "../context";


interface ProfileScreenProps extends AppStackScreenProps<"Profile"> { }

export const ProfileScreen: FC<ProfileScreenProps> = observer(function ProfileScreen({ navigation }) {
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