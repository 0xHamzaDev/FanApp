import { observer } from "mobx-react-lite";
import React, { FC, useState } from "react";
import { Image, View, Alert, StyleSheet } from "react-native";
import { Text, Button, Screen, TextField } from "../components";
import { AppStackScreenProps } from "../navigators";
import { colors, spacing } from "../theme";

interface SignupScreenProps extends AppStackScreenProps<"Signup"> { }

export const SignupScreen: FC<SignupScreenProps> = observer(function SignupScreen(_props) {
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
		<Screen preset="auto" style={styles.screen} safeAreaEdges={["top", "bottom"]}>
			<View style={styles.container}>
				<Image style={styles.logo} source={welcomeLogo} resizeMode="contain" />
				<Text
					tx="loginScreen.signIn"
					style={styles.title}
				/>
				<TextField
					placeholderTx="loginScreen.phoneNumberFieldPlaceholder"
					value={authNumber}
					onChangeText={setAuthNumber}
					keyboardType="number-pad"
					placeholderTextColor={'#FFF'}
					style={styles.textField}
					maxLength={10}
					helper={error}
					numberOnly={true}
					status={error ? "error" : undefined}
					containerStyle={styles.textFieldContainer}
				/>
				<Button
					tx="loginScreen.signIn"
					onPress={handleLogin}
					disabled={authNumber.length < 10}
					style={styles.button}
					textStyle={styles.buttonText}
					disabledStyle={styles.buttonDisabled}
				/>
			</View>
		</Screen>
	);
});

const styles = StyleSheet.create({
	screen: {
		paddingVertical: spacing.xxxl,
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
		marginBottom: spacing.xl,
	},
	title: {
		textAlign: 'center',
		fontSize: 24,
		fontWeight: 'bold',
	},
	textField: {
		paddingTop: spacing.xs,
		paddingBottom: spacing.xs,
		paddingLeft: spacing.xs,
		paddingRight: spacing.xs,
	},
	textFieldContainer: {
		marginBottom: spacing.md,
		marginTop: spacing.xl,
	},
	button: {
		marginTop: spacing.xl,
		width: '100%',
		backgroundColor: 'white',
	},
	buttonText: {
		color: colors.background,
	},
	buttonDisabled: {
		backgroundColor: '#D3D3D3',
	},
});
