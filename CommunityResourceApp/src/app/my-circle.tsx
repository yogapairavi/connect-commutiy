import React from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
} from "react-native";

export default function MyCircle() {
    return (
        <View style={styles.container}>

            <Text style={styles.title}>
                My Circle 👥
            </Text>

            <TouchableOpacity style={styles.card}>
                <Text style={styles.emoji}>❤️</Text>
                <Text style={styles.text}>Close Friends</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.card}>
                <Text style={styles.emoji}>🎓</Text>
                <Text style={styles.text}>Class Friends</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.card}>
                <Text style={styles.emoji}>🏠</Text>
                <Text style={styles.text}>Hostel Friends</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.card}>
                <Text style={styles.emoji}>💻</Text>
                <Text style={styles.text}>Project Team</Text>
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
        marginBottom: 25,
    },

    card: {
        backgroundColor: "white",
        padding: 22,
        borderRadius: 20,
        marginBottom: 15,
        flexDirection: "row",
        alignItems: "center",
        elevation: 2,
    },

    emoji: {
        fontSize: 32,
        marginRight: 15,
    },

    text: {
        fontSize: 18,
        fontWeight: "700",
    },
});