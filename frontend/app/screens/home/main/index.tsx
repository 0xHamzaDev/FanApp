import { observer } from "mobx-react-lite";
import React, { FC, useState } from "react";
import { View, StyleSheet, TouchableOpacity, ScrollView, Image } from "react-native";
import { Screen, Text, GoBackButton } from "@components";
import { AppStackScreenProps } from "@navigators";
import { colors, spacing } from "@theme";
import Ionicons from "react-native-vector-icons/Ionicons";
import { test } from '@services/api/authService';

interface HomeScreenProps extends AppStackScreenProps<"Home"> { }

export const HomeScreen: FC<HomeScreenProps> = observer(function HomeScreen({ navigation }) {
	const [activePage, setActivePage] = useState('main');

	const navigationCards = [
		{ id: 1, icon: "document-text-outline", label: "توثيق الحضور", screen: "Documentation" },
		{ id: 2, icon: "ticket-outline", label: "التذاكر", screen: "Tickets" },
		{ id: 3, icon: "location-outline", label: "نقطة التجمع", screen: "GatheringPoint" },
		{ id: 4, icon: "musical-notes-outline", label: "أهازيج", screen: "Songs" },
		{ id: 5, icon: "people-outline", label: "المشرفين", screen: "Admins" },
		{ id: 6, icon: "person-outline", label: "بياناتي", screen: "profile" },
		{ id: 7, icon: "star-outline", label: "نقاطي", screen: "Points" },
		{ id: 8, icon: "wallet-outline", label: "ويبك", screen: "Wallet" },
		{ id: 9, icon: "help-circle-outline", label: "الدعم الفني", screen: "Support" },
		{ id: 10, icon: "shirt-outline", label: "تيشرتات", screen: "Shirts" },
	];

	return (
		<Screen preset="auto" style={{ paddingHorizontal: 4 }} backgroundColor={colors.background} safeAreaEdges={["top"]}>
			<View style={styles.titleContainer}>
				<Text style={styles.title} text={"الرئيسية"} />
			</View>
			<View style={styles.cardsContainer}>
				{navigationCards.map(card => (
					<TouchableOpacity
						key={card.id}
						style={styles.card}
						onPress={() => navigation.navigate(card.screen)}
					>
						<Ionicons name={card.icon} size={66} style={styles.cardsIcon} />
						<Text text={card.label} style={styles.cardsLabel} />
					</TouchableOpacity>
				))}
			</View>
		</Screen>
	);
});

const styles = StyleSheet.create({
	titleContainer: {
		marginRight: spacing.sm,
		marginVertical: spacing.sm,
	},
	header: {
		alignSelf: 'flex-end',
		color: colors.themecolor,
		fontFamily: 'JannaBold',
		fontSize: 45,
		lineHeight: 50,
		marginBottom: spacing.sm,
		paddingHorizontal: spacing.md,
		paddingTop: 65,
		textAlign: 'right',
	},
	title: {
		fontSize: 28,
		paddingVertical: 6,
		paddingHorizontal: 10,
		fontWeight: "bold",
		textAlign: "right",
		color: "#005b5c",
		fontFamily: "JannaBold",
		marginTop: spacing.sm
	},
	cardsContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		flexWrap: "wrap",
	},
	card: {
		backgroundColor: "#ffffff",
		padding: 20,
		borderRadius: 15,
		margin: spacing.sm,
		width: "27%",
		alignItems: "center",
		justifyContent: "center",
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 15,
		},
		shadowOpacity: 0.1,
		shadowRadius: 15,
		elevation: 10,
	},
	cardsIcon: {
		color: "#616161"
	},
	cardsLabel: {
		marginTop: spacing.sm,
		fontSize: 14,
		color: "#616161",
		fontFamily: "Janna"
	},
	pageContainer: {
		flex: 1,
		width: '100%',
		justifyContent: 'center',
		alignItems: 'center',
	},
});
