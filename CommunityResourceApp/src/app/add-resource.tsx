import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
    Alert,
    Image,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";

const CATEGORIES = [
    "Electronics",
    "Shoes & Footwear",
    "Vehicles & Travel",
    "Education & College",
    "Sports",
    "Gaming",
    "Photography & Events",
    "Tools",
    "Home & Hostel",
    "Music & Creative",
    "Functions & Events",
];

export default function AddResource() {
    const [itemName, setItemName] = useState("");
    const [category, setCategory] = useState("");
    const [showCategories, setShowCategories] = useState(false);

    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");

    const [hashtagInput, setHashtagInput] = useState("");
    const [hashtags, setHashtags] = useState<string[]>([]);

    const [startDate, setStartDate] =
        useState<Date | null>(null);

    const [endDate, setEndDate] =
        useState<Date | null>(null);

    const [showStartPicker, setShowStartPicker] =
        useState(false);

    const [showEndPicker, setShowEndPicker] =
        useState(false);

    const [image, setImage] =
        useState<string | null>(null);

    // -----------------------------
    // IMAGE PICKER
    // -----------------------------

    const pickImage = async () => {
        const permission =
            await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (!permission.granted) {
            Alert.alert(
                "Permission Required",
                "Please allow gallery permission."
            );
            return;
        }

        const result =
            await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ["images"],
                allowsEditing: true,
                aspect: [4, 3],
                quality: 0.8,
            });

        if (
            !result.canceled &&
            result.assets.length > 0
        ) {
            setImage(result.assets[0].uri);
        }
    };

    // -----------------------------
    // ADD HASHTAG
    // -----------------------------

    const addHashtag = () => {
        let value = hashtagInput.trim();

        if (!value) {
            return;
        }

        value = value.replace(/\s+/g, "");

        if (!value.startsWith("#")) {
            value = "#" + value;
        }

        if (hashtags.includes(value)) {
            setHashtagInput("");
            return;
        }

        setHashtags([...hashtags, value]);
        setHashtagInput("");
    };

    // -----------------------------
    // REMOVE HASHTAG
    // -----------------------------

    const removeHashtag = (tag: string) => {
        setHashtags(
            hashtags.filter((item) => item !== tag)
        );
    };

    // -----------------------------
    // DATE FORMAT
    // -----------------------------

    const formatDate = (date: Date | null) => {
        if (!date) {
            return "Select Date";
        }

        return date.toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        });
    };

    // -----------------------------
    // RENTAL DAYS
    // -----------------------------

    const calculateDays = () => {
        if (!startDate || !endDate) {
            return 0;
        }

        const start = new Date(startDate);
        const end = new Date(endDate);

        start.setHours(0, 0, 0, 0);
        end.setHours(0, 0, 0, 0);

        const difference =
            end.getTime() - start.getTime();

        return Math.max(
            0,
            Math.floor(
                difference /
                (1000 * 60 * 60 * 24)
            )
        );
    };

    const rentalDays = calculateDays();

    const totalAmount =
        (Number(price) || 0) * rentalDays;

    // -----------------------------
    // SAVE RESOURCE
    // -----------------------------

    const handleSubmit = async () => {
        if (!itemName.trim()) {
            Alert.alert(
                "Required",
                "Please enter resource name."
            );
            return;
        }

        if (!category) {
            Alert.alert(
                "Required",
                "Please select a category."
            );
            return;
        }

        if (!description.trim()) {
            Alert.alert(
                "Required",
                "Please enter description."
            );
            return;
        }

        if (!price.trim()) {
            Alert.alert(
                "Required",
                "Please enter rental price."
            );
            return;
        }

        if (Number(price) <= 0) {
            Alert.alert(
                "Invalid Price",
                "Price must be greater than zero."
            );
            return;
        }

        if (hashtags.length === 0) {
            Alert.alert(
                "Hashtag Required",
                "Please add at least one hashtag."
            );
            return;
        }

        if (!startDate || !endDate) {
            Alert.alert(
                "Required",
                "Please select rental dates."
            );
            return;
        }

        if (endDate <= startDate) {
            Alert.alert(
                "Invalid Dates",
                "End date must be after start date."
            );
            return;
        }

        if (!image) {
            Alert.alert(
                "Photo Required",
                "Please add a resource photo."
            );
            return;
        }

        try {
            const newResource = {
                id: "RES-" + Date.now(),

                name: itemName.trim(),

                category: category,

                description: description.trim(),

                price: Number(price),

                hashtags: hashtags,

                image: image,

                startDate: startDate.toISOString(),

                endDate: endDate.toISOString(),

                rentalDays: rentalDays,

                totalAmount: totalAmount,

                createdAt: new Date().toISOString(),

                ownerName: "You",

                ownerRole: "Provider",
            };

            const existingData =
                await AsyncStorage.getItem(
                    "community_resources"
                );

            let resources: any[] = [];

            if (existingData) {
                resources = JSON.parse(existingData);
            }

            resources.unshift(newResource);

            await AsyncStorage.setItem(
                "community_resources",
                JSON.stringify(resources)
            );

            Alert.alert(
                "Resource Added Successfully",
                `${itemName} has been added to your resources.`,
                [
                    {
                        text: "View Resource",
                        onPress: () => {
                            router.replace(
                                "/(tabs)/home" as any
                            );
                        },
                    },
                ]
            );
        } catch (error) {
            Alert.alert(
                "Error",
                "Unable to save resource."
            );
        }
    };

    return (
        <ScrollView
            style={styles.screen}
            contentContainerStyle={styles.container}
            keyboardShouldPersistTaps="handled"
        >
            {/* HEADER */}

            <Text style={styles.title}>
                Add Resource
            </Text>

            <Text style={styles.subtitle}>
                List your resource for the community
            </Text>

            {/* IMAGE */}

            <Text style={styles.label}>
                Resource Photo
            </Text>

            {image ? (
                <View style={styles.imageContainer}>
                    <Image
                        source={{ uri: image }}
                        style={styles.resourceImage}
                    />

                    <TouchableOpacity
                        style={styles.changeButton}
                        onPress={pickImage}
                    >
                        <Text
                            style={styles.changeButtonText}
                        >
                            Change Photo
                        </Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <TouchableOpacity
                    style={styles.photoBox}
                    onPress={pickImage}
                >
                    <Text style={styles.photoIcon}>
                        📷
                    </Text>

                    <Text style={styles.photoTitle}>
                        Add Resource Photo
                    </Text>

                    <Text style={styles.photoSubtitle}>
                        Tap to choose from gallery
                    </Text>
                </TouchableOpacity>
            )}

            {/* RESOURCE NAME */}

            <Text style={styles.label}>
                Resource Name
            </Text>

            <TextInput
                style={styles.input}
                value={itemName}
                onChangeText={setItemName}
                placeholder="Example: HP Laptop"
                placeholderTextColor="#999999"
            />

            {/* CATEGORY */}

            <Text style={styles.label}>
                Category
            </Text>

            <TouchableOpacity
                style={styles.selectButton}
                onPress={() =>
                    setShowCategories(!showCategories)
                }
            >
                <Text
                    style={[
                        styles.selectText,
                        !category &&
                        styles.placeholderText,
                    ]}
                >
                    {category ||
                        "Tap to select category"}
                </Text>

                <Text style={styles.arrow}>
                    {showCategories ? "▲" : "▼"}
                </Text>
            </TouchableOpacity>

            {showCategories && (
                <View style={styles.categoryList}>
                    {CATEGORIES.map((item) => (
                        <TouchableOpacity
                            key={item}
                            style={[
                                styles.categoryOption,
                                category === item &&
                                styles.selectedCategory,
                            ]}
                            onPress={() => {
                                setCategory(item);
                                setShowCategories(false);
                            }}
                        >
                            <Text
                                style={[
                                    styles.categoryText,
                                    category === item &&
                                    styles.selectedCategoryText,
                                ]}
                            >
                                {item}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
            )}

            {/* DESCRIPTION */}

            <Text style={styles.label}>
                Description
            </Text>

            <TextInput
                style={[
                    styles.input,
                    styles.descriptionInput,
                ]}
                value={description}
                onChangeText={setDescription}
                placeholder="Describe your resource"
                placeholderTextColor="#999999"
                multiline
            />

            {/* HASHTAGS */}

            <Text style={styles.label}>
                Hashtags
            </Text>

            <View style={styles.hashtagInputRow}>
                <TextInput
                    style={styles.hashtagInput}
                    value={hashtagInput}
                    onChangeText={setHashtagInput}
                    placeholder="#laptop #college"
                    placeholderTextColor="#999999"
                    onSubmitEditing={addHashtag}
                />

                <TouchableOpacity
                    style={styles.addTagButton}
                    onPress={addHashtag}
                >
                    <Text style={styles.addTagText}>
                        Add
                    </Text>
                </TouchableOpacity>
            </View>

            <Text style={styles.helperText}>
                Add tags to help AI find this resource.
            </Text>

            <View style={styles.hashtagContainer}>
                {hashtags.map((tag) => (
                    <TouchableOpacity
                        key={tag}
                        style={styles.hashtag}
                        onPress={() =>
                            removeHashtag(tag)
                        }
                    >
                        <Text style={styles.hashtagText}>
                            {tag} ×
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            {/* PRICE */}

            <Text style={styles.label}>
                Rental Price Per Day
            </Text>

            <TextInput
                style={styles.input}
                value={price}
                onChangeText={(text) => {
                    const clean =
                        text.replace(/[^0-9.]/g, "");

                    setPrice(clean);
                }}
                placeholder="Example: 350"
                placeholderTextColor="#999999"
                keyboardType="decimal-pad"
            />

            {/* START DATE */}

            <Text style={styles.label}>
                Rental Start Date
            </Text>

            <TouchableOpacity
                style={styles.dateButton}
                onPress={() =>
                    setShowStartPicker(true)
                }
            >
                <Text style={styles.dateText}>
                    📅 {formatDate(startDate)}
                </Text>
            </TouchableOpacity>

            {showStartPicker && (
                <DateTimePicker
                    value={
                        startDate || new Date()
                    }
                    mode="date"
                    display="default"
                    onChange={(
                        event,
                        selectedDate
                    ) => {
                        setShowStartPicker(false);

                        if (selectedDate) {
                            setStartDate(selectedDate);
                        }
                    }}
                />
            )}

            {/* END DATE */}

            <Text style={styles.label}>
                Rental End Date
            </Text>

            <TouchableOpacity
                style={styles.dateButton}
                onPress={() =>
                    setShowEndPicker(true)
                }
            >
                <Text style={styles.dateText}>
                    📅 {formatDate(endDate)}
                </Text>
            </TouchableOpacity>

            {showEndPicker && (
                <DateTimePicker
                    value={
                        endDate ||
                        startDate ||
                        new Date()
                    }
                    mode="date"
                    display="default"
                    onChange={(
                        event,
                        selectedDate
                    ) => {
                        setShowEndPicker(false);

                        if (selectedDate) {
                            setEndDate(selectedDate);
                        }
                    }}
                />
            )}

            {/* SUMMARY */}

            {rentalDays > 0 && (
                <View style={styles.summaryBox}>
                    <Text style={styles.summaryTitle}>
                        Rental Summary
                    </Text>

                    <View style={styles.summaryRow}>
                        <Text style={styles.summaryLabel}>
                            Price / Day
                        </Text>

                        <Text style={styles.summaryValue}>
                            ₹{Number(price) || 0}
                        </Text>
                    </View>

                    <View style={styles.summaryRow}>
                        <Text style={styles.summaryLabel}>
                            Rental Days
                        </Text>

                        <Text style={styles.summaryValue}>
                            {rentalDays} Days
                        </Text>
                    </View>

                    <View style={styles.divider} />

                    <View style={styles.summaryRow}>
                        <Text style={styles.totalLabel}>
                            Total Amount
                        </Text>

                        <Text style={styles.totalValue}>
                            ₹{totalAmount}
                        </Text>
                    </View>
                </View>
            )}

            {/* SUBMIT */}

            <TouchableOpacity
                style={styles.submitButton}
                onPress={handleSubmit}
                activeOpacity={0.8}
            >
                <Text style={styles.submitText}>
                    Add Resource
                </Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: "#F7F8FC",
    },

    container: {
        padding: 24,
        paddingBottom: 60,
    },

    title: {
        fontSize: 28,
        fontWeight: "700",
        color: "#222222",
        marginTop: 20,
    },

    subtitle: {
        fontSize: 15,
        color: "#777777",
        marginTop: 7,
        marginBottom: 20,
    },

    label: {
        fontSize: 15,
        fontWeight: "600",
        color: "#333333",
        marginTop: 16,
        marginBottom: 7,
    },

    input: {
        height: 52,
        backgroundColor: "#FFFFFF",
        borderWidth: 1,
        borderColor: "#DDDFE7",
        borderRadius: 12,
        paddingHorizontal: 15,
        fontSize: 15,
        color: "#222222",
    },

    descriptionInput: {
        height: 100,
        paddingTop: 14,
        textAlignVertical: "top",
    },

    /* IMAGE */

    photoBox: {
        height: 180,
        backgroundColor: "#FFFFFF",
        borderWidth: 1.5,
        borderColor: "#D5D7E2",
        borderStyle: "dashed",
        borderRadius: 15,
        alignItems: "center",
        justifyContent: "center",
    },

    photoIcon: {
        fontSize: 38,
        marginBottom: 10,
    },

    photoTitle: {
        fontSize: 16,
        fontWeight: "700",
        color: "#333333",
    },

    photoSubtitle: {
        fontSize: 13,
        color: "#888888",
        marginTop: 5,
    },

    imageContainer: {
        backgroundColor: "#FFFFFF",
        borderRadius: 15,
        overflow: "hidden",
        borderWidth: 1,
        borderColor: "#DDDFE7",
    },

    resourceImage: {
        width: "100%",
        height: 220,
        resizeMode: "cover",
    },

    changeButton: {
        height: 45,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#EEF0FF",
    },

    changeButtonText: {
        color: "#5B5FEF",
        fontWeight: "700",
        fontSize: 14,
    },

    /* CATEGORY */

    selectButton: {
        height: 52,
        backgroundColor: "#FFFFFF",
        borderWidth: 1,
        borderColor: "#DDDFE7",
        borderRadius: 12,
        paddingHorizontal: 15,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },

    selectText: {
        fontSize: 15,
        color: "#222222",
    },

    placeholderText: {
        color: "#999999",
    },

    arrow: {
        fontSize: 13,
        color: "#666666",
    },

    categoryList: {
        backgroundColor: "#FFFFFF",
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#DDDFE7",
        marginTop: 5,
        overflow: "hidden",
    },

    categoryOption: {
        paddingVertical: 14,
        paddingHorizontal: 15,
        borderBottomWidth: 1,
        borderBottomColor: "#EEEEEE",
    },

    selectedCategory: {
        backgroundColor: "#EEF0FF",
    },

    categoryText: {
        fontSize: 14,
        color: "#333333",
    },

    selectedCategoryText: {
        color: "#5B5FEF",
        fontWeight: "700",
    },

    /* HASHTAGS */

    hashtagInputRow: {
        flexDirection: "row",
        alignItems: "center",
    },

    hashtagInput: {
        flex: 1,
        height: 52,
        backgroundColor: "#FFFFFF",
        borderWidth: 1,
        borderColor: "#DDDFE7",
        borderRadius: 12,
        paddingHorizontal: 15,
        fontSize: 15,
        color: "#222222",
    },

    addTagButton: {
        height: 52,
        paddingHorizontal: 18,
        marginLeft: 8,
        backgroundColor: "#5B5FEF",
        borderRadius: 12,
        alignItems: "center",
        justifyContent: "center",
    },

    addTagText: {
        color: "#FFFFFF",
        fontWeight: "700",
    },

    helperText: {
        fontSize: 12,
        color: "#888888",
        marginTop: 6,
    },

    hashtagContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        marginTop: 10,
    },

    hashtag: {
        backgroundColor: "#EEF0FF",
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 20,
        marginRight: 7,
        marginBottom: 7,
    },

    hashtagText: {
        color: "#4D51B8",
        fontSize: 13,
        fontWeight: "600",
    },

    /* DATE */

    dateButton: {
        height: 52,
        backgroundColor: "#FFFFFF",
        borderWidth: 1,
        borderColor: "#DDDFE7",
        borderRadius: 12,
        justifyContent: "center",
        paddingHorizontal: 15,
    },

    dateText: {
        fontSize: 15,
        color: "#333333",
    },

    /* SUMMARY */

    summaryBox: {
        backgroundColor: "#EEF0FF",
        borderRadius: 15,
        padding: 17,
        marginTop: 22,
    },

    summaryTitle: {
        fontSize: 17,
        fontWeight: "700",
        color: "#4448A8",
        marginBottom: 12,
    },

    summaryRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 9,
    },

    summaryLabel: {
        fontSize: 14,
        color: "#666666",
    },

    summaryValue: {
        fontSize: 14,
        fontWeight: "600",
        color: "#333333",
    },

    divider: {
        height: 1,
        backgroundColor: "#D7D9EA",
        marginVertical: 7,
    },

    totalLabel: {
        fontSize: 16,
        fontWeight: "700",
        color: "#333333",
    },

    totalValue: {
        fontSize: 18,
        fontWeight: "700",
        color: "#5B5FEF",
    },

    /* SUBMIT */

    submitButton: {
        height: 55,
        backgroundColor: "#5B5FEF",
        borderRadius: 13,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 25,
    },

    submitText: {
        color: "#FFFFFF",
        fontSize: 17,
        fontWeight: "700",
    },
});