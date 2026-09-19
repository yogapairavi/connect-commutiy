import React from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
} from "react-native";
import { router } from "expo-router";

export default function ResourceDetails() {
    return (
        <ScrollView style={styles.container}>

            <Text style={styles.emoji}>📷</Text>

            <Text style={styles.title}>
                Canon Camera
            </Text>

            <Text style={styles.category}>
                Photography
            </Text>

            <View style={styles.card}>

                <Text style={styles.label}>
                    💰 Rental Price
                </Text>

                <Text style={styles.price}>
                    ₹350/day
                </Text>

                <Text style={styles.info}>
                    📍 2.4 Km away
                </Text>

                <Text style={styles.info}>
                    ⭐ Owner Rating: 4.8
                </Text>

                <Text style={styles.info}>
                    🛡️ Verified Resource
                </Text>

            </View>

            <TouchableOpacity
                style={styles.primaryButton}
                onPress={() => router.push("/rental-request")}
            >
                <Text style={styles.primaryText}>
                    Rent This Item
                </Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.secondaryButton}
                onPress={() => router.push("/exchange")}
            >
                <Text style={styles.secondaryText}>
                    🔄 Propose Exchange
                </Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.secondaryButton}
                onPress={() => router.push("/rental-passport")}
            >
                <Text style={styles.secondaryText}>
                    🪪 View Rental Passport
                </Text>
            </TouchableOpacity>

        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F8F7FC",
        padding: 22,
        paddingTop: 60,
    },

    emoji: {
        fontSize: 100,
        textAlign: "center",
        marginBottom: 20,
    },

    title: {
        fontSize: 30,
        fontWeight: "800",
    },

    category: {
        color: "#5140C9",
        fontSize: 18,
        marginTop: 5,
    },

    card: {
        backgroundColor: "white",
        borderRadius: 22,
        padding: 22,
        marginTop: 25,
        elevation: 3,
    },

    label: {
        fontSize: 17,
        color: "#777",
    },

    price: {
        fontSize: 28,
        fontWeight: "800",
        marginVertical: 15,
    },

    info: {
        fontSize: 16,
        marginTop: 12,
    },

    primaryButton: {
        backgroundColor: "#5140C9",
        padding: 18,
        borderRadius: 18,
        marginTop: 25,
        alignItems: "center",
    },

    primaryText: {
        color: "white",
        fontSize: 18,
        fontWeight: "800",
    },

    secondaryButton: {
        backgroundColor: "white",
        padding: 18,
        borderRadius: 18,
        marginTop: 12,
        alignItems: "center",
    },

    secondaryText: {
        color: "#5140C9",
        fontSize: 17,
        fontWeight: "700",
    },
});