import React from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
} from "react-native";

export default function Notifications() {
    return (
        <ScrollView style={styles.container}>

            <Text style={styles.title}>
                Notifications 🔔
            </Text>

            <Notification
                text="Your rental request was accepted."
            />

            <Notification
                text="Your camera rental is due tomorrow."
            />

            <Notification
                text="Payment reminder: ₹350 remaining."
            />

            <Notification
                text="New resource matched by AI."
            />

        </ScrollView>
    );
}

function Notification({ text }: { text: string }) {
    return (
        <View style={styles.card}>
            <Text style={styles.icon}>🔔</Text>
            <Text style={styles.text}>{text}</Text>
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
        padding: 20,
        borderRadius: 20,
        marginBottom: 12,
        flexDirection: "row",
        alignItems: "center",
        elevation: 2,
    },

    icon: {
        fontSize: 25,
        marginRight: 15,
    },

    text: {
        flex: 1,
        fontSize: 16,
    },
});