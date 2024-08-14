import React, { FC, useState } from "react";
import { View, Alert, StyleSheet, TouchableOpacity } from "react-native";
import { Text, Button, Screen, TextField } from "../components";
import { AppStackScreenProps } from "../navigators";
import { useAuth } from "../context";
import { spacing, colors } from "../theme";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { formatPhoneNumber } from "../utils/formatNumber";
import { checkUser } from "../services/api/authService";

interface LoginScreenProps extends AppStackScreenProps<"Login"> { }

export const LoginScreen: FC<LoginScreenProps> = function LoginScreen({ navigation }) {
	const { signInWithPhoneNumber } = useAuth();
	const [isSubmitted, setIsSubmitted] = useState(false);
	const [phoneNumber, setPhoneNumber] = useState("");

	const phoneError = isSubmitted && phoneNumber.length < 10 ? "يرجى إدخال رقم هاتف صحيح" : "";

	const handleLogin = async () => {
		setIsSubmitted(true);

		if (phoneError) {
			return;
		}

		if (phoneNumber !== "") {
			try {
				const formattedPhoneNumber = formatPhoneNumber(phoneNumber);

                const data = await checkUser(formattedPhoneNumber);
				console.log(data)
				if (!data) return Alert.alert("خطا", "هذا الرقم غير مسجل")

				if (data?.isActivated) {
					await signInWithPhoneNumber(formattedPhoneNumber);
					navigation.navigate('Verification', { phoneNumber: formattedPhoneNumber });
				} else {
					Alert.alert("حساب غير مفعل", "حسابك غير مفعل. يرجى التواصل مع الدعم.");
				}
			} catch (error) {
				Alert.alert("فشل تسجيل الدخول", error.message);
			}
		} else {
			Alert.alert("فشل تسجيل الدخول", 'لا يمكنك ترك الحقول فارغة');
		}
	};

	return (
		<Screen preset="auto" style={styles.screen} safeAreaEdges={["top", "bottom"]} >
			<View style={styles.container}>
				<Text style={styles.header} text="تسجيل دخول" />
				<Text style={styles.subHeader} text="قم بملء الخانات ادخل رقم موبايلك." />
				<View style={styles.inputContainer}>
					<TextField
						label="المقدمة"
						value="+966"
						editable={false}
						containerStyle={[styles.textFieldContainer, styles.countryCodeContainer]}
						style={styles.inputText}
					/>
					<TextField
						label="رقم الموبايل"
						value={phoneNumber}
						onChangeText={setPhoneNumber}
						keyboardType="phone-pad"
						maxLength={10}
						status={phoneError ? "error" : undefined}
						containerStyle={styles.textFieldContainer}
						style={styles.inputText}
						RightAccessory={() => <Ionicons name="phone-portrait-outline" size={19} style={{ color: 'rgba(0,0,0,0.5)' }} />}
					/>
				</View>
				<TouchableOpacity style={styles.signupButton} onPress={() => { navigation.navigate('Signup') }}>
					<Text
						text="ليس لديك حساب؟ قم بإنشاء حساب جديد."
						style={styles.signupText}
					/>
				</TouchableOpacity>
			</View>
			<View style={styles.bottomContainer}>
				<Button
					onPress={handleLogin}
					text="تسجيل دخول"
					style={styles.button}
					textStyle={styles.buttonText}
				/>
			</View>
		</Screen>
	);
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		backgroundColor: colors.background,
	},
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		paddingHorizontal: spacing.xs,
	},
	header: {
		paddingTop: 60,
		fontSize: 45,
		lineHeight: 50,
		fontFamily: 'JannaBold',
		color: '#005550',
		marginBottom: spacing.sm,
		textAlign: 'right',
		alignSelf: 'flex-end',
		paddingHorizontal: spacing.xs,
	},
	subHeader: {
		color: '#707070',
		fontFamily: 'JannaMed',
		marginBottom: spacing.lg,
		textAlign: 'right',
		alignSelf: 'flex-end',
		paddingHorizontal: spacing.xs,
	},
	inputContainer: {
		marginTop: spacing.xxl,
		flexDirection: 'row-reverse',
		alignItems: 'center',
		width: '95%',
		marginBottom: spacing.xs - 2,
	},
	textFieldContainer: {
		flex: 1,
		width: '95%',
	},
	countryCodeContainer: {
		flex: 0.3,
		marginLeft: spacing.sm,
	},
	inputText: {
		color: 'rgba(0,0,0,0.5)',
		textAlign: 'right',
	},
	signupButton: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'flex-end',
		width: '100%',
		marginVertical: spacing.sm,
	},
	signupText: {
		color: '#005550',
		fontFamily: 'JannaMed',
		marginRight: spacing.xl,
	},
	bottomContainer: {
		marginTop: spacing.xl,
		paddingHorizontal: spacing.xs,
	},
	button: {
		width: '95%',
		backgroundColor: '#A00000',
		paddingVertical: spacing.md,
		borderRadius: 10,
		alignSelf: 'center',
		justifyContent: 'center',
	},
	buttonText: {
		color: '#FFF',
		fontWeight: 'bold',
		textAlign: 'center',
	},
});
