import { observer } from "mobx-react-lite";
import React, { FC, useState } from "react";
import { View, StyleSheet, TouchableOpacity, ScrollView, Image } from "react-native";
import { Screen, Text, GoBackButton } from "../components";
import { AppStackScreenProps } from "../navigators";
import { colors, spacing } from "../theme";
import Ionicons from "react-native-vector-icons/Ionicons";

interface HomeScreenProps extends AppStackScreenProps<"Home"> { }

interface Admin {
	name: string;
	phone: string;
	image: string;
}

const adminsData: Admin[] = [
	{
		name: "عبد الصمد احمد",
		phone: "+0966 5355384443",
		image: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'
	},
	{
		name: "ناصر القصبي",
		phone: "+0966 5355384443",
		image: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'
	},
	{
		name: "ادهم محمود",
		phone: "+0966 5355384443",
		image: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'
	},
	{
		name: "احمد مصطففي",
		phone: "+0966 5355384443",
		image: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'
	},
	{
		name: "خالد بركات",
		phone: "+0966 5355384443",
		image: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'
	},
];

const renderAdminCards = () => (
	<View style={styles.adminsContainer}>
		{adminsData.map((item, index) => (
			<View key={index} style={styles.adminCard}>
				<Image source={{ uri: item.image }} style={styles.adminCardImage} />
				<Text style={styles.adminCardName}>{item.name}</Text>
				<Text style={styles.adminCardPhone}>{item.phone}</Text>
				<View style={styles.roleContainer}>
					<Text style={styles.roleText}>مشرف</Text>
					<Ionicons name={"shield-checkmark-outline"} size={20} color={'#282828'} />
				</View>
			</View>
		))}
	</View>
);

export const HomeScreen: FC<HomeScreenProps> = observer(function HomeScreen({ navigation }) {
	const [activePage, setActivePage] = useState('main');

	const navigationCards = [
		{ id: 1, icon: "document-text-outline", label: "توثيق الحضور", onPress: () => { console.log("settings") } },
		{ id: 2, icon: "ticket-outline", label: "التذاكر", onPress: () => { console.log("settings") } },
		{ id: 3, icon: "location-outline", label: "نقطة التجمع", onPress: () => { console.log("settings") } },
		{ id: 4, icon: "musical-notes-outline", label: "أهازيج", onPress: () => { console.log("settings") } },
		{ id: 5, icon: "people-outline", label: "المشرفين", onPress: () => { setActivePage("admins") } },
		{ id: 6, icon: "person-outline", label: "بياناتي", onPress: () => { console.log("settings") } },
		{ id: 7, icon: "star-outline", label: "نقاطي", onPress: () => { console.log("settings") } },
		{ id: 8, icon: "wallet-outline", label: "ويبك", onPress: () => { console.log("settings") } },
		{ id: 9, icon: "help-circle-outline", label: "الدعم الفني", onPress: () => { console.log("settings") } },
		{ id: 10, icon: "shirt-outline", label: "تيشرتات", onPress: () => { console.log("settings") } },
	];

	return (
		<Screen preset="auto" style={{ paddingHorizontal: 4 }} backgroundColor={colors.background} safeAreaEdges={["top"]}>
			{activePage === 'main' && (
				<>
					<View style={styles.titleContainer}>
						<Text style={styles.title} text={"الرئيسية"} />
					</View>
					<View style={styles.cardsContainer}>
						{navigationCards.map(card => (
							<TouchableOpacity
								key={card.id}
								style={styles.card}
								onPress={card.onPress}
							>
								<Ionicons name={card.icon} size={66} style={styles.cardsIcon} />
								<Text text={card.label} style={styles.cardsLabel} />
							</TouchableOpacity>
						))}
					</View>
				</>
			)}
			{activePage === 'admins' && (
				<>
					<GoBackButton onPress={() => setActivePage('main')} />
					<Text style={styles.header} text={"المشرفين"} />
					<ScrollView contentContainerStyle={styles.scrollViewContainer}>
						{renderAdminCards()}
					</ScrollView>
				</>
			)}
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
	scrollViewContainer: {
		alignItems: 'center',
		padding: spacing.sm,
	},
	adminsContainer: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'space-between',
	},
	adminCard: {
		backgroundColor: '#fff',
		borderRadius: 8,
		paddingVertical: spacing.md,
		margin: spacing.sm,
		width: '43%',
		alignItems: 'center',
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 8,
		elevation: 5,
	},
	adminCardImage: {
		width: 80,
		height: 80,
		borderRadius: 40,
		marginBottom: spacing.sm,
	},
	adminCardName: {
		fontSize: 16,
		fontFamily: 'JannaBold',
		color: colors.text,
		marginBottom: spacing.xs,
		textAlign: 'center',
		fontFamily: 'Janna',
	},
	adminCardPhone: {
		fontSize: 14,
		color: colors.textDim,
		marginBottom: spacing.sm,
		textAlign: 'center',
		fontFamily: 'Janna',
	},
	roleContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 8,
		borderStyle: "solid",
		borderWidth: 1,
		borderColor: "#ededed",
		width: '85%',
		padding: spacing.xs,
	},
	roleText: {
		fontSize: 14,
		fontFamily: 'Janna',
		color: '#282828',
		marginRight: spacing.xs,
	},
});
