import { useOnboarding } from "@/context/OnboardingContext";
import { useRef, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  NativeScrollEvent,
  NativeSyntheticEvent,
  FlatList,
} from "react-native";
import * as Haptics from "expo-haptics";
import { useRouter } from "expo-router";
import React from "react";

const StartWeight = () => {
  type UnitSystem = "metric" | "imperial";
  const router = useRouter();
  const kgWeights = Array.from({ length: 151 }, (_, i) => i + 30); // 30–180 kg
  const lbWeights = Array.from({ length: 331 }, (_, i) => i + 66); // 66–396 lb
  const ITEM_HEIGHT = 80;
  const lastValue = useRef<number | null>(null);
  const [unit, setUnit] = useState<UnitSystem>("metric");
  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const index = Math.round(event.nativeEvent.contentOffset.y / ITEM_HEIGHT);

    const values = unit === "metric" ? kgWeights : lbWeights;
    if (index < 0 || index >= values.length) return;

    const selected = values[index];

    if (selected !== lastValue.current) {
      lastValue.current = selected;
      setWeight(selected);
      Haptics.selectionAsync();
    }
  };
  const { data, setWeight, setProgress } = useOnboarding();

  const showImperialSystem = (event: any) => {
    // Logic to switch to Imperial System
    console.log("Switched to Imperial System");
  };
  const showMetricSystem = (event: any) => {
    // Logic to switch to Metric System
    console.log("Switched to Metric System");
  };

  return (
    <View className="bg-black flex-column h-full w-full px-4 gap-4">
      <View className="pt-4">
        <Text className="text-white text-3xl font-bold">Enter Your Weight</Text>
        <Text className="text-gray-300 text-center mt-2">
          Please provide your weight to continue.
        </Text>
      </View>
      <View className="flex-row justify-between items-center w-full px-5 bg-gray-300 h-9 rounded-lg">
        <TouchableOpacity
          className={`flex-1 items-center rounded-lg px-2 py-1 ${
            unit === "metric" ? "bg-blue-500" : "bg-gray-300"
          }`}
          onPress={() => {
            setUnit("metric");
          }}
        >
          <Text className="text-black "> Metric System (Kg)</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className={`flex-1 items-center rounded-lg px-2 py-1 ${
            unit === "imperial" ? "bg-blue-500" : "bg-gray-300"
          }`}
          onPress={() => {
            setUnit("imperial");
          }}
        >
          <Text className="text-black "> Imperial System (lb)</Text>
        </TouchableOpacity>
      </View>
      <View className="relative h-[550px] overflow-hidden">
        {/* Center indicator */}
        <View
          style={{
            position: "absolute",
            top: ITEM_HEIGHT * 2,
            height: ITEM_HEIGHT,
            width: "100%",
            borderTopWidth: 1,
            borderBottomWidth: 1,
            borderColor: "#3b82f6",
            zIndex: 10,
          }}
        />

        <FlatList
          data={unit === "metric" ? kgWeights : lbWeights}
          keyExtractor={(item) => item.toString()}
          showsVerticalScrollIndicator={false}
          snapToInterval={ITEM_HEIGHT}
          decelerationRate="fast"
          onScroll={handleScroll}
          scrollEventThrottle={16}
          contentContainerStyle={{
            paddingVertical: ITEM_HEIGHT * 2,
          }}
          renderItem={({ item }) => (
            <View
              style={{
                height: ITEM_HEIGHT,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontSize: item === data.weight ? 26 : 16,
                  color: item === data.weight ? "#3b82f6" : "#888",
                  fontWeight: item === data.weight ? "600" : "400",
                }}
              >
                {item} {unit === "metric" ? "kg" : "lb"}
              </Text>
            </View>
          )}
        />
      </View>
      <TouchableOpacity
        onPress={() => {
          if (data.weight) {
            console.log("Selected Weight:", data.weight+(unit === "metric" ? " kg" : " lb"));
            setProgress(0.8);
              router.navigate("/(get started)/startHeight");
            // Navigate to the next screen
          }
        }}
        className={`rounded-lg px-8 py-3 mb-8 w-full items-center ${
          data.weight ? "bg-blue-500" : "bg-gray-600"
        }`}
      >
        <Text className="text-white font-bold">Continue</Text>
      </TouchableOpacity>
    </View>
  );
};

export default StartWeight;
