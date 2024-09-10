import { observer } from "mobx-react-lite";
import React from "react";
import { View, Image, StyleSheet, ScrollView, I18nManager } from "react-native";
import QRCode from 'react-native-qrcode-svg';
import Ionicons from "react-native-vector-icons/Ionicons";
import { Screen, Text, GoBackButton } from "@components";
import { colors, spacing } from "@theme";

export const TicketDetails = observer(function TicketDetails({ navigation, route }) {
    const ticketData = route.params.ticketData;

    return (
        <Screen preset="fixed" backgroundColor={colors.background} safeAreaEdges={["top"]}>
            <View style={styles.container}>
                <GoBackButton onPress={() => navigation.goBack()} />
                <Text style={styles.header} text={"تفاصيل التذكرة"} />
                <Image source={ticketData.image} style={styles.mainImage} />
                <Text style={styles.matchName} text={ticketData.matchName} />

                <Text style={styles.description} text={' هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد هذا النص من مولد النص العربى، حيث يمكنك أن تولد مثل هذا النص أو العديد من النصوص الأخرى إضافة إلى زيادة عدد الحروف التى يولدها التطبيق.'} />
                <View style={styles.infoRow}>
                    <View style={styles.infoItem}>
                        <Ionicons name="calendar-outline" size={18} color={colors.text} />
                        <Text style={styles.infoText} text={ticketData.date} />
                    </View>
                    <View style={styles.infoItem}>
                        <Ionicons name="location-outline" size={18} color={colors.text} />
                        <Text style={styles.infoText} text={ticketData.location} />
                    </View>
                </View>

                <View style={styles.qrSection}>
                    <Text style={styles.qrText}>قم بتشغيل الكاميرا او الماسح حتى تتمكن من حجز تذكرتك</Text>
                    <View style={styles.qrCode}>
                        <QRCode
                            value={ticketData.id}
                            size={100}
                            color="black"
                            backgroundColor={colors.transparent}
                        />
                    </View>
                </View>
            </View>
        </Screen>
    );
});

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: spacing.md,
        paddingBottom: spacing.xxl,
    },
    header: {
        alignSelf: "flex-end",
        color: colors.themecolor,
        fontFamily: "JannaBold",
        fontSize: 40,
        lineHeight: 45,
        marginBottom: spacing.sm,
        paddingHorizontal: spacing.md,
        paddingTop: 65,
        textAlign: "right",
    },
    mainImage: {
        width: "100%",
        height: 200,
        borderRadius: 12,
        marginTop: spacing.sm,
        marginBottom: spacing.md,
    },
    matchName: {
        fontFamily: "JannaBold",
        fontSize: 22,
        color: colors.text,
        textAlign: "center",
        marginBottom: spacing.sm,
    },
    description: {
        fontSize: 14,
        color: colors.textDim,
        textAlign: "center",
        fontFamily: "Janna",
        lineHeight: 20,
        marginBottom: spacing.md,
    },
    infoRow: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        marginVertical: spacing.md,
    },
    infoItem: {
        flexDirection: "row",
        alignItems: "center",
        marginHorizontal: spacing.sm,
    },
    infoText: {
        fontSize: 16,
        color: colors.textDim,
        marginLeft: spacing.xs,
        fontFamily: "Janna",
    },
    qrSection: {
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: spacing.md,
        borderWidth: 1,
        borderColor: "#d6dadb",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: spacing.md,
    },
    qrCode: {
        borderRadius: 12,
        padding: spacing.sm,
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: "#d6dadb"
    },
    qrText: {
        fontSize: 16,
        color: colors.text,
        textAlign: "right",
        flex: 1,
        fontFamily: "Janna",
        marginRight: spacing.sm,
    },
});
