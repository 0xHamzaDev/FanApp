const convertArabicNumbersToEnglish = (input) => {
    return input.replace(/[\u0660-\u0669]/g, (c) => {
        return c.charCodeAt(0) - 0x0660;
    });
};

export const formatPhoneNumber = (phoneNumber: any) => {
	phoneNumber = convertArabicNumbersToEnglish(phoneNumber);
	if (phoneNumber.startsWith('05')) {
		return '+966' + phoneNumber.slice(1);
	} else if (phoneNumber.startsWith('5') && phoneNumber.length < 10) {
		return '+966' + phoneNumber;
	}
};