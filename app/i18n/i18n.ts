import * as Localization from "expo-localization"
import i18n from "i18n-js"
import { I18nManager } from "react-native"
import en from "./en.ts"
import ar from "./ar.ts"

i18n.fallbacks = true
i18n.translations = { ar, en, "en-US": en }

const fallbackLocale = "en-US"
const systemLocale = Localization.getLocales()[0]
const systemLocaleTag = systemLocale?.languageTag ?? "en-US"

if (Object.prototype.hasOwnProperty.call(i18n.translations, systemLocaleTag)) {
	i18n.locale = systemLocaleTag
} else {
	const generalLocale = systemLocaleTag.split("-")[0]
	if (Object.prototype.hasOwnProperty.call(i18n.translations, generalLocale)) {
		i18n.locale = generalLocale
	} else {
		i18n.locale = fallbackLocale
	}
}

export const isRTL = systemLocale?.textDirection === "rtl"
I18nManager.allowRTL(isRTL)
I18nManager.forceRTL(isRTL)

export default i18n; 
/**
 * Builds up valid keypaths for translations.
 */
export type TxKeyPath = RecursiveKeyOf<Translations>

// via: https://stackoverflow.com/a/65333050
type RecursiveKeyOf<TObj extends object> = {
	[TKey in keyof TObj & (string | number)]: RecursiveKeyOfHandleValue<TObj[TKey], `${TKey}`>
}[keyof TObj & (string | number)]

type RecursiveKeyOfInner<TObj extends object> = {
	[TKey in keyof TObj & (string | number)]: RecursiveKeyOfHandleValue<
		TObj[TKey],
		`['${TKey}']` | `.${TKey}`
	>
}[keyof TObj & (string | number)]

type RecursiveKeyOfHandleValue<TValue, Text extends string> = TValue extends any[]
	? Text
	: TValue extends object
	? Text | `${Text}${RecursiveKeyOfInner<TValue>}`
	: Text