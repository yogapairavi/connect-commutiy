import React from "react";
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Alert,
} from "react-native";

export default function SOS() {
    const emergency = () => {
        Alert.alert(
            "SOS Activated",
            "Emergency contacts and community support would be notified."
        );
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Emergency SOS</Text>

            <Text style={styles.text}>
                Use SOS only for genuine emergencies. Your emergency request can be
                shared with your selected trusted contacts.
            </Text>

            <TouchableOpacity style={styles.button} onPress={emergency}>
                <Text style={styles.buttonText}>ACTIVATE SOS</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        padding: 25,
        backgroundColor: "#FFF",
    },
    title: {
        fontSize: 30,
        fontWeight: "bold",
        textAlign: "center",
    },
    text: {
        textAlign: "center",
        color: "#666",
        marginTop: 20,
        lineHeight: 23,
    },
    button: {
        backgroundColor: "#B91C1C",
        padding: 20,
        borderRadius: 15,
        marginTop: 40,
    },
    buttonText: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
        fontSize: 18,
    },
});