import React from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
} from "react-native";
import { router } from "expo-router";

export default function CollegeCommunity() {
    return (
        <View style={styles.container}>

            <Text style={styles.title}>
                College Community 🎓
            </Text>

            <Text style={styles.subtitle}>
                Find resources from your college.
            </Text>

            <TouchableOpacity
                style={styles.card}
                onPress={() => router.push("/search")}
            >
                <Text style={styles.emoji}>📚</Text>
                <Text style={styles.text}>Education Resources</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.card}
                onPress={() => router.push("/search")}
            >
                <Text style={styles.emoji}>🏏</Text>
                <Text style={styles.text}>Sports Resources</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.card}
                onPress={() => router.push("/search")}
            >
                <Text style={styles.emoji}>💻</Text>
                <Text style={styles.text}>Project Resources</Text>
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
        fontSize: 28,
        fontWeight: "800",
        color: "#5140C9",
    },

    subtitle: {
        color: "#777",
        marginTop: 8,
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
        fontSize: 35,
        marginRight: 15,
    },

    text: {
        fontSize: 18,
        fontWeight: "700",
    },
});