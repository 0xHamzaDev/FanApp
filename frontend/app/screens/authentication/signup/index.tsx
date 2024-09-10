import React, { FC, useState } from "react";
import { View, Alert, StyleSheet, TouchableOpacity } from "react-native";
import { Text, Button, Screen, TextField } from "@components";
import { AppStackScreenProps } from "@navigators";
import { useAuth } from "@context";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { formatPhoneNumber } from "@utils/formatNumber";
import { signUp } from "@services/api/authService";  // Import the signup function from authService
import { spacing, colors } from "@theme";

interface SignupScreenProps extends AppStackScreenProps<"Signup"> { }

export const SignupScreen: FC<SignupScreenProps> = function SignupScreen({ navigation }) {
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [name, setName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [password, setPassword] = useState("");

    const nameError = isSubmitted && name.length === 0 ? "Please enter your name" : "";
    const phoneError = isSubmitted && phoneNumber.length < 9 ? "Phone number must be at least 9 digits" : "";
    const passwordError = isSubmitted && (!/^(?=.*[a-zA-Z])(?=.*\d)/.test(password) || password.length < 8)
        ? "Password must be at least 8 characters and contain both letters and digits"
        : "";

    const handleLogin = () => {
        navigation.navigate('Login');
    };

    const handleSignup = async () => {
        setIsSubmitted(true);
    
        if (nameError || phoneError || passwordError) {
            return;
        }
    
        try {
            const formattedPhoneNumber = formatPhoneNumber(phoneNumber);
            const data = await signUp(name, password, formattedPhoneNumber);
    
            if (data.status === 'success') {
                Alert.alert("إنشاء الحساب", "تم إنشاء الحساب بنجاح !", [
                    { text: "حسناً", onPress: () => navigation.navigate('Login') }
                ]);
            }
        } catch (error) {
            if (error.error === 'User already exists') {
                Alert.alert("حدث خطأ", ' المستخدم موجود بالفعل.');
            } else {
                Alert.alert("حدث خطأ", 'حدث خطأ في التسجيل. حاول مجدداً.');
            }
        }
    };    

    return (
        <Screen preset="auto" style={styles.screen} safeAreaEdges={["top", "bottom"]}>
            <TouchableOpacity style={styles.goBackButton} onPress={handleLogin}>
                <Ionicons
                    name="arrow-forward"
                    size={30}
                    color="#005550"
                />
            </TouchableOpacity>
            <View style={styles.container}>
                <Text
                    style={styles.header}
                    text="إنشاء حساب جديد"
                />
                <Text
                    style={styles.subHeader}
                    text="قم بملء الخانات ادخل رقم موبايلك وكلمة المرور ."
                />
                <View style={styles.inputContainer}>
                    <TextField
                        label="المقدمة"
                        value="+966"
                        editable={false}
                        containerStyle={[styles.textFieldContainer, styles.countryCodeContainer]}
                        style={styles.inputText}
                    />
                    <TextField
                        label="رقم الموبايل"
                        value={phoneNumber}
                        onChangeText={setPhoneNumber}
                        keyboardType="phone-pad"
                        maxLength={10}
                        numberOnly={true}
                        status={phoneError ? "error" : undefined}
                        containerStyle={styles.textFieldContainer}
                        style={styles.inputText}
                        RightAccessory={() => <Ionicons name="phone-portrait-outline" size={19} style={{ color: 'rgba(0,0,0,0.5)' }} />}
                    />
                </View>
                <TextField
                    label="الإسم الكامل"
                    value={name}
                    onChangeText={setName}
                    placeholderTextColor={colors.textDim}
                    style={styles.inputText}
                    helper={nameError}
                    status={nameError ? "error" : undefined}
                    containerStyle={styles.textFieldContainer}
                    RightAccessory={() => <Ionicons name="person-circle-outline" size={19} style={{ color: 'rgba(0,0,0,0.5)' }} />}
                />
                <TextField
                    label="كلمة المرور"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                    placeholderTextColor={colors.textDim}
                    style={styles.inputText}
                    helper={passwordError}
                    status={passwordError ? "error" : undefined}
                    containerStyle={styles.textFieldContainer}
                    RightAccessory={() => <Ionicons name="lock-closed-outline" size={19} style={{ color: 'rgba(0,0,0,0.5)' }} />}
                />
                <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                    <Text
                        text="هل لديك حساب؟ سجل الدخول هنا."
                        style={styles.loginText}
                    />
                </TouchableOpacity>
                <Button
                    onPress={handleSignup}
                    text="التالي"
                    style={styles.button}
                    textStyle={styles.buttonText}
                />
            </View>
        </Screen>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: colors.background,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: spacing.sm,
    },
    goBackButton: {
        position: 'absolute',
        top: spacing.sm,
        right: spacing.md,
        flexDirection: 'row',
        alignItems: 'center',
        zIndex: 10,  // Ensures it's above other components
    },
    goBackText: {
        color: '#005550',
        fontFamily: 'JannaMed',
        marginLeft: spacing.xs,
    },
    header: {
        paddingTop: 65,
        fontSize: 45,
        lineHeight: 50,
        fontFamily: 'JannaBold',
        color: '#005550',
        marginBottom: spacing.sm,
        textAlign: 'right',
        alignSelf: 'flex-end',
        paddingHorizontal: spacing.xs,
    },
    subHeader: {
        color: '#707070',
        fontFamily: 'JannaMed',
        marginBottom: spacing.lg,
        textAlign: 'right',
        alignSelf: 'flex-end',
        paddingHorizontal: spacing.xs,
    },
    inputContainer: {
        marginTop: spacing.xxl,
        flexDirection: 'row-reverse',
        alignItems: 'center',
        width: '95%',
        marginBottom: spacing.xs - 2,
    },
    textFieldContainer: {
        flex: 1,
        width: '95%',
    },
    countryCodeContainer: {
        flex: 0.3,
        marginLeft: spacing.sm,
    },
    inputText: {
        color: 'rgba(0,0,0,0.5)',
        textAlign: 'right',
    },
    loginButton: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        marginVertical: spacing.sm,
    },
    loginText: {
        color: '#005550',
        fontFamily: 'JannaMed',
    },
    button: {
        marginTop: spacing.md,
        width: '95%',
        backgroundColor: '#A00000',
        paddingVertical: spacing.md,
        borderRadius: 10,
        alignSelf: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: '#FFF',
        fontFamily: 'Janna',
        fontWeight: 'bold',
        textAlign: 'center',
    },
});
