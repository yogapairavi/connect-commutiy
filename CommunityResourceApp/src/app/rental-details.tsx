import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert,
} from "react-native";
import { router } from "expo-router";

export default function RentalDetails() {
    const [days, setDays] = useState("2");
    const [guarantor, setGuarantor] = useState("");

    const price = 350;
    const duration = Number(days) || 0;
    const total = price * duration;
    const advance = total * 0.5;

    const sendRequest = () => {
        Alert.alert(
            "Rental Request Sent",
            "Owner will review your request.",
            [
                {
                    text: "OK",
                    onPress: () => router.push("/qr-pickup"),
                },
            ]
        );
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Rental Details</Text>

            <Text style={styles.label}>Rental Duration</Text>

            <TextInput
                style={styles.input}
                keyboardType="numeric"
                value={days}
                onChangeText={setDays}
                placeholder="Number of days"
            />

            <Text style={styles.label}>Pickup / Delivery</Text>

            <View style={styles.option}>
                <Text>📍 College Campus Pickup</Text>
            </View>

            <View style={styles.option}>
                <Text>🚚 Community Delivery</Text>
            </View>

            <Text style={styles.label}>Guarantor</Text>

            <TextInput
                style={styles.input}
                value={guarantor}
                onChangeText={setGuarantor}
                placeholder="Guarantor name / mobile"
            />

            <View style={styles.summary}>
                <Text>₹350 × {duration} days</Text>
                <Text>Total: ₹{total}</Text>
                <Text>50% Advance: ₹{advance}</Text>
                <Text>Remaining: ₹{total - advance}</Text>
            </View>

            <TouchableOpacity style={styles.button} onPress={sendRequest}>
                <Text style={styles.buttonText}>Send Rental Request</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 22,
        backgroundColor: "#F7F9FC",
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        marginTop: 25,
        marginBottom: 30,
    },
    label: {
        fontWeight: "bold",
        marginBottom: 8,
        marginTop: 15,
    },
    input: {
        backgroundColor: "white",
        borderRadius: 12,
        padding: 15,
        borderWidth: 1,
        borderColor: "#DDD",
    },
    option: {
        backgroundColor: "white",
        padding: 16,
        borderRadius: 12,
        marginBottom: 8,
    },
    summary: {
        backgroundColor: "white",
        padding: 18,
        borderRadius: 14,
        marginTop: 25,
        gap: 9,
    },
    button: {
        backgroundColor: "#111827",
        padding: 17,
        borderRadius: 12,
        marginTop: 20,
    },
    buttonText: {
        color: "white",
        textAlign: "center",
        fontWeight: "bold",
    },
});