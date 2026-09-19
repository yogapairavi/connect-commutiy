import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TextInput,
    TouchableOpacity,
    Alert,
} from "react-native";
import { useLocalSearchParams, router } from "expo-router";

export default function RentalRequest() {
    const params = useLocalSearchParams();

    const resourceName = String(params.resourceName || "Resource");
    const category = String(params.category || "Category");
    const price = String(params.price || "₹350/day");
    const owner = String(params.owner || "Owner");
    const condition = String(params.condition || "Good");
    const location = String(params.location || "College Campus");
    const deposit = String(params.deposit || "₹1000");

    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [duration, setDuration] = useState("1 Day");
    const [pickupType, setPickupType] = useState("Pickup");
    const [guarantorPhone, setGuarantorPhone] = useState("");

    const sendRequest = () => {
        if (!startDate || !endDate) {
            Alert.alert(
                "Missing Dates",
                "Please enter rental start and return dates."
            );
            return;
        }

        Alert.alert(
            "Request Sent",
            `Your rental request has been sent to ${owner}.`,
            [
                {
                    text: "Continue",
                    onPress: () =>
                        router.push({
                            pathname: "/guarantor",
                            params: {
                                resourceName,
                                category,
                                price,
                                owner,
                                condition,
                                location,
                                deposit,
                                startDate,
                                endDate,
                                duration,
                                pickupType,
                                guarantorPhone,
                            },
                        }),
                },
            ]
        );
    };

    return (
        <ScrollView style={styles.container}>
            <TouchableOpacity
                style={styles.back}
                onPress={() => router.back()}
            >
                <Text style={styles.backText}>‹</Text>
            </TouchableOpacity>

            <Text style={styles.title}>Rental Request</Text>

            <Text style={styles.subtitle}>
                Send your requirement to the resource owner.
            </Text>

            <View style={styles.resourceCard}>
                <View style={styles.iconBox}>
                    <Text style={styles.icon}>📦</Text>
                </View>

                <View style={{ flex: 1 }}>
                    <Text style={styles.resourceName}>{resourceName}</Text>
                    <Text style={styles.category}>{category}</Text>
                    <Text style={styles.price}>{price}</Text>
                    <Text style={styles.owner}>Owner: {owner}</Text>
                </View>
            </View>

            <Text style={styles.section}>Rental Period</Text>

            <Input
                label="Start Date *"
                placeholder="DD/MM/YYYY"
                value={startDate}
                onChangeText={setStartDate}
            />

            <Input
                label="Return Date *"
                placeholder="DD/MM/YYYY"
                value={endDate}
                onChangeText={setEndDate}
            />

            <Text style={styles.label}>Duration</Text>

            <View style={styles.options}>
                {["1 Day", "2 Days", "3 Days", "1 Week"].map((item) => (
                    <TouchableOpacity
                        key={item}
                        style={[
                            styles.option,
                            duration === item && styles.selected,
                        ]}
                        onPress={() => setDuration(item)}
                    >
                        <Text
                            style={[
                                styles.optionText,
                                duration === item && styles.selectedText,
                            ]}
                        >
                            {item}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            <Text style={styles.section}>Pickup Method</Text>

            <View style={styles.pickupRow}>
                <TouchableOpacity
                    style={[
                        styles.pickup,
                        pickupType === "Pickup" && styles.selectedPickup,
                    ]}
                    onPress={() => setPickupType("Pickup")}
                >
                    <Text style={styles.pickupIcon}>📍</Text>
                    <Text style={styles.pickupTitle}>Pickup</Text>
                    <Text style={styles.pickupText}>
                        Collect from owner
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[
                        styles.pickup,
                        pickupType === "Delivery" && styles.selectedPickup,
                    ]}
                    onPress={() => setPickupType("Delivery")}
                >
                    <Text style={styles.pickupIcon}>🚚</Text>
                    <Text style={styles.pickupTitle}>Delivery</Text>
                    <Text style={styles.pickupText}>
                        Delivery may have extra fee
                    </Text>
                </TouchableOpacity>
            </View>

            <Text style={styles.section}>Guarantor</Text>

            <Input
                label="Verified Guarantor Mobile Number"
                placeholder="Enter mobile number"
                value={guarantorPhone}
                onChangeText={setGuarantorPhone}
                keyboardType="phone-pad"
            />

            <View style={styles.costCard}>
                <Text style={styles.costTitle}>Estimated Rental</Text>

                <View style={styles.costRow}>
                    <Text style={styles.costLabel}>Rental Price</Text>
                    <Text style={styles.costValue}>{price}</Text>
                </View>

                <View style={styles.costRow}>
                    <Text style={styles.costLabel}>Security Deposit</Text>
                    <Text style={styles.costValue}>{deposit}</Text>
                </View>

                <View style={styles.costRow}>
                    <Text style={styles.costLabel}>Condition</Text>
                    <Text style={styles.costValue}>{condition}</Text>
                </View>

                <View style={styles.costRow}>
                    <Text style={styles.costLabel}>Location</Text>
                    <Text style={styles.costValue}>{location}</Text>
                </View>
            </View>

            <TouchableOpacity
                style={styles.requestButton}
                onPress={sendRequest}
            >
                <Text style={styles.requestText}>
                    Send Rental Request
                </Text>
            </TouchableOpacity>

            <Text style={styles.note}>
                You can send requests to multiple suitable owners and choose
                based on their responses.
            </Text>

            <View style={{ height: 40 }} />
        </ScrollView>
    );
}

function Input({
    label,
    placeholder,
    value,
    onChangeText,
    keyboardType = "default",
}: {
    label: string;
    placeholder: string;
    value: string;
    onChangeText: (text: string) => void;
    keyboardType?: "default" | "phone-pad";
}) {
    return (
        <View style={styles.inputContainer}>
            <Text style={styles.label}>{label}</Text>

            <TextInput
                style={styles.input}
                placeholder={placeholder}
                placeholderTextColor="#A0A4B0"
                value={value}
                onChangeText={onChangeText}
                keyboardType={keyboardType}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F5F7FF",
        padding: 20,
    },

    back: {
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

    title: {
        fontSize: 28,
        fontWeight: "800",
        color: "#191C2B",
        marginTop: 18,
    },

    subtitle: {
        fontSize: 13,
        color: "#858A99",
        marginTop: 5,
        marginBottom: 18,
    },

    resourceCard: {
        backgroundColor: "#FFFFFF",
        borderRadius: 18,
        padding: 15,
        flexDirection: "row",
    },

    iconBox: {
        width: 65,
        height: 70,
        borderRadius: 13,
        backgroundColor: "#EEF0FF",
        justifyContent: "center",
        alignItems: "center",
        marginRight: 12,
    },

    icon: {
        fontSize: 30,
    },

    resourceName: {
        fontSize: 16,
        fontWeight: "800",
        color: "#303445",
    },

    category: {
        fontSize: 10,
        color: "#858A99",
        marginTop: 3,
    },

    price: {
        fontSize: 14,
        fontWeight: "800",
        color: "#5B5FEF",
        marginTop: 5,
    },

    owner: {
        fontSize: 10,
        color: "#777C8B",
        marginTop: 3,
    },

    section: {
        fontSize: 19,
        fontWeight: "800",
        color: "#25283A",
        marginTop: 23,
        marginBottom: 12,
    },

    inputContainer: {
        marginBottom: 13,
    },

    label: {
        fontSize: 12,
        fontWeight: "700",
        color: "#555A69",
        marginBottom: 6,
    },

    input: {
        backgroundColor: "#FFFFFF",
        borderRadius: 13,
        paddingHorizontal: 14,
        paddingVertical: 13,
        fontSize: 14,
        color: "#25283A",
        borderWidth: 1,
        borderColor: "#E8EAF0",
    },

    options: {
        flexDirection: "row",
        flexWrap: "wrap",
    },

    option: {
        backgroundColor: "#FFFFFF",
        paddingHorizontal: 14,
        paddingVertical: 10,
        borderRadius: 20,
        marginRight: 8,
        marginBottom: 8,
        borderWidth: 1,
        borderColor: "#E5E6EC",
    },

    selected: {
        backgroundColor: "#5B5FEF",
        borderColor: "#5B5FEF",
    },

    optionText: {
        fontSize: 12,
        color: "#666B79",
    },

    selectedText: {
        color: "#FFFFFF",
        fontWeight: "700",
    },

    pickupRow: {
        flexDirection: "row",
        justifyContent: "space-between",
    },

    pickup: {
        width: "48%",
        backgroundColor: "#FFFFFF",
        borderRadius: 17,
        padding: 15,
        borderWidth: 1,
        borderColor: "#E5E6EC",
    },

    selectedPickup: {
        borderColor: "#5B5FEF",
        borderWidth: 2,
    },

    pickupIcon: {
        fontSize: 25,
    },

    pickupTitle: {
        fontSize: 14,
        fontWeight: "800",
        color: "#303445",
        marginTop: 7,
    },

    pickupText: {
        fontSize: 10,
        color: "#858A99",
        marginTop: 4,
        lineHeight: 14,
    },

    costCard: {
        backgroundColor: "#FFFFFF",
        borderRadius: 18,
        padding: 18,
        marginTop: 8,
    },

    costTitle: {
        fontSize: 17,
        fontWeight: "800",
        color: "#303445",
        marginBottom: 8,
    },

    costRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: "#F0F1F5",
    },

    costLabel: {
        fontSize: 12,
        color: "#858A99",
    },

    costValue: {
        fontSize: 12,
        fontWeight: "700",
        color: "#303445",
    },

    requestButton: {
        backgroundColor: "#5B5FEF",
        borderRadius: 15,
        paddingVertical: 17,
        alignItems: "center",
        marginTop: 20,
    },

    requestText: {
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: "800",
    },

    note: {
        textAlign: "center",
        fontSize: 11,
        color: "#9296A3",
        marginTop: 10,
        lineHeight: 16,
    },
});