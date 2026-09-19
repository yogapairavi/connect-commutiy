import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";

type UserProfile = {
    name?: string;
    phone?: string;
    area?: string;
    role?: string;
    kycStatus?: string;

    // College Community details
    college?: string;
    collegeId?: string;
    department?: string;
    year?: string;
};

export default function ProfileScreen() {
    const [user, setUser] = useState<UserProfile>({});
    const [loading, setLoading] = useState(true);

    const loadProfile = async () => {
        try {
            const savedUser = await AsyncStorage.getItem("community_user");

            if (savedUser) {
                const data = JSON.parse(savedUser);
                setUser(data);
            }
        } catch (error) {
            console.log("Profile loading error:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadProfile();
    }, []);

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <Text style={styles.loadingText}>
                    Loading profile...
                </Text>
            </View>
        );
    }

    const name = user.name || "Your Name";

    const firstLetter =
        name.trim().length > 0
            ? name.trim().charAt(0).toUpperCase()
            : "U";

    const role =
        user.role === "provider"
            ? "Provider"
            : user.role === "receiver"
                ? "Receiver"
                : "Community Member";

    return (
        <ScrollView
            style={styles.container}
            contentContainerStyle={styles.content}
            showsVerticalScrollIndicator={false}
        >
            {/* PAGE TITLE */}
            <Text style={styles.pageTitle}>
                My Profile
            </Text>

            {/* PROFILE HEADER */}
            <View style={styles.profileHeader}>
                <View style={styles.avatar}>
                    <Text style={styles.avatarText}>
                        {firstLetter}
                    </Text>
                </View>

                <Text style={styles.name}>
                    {name}
                </Text>

                <View style={styles.roleBadge}>
                    <Text style={styles.roleText}>
                        {role}
                    </Text>
                </View>

                {user.area ? (
                    <Text style={styles.location}>
                        📍 {user.area}
                    </Text>
                ) : (
                    <Text style={styles.location}>
                        📍 Area not added
                    </Text>
                )}
            </View>

            {/* PERSONAL DETAILS */}
            <View style={styles.card}>
                <Text style={styles.sectionTitle}>
                    Personal Details
                </Text>

                <DetailRow
                    icon="📱"
                    title="Mobile Number"
                    value={user.phone || "Not available"}
                />

                <DetailRow
                    icon="📍"
                    title="Area"
                    value={user.area || "Not added"}
                />
            </View>

            {/* KYC */}
            <View style={styles.card}>
                <Text style={styles.sectionTitle}>
                    KYC Verification
                </Text>

                <View style={styles.kycBox}>
                    <View style={styles.checkCircle}>
                        <Text style={styles.checkText}>
                            ✓
                        </Text>
                    </View>

                    <View style={styles.kycContent}>
                        <Text style={styles.kycTitle}>
                            Identity Verification
                        </Text>

                        <Text style={styles.kycStatus}>
                            {user.kycStatus || "Verification pending"}
                        </Text>
                    </View>
                </View>
            </View>

            {/* COLLEGE COMMUNITY */}
            <View style={styles.card}>
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>
                        College Community
                    </Text>

                    <Text style={styles.optional}>
                        Optional
                    </Text>
                </View>

                {user.college ? (
                    <>
                        <DetailRow
                            icon="🎓"
                            title="College"
                            value={user.college}
                        />

                        <DetailRow
                            icon="🪪"
                            title="College ID"
                            value={user.collegeId || "Not available"}
                        />

                        {user.department ? (
                            <DetailRow
                                icon="🏫"
                                title="Department"
                                value={user.department}
                            />
                        ) : null}

                        {user.year ? (
                            <DetailRow
                                icon="📅"
                                title="Year"
                                value={user.year}
                            />
                        ) : null}

                        <View style={styles.collegeVerified}>
                            <Text style={styles.collegeCheck}>
                                ✓
                            </Text>

                            <Text style={styles.collegeVerifiedText}>
                                College community verified
                            </Text>
                        </View>
                    </>
                ) : (
                    <>
                        <Text style={styles.noCollegeText}>
                            You have not joined a college community yet.
                        </Text>

                        <TouchableOpacity
                            style={styles.joinButton}
                            onPress={() =>
                                router.push("/college-community")
                            }
                        >
                            <Text style={styles.joinButtonText}>
                                Join College Community
                            </Text>
                        </TouchableOpacity>
                    </>
                )}
            </View>

            {/* RESOURCES & RENTALS */}
            <View style={styles.card}>
                <Text style={styles.sectionTitle}>
                    Resources & Rentals
                </Text>

                <MenuItem
                    icon="📦"
                    title="My Resources"
                    subtitle="Resources you provide"
                    onPress={() =>
                        router.push("/provider-home")
                    }
                />

                <MenuItem
                    icon="🛍️"
                    title="My Rentals"
                    subtitle="Your rental activity"
                    onPress={() =>
                        router.push("/receiver-home")
                    }
                />

                <MenuItem
                    icon="🪪"
                    title="Rental Passport"
                    subtitle="Resource history and condition"
                    onPress={() =>
                        router.push("/rental-passport")
                    }
                />

                <MenuItem
                    icon="🔄"
                    title="Exchange"
                    subtitle="Exchange resources with others"
                    onPress={() =>
                        router.push("/exchange")
                    }
                />
            </View>

            {/* COMMUNITY */}
            <View style={styles.card}>
                <Text style={styles.sectionTitle}>
                    Community
                </Text>

                <MenuItem
                    icon="🎓"
                    title="College Community"
                    subtitle="Connect with your college members"
                    onPress={() =>
                        router.push("/college-community")
                    }
                />

                <MenuItem
                    icon="👥"
                    title="My Circle"
                    subtitle="Friends, classmates and groups"
                    onPress={() =>
                        router.push("/my-circle")
                    }
                />
            </View>

            {/* ACCOUNT */}
            <View style={styles.card}>
                <Text style={styles.sectionTitle}>
                    Account
                </Text>

                <MenuItem
                    icon="💰"
                    title="Wallet"
                    subtitle="Balance and transactions"
                    onPress={() =>
                        router.push("/wallet")
                    }
                />

                <MenuItem
                    icon="🔔"
                    title="Notifications"
                    subtitle="Requests and updates"
                    onPress={() =>
                        router.push("/notifications")
                    }
                />

                <MenuItem
                    icon="🆘"
                    title="SOS"
                    subtitle="Emergency assistance"
                    onPress={() =>
                        router.push("/sos")
                    }
                />
            </View>

            {/* SUPPORT */}
            <View style={styles.card}>
                <Text style={styles.sectionTitle}>
                    Support
                </Text>

                <MenuItem
                    icon="🤖"
                    title="AI Assistant"
                    subtitle="Get help with the platform"
                    onPress={() =>
                        router.push("/ai-assistant")
                    }
                />

                <MenuItem
                    icon="⚙️"
                    title="Settings"
                    subtitle="Manage your account"
                    onPress={() => {
                        Alert.alert(
                            "Settings",
                            "Settings section will be added next."
                        );
                    }}
                />
            </View>

            {/* FOOTER */}
            <Text style={styles.footerTitle}>
                CommunityConnect
            </Text>

            <Text style={styles.footerText}>
                Share • Rent • Borrow • Exchange
            </Text>
        </ScrollView>
    );
}

/* DETAIL ROW */

function DetailRow({
    icon,
    title,
    value,
}: {
    icon: string;
    title: string;
    value: string;
}) {
    return (
        <View style={styles.detailRow}>
            <Text style={styles.detailIcon}>
                {icon}
            </Text>

            <View style={styles.detailContent}>
                <Text style={styles.detailTitle}>
                    {title}
                </Text>

                <Text style={styles.detailValue}>
                    {value}
                </Text>
            </View>
        </View>
    );
}

/* MENU ITEM */

function MenuItem({
    icon,
    title,
    subtitle,
    onPress,
}: {
    icon: string;
    title: string;
    subtitle: string;
    onPress: () => void;
}) {
    return (
        <TouchableOpacity
            style={styles.menuItem}
            onPress={onPress}
            activeOpacity={0.7}
        >
            <View style={styles.menuIconBox}>
                <Text style={styles.menuIcon}>
                    {icon}
                </Text>
            </View>

            <View style={styles.menuContent}>
                <Text style={styles.menuTitle}>
                    {title}
                </Text>

                <Text style={styles.menuSubtitle}>
                    {subtitle}
                </Text>
            </View>

            <Text style={styles.arrow}>
                ›
            </Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F5F7FF",
    },

    content: {
        padding: 20,
        paddingBottom: 50,
    },

    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F5F7FF",
    },

    loadingText: {
        fontSize: 16,
        color: "#666A7A",
    },

    pageTitle: {
        fontSize: 30,
        fontWeight: "700",
        color: "#20233A",
        marginTop: 20,
        marginBottom: 18,
    },

    profileHeader: {
        backgroundColor: "#FFFFFF",
        borderRadius: 20,
        padding: 24,
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#E5E7EF",
        marginBottom: 16,
    },

    avatar: {
        width: 86,
        height: 86,
        borderRadius: 43,
        backgroundColor: "#5B5FEF",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 12,
    },

    avatarText: {
        fontSize: 36,
        fontWeight: "700",
        color: "#FFFFFF",
    },

    name: {
        fontSize: 24,
        fontWeight: "700",
        color: "#20233A",
        textAlign: "center",
    },

    roleBadge: {
        backgroundColor: "#EEF0FF",
        paddingHorizontal: 15,
        paddingVertical: 6,
        borderRadius: 20,
        marginTop: 8,
    },

    roleText: {
        fontSize: 13,
        fontWeight: "700",
        color: "#5559D9",
    },

    location: {
        fontSize: 14,
        color: "#707487",
        marginTop: 10,
    },

    card: {
        backgroundColor: "#FFFFFF",
        borderRadius: 17,
        padding: 18,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: "#E5E7EF",
    },

    sectionHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },

    sectionTitle: {
        fontSize: 18,
        fontWeight: "700",
        color: "#25283D",
        marginBottom: 12,
    },

    optional: {
        fontSize: 11,
        color: "#85899A",
        backgroundColor: "#F1F2F6",
        paddingHorizontal: 9,
        paddingVertical: 4,
        borderRadius: 10,
    },

    detailRow: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 11,
        borderBottomWidth: 1,
        borderBottomColor: "#F0F1F5",
    },

    detailIcon: {
        fontSize: 21,
        width: 40,
    },

    detailContent: {
        flex: 1,
    },

    detailTitle: {
        fontSize: 12,
        color: "#85899A",
        marginBottom: 3,
    },

    detailValue: {
        fontSize: 15,
        fontWeight: "600",
        color: "#25283D",
    },

    kycBox: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#EAF8F0",
        borderRadius: 13,
        padding: 14,
    },

    checkCircle: {
        width: 34,
        height: 34,
        borderRadius: 17,
        backgroundColor: "#2E8B57",
        justifyContent: "center",
        alignItems: "center",
        marginRight: 12,
    },

    checkText: {
        color: "#FFFFFF",
        fontSize: 19,
        fontWeight: "700",
    },

    kycContent: {
        flex: 1,
    },

    kycTitle: {
        fontSize: 14,
        fontWeight: "700",
        color: "#247A48",
    },

    kycStatus: {
        fontSize: 12,
        color: "#4D745D",
        marginTop: 3,
    },

    collegeVerified: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#EEF0FF",
        borderRadius: 12,
        padding: 12,
        marginTop: 14,
    },

    collegeCheck: {
        fontSize: 18,
        fontWeight: "700",
        color: "#5B5FEF",
        marginRight: 8,
    },

    collegeVerifiedText: {
        fontSize: 13,
        fontWeight: "600",
        color: "#5559D9",
    },

    noCollegeText: {
        fontSize: 14,
        color: "#777B8C",
        lineHeight: 20,
        marginBottom: 14,
    },

    joinButton: {
        height: 46,
        backgroundColor: "#5B5FEF",
        borderRadius: 12,
        justifyContent: "center",
        alignItems: "center",
    },

    joinButtonText: {
        color: "#FFFFFF",
        fontSize: 14,
        fontWeight: "700",
    },

    menuItem: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 13,
        borderBottomWidth: 1,
        borderBottomColor: "#F0F1F5",
    },

    menuIconBox: {
        width: 40,
    },

    menuIcon: {
        fontSize: 22,
    },

    menuContent: {
        flex: 1,
    },

    menuTitle: {
        fontSize: 15,
        fontWeight: "700",
        color: "#25283D",
    },

    menuSubtitle: {
        fontSize: 12,
        color: "#85899A",
        marginTop: 3,
    },

    arrow: {
        fontSize: 27,
        color: "#9AA0AE",
        marginLeft: 8,
    },

    footerTitle: {
        textAlign: "center",
        fontSize: 15,
        fontWeight: "700",
        color: "#5B5FEF",
        marginTop: 10,
    },

    footerText: {
        textAlign: "center",
        fontSize: 12,
        color: "#999CAA",
        marginTop: 5,
    },
});