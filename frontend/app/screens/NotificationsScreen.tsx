import { observer } from "mobx-react-lite"
import React, { FC } from "react";
import { View, StyleSheet } from "react-native";
import { Screen, Button, Text } from "../components";
import { AppStackScreenProps } from "../navigators";
import { colors, spacing } from "../theme";
import { useAuth } from "../context";


interface NotificationsScreenProps extends AppStackScreenProps<"Notfications"> { }

export const NotificationsScreen: FC<NotificationsScreenProps> = observer(function NotificationsScreen({ navigation }) {
	return (
		<Screen preset="auto" style={{ paddingHorizontal: spacing.sm }} backgroundColor={colors.mainBackground} safeAreaEdges={["top"]}>
			<View style={styles.sortContainer}>

			</View>
			<View style={styles.notificationsContainer}>
				<View style={styles.notificationCard}>
					<Text text="notification" />
				</View>
			</View>
		</Screen>
	);
});

const styles = StyleSheet.create({
	notificationsContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		flexWrap: 'wrap'
	},
	notificationCard: {
		backgroundColor: colors.palette.neutral100,
		padding: spacing.sm,
		borderRadius: 5,
		paddingHorizontal: spacing.sm,
		width: '100%',
		alignItems: 'center',
		justifyContent: 'center',
	}
});