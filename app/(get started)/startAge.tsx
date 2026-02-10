import { useOnboarding } from "@/context/OnboardingContext";
import {
  TouchableOpacity,
  View,
  Text,
  FlatList,
  Dimensions,
} from "react-native";
import * as Haptics from "expo-haptics";
import { useRef, useState } from "react";
import {  useRouter } from "expo-router";

const ITEM_HEIGHT = 100;
const VISIBLE_ITEMS = 5;
const SCREEN_HEIGHT = ITEM_HEIGHT * VISIBLE_ITEMS;
const ages = Array.from({ length: 83 }, (_, i) => i + 18); // 18 → 100



const StartAge = () => {
  const { data, setAge, setProgress } = useOnboarding();
  const lastAge = useRef<number | null>(null);
    const router = useRouter();
  const handleScroll = (event: any) => {
    const index = Math.round(event.nativeEvent.contentOffset.y / ITEM_HEIGHT);

    const age = ages[index];
    if (age && age !== lastAge.current) {
      lastAge.current = age;
      setAge(age);

      // ✅ HAPTIC FEEDBACK
      Haptics.selectionAsync();
    }
  };

  return (
    <View className="bg-black flex-column h-full w-full px-4">
      <View className="pt-4">
        <Text className="text-white text-3xl font-bold">Enter Your Age</Text>
        <Text className="text-gray-300 text-center mt-2">
          Please provide your age to continue.
        </Text>
      </View>

      <View className="flex-col justify-center items-center w-full pt-6">
        {/* Age Input */}
              <View className="w-full mb- 6 h-[610px] overflow-hidden items-center">
                  {/* <View className=" items-center mb-4 h-[310px]  overflow-hidden"> */}
          <Text className="text-white mb-2 text-2xl">Age (years)</Text>

          <View
            style={{
              position: "absolute",
              top: ITEM_HEIGHT * 2,
              height: ITEM_HEIGHT,
              width: "100%",
              borderTopWidth: 1,
              borderBottomWidth: 1,
              borderColor: "#3b82f6",
            }}
          />
          <FlatList
            data={ages}
            keyExtractor={(item) => item.toString()}
            showsVerticalScrollIndicator={false}
            snapToInterval={ITEM_HEIGHT}
            decelerationRate="fast"
            onScroll={handleScroll}
            scrollEventThrottle={16}
            contentContainerStyle={{
              paddingVertical: ITEM_HEIGHT * 1.7,
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
                    fontSize: item === data.age ? 24 : 16,
                    color: item === data.age ? "#3b82f6" : "#999",
                    fontWeight: item === data.age ? "600" : "400",
                  }}
                >
                  {item}
                </Text>
              </View>
            )}
          />
                  </View>
                  
      </View>

      <TouchableOpacity
        onPress={() => {
          if (data.age) {
            console.log("Selected Age:", data.age);
              setProgress(0.7);
              router.navigate("/(get started)/startWeight");
            // Navigate to the next screen
          }
        }}
        className={`rounded-lg px-8 py-3 mb-8 w-full items-center ${
          data.age ? "bg-blue-500" : "bg-gray-600"
        }`}
      >
        <Text className="text-white font-bold">Continue</Text>
      </TouchableOpacity>
    </View>
  );
};

export default StartAge;
