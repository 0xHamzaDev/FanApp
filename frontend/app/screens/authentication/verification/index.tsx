import { observer } from "mobx-react-lite";
import React, { FC, useState, useEffect } from "react";
import { View, Alert, Keyboard, TouchableOpacity, StyleSheet } from "react-native";
import { Text, Button, Screen } from "@components";
import { AppStackScreenProps } from "@navigators";
import { colors, spacing } from "@theme";
import { useAuth } from "@context";
import { OtpInput } from "react-native-otp-entry";
import Ionicons from 'react-native-vector-icons/Ionicons';

interface VerificationScreenProps extends AppStackScreenProps<"Verification"> { }

export const VerificationScreen: FC<VerificationScreenProps> = observer(function VerificationScreen({ navigation, route }) {
	const { phoneNumber } = route.params;
	const { verifyOtp, signInWithPhoneNumber } = useAuth(); // Use Auth context functions
	const [otp, setOtp] = useState('');
	const [isResending, setIsResending] = useState(false);
	const [timer, setTimer] = useState(120); // 120 seconds timer

	useEffect(() => {
		let interval: NodeJS.Timeout | null = null;
		if (timer > 0) {
			interval = setInterval(() => {
				setTimer(prev => prev - 1);
			}, 1000);
		} else if (interval) {
			clearInterval(interval);
		}
		return () => {
			if (interval) clearInterval(interval);
		};
	}, [timer]);

	const handleVerification = async () => {
		Keyboard.dismiss();
		try {
			await verifyOtp(phoneNumber, otp, navigation);
		} catch (err) {
			Alert.alert('خطأ', 'رمز التحقق غير صالح. حاول مجدداً.');
		}
	};

	const handleResendOtp = async () => {
		setIsResending(true);
		setTimer(120);
		try {
			await signInWithPhoneNumber(phoneNumber);
		} catch (err) {
			Alert.alert('خطأ', 'حدث خطاً ، حاول مجدداً.');
		} finally {
			setIsResending(false);
		}
	};

	return (
		<Screen preset="auto" style={styles.screen} safeAreaEdges={["top", "bottom"]}>
			<TouchableOpacity style={styles.goBackButton} onPress={() => navigation.goBack()}>
				<Ionicons
					name="arrow-forward"
					size={30}
					color="#005550"
				/>
			</TouchableOpacity>
			<View style={styles.container}>
				<Text
					style={styles.header}
					text="تفعيل الحساب"
				/>
				<Text
					style={styles.subHeader}
					text={"تم إرسال رمز تفعيل إلى رقم موبايل " + phoneNumber}
				/>
				<OtpInput
					numberOfDigits={6}
					focusColor="#005550"
					focusStickBlinkingDuration={400}
					onTextChange={(text) => setOtp(text)}
					onFilled={() => Keyboard.dismiss() }
					textInputProps={{
						accessibilityLabel: "One-Time Password",
					}}
					theme={{
						pinCodeContainerStyle: styles.otpContainer,
						pinCodeTextStyle: styles.otpText,
					}}
				/>
				<View style={styles.resendContainer}>
					{timer > 0 ? (
						<Text style={styles.resendText}>
							يمكنك إعادة إرسال الرمز خلال {timer} ثانية
						</Text>
					) : (
						<Text style={styles.resendText}>
							ألم تحصل على الرمز؟
							<Text
								style={styles.resendLink}
								onPress={handleResendOtp}
								disabled={isResending}
							>
								{isResending ? 'جاري الإرسال...' : 'اعد الإرسال'}
							</Text>
						</Text>
					)}
				</View>
				<Button
					text="تحقق"
					style={styles.button}
					textStyle={styles.buttonText}
					disabled={otp.length !== 6}
					disabledStyle={styles.buttonDisabled}
					onPress={handleVerification}
				/>
			</View>
		</Screen>
	);
});

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		backgroundColor: colors.background,
	},
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		paddingHorizontal: spacing.sm,
	},
	goBackButton: {
		position: 'absolute',
		top: spacing.sm,
		right: spacing.md,
		flexDirection: 'row',
		alignItems: 'center',
		zIndex: 10,  // Ensures it's above other components
	},
	goBackText: {
		color: '#005550',
		fontFamily: 'JannaMed',
		marginLeft: spacing.xs,
	},
	header: {
		paddingTop: 65,
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
	otpContainer: {
		width: 55,
		borderWidth: 1,
		backgroundColor: 'white',
	},
	otpText: {
		color: 'black'
	},
	resendContainer: {
		marginTop: spacing.md,
		justifyContent: 'center', // Center content horizontally
		alignItems: 'center', // Center content vertically
		flexDirection: 'row', // Ensure row direction to keep elements inline
	},
	resendText: {
		fontSize: 14,
		fontFamily: "Janna",
		color: '#94a5ab',
	},
	resendLink: {
		color: '#005b5c',
		fontFamily: "JannaBold",
	},
	button: {
		marginTop: '25%',
		width: '95%',
		backgroundColor: '#A00000',
		paddingVertical: spacing.md,
		borderRadius: 10,
		alignSelf: 'center',
		justifyContent: 'center',
	},
	buttonText: {
		color: '#FFF',
		fontFamily: 'Janna',
		fontWeight: 'bold',
		textAlign: 'center',
	},
	buttonDisabled: {
		backgroundColor: '#D3D3D3',
	},
});
