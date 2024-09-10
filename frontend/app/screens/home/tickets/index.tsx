import { observer } from "mobx-react-lite";
import React from "react";
import { View, Image, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Screen, Text, GoBackButton } from "@components";
import { colors, spacing } from "@theme";
import { AppStackScreenProps } from '@navigators';

interface Ticket {
    id: string;
    matchName: string;
    date: string;
    location: string;
    image: string;
}

// const ticketsData: Ticket[] = []

const ticketsData: Ticket[] = [
    {
        id: "12312",
        matchName: "اسم المباراة هنا",
        date: "31.10.2024",
        location: "ملعب السالمية",
        image: require('@assets/images/ticket.png'),
    },
    {
        id: "12312",
        matchName: "اسم المباراة هنا",
        date: "31.10.2024",
        location: "ملعب السالمية",
        image: require('@assets/images/ticket.png'),
    },
    {
        id: "12312",
        matchName: "اسم المباراة هنا",
        date: "31.10.2024",
        location: "ملعب السالمية",
        image: require('@assets/images/ticket.png'),
    },
    {
        id: "12312",
        matchName: "اسم المباراة هنا",
        date: "31.10.2024",
        location: "ملعب السالمية",
        image: require('@assets/images/ticket.png'),
    },
    {
        id: "12312",
        matchName: "اسم المباراة هنا",
        date: "31.10.2024",
        location: "ملعب السالمية",
        image: require('@assets/images/ticket.png'),
    },
    {
        id: "12312",
        matchName: "اسم المباراة هنا",
        date: "31.10.2024",
        location: "ملعب السالمية",
        image: require('@assets/images/ticket.png'),
    },
    {
        id: "12312",
        matchName: "اسم المباراة هنا",
        date: "31.10.2024",
        location: "ملعب السالمية",
        image: require('@assets/images/ticket.png'),
    },
];

export const TicketsScreen = observer(function TicketsScreen({ navigation }): AppStackScreenProps<"Tickets"> {
    return (
        <Screen preset="fixed" backgroundColor={colors.background} safeAreaEdges={["top"]}>
            <ScrollView contentContainerStyle={styles.scrollContent} bounces={true} scrollEnabled={ticketsData.length > 0 ? true : false} style={{ maxHeight: "98%" }}>
                <GoBackButton onPress={() => navigation.goBack()} />
                <Text style={styles.header} text={"التذاكر"} />

                <View style={styles.ticketsContainer}>
                    {ticketsData.length > 0 && ticketsData.map((item, index) => (
                        <TouchableOpacity key={index} style={styles.ticketCard} onPress={() => {
                            navigation.navigate("TicketDetails", { ticketData: ticketsData[index] });
                        }}>
                            <Image source={item.image} style={styles.ticketCardImage} />
                            <View style={styles.ticketInfo}>
                                <Text style={styles.matchName}>{item.matchName}</Text>
                                <View style={styles.infoRow}>
                                    <View style={styles.infoItem}>
                                        <Text style={styles.infoText}>{item.date}</Text>
                                        <Ionicons name="calendar-outline" size={18} color={colors.textDim} />
                                    </View>
                                    <View style={styles.infoItem}>
                                        <Text style={styles.infoText}>{item.location}</Text>
                                        <Ionicons name="location-outline" size={18} color={colors.textDim} />
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>
                    ))}
                    {ticketsData.length === 0 && (
                        <View style={styles.noTicketsContainer}>
                            <Image style={styles.noTicketsImage} source={require('@assets/images/notickets.png')} />
                            <Text style={styles.noTicketsText}>لاتوجد تذاكر حتى الان</Text>
                        </View>
                    )}
                </View>
            </ScrollView>
        </Screen>
    );
});

const styles = StyleSheet.create({
    scrollContent: {
        paddingHorizontal: spacing.md,
        paddingBottom: spacing.xxl,
    },
    header: {
        alignSelf: "flex-end",
        color: colors.themecolor,
        fontFamily: "JannaBold",
        fontSize: 45,
        lineHeight: 50,
        marginBottom: spacing.sm,
        paddingHorizontal: spacing.md,
        paddingTop: 65,
        textAlign: "right",
    },
    ticketsContainer: {
        flexDirection: "column",
        marginVertical: spacing.md,
    },
    ticketCard: {
        backgroundColor: "#fff",
        borderRadius: 12,
        marginVertical: spacing.sm,
        padding: spacing.md,
        flexDirection: "row-reverse",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#d6dadb",
    },
    ticketCardImage: {
        width: 95,
        height: 95,
        borderRadius: 12,
        marginLeft: spacing.md,
    },
    ticketInfo: {
        flex: 1,
    },
    matchName: {
        fontFamily: "JannaBold",
        fontSize: 18,
        color: colors.text,
        marginBottom: spacing.sm,
        textAlign: "right",
    },
    infoRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: spacing.sm,
    },
    infoItem: {
        flexDirection: "row",
        alignItems: "center",
        marginHorizontal: spacing.xs,
    },
    infoText: {
        fontSize: 14,
        color: colors.textDim,
        marginRight: spacing.xs,
    },
    noTicketsContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: spacing.xxxxl,
    },
    noTicketsImage: {
        width: 270,
        height: 270,
        marginBottom: spacing.xxl,
    },
    noTicketsText: {
        fontFamily: "JannaBold",
        fontSize: 20,
        color: "#15141f",
    },
});
