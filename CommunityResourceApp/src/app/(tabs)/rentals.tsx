import React from "react";
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
} from "react-native";
import { router } from "expo-router";

export default function Rentals() {
    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>My Activity</Text>

            <View style={styles.tabs}>
                <View style={styles.active}>
                    <Text>Rentals</Text>
                </View>

                <View style={styles.tab}>
                    <Text>Exchange</Text>
                </View>
            </View>

            <View style={styles.card}>
                <Text style={styles.name}>Canon Camera</Text>

                <Text>Rental ID: RN-00021</Text>
                <Text>2 days • ₹700</Text>
                <Text>Rental Status: Pending Pickup</Text>

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => router.push("/qr-pickup")}
                >
                    <Text style={styles.buttonText}>Open Pickup QR</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.card}>
                <Text style={styles.name}>HP Laptop</Text>
                <Text>Rental ID: RN-00018</Text>
                <Text>Returned Successfully</Text>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#F7F9FC",
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        marginTop: 20,
    },
    tabs: {
        flexDirection: "row",
        marginTop: 25,
        marginBottom: 20,
    },
    active: {
        flex: 1,
        backgroundColor: "white",
        padding: 15,
        alignItems: "center",
        borderBottomWidth: 2,
    },
    tab: {
        flex: 1,
        backgroundColor: "#EEE",
        padding: 15,
        alignItems: "center",
    },
    card: {
        backgroundColor: "white",
        padding: 18,
        borderRadius: 15,
        marginBottom: 15,
    },
    name: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 8,
    },
    button: {
        backgroundColor: "#111827",
        padding: 13,
        borderRadius: 10,
        marginTop: 15,
    },
    buttonText: {
        color: "white",
        textAlign: "center",
    },
});