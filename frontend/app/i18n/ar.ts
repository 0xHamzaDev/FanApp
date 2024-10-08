import { Translations } from "./en"

const ar: Translations = {
	common: {
		ok: "نعم",
		cancel: "حذف",
		back: "خلف",
	},
	loginScreen: {
		signIn: "تسجيل الدخول",
		verificationTitle: "التحقق من كلمة المرور لمرة واحدة",
		verificationSubTitle: "سنرسل لك كلمة مرور لمرة واحدة على هذا الرقم",
		verificationButton: "تحقق",
		verificationDidNotReceiveOTP: "لم يصلك رمز التحقق ؟",
		verificationResendCode: "إعادة ارسال",
		phoneNumberFieldPlaceholder: "يرجى كتابة رقم الجوال",
	},
	errorScreen: {
		title: "هناك خطأ ما",
		friendlySubtitle:
			"هذه هي الشاشة التي سيشاهدها المستخدمون في عملية الانتاج عند حدوث خطأ. سترغب في تخصيص هذه الرسالة ( الموجودة في 'ts.en/i18n/app') وربما التخطيط ايضاً ('app/screens/ErrorScreen'). إذا كنت تريد إزالة هذا بالكامل، تحقق من 'app/app.tsp' من اجل عنصر <ErrorBoundary>.",
		reset: "اعادة تعيين التطبيق",
	},
	emptyStateComponent: {
		generic: {
			heading: "فارغة جداً....حزين",
			content: "لا توجد بيانات حتى الآن. حاول النقر فوق الزر لتحديث التطبيق او اعادة تحميله.",
			button: "لنحاول هذا مرّة أخرى",
		},
	},
}

export default ar
export type Translations = typeof ar