import React from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
} from "react-native";
import Colors from "../constants/colors";

type Props = {
    name: string;
    icon: string;
};

export default function CategoryCard({ name, icon }: Props) {
    return (
        <TouchableOpacity style={styles.card}>
            <Text style={styles.icon}>{icon}</Text>
            <Text style={styles.name}>{name}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: {
        width: 90,
        height: 95,
        backgroundColor: Colors.white,
        borderRadius: 15,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 12,
        borderWidth: 1,
        borderColor: Colors.border,
    },

    icon: {
        fontSize: 30,
        marginBottom: 8,
    },

    name: {
        fontSize: 12,
        color: Colors.black,
        fontWeight: "600",
        textAlign: "center",
    },
});