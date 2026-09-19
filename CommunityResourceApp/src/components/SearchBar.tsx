import React from "react";
import {
    View,
    TextInput,
    StyleSheet,
} from "react-native";
import Colors from "../constants/colors";

export default function SearchBar() {
    return (
        <View style={styles.container}>
            <TextInput
                placeholder="What do you need?"
                placeholderTextColor={Colors.gray}
                style={styles.input}
            />

            <View style={styles.icon}>
                <TextInput
                    editable={false}
                    value="🔍"
                    style={styles.searchIcon}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: Colors.white,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: Colors.border,
        paddingHorizontal: 15,
        height: 52,
    },

    input: {
        flex: 1,
        fontSize: 16,
        color: Colors.black,
    },

    icon: {
        width: 35,
        alignItems: "center",
    },

    searchIcon: {
        fontSize: 20,
    },
});