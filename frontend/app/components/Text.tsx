import i18n from "i18n-js"
import React from "react"
import { StyleProp, Text as RNText, TextProps as RNTextProps, TextStyle } from "react-native"
import { isRTL, translate, TxKeyPath } from "../i18n"
import { colors, typography } from "../theme"
import { normalize } from "../utils/responsive"

type Sizes = keyof typeof $sizeStyles
type Weights = keyof typeof typography.primary
type Presets = keyof typeof $presets

export interface TextProps extends RNTextProps {
	/**
	 * Text which is looked up via i18n.
	 */
	tx?: TxKeyPath
	/**
	 * The text to display if not using `tx` or nested components.
	 */
	text?: string
	/**
	 * Optional options to pass to i18n. Useful for interpolation
	 * as well as explicitly setting locale or translation fallbacks.
	 */
	txOptions?: i18n.TranslateOptions
	/**
	 * An optional style override useful for padding & margin.
	 */
	style?: StyleProp<TextStyle>
	/**
	 * One of the different types of text presets.
	 */
	preset?: Presets
	/**
	 * Text weight modifier.
	 */
	weight?: Weights
	/**
	 * Text size modifier.
	 */
	size?: Sizes
	/**
	 * Children components.
	 */
	children?: React.ReactNode
}

/**
 * For your text displaying needs.
 * This component is a HOC over the built-in React Native one.
 * @see [Documentation and Examples]{@link https://docs.infinite.red/ignite-cli/boilerplate/components/Text/}
 * @param {TextProps} props - The props for the `Text` component.
 * @returns {JSX.Element} The rendered `Text` component.
 */
export function Text(props: TextProps) {
	const { weight, size, tx, txOptions, text, children, style: $styleOverride, ...rest } = props

	const i18nText = tx && translate(tx, txOptions)
	const content = i18nText || text || children

	const preset: Presets = props.preset ?? "default"
	const $styles: StyleProp<TextStyle> = [
		$rtlStyle,
		$presets[preset],
		weight && $fontWeightStyles[weight],
		size && $sizeStyles[size],
		$styleOverride,
	]

	return (
		<RNText {...rest} style={$styles}>
			{content}
		</RNText>
	)
}

const $sizeStyles = {
	xxl: { fontSize: normalize(36), lineHeight: normalize(44) } satisfies TextStyle,
	xl: { fontSize: normalize(24), lineHeight: normalize(34) } satisfies TextStyle,
	lg: { fontSize: normalize(20), lineHeight: normalize(32) } satisfies TextStyle,
	md: { fontSize: normalize(18), lineHeight: normalize(26) } satisfies TextStyle,
	sm: { fontSize: normalize(16), lineHeight: normalize(24) } satisfies TextStyle,
	xs: { fontSize: normalize(14), lineHeight: normalize(21) } satisfies TextStyle,
	xxs: { fontSize: normalize(12), lineHeight: normalize(18) } satisfies TextStyle,
}

const $fontWeightStyles = Object.entries(typography.primary).reduce((acc, [weight, fontFamily]) => {
	return { ...acc, [weight]: { fontFamily } }
}, {}) as Record<Weights, TextStyle>

const $baseStyle: StyleProp<TextStyle> = [
	$sizeStyles.sm,
	$fontWeightStyles.normal,
	{ color: colors.text },
]

const $presets = {
	default: $baseStyle,

	bold: [$baseStyle, $fontWeightStyles.bold] as StyleProp<TextStyle>,

	heading: [$baseStyle, $sizeStyles.xxl, $fontWeightStyles.bold] as StyleProp<TextStyle>,

	subheading: [$baseStyle, $sizeStyles.lg, $fontWeightStyles.medium] as StyleProp<TextStyle>,

	formLabel: [$baseStyle, $fontWeightStyles.medium] as StyleProp<TextStyle>,

	formHelper: [$baseStyle, $sizeStyles.sm, $fontWeightStyles.normal] as StyleProp<TextStyle>,
}

const $rtlStyle: TextStyle = isRTL ? { writingDirection: "rtl" } : {}