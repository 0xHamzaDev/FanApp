import { observer } from "mobx-react-lite"
import React, { FC } from "react";
import { View, StyleSheet, ScrollView, Image } from 'react-native';
import { Screen, Text, Notification } from "../components";
import { AppStackScreenProps } from "../navigators";
import { colors, spacing } from "../theme";

interface NotificationsScreenProps extends AppStackScreenProps<"Notfications"> { }

export const NotificationsScreen: FC<NotificationsScreenProps> = observer(function NotificationsScreen({ navigation }) {
	const notificationsData = []
	// const notificationsData = [
	// 	{
	// 		title: "ملفك الشخصي غير مكتمل يرجي استكمال ملء البيانات حتي تتمكن من الأستفادة من التطبيق بشكل فعال!.",
	// 		icon: 'error',
	// 		time: "قبل ساعة"
	// 	},
	// 	{
	// 		title: "تم قبول طلبك بنجاح إذهب إلى صفحة تيشرتات بالصفحة الرئيسية",
	// 		icon: 'info',
	// 		time: "قبل ساعة"
	// 	},
	// 	{
	// 		title: "تم قبول طلبك بنجاح إذهب إلى صفحة تيشرتات بالصفحة الرئيسية",
	// 		icon: 'info',
	// 		time: "قبل ساعة"
	// 	},
	// 	{
	// 		title: "تم قبول طلبك بنجاح إذهب إلى صفحة تيشرتات بالصفحة الرئيسية",
	// 		icon: 'info',
	// 		time: "قبل ساعة"
	// 	},
	// 	{
	// 		title: "تم قبول طلبك بنجاح إذهب إلى صفحة تيشرتات بالصفحة الرئيسية",
	// 		icon: 'info',
	// 		time: "قبل ساعة"
	// 	},
	// 	{
	// 		title: "تم قبول طلبك بنجاح إذهب إلى صفحة تيشرتات بالصفحة الرئيسية",
	// 		icon: 'info',
	// 		time: "قبل ساعة"
	// 	},
	// ];

	return (
		<Screen preset="auto" style={styles.screen} backgroundColor={colors.background} safeAreaEdges={["top"]}>
			<Text style={styles.header} text={'الإشعارات'} />
			<ScrollView contentContainerStyle={styles.container}>
				{notificationsData.length === 0 && (
					<View style={styles.emptyContainer}>
						<Image source={require('../../assets/images/app-icon-all.png')} style={styles.image} />
						<Text style={styles.headerText}>لا توجد إشعارات حتى اللحظة</Text>
						<Text style={styles.descriptionText}>ستظهر إشعاراتك هنا.</Text>
					</View>

				)}
				{notificationsData.length > 0 && notificationsData.map((item, index) => (
					<Notification
						key={index}
						data={item}
					/>
				))}
			</ScrollView>
		</Screen>
	);
});

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		backgroundColor: colors.background,
	},
	container: {
		flexGrow: 1,
		marginTop: spacing.md,
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
	emptyContainer: {
		justifyContent: 'center',
		alignItems: 'center',
	},
	image: {
		width: 250,
		height: 250,
		marginBottom: 46,
	},
	headerText: {
		fontSize: 22,
		fontFamily: 'JannaBold',
		color: '#15141f',
		marginBottom: spacing.xs,
		textAlign: 'center',
	},
	descriptionText: {
		fontSize: 18,
		color: '#8e8e8e',
		fontFamily: 'Janna',
		textAlign: 'center',
	},
});