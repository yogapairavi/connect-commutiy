import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
} from "react-native";
import { useLocalSearchParams, router } from "expo-router";

export default function ProviderHome() {
    const params = useLocalSearchParams();

    const name = String(params.name || "Provider");

    const [resources] = useState([
        {
            id: "1",
            name: "Sony Camera",
            category: "Photography & Events",
            price: "₹350/day",
            condition: "Good",
            status: "Available",
        },
        {
            id: "2",
            name: "Laptop",
            category: "Electronics",
            price: "₹500/day",
            condition: "Excellent",
            status: "Available",
        },
    ]);

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <View>
                    <Text style={styles.welcome}>Welcome 👋</Text>
                    <Text style={styles.name}>{name}</Text>
                </View>

                <TouchableOpacity
                    style={styles.notification}
                    onPress={() => router.push("/notifications")}
                >
                    <Text style={styles.notificationText}>🔔</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.banner}>
                <Text style={styles.bannerTitle}>
                    Turn unused resources into value
                </Text>

                <Text style={styles.bannerText}>
                    Rent, lend or exchange your resources with verified community members.
                </Text>
            </View>

            <TouchableOpacity
                style={styles.addButton}
                onPress={() => router.push("/add-resource")}
            >
                <Text style={styles.plus}>＋</Text>

                <View>
                    <Text style={styles.addTitle}>Add Resource</Text>
                    <Text style={styles.addText}>
                        List something you want to rent or exchange
                    </Text>
                </View>
            </TouchableOpacity>

            <Text style={styles.sectionTitle}>Your Resources</Text>

            {resources.map((resource) => (
                <TouchableOpacity
                    key={resource.id}
                    style={styles.resourceCard}
                    onPress={() =>
                        router.push({
                            pathname: "/resource-details",
                            params: {
                                resourceName: resource.name,
                                category: resource.category,
                                price: resource.price,
                                condition: resource.condition,
                                owner: name,
                            },
                        })
                    }
                >
                    <View style={styles.resourceImage}>
                        <Text style={styles.imageIcon}>📦</Text>
                    </View>

                    <View style={styles.resourceInfo}>
                        <Text style={styles.resourceName}>{resource.name}</Text>

                        <Text style={styles.category}>{resource.category}</Text>

                        <Text style={styles.price}>{resource.price}</Text>

                        <View style={styles.bottomRow}>
                            <Text style={styles.condition}>
                                Condition: {resource.condition}
                            </Text>

                            <View style={styles.availableBadge}>
                                <Text style={styles.availableText}>
                                    {resource.status}
                                </Text>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
            ))}

            <Text style={styles.sectionTitle}>Quick Actions</Text>

            <View style={styles.quickGrid}>
                <QuickAction
                    icon="📋"
                    title="Rental Passport"
                    onPress={() => router.push("/rental-passport")}
                />

                <QuickAction
                    icon="🔄"
                    title="Exchange"
                    onPress={() => router.push("/exchange")}
                />

                <QuickAction
                    icon="👥"
                    title="My Circle"
                    onPress={() => router.push("/my-circle")}
                />

                <QuickAction
                    icon="🎓"
                    title="College Community"
                    onPress={() => router.push("/college-community")}
                />
            </View>

            <View style={styles.bottomSpace} />
        </ScrollView>
    );
}

function QuickAction({
    icon,
    title,
    onPress,
}: {
    icon: string;
    title: string;
    onPress: () => void;
}) {
    return (
        <TouchableOpacity style={styles.quickCard} onPress={onPress}>
            <Text style={styles.quickIcon}>{icon}</Text>
            <Text style={styles.quickTitle}>{title}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F5F7FF",
        padding: 20,
    },

    header: {
        marginTop: 45,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },

    welcome: {
        fontSize: 14,
        color: "#7C8190",
    },

    name: {
        fontSize: 27,
        fontWeight: "800",
        color: "#191C2B",
        marginTop: 3,
    },

    notification: {
        width: 45,
        height: 45,
        borderRadius: 23,
        backgroundColor: "#FFFFFF",
        justifyContent: "center",
        alignItems: "center",
    },

    notificationText: {
        fontSize: 21,
    },

    banner: {
        backgroundColor: "#5B5FEF",
        borderRadius: 20,
        padding: 20,
        marginTop: 25,
    },

    bannerTitle: {
        color: "#FFFFFF",
        fontSize: 20,
        fontWeight: "800",
    },

    bannerText: {
        color: "#E9EAFF",
        fontSize: 13,
        lineHeight: 19,
        marginTop: 7,
    },

    addButton: {
        backgroundColor: "#FFFFFF",
        borderRadius: 18,
        padding: 17,
        marginTop: 18,
        flexDirection: "row",
        alignItems: "center",
    },

    plus: {
        fontSize: 32,
        color: "#5B5FEF",
        marginRight: 14,
    },

    addTitle: {
        fontSize: 16,
        fontWeight: "800",
        color: "#25283A",
    },

    addText: {
        fontSize: 12,
        color: "#818695",
        marginTop: 3,
    },

    sectionTitle: {
        fontSize: 20,
        fontWeight: "800",
        color: "#202333",
        marginTop: 25,
        marginBottom: 12,
    },

    resourceCard: {
        backgroundColor: "#FFFFFF",
        borderRadius: 18,
        padding: 13,
        marginBottom: 12,
        flexDirection: "row",
    },

    resourceImage: {
        width: 85,
        height: 95,
        borderRadius: 14,
        backgroundColor: "#EEF0FF",
        justifyContent: "center",
        alignItems: "center",
    },

    imageIcon: {
        fontSize: 35,
    },

    resourceInfo: {
        flex: 1,
        paddingLeft: 13,
    },

    resourceName: {
        fontSize: 16,
        fontWeight: "800",
        color: "#25283A",
    },

    category: {
        fontSize: 11,
        color: "#858A99",
        marginTop: 4,
    },

    price: {
        fontSize: 15,
        color: "#5B5FEF",
        fontWeight: "800",
        marginTop: 6,
    },

    bottomRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 7,
    },

    condition: {
        fontSize: 10,
        color: "#727786",
    },

    availableBadge: {
        backgroundColor: "#EAF8EF",
        paddingHorizontal: 7,
        paddingVertical: 4,
        borderRadius: 8,
    },

    availableText: {
        fontSize: 9,
        color: "#278052",
        fontWeight: "700",
    },

    quickGrid: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
    },

    quickCard: {
        width: "48%",
        backgroundColor: "#FFFFFF",
        borderRadius: 17,
        padding: 17,
        marginBottom: 12,
    },

    quickIcon: {
        fontSize: 25,
        marginBottom: 9,
    },

    quickTitle: {
        fontSize: 13,
        fontWeight: "700",
        color: "#343747",
    },

    bottomSpace: {
        height: 40,
    },
});