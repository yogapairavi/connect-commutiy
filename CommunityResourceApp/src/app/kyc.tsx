import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
    Alert,
    ActivityIndicator,
    StyleSheet,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";

export default function KYC() {
    const params = useLocalSearchParams();

    const name = String(params.name || "");
    const phone = String(params.phone || "");
    const role = String(params.role || "");

    const [dob, setDob] = useState("");
    const [address, setAddress] = useState("");
    const [area, setArea] = useState("");
    const [loading, setLoading] = useState(false);

    const submitKYC = async () => {
        if (!dob.trim()) {
            Alert.alert("Required", "Please enter your Date of Birth");
            return;
        }

        if (!address.trim()) {
            Alert.alert("Required", "Please enter your Address");
            return;
        }

        if (!area.trim()) {
            Alert.alert("Required", "Please enter your Area");
            return;
        }

        setLoading(true);

        try {
            const API_URL = "http://10.49.173.211:8000";

            const response = await fetch(`${API_URL}/users`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: name,
                    phone: phone,
                    role: role,
                    email: "",
                    address: address,
                    area: area,
                    dob: dob,
                    government_id: "",
                    kyc_verified: false,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.detail || "KYC submission failed");
            }

            Alert.alert(
                "KYC Submitted",
                "Your KYC details have been submitted successfully.",
                [
                    {
                        text: "Continue",
                        onPress: () => {
                            if (role === "provider") {
                                router.replace("/provider-home" as any);
                            } else {
                                router.replace("/receiver-home" as any);
                            }
                        },
                    },
                ]
            );
        } catch (error: any) {
            Alert.alert(
                "Submission Failed",
                error?.message || "Unable to connect to the server."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <ScrollView
            style={styles.screen}
            contentContainerStyle={styles.container}
            keyboardShouldPersistTaps="handled"
        >
            <Text style={styles.title}>KYC Verification</Text>

            <Text style={styles.subtitle}>
                Enter your basic details to continue
            </Text>

            <Text style={styles.label}>Name</Text>

            <TextInput
                style={styles.input}
                value={name}
                editable={false}
                placeholder="Your name"
            />

            <Text style={styles.label}>Mobile Number</Text>

            <TextInput
                style={styles.input}
                value={phone}
                editable={false}
                keyboardType="phone-pad"
                placeholder="Mobile number"
            />

            <Text style={styles.label}>Role</Text>

            <TextInput
                style={styles.input}
                value={role}
                editable={false}
                placeholder="Role"
            />

            <Text style={styles.label}>Date of Birth</Text>

            <TextInput
                style={styles.input}
                value={dob}
                onChangeText={setDob}
                placeholder="DD/MM/YYYY"
                keyboardType="numbers-and-punctuation"
            />

            <Text style={styles.label}>Address</Text>

            <TextInput
                style={[styles.input, styles.multilineInput]}
                value={address}
                onChangeText={setAddress}
                placeholder="Enter your address"
                multiline
            />

            <Text style={styles.label}>Area</Text>

            <TextInput
                style={styles.input}
                value={area}
                onChangeText={setArea}
                placeholder="Enter your area"
            />

            <View style={styles.infoBox}>
                <Text style={styles.infoTitle}>Government ID</Text>

                <Text style={styles.infoText}>
                    Government ID upload is currently skipped. You can continue with
                    your basic KYC details.
                </Text>
            </View>

            <TouchableOpacity
                style={styles.button}
                onPress={submitKYC}
                disabled={loading}
            >
                {loading ? (
                    <ActivityIndicator size="small" color="#FFFFFF" />
                ) : (
                    <Text style={styles.buttonText}>Submit KYC</Text>
                )}
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
        padding: 24,
        paddingBottom: 50,
    },

    title: {
        fontSize: 28,
        fontWeight: "700",
        color: "#222222",
        marginTop: 30,
    },

    subtitle: {
        fontSize: 15,
        color: "#777777",
        marginTop: 8,
        marginBottom: 20,
    },

    label: {
        fontSize: 15,
        fontWeight: "600",
        color: "#333333",
        marginTop: 14,
        marginBottom: 7,
    },

    input: {
        height: 52,
        backgroundColor: "#FFFFFF",
        borderWidth: 1,
        borderColor: "#DDDFE7",
        borderRadius: 12,
        paddingHorizontal: 15,
        fontSize: 15,
        color: "#222222",
    },

    multilineInput: {
        height: 90,
        paddingTop: 14,
        textAlignVertical: "top",
    },

    infoBox: {
        backgroundColor: "#EEF0FF",
        borderRadius: 12,
        padding: 15,
        marginTop: 22,
    },

    infoTitle: {
        fontSize: 16,
        fontWeight: "700",
        color: "#4448A8",
        marginBottom: 6,
    },

    infoText: {
        fontSize: 13,
        color: "#555555",
        lineHeight: 20,
    },

    button: {
        height: 54,
        backgroundColor: "#5B5FEF",
        borderRadius: 12,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 25,
    },

    buttonText: {
        color: "#FFFFFF",
        fontSize: 17,
        fontWeight: "700",
    },
});