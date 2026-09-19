import React from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
} from "react-native";
import { router } from "expo-router";

export default function Exchange() {
    return (
        <View style={styles.container}>

            <Text style={styles.title}>
                Exchange 🔄
            </Text>

            <Text style={styles.subtitle}>
                Exchange your resource with another user.
            </Text>

            <View style={styles.card}>
                <Text style={styles.big}>📷</Text>

                <Text style={styles.item}>
                    Canon Camera
                </Text>

                <Text style={styles.info}>
                    Owner is interested in exchange.
                </Text>
            </View>

            <TouchableOpacity
                style={styles.button}
                onPress={() => router.push("/add-resource")}
            >
                <Text style={styles.buttonText}>
                    Select My Resource
                </Text>
            </TouchableOpacity>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F8F7FC",
        padding: 22,
        paddingTop: 60,
    },

    title: {
        fontSize: 30,
        fontWeight: "800",
        color: "#5140C9",
    },

    subtitle: {
        color: "#777",
        marginTop: 8,
    },

    card: {
        backgroundColor: "white",
        borderRadius: 22,
        padding: 25,
        marginTop: 30,
        alignItems: "center",
        elevation: 3,
    },

    big: {
        fontSize: 70,
    },

    item: {
        fontSize: 22,
        fontWeight: "800",
        marginTop: 10,
    },

    info: {
        marginTop: 10,
        color: "#777",
    },

    button: {
        backgroundColor: "#5140C9",
        padding: 18,
        borderRadius: 18,
        marginTop: 25,
        alignItems: "center",
    },

    buttonText: {
        color: "white",
        fontSize: 17,
        fontWeight: "800",
    },
});