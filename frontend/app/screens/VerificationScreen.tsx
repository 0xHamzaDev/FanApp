import { observer } from "mobx-react-lite";
import React, { FC, useState } from "react";
import { Image, View, Alert, Keyboard, TouchableOpacity, StyleSheet } from "react-native";
import { Text, Button, Screen, OtpInput } from "../components";
import { AppStackScreenProps } from "../navigators";
import { colors, spacing } from "../theme";
import { useAuth } from "../context";

interface VerificationScreenProps extends AppStackScreenProps<"Verification"> { }

export const VerificationScreen: FC<VerificationScreenProps> = observer(function VerificationScreen(_props) {
	const { navigation, route } = _props;
	const { authNumber } = route.params;
	const { SignIn } = useAuth();
	const [otp, setOtp] = useState('');

	const handleVerification = async () => {
		try {
			await SignIn(authNumber);
			navigation.navigate('Home');
		} catch (err) {
			Alert.alert('Error', 'Failed to verify OTP.');
		}
	};

	const welcomeLogo = require("../../assets/images/logo.png");

	return (
		<Screen preset="auto" style={styles.screen} safeAreaEdges={["top", "bottom"]}>
			<View style={styles.container}>
				<Image style={styles.logo} source={welcomeLogo} resizeMode="contain" />
				<Text
					tx="loginScreen.verificationTitle"
					style={styles.title}
				/>
				<Text
					tx="loginScreen.verificationSubTitle"
					style={styles.subtitle}
				/>
				<OtpInput
					numberOfDigits={4}
					focusColor="green"
					focusStickBlinkingDuration={400}
					onTextChange={(text) => setOtp(text)}
					onFilled={() => {
						handleVerification();
						Keyboard.dismiss();
					}}
					textInputProps={{
						accessibilityLabel: "One-Time Password",
					}}
					theme={{
						pinCodeContainerStyle: styles.otpContainer,
						pinCodeTextStyle: styles.otpText,
					}}
				/>
				<View style={styles.resendContainer}>
					<Text style={styles.resendText}>
						<Text tx="loginScreen.verificationDidNotReceiveOTP" style={styles.resendText} />
						<TouchableOpacity onPress={() => { Alert.alert("Resend code") }}>
							<Text tx="loginScreen.verificationResendCode" style={styles.resendLink} />
						</TouchableOpacity>
					</Text>
				</View>
				<Button
					tx="loginScreen.verificationButton"
					style={styles.button}
					disabled={otp.length !== 4}
					disabledStyle={styles.buttonDisabled}
					onPress={handleVerification}
				/>
			</View>
		</Screen>
	);
});

const styles = StyleSheet.create({
	screen: {
		paddingVertical: spacing.xxl,
		paddingHorizontal: spacing.lg,
	},
	container: {
		flex: 1,
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
		marginTop: spacing.xl,
	},
	logo: {
		height: 88,
		width: '100%',
		marginBottom: spacing.md,
	},
	title: {
		textAlign: 'center',
		fontSize: 24,
		fontWeight: 'bold',
		marginBottom: spacing.md,
	},
	subtitle: {
		textAlign: 'center',
		fontSize: 16,
		color: '#A9A9A9',
		marginBottom: spacing.lg,
	},
	otpContainer: {
		width: 64,
		borderWidth: 1,
	},
	otpText: {
		color: 'white',
	},
	resendContainer: {
		marginTop: spacing.md,
	},
	resendText: {
		textAlign: 'center',
		fontSize: 14,
		color: '#A9A9A9',
	},
	resendLink: {
		color: '#1E90FF',
		marginLeft: 4,
	},
	button: {
		marginTop: spacing.xl,
		width: '100%',
		backgroundColor: 'white',
	},
	buttonDisabled: {
		backgroundColor: '#D3D3D3',
	},
});
