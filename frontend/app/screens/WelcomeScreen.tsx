import { observer } from "mobx-react-lite";
import React, { FC, useState, useEffect } from "react";
import { Image, View, Alert, StyleSheet } from "react-native";
import { Text, Button, Screen, TextField } from "../components";
import { AppStackScreenProps } from "../navigators";
import useFirstTimeCheck from "../utils/useFirstTimeCheck";
import { colors, spacing } from "../theme";

interface WelcomeScreenProps extends AppStackScreenProps<"Welcome"> { }

export const WelcomeScreen: FC<WelcomeScreenProps> = observer(function WelcomeScreen({ navigation }) {
	const { isFirstTime } = useFirstTimeCheck();
	const welcomeLogo = require("../../assets/images/logo.png");

	const handleLogin = () => {
		navigation.navigate('Login');
	};

	useEffect(() => {
		if (isFirstTime === false) {
			return navigation.navigate('Login');
		}
	}, []);

	return (
		<Screen preset="auto" style={styles.screen} safeAreaEdges={["top", "bottom"]}>
			<View style={styles.container}>
				<Image style={styles.logo} source={welcomeLogo} resizeMode="contain" />
				<Text style={styles.title}>test</Text>
				<Button
					text="Lets' Get Started"
					style={styles.button}
					textStyle={styles.buttonText}
					onPress={handleLogin}
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
		// width: '100%',
		marginBottom: spacing.xl,
	},
	button: {
		marginTop: spacing.xl,
		width: '100%',
		backgroundColor: 'white',
	},
	buttonText: {
		color: colors.background,
	}
});
