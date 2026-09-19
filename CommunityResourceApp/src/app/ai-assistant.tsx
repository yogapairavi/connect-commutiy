import React from "react";
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
} from "react-native";
import { router } from "expo-router";

export default function AIAssistant() {
    return (
        <View style={styles.container}>

            <Text style={styles.title}>
                AI Assistant 🤖
            </Text>

            <Text style={styles.subtitle}>
                Tell me what resource you need.
            </Text>

            <TextInput
                style={styles.input}
                placeholder='Example: "Camera for 2 days under ₹800"'
                multiline
            />

            <TouchableOpacity
                style={styles.button}
                onPress={() => router.push("/search")}
            >
                <Text style={styles.buttonText}>
                    Find Resources ✨
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
        marginBottom: 25,
    },

    input: {
        backgroundColor: "white",
        minHeight: 130,
        borderRadius: 20,
        padding: 18,
        textAlignVertical: "top",
        fontSize: 16,
    },

    button: {
        backgroundColor: "#5140C9",
        padding: 18,
        borderRadius: 18,
        marginTop: 20,
        alignItems: "center",
    },

    buttonText: {
        color: "white",
        fontSize: 17,
        fontWeight: "800",
    },
});