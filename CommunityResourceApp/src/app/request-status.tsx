import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Alert,
} from "react-native";
import { router } from "expo-router";

const requests = [
    {
        id: "1",
        owner: "Arun",
        resource: "Sony Camera",
        price: "₹350/day",
        status: "Accepted",
        response: "Request accepted",
    },
    {
        id: "2",
        owner: "Priya",
        resource: "Canon Camera",
        price: "₹400/day",
        status: "Pending",
        response: "Waiting for owner response",
    },
    {
        id: "3",
        owner: "Karthik",
        resource: "Nikon Camera",
        price: "₹380/day",
        status: "Rejected",
        response: "Owner is unavailable for selected dates",
    },
];

export default function RequestStatus() {
    const [selectedOwner, setSelectedOwner] = useState<string | null>(
        null
    );

    const chooseOwner = (request: (typeof requests)[0]) => {
        if (request.status !== "Accepted") {
            Alert.alert(
                "Not Available",
                "You can continue only with an accepted request."
            );
            return;
        }

        setSelectedOwner(request.owner);

        Alert.alert(
            "Owner Selected",
            `${request.owner} has been selected for your rental.`,
            [
                {
                    text: "Continue",
                    onPress: () =>
                        router.push({
                            pathname: "/guarantor",
                            params: {
                                resourceName: request.resource,
                                owner: request.owner,
                                price: request.price,
                            },
                        }),
                },
            ]
        );
    };

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>My Requests</Text>

            <Text style={styles.subtitle}>
                Track responses from the owners you contacted.
            </Text>

            <View style={styles.summary}>
                <View>
                    <Text style={styles.summaryNumber}>3</Text>
                    <Text style={styles.summaryLabel}>Requests</Text>
                </View>

                <View>
                    <Text style={styles.acceptedNumber}>1</Text>
                    <Text style={styles.summaryLabel}>Accepted</Text>
                </View>

                <View>
                    <Text style={styles.pendingNumber}>1</Text>
                    <Text style={styles.summaryLabel}>Pending</Text>
                </View>
            </View>

            {requests.map((request) => {
                const isAccepted = request.status === "Accepted";
                const isPending = request.status === "Pending";
                const isRejected = request.status === "Rejected";

                return (
                    <View key={request.id} style={styles.card}>
                        <View style={styles.topRow}>
                            <View style={styles.avatar}>
                                <Text style={styles.avatarText}>
                                    {request.owner.charAt(0)}
                                </Text>
                            </View>

                            <View style={{ flex: 1 }}>
                                <Text style={styles.owner}>
                                    {request.owner}
                                </Text>

                                <Text style={styles.resource}>
                                    {request.resource}
                                </Text>
                            </View>

                            <View
                                style={[
                                    styles.statusBadge,
                                    isAccepted && styles.acceptedBadge,
                                    isPending && styles.pendingBadge,
                                    isRejected && styles.rejectedBadge,
                                ]}
                            >
                                <Text
                                    style={[
                                        styles.statusText,
                                        isAccepted && styles.acceptedText,
                                        isPending && styles.pendingText,
                                        isRejected && styles.rejectedText,
                                    ]}
                                >
                                    {request.status}
                                </Text>
                            </View>
                        </View>

                        <View style={styles.divider} />

                        <Text style={styles.response}>
                            {request.response}
                        </Text>

                        <Text style={styles.price}>{request.price}</Text>

                        {isAccepted && (
                            <TouchableOpacity
                                style={styles.continueButton}
                                onPress={() => chooseOwner(request)}
                            >
                                <Text style={styles.continueText}>
                                    Choose This Owner
                                </Text>
                            </TouchableOpacity>
                        )}

                        {isPending && (
                            <TouchableOpacity
                                style={styles.chatButton}
                                onPress={() =>
                                    Alert.alert(
                                        "Request Pending",
                                        "You can wait for the owner's response."
                                    )
                                }
                            >
                                <Text style={styles.chatText}>
                                    Waiting for Response
                                </Text>
                            </TouchableOpacity>
                        )}

                        {isRejected && (
                            <TouchableOpacity
                                style={styles.disabledButton}
                                onPress={() =>
                                    Alert.alert(
                                        "Request Rejected",
                                        "You can choose another available owner."
                                    )
                                }
                            >
                                <Text style={styles.disabledText}>
                                    Find Another Owner
                                </Text>
                            </TouchableOpacity>
                        )}
                    </View>
                );
            })}

            <View style={styles.infoCard}>
                <Text style={styles.infoTitle}>
                    💡 How Multiple Requests Work
                </Text>

                <Text style={styles.infoText}>
                    You can contact up to 3 suitable owners. Once an owner accepts,
                    you can select the owner and continue with guarantor,
                    agreement and payment.
                </Text>
            </View>

            <TouchableOpacity
                style={styles.searchButton}
                onPress={() => router.replace("/receiver-home")}
            >
                <Text style={styles.searchText}>
                    Find More Resources
                </Text>
            </TouchableOpacity>

            <View style={{ height: 40 }} />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F5F7FF",
        padding: 20,
    },

    title: {
        fontSize: 28,
        fontWeight: "800",
        color: "#191C2B",
        marginTop: 45,
    },

    subtitle: {
        fontSize: 13,
        color: "#858A99",
        marginTop: 5,
        marginBottom: 18,
    },

    summary: {
        backgroundColor: "#FFFFFF",
        borderRadius: 18,
        paddingVertical: 17,
        flexDirection: "row",
        justifyContent: "space-around",
        marginBottom: 15,
    },

    summaryNumber: {
        fontSize: 20,
        fontWeight: "800",
        color: "#5B5FEF",
        textAlign: "center",
    },

    acceptedNumber: {
        fontSize: 20,
        fontWeight: "800",
        color: "#278052",
        textAlign: "center",
    },

    pendingNumber: {
        fontSize: 20,
        fontWeight: "800",
        color: "#B27A18",
        textAlign: "center",
    },

    summaryLabel: {
        fontSize: 10,
        color: "#858A99",
        marginTop: 3,
    },

    card: {
        backgroundColor: "#FFFFFF",
        borderRadius: 18,
        padding: 17,
        marginBottom: 12,
    },

    topRow: {
        flexDirection: "row",
        alignItems: "center",
    },

    avatar: {
        width: 45,
        height: 45,
        borderRadius: 23,
        backgroundColor: "#EEF0FF",
        justifyContent: "center",
        alignItems: "center",
        marginRight: 11,
    },

    avatarText: {
        fontSize: 18,
        fontWeight: "800",
        color: "#5B5FEF",
    },

    owner: {
        fontSize: 15,
        fontWeight: "800",
        color: "#303445",
    },

    resource: {
        fontSize: 11,
        color: "#858A99",
        marginTop: 3,
    },

    statusBadge: {
        paddingHorizontal: 9,
        paddingVertical: 6,
        borderRadius: 9,
    },

    acceptedBadge: {
        backgroundColor: "#EAF8EF",
    },

    pendingBadge: {
        backgroundColor: "#FFF4DC",
    },

    rejectedBadge: {
        backgroundColor: "#FDEBEC",
    },

    statusText: {
        fontSize: 9,
        fontWeight: "800",
    },

    acceptedText: {
        color: "#278052",
    },

    pendingText: {
        color: "#9A6918",
    },

    rejectedText: {
        color: "#B44850",
    },

    divider: {
        height: 1,
        backgroundColor: "#F0F1F5",
        marginVertical: 13,
    },

    response: {
        fontSize: 12,
        color: "#626776",
    },

    price: {
        fontSize: 14,
        color: "#5B5FEF",
        fontWeight: "800",
        marginTop: 7,
    },

    continueButton: {
        backgroundColor: "#5B5FEF",
        paddingVertical: 13,
        borderRadius: 12,
        alignItems: "center",
        marginTop: 12,
    },

    continueText: {
        color: "#FFFFFF",
        fontWeight: "800",
        fontSize: 13,
    },

    chatButton: {
        backgroundColor: "#FFF4DC",
        paddingVertical: 12,
        borderRadius: 12,
        alignItems: "center",
        marginTop: 12,
    },

    chatText: {
        color: "#9A6918",
        fontWeight: "700",
        fontSize: 12,
    },

    disabledButton: {
        backgroundColor: "#F1F2F5",
        paddingVertical: 12,
        borderRadius: 12,
        alignItems: "center",
        marginTop: 12,
    },

    disabledText: {
        color: "#686D7D",
        fontWeight: "700",
        fontSize: 12,
    },

    infoCard: {
        backgroundColor: "#EEF0FF",
        borderRadius: 17,
        padding: 17,
        marginTop: 5,
    },

    infoTitle: {
        fontSize: 14,
        fontWeight: "800",
        color: "#4F54D6",
    },

    infoText: {
        fontSize: 11,
        color: "#626776",
        lineHeight: 17,
        marginTop: 6,
    },

    searchButton: {
        backgroundColor: "#FFFFFF",
        borderRadius: 14,
        paddingVertical: 15,
        alignItems: "center",
        marginTop: 15,
        borderWidth: 1,
        borderColor: "#DCDDEA",
    },

    searchText: {
        color: "#5B5FEF",
        fontWeight: "800",
        fontSize: 13,
    },
});