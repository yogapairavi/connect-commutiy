import React from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
} from "react-native";
import { useLocalSearchParams, router } from "expo-router";

export default function ResourceDetails() {
    const params = useLocalSearchParams();

    const resourceName = String(params.resourceName || "Resource");
    const category = String(params.category || "Category");
    const description = String(
        params.description || "Resource available for community use."
    );
    const price = String(params.price || "₹350/day");
    const owner = String(params.owner || "Community Owner");
    const condition = String(params.condition || "Good");
    const location = String(params.location || "College Campus");
    const match = String(params.match || "95%");
    const hashtags = String(
        params.hashtags || "#community #rental"
    );
    const deposit = String(params.deposit || "₹1000");

    const goToOwner = () => {
        router.push({
            pathname: "/owner-profile",
            params: {
                owner,
                resourceName,
                price,
                condition,
            },
        });
    };

    const requestRental = () => {
        router.push({
            pathname: "/rental-request",
            params: {
                resourceName,
                category,
                description,
                price,
                owner,
                condition,
                location,
                match,
                hashtags,
                deposit,
            },
        });
    };

    return (
        <ScrollView style={styles.container}>
            <TouchableOpacity
                style={styles.backButton}
                onPress={() => router.back()}
            >
                <Text style={styles.backText}>‹</Text>
            </TouchableOpacity>

            <View style={styles.imageBox}>
                <Text style={styles.imageIcon}>
                    {category.includes("Electronics") ? "💻" : "📷"}
                </Text>

                <View style={styles.matchBadge}>
                    <Text style={styles.matchText}>{match} AI Match</Text>
                </View>
            </View>

            <View style={styles.mainCard}>
                <Text style={styles.resourceName}>{resourceName}</Text>

                <Text style={styles.category}>{category}</Text>

                <Text style={styles.price}>{price}</Text>

                <View style={styles.infoRow}>
                    <Info label="Condition" value={condition} />
                    <Info label="Location" value={location} />
                    <Info label="Deposit" value={deposit} />
                </View>
            </View>

            <View style={styles.card}>
                <Text style={styles.sectionTitle}>Description</Text>

                <Text style={styles.description}>{description}</Text>
            </View>

            <View style={styles.card}>
                <Text style={styles.sectionTitle}>Hashtags</Text>

                <Text style={styles.hashtags}>{hashtags}</Text>
            </View>

            <View style={styles.ownerCard}>
                <View style={styles.ownerAvatar}>
                    <Text style={styles.ownerInitial}>
                        {owner.charAt(0).toUpperCase()}
                    </Text>
                </View>

                <View style={{ flex: 1 }}>
                    <Text style={styles.ownerLabel}>Resource Owner</Text>
                    <Text style={styles.ownerName}>{owner}</Text>

                    <Text style={styles.trust}>
                        ✓ Verified Community Member
                    </Text>
                </View>

                <TouchableOpacity onPress={goToOwner}>
                    <Text style={styles.viewText}>View →</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.safetyCard}>
                <Text style={styles.safetyTitle}>
                    🛡 Community Safety
                </Text>

                <Text style={styles.safetyText}>
                    Rental requests, digital agreements, payments, QR verification
                    and return condition checks are recorded.
                </Text>
            </View>

            <TouchableOpacity
                style={styles.rentButton}
                onPress={requestRental}
            >
                <Text style={styles.rentText}>Request Rental</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.exchangeButton}
                onPress={() =>
                    router.push({
                        pathname: "/exchange",
                        params: {
                            resourceName,
                            owner,
                        },
                    })
                }
            >
                <Text style={styles.exchangeText}>
                    🔄 Interested in Exchange
                </Text>
            </TouchableOpacity>

            <View style={{ height: 40 }} />
        </ScrollView>
    );
}

function Info({
    label,
    value,
}: {
    label: string;
    value: string;
}) {
    return (
        <View style={styles.infoBox}>
            <Text style={styles.infoLabel}>{label}</Text>
            <Text style={styles.infoValue}>{value}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F5F7FF",
        padding: 20,
    },

    backButton: {
        width: 42,
        height: 42,
        borderRadius: 21,
        backgroundColor: "#FFFFFF",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 40,
    },

    backText: {
        fontSize: 32,
        color: "#303445",
        marginTop: -4,
    },

    imageBox: {
        height: 220,
        backgroundColor: "#EEF0FF",
        borderRadius: 22,
        marginTop: 15,
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
    },

    imageIcon: {
        fontSize: 75,
    },

    matchBadge: {
        position: "absolute",
        right: 12,
        top: 12,
        backgroundColor: "#EAF8EF",
        paddingHorizontal: 10,
        paddingVertical: 7,
        borderRadius: 10,
    },

    matchText: {
        color: "#278052",
        fontSize: 11,
        fontWeight: "800",
    },

    mainCard: {
        backgroundColor: "#FFFFFF",
        borderRadius: 20,
        padding: 20,
        marginTop: 15,
    },

    resourceName: {
        fontSize: 25,
        fontWeight: "800",
        color: "#191C2B",
    },

    category: {
        fontSize: 12,
        color: "#858A99",
        marginTop: 5,
    },

    price: {
        fontSize: 20,
        color: "#5B5FEF",
        fontWeight: "800",
        marginTop: 10,
    },

    infoRow: {
        flexDirection: "row",
        marginTop: 18,
        justifyContent: "space-between",
    },

    infoBox: {
        width: "31%",
        backgroundColor: "#F5F7FF",
        borderRadius: 11,
        padding: 9,
    },

    infoLabel: {
        fontSize: 9,
        color: "#858A99",
    },

    infoValue: {
        fontSize: 11,
        fontWeight: "700",
        color: "#303445",
        marginTop: 4,
    },

    card: {
        backgroundColor: "#FFFFFF",
        borderRadius: 18,
        padding: 18,
        marginTop: 14,
    },

    sectionTitle: {
        fontSize: 17,
        fontWeight: "800",
        color: "#25283A",
        marginBottom: 8,
    },

    description: {
        fontSize: 13,
        lineHeight: 20,
        color: "#646978",
    },

    hashtags: {
        color: "#5B5FEF",
        fontSize: 13,
        fontWeight: "600",
    },

    ownerCard: {
        backgroundColor: "#FFFFFF",
        borderRadius: 18,
        padding: 16,
        marginTop: 14,
        flexDirection: "row",
        alignItems: "center",
    },

    ownerAvatar: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: "#EEF0FF",
        justifyContent: "center",
        alignItems: "center",
        marginRight: 12,
    },

    ownerInitial: {
        fontSize: 19,
        fontWeight: "800",
        color: "#5B5FEF",
    },

    ownerLabel: {
        fontSize: 10,
        color: "#858A99",
    },

    ownerName: {
        fontSize: 15,
        fontWeight: "800",
        color: "#303445",
        marginTop: 2,
    },

    trust: {
        fontSize: 10,
        color: "#278052",
        marginTop: 4,
    },

    viewText: {
        color: "#5B5FEF",
        fontSize: 12,
        fontWeight: "800",
    },

    safetyCard: {
        backgroundColor: "#FFF8E8",
        borderRadius: 17,
        padding: 16,
        marginTop: 14,
    },

    safetyTitle: {
        fontSize: 14,
        fontWeight: "800",
        color: "#806020",
    },

    safetyText: {
        fontSize: 11,
        lineHeight: 17,
        color: "#776A4E",
        marginTop: 5,
    },

    rentButton: {
        backgroundColor: "#5B5FEF",
        borderRadius: 15,
        paddingVertical: 17,
        alignItems: "center",
        marginTop: 20,
    },

    rentText: {
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: "800",
    },

    exchangeButton: {
        backgroundColor: "#FFFFFF",
        borderRadius: 15,
        paddingVertical: 15,
        alignItems: "center",
        marginTop: 10,
        borderWidth: 1,
        borderColor: "#DCDDEA",
    },

    exchangeText: {
        color: "#4F54D6",
        fontSize: 14,
        fontWeight: "700",
    },
});