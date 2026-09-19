import React from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Alert,
} from "react-native";
import { useLocalSearchParams, router } from "expo-router";

export default function RentalPassport() {
    const params = useLocalSearchParams();

    const resourceName = String(params.resourceName || "Resource");
    const owner = String(params.owner || "Owner");
    const duration = String(params.duration || "1 Day");
    const startDate = String(params.startDate || "-");
    const endDate = String(params.endDate || "-");
    const returnStatus = String(params.returnStatus || "Verified");

    const finishRental = () => {
        Alert.alert(
            "Rental Completed",
            "The rental has been completed and the Rental Passport has been updated.",
            [
                {
                    text: "OK",
                    onPress: () => router.replace("/login"),
                },
            ]
        );
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Rental Passport</Text>
                <Text style={styles.subtitle}>
                    Digital history of this resource
                </Text>
            </View>

            <View style={styles.passportCard}>
                <View style={styles.passportIcon}>
                    <Text style={styles.iconText}>RP</Text>
                </View>

                <View style={{ flex: 1 }}>
                    <Text style={styles.resourceName}>{resourceName}</Text>
                    <Text style={styles.passportId}>RP-RES-00025</Text>
                </View>

                <View style={styles.verifiedBadge}>
                    <Text style={styles.verifiedText}>Verified</Text>
                </View>
            </View>

            <View style={styles.card}>
                <Text style={styles.sectionTitle}>Resource Identity</Text>

                <InfoRow label="Resource" value={resourceName} />
                <InfoRow label="Owner" value={owner} />
                <InfoRow label="Rental Status" value="Completed" />
                <InfoRow label="Return Status" value={returnStatus} />
            </View>

            <View style={styles.card}>
                <Text style={styles.sectionTitle}>AI Condition Check</Text>

                <View style={styles.aiBox}>
                    <Text style={styles.aiTitle}>✓ Condition Comparison Completed</Text>

                    <Text style={styles.aiText}>
                        Before-rental and return-condition records were compared.
                    </Text>

                    <View style={styles.resultRow}>
                        <Text style={styles.resultLabel}>Overall Condition</Text>
                        <Text style={styles.goodResult}>No Major Change</Text>
                    </View>

                    <View style={styles.resultRow}>
                        <Text style={styles.resultLabel}>Damage Alert</Text>
                        <Text style={styles.goodResult}>None Detected</Text>
                    </View>

                    <View style={styles.resultRow}>
                        <Text style={styles.resultLabel}>Component Check</Text>
                        <Text style={styles.goodResult}>No Mismatch</Text>
                    </View>
                </View>
            </View>

            <View style={styles.card}>
                <Text style={styles.sectionTitle}>Rental History</Text>

                <HistoryItem
                    number="1"
                    title="Current Rental"
                    date={`${startDate} → ${endDate}`}
                    status="Returned Successfully"
                />

                <HistoryItem
                    number="2"
                    title="Previous Rental"
                    date="Previous Rental"
                    status="No Major Damage"
                />

                <HistoryItem
                    number="3"
                    title="Previous Rental"
                    date="Earlier Rental"
                    status="Completed"
                />
            </View>

            <View style={styles.card}>
                <Text style={styles.sectionTitle}>Rental Details</Text>

                <InfoRow label="Duration" value={duration} />
                <InfoRow label="Start" value={startDate} />
                <InfoRow label="Return" value={endDate} />
                <InfoRow label="Return Verification" value="QR Verified" />
                <InfoRow label="AI Verification" value="Completed" />
            </View>

            <View style={styles.notice}>
                <Text style={styles.noticeTitle}>Why Rental Passport?</Text>

                <Text style={styles.noticeText}>
                    Every rental creates a digital history for the resource. This helps
                    owners and renters understand previous condition, rental activity,
                    damage records and verification status.
                </Text>
            </View>

            <TouchableOpacity style={styles.button} onPress={finishRental}>
                <Text style={styles.buttonText}>Complete Rental</Text>
            </TouchableOpacity>

            <Text style={styles.prototype}>
                Prototype AI result — real image comparison can be connected later.
            </Text>
        </ScrollView>
    );
}

function InfoRow({
    label,
    value,
}: {
    label: string;
    value: string;
}) {
    return (
        <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>{label}</Text>
            <Text style={styles.infoValue}>{value}</Text>
        </View>
    );
}

function HistoryItem({
    number,
    title,
    date,
    status,
}: {
    number: string;
    title: string;
    date: string;
    status: string;
}) {
    return (
        <View style={styles.historyItem}>
            <View style={styles.numberCircle}>
                <Text style={styles.number}>{number}</Text>
            </View>

            <View style={{ flex: 1 }}>
                <Text style={styles.historyTitle}>{title}</Text>
                <Text style={styles.historyDate}>{date}</Text>
                <Text style={styles.historyStatus}>{status}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F5F7FF",
        padding: 20,
    },

    header: {
        marginTop: 45,
        marginBottom: 20,
    },

    title: {
        fontSize: 28,
        fontWeight: "800",
        color: "#171A2B",
    },

    subtitle: {
        fontSize: 14,
        color: "#777C8B",
        marginTop: 5,
    },

    passportCard: {
        backgroundColor: "#FFFFFF",
        borderRadius: 20,
        padding: 18,
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 18,
    },

    passportIcon: {
        width: 55,
        height: 55,
        borderRadius: 15,
        backgroundColor: "#EEF0FF",
        justifyContent: "center",
        alignItems: "center",
        marginRight: 13,
    },

    iconText: {
        color: "#5B5FEF",
        fontWeight: "900",
        fontSize: 17,
    },

    resourceName: {
        fontSize: 17,
        fontWeight: "800",
        color: "#25283A",
    },

    passportId: {
        fontSize: 12,
        color: "#858A99",
        marginTop: 4,
    },

    verifiedBadge: {
        backgroundColor: "#EAF8EF",
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 10,
    },

    verifiedText: {
        color: "#278052",
        fontSize: 11,
        fontWeight: "800",
    },

    card: {
        backgroundColor: "#FFFFFF",
        borderRadius: 18,
        padding: 20,
        marginBottom: 18,
    },

    sectionTitle: {
        fontSize: 18,
        fontWeight: "800",
        color: "#202333",
        marginBottom: 15,
    },

    infoRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        borderBottomWidth: 1,
        borderBottomColor: "#F0F1F5",
        paddingVertical: 11,
    },

    infoLabel: {
        fontSize: 13,
        color: "#858A99",
    },

    infoValue: {
        fontSize: 13,
        fontWeight: "700",
        color: "#303445",
        maxWidth: "55%",
        textAlign: "right",
    },

    aiBox: {
        backgroundColor: "#F4F5FF",
        borderRadius: 15,
        padding: 15,
    },

    aiTitle: {
        fontSize: 15,
        fontWeight: "800",
        color: "#4D52D5",
    },

    aiText: {
        fontSize: 12,
        color: "#686D7D",
        lineHeight: 18,
        marginTop: 7,
        marginBottom: 12,
    },

    resultRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 8,
    },

    resultLabel: {
        fontSize: 12,
        color: "#6F7483",
    },

    goodResult: {
        fontSize: 12,
        fontWeight: "800",
        color: "#278052",
    },

    historyItem: {
        flexDirection: "row",
        marginBottom: 18,
    },

    numberCircle: {
        width: 35,
        height: 35,
        borderRadius: 18,
        backgroundColor: "#EEF0FF",
        justifyContent: "center",
        alignItems: "center",
        marginRight: 12,
    },

    number: {
        color: "#5B5FEF",
        fontWeight: "800",
    },

    historyTitle: {
        fontSize: 14,
        fontWeight: "800",
        color: "#303445",
    },

    historyDate: {
        fontSize: 12,
        color: "#858A99",
        marginTop: 3,
    },

    historyStatus: {
        fontSize: 12,
        color: "#278052",
        marginTop: 3,
        fontWeight: "600",
    },

    notice: {
        backgroundColor: "#FFF8E8",
        borderRadius: 18,
        padding: 18,
        marginBottom: 18,
    },

    noticeTitle: {
        fontSize: 15,
        fontWeight: "800",
        color: "#806020",
    },

    noticeText: {
        fontSize: 12,
        color: "#776A4E",
        lineHeight: 18,
        marginTop: 7,
    },

    button: {
        backgroundColor: "#5B5FEF",
        paddingVertical: 17,
        borderRadius: 15,
        alignItems: "center",
    },

    buttonText: {
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: "800",
    },

    prototype: {
        textAlign: "center",
        color: "#9296A3",
        fontSize: 11,
        marginTop: 12,
        marginBottom: 35,
    },
});