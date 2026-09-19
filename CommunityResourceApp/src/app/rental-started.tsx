import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { router } from "expo-router";

export default function RentalStarted() {
    return (
        <View style={styles.container}>

            <View style={styles.successCircle}>
                <Text style={styles.check}>✓</Text>
            </View>

            <Text style={styles.title}>
                Rental Started Successfully
            </Text>

            <Text style={styles.subtitle}>
                Your item has been verified successfully.
            </Text>

            <View style={styles.card}>

                <Text style={styles.cardTitle}>
                    Rental Details
                </Text>

                <View style={styles.row}>
                    <Text style={styles.label}>Item</Text>
                    <Text style={styles.value}>HP Laptop</Text>
                </View>

                <View style={styles.row}>
                    <Text style={styles.label}>Duration</Text>
                    <Text style={styles.value}>2 Days</Text>
                </View>

                <View style={styles.row}>
                    <Text style={styles.label}>Status</Text>
                    <Text style={styles.status}>ACTIVE</Text>
                </View>

            </View>

            <View style={styles.reminderBox}>
                <Text style={styles.reminderTitle}>
                    🔔 Return Reminder
                </Text>

                <Text style={styles.reminderText}>
                    You will receive a reminder before your
                    rental period ends.
                </Text>
            </View>

            <TouchableOpacity
                style={styles.button}
                onPress={() => router.replace("/(tabs)/rentals" as any)}
            >
                <Text style={styles.buttonText}>
                    View My Rental
                </Text>
            </TouchableOpacity>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F7F8FC",
        padding: 24,
        justifyContent: "center",
    },

    successCircle: {
        width: 90,
        height: 90,
        borderRadius: 45,
        backgroundColor: "#E5F8ED",
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center",
        marginBottom: 20,
    },

    check: {
        fontSize: 55,
        color: "#20A464",
        fontWeight: "bold",
    },

    title: {
        fontSize: 25,
        fontWeight: "bold",
        textAlign: "center",
        color: "#20222B",
    },

    subtitle: {
        fontSize: 15,
        color: "#707582",
        textAlign: "center",
        marginTop: 10,
        marginBottom: 25,
    },

    card: {
        backgroundColor: "#FFFFFF",
        borderRadius: 18,
        padding: 20,
        marginBottom: 15,
    },

    cardTitle: {
        fontSize: 19,
        fontWeight: "bold",
        marginBottom: 18,
        color: "#20222B",
    },

    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 15,
    },

    label: {
        color: "#777D89",
        fontSize: 14,
    },

    value: {
        color: "#20222B",
        fontWeight: "600",
        fontSize: 14,
    },

    status: {
        color: "#20A464",
        fontWeight: "bold",
    },

    reminderBox: {
        backgroundColor: "#FFF6E5",
        borderRadius: 18,
        padding: 18,
        marginBottom: 25,
    },

    reminderTitle: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#9A6800",
        marginBottom: 6,
    },

    reminderText: {
        color: "#806A42",
        fontSize: 14,
        lineHeight: 20,
    },

    button: {
        backgroundColor: "#5B5FEF",
        borderRadius: 14,
        paddingVertical: 16,
        alignItems: "center",
    },

    buttonText: {
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: "bold",
    },
}); 