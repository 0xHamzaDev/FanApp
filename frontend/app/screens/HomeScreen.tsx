import { observer } from "mobx-react-lite";
import React, { FC, useState } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Screen, Text } from "../components";
import { AppStackScreenProps } from "../navigators";
import { colors, spacing } from "../theme";
import Ionicons from 'react-native-vector-icons/Ionicons';

interface HomeScreenProps extends AppStackScreenProps<"Home"> { }

export const HomeScreen: FC<HomeScreenProps> = observer(function HomeScreen({ navigation }) {
	const [activeCardId, setActiveCardId] = useState<number | null>(null);

	const cardData = [
		{ id: 1, icon: 'document-text-outline', label: 'توثيق الحضور', navigate: 'Settings' },
		{ id: 2, icon: 'ticket-outline', label: 'التذاكر', navigate: 'Settings' },
		{ id: 3, icon: 'location-outline', label: 'نقطة التجمع', navigate: 'Settings' },
		{ id: 4, icon: 'musical-notes-outline', label: 'أهازيج', navigate: 'Settings' },
		{ id: 5, icon: 'people-outline', label: 'المشرفين', navigate: 'Settings' },
		{ id: 6, icon: 'person-outline', label: 'بياناتي', navigate: 'Settings' },
		{ id: 7, icon: 'star-outline', label: 'نقاطي', navigate: 'Settings' },
		{ id: 8, icon: 'wallet-outline', label: 'ويبك', navigate: 'Settings' },
		{ id: 9, icon: 'help-circle-outline', label: 'الدعم الفني', navigate: 'Settings' },
		{ id: 10, icon: 'shirt-outline', label: 'تيشرتات', navigate: 'Settings' },
	];

	const handleTabsNavigation = ( cardNavigation: string ) => {
		navigation.navigate(cardNavigation);
	} 

	return (
		<Screen preset="auto" style={{ paddingHorizontal: 4 }} backgroundColor={colors.mainBackground} safeAreaEdges={["top"]}>
			<View style={styles.titleContainer}>
				<Text style={styles.title} text={"الرئيسية"} />
			</View>
			<View style={styles.cardsContainer}>
				{cardData.map(card => (
					<TouchableOpacity
						key={card.id}
						style={styles.card}
						onPress={() => handleTabsNavigation(card.navigate)}
					>
						<Ionicons name={card.icon} size={70} style={[styles.cardsIcon, activeCardId === card.id && styles.activeIcon]} />
						<Text text={card.label} style={[styles.cardsLabel, activeCardId === card.id && styles.activeLabel]} />
					</TouchableOpacity>
				))}
			</View>
		</Screen>
	);
});

const styles = StyleSheet.create({
	titleContainer: {
		marginVertical: spacing.md,
		marginRight: spacing.sm
	},
	title: {
		fontSize: 28,
		padding: 10,
		fontWeight: 'bold',
		textAlign: 'right',
		color: 'black',
		marginTop: spacing.sm
	},
	cardsContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		flexWrap: 'wrap',
	},
	card: {
		backgroundColor: '#ffffff',
		padding: 15,
		borderRadius: 10,
		margin: spacing.sm,
		width: '27%',
		alignItems: 'center',
		justifyContent: 'center',
	},
	activeCard: {
		backgroundColor: '#FF3B30',
	},
	cardsIcon: {
		color: 'gray'
	},
	activeIcon: {
		color: 'white'
	},
	cardsLabel: {
		marginTop: spacing.sm,
		color: 'gray',
	},
	activeLabel: {
		color: 'white'
	},
});
