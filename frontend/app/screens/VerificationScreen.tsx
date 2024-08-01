import { observer } from "mobx-react-lite"
import React, { FC, useState, useRef } from "react";
import { Image, View, Alert, Keyboard, TouchableOpacity } from "react-native";
import { Text, Button, Screen, TextField, AutoImage, Card, Icon } from "../components";
import { isRTL, changeLanguage } from "../i18n";
import { AppStackScreenProps, navigate } from "../navigators";
import { colors, spacing } from "../theme";
import { useSafeAreaInsetsStyle } from "../utils/useSafeAreaInsetsStyle";
import tw from 'twrnc';
import { OtpInput } from "react-native-otp-entry";
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

	const welcomeLogo = require("../../assets/images/logo.png")

	return (
		<Screen preset="auto" style={{ paddingVertical: spacing.xxl, paddingHorizontal: spacing.lg }} safeAreaEdges={["top", "bottom"]}>
			<View style={tw`flex flex-col items-center justify-center mt-6`}>
				<Image style={tw`h-22 w-full mb-10`} source={welcomeLogo} resizeMode="contain" />
				<Text
					tx="loginScreen.verificationTitle"
					style={tw`text-center text-2xl font-bold mb-4`}
				/>
				<Text
					tx="loginScreen.verificationSubTitle"
					style={tw`text-center text-base font-normal mb-8`}
				/>
				<OtpInput
					numberOfDigits={4}
					focusColor="green"
					focusStickBlinkingDuration={400}
					onTextChange={(text) => setOtp(text)}
					onFilled={() => {
						handleVerification();
						Keyboard.dismiss()
					}}
					textInputProps={{
						accessibilityLabel: "One-Time Password",
					}}
					theme={{
						pinCodeContainerStyle: tw`w-16 border-1`,
						pinCodeTextStyle: tw`text-white`,
					}}
				/>
				<View style={tw`mt-8`}>
					<Text style={tw`text-base text-center text-gray-400`}>
						<Text tx="loginScreen.verificationDidNotReceiveOTP" style={tw`text-gray-400`} />
						<TouchableOpacity onPress={() => { Alert.alert("Resend code") }}>
							<Text tx="loginScreen.verificationResendCode" style={tw`ml-1 mt-1 text-blue-500`} />
						</TouchableOpacity>
					</Text>

				</View>
				<Button
					tx="loginScreen.verificationButton"
					style={tw`mt-15 w-full bg-white`}
					disabled={otp.length !== 4}
					disabledStyle={tw`bg-[#D3D3D3]`}
					onPress={handleVerification}
				/>
			</View>
		</Screen>
	);
});