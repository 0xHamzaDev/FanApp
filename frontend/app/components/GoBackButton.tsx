import React from 'react'
import { TouchableOpacity, StyleSheet } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { colors, spacing } from "../theme";

export function GoBackButton({ onPress }){
    const _onPress = onPress || (() => {});
    return (
        <TouchableOpacity style={styles.goBackButton} onPress={_onPress}>
            <Ionicons
                name="arrow-forward"
                size={30}
                color={colors.themecolor}
            />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    goBackButton: {
        position: 'absolute',
        top: spacing.sm,
        right: spacing.md,
        flexDirection: 'row',
        alignItems: 'center',
        zIndex: 10,
    },
})