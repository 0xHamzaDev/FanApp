import { observer } from "mobx-react-lite";
import React, { FC, useState } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Screen, Text, GoBackButton, CustomDialog } from "../components";
import { AppStackScreenProps } from "../navigators";
import { colors, spacing } from "../theme";
import { Switch } from 'react-native-paper';
import Ionicons from "react-native-vector-icons/Ionicons";

// Pages to be rendered for each option
const NotificationsPage = ({ notificationSwitch, notificationHandler }) => (
	<View style={styles.notificationContainer}>
		<View style={styles.optionContainer}>
			<View style={styles.optionIconContainer}>
				<Ionicons name={"notifications-outline"} size={36} color={colors.themecolor} />
			</View>
			<Text style={styles.optionText}>{"الإشعارات"}</Text>
			<Switch value={notificationSwitch} onValueChange={notificationHandler} color={colors.themecolor} />
		</View>
	</View>
);

const ReportProblemPage = () => (
	<View style={styles.pageContainer}>
		<Text style={styles.pageText}>الإبلاغ عن مشكلة</Text>
	</View>
);

const SupportPage = () => (
	<View style={styles.pageContainer}>
		<Text style={styles.pageText}>الدعم الفني</Text>
	</View>
);

const PrivacyPolicyPage = () => (
	<View style={styles.pageContainer}>
		<Text style={styles.pageText}>سياسة الخصوصية</Text>
	</View>
);

const TermsOfUsePage = () => (
	<View style={styles.pageContainer}>
		<Text style={styles.pageText}>سياسة الإستخدام</Text>
	</View>
);

interface SettingsScreenProps extends AppStackScreenProps<"Settings"> { }

export const SettingsScreen: FC<SettingsScreenProps> = observer(function SettingsScreen({ navigation }) {
	const [activePage, setActivePage] = useState('main');
	const [notificationSwitch, changeNotificationSwitch] = useState(true);
	const [dialogVisible, setDialogVisible] = useState(false);

	const notificationHandler = () => {
		changeNotificationSwitch(!notificationSwitch);
	}

	const handleDialogClose = () => {
		setDialogVisible(false);
	};

	const settingsOptions = [
		{ label: "الإشعارات", icon: "notifications-outline", onPress: () => { setActivePage('notifications'); } },
		{ label: "الإبلاغ عن مشكلة", icon: "chatbubble-ellipses-outline", onPress: () => { setActivePage('reportProblem'); } },
		{ label: "الدعم الفني", icon: "call-outline", onPress: () => { setActivePage('support'); } },
		{ label: "سياسة الخصوصية", icon: "document-text-outline", onPress: () => { setActivePage('privacyPolicy'); } },
		{ label: "سياسة الإستخدام", icon: "document-text-outline", onPress: () => { setActivePage('termsOfUse'); } },
		{ label: "تسجيل خروج", icon: "log-out-outline", onPress: () => { setDialogVisible(true); } },
	];

	return (
		<Screen preset="auto" style={styles.screen} backgroundColor={colors.background} safeAreaEdges={["top"]}>
			<Text style={styles.header} text={"الإعدادات"} />
			<View style={styles.headerContainer}>
				<Text style={styles.headerText} text="الإعدادات العامة" />
				<View style={{ flex: 0.5, height: 1, backgroundColor: '#d6dadb' }} />
			</View>

			{activePage === 'main' && (
				<View style={styles.mainContainer}>
					{settingsOptions.map((option, index) => (
						<TouchableOpacity
							key={index}
							style={styles.optionContainer}
							onPress={option.onPress}
						>
							<View style={styles.optionIconContainer}>
								<Ionicons name={option.icon} size={36} color={colors.themecolor} />
							</View>
							<Text style={styles.optionText}>{option.label}</Text>
							<Ionicons name={'chevron-back-outline'} size={28} color={colors.themecolor} />
						</TouchableOpacity>
					))}
				</View>
			)}

			{activePage === 'notifications' && (
				<>
					<GoBackButton onPress={() => setActivePage('main')} />
					<NotificationsPage
						notificationSwitch={notificationSwitch}
						notificationHandler={notificationHandler}
					/>
				</>
			)}

			{activePage === 'reportProblem' && (
				<>
					<GoBackButton onPress={() => setActivePage('main')} />
					<ReportProblemPage />
				</>
			)}

			{activePage === 'support' && (
				<>
					<GoBackButton onPress={() => setActivePage('main')} />
					<SupportPage />
				</>
			)}

			{activePage === 'privacyPolicy' && (
				<>
					<GoBackButton onPress={() => setActivePage('main')} />
					<PrivacyPolicyPage />
				</>
			)}

			{activePage === 'termsOfUse' && (
				<>
					<GoBackButton onPress={() => setActivePage('main')} />
					<TermsOfUsePage />
				</>
			)}

			<CustomDialog
				title={'تسجيل خروج'}
				description={'هل أنت متأكد أنك تريد تسجيل الخروج؟'}
				visible={dialogVisible}
				onAllow={handleDialogClose}
				onDeny={handleDialogClose}
			/>
		</Screen>
	);
});

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		backgroundColor: colors.background,
	},
	mainContainer: {
		flex: 1,
		marginTop: spacing.md,
	},
	header: {
		paddingTop: 65,
		fontSize: 45,
		lineHeight: 50,
		fontFamily: "JannaBold",
		color: colors.themecolor,
		marginBottom: spacing.sm,
		textAlign: "right",
		alignSelf: "flex-end",
		paddingHorizontal: spacing.md,
	},
	headerContainer: {
		flex: 1,
		paddingTop: 26,
		paddingHorizontal: spacing.lg,
	},
	headerText: {
		fontFamily: "Janna",
		fontSize: 16,
		textAlign: "right",
		color: "#282828",
		marginBottom: spacing.xs
	},
	optionContainer: {
		flexDirection: "row-reverse",
		alignItems: "center",
		paddingBottom: spacing.md,
		paddingHorizontal: spacing.lg,
		marginBottom: spacing.xs,
		width: "100%",
	},
	optionIconContainer: {
		padding: spacing.sm,
		justifyContent: "center",
		alignItems: "center",
		marginLeft: spacing.md,
		borderRadius: 32,
		backgroundColor: '#ffffff'
	},
	optionText: {
		flex: 1,
		fontSize: 18,
		fontFamily: "JannaMed",
		color: colors.text,
		textAlign: "right",
		paddingRight: spacing.xs,
	},
	notificationContainer: {
		flex: 1,
		marginTop: spacing.md,
	},
	pageContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	pageText: {
		fontSize: 20,
		fontFamily: "JannaMed",
		color: colors.text,
	},
});
