import React from "react";
import { Stack } from "expo-router";

export default function RootLayout() {
    return (
        <Stack
            screenOptions={{
                headerShown: false,
            }}
        >
            {/* Starting Screens */}
            <Stack.Screen name="index" />
            <Stack.Screen name="login" />
            <Stack.Screen name="role-selection" />
            <Stack.Screen name="kyc" />

            {/* Provider Flow */}
            <Stack.Screen name="provider-home" />
            <Stack.Screen name="add-resource" />

            {/* Receiver Flow */}
            <Stack.Screen name="receiver-home" />

            {/* Resource & Owner */}
            <Stack.Screen name="resource-details" />
            <Stack.Screen name="owner-profile" />
            <Stack.Screen name="owner-selection" />

            {/* Rental Request */}
            <Stack.Screen name="rental-request" />
            <Stack.Screen name="request-status" />

            {/* Guarantor */}
            <Stack.Screen name="guarantor" />

            {/* Agreement & Payment */}
            <Stack.Screen name="digital-agreement" />
            <Stack.Screen name="payment" />

            {/* Pickup & Verification */}
            <Stack.Screen name="qr-pickup" />
            <Stack.Screen name="camera-verification" />

            {/* Rental / Return */}
            <Stack.Screen name="return-check" />
            <Stack.Screen name="qr-return" />

            {/* Rental Passport */}
            <Stack.Screen name="rental-passport" />

            {/* Exchange */}
            <Stack.Screen name="exchange" />
            <Stack.Screen name="exchange-details" />

            {/* Community Features */}
            <Stack.Screen name="college-community" />
            <Stack.Screen name="my-circle" />

            {/* Other Features */}
            <Stack.Screen name="ai-assistant" />
            <Stack.Screen name="notifications" />
            <Stack.Screen name="wallet" />
            <Stack.Screen name="sos" />
        </Stack>
    );
}