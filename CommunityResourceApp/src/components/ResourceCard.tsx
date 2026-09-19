import React from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
} from "react-native";
import Colors from "../constants/colors";

type Props = {
    resource: any;
};

export default function ResourceCard({ resource }: Props) {
    return (
        <TouchableOpacity style={styles.card}>

            <View style={styles.imageBox}>
                <Text style={styles.imageIcon}>
                    {resource.category === "Electronics"
                        ? "💻"
                        : resource.category === "Photography"
                            ? "📷"
                            : resource.category === "Shoes"
                                ? "👟"
                                : resource.category === "Vehicles"
                                    ? "🚲"
                                    : "📦"}
                </Text>
            </View>

            <View style={styles.info}>

                <View style={styles.row}>
                    <Text style={styles.name}>{resource.name}</Text>

                    <Text style={styles.rating}>
                        ⭐ {resource.rating}
                    </Text>
                </View>

                <Text style={styles.location}>
                    📍 {resource.location}
                </Text>

                <Text style={styles.condition}>
                    Condition: {resource.condition}
                </Text>

                <View style={styles.bottomRow}>
                    <Text style={styles.price}>
                        ₹{resource.price} {resource.duration}
                    </Text>

                    <View style={styles.available}>
                        <Text style={styles.availableText}>
                            Available
                        </Text>
                    </View>
                </View>

            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: {
        flexDirection: "row",
        backgroundColor: Colors.white,
        borderRadius: 18,
        padding: 12,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: Colors.border,
    },

    imageBox: {
        width: 90,
        height: 100,
        borderRadius: 14,
        backgroundColor: Colors.lightGray,
        justifyContent: "center",
        alignItems: "center",
    },

    imageIcon: {
        fontSize: 42,
    },

    info: {
        flex: 1,
        marginLeft: 12,
        justifyContent: "space-between",
    },

    row: {
        flexDirection: "row",
        justifyContent: "space-between",
    },

    name: {
        fontSize: 17,
        fontWeight: "700",
        color: Colors.black,
        flex: 1,
    },

    rating: {
        fontSize: 13,
        color: Colors.black,
    },

    location: {
        fontSize: 13,
        color: Colors.gray,
        marginTop: 5,
    },

    condition: {
        fontSize: 12,
        color: Colors.green,
        marginTop: 5,
    },

    bottomRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 8,
    },

    price: {
        fontSize: 15,
        fontWeight: "700",
        color: Colors.primary,
    },

    available: {
        backgroundColor: "#E8F7EF",
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 8,
    },

    availableText: {
        color: Colors.green,
        fontSize: 10,
        fontWeight: "600",
    },
});