import React, { useState } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Alert,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";

export default function RoleSelection() {
    const params = useLocalSearchParams();

    const name = String(params.name || "");
    const phone = String(params.phone || "");

    const [role, setRole] = useState("");

    const handleContinue = () => {
        if (!role) {
            Alert.alert(
                "Select Role",
                "Please select Provider or Receiver"
            );
            return;
        }

        if (role === "provider") {
            router.replace("/provider-home" as any);
        } else {
            router.replace("/receiver-home" as any);
        }
    };

    return (
        <View style={styles.container}>

            <Text style={styles.title}>Choose Your Role</Text>

            <Text style={styles.subtitle}>
                How do you want to use Community Resource?
            </Text>

            {/* Provider */}
            <TouchableOpacity
                style={[
                    styles.roleCard,
                    role === "provider" && styles.selectedCard,
                ]}
                onPress={() => setRole("provider")}
                activeOpacity={0.8}
            >
                <View style={styles.iconCircle}>
                    <Text style={styles.icon}>📦</Text>
                </View>

                <View style={styles.textContainer}>
                    <Text style={styles.roleTitle}>Provider</Text>

                    <Text style={styles.roleDescription}>
                        List your unused resources and rent, lend or exchange them.
                    </Text>
                </View>

                <View
                    style={[
                        styles.radio,
                        role === "provider" && styles.radioSelected,
                    ]}
                >
                    {role === "provider" && (
                        <View style={styles.radioDot} />
                    )}
                </View>
            </TouchableOpacity>

            {/* Receiver */}
            <TouchableOpacity
                style={[
                    styles.roleCard,
                    role === "receiver" && styles.selectedCard,
                ]}
                onPress={() => setRole("receiver")}
                activeOpacity={0.8}
            >
                <View style={styles.iconCircle}>
                    <Text style={styles.icon}>🔍</Text>
                </View>

                <View style={styles.textContainer}>
                    <Text style={styles.roleTitle}>Receiver</Text>

                    <Text style={styles.roleDescription}>
                        Find, rent, borrow or exchange resources you need.
                    </Text>
                </View>

                <View
                    style={[
                        styles.radio,
                        role === "receiver" && styles.radioSelected,
                    ]}
                >
                    {role === "receiver" && (
                        <View style={styles.radioDot} />
                    )}
                </View>
            </TouchableOpacity>

            {/* User information */}
            <View style={styles.userBox}>
                <Text style={styles.userLabel}>Name</Text>
                <Text style={styles.userValue}>
                    {name || "User"}
                </Text>

                <Text style={styles.userLabel}>Mobile</Text>
                <Text style={styles.userValue}>
                    {phone || "Not available"}
                </Text>
            </View>

            {/* Continue */}
            <TouchableOpacity
                style={[
                    styles.button,
                    !role && styles.disabledButton,
                ]}
                onPress={handleContinue}
                activeOpacity={0.8}
            >
                <Text style={styles.buttonText}>
                    Continue
                </Text>
            </TouchableOpacity>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F7F8FC",
        paddingHorizontal: 24,
        paddingTop: 60,
    },

    title: {
        fontSize: 28,
        fontWeight: "700",
        color: "#222222",
        marginBottom: 8,
    },

    subtitle: {
        fontSize: 15,
        color: "#777777",
        marginBottom: 30,
        lineHeight: 22,
    },

    roleCard: {
        backgroundColor: "#FFFFFF",
        borderWidth: 1.5,
        borderColor: "#E0E2EA",
        borderRadius: 16,
        padding: 18,
        marginBottom: 16,
        flexDirection: "row",
        alignItems: "center",
    },

    selectedCard: {
        borderColor: "#5B5FEF",
        backgroundColor: "#F1F2FF",
    },

    iconCircle: {
        width: 52,
        height: 52,
        borderRadius: 26,
        backgroundColor: "#EEF0FF",
        alignItems: "center",
        justifyContent: "center",
    },

    icon: {
        fontSize: 25,
    },

    textContainer: {
        flex: 1,
        marginLeft: 14,
        marginRight: 10,
    },

    roleTitle: {
        fontSize: 18,
        fontWeight: "700",
        color: "#222222",
        marginBottom: 5,
    },

    roleDescription: {
        fontSize: 13,
        color: "#777777",
        lineHeight: 19,
    },

    radio: {
        width: 23,
        height: 23,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: "#B8BAC5",
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

    userBox: {
        backgroundColor: "#FFFFFF",
        borderRadius: 14,
        padding: 16,
        marginTop: 8,
        marginBottom: 25,
        borderWidth: 1,
        borderColor: "#E5E6EC",
    },

    userLabel: {
        fontSize: 12,
        color: "#888888",
        marginBottom: 3,
    },

    userValue: {
        fontSize: 15,
        fontWeight: "600",
        color: "#333333",
        marginBottom: 10,
    },

    button: {
        height: 54,
        borderRadius: 13,
        backgroundColor: "#5B5FEF",
        alignItems: "center",
        justifyContent: "center",
    },

    disabledButton: {
        backgroundColor: "#AEB1C8",
    },

    buttonText: {
        color: "#FFFFFF",
        fontSize: 17,
        fontWeight: "700",
    },
});