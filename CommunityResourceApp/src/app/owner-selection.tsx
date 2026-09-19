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

const owners = [
    {
        id: "1",
        name: "Arun",
        resource: "Sony Camera",
        price: "₹350/day",
        match: "96%",
        rating: "4.9",
        response: "Usually responds quickly",
    },
    {
        id: "2",
        name: "Priya",
        resource: "Canon Camera",
        price: "₹400/day",
        match: "91%",
        rating: "4.8",
        response: "Usually responds within 1 hour",
    },
    {
        id: "3",
        name: "Karthik",
        resource: "Nikon Camera",
        price: "₹380/day",
        match: "88%",
        rating: "4.7",
        response: "Usually responds today",
    },
    {
        id: "4",
        name: "Divya",
        resource: "Sony Camera",
        price: "₹420/day",
        match: "84%",
        rating: "4.6",
        response: "Usually responds quickly",
    },
];

export default function OwnerSelection() {
    const [selected, setSelected] = useState<string[]>([]);

    const toggleOwner = (id: string) => {
        if (selected.includes(id)) {
            setSelected(selected.filter((item) => item !== id));
            return;
        }

        if (selected.length >= 3) {
            Alert.alert(
                "Maximum 3 Owners",
                "You can send requests to up to 3 owners."
            );
            return;
        }

        setSelected([...selected, id]);
    };

    const sendRequests = () => {
        if (selected.length === 0) {
            Alert.alert(
                "Select Owner",
                "Please select at least one owner."
            );
            return;
        }

        Alert.alert(
            "Requests Sent",
            `Rental request sent to ${selected.length} owner${selected.length > 1 ? "s" : ""
            }.`,
            [
                {
                    text: "View Requests",
                    onPress: () =>
                        router.push({
                            pathname: "/request-status",
                            params: {
                                selectedOwners: selected.join(","),
                            },
                        }),
                },
            ]
        );
    };

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Choose Owners</Text>

            <Text style={styles.subtitle}>
                Select up to 3 suitable owners and send your request.
            </Text>

            <View style={styles.aiCard}>
                <Text style={styles.aiTitle}>🤖 AI Matching</Text>

                <Text style={styles.aiText}>
                    Owners are shown based on resource suitability, availability,
                    price, location and community compatibility.
                </Text>
            </View>

            <View style={styles.selectionInfo}>
                <Text style={styles.selectionText}>
                    {selected.length}/3 owners selected
                </Text>
            </View>

            {owners.map((owner) => {
                const isSelected = selected.includes(owner.id);

                return (
                    <TouchableOpacity
                        key={owner.id}
                        style={[
                            styles.ownerCard,
                            isSelected && styles.selectedCard,
                        ]}
                        onPress={() => toggleOwner(owner.id)}
                    >
                        <View style={styles.topRow}>
                            <View style={styles.avatar}>
                                <Text style={styles.avatarText}>
                                    {owner.name.charAt(0)}
                                </Text>
                            </View>

                            <View style={{ flex: 1 }}>
                                <Text style={styles.ownerName}>
                                    {owner.name}
                                </Text>

                                <Text style={styles.verified}>
                                    ✓ Verified Community Member
                                </Text>
                            </View>

                            <View
                                style={[
                                    styles.checkBox,
                                    isSelected && styles.checkedBox,
                                ]}
                            >
                                {isSelected && (
                                    <Text style={styles.check}>✓</Text>
                                )}
                            </View>
                        </View>

                        <View style={styles.resourceRow}>
                            <View>
                                <Text style={styles.resourceName}>
                                    {owner.resource}
                                </Text>

                                <Text style={styles.price}>
                                    {owner.price}
                                </Text>
                            </View>

                            <View style={styles.matchBadge}>
                                <Text style={styles.matchText}>
                                    {owner.match} Match
                                </Text>
                            </View>
                        </View>

                        <View style={styles.detailsRow}>
                            <Text style={styles.detail}>
                                ⭐ {owner.rating}
                            </Text>

                            <Text style={styles.detail}>
                                💬 {owner.response}
                            </Text>
                        </View>
                    </TouchableOpacity>
                );
            })}

            <TouchableOpacity
                style={styles.sendButton}
                onPress={sendRequests}
            >
                <Text style={styles.sendText}>
                    Send Request{selected.length > 1 ? "s" : ""}
                </Text>
            </TouchableOpacity>

            <Text style={styles.note}>
                You can choose one accepted owner later. Other pending requests
                can be cancelled.
            </Text>

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
        lineHeight: 18,
    },

    aiCard: {
        backgroundColor: "#EEF0FF",
        borderRadius: 17,
        padding: 17,
    },

    aiTitle: {
        fontSize: 15,
        fontWeight: "800",
        color: "#4F54D6",
    },

    aiText: {
        fontSize: 11,
        color: "#626776",
        lineHeight: 17,
        marginTop: 5,
    },

    selectionInfo: {
        backgroundColor: "#FFFFFF",
        borderRadius: 13,
        padding: 13,
        marginTop: 15,
        marginBottom: 10,
    },

    selectionText: {
        fontSize: 13,
        fontWeight: "800",
        color: "#5B5FEF",
        textAlign: "center",
    },

    ownerCard: {
        backgroundColor: "#FFFFFF",
        borderRadius: 18,
        padding: 16,
        marginBottom: 12,
        borderWidth: 2,
        borderColor: "transparent",
    },

    selectedCard: {
        borderColor: "#5B5FEF",
    },

    topRow: {
        flexDirection: "row",
        alignItems: "center",
    },

    avatar: {
        width: 47,
        height: 47,
        borderRadius: 24,
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

    ownerName: {
        fontSize: 15,
        fontWeight: "800",
        color: "#303445",
    },

    verified: {
        fontSize: 9,
        color: "#278052",
        marginTop: 4,
    },

    checkBox: {
        width: 25,
        height: 25,
        borderRadius: 7,
        borderWidth: 1.5,
        borderColor: "#C8CAD4",
        justifyContent: "center",
        alignItems: "center",
    },

    checkedBox: {
        backgroundColor: "#5B5FEF",
        borderColor: "#5B5FEF",
    },

    check: {
        color: "#FFFFFF",
        fontSize: 15,
        fontWeight: "800",
    },

    resourceRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 14,
        paddingTop: 12,
        borderTopWidth: 1,
        borderTopColor: "#F0F1F5",
    },

    resourceName: {
        fontSize: 13,
        fontWeight: "700",
        color: "#404454",
    },

    price: {
        fontSize: 13,
        fontWeight: "800",
        color: "#5B5FEF",
        marginTop: 3,
    },

    matchBadge: {
        backgroundColor: "#EAF8EF",
        paddingHorizontal: 8,
        paddingVertical: 6,
        borderRadius: 9,
    },

    matchText: {
        color: "#278052",
        fontSize: 10,
        fontWeight: "800",
    },

    detailsRow: {
        flexDirection: "row",
        marginTop: 10,
        gap: 12,
    },

    detail: {
        fontSize: 10,
        color: "#777C8B",
    },

    sendButton: {
        backgroundColor: "#5B5FEF",
        borderRadius: 15,
        paddingVertical: 17,
        alignItems: "center",
        marginTop: 10,
    },

    sendText: {
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: "800",
    },

    note: {
        textAlign: "center",
        fontSize: 11,
        color: "#9296A3",
        lineHeight: 17,
        marginTop: 10,
    },
});