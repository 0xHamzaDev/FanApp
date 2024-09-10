import { observer } from "mobx-react-lite";
import React, { FC, useState } from "react";
import { View, Image, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Screen, Text, GoBackButton } from "@components"
import { AppStackScreenProps } from "@navigators";
import { colors, spacing } from "@theme";


interface Admin {
    name: string;
    phone: string;
    image: string;
}

const adminsData: Admin[] = [
    {
        name: "عبد الصمد احمد",
        phone: "+0966 5355384443",
        image: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'
    },
    {
        name: "ناصر احمد",
        phone: "+0966 5355384443",
        image: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'
    },
    {
        name: "ادهم محمود",
        phone: "+0966 5355384443",
        image: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'
    },
    {
        name: "احمد مصطففي",
        phone: "+0966 5355384443",
        image: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'
    },
    {
        name: "خالد بركات",
        phone: "+0966 5355384443",
        image: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'
    },
    {
        name: "خالد بركات",
        phone: "+0966 5355384443",
        image: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'
    },
    {
        name: "خالد بركات",
        phone: "+0966 5355384443",
        image: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'
    },
];

const renderAdminCards = () => (
    <View style={styles.adminsContainer}>
        {adminsData.map((item, index) => (
            <View key={index} style={styles.adminCard}>
                <Image source={{ uri: item.image }} style={styles.adminCardImage} />
                <Text style={styles.adminCardName}>{item.name}</Text>
                <Text style={styles.adminCardPhone}>{item.phone}</Text>
                <View style={styles.roleContainer}>
                    <Text style={styles.roleText}>مشرف</Text>
                    <Ionicons name={"shield-checkmark-outline"} size={20} color={'#282828'} />
                </View>
            </View>
        ))}
    </View>
);

interface AdminsScreenProps extends AppStackScreenProps<"Admins"> { }

export const AdminsScreen: FC<AdminsScreenProps> = observer(function AdminsScreen({ navigation }) {
    return (
        <Screen preset="fixed" backgroundColor={colors.background} safeAreaEdges={["top"]}>

            <ScrollView contentContainerStyle={styles.scrollViewContainer} style={{ maxHeight: "95%" }}>
                <GoBackButton onPress={() => navigation.goBack()} />
                <Text style={styles.header} text={"المشرفين"} />
                {renderAdminCards()}
            </ScrollView>
        </Screen>
    );
});

const styles = StyleSheet.create({
    header: {
        alignSelf: 'flex-end',
        color: colors.themecolor,
        fontFamily: 'JannaBold',
        fontSize: 45,
        lineHeight: 50,
        marginBottom: spacing.sm,
        paddingHorizontal: spacing.md,
        paddingTop: 65,
        textAlign: 'right',
    },

    scrollViewContainer: {
        alignItems: 'center',
    },
    adminsContainer: {
        padding: spacing.sm,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    adminCard: {
        backgroundColor: '#fff',
        borderRadius: 8,
        paddingVertical: spacing.md,
        margin: spacing.sm,
        width: '43%',
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
    },
    adminCardImage: {
        width: 80,
        height: 80,
        borderRadius: 40,
        marginBottom: spacing.sm,
    },
    adminCardName: {
        fontSize: 16,
        fontFamily: 'JannaBold',
        color: colors.text,
        marginBottom: spacing.xs,
        textAlign: 'center',
        fontFamily: 'Janna',
    },
    adminCardPhone: {
        fontSize: 14,
        color: colors.textDim,
        marginBottom: spacing.sm,
        textAlign: 'center',
        fontFamily: 'Janna',
    },
    roleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: "#ededed",
        width: '85%',
        padding: spacing.xs,
    },
    roleText: {
        fontSize: 14,
        fontFamily: 'Janna',
        color: '#282828',
        marginRight: spacing.xs,
    },
})