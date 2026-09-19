import React, { useRef, useState } from "react";
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    StyleSheet,
    Alert,
} from "react-native";
import SignatureScreen from "react-native-signature-canvas";
import { router, useLocalSearchParams } from "expo-router";

export default function DigitalAgreement() {
    const params = useLocalSearchParams();

    const itemName = String(params.itemName || "HP Laptop");
    const rentalDays = String(params.rentalDays || "2");
    const price = String(params.price || "350");

    const [signature, setSignature] = useState("");
    const [agreed, setAgreed] = useState(false);

    const signatureRef = useRef<any>(null);

    const handleSignature = (sig: string) => {
        setSignature(sig);
    };

    const clearSignature = () => {
        signatureRef.current?.clearSignature();
        setSignature("");
    };

    const continueToPayment = () => {
        if (!signature) {
            Alert.alert(
                "Signature Required",
                "Please sign the rental agreement before continuing."
            );
            return;
        }

        if (!agreed) {
            Alert.alert(
                "Agreement Required",
                "Please agree to the rental terms."
            );
            return;
        }

        router.push({
            pathname: "/payment",
            params: {
                itemName,
                rentalDays,
                price,
                agreementSigned: "true",
            },
        } as any);
    };

    return (
        <ScrollView
            style={styles.screen}
            contentContainerStyle={styles.container}
        >
            <Text style={styles.title}>
                Digital Rental Agreement
            </Text>

            <Text style={styles.subtitle}>
                Review the rental terms and sign before payment.
            </Text>

            {/* RENTAL DETAILS */}

            <View style={styles.card}>
                <Text style={styles.cardTitle}>
                    Rental Details
                </Text>

                <View style={styles.row}>
                    <Text style={styles.label}>Resource</Text>
                    <Text style={styles.value}>{itemName}</Text>
                </View>

                <View style={styles.row}>
                    <Text style={styles.label}>Duration</Text>
                    <Text style={styles.value}>
                        {rentalDays} Days
                    </Text>
                </View>

                <View style={styles.row}>
                    <Text style={styles.label}>Price / Day</Text>
                    <Text style={styles.value}>
                        ₹{price}
                    </Text>
                </View>
            </View>

            {/* TERMS */}

            <View style={styles.card}>
                <Text style={styles.cardTitle}>
                    Rental Terms
                </Text>

                <Text style={styles.term}>
                    • The renter agrees to return the resource
                    within the agreed rental period.
                </Text>

                <Text style={styles.term}>
                    • The renter is responsible for reasonable
                    care of the resource.
                </Text>

                <Text style={styles.term}>
                    • Any damage identified during the return
                    verification may be reviewed using the
                    before and after condition records.
                </Text>

                <Text style={styles.term}>
                    • The renter agrees to complete the QR-based
                    pickup and return verification.
                </Text>

                <Text style={styles.term}>
                    • Any dispute can be submitted for platform
                    review.
                </Text>
            </View>

            {/* SIGNATURE */}

            <Text style={styles.sectionTitle}>
                Renter Signature
            </Text>

            <Text style={styles.signatureHint}>
                Sign inside the box below
            </Text>

            <View style={styles.signatureBox}>
                <SignatureScreen
                    ref={signatureRef}
                    onOK={handleSignature}
                    onEmpty={() =>
                        Alert.alert(
                            "Signature Required",
                            "Please provide your signature."
                        )
                    }
                    descriptionText="Sign here"
                    clearText="Clear"
                    confirmText="Save"
                    webStyle={`
            .m-signature-pad {
              box-shadow: none;
              border: none;
            }

            .m-signature-pad--body {
              border: none;
            }

            .m-signature-pad--footer {
              display: none;
            }

            body {
              background-color: #ffffff;
            }
          `}
                />
            </View>

            {/* SIGNATURE STATUS */}

            {signature ? (
                <View style={styles.signedBox}>
                    <Text style={styles.signedText}>
                        ✓ Signature captured
                    </Text>
                </View>
            ) : (
                <View style={styles.notSignedBox}>
                    <Text style={styles.notSignedText}>
                        Signature not added
                    </Text>
                </View>
            )}

            <TouchableOpacity
                style={styles.clearButton}
                onPress={clearSignature}
            >
                <Text style={styles.clearText}>
                    Clear Signature
                </Text>
            </TouchableOpacity>

            {/* AGREEMENT CHECKBOX */}

            <TouchableOpacity
                style={styles.agreementRow}
                onPress={() => setAgreed(!agreed)}
                activeOpacity={0.8}
            >
                <View
                    style={[
                        styles.checkbox,
                        agreed && styles.checkboxSelected,
                    ]}
                >
                    {agreed && (
                        <Text style={styles.check}>
                            ✓
                        </Text>
                    )}
                </View>

                <Text style={styles.agreementText}>
                    I have read and agree to the rental
                    terms and conditions.
                </Text>
            </TouchableOpacity>

            {/* CONTINUE */}

            <TouchableOpacity
                style={[
                    styles.continueButton,
                    (!signature || !agreed) &&
                    styles.disabledButton,
                ]}
                onPress={continueToPayment}
            >
                <Text style={styles.continueText}>
                    Sign Agreement & Continue
                </Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: "#F7F8FC",
    },

    container: {
        padding: 22,
        paddingBottom: 50,
    },

    title: {
        fontSize: 27,
        fontWeight: "700",
        color: "#222222",
        marginTop: 20,
    },

    subtitle: {
        fontSize: 14,
        color: "#777777",
        marginTop: 7,
        marginBottom: 20,
        lineHeight: 20,
    },

    card: {
        backgroundColor: "#FFFFFF",
        borderRadius: 15,
        padding: 17,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: "#E4E5EC",
    },

    cardTitle: {
        fontSize: 17,
        fontWeight: "700",
        color: "#333333",
        marginBottom: 14,
    },

    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 11,
    },

    label: {
        color: "#777777",
        fontSize: 14,
    },

    value: {
        color: "#333333",
        fontSize: 14,
        fontWeight: "600",
        maxWidth: "55%",
        textAlign: "right",
    },

    term: {
        fontSize: 13,
        color: "#555555",
        lineHeight: 21,
        marginBottom: 8,
    },

    sectionTitle: {
        fontSize: 18,
        fontWeight: "700",
        color: "#333333",
        marginTop: 5,
    },

    signatureHint: {
        fontSize: 12,
        color: "#888888",
        marginTop: 4,
        marginBottom: 8,
    },

    signatureBox: {
        height: 230,
        backgroundColor: "#FFFFFF",
        borderRadius: 14,
        borderWidth: 1.5,
        borderColor: "#5B5FEF",
        overflow: "hidden",
    },

    signedBox: {
        marginTop: 10,
        padding: 11,
        backgroundColor: "#E9F8EF",
        borderRadius: 10,
    },

    signedText: {
        color: "#208A4B",
        fontWeight: "700",
        textAlign: "center",
    },

    notSignedBox: {
        marginTop: 10,
        padding: 11,
        backgroundColor: "#FFF3F3",
        borderRadius: 10,
    },

    notSignedText: {
        color: "#C94A4A",
        textAlign: "center",
    },

    clearButton: {
        alignSelf: "flex-end",
        marginTop: 8,
        paddingHorizontal: 14,
        paddingVertical: 8,
    },

    clearText: {
        color: "#5B5FEF",
        fontWeight: "600",
    },

    agreementRow: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 14,
        marginBottom: 20,
    },

    checkbox: {
        width: 23,
        height: 23,
        borderRadius: 5,
        borderWidth: 2,
        borderColor: "#B8BAC5",
        alignItems: "center",
        justifyContent: "center",
        marginRight: 10,
    },

    checkboxSelected: {
        backgroundColor: "#5B5FEF",
        borderColor: "#5B5FEF",
    },

    check: {
        color: "#FFFFFF",
        fontWeight: "700",
    },

    agreementText: {
        flex: 1,
        fontSize: 13,
        color: "#555555",
        lineHeight: 19,
    },

    continueButton: {
        height: 55,
        borderRadius: 13,
        backgroundColor: "#5B5FEF",
        alignItems: "center",
        justifyContent: "center",
    },

    disabledButton: {
        backgroundColor: "#B5B7C8",
    },

    continueText: {
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: "700",
    },
});