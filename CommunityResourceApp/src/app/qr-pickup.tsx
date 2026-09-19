import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Alert,
} from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import { router } from "expo-router";

export default function QrPickupScreen() {
    const [permission, requestPermission] = useCameraPermissions();

    const [scanned, setScanned] = useState(false);

    useEffect(() => {
        if (permission && !permission.granted) {
            requestPermission();
        }
    }, [permission]);

    if (!permission) {
        return (
            <View style={styles.center}>
                <Text style={styles.loading}>
                    Checking camera permission...
                </Text>
            </View>
        );
    }

    if (!permission.granted) {
        return (
            <View style={styles.center}>
                <Text style={styles.title}>
                    Camera Permission Required
                </Text>

                <Text style={styles.description}>
                    Camera access is required to scan the rental QR code.
                </Text>

                <TouchableOpacity
                    style={styles.button}
                    onPress={requestPermission}
                >
                    <Text style={styles.buttonText}>
                        Allow Camera
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }

    const handleBarcodeScanned = ({
        data,
    }: {
        data: string;
    }) => {
        if (scanned) return;

        setScanned(true);

        console.log("QR Data:", data);

        Alert.alert(
            "QR Verified",
            "Rental QR code verified successfully.",
            [
                {
                    text: "Continue",
                    onPress: () => {
                        router.push("/camera-verification");
                    },
                },
            ]
        );
    };

    return (
        <View style={styles.container}>

            <CameraView
                style={styles.camera}
                facing="back"
                barcodeScannerSettings={{
                    barcodeTypes: ["qr"],
                }}
                onBarcodeScanned={
                    scanned ? undefined : handleBarcodeScanned
                }
            />

            <View style={styles.overlay}>

                <Text style={styles.header}>
                    Rental QR Verification
                </Text>

                <Text style={styles.subHeader}>
                    Scan the owner's rental QR code
                </Text>

                <View style={styles.scanBox}>
                    <View style={styles.cornerTopLeft} />
                    <View style={styles.cornerTopRight} />
                    <View style={styles.cornerBottomLeft} />
                    <View style={styles.cornerBottomRight} />
                </View>

                <View style={styles.infoBox}>
                    <Text style={styles.infoTitle}>
                        How to scan
                    </Text>

                    <Text style={styles.infoText}>
                        Ask the owner to show the temporary rental QR code.
                    </Text>
                </View>

                {scanned && (
                    <View style={styles.successBox}>
                        <Text style={styles.successText}>
                            ✓ QR Code Scanned
                        </Text>
                    </View>
                )}

            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#000",
    },

    camera: {
        flex: 1,
    },
    overlay: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        alignItems: "center",
        paddingTop: 55,
    },
    

    header: {
        color: "#fff",
        fontSize: 23,
        fontWeight: "700",
    },

    subHeader: {
        color: "#ddd",
        fontSize: 14,
        marginTop: 8,
    },

    scanBox: {
        width: 260,
        height: 260,
        marginTop: 75,
        borderWidth: 2,
        borderColor: "#fff",
        borderRadius: 20,
    },

    cornerTopLeft: {
        position: "absolute",
        width: 35,
        height: 35,
        left: -2,
        top: -2,
        borderLeftWidth: 5,
        borderTopWidth: 5,
        borderColor: "#5B5FEF",
        borderTopLeftRadius: 18,
    },

    cornerTopRight: {
        position: "absolute",
        width: 35,
        height: 35,
        right: -2,
        top: -2,
        borderRightWidth: 5,
        borderTopWidth: 5,
        borderColor: "#5B5FEF",
        borderTopRightRadius: 18,
    },

    cornerBottomLeft: {
        position: "absolute",
        width: 35,
        height: 35,
        left: -2,
        bottom: -2,
        borderLeftWidth: 5,
        borderBottomWidth: 5,
        borderColor: "#5B5FEF",
        borderBottomLeftRadius: 18,
    },

    cornerBottomRight: {
        position: "absolute",
        width: 35,
        height: 35,
        right: -2,
        bottom: -2,
        borderRightWidth: 5,
        borderBottomWidth: 5,
        borderColor: "#5B5FEF",
        borderBottomRightRadius: 18,
    },

    infoBox: {
        position: "absolute",
        bottom: 70,
        left: 25,
        right: 25,
        backgroundColor: "rgba(0,0,0,0.7)",
        borderRadius: 15,
        padding: 18,
    },

    infoTitle: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "700",
        marginBottom: 6,
    },

    infoText: {
        color: "#ddd",
        fontSize: 13,
        lineHeight: 19,
    },

    successBox: {
        position: "absolute",
        top: 400,
        backgroundColor: "#2E8B57",
        paddingHorizontal: 22,
        paddingVertical: 12,
        borderRadius: 20,
    },

    successText: {
        color: "#fff",
        fontWeight: "700",
    },

    center: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 25,
        backgroundColor: "#F5F7FF",
    },

    loading: {
        fontSize: 16,
        color: "#555",
    },

    title: {
        fontSize: 22,
        fontWeight: "700",
        color: "#20233A",
        textAlign: "center",
        marginBottom: 12,
    },

    description: {
        fontSize: 15,
        color: "#666A7A",
        textAlign: "center",
        lineHeight: 22,
        marginBottom: 25,
    },

    button: {
        backgroundColor: "#5B5FEF",
        paddingHorizontal: 30,
        paddingVertical: 15,
        borderRadius: 12,
    },

    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "700",
    },
});