import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TextInput,
    TouchableOpacity,
} from "react-native";
import { router } from "expo-router";

const resources = [
    {
        id: "1",
        name: "Sony Camera",
        category: "Photography & Events",
        description: "Mirrorless camera for college events and photography.",
        price: "₹350/day",
        owner: "Arun",
        condition: "Excellent",
        location: "College Campus",
        match: "96%",
        tags: "#camera #photography #events",
    },
    {
        id: "2",
        name: "Canon Camera",
        category: "Photography & Events",
        description: "DSLR camera suitable for events and projects.",
        price: "₹400/day",
        owner: "Priya",
        condition: "Good",
        location: "Hostel",
        match: "91%",
        tags: "#camera #dslr #project",
    },
    {
        id: "3",
        name: "HP Laptop",
        category: "Electronics",
        description: "Laptop suitable for coding and college projects.",
        price: "₹500/day",
        owner: "Karthik",
        condition: "Excellent",
        location: "College Campus",
        match: "87%",
        tags: "#laptop #coding #college",
    },
];

export default function ReceiverHome() {
    const [search, setSearch] = useState("");

    const filteredResources = resources.filter((item) => {
        const text = search.toLowerCase();

        return (
            item.name.toLowerCase().includes(text) ||
            item.category.toLowerCase().includes(text) ||
            item.description.toLowerCase().includes(text) ||
            item.tags.toLowerCase().includes(text)
        );
    });

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <View>
                    <Text style={styles.small}>Find what you need</Text>
                    <Text style={styles.title}>Discover Resources</Text>
                </View>

                <TouchableOpacity
                    style={styles.bell}
                    onPress={() => router.push("/notifications")}
                >
                    <Text>🔔</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.aiSearch}>
                <Text style={styles.aiTitle}>🤖 AI Resource Search</Text>

                <Text style={styles.aiText}>
                    Tell us what you need in your own words.
                </Text>

                <TextInput
                    style={styles.searchInput}
                    placeholder="Example: I need a camera for 2 days"
                    placeholderTextColor="#999EAC"
                    value={search}
                    onChangeText={setSearch}
                />

                <TouchableOpacity style={styles.searchButton}>
                    <Text style={styles.searchButtonText}>Find Matches</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.smartRow}>
                <View style={styles.smartCard}>
                    <Text style={styles.smartIcon}>🧠</Text>
                    <Text style={styles.smartTitle}>AI Matching</Text>
                    <Text style={styles.smartText}>
                        Understands your need
                    </Text>
                </View>

                <View style={styles.smartCard}>
                    <Text style={styles.smartIcon}>✓</Text>
                    <Text style={styles.smartTitle}>Verified</Text>
                    <Text style={styles.smartText}>
                        Community members
                    </Text>
                </View>
            </View>

            <View style={styles.headingRow}>
                <Text style={styles.sectionTitle}>Recommended Matches</Text>

                <Text style={styles.resultCount}>
                    {filteredResources.length} found
                </Text>
            </View>

            {filteredResources.map((item) => (
                <TouchableOpacity
                    key={item.id}
                    style={styles.resourceCard}
                    onPress={() =>
                        router.push({
                            pathname: "/resource-details",
                            params: {
                                resourceName: item.name,
                                category: item.category,
                                description: item.description,
                                price: item.price,
                                owner: item.owner,
                                condition: item.condition,
                                location: item.location,
                                match: item.match,
                                hashtags: item.tags,
                            },
                        })
                    }
                >
                    <View style={styles.resourceImage}>
                        <Text style={styles.imageIcon}>
                            {item.category === "Electronics" ? "💻" : "📷"}
                        </Text>
                    </View>

                    <View style={styles.resourceInfo}>
                        <View style={styles.nameRow}>
                            <Text style={styles.resourceName}>{item.name}</Text>

                            <View style={styles.matchBadge}>
                                <Text style={styles.matchText}>
                                    {item.match} Match
                                </Text>
                            </View>
                        </View>

                        <Text style={styles.category}>{item.category}</Text>

                        <Text style={styles.description} numberOfLines={2}>
                            {item.description}
                        </Text>

                        <Text style={styles.owner}>Owner: {item.owner}</Text>

                        <View style={styles.priceRow}>
                            <Text style={styles.price}>{item.price}</Text>

                            <Text style={styles.location}>
                                📍 {item.location}
                            </Text>
                        </View>
                    </View>
                </TouchableOpacity>
            ))}

            {filteredResources.length === 0 && (
                <View style={styles.empty}>
                    <Text style={styles.emptyIcon}>🔎</Text>
                    <Text style={styles.emptyTitle}>No matching resources</Text>
                    <Text style={styles.emptyText}>
                        Try another search or describe your requirement differently.
                    </Text>
                </View>
            )}

            <Text style={styles.sectionTitle}>Explore</Text>

            <View style={styles.exploreGrid}>
                <Explore
                    icon="🎓"
                    title="College Community"
                    onPress={() => router.push("/college-community")}
                />

                <Explore
                    icon="👥"
                    title="My Circle"
                    onPress={() => router.push("/my-circle")}
                />

                <Explore
                    icon="🔄"
                    title="Exchange"
                    onPress={() => router.push("/exchange")}
                />

                <Explore
                    icon="🤖"
                    title="AI Assistant"
                    onPress={() => router.push("/ai-assistant")}
                />
            </View>

            <View style={{ height: 40 }} />
        </ScrollView>
    );
}

function Explore({
    icon,
    title,
    onPress,
}: {
    icon: string;
    title: string;
    onPress: () => void;
}) {
    return (
        <TouchableOpacity style={styles.exploreCard} onPress={onPress}>
            <Text style={styles.exploreIcon}>{icon}</Text>
            <Text style={styles.exploreTitle}>{title}</Text>
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

    small: {
        fontSize: 13,
        color: "#858A99",
    },

    title: {
        fontSize: 27,
        fontWeight: "800",
        color: "#191C2B",
        marginTop: 3,
    },

    bell: {
        width: 45,
        height: 45,
        borderRadius: 23,
        backgroundColor: "#FFFFFF",
        justifyContent: "center",
        alignItems: "center",
    },

    aiSearch: {
        backgroundColor: "#FFFFFF",
        borderRadius: 20,
        padding: 18,
        marginTop: 22,
    },

    aiTitle: {
        fontSize: 18,
        fontWeight: "800",
        color: "#303445",
    },

    aiText: {
        fontSize: 12,
        color: "#858A99",
        marginTop: 4,
        marginBottom: 12,
    },

    searchInput: {
        backgroundColor: "#F5F7FF",
        borderRadius: 13,
        paddingHorizontal: 13,
        paddingVertical: 13,
        fontSize: 13,
        color: "#25283A",
    },

    searchButton: {
        backgroundColor: "#5B5FEF",
        paddingVertical: 13,
        borderRadius: 12,
        alignItems: "center",
        marginTop: 10,
    },

    searchButtonText: {
        color: "#FFFFFF",
        fontWeight: "800",
        fontSize: 14,
    },

    smartRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 15,
    },

    smartCard: {
        backgroundColor: "#FFFFFF",
        borderRadius: 16,
        padding: 14,
        width: "48%",
    },

    smartIcon: {
        fontSize: 22,
    },

    smartTitle: {
        fontSize: 13,
        fontWeight: "800",
        color: "#303445",
        marginTop: 7,
    },

    smartText: {
        fontSize: 10,
        color: "#858A99",
        marginTop: 3,
    },

    headingRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 25,
    },

    sectionTitle: {
        fontSize: 19,
        fontWeight: "800",
        color: "#202333",
        marginBottom: 12,
    },

    resultCount: {
        fontSize: 11,
        color: "#858A99",
    },

    resourceCard: {
        backgroundColor: "#FFFFFF",
        borderRadius: 18,
        padding: 13,
        marginBottom: 12,
        flexDirection: "row",
    },

    resourceImage: {
        width: 82,
        height: 105,
        backgroundColor: "#EEF0FF",
        borderRadius: 14,
        justifyContent: "center",
        alignItems: "center",
    },

    imageIcon: {
        fontSize: 32,
    },

    resourceInfo: {
        flex: 1,
        paddingLeft: 12,
    },

    nameRow: {
        flexDirection: "row",
        justifyContent: "space-between",
    },

    resourceName: {
        fontSize: 15,
        fontWeight: "800",
        color: "#25283A",
        flex: 1,
    },

    matchBadge: {
        backgroundColor: "#EAF8EF",
        paddingHorizontal: 7,
        paddingVertical: 4,
        borderRadius: 7,
    },

    matchText: {
        fontSize: 9,
        color: "#278052",
        fontWeight: "800",
    },

    category: {
        fontSize: 10,
        color: "#858A99",
        marginTop: 3,
    },

    description: {
        fontSize: 11,
        color: "#626776",
        lineHeight: 16,
        marginTop: 7,
    },

    owner: {
        fontSize: 10,
        color: "#777C8B",
        marginTop: 5,
    },

    priceRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 6,
    },

    price: {
        fontSize: 13,
        color: "#5B5FEF",
        fontWeight: "800",
    },

    location: {
        fontSize: 9,
        color: "#858A99",
    },

    empty: {
        backgroundColor: "#FFFFFF",
        borderRadius: 18,
        padding: 30,
        alignItems: "center",
        marginTop: 10,
    },

    emptyIcon: {
        fontSize: 35,
    },

    emptyTitle: {
        fontSize: 16,
        fontWeight: "800",
        marginTop: 10,
    },

    emptyText: {
        fontSize: 12,
        color: "#858A99",
        textAlign: "center",
        marginTop: 5,
    },

    exploreGrid: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
    },

    exploreCard: {
        width: "48%",
        backgroundColor: "#FFFFFF",
        borderRadius: 16,
        padding: 17,
        marginBottom: 12,
    },

    exploreIcon: {
        fontSize: 25,
    },

    exploreTitle: {
        fontSize: 12,
        fontWeight: "700",
        color: "#343747",
        marginTop: 8,
    },
});