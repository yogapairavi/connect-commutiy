import React from "react";
import {
    View,
    Text,
    StyleSheet,
} from "react-native";

export default function Wallet() {
    return (
        <View style={styles.container}>

            <Text style={styles.title}>
                My Wallet 💰
            </Text>

            <View style={styles.balance}>
                <Text style={styles.label}>
                    Available Balance
                </Text>

                <Text style={styles.amount}>
                    ₹1,250
                </Text>
            </View>

            <View style={styles.card}>
                <Text>Advance Payment</Text>
                <Text>₹350</Text>
            </View>

            <View style={styles.card}>
                <Text>Refunds</Text>
                <Text>₹500</Text>
            </View>

            <View style={styles.card}>
                <Text>Emergency Fee</Text>
                <Text>₹100</Text>
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F8F7FC",
        padding: 22,
        paddingTop: 60,
    },

    title: {
        fontSize: 30,
        fontWeight: "800",
        color: "#5140C9",
    },

    balance: {
        backgroundColor: "#5140C9",
        borderRadius: 25,
        padding: 30,
        marginTop: 25,
    },

    label: {
        color: "white",
        fontSize: 16,
    },

    amount: {
        color: "white",
        fontSize: 35,
        fontWeight: "800",
        marginTop: 10,
    },

    card: {
        backgroundColor: "white",
        padding: 20,
        borderRadius: 18,
        marginTop: 15,
        flexDirection: "row",
        justifyContent: "space-between",
        elevation: 2,
    },
});