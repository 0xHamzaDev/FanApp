import { observer } from "mobx-react-lite";
import React, { FC, useState } from "react";
import { Image, View, Alert } from "react-native";
import { Text, Button, Screen, TextField } from "../components";
import { AppStackScreenProps } from "../navigators";
import { colors, spacing } from "../theme";
import tw from 'twrnc';

interface LoginScreenProps extends AppStackScreenProps<"Login"> { }

export const LoginScreen: FC<LoginScreenProps> = observer(function LoginScreen(_props) {
	const { navigation } = _props;
	const welcomeLogo = require("../../assets/images/logo.png");
	const [isSubmitted, setIsSubmitted] = useState(false);
	const [authNumber, setAuthNumber] = useState("");

	const error = isSubmitted && authNumber.length < 10 ? "Auth number must be at least 10 digits" : "";

	const handleLogin = () => {
		setIsSubmitted(true);

		if (authNumber.length < 10) {
			return;
		}

		navigation.navigate('Verification', { authNumber });
	};

	return (
		<Screen preset="auto" style={tw`py-[${spacing.xxl}px] px-[${spacing.lg}px]`} safeAreaEdges={["top", "bottom"]}>
			<View style={tw`flex flex-col items-center justify-center mt-[${spacing.xl}px]`}>
				<Image style={tw`h-[88px] w-full mb-[${spacing.md}px]`} source={welcomeLogo} resizeMode="contain" />
				<Text
					tx="loginScreen.signIn"
					style={tw`text-center text-[24px] font-bold`}
				/>
				<TextField
					placeholderTx="loginScreen.phoneNumberFieldPlaceholder"
					value={authNumber}
					onChangeText={setAuthNumber}
					keyboardType="number-pad"
					placeholderTextColor={'#FFF'}
					style={tw`p-[${spacing.sm}px]`}
					maxLength={10}
					helper={error}
					status={error ? "error" : undefined}
					containerStyle={tw`mb-[${spacing.md}px] mt-[${spacing.lg}px]`}
				/>
				<Button
					tx="loginScreen.signIn"
					onPress={handleLogin}
					disabled={authNumber.length < 10}
					style={tw`mt-[${spacing.xl}px] w-full bg-white`}
					textStyle={{ color: colors.background }}
					disabledStyle={tw`bg-[#D3D3D3]`}
				/>
			</View>
		</Screen>
	);
});