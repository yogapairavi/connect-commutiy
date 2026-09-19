import React from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Image,
} from "react-native";
import { router } from "expo-router";

export default function OwnerProfileScreen() {
    return (
        <ScrollView
            style={styles.container}
            showsVerticalScrollIndicator={false}
        >

            {/* Header */}

            <View style={styles.header}>

                <View style={styles.avatar}>
                    <Text style={styles.avatarText}>
                        A
                    </Text>
                </View>

                <Text style={styles.name}>
                    Arun Kumar
                </Text>

                <View style={styles.verifiedBadge}>
                    <Text style={styles.verifiedText}>
                        ✓ Verified Community Member
                    </Text>
                </View>

                <Text style={styles.location}>
                    📍 Chennai
                </Text>

            </View>

            {/* Rating */}

            <View style={styles.statsCard}>

                <View style={styles.stat}>
                    <Text style={styles.statNumber}>
                        ⭐ 4.8
                    </Text>

                    <Text style={styles.statLabel}>
                        Rating
                    </Text>
                </View>

                <View style={styles.divider} />

                <View style={styles.stat}>
                    <Text style={styles.statNumber}>
                        12
                    </Text>

                    <Text style={styles.statLabel}>
                        Rentals
                    </Text>
                </View>

                <View style={styles.divider} />

                <View style={styles.stat}>
                    <Text style={styles.statNumber}>
                        8
                    </Text>

                    <Text style={styles.statLabel}>
                        Resources
                    </Text>
                </View>

            </View>

            {/* About */}

            <View style={styles.card}>

                <Text style={styles.sectionTitle}>
                    About
                </Text>

                <Text style={styles.about}>
                    Community member who shares useful resources
                    with people nearby. Available for rental,
                    borrowing and resource exchange.
                </Text>

            </View>

            {/* Resources */}

            <View style={styles.card}>

                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>
                        My Resources
                    </Text>

                    <Text style={styles.viewAll}>
                        8 Items
                    </Text>
                </View>

                <ResourceCard
                    emoji="📷"
                    name="Canon Camera"
                    price="₹350/day"
                    condition="Good Condition"
                />

                <ResourceCard
                    emoji="💻"
                    name="HP Laptop"
                    price="₹500/day"
                    condition="Excellent"
                />

                <ResourceCard
                    emoji="🎥"
                    name="Tripod Stand"
                    price="₹100/day"
                    condition="Good Condition"
                />

            </View>

            {/* Rental History */}

            <View style={styles.card}>

                <Text style={styles.sectionTitle}>
                    Rental History
                </Text>

                <RentalRow
                    name="Canon Camera"
                    date="12 Sep 2026"
                    status="Returned"
                />

                <RentalRow
                    name="HP Laptop"
                    date="05 Sep 2026"
                    status="Returned"
                />

                <RentalRow
                    name="Tripod Stand"
                    date="28 Aug 2026"
                    status="Returned"
                />

            </View>

            {/* Photos */}

            <View style={styles.card}>

                <Text style={styles.sectionTitle}>
                    Photos
                </Text>

                <View style={styles.photoRow}>

                    <View style={styles.photoPlaceholder}>
                        <Text style={styles.photoEmoji}>
                            📷
                        </Text>
                    </View>

                    <View style={styles.photoPlaceholder}>
                        <Text style={styles.photoEmoji}>
                            💻
                        </Text>
                    </View>

                    <View style={styles.photoPlaceholder}>
                        <Text style={styles.photoEmoji}>
                            🎥
                        </Text>
                    </View>

                </View>

            </View>

            {/* Verification */}

            <View style={styles.card}>

                <Text style={styles.sectionTitle}>
                    Verification
                </Text>

                <VerificationRow text="Identity Verified" />
                <VerificationRow text="Mobile Verified" />
                <VerificationRow text="Community Member" />

            </View>

            {/* Buttons */}

            <View style={styles.buttonContainer}>

                <TouchableOpacity
                    style={styles.requestButton}
                    onPress={() => router.push("/rental-request")}
                >
                    <Text style={styles.requestText}>
                        Request Rental
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.exchangeButton}
                    onPress={() => router.push("/exchange")}
                >
                    <Text style={styles.exchangeText}>
                        Interested in Exchange
                    </Text>
                </TouchableOpacity>

            </View>

        </ScrollView>
    );
}


/* Resource */

function ResourceCard({
    emoji,
    name,
    price,
    condition,
}: {
    emoji: string;
    name: string;
    price: string;
    condition: string;
}) {
    return (
        <TouchableOpacity
            style={styles.resource}
            onPress={() => router.push("/resource-details")}
        >

            <View style={styles.resourceImage}>
                <Text style={styles.resourceEmoji}>
                    {emoji}
                </Text>
            </View>

            <View style={styles.resourceInfo}>

                <Text style={styles.resourceName}>
                    {name}
                </Text>

                <Text style={styles.resourceCondition}>
                    {condition}
                </Text>

                <Text style={styles.resourcePrice}>
                    {price}
                </Text>

            </View>

            <Text style={styles.arrow}>
                ›
            </Text>

        </TouchableOpacity>
    );
}


/* Rental */

function RentalRow({
    name,
    date,
    status,
}: {
    name: string;
    date: string;
    status: string;
}) {
    return (
        <View style={styles.rentalRow}>

            <View style={styles.rentalIcon}>
                <Text>📦</Text>
            </View>

            <View style={styles.rentalInfo}>

                <Text style={styles.rentalName}>
                    {name}
                </Text>

                <Text style={styles.rentalDate}>
                    {date}
                </Text>

            </View>

            <Text style={styles.returned}>
                ✓ {status}
            </Text>

        </View>
    );
}


/* Verification */

function VerificationRow({
    text,
}: {
    text: string;
}) {
    return (
        <View style={styles.verificationRow}>

            <View style={styles.check}>
                <Text style={styles.checkText}>
                    ✓
                </Text>
            </View>

            <Text style={styles.verificationText}>
                {text}
            </Text>

        </View>
    );
}


const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: "#F5F7FF",
    },

    header: {
        backgroundColor: "#FFFFFF",
        alignItems: "center",
        paddingTop: 45,
        paddingBottom: 25,
    },

    avatar: {
        width: 90,
        height: 90,
        borderRadius: 45,
        backgroundColor: "#5B5FEF",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 12,
    },

    avatarText: {
        color: "#FFFFFF",
        fontSize: 38,
        fontWeight: "700",
    },

    name: {
        fontSize: 25,
        fontWeight: "700",
        color: "#20233A",
    },

    verifiedBadge: {
        marginTop: 8,
        backgroundColor: "#EAF8F0",
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 15,
    },

    verifiedText: {
        color: "#247A48",
        fontSize: 12,
        fontWeight: "700",
    },

    location: {
        color: "#777B8C",
        marginTop: 8,
        fontSize: 14,
    },

    statsCard: {
        margin: 16,
        backgroundColor: "#FFFFFF",
        borderRadius: 16,
        padding: 18,
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
    },

    stat: {
        alignItems: "center",
        flex: 1,
    },

    statNumber: {
        fontSize: 17,
        fontWeight: "700",
        color: "#25283D",
    },

    statLabel: {
        fontSize: 12,
        color: "#85899A",
        marginTop: 4,
    },

    divider: {
        width: 1,
        height: 35,
        backgroundColor: "#E5E7EF",
    },

    card: {
        backgroundColor: "#FFFFFF",
        marginHorizontal: 16,
        marginBottom: 15,
        borderRadius: 16,
        padding: 18,
    },

    sectionHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },

    sectionTitle: {
        fontSize: 18,
        fontWeight: "700",
        color: "#25283D",
        marginBottom: 12,
    },

    viewAll: {
        fontSize: 12,
        color: "#5B5FEF",
    },

    about: {
        color: "#707487",
        fontSize: 14,
        lineHeight: 21,
    },

    resource: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: "#F0F1F5",
    },

    resourceImage: {
        width: 58,
        height: 58,
        borderRadius: 12,
        backgroundColor: "#EEF0FF",
        justifyContent: "center",
        alignItems: "center",
    },

    resourceEmoji: {
        fontSize: 27,
    },

    resourceInfo: {
        flex: 1,
        marginLeft: 12,
    },

    resourceName: {
        fontSize: 15,
        fontWeight: "700",
        color: "#25283D",
    },

    resourceCondition: {
        fontSize: 12,
        color: "#85899A",
        marginTop: 4,
    },

    resourcePrice: {
        fontSize: 13,
        color: "#5B5FEF",
        fontWeight: "700",
        marginTop: 4,
    },

    arrow: {
        fontSize: 27,
        color: "#9AA0AE",
    },

    rentalRow: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 11,
        borderBottomWidth: 1,
        borderBottomColor: "#F0F1F5",
    },

    rentalIcon: {
        width: 42,
        height: 42,
        borderRadius: 10,
        backgroundColor: "#F1F2F6",
        justifyContent: "center",
        alignItems: "center",
    },

    rentalInfo: {
        flex: 1,
        marginLeft: 12,
    },

    rentalName: {
        fontSize: 14,
        fontWeight: "700",
        color: "#25283D",
    },

    rentalDate: {
        fontSize: 12,
        color: "#85899A",
        marginTop: 3,
    },

    returned: {
        color: "#2E8B57",
        fontSize: 11,
        fontWeight: "700",
    },

    photoRow: {
        flexDirection: "row",
        gap: 10,
    },

    photoPlaceholder: {
        flex: 1,
        height: 95,
        borderRadius: 12,
        backgroundColor: "#EEF0FF",
        justifyContent: "center",
        alignItems: "center",
    },

    photoEmoji: {
        fontSize: 35,
    },

    verificationRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 12,
    },

    check: {
        width: 25,
        height: 25,
        borderRadius: 13,
        backgroundColor: "#2E8B57",
        justifyContent: "center",
        alignItems: "center",
    },

    checkText: {
        color: "#FFFFFF",
        fontWeight: "700",
    },

    verificationText: {
        marginLeft: 10,
        fontSize: 14,
        color: "#404357",
    },

    buttonContainer: {
        paddingHorizontal: 16,
        paddingBottom: 40,
    },

    requestButton: {
        height: 50,
        backgroundColor: "#5B5FEF",
        borderRadius: 13,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 10,
    },

    requestText: {
        color: "#FFFFFF",
        fontSize: 15,
        fontWeight: "700",
    },

    exchangeButton: {
        height: 50,
        backgroundColor: "#FFFFFF",
        borderRadius: 13,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#5B5FEF",
    },

    exchangeText: {
        color: "#5B5FEF",
        fontSize: 15,
        fontWeight: "700",
    },
});