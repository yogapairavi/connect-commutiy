import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
} from "react-native";
import { router } from "expo-router";

import {
    validateName,
    validateMobile,
} from "../utils/validation";

export default function Login() {
    const [name, setName] = useState("");
    const [mobile, setMobile] = useState("");

    const [nameError, setNameError] = useState("");
    const [mobileError, setMobileError] = useState("");

    const handleNameChange = (text: string) => {
        // Only letters and spaces
        const cleaned = text.replace(/[^A-Za-z ]/g, "");

        setName(cleaned);

        if (nameError) {
            setNameError("");
        }
    };

    const handleMobileChange = (text: string) => {
        // Only numbers
        const cleaned = text.replace(/[^0-9]/g, "");

        // Maximum 10 digits
        setMobile(cleaned.slice(0, 10));

        if (mobileError) {
            setMobileError("");
        }
    };

    const handleLogin = () => {
        const nameValidation = validateName(name);
        const mobileValidation = validateMobile(mobile);

        setNameError(nameValidation);
        setMobileError(mobileValidation);

        if (nameValidation || mobileValidation) {
            return;
        }

        router.push({
            pathname: "/role-selection",
            params: {
                name: name.trim(),
                phone: mobile,
            },
        });
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={
                Platform.OS === "ios"
                    ? "padding"
                    : undefined
            }
        >
            <ScrollView
                contentContainerStyle={styles.content}
                keyboardShouldPersistTaps="handled"
            >

                <View style={styles.header}>
                    <Text style={styles.logo}>Community</Text>

                    <Text style={styles.title}>
                        Welcome Back 👋
                    </Text>

                    <Text style={styles.subtitle}>
                        Connect, share and access resources
                        within your community.
                    </Text>
                </View>

                {/* NAME */}

                <View style={styles.inputContainer}>
                    <Text style={styles.label}>
                        Full Name
                    </Text>

                    <TextInput
                        style={[
                            styles.input,
                            nameError ? styles.inputError : null,
                        ]}
                        placeholder="Enter your name"
                        placeholderTextColor="#9A9EAA"
                        value={name}
                        onChangeText={handleNameChange}
                        autoCapitalize="words"
                        keyboardType="default"
                    />

                    {nameError ? (
                        <Text style={styles.errorText}>
                            {nameError}
                        </Text>
                    ) : null}
                </View>

                {/* MOBILE */}

                <View style={styles.inputContainer}>
                    <Text style={styles.label}>
                        Mobile Number
                    </Text>

                    <View
                        style={[
                            styles.phoneContainer,
                            mobileError
                                ? styles.inputError
                                : null,
                        ]}
                    >
                        <Text style={styles.countryCode}>
                            +91
                        </Text>

                        <TextInput
                            style={styles.phoneInput}
                            placeholder="10 digit mobile number"
                            placeholderTextColor="#9A9EAA"
                            value={mobile}
                            onChangeText={handleMobileChange}
                            keyboardType="number-pad"
                            maxLength={10}
                        />
                    </View>

                    {mobileError ? (
                        <Text style={styles.errorText}>
                            {mobileError}
                        </Text>
                    ) : null}

                    <Text style={styles.helperText}>
                        Enter a valid 10-digit Indian mobile number
                    </Text>
                </View>

                {/* LOGIN */}

                <TouchableOpacity
                    style={styles.loginButton}
                    onPress={handleLogin}
                    activeOpacity={0.8}
                >
                    <Text style={styles.loginButtonText}>
                        Continue
                    </Text>
                </TouchableOpacity>

                <Text style={styles.bottomText}>
                    By continuing, you agree to our
                    community terms and privacy policy.
                </Text>

            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F7F8FC",
    },

    content: {
        flexGrow: 1,
        padding: 25,
        justifyContent: "center",
    },

    header: {
        marginBottom: 35,
    },

    logo: {
        fontSize: 16,
        fontWeight: "700",
        color: "#5B5FEF",
        marginBottom: 25,
    },

    title: {
        fontSize: 30,
        fontWeight: "800",
        color: "#20222B",
    },

    subtitle: {
        fontSize: 15,
        color: "#707582",
        lineHeight: 22,
        marginTop: 10,
    },

    inputContainer: {
        marginBottom: 20,
    },

    label: {
        fontSize: 15,
        fontWeight: "600",
        color: "#30333D",
        marginBottom: 8,
    },

    input: {
        height: 55,
        backgroundColor: "#FFFFFF",
        borderWidth: 1,
        borderColor: "#E0E2EA",
        borderRadius: 12,
        paddingHorizontal: 16,
        fontSize: 16,
        color: "#20222B",
    },

    phoneContainer: {
        height: 55,
        backgroundColor: "#FFFFFF",
        borderWidth: 1,
        borderColor: "#E0E2EA",
        borderRadius: 12,
        flexDirection: "row",
        alignItems: "center",
    },

    countryCode: {
        fontSize: 16,
        fontWeight: "600",
        color: "#30333D",
        paddingLeft: 16,
        paddingRight: 10,
    },

    phoneInput: {
        flex: 1,
        height: "100%",
        fontSize: 16,
        color: "#20222B",
    },

    inputError: {
        borderColor: "#E5484D",
    },

    errorText: {
        color: "#E5484D",
        fontSize: 13,
        marginTop: 6,
    },

    helperText: {
        color: "#8A8E99",
        fontSize: 12,
        marginTop: 6,
    },

    loginButton: {
        height: 55,
        backgroundColor: "#5B5FEF",
        borderRadius: 13,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 10,
    },

    loginButtonText: {
        color: "#FFFFFF",
        fontSize: 17,
        fontWeight: "700",
    },

    bottomText: {
        textAlign: "center",
        color: "#8A8E99",
        fontSize: 12,
        lineHeight: 18,
        marginTop: 20,
    },
});