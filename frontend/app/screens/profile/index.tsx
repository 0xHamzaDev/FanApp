import { observer } from "mobx-react-lite";
import React, { FC } from "react";
import { View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Screen, Button, Text } from "@components";
import { AppStackScreenProps } from "@navigators";
import { colors, spacing } from "@theme";
import Icon from "react-native-vector-icons/MaterialIcons";


interface ProfileScreenProps extends AppStackScreenProps<"Profile"> { }

export const ProfileScreen: FC<ProfileScreenProps> = observer(function ProfileScreen({ navigation }) {
	return (
		<Screen preset="auto" style={styles.screen} backgroundColor={colors.background} safeAreaEdges={["top"]}>
			<Text style={styles.headerText} text={'حسابي'} />
			<View style={styles.profileContainer}>
				<Image source={{ uri: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" }} style={styles.profileImage} />
				<Text style={styles.profileName}>ناصر القصبي</Text>
			</View>

			<View style={styles.infoContainer}>
				<View style={styles.infoRow}>
					<Icon name="person" size={20} color={colors.textSecondary} />
					<Text style={styles.label}>الاسم كامل</Text>
					<Text style={styles.value}>ناصر القصبي</Text>
				</View>
				<View style={styles.infoRow}>
					<Icon name="phone" size={20} color={colors.textSecondary} />
					<Text style={styles.label}>رقم الهاتف</Text>
					<Text style={styles.value}>+0966 5355384443</Text>
				</View>
				<View style={styles.infoRow}>
					<Icon name="lock" size={20} color={colors.textSecondary} />
					<Text style={styles.label}>كلمة المرور</Text>
					<Text style={styles.value}>•••••••••</Text>
				</View>
				<View style={styles.infoRow}>
					<Icon name="location-on" size={20} color={colors.textSecondary} />
					<Text style={styles.label}>العنوان</Text>
					<Text style={styles.value}>
						رقم المبنى 7526, شارع الأمير سلطان بن عبدالعزيز, حي الروضة, جدة, منطقة مكة المكرمة
					</Text>
				</View>
			</View>

			<View style={styles.editButtonContainer}>
				<Button text="تعديل بيانات الحساب" onPress={() => { }} style={styles.editButton} />
			</View>
		</Screen>
	);
});

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		paddingHorizontal: spacing.sm,
	},
	headerText: {
		alignSelf: 'flex-end',
		color: colors.themecolor,
		fontFamily: 'JannaBold',
		fontSize: 45,
		lineHeight: 60,
		marginBottom: spacing.sm,
		paddingHorizontal: spacing.md,
		paddingTop: 25,
		textAlign: 'right',
	},
	profileContainer: {
		alignItems: "center",
		marginVertical: spacing.lg,
	},
	profileImage: {
		width: 100,
		height: 100,
		borderRadius: 50,
		marginBottom: spacing.sm,
	},
	profileName: {
		fontSize: 24,
		color: colors.text,
		fontWeight: "bold",
	},
	infoContainer: {
		marginVertical: spacing.md,
	},
	infoRow: {
		flexDirection: "row-reverse", // عكس الاتجاه ليكون من اليمين إلى اليسار
		alignItems: "center",
		marginVertical: spacing.md,
		borderBottomWidth: 1,
		borderBottomColor: colors.border,
		paddingBottom: spacing.md,
	},
	label: {
		flex: 1,
		fontSize: 16,
		color: colors.textSecondary,
		marginRight: spacing.md, // استخدام marginRight بدلاً من marginLeft
	},
	value: {
		flex: 2,
		fontSize: 16,
		color: colors.text,
		textAlign: "right", // جعل النص يبدأ من اليمين
	},
	editButtonContainer: {
		alignItems: "center",
		marginVertical: spacing.lg,
	},
	editButton: {
		width: "80%",
		backgroundColor: colors.primary,
	},
});