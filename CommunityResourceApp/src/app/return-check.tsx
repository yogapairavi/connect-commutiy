import React from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Alert,
} from "react-native";
import { useLocalSearchParams, router } from "expo-router";

export default function ReturnCheck() {
    const params = useLocalSearchParams();

    const resourceName = String(params.resourceName || "Resource");
    const owner = String(params.owner || "Owner");
    const duration = String(params.duration || "1 Day");
    const startDate = String(params.startDate || "-");
    const endDate = String(params.endDate || "-");
    const pickupType = String(params.pickupType || "Pickup");

    const handleReturn = () => {
        Alert.alert(
            "Return Started",
            "Your return request has been created. Continue with QR verification.",
            [
                {
                    text: "Continue",
                    onPress: () =>
                        router.push({
                            pathname: "/qr-return",
                            params: {
                                resourceName,
                                owner,
                                duration,
                                startDate,
                                endDate,
                                pickupType,
                            },
                        }),
                },
            ]
        );
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Rental Active</Text>
                <Text style={styles.subtitle}>
                    Your resource is currently rented
                </Text>
            </View>

            <View style={styles.statusCard}>
                <View style={styles.statusCircle}>
                    <Text style={styles.check}>✓</Text>
                </View>

                <View>
                    <Text style={styles.activeText}>Rental in Progress</Text>
                    <Text style={styles.smallText}>
                        Keep the resource safe until return.
                    </Text>
                </View>
            </View>

            <View style={styles.card}>
                <Text style={styles.sectionTitle}>Resource Details</Text>

                <Text style={styles.label}>Resource</Text>
                <Text style={styles.value}>{resourceName}</Text>

                <Text style={styles.label}>Owner</Text>
                <Text style={styles.value}>{owner}</Text>

                <Text style={styles.label}>Rental Duration</Text>
                <Text style={styles.value}>{duration}</Text>

                <Text style={styles.label}>Start Date</Text>
                <Text style={styles.value}>{startDate}</Text>

                <Text style={styles.label}>Return Date</Text>
                <Text style={styles.value}>{endDate}</Text>

                <Text style={styles.label}>Pickup Method</Text>
                <Text style={styles.value}>{pickupType}</Text>
            </View>

            <View style={styles.card}>
                <Text style={styles.sectionTitle}>Before Returning</Text>

                <View style={styles.item}>
                    <Text style={styles.icon}>✓</Text>
                    <Text style={styles.itemText}>
                        Make sure all accessories are included
                    </Text>
                </View>

                <View style={styles.item}>
                    <Text style={styles.icon}>✓</Text>
                    <Text style={styles.itemText}>
                        Check the resource for new damage
                    </Text>
                </View>

                <View style={styles.item}>
                    <Text style={styles.icon}>✓</Text>
                    <Text style={styles.itemText}>
                        Keep the resource clean and ready
                    </Text>
                </View>

                <View style={styles.item}>
                    <Text style={styles.icon}>✓</Text>
                    <Text style={styles.itemText}>
                        Keep the original accessories with it
                    </Text>
                </View>
            </View>

            <TouchableOpacity style={styles.returnButton} onPress={handleReturn}>
                <Text style={styles.returnButtonText}>Start Return →</Text>
            </TouchableOpacity>

            <Text style={styles.note}>
                After return, AI will compare the current condition with the original
                condition record.
            </Text>
        </ScrollView>
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
        marginBottom: 20,
    },

    title: {
        fontSize: 28,
        fontWeight: "800",
        color: "#171A2B",
    },

    subtitle: {
        fontSize: 14,
        color: "#777C8B",
        marginTop: 5,
    },

    statusCard: {
        backgroundColor: "#EAF8EF",
        borderRadius: 18,
        padding: 18,
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 18,
    },

    statusCircle: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: "#35A66F",
        justifyContent: "center",
        alignItems: "center",
        marginRight: 14,
    },

    check: {
        color: "#FFFFFF",
        fontSize: 25,
        fontWeight: "800",
    },

    activeText: {
        fontSize: 17,
        fontWeight: "700",
        color: "#187044",
    },

    smallText: {
        fontSize: 12,
        color: "#56816A",
        marginTop: 3,
    },

    card: {
        backgroundColor: "#FFFFFF",
        borderRadius: 18,
        padding: 20,
        marginBottom: 18,
    },

    sectionTitle: {
        fontSize: 18,
        fontWeight: "800",
        color: "#202333",
        marginBottom: 15,
    },

    label: {
        fontSize: 12,
        color: "#8A8F9E",
        marginTop: 10,
    },

    value: {
        fontSize: 15,
        fontWeight: "600",
        color: "#25283A",
        marginTop: 3,
    },

    item: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 14,
    },

    icon: {
        width: 25,
        height: 25,
        borderRadius: 13,
        backgroundColor: "#EAF8EF",
        color: "#35A66F",
        textAlign: "center",
        lineHeight: 25,
        fontWeight: "800",
        marginRight: 10,
    },

    itemText: {
        flex: 1,
        fontSize: 14,
        color: "#4D5262",
    },

    returnButton: {
        backgroundColor: "#5B5FEF",
        paddingVertical: 17,
        borderRadius: 15,
        alignItems: "center",
        marginTop: 5,
    },

    returnButtonText: {
        color: "#FFFFFF",
        fontSize: 17,
        fontWeight: "800",
    },

    note: {
        textAlign: "center",
        color: "#858A99",
        fontSize: 12,
        lineHeight: 18,
        marginTop: 15,
        marginBottom: 30,
    },
});