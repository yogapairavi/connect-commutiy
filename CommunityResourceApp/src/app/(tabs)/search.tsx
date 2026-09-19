import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
} from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const resources = [
    {
        id: "1",
        name: "Canon Camera",
        category: "Photography",
        price: 350,
        location: "2.1 km",
        condition: "Excellent",
        match: 92,
    },
    {
        id: "2",
        name: "HP Laptop",
        category: "Electronics",
        price: 500,
        location: "College Campus",
        condition: "Good",
        match: 88,
    },
    {
        id: "3",
        name: "Sports Shoes",
        category: "Shoes",
        price: 100,
        location: "Hostel",
        condition: "Excellent",
        match: 84,
    },
];

export default function Search() {
    const [query, setQuery] = useState("");

    const filtered = resources.filter((item) =>
        `${item.name} ${item.category}`
            .toLowerCase()
            .includes(query.toLowerCase())
    );

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Find a Resource</Text>

            <View style={styles.inputBox}>
                <Ionicons name="search-outline" size={21} />
                <TextInput
                    style={styles.input}
                    placeholder="Try: camera for tomorrow"
                    value={query}
                    onChangeText={setQuery}
                />
            </View>

            <Text style={styles.ai}>
                ✨ AI understands your requirement and finds suitable resources.
            </Text>

            <Text style={styles.heading}>Categories</Text>

            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {[
                    "All",
                    "Electronics",
                    "Shoes",
                    "Education",
                    "Sports",
                    "Gaming",
                    "Photography",
                    "Tools",
                ].map((cat) => (
                    <TouchableOpacity key={cat} style={styles.category}>
                        <Text>{cat}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>

            <Text style={styles.heading}>Available Resources</Text>

            {filtered.map((item) => (
                <TouchableOpacity
                    key={item.id}
                    style={styles.card}
                    onPress={() =>
                        router.push({
                            pathname: "/resource-details",
                            params: { id: item.id },
                        })
                    }
                >
                    <View style={styles.icon}>
                        <Ionicons name="cube-outline" size={30} />
                    </View>

                    <View style={{ flex: 1 }}>
                        <Text style={styles.name}>{item.name}</Text>
                        <Text>{item.category}</Text>
                        <Text>
                            ₹{item.price}/day • {item.location}
                        </Text>

                        <View style={styles.row}>
                            <Text>Condition: {item.condition}</Text>
                            <Text style={styles.match}>{item.match}% Match</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            ))}
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
        fontSize: 27,
        fontWeight: "bold",
        marginTop: 20,
    },
    inputBox: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "white",
        padding: 14,
        borderRadius: 13,
        marginTop: 20,
    },
    input: {
        flex: 1,
        marginLeft: 8,
    },
    ai: {
        marginTop: 15,
        padding: 14,
        backgroundColor: "white",
        borderRadius: 12,
    },
    heading: {
        fontSize: 19,
        fontWeight: "bold",
        marginTop: 25,
        marginBottom: 12,
    },
    category: {
        backgroundColor: "white",
        padding: 12,
        borderRadius: 20,
        marginRight: 8,
    },
    card: {
        flexDirection: "row",
        backgroundColor: "white",
        padding: 16,
        borderRadius: 15,
        marginBottom: 12,
    },
    icon: {
        width: 60,
        height: 60,
        borderRadius: 12,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 14,
    },
    name: {
        fontSize: 17,
        fontWeight: "bold",
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 7,
    },
    match: {
        fontWeight: "bold",
    },
});