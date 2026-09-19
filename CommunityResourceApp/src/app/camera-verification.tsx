import React, { useRef, useState } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Image,
    Alert,
} from "react-native";
import { CameraView, CameraType, useCameraPermissions } from "expo-camera";
import { router } from "expo-router";

const steps = [
    { key: "front", title: "Front View", instruction: "Show the front side of the item" },
    { key: "back", title: "Back View", instruction: "Show the back side of the item" },
    { key: "left", title: "Left View", instruction: "Show the left side of the item" },
    { key: "right", title: "Right View", instruction: "Show the right side of the item" },
    { key: "top", title: "Top View", instruction: "Show the top side of the item" },
    { key: "bottom", title: "Bottom View", instruction: "Show the bottom side of the item" },
    { key: "screen", title: "Screen / Main Area", instruction: "Show the screen or main visible area" },
    { key: "accessories", title: "Accessories", instruction: "Show charger and other accessories" },
];

export default function CameraVerification() {
    const [permission, requestPermission] = useCameraPermissions();

    const cameraRef = useRef<CameraView>(null);

    const [currentStep, setCurrentStep] = useState(0);
    const [cameraFacing, setCameraFacing] =
        useState<CameraType>("back");

    const [photos, setPhotos] = useState<Record<string, string>>({});

    if (!permission) {
        return (
            <View style={styles.center}>
                <Text>Loading camera...</Text>
            </View>
        );
    }

    if (!permission.granted) {
        return (
            <View style={styles.center}>
                <Text style={styles.permissionTitle}>
                    Camera Permission Required
                </Text>

                <Text style={styles.permissionText}>
                    Camera is required to verify the item's condition.
                </Text>

                <TouchableOpacity
                    style={styles.permissionButton}
                    onPress={requestPermission}
                >
                    <Text style={styles.buttonText}>
                        Allow Camera
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }

    const step = steps[currentStep];
    const existingPhoto = photos[step.key];

    const takePhoto = async () => {
        if (!cameraRef.current) return;

        try {
            const photo = await cameraRef.current.takePictureAsync();

            if (!photo?.uri) {
                Alert.alert("Error", "Photo could not be captured.");
                return;
            }

            setPhotos((previous) => ({
                ...previous,
                [step.key]: photo.uri,
            }));
        } catch (error) {
            console.log("Camera error:", error);
            Alert.alert("Error", "Unable to take photo.");
        }
    };

    const retakePhoto = () => {
        setPhotos((previous) => {
            const updated = { ...previous };
            delete updated[step.key];
            return updated;
        });
    };

    const nextStep = () => {
        if (!photos[step.key]) {
            Alert.alert(
                "Photo Required",
                `Please capture the ${step.title} first.`
            );
            return;
        }

        if (currentStep < steps.length - 1) {
            setCurrentStep(currentStep + 1);
        } else {
            finishVerification();
        }
    };

    const finishVerification = () => {
       
                        router.replace("/rental-started" as any);
                    
       
    };

    return (
        <View style={styles.container}>

            {/* CAMERA */}

            {!existingPhoto ? (
                <CameraView
                    ref={cameraRef}
                    style={styles.camera}
                    facing={cameraFacing}
                >
                    <View style={styles.cameraHeader}>
                        <Text style={styles.headerTitle}>
                            AI Item Verification
                        </Text>

                        <Text style={styles.stepText}>
                            Step {currentStep + 1} / {steps.length}
                        </Text>
                    </View>

                    {/* GUIDE BOX */}

                    <View style={styles.guideBox}>
                        <Text style={styles.guideTitle}>
                            {step.title}
                        </Text>

                        <Text style={styles.guideInstruction}>
                            {step.instruction}
                        </Text>
                    </View>

                    {/* CAMERA BUTTON */}

                    <View style={styles.cameraBottom}>

                        <TouchableOpacity
                            style={styles.captureButton}
                            onPress={takePhoto}
                        >
                            <View style={styles.captureInner} />
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.flipButton}
                            onPress={() =>
                                setCameraFacing((current) =>
                                    current === "back" ? "front" : "back"
                                )
                            }
                        >
                            <Text style={styles.flipText}>
                                🔄
                            </Text>
                        </TouchableOpacity>

                    </View>
                </CameraView>
            ) : (

                /* PHOTO PREVIEW */

                <View style={styles.previewContainer}>

                    <Image
                        source={{ uri: existingPhoto }}
                        style={styles.previewImage}
                    />

                    <View style={styles.previewOverlay}>

                        <Text style={styles.previewTitle}>
                            {step.title}
                        </Text>

                        <Text style={styles.previewSuccess}>
                            ✓ Photo Captured
                        </Text>

                        <View style={styles.previewButtons}>

                            <TouchableOpacity
                                style={styles.retakeButton}
                                onPress={retakePhoto}
                            >
                                <Text style={styles.retakeText}>
                                    Retake
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={styles.nextButton}
                                onPress={nextStep}
                            >
                                <Text style={styles.buttonText}>
                                    {currentStep === steps.length - 1
                                        ? "Finish"
                                        : "Next →"}
                                </Text>
                            </TouchableOpacity>

                        </View>

                    </View>
                </View>
            )}

            {/* PROGRESS */}

            <View style={styles.progressContainer}>

                {steps.map((item, index) => (
                    <View
                        key={item.key}
                        style={[
                            styles.progressDot,
                            index === currentStep &&
                            styles.activeDot,
                            photos[item.key] &&
                            styles.completedDot,
                        ]}
                    />
                ))}

            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#000",
    },

    camera: {
        flex: 1,
    },

    cameraHeader: {
        position: "absolute",
        top: 55,
        left: 20,
        right: 20,
        alignItems: "center",
    },

    headerTitle: {
        color: "#fff",
        fontSize: 22,
        fontWeight: "700",
    },

    stepText: {
        color: "#fff",
        fontSize: 15,
        marginTop: 6,
    },

    guideBox: {
        position: "absolute",
        top: 150,
        left: 25,
        right: 25,
        borderWidth: 2,
        borderColor: "#fff",
        borderRadius: 15,
        padding: 18,
        alignItems: "center",
    },

    guideTitle: {
        color: "#fff",
        fontSize: 22,
        fontWeight: "700",
    },

    guideInstruction: {
        color: "#fff",
        fontSize: 14,
        marginTop: 6,
        textAlign: "center",
    },

    cameraBottom: {
        position: "absolute",
        bottom: 60,
        left: 0,
        right: 0,
        alignItems: "center",
    },

    captureButton: {
        width: 75,
        height: 75,
        borderRadius: 40,
        backgroundColor: "#fff",
        justifyContent: "center",
        alignItems: "center",
    },

    captureInner: {
        width: 62,
        height: 62,
        borderRadius: 35,
        borderWidth: 4,
        borderColor: "#555",
    },

    flipButton: {
        position: "absolute",
        right: 35,
        top: 20,
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: "rgba(0,0,0,0.5)",
        justifyContent: "center",
        alignItems: "center",
    },

    flipText: {
        fontSize: 25,
    },

    previewContainer: {
        flex: 1,
        backgroundColor: "#000",
    },

    previewImage: {
        width: "100%",
        height: "100%",
        resizeMode: "contain",
    },

    previewOverlay: {
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 70,
        alignItems: "center",
    },

    previewTitle: {
        color: "#fff",
        fontSize: 22,
        fontWeight: "700",
    },

    previewSuccess: {
        color: "#fff",
        fontSize: 16,
        marginTop: 8,
    },

    previewButtons: {
        flexDirection: "row",
        marginTop: 20,
        gap: 15,
    },

    retakeButton: {
        backgroundColor: "#fff",
        paddingVertical: 14,
        paddingHorizontal: 25,
        borderRadius: 12,
    },

    retakeText: {
        color: "#000",
        fontWeight: "700",
        fontSize: 16,
    },

    nextButton: {
        backgroundColor: "#5B5FEF",
        paddingVertical: 14,
        paddingHorizontal: 30,
        borderRadius: 12,
    },

    buttonText: {
        color: "#fff",
        fontWeight: "700",
        fontSize: 16,
    },

    progressContainer: {
        position: "absolute",
        bottom: 20,
        left: 20,
        right: 20,
        flexDirection: "row",
        justifyContent: "center",
        gap: 7,
    },

    progressDot: {
        width: 9,
        height: 9,
        borderRadius: 5,
        backgroundColor: "#777",
    },

    activeDot: {
        width: 25,
        backgroundColor: "#fff",
    },

    completedDot: {
        backgroundColor: "#5B5FEF",
    },

    center: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 25,
    },

    permissionTitle: {
        fontSize: 22,
        fontWeight: "700",
        marginBottom: 10,
    },

    permissionText: {
        textAlign: "center",
        marginBottom: 20,
    },

    permissionButton: {
        backgroundColor: "#5B5FEF",
        paddingVertical: 14,
        paddingHorizontal: 25,
        borderRadius: 12,
    },
});