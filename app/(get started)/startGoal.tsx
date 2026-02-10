import { useOnboarding } from "@/context/OnboardingContext";
import { useState } from "react";
import { View, Text, Pressable, Image, TouchableOpacity, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import React from "react";

const StartGoal = () => {
    const { data, setGoal, setProgress } = useOnboarding();
    const router = useRouter();
    

    const goals = [
        { id: "muscle", label: "Build Muscle", image: require("@/assets/muscles rounded.png") },
        { id: "strength", label: "Gain Strength", image: require("@/assets/strength rounded.png") },
        { id: "loseFat", label: "Lose Fat", image: require("@/assets/fat loss rounded.png") },
        { id: "fundementals", label: "Fundementals", image: require("@/assets/fundementals rounded.png") },
        { id: "conditioning", label: "Conditioning", image: require("@/assets/conditioning rounded.png") },
        { id: "sport", label: "Sports", image: require("@/assets/sports rounded.png") },
    ];

    const handleGoalSelect = (goalId: string) => {
        setGoal(goalId);
    };

    const handleContinue = () => {
        if (data.goal) {
            router.navigate("/(get started)/startAge");
            setProgress(0.6);
            console.log("Selected Goal:", data.goal,"gender:",data.gender);
        }
    };
    
    return (
        <View className="bg-black flex-column h-full w-full px-4">
            <View className="pt-4">
                <Text className="text-white text-center text-3xl font-bold">
                    What is Your Primary Fitness Goal?
                </Text>
                <Text className="text-gray-300 text-center mt-2">
                    Choose one that best describes your main objective.
                </Text>
            </View>

            <View className="flex-1 justify-center items-center w-full">
                <View className="w-full">
                    {/* Row 1 */}
                    <View className="flex-row justify-around mb-6">
                        {goals.slice(0, 2).map((goal) => (
                            <Pressable
                                key={goal.id}
                                onPress={() => handleGoalSelect(goal.id)}
                                className="items-center"
                            >
                                <Image
                                    source={goal.image}
                                    style={{
                                        width: data.goal === goal.id ? 130 : 110,
                                        height: data.goal === goal.id ? 130 : 110,
                                    }}
                                    resizeMode="contain"
                                />
                                <Text className={`text-center mt-2 ${data.goal === goal.id ? 'text-blue-500 font-bold' : 'text-white'}`}>
                                    {goal.label}
                                </Text>
                            </Pressable>
                        ))}
                    </View>

                    {/* Row 2 */}
                    <View className="flex-row justify-around mb-6">
                        {goals.slice(2, 4).map((goal) => (
                            <Pressable
                                key={goal.id}
                                onPress={() => handleGoalSelect(goal.id)}
                                className="items-center"
                            >
                                <Image
                                    source={goal.image}
                                    style={{
                                        width: data.goal === goal.id ? 130 : 110,
                                        height: data.goal === goal.id ? 130 : 110,
                                    }}
                                    resizeMode="contain"
                                />
                                <Text className={`text-center mt-2 ${data.goal === goal.id ? 'text-blue-500 font-bold' : 'text-white'}`}>
                                    {goal.label}
                                </Text>
                            </Pressable>
                        ))}
                    </View>

                    {/* Row 3 */}
                    <View className="flex-row justify-around mb-6">
                        {goals.slice(4, 6).map((goal) => (
                            <Pressable
                                key={goal.id}
                                onPress={() => handleGoalSelect(goal.id)}
                                className="items-center"
                            >
                                <Image
                                    source={goal.image}
                                    style={{
                                        width: data.goal === goal.id ? 130 : 110,
                                        height: data.goal === goal.id ? 130 : 110,
                                    }}
                                    resizeMode="contain"
                                />
                                <Text className={`text-center mt-2 ${data.goal === goal.id ? 'text-blue-500 font-bold' : 'text-white'}`}>
                                    {goal.label}
                                </Text>
                            </Pressable>
                        ))}
                    </View>
                </View>
            </View>

            <TouchableOpacity
                onPress={handleContinue}
                disabled={!data.goal}
                className={`rounded-lg px-8 py-3 mb-8 w-full items-center ${
                    data.goal ? "bg-blue-500" : "bg-gray-600"
                }`}
            >
                <Text className="text-white text-lg font-semibold">Continue</Text>
            </TouchableOpacity>
        </View>
    );
};

export default StartGoal;