import React from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Alert,
} from "react-native";
import { useLocalSearchParams, router } from "expo-router";

export default function QRReturn() {
    const params = useLocalSearchParams();

    const resourceName = String(params.resourceName || "Resource");
    const owner = String(params.owner || "Owner");
    const duration = String(params.duration || "1 Day");
    const startDate = String(params.startDate || "-");
    const endDate = String(params.endDate || "-");
    const pickupType = String(params.pickupType || "Pickup");

    const verifyReturn = () => {
        Alert.alert(
            "Return QR Verified",
            "Return has been successfully verified.",
            [
                {
                    text: "Continue",
                    onPress: () =>
                        router.replace({
                            pathname: "/rental-passport",
                            params: {
                                resourceName,
                                owner,
                                duration,
                                startDate,
                                endDate,
                                pickupType,
                                returnStatus: "Verified",
                            },
                        }),
                },
            ]
        );
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Return Verification</Text>

            <Text style={styles.subtitle}>
                Scan the temporary QR code to complete the return.
            </Text>

            <View style={styles.resourceCard}>
                <Text style={styles.resourceName}>{resourceName}</Text>
                <Text style={styles.owner}>Owner: {owner}</Text>
            </View>

            <View style={styles.qrBox}>
                <View style={styles.qrPattern}>
                    <Text style={styles.qrText}>QR</Text>
                </View>

                <Text style={styles.qrLabel}>Temporary Return QR</Text>

                <Text style={styles.qrInfo}>
                    This QR is valid only for this rental return.
                </Text>
            </View>

            <View style={styles.infoCard}>
                <Text style={styles.infoTitle}>Return Flow</Text>

                <Text style={styles.step}>1. Owner scans the return QR</Text>
                <Text style={styles.step}>2. Return is recorded</Text>
                <Text style={styles.step}>3. AI checks resource condition</Text>
                <Text style={styles.step}>4. Rental Passport is updated</Text>
            </View>

            <TouchableOpacity style={styles.button} onPress={verifyReturn}>
                <Text style={styles.buttonText}>Verify Return QR</Text>
            </TouchableOpacity>

            <Text style={styles.note}>
                Prototype mode: QR verification is simulated.
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F5F7FF",
        padding: 20,
        alignItems: "center",
    },

    title: {
        fontSize: 28,
        fontWeight: "800",
        color: "#171A2B",
        marginTop: 55,
    },

    subtitle: {
        fontSize: 14,
        color: "#777C8B",
        textAlign: "center",
        marginTop: 8,
        marginBottom: 20,
    },

    resourceCard: {
        width: "100%",
        backgroundColor: "#FFFFFF",
        padding: 18,
        borderRadius: 18,
        marginBottom: 20,
    },

    resourceName: {
        fontSize: 18,
        fontWeight: "800",
        color: "#25283A",
    },

    owner: {
        fontSize: 13,
        color: "#777C8B",
        marginTop: 5,
    },

    qrBox: {
        width: 260,
        height: 300,
        backgroundColor: "#FFFFFF",
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },

    qrPattern: {
        width: 180,
        height: 180,
        borderWidth: 8,
        borderColor: "#202333",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F1F2F6",
    },

    qrText: {
        fontSize: 45,
        fontWeight: "900",
        color: "#202333",
    },

    qrLabel: {
        fontSize: 15,
        fontWeight: "700",
        color: "#303445",
        marginTop: 15,
    },

    qrInfo: {
        fontSize: 11,
        color: "#858A99",
        textAlign: "center",
        marginTop: 5,
    },

    infoCard: {
        width: "100%",
        backgroundColor: "#FFFFFF",
        borderRadius: 18,
        padding: 18,
        marginTop: 20,
    },

    infoTitle: {
        fontSize: 17,
        fontWeight: "800",
        marginBottom: 10,
    },

    step: {
        fontSize: 13,
        color: "#555A69",
        marginBottom: 8,
    },

    button: {
        width: "100%",
        backgroundColor: "#5B5FEF",
        paddingVertical: 17,
        borderRadius: 15,
        alignItems: "center",
        marginTop: 20,
    },

    buttonText: {
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: "800",
    },

    note: {
        color: "#888D9B",
        fontSize: 11,
        marginTop: 12,
    },
});