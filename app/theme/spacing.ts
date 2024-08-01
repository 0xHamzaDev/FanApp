/**
	Use these spacings for margins/paddings and other whitespace throughout your app.
 */
import { normalize } from '../utils/responsive';

export const spacing = {
	xxxs: normalize(2),
	xxs: normalize(4),
	xs: normalize(8),
	sm: normalize(12),
	md: normalize(16),
	lg: normalize(24),
	xl: normalize(32),
	xxl: normalize(48),
	xxxl: normalize(64),
} as const

export type Spacing = keyof typeof spacing