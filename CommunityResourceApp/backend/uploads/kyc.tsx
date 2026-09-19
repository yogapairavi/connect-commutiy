import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert,
    ScrollView,
} from "react-native";

import * as DocumentPicker from "expo-document-picker";
import { router, useLocalSearchParams } from "expo-router";

export default function KYC() {
    const params = useLocalSearchParams();

    const role =
        typeof params.role === "string"
            ? params.role
            : "receiver";

    const [name, setName] = useState(
        typeof params.name === "string"
            ? params.name
            : ""
    );

    const [phone, setPhone] = useState(
        typeof params.phone === "string"
            ? params.phone
            : ""
    );

    const [dob, setDob] = useState("");
    const [address, setAddress] = useState("");
    const [area, setArea] = useState("");

    const [document, setDocument] =
        useState<DocumentPicker.DocumentPickerAsset | null>(
            null
        );

    const [loading, setLoading] = useState(false);

    // =====================================================
    // SELECT GOVERNMENT ID
    // =====================================================

    const selectDocument = async () => {
        try {
            const result =
                await DocumentPicker.getDocumentAsync({
                    type: [
                        "image/jpeg",
                        "image/png",
                        "application/pdf",
                    ],
                    copyToCacheDirectory: true,
                    multiple: false,
                });

            if (result.canceled) {
                return;
            }

            const selectedFile =
                result.assets[0];

            // 5 MB limit
            if (
                selectedFile.size &&
                selectedFile.size > 5 * 1024 * 1024
            ) {
                Alert.alert(
                    "File Too Large",
                    "Please select a file smaller than 5 MB."
                );
                return;
            }

            setDocument(selectedFile);

            Alert.alert(
                "Document Selected",
                selectedFile.name
            );
        } catch (error) {
            Alert.alert(
                "Error",
                "Unable to select document."
            );
        }
    };

    // =====================================================
    // BASIC VALIDATION
    // =====================================================

    const validateForm = () => {
        if (!name.trim()) {
            Alert.alert(
                "Missing Information",
                "Please enter your name."
            );
            return false;
        }

        if (!/^[A-Za-z ]+$/.test(name.trim())) {
            Alert.alert(
                "Invalid Name",
                "Name should contain letters only."
            );
            return false;
        }

        if (!/^[6-9][0-9]{9}$/.test(phone.trim())) {
            Alert.alert(
                "Invalid Mobile",
                "Enter a valid 10-digit Indian mobile number."
            );
            return false;
        }

        if (!dob.trim()) {
            Alert.alert(
                "Missing Information",
                "Please enter your date of birth."
            );
            return false;
        }

        if (!address.trim()) {
            Alert.alert(
                "Missing Information",
                "Please enter your address."
            );
            return false;
        }

        if (!area.trim()) {
            Alert.alert(
                "Missing Information",
                "Please enter your area/city."
            );
            return false;
        }

        if (!document) {
            Alert.alert(
                "KYC Document Required",
                "Please upload a Government ID."
            );
            return false;
        }

        return true;
    };

    // =====================================================
    // SUBMIT KYC
    // =====================================================

    const submitKYC = async () => {
        if (!validateForm()) {
            return;
        }

        setLoading(true);

        try {
            const API_URL =
                "http://127.0.0.1:8000";

            // -------------------------------------------------
            // 1. CREATE USER
            // -------------------------------------------------

            const userResponse =
                await fetch(`${API_URL}/users`, {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json",
                    },

                    body: JSON.stringify({
                        name: name.trim(),
                        phone: phone.trim(),
                        role: role,

                        email: "",
                        address: address.trim(),
                        area: area.trim(),
                        dob: dob.trim(),

                        government_id:
                            document?.name || "",

                        kyc_verified: false,
                    }),
                });

            const userData =
                await userResponse.json();

            if (!userResponse.ok) {
                throw new Error(
                    userData.detail ||
                    "Unable to create user."
                );
            }

            // -------------------------------------------------
            // 2. PREPARE DOCUMENT
            // -------------------------------------------------

            if (!document) {
                throw new Error(
                    "Government ID is required."
                );
            }

            const formData = new FormData();

            formData.append(
                "phone",
                phone.trim()
            );

            formData.append(
                "document",
                {
                    uri: document.uri,
                    name:
                        document.name ||
                        "kyc_document",
                    type:
                        document.mimeType ||
                        "application/octet-stream",
                } as any
            );

            // -------------------------------------------------
            // 3. UPLOAD DOCUMENT
            // -------------------------------------------------

            const uploadResponse =
                await fetch(
                    `${API_URL}/kyc/upload`,
                    {
                        method: "POST",
                        body: formData,
                    }
                );

            const uploadData =
                await uploadResponse.json();

            if (!uploadResponse.ok) {
                throw new Error(
                    uploadData.detail ||
                    "KYC document upload failed."
                );
            }

            // -------------------------------------------------
            // SUCCESS
            // -------------------------------------------------

            Alert.alert(
                "KYC Submitted",
                "Your Government ID has been uploaded successfully. Your KYC is now pending verification.",
                [
                    {
                        text: "Continue",
                        onPress: () => {
                            if (role === "provider") {
                                router.replace(
                                    "/provider-home" as any
                                );
                            } else {
                                router.replace(
                                    "/receiver-home" as any
                                );
                            }
                        },
                    },
                ]
            );
        } catch (error: any) {
            console.log(
                "KYC ERROR:",
                error
            );

            Alert.alert(
                "Upload Failed",
                error?.message ||
                "Something went wrong."
            );
        } finally {
            setLoading(false);
        }
    };

    // =====================================================
    // UI
    // =====================================================

    return (
        <ScrollView
            style={styles.container}
            contentContainerStyle={
                styles.content
            }
        >
            <Text style={styles.title}>
                KYC Verification
            </Text>

            <Text style={styles.subtitle}>
                Verify your identity to use the
                community resource platform.
            </Text>

            {/* PERSONAL INFORMATION */}

            <Text style={styles.sectionTitle}>
                Personal Information
            </Text>

            <Text style={styles.label}>
                Full Name
            </Text>

            <TextInput
                style={styles.input}
                value={name}
                onChangeText={(text) => {
                    const cleaned =
                        text.replace(
                            /[^A-Za-z ]/g,
                            ""
                        );

                    setName(cleaned);
                }}
                placeholder="Enter your full name"
            />

            <Text style={styles.label}>
                Mobile Number
            </Text>

            <TextInput
                style={styles.input}
                value={phone}
                onChangeText={(text) => {
                    const cleaned =
                        text
                            .replace(/\D/g, "")
                            .slice(0, 10);

                    setPhone(cleaned);
                }}
                keyboardType="phone-pad"
                maxLength={10}
                placeholder="10 digit mobile number"
            />

            <Text style={styles.label}>
                Date of Birth
            </Text>

            <TextInput
                style={styles.input}
                value={dob}
                onChangeText={setDob}
                placeholder="DD/MM/YYYY"
            />

            <Text style={styles.label}>
                Address
            </Text>

            <TextInput
                style={[
                    styles.input,
                    styles.multiline,
                ]}
                value={address}
                onChangeText={setAddress}
                placeholder="Enter your address"
                multiline
                numberOfLines={3}
            />

            <Text style={styles.label}>
                Area / City
            </Text>

            <TextInput
                style={styles.input}
                value={area}
                onChangeText={setArea}
                placeholder="Example: Chennai"
            />

            {/* GOVERNMENT ID */}

            <Text style={styles.sectionTitle}>
                Identity Verification
            </Text>

            <Text style={styles.info}>
                Upload your Government ID in JPG,
                PNG or PDF format.
            </Text>

            <TouchableOpacity
                style={styles.uploadButton}
                onPress={selectDocument}
            >
                <Text style={styles.uploadIcon}>
                    📄
                </Text>

                <Text style={styles.uploadText}>
                    {document
                        ? "Change Government ID"
                        : "Upload Government ID"}
                </Text>
            </TouchableOpacity>

            {document && (
                <View style={styles.fileBox}>
                    <Text style={styles.fileName}>
                        {document.name}
                    </Text>

                    <Text style={styles.fileSuccess}>
                        ✓ Document selected
                    </Text>
                </View>
            )}

            <Text style={styles.security}>
                🔒 Your document will be submitted
                for verification.
            </Text>

            {/* SUBMIT */}

            <TouchableOpacity
                style={[
                    styles.submitButton,
                    loading &&
                    styles.disabledButton,
                ]}
                onPress={submitKYC}
                disabled={loading}
            >
                <Text style={styles.submitText}>
                    {loading
                        ? "Uploading..."
                        : "Submit KYC"}
                </Text>
            </TouchableOpacity>
        </ScrollView>
    );
}


// =====================================================
// STYLES
// =====================================================

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F7F8FC",
    },

    content: {
        padding: 22,
        paddingBottom: 40,
    },

    title: {
        fontSize: 28,
        fontWeight: "700",
        color: "#202333",
        marginTop: 25,
    },

    subtitle: {
        fontSize: 15,
        color: "#73798C",
        marginTop: 7,
        marginBottom: 25,
        lineHeight: 22,
    },

    sectionTitle: {
        fontSize: 19,
        fontWeight: "700",
        color: "#303548",
        marginTop: 15,
        marginBottom: 15,
    },

    label: {
        fontSize: 14,
        fontWeight: "600",
        color: "#454A5E",
        marginTop: 12,
        marginBottom: 7,
    },

    input: {
        backgroundColor: "#FFFFFF",
        borderWidth: 1,
        borderColor: "#E0E3EC",
        borderRadius: 12,
        paddingHorizontal: 15,
        paddingVertical: 13,
        fontSize: 15,
        color: "#202333",
    },

    multiline: {
        minHeight: 90,
        textAlignVertical: "top",
    },

    info: {
        color: "#6E7486",
        fontSize: 14,
        marginBottom: 12,
    },

    uploadButton: {
        backgroundColor: "#FFFFFF",
        borderWidth: 1.5,
        borderColor: "#5B5FEF",
        borderRadius: 14,
        paddingVertical: 20,
        alignItems: "center",
    },

    uploadIcon: {
        fontSize: 30,
        marginBottom: 6,
    },

    uploadText: {
        color: "#5B5FEF",
        fontSize: 15,
        fontWeight: "700",
    },

    fileBox: {
        backgroundColor: "#EEF0FF",
        borderRadius: 12,
        padding: 14,
        marginTop: 12,
    },

    fileName: {
        color: "#303548",
        fontSize: 14,
        fontWeight: "600",
    },

    fileSuccess: {
        color: "#2E7D32",
        fontSize: 13,
        marginTop: 5,
    },

    security: {
        color: "#70768A",
        fontSize: 12,
        marginTop: 15,
        lineHeight: 18,
    },

    submitButton: {
        backgroundColor: "#5B5FEF",
        borderRadius: 14,
        paddingVertical: 16,
        alignItems: "center",
        marginTop: 25,
    },

    disabledButton: {
        opacity: 0.6,
    },

    submitText: {
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: "700",
    },
});