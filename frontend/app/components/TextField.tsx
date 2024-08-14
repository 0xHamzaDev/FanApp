import React, { ComponentType, forwardRef, Ref, useImperativeHandle, useRef } from "react"
import {
	StyleSheet,
	TextInput,
	TextInputProps,
	TouchableOpacity,
	View,
	I18nManager
} from "react-native"
import { translate } from "../i18n"
import { colors, spacing, typography } from "../theme"
import { Text, TextProps } from "./Text"

const isRTL = I18nManager.isRTL;

export interface TextFieldAccessoryProps {
	style: any
	status: TextFieldProps["status"]
	multiline: boolean
	editable: boolean
}

export interface TextFieldProps extends Omit<TextInputProps, "ref"> {
	status?: "error" | "disabled"
	label?: TextProps["text"]
	labelTx?: TextProps["tx"]
	labelTxOptions?: TextProps["txOptions"]
	LabelTextProps?: TextProps
	helper?: TextProps["text"]
	helperTx?: TextProps["tx"]
	helperTxOptions?: TextProps["txOptions"]
	HelperTextProps?: TextProps
	placeholder?: TextProps["text"]
	placeholderTx?: TextProps["tx"]
	placeholderTxOptions?: TextProps["txOptions"]
	style?: any
	containerStyle?: any
	inputWrapperStyle?: any
	RightAccessory?: ComponentType<TextFieldAccessoryProps>
	LeftAccessory?: ComponentType<TextFieldAccessoryProps>
}

export const TextField = forwardRef(function TextField(props: TextFieldProps, ref: Ref<TextInput>) {
	const {
		labelTx,
		label,
		labelTxOptions,
		placeholderTx,
		placeholder,
		placeholderTxOptions,
		helper,
		helperTx,
		helperTxOptions,
		status,
		RightAccessory,
		LeftAccessory,
		HelperTextProps,
		LabelTextProps,
		style: $inputStyleOverride,
		containerStyle: $containerStyleOverride,
		inputWrapperStyle: $inputWrapperStyleOverride,
		...TextInputProps
	} = props
	const input = useRef<TextInput>(null)

	const disabled = TextInputProps.editable === false || status === "disabled"

	const placeholderContent = placeholderTx
		? translate(placeholderTx, placeholderTxOptions)
		: placeholder

	const $containerStyles = [styles.container, $containerStyleOverride]

	const $labelStyles = [
		styles.label,
		LabelTextProps?.style,
		isRTL && { textAlign: "right" },
	]

	const $inputWrapperStyles = [
		styles.inputWrapper,
		status === "error" && { borderColor: colors.error },
		$inputWrapperStyleOverride,
	]

	const $inputStyles = [
		styles.input,
		disabled && { color: colors.textDim },
		isRTL && { textAlign: "right" },
		TextInputProps.multiline && { height: "auto" },
		$inputStyleOverride,
	]

	const $helperStyles = [
		styles.helper,
		status === "error" && { color: colors.error },
		HelperTextProps?.style,
	]

	function focusInput() {
		if (disabled) return
		input.current?.focus()
	}

	useImperativeHandle(ref, () => input.current as TextInput)

	return (
		<>
			<TouchableOpacity
				activeOpacity={1}
				style={$containerStyles}
				onPress={focusInput}
				accessibilityState={{ disabled }}
			>
				{!!(label || labelTx) && (
					<Text
						text={label}
						tx={labelTx}
						txOptions={labelTxOptions}
						{...LabelTextProps}
						style={$labelStyles}
					/>
				)}
				<View style={$inputWrapperStyles}>
					{!!LeftAccessory && (
						<>
							<LeftAccessory
								style={styles.leftAccessory}
								status={status}
								editable={!disabled}
								multiline={TextInputProps.multiline ?? false}
							/>
							<View style={styles.verticalSeparator} />
						</>
					)}
					<TextInput
						ref={input}
						underlineColorAndroid={colors.transparent}
						textAlignVertical="center"
						placeholder={placeholderContent}
						placeholderTextColor={colors.textDim}
						{...TextInputProps}
						editable={!disabled}
						style={$inputStyles}
					/>
					{!!RightAccessory && (
						<>
							<View style={styles.verticalSeparator} />
							<RightAccessory
								style={styles.rightAccessory}
								status={status}
								editable={!disabled}
								multiline={TextInputProps.multiline ?? false}
							/>
						</>
					)}
				</View>

			</TouchableOpacity>

			{!!(helper || helperTx) && (
				<Text
					preset="formHelper"
					text={helper}
					tx={helperTx}
					txOptions={helperTxOptions}
					{...HelperTextProps}
					style={$helperStyles}
				/>
			)}
		</>

	)
})

const styles = StyleSheet.create({
	container: {
		marginBottom: spacing.md,
		borderWidth: 1,
		borderRadius: 12,
		borderColor: '#e1e1e1',
		backgroundColor: 'white',
		paddingHorizontal: spacing.sm,
		textAlign: 'right',
	},
	label: {
		textAlign: "right",
		backgroundColor: colors.transparent,
		color: 'rgba(0,0,0,0.5)',
		marginHorizontal: 6,
		fontSize: 15,
		fontFamily: 'Janna'
	},
	inputWrapper: {
		flexDirection: "row",
		alignItems: "center",
		width: "100%",
		overflow: "hidden",
		paddingHorizontal: 4,
		paddingVertical: 2
	},
	input: {
		flex: 1,
		alignSelf: "stretch",
		fontFamily: "Janna",
		color: 'rgba(0,0,0,0.5)',
		fontSize: 16,
		height: 15,
		marginHorizontal: 1,
		marginVertical: 5,
	},
	verticalSeparator: {
		width: 2,
		backgroundColor: '#dfdfdf',
		height: '60%',
		marginHorizontal: spacing.xs,
	},
	helper: {
		fontFamily: "Janna",
		fontSize: 12,
		textAlign: 'right',
		marginTop: spacing.xs,
	},
	rightAccessory: {
		marginEnd: spacing.xs,
		height: "100%",
		justifyContent: "center",
		alignItems: "center",
	},
	leftAccessory: {
		marginStart: spacing.xs,
		height: "100%",
		justifyContent: "center",
		alignItems: "center",
	},
})
