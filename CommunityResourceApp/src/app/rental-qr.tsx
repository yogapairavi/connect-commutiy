import React from "react";
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Alert,
} from "react-native";
import QRCode from "react-native-qrcode-svg";
import { router, useLocalSearchParams } from "expo-router";

export default function RentalQR() {
    const params = useLocalSearchParams();

    const rentalId = String(
        params.rentalId || "RENTAL-001"
    );

    const itemName = String(
        params.itemName || "Community Resource"
    );

    const renterName = String(
        params.renterName || "Renter"
    );

    // Data stored inside QR
    const qrData = JSON.stringify({
        type: "RENTAL_PICKUP",
        rentalId: rentalId,
        itemName: itemName,
        renterName: renterName,
        timestamp: Date.now(),
    });

    const handleDone = () => {
        Alert.alert(
            "QR Ready",
            "Ask the renter to scan this QR code."
        );
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                Rental QR Code
            </Text>

            <Text style={styles.subtitle}>
                Show this QR code to the renter
            </Text>

            {/* QR CODE */}
            <View style={styles.qrContainer}>
                <QRCode
                    value={qrData}
                    size={230}
                    backgroundColor="white"
                    color="black"
                />
            </View>

            {/* RENTAL INFORMATION */}
            <View style={styles.card}>
                <Text style={styles.cardTitle}>
                    Rental Details
                </Text>

                <View style={styles.row}>
                    <Text style={styles.label}>
                        Rental ID
                    </Text>

                    <Text style={styles.value}>
                        {rentalId}
                    </Text>
                </View>

                <View style={styles.row}>
                    <Text style={styles.label}>
                        Item
                    </Text>

                    <Text style={styles.value}>
                        {itemName}
                    </Text>
                </View>

                <View style={styles.row}>
                    <Text style={styles.label}>
                        Renter
                    </Text>

                    <Text style={styles.value}>
                        {renterName}
                    </Text>
                </View>
            </View>

            {/* STATUS */}
            <View style={styles.statusBox}>
                <Text style={styles.statusIcon}>✓</Text>

                <View style={styles.statusTextContainer}>
                    <Text style={styles.statusTitle}>
                        Ready for Pickup
                    </Text>

                    <Text style={styles.statusSubtitle}>
                        Renter must scan this QR before
                        camera verification.
                    </Text>
                </View>
            </View>

            {/* BUTTON */}
            <TouchableOpacity
                style={styles.button}
                onPress={handleDone}
                activeOpacity={0.8}
            >
                <Text style={styles.buttonText}>
                    QR Ready
                </Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F7F8FC",
        padding: 24,
        alignItems: "center",
    },

    title: {
        fontSize: 28,
        fontWeight: "700",
        color: "#222222",
        marginTop: 35,
    },

    subtitle: {
        fontSize: 15,
        color: "#777777",
        marginTop: 7,
        marginBottom: 25,
        textAlign: "center",
    },

    qrContainer: {
        backgroundColor: "#FFFFFF",
        padding: 22,
        borderRadius: 18,
        elevation: 4,
        shadowColor: "#000000",
        shadowOpacity: 0.1,
        shadowRadius: 8,
        shadowOffset: {
            width: 0,
            height: 3,
        },
    },

    card: {
        width: "100%",
        backgroundColor: "#FFFFFF",
        borderRadius: 15,
        padding: 17,
        marginTop: 25,
    },

    cardTitle: {
        fontSize: 17,
        fontWeight: "700",
        color: "#333333",
        marginBottom: 15,
    },

    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 10,
    },

    label: {
        fontSize: 14,
        color: "#777777",
    },

    value: {
        fontSize: 14,
        fontWeight: "600",
        color: "#333333",
        maxWidth: "60%",
        textAlign: "right",
    },

    statusBox: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#EEF0FF",
        borderRadius: 14,
        padding: 15,
        marginTop: 15,
    },

    statusIcon: {
        width: 35,
        height: 35,
        borderRadius: 18,
        backgroundColor: "#5B5FEF",
        color: "#FFFFFF",
        textAlign: "center",
        textAlignVertical: "center",
        fontSize: 22,
        fontWeight: "700",
    },

    statusTextContainer: {
        flex: 1,
        marginLeft: 12,
    },

    statusTitle: {
        fontSize: 15,
        fontWeight: "700",
        color: "#4448A8",
    },

    statusSubtitle: {
        fontSize: 12,
        color: "#666666",
        marginTop: 3,
        lineHeight: 17,
    },

    button: {
        width: "100%",
        height: 54,
        backgroundColor: "#5B5FEF",
        borderRadius: 13,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 20,
    },

    buttonText: {
        color: "#FFFFFF",
        fontSize: 17,
        fontWeight: "700",
    },
});