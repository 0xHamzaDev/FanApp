import React, { ErrorInfo } from "react"
import { ScrollView, TextStyle, View, ViewStyle } from "react-native"
import { Button, Icon, Screen, Text } from "../../components"
import { colors, spacing } from "../../theme"
import { normalize } from "../../utils/responsive"

export interface ErrorDetailsProps {
	error: Error
	errorInfo: ErrorInfo | null
	onReset(): void
}

/**
 * Renders the error details screen.
 * @param {ErrorDetailsProps} props - The props for the `ErrorDetails` component.
 * @returns {JSX.Element} The rendered `ErrorDetails` component.
 */
export function ErrorDetails(props: ErrorDetailsProps) {
	return (
		<Screen
			preset="fixed"
			safeAreaEdges={["top", "bottom"]}
			contentContainerStyle={$contentContainer}
		>
			<View style={$topSection}>
				<Icon icon="ladybug" size={64} />
				<Text style={$heading} preset="subheading" tx="errorScreen.title" />
				<Text tx="errorScreen.friendlySubtitle" />
			</View>

			<ScrollView style={$errorSection} contentContainerStyle={$errorSectionContentContainer}>
				<Text style={$errorContent} weight="bold" text={`${props.error}`.trim()} />
				<Text
					selectable
					style={$errorBacktrace}
					text={`${props.errorInfo?.componentStack ?? ""}`.trim()}
				/>
			</ScrollView>

			<Button
				preset="reversed"
				style={$resetButton}
				onPress={props.onReset}
				tx="errorScreen.reset"
			/>
		</Screen>
	)
}

const $contentContainer: ViewStyle = {
	alignItems: "center",
	paddingHorizontal: normalize(24),
	paddingTop: normalize(32),
	flex: 1,
}

const $topSection: ViewStyle = {
	flex: 1,
	alignItems: "center",
}

const $heading: TextStyle = {
	color: colors.error,
	marginBottom: normalize(16),
}

const $errorSection: ViewStyle = {
	flex: 2,
	backgroundColor: colors.separator,
	marginVertical: normalize(16),
	borderRadius: normalize(6),
}

const $errorSectionContentContainer: ViewStyle = {
	padding: normalize(16),
}

const $errorContent: TextStyle = {
	color: colors.error,
}

const $errorBacktrace: TextStyle = {
	marginTop: normalize(16),
	color: colors.textDim,
}

const $resetButton: ViewStyle = {
	backgroundColor: colors.error,
	paddingHorizontal: normalize(48),
}