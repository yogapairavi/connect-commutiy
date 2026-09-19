import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert,
} from "react-native";

export default function ExchangeDetails() {
    const [resource, setResource] = useState("");
    const [value, setValue] = useState("");
    const [payment, setPayment] = useState("");

    const submit = () => {
        if (!resource) {
            Alert.alert("Required", "Enter the resource you want to offer");
            return;
        }

        Alert.alert(
            "Exchange Request Sent",
            "The owner can accept, reject or negotiate the exchange."
        );
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Propose Exchange</Text>

            <Text style={styles.info}>
                You want to exchange with: Canon Camera
            </Text>

            <Text style={styles.label}>Your Resource</Text>

            <TextInput
                style={styles.input}
                placeholder="Example: HP Laptop"
                value={resource}
                onChangeText={setResource}
            />

            <Text style={styles.label}>Condition</Text>

            <TextInput
                style={styles.input}
                placeholder="Excellent / Good / Fair"
            />

            <Text style={styles.label}>Estimated Value</Text>

            <TextInput
                style={styles.input}
                keyboardType="numeric"
                placeholder="₹"
                value={value}
                onChangeText={setValue}
            />

            <Text style={styles.label}>Additional Payment</Text>

            <TextInput
                style={styles.input}
                keyboardType="numeric"
                placeholder="₹ if required"
                value={payment}
                onChangeText={setPayment}
            />

            <TouchableOpacity style={styles.button} onPress={submit}>
                <Text style={styles.buttonText}>Send Exchange Request</Text>
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
    },
    info: {
        marginTop: 10,
        color: "#666",
    },
    label: {
        fontWeight: "bold",
        marginTop: 22,
        marginBottom: 8,
    },
    input: {
        backgroundColor: "white",
        borderWidth: 1,
        borderColor: "#DDD",
        padding: 15,
        borderRadius: 12,
    },
    button: {
        backgroundColor: "#111827",
        padding: 17,
        borderRadius: 12,
        marginTop: 30,
    },
    buttonText: {
        color: "white",
        textAlign: "center",
        fontWeight: "bold",
    },
});