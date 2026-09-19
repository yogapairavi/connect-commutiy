import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    TextInput,
    Alert,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function Guarantor() {
    const params = useLocalSearchParams();

    const resourceName = String(
        params.resourceName || "Resource"
    );
    const owner = String(
        params.owner || "Owner"
    );
    const duration = String(
        params.duration || "1"
    );
    const total = String(
        params.total || "350"
    );
    const advance = String(
        params.advance || "175"
    );
    const startDate = String(
        params.startDate || ""
    );
    const endDate = String(
        params.endDate || ""
    );
    const pickupType = String(
        params.pickupType || "Pickup"
    );

    const [phone, setPhone] = useState("");
    const [idNumber, setIdNumber] = useState("");

    const continueNext = () => {
        if (!phone.trim()) {
            Alert.alert(
                "Guarantor Required",
                "Please enter the guarantor phone number."
            );
            return;
        }

        if (phone.trim().length < 10) {
            Alert.alert(
                "Invalid Phone",
                "Please enter a valid 10-digit phone number."
            );
            return;
        }

        if (!idNumber.trim()) {
            Alert.alert(
                "ID Required",
                "Please enter the guarantor ID."
            );
            return;
        }

        router.push({
            pathname: "/digital-agreement",
            params: {
                resourceName,
                owner,
                duration,
                total,
                advance,
                startDate,
                endDate,
                pickupType,
                guarantorPhone: phone,
                guarantorId: idNumber,
            },
        });
    };

    return (
        <ScrollView
            style={styles.container}
            contentContainerStyle={styles.content}
            keyboardShouldPersistTaps="handled"
        >
            <View style={styles.topBar}>
                <TouchableOpacity onPress={() => router.back()}>
                    <Ionicons
                        name="arrow-back"
                        size={25}
                        color="#222"
                    />
                </TouchableOpacity>

                <Text style={styles.title}>
                    Guarantor
                </Text>

                <View style={{ width: 25 }} />
            </View>

            <View style={styles.progress}>
                <View style={styles.progressDone} />
                <View style={styles.progressActive} />
                <View style={styles.progressPending} />
                <View style={styles.progressPending} />
            </View>

            <Text style={styles.progressText}>
                Step 2 of 5
            </Text>

            <View style={styles.headerCard}>
                <View style={styles.iconCircle}>
                    <Ionicons
                        name="shield-checkmark-outline"
                        size={32}
                        color="#5B5FEF"
                    />
                </View>

                <Text style={styles.headerTitle}>
                    Add a Guarantor
                </Text>

                <Text style={styles.headerText}>
                    A verified community member can act as a
                    guarantor for your rental request.
                </Text>
            </View>

            <View style={styles.rentalCard}>
                <Text style={styles.cardTitle}>
                    Rental Request
                </Text>

                <InfoRow
                    icon="cube-outline"
                    label="Resource"
                    value={resourceName}
                />

                <InfoRow
                    icon="person-outline"
                    label="Owner"
                    value={owner}
                />

                <InfoRow
                    icon="calendar-outline"
                    label="Duration"
                    value={`${duration} day(s)`}
                />

                <InfoRow
                    icon="cash-outline"
                    label="Total"
                    value={`₹${total}`}
                />

                <InfoRow
                    icon="wallet-outline"
                    label="Advance"
                    value={`₹${advance}`}
                />

                <InfoRow
                    icon="location-outline"
                    label="Method"
                    value={pickupType}
                />
            </View>

            <Text style={styles.sectionTitle}>
                Guarantor Details
            </Text>

            <Text style={styles.label}>
                Guarantor Mobile Number *
            </Text>

            <TextInput
                style={styles.input}
                placeholder="Enter 10-digit mobile number"
                keyboardType="phone-pad"
                value={phone}
                onChangeText={setPhone}
                maxLength={10}
            />

            <Text style={styles.label}>
                Guarantor ID *
            </Text>

            <TextInput
                style={styles.input}
                placeholder="College ID / Community ID"
                value={idNumber}
                onChangeText={setIdNumber}
                autoCapitalize="characters"
            />

            <View style={styles.warningCard}>
                <Ionicons
                    name="information-circle-outline"
                    size={22}
                    color="#C78300"
                />

                <Text style={styles.warningText}>
                    The guarantor will receive a request and must
                    accept it before the rental can proceed.
                </Text>
            </View>

            <View style={styles.guaranteeCard}>
                <Ionicons
                    name="shield-outline"
                    size={25}
                    color="#2E8B57"
                />

                <View style={{ flex: 1, marginLeft: 10 }}>
                    <Text style={styles.guaranteeTitle}>
                        Community Protection
                    </Text>

                    <Text style={styles.guaranteeText}>
                        Guarantor information is used for rental
                        accountability and overdue support according
                        to the agreed rental terms.
                    </Text>
                </View>
            </View>

            <TouchableOpacity
                style={styles.continueButton}
                onPress={continueNext}
            >
                <Text style={styles.continueText}>
                    Continue to Agreement
                </Text>

                <Ionicons
                    name="arrow-forward"
                    size={20}
                    color="#fff"
                />
            </TouchableOpacity>

            <View style={{ height: 35 }} />
        </ScrollView>
    );
}

function InfoRow({
    icon,
    label,
    value,
}: {
    icon: any;
    label: string;
    value: string;
}) {
    return (
        <View style={styles.infoRow}>
            <Ionicons
                name={icon}
                size={18}
                color="#5B5FEF"
            />

            <Text style={styles.infoLabel}>
                {label}
            </Text>

            <Text style={styles.infoValue}>
                {value}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F6F7FB",
    },

    content: {
        padding: 18,
    },

    topBar: {
        paddingTop: 40,
        paddingBottom: 15,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },

    title: {
        fontSize: 20,
        fontWeight: "700",
        color: "#222",
    },

    progress: {
        height: 5,
        flexDirection: "row",
        gap: 5,
        marginTop: 5,
    },

    progressDone: {
        flex: 1,
        backgroundColor: "#5B5FEF",
        borderRadius: 5,
    },

    progressActive: {
        flex: 1,
        backgroundColor: "#5B5FEF",
        borderRadius: 5,
    },

    progressPending: {
        flex: 1,
        backgroundColor: "#DCDDE5",
        borderRadius: 5,
    },

    progressText: {
        fontSize: 10,
        color: "#888",
        marginTop: 6,
        textAlign: "right",
    },

    headerCard: {
        backgroundColor: "#EEF0FF",
        borderRadius: 20,
        alignItems: "center",
        padding: 22,
        marginTop: 15,
    },

    iconCircle: {
        width: 65,
        height: 65,
        borderRadius: 33,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },

    headerTitle: {
        fontSize: 20,
        fontWeight: "700",
        color: "#333",
        marginTop: 12,
    },

    headerText: {
        fontSize: 11,
        color: "#777",
        textAlign: "center",
        lineHeight: 17,
        marginTop: 5,
    },

    rentalCard: {
        backgroundColor: "#fff",
        borderRadius: 18,
        padding: 15,
        marginTop: 18,
    },

    cardTitle: {
        fontSize: 15,
        fontWeight: "700",
        color: "#333",
        marginBottom: 5,
    },

    infoRow: {
        minHeight: 42,
        flexDirection: "row",
        alignItems: "center",
        borderBottomWidth: 1,
        borderBottomColor: "#F1F1F1",
    },

    infoLabel: {
        fontSize: 11,
        color: "#777",
        marginLeft: 9,
        width: 75,
    },

    infoValue: {
        flex: 1,
        fontSize: 12,
        color: "#333",
        fontWeight: "600",
        textAlign: "right",
    },

    sectionTitle: {
        fontSize: 18,
        fontWeight: "700",
        color: "#222",
        marginTop: 22,
        marginBottom: 10,
    },

    label: {
        fontSize: 13,
        fontWeight: "600",
        color: "#444",
        marginTop: 10,
        marginBottom: 7,
    },

    input: {
        height: 51,
        backgroundColor: "#fff",
        borderRadius: 13,
        borderWidth: 1,
        borderColor: "#E2E3EA",
        paddingHorizontal: 14,
        fontSize: 13,
        color: "#222",
    },

    warningCard: {
        backgroundColor: "#FFF7E5",
        borderRadius: 16,
        padding: 14,
        marginTop: 18,
        flexDirection: "row",
    },

    warningText: {
        flex: 1,
        fontSize: 10,
        color: "#765A20",
        lineHeight: 16,
        marginLeft: 8,
    },

    guaranteeCard: {
        backgroundColor: "#EAF7EF",
        borderRadius: 16,
        padding: 14,
        marginTop: 12,
        flexDirection: "row",
        alignItems: "flex-start",
    },

    guaranteeTitle: {
        fontSize: 13,
        fontWeight: "700",
        color: "#246B45",
    },

    guaranteeText: {
        fontSize: 10,
        color: "#557563",
        lineHeight: 16,
        marginTop: 4,
    },

    continueButton: {
        height: 55,
        backgroundColor: "#5B5FEF",
        borderRadius: 15,
        marginTop: 22,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
    },

    continueText: {
        color: "#fff",
        fontSize: 15,
        fontWeight: "700",
        marginRight: 8,
    },
});