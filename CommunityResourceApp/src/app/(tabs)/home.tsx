import React from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
} from "react-native";
import { router } from "expo-router";

export default function Home() {
    return (
        <ScrollView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <View>
                    <Text style={styles.greeting}>Hello 👋</Text>
                    <Text style={styles.title}>Community Resource</Text>
                </View>

                <TouchableOpacity
                    style={styles.notification}
                    onPress={() => router.push("/notifications" as any)}
                >
                    <Text style={styles.notificationIcon}>🔔</Text>
                </TouchableOpacity>
            </View>

            {/* Search */}
            <TouchableOpacity
                style={styles.searchBox}
                onPress={() => router.push("/(tabs)/search" as any)}
            >
                <Text style={styles.searchIcon}>🔍</Text>
                <Text style={styles.searchText}>
                    What resource do you need?
                </Text>
            </TouchableOpacity>

            {/* AI Matching */}
            <View style={styles.aiCard}>
                <Text style={styles.aiTitle}>🤖 AI Resource Matching</Text>
                <Text style={styles.aiText}>
                    Tell us what you need and AI will find suitable community resources
                    for you.
                </Text>

                <TouchableOpacity
                    style={styles.aiButton}
                    onPress={() => router.push("/ai-assistant" as any)}
                >
                    <Text style={styles.aiButtonText}>Ask AI Assistant</Text>
                </TouchableOpacity>
            </View>

            {/* Categories */}
            <Text style={styles.sectionTitle}>Categories</Text>

            <View style={styles.categoryGrid}>
                <Category icon="💻" title="Electronics" />
                <Category icon="👟" title="Shoes" />
                <Category icon="🚗" title="Travel" />
                <Category icon="📚" title="Education" />
                <Category icon="⚽" title="Sports" />
                <Category icon="🎮" title="Gaming" />
                <Category icon="📷" title="Photography" />
                <Category icon="🛠️" title="Tools" />
            </View>

            {/* Quick Actions */}
            <Text style={styles.sectionTitle}>Quick Actions</Text>

            <View style={styles.actionContainer}>
                <TouchableOpacity
                    style={styles.actionCard}
                    onPress={() => router.push("/add-resource" as any)}
                >
                    <Text style={styles.actionIcon}>➕</Text>
                    <Text style={styles.actionTitle}>Add Resource</Text>
                    <Text style={styles.actionText}>List an unused item</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.actionCard}
                    onPress={() => router.push("/college-community" as any)}
                >
                    <Text style={styles.actionIcon}>🎓</Text>
                    <Text style={styles.actionTitle}>College Community</Text>
                    <Text style={styles.actionText}>Connect with your college</Text>
                </TouchableOpacity>
            </View>

            {/* Features */}
            <Text style={styles.sectionTitle}>Platform Features</Text>

            <View style={styles.featureCard}>
                <Text style={styles.featureTitle}>🔄 Rent • Borrow • Exchange</Text>
                <Text style={styles.featureText}>
                    Find resources from trusted people in your community.
                </Text>
            </View>

            <View style={styles.featureCard}>
                <Text style={styles.featureTitle}>🛡️ AI Verification</Text>
                <Text style={styles.featureText}>
                    Before and after rental condition checking helps protect both users.
                </Text>
            </View>

            <View style={styles.featureCard}>
                <Text style={styles.featureTitle}>📱 Rental Passport</Text>
                <Text style={styles.featureText}>
                    Track an item's rental history, condition and verification records.
                </Text>
            </View>

            <View style={styles.bottomSpace} />
        </ScrollView>
    );
}

function Category({
    icon,
    title,
}: {
    icon: string;
    title: string;
}) {
    return (
        <TouchableOpacity style={styles.category}>
            <Text style={styles.categoryIcon}>{icon}</Text>
            <Text style={styles.categoryTitle}>{title}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F7F8FC",
        paddingHorizontal: 16,
    },

    header: {
        paddingTop: 55,
        paddingBottom: 20,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },

    greeting: {
        fontSize: 16,
        color: "#777",
    },

    title: {
        fontSize: 25,
        fontWeight: "700",
        color: "#222",
        marginTop: 4,
    },

    notification: {
        width: 45,
        height: 45,
        borderRadius: 23,
        backgroundColor: "#FFFFFF",
        justifyContent: "center",
        alignItems: "center",
    },

    notificationIcon: {
        fontSize: 21,
    },

    searchBox: {
        height: 55,
        backgroundColor: "#FFFFFF",
        borderRadius: 15,
        paddingHorizontal: 16,
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 18,
    },

    searchIcon: {
        fontSize: 19,
        marginRight: 10,
    },

    searchText: {
        color: "#999",
        fontSize: 15,
    },

    aiCard: {
        backgroundColor: "#5B5FEF",
        borderRadius: 20,
        padding: 20,
        marginBottom: 25,
    },

    aiTitle: {
        color: "#FFFFFF",
        fontSize: 19,
        fontWeight: "700",
    },

    aiText: {
        color: "#EDEEFF",
        fontSize: 14,
        lineHeight: 21,
        marginTop: 8,
    },

    aiButton: {
        backgroundColor: "#FFFFFF",
        borderRadius: 12,
        paddingVertical: 12,
        alignItems: "center",
        marginTop: 15,
    },

    aiButtonText: {
        color: "#5B5FEF",
        fontWeight: "700",
    },

    sectionTitle: {
        fontSize: 19,
        fontWeight: "700",
        color: "#222",
        marginBottom: 13,
        marginTop: 5,
    },

    categoryGrid: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        marginBottom: 22,
    },

    category: {
        width: "23%",
        backgroundColor: "#FFFFFF",
        borderRadius: 15,
        paddingVertical: 14,
        alignItems: "center",
        marginBottom: 10,
    },

    categoryIcon: {
        fontSize: 25,
    },

    categoryTitle: {
        fontSize: 11,
        color: "#555",
        marginTop: 7,
        textAlign: "center",
    },

    actionContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 22,
    },

    actionCard: {
        width: "48%",
        backgroundColor: "#FFFFFF",
        borderRadius: 17,
        padding: 16,
    },

    actionIcon: {
        fontSize: 25,
    },

    actionTitle: {
        fontSize: 15,
        fontWeight: "700",
        color: "#222",
        marginTop: 8,
    },

    actionText: {
        fontSize: 12,
        color: "#777",
        marginTop: 5,
    },

    featureCard: {
        backgroundColor: "#FFFFFF",
        borderRadius: 16,
        padding: 17,
        marginBottom: 12,
    },

    featureTitle: {
        fontSize: 15,
        fontWeight: "700",
        color: "#222",
    },

    featureText: {
        fontSize: 13,
        color: "#777",
        lineHeight: 19,
        marginTop: 6,
    },

    bottomSpace: {
        height: 30,
    },
});