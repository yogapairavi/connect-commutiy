import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Alert,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function Payment() {
    const params = useLocalSearchParams();

    const resourceName = String(
        params.resourceName || "Resource"
    );
    const owner = String(params.owner || "Owner");
    const total = Number(params.total || 350);
    const advance = Number(params.advance || 175);
    const duration = String(params.duration || "1");
    const startDate = String(params.startDate || "");
    const endDate = String(params.endDate || "");
    const pickupType = String(
        params.pickupType || "Pickup"
    );

    const [method, setMethod] = useState("UPI");

    const completePayment = () => {
        Alert.alert(
            "Payment Successful",
            `₹${advance} advance payment recorded for the prototype.`,
            [
                {
                    text: "Continue",
                    onPress: () =>
                        router.push({
                            pathname: "/qr-pickup",
                            params: {
                                resourceName,
                                owner,
                                total: String(total),
                                advance: String(advance),
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
        <ScrollView
            style={styles.container}
            contentContainerStyle={styles.content}
        >
            <View style={styles.topBar}>
                <TouchableOpacity onPress={() => router.back()}>
                    <Ionicons
                        name="arrow-back"
                        size={25}
                        color="#222"
                    />
                </TouchableOpacity>

                <Text style={styles.title}>Payment</Text>

                <View style={{ width: 25 }} />
            </View>

            <View style={styles.secureCard}>
                <Ionicons
                    name="shield-checkmark"
                    size={25}
                    color="#2E8B57"
                />

                <View style={{ marginLeft: 10, flex: 1 }}>
                    <Text style={styles.secureTitle}>
                        Secure Community Payment
                    </Text>

                    <Text style={styles.secureText}>
                        Payment is linked to this rental request.
                    </Text>
                </View>
            </View>

            <Text style={styles.sectionTitle}>
                Payment Summary
            </Text>

            <View style={styles.summaryCard}>
                <Text style={styles.resourceName}>
                    {resourceName}
                </Text>

                <Text style={styles.owner}>
                    Owner: {owner}
                </Text>

                <View style={styles.divider} />

                <PaymentRow
                    label="Rental duration"
                    value={`${duration} day(s)`}
                />

                <PaymentRow
                    label="Rental total"
                    value={`₹${total}`}
                />

                <PaymentRow
                    label="Advance payment"
                    value={`₹${advance}`}
                />

                <PaymentRow
                    label="Remaining amount"
                    value={`₹${total - advance}`}
                />

                <View style={styles.totalBox}>
                    <Text style={styles.payLabel}>
                        Pay Now
                    </Text>

                    <Text style={styles.payAmount}>
                        ₹{advance}
                    </Text>
                </View>
            </View>

            <Text style={styles.sectionTitle}>
                Payment Method
            </Text>

            <PaymentMethod
                icon="phone-portrait-outline"
                title="UPI"
                subtitle="Google Pay / PhonePe / Paytm"
                selected={method === "UPI"}
                onPress={() => setMethod("UPI")}
            />

            <PaymentMethod
                icon="card-outline"
                title="Card"
                subtitle="Debit / Credit Card"
                selected={method === "Card"}
                onPress={() => setMethod("Card")}
            />

            <PaymentMethod
                icon="wallet-outline"
                title="Wallet"
                subtitle="Use community wallet balance"
                selected={method === "Wallet"}
                onPress={() => setMethod("Wallet")}
            />

            <View style={styles.infoCard}>
                <Ionicons
                    name="information-circle-outline"
                    size={21}
                    color="#5B5FEF"
                />

                <Text style={styles.infoText}>
                    The remaining amount can be handled according
                    to the agreed rental terms after successful
                    return.
                </Text>
            </View>

            <View style={styles.rentalInfo}>
                <InfoItem
                    icon="calendar-outline"
                    title="Rental"
                    value={`${startDate || "Start"} → ${endDate || "End"
                        }`}
                />

                <InfoItem
                    icon="location-outline"
                    title="Method"
                    value={pickupType}
                />
            </View>

            <TouchableOpacity
                style={styles.payButton}
                onPress={completePayment}
            >
                <Ionicons
                    name="lock-closed-outline"
                    size={20}
                    color="#fff"
                />

                <Text style={styles.payButtonText}>
                    Pay ₹{advance}
                </Text>
            </TouchableOpacity>

            <Text style={styles.demoText}>
                Prototype payment screen — real payment gateway
                can be connected later.
            </Text>

            <View style={{ height: 35 }} />
        </ScrollView>
    );
}

function PaymentRow({
    label,
    value,
}: {
    label: string;
    value: string;
}) {
    return (
        <View style={styles.paymentRow}>
            <Text style={styles.paymentLabel}>
                {label}
            </Text>

            <Text style={styles.paymentValue}>
                {value}
            </Text>
        </View>
    );
}

function PaymentMethod({
    icon,
    title,
    subtitle,
    selected,
    onPress,
}: {
    icon: any;
    title: string;
    subtitle: string;
    selected: boolean;
    onPress: () => void;
}) {
    return (
        <TouchableOpacity
            style={[
                styles.methodCard,
                selected && styles.selectedMethod,
            ]}
            onPress={onPress}
        >
            <View style={styles.methodIcon}>
                <Ionicons
                    name={icon}
                    size={22}
                    color="#5B5FEF"
                />
            </View>

            <View style={{ flex: 1 }}>
                <Text style={styles.methodTitle}>
                    {title}
                </Text>

                <Text style={styles.methodSubtitle}>
                    {subtitle}
                </Text>
            </View>

            <View
                style={[
                    styles.radio,
                    selected && styles.radioSelected,
                ]}
            >
                {selected && <View style={styles.radioDot} />}
            </View>
        </TouchableOpacity>
    );
}

function InfoItem({
    icon,
    title,
    value,
}: {
    icon: any;
    title: string;
    value: string;
}) {
    return (
        <View style={styles.infoItem}>
            <Ionicons
                name={icon}
                size={20}
                color="#5B5FEF"
            />

            <View style={{ marginLeft: 8 }}>
                <Text style={styles.infoItemTitle}>
                    {title}
                </Text>

                <Text style={styles.infoItemValue}>
                    {value}
                </Text>
            </View>
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
        paddingBottom: 20,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },

    title: {
        fontSize: 20,
        fontWeight: "700",
        color: "#222",
    },

    secureCard: {
        backgroundColor: "#EAF7EF",
        borderRadius: 17,
        padding: 14,
        flexDirection: "row",
        alignItems: "center",
    },

    secureTitle: {
        fontSize: 14,
        fontWeight: "700",
        color: "#246B45",
    },

    secureText: {
        fontSize: 10,
        color: "#557563",
        marginTop: 3,
    },

    sectionTitle: {
        fontSize: 18,
        fontWeight: "700",
        color: "#222",
        marginTop: 22,
        marginBottom: 10,
    },

    summaryCard: {
        backgroundColor: "#fff",
        borderRadius: 18,
        padding: 17,
    },

    resourceName: {
        fontSize: 17,
        fontWeight: "700",
        color: "#333",
    },

    owner: {
        fontSize: 11,
        color: "#777",
        marginTop: 4,
    },

    divider: {
        height: 1,
        backgroundColor: "#EEEEEE",
        marginVertical: 14,
    },

    paymentRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 13,
    },

    paymentLabel: {
        fontSize: 12,
        color: "#777",
    },

    paymentValue: {
        fontSize: 12,
        color: "#333",
        fontWeight: "600",
    },

    totalBox: {
        backgroundColor: "#EEF0FF",
        borderRadius: 14,
        padding: 14,
        marginTop: 5,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },

    payLabel: {
        fontSize: 14,
        fontWeight: "700",
        color: "#4B4FC7",
    },

    payAmount: {
        fontSize: 20,
        fontWeight: "700",
        color: "#5B5FEF",
    },

    methodCard: {
        backgroundColor: "#fff",
        borderRadius: 16,
        padding: 13,
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 9,
        borderWidth: 1,
        borderColor: "#E4E5EB",
    },

    selectedMethod: {
        borderColor: "#5B5FEF",
        backgroundColor: "#F7F7FF",
    },

    methodIcon: {
        width: 43,
        height: 43,
        borderRadius: 13,
        backgroundColor: "#EEF0FF",
        alignItems: "center",
        justifyContent: "center",
        marginRight: 11,
    },

    methodTitle: {
        fontSize: 14,
        fontWeight: "700",
        color: "#333",
    },

    methodSubtitle: {
        fontSize: 10,
        color: "#888",
        marginTop: 3,
    },

    radio: {
        width: 21,
        height: 21,
        borderRadius: 11,
        borderWidth: 1.5,
        borderColor: "#BFC1CB",
        alignItems: "center",
        justifyContent: "center",
    },

    radioSelected: {
        borderColor: "#5B5FEF",
    },

    radioDot: {
        width: 11,
        height: 11,
        borderRadius: 6,
        backgroundColor: "#5B5FEF",
    },

    infoCard: {
        backgroundColor: "#EEF0FF",
        borderRadius: 16,
        padding: 14,
        flexDirection: "row",
        marginTop: 12,
    },

    infoText: {
        flex: 1,
        fontSize: 10,
        color: "#666",
        lineHeight: 16,
        marginLeft: 8,
    },

    rentalInfo: {
        backgroundColor: "#fff",
        borderRadius: 16,
        padding: 14,
        marginTop: 12,
        flexDirection: "row",
        justifyContent: "space-between",
    },

    infoItem: {
        flexDirection: "row",
        alignItems: "center",
    },

    infoItemTitle: {
        fontSize: 9,
        color: "#888",
    },

    infoItemValue: {
        fontSize: 10,
        fontWeight: "600",
        color: "#333",
        marginTop: 3,
    },

    payButton: {
        height: 55,
        borderRadius: 15,
        backgroundColor: "#5B5FEF",
        marginTop: 22,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },

    payButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "700",
        marginLeft: 8,
    },

    demoText: {
        fontSize: 9,
        color: "#999",
        textAlign: "center",
        marginTop: 9,
    },
});