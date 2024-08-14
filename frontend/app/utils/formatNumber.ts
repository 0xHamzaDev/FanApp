export const formatPhoneNumber = (phoneNumber: any) => {
	if (phoneNumber.startsWith('05')) {
		return '+966' + phoneNumber.slice(1);
	} else if (phoneNumber.startsWith('5') && phoneNumber.length < 10) {
		return '+966' + phoneNumber;
	}
};