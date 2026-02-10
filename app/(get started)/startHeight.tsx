import { useOnboarding } from "@/context/OnboardingContext";
import { useRouter } from "expo-router";
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
import React from "react";

const startHeight = () => {
  const { data, setHeight, setProgress } = useOnboarding();
  type UnitSystem = "Cms" | "Feet and Inches";
  const router = useRouter();
  
  const [unit, setUnit] = useState<UnitSystem>("Cms");
  const [heightCm, setHeightCm] = useState<number>();
  const ITEM_HEIGHT = 80;
  // Imperial
  const [feet, setFeet] = useState<number | null>(null);
  const [inches, setInches] = useState<number | null>(null);
    const cmHeights = Array.from({ length: 121 }, (_, i) => i + 120); // 120–240 cm
    
    const feetValues = Array.from({ length: 5 }, (_, i) => i + 4); // 4–8 ft
      const inchValues = Array.from({ length: 12 }, (_, i) => i); // 0–11 in
          

    
  const handleCmScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const index = Math.round(event.nativeEvent.contentOffset.y / ITEM_HEIGHT);

    if (index < 0 || index >= cmHeights.length) return;

    const cm = cmHeights[index];

      if (cm !== heightCm) {
        console.log("Cm selected:", cm);
          setHeightCm(cm);
          data.height = cm;
      Haptics.selectionAsync();
    }
  };
    /* ---------------- FEET SCROLL ---------------- */
  const handleFeetScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const index = Math.round(e.nativeEvent.contentOffset.y / ITEM_HEIGHT);
    if (!feetValues[index]) return;
    console.log("Feet selected:", feetValues[index]);
      setFeet(feetValues[index]);
      data.height = feetValues[index]! * 30.48; // Convert feet to cm
    Haptics.selectionAsync();
  };

  /* ---------------- INCH SCROLL ---------------- */
  const handleInchScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const index = Math.round(e.nativeEvent.contentOffset.y / ITEM_HEIGHT);
    if (inchValues[index] === undefined || feet === null) return;
      console.log("Inches selected:", inchValues[index], "with feet:", feet);
      console.log("Total height in cm:", (feet! * 12 + inchValues[index]) * 2.54);
      setInches(inchValues[index]);
      data.height = (feet! * 12 + inchValues[index]) * 2.54; // Convert feet and inches to cm
    Haptics.selectionAsync();
  };

  /* ---------------- SAVE HEIGHT ---------------- */
  const saveHeight = () => {
    if (unit === "Cms") {
      setHeight(heightCm!);
    } else {
      const cm = Math.round((feet! * 12 + inches!) * 2.54);
      setHeight(cm);
    }
    setProgress(0.9);
    router.navigate("/(get started)/startNeck");
  };

    const renderItem = (item: number, suffix: string) => (
      console.log("Rendering item:", item, "Current height:", data.height),
    <View className="h-[80px] justify-center items-center">
          <Text className="text-white text-3xl font-semibold"
          style={{fontSize: item === data.height ? 26 : 16,
                  color: item === data.height ? "#3b82f6" : "#888",
                  fontWeight: item === data.height ? "600" : "400",}}
          >
        {item} {suffix}
      </Text>
    </View>
  );
  return (
    <View className="bg-black flex-column h-full w-full px-4 gap-4">
      <View className="pt-4">
        <Text className="text-white text-3xl font-bold">Enter Your Height</Text>
        <Text className="text-gray-300 text-center mt-2">
          Please provide your height to continue.
        </Text>
          </View>
          
      <View className="flex-row justify-between items-center w-full px-5 bg-gray-300 h-9 rounded-lg">
        <TouchableOpacity
          className={`flex-1 items-center rounded-lg px-2 py-1 ${
            unit === "Cms" ? "bg-blue-500" : "bg-gray-300"
          }`}
            onPress={() => {
            setUnit("Cms");
          }}
        >
          <Text className="text-black "> Cms</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className={`flex-1 items-center rounded-lg px-2 py-1 ${
            unit === "Feet and Inches" ? "bg-blue-500" : "bg-gray-300"
          }`}
          onPress={() => {
            setUnit("Feet and Inches");
          }}
        >
          <Text className="text-black "> ft/In</Text>
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
        {unit === "Cms" ? (
          <FlatList
            data={cmHeights}
            keyExtractor={(item) => item.toString()}
            showsVerticalScrollIndicator={false}
            snapToInterval={ITEM_HEIGHT}
            onScroll={handleCmScroll}
            getItemLayout={(_, index) => ({
              length: ITEM_HEIGHT,
              offset: ITEM_HEIGHT * index,
              index,
            })}
            contentContainerStyle={{ paddingVertical: 160 }}
            renderItem={({ item }) => renderItem(item, "cm")}
          />
        ) : (
          <View className="flex-row justify-center gap-10">
            {/* FEET */}
            <FlatList
              data={feetValues}
              keyExtractor={(item) => item.toString()}
              showsVerticalScrollIndicator={false}
              snapToInterval={ITEM_HEIGHT}
              onScroll={handleFeetScroll}
              getItemLayout={(_, index) => ({
                length: ITEM_HEIGHT,
                offset: ITEM_HEIGHT * index,
                index,
              })}
              contentContainerStyle={{ paddingVertical: 160 }}
              renderItem={({ item }) => renderItem(item, "ft")}
            />

            {/* INCHES */}
            <FlatList
              data={inchValues}
              keyExtractor={(item) => item.toString()}
              showsVerticalScrollIndicator={false}
              snapToInterval={ITEM_HEIGHT}
              onScroll={handleInchScroll}
              getItemLayout={(_, index) => ({
                length: ITEM_HEIGHT,
                offset: ITEM_HEIGHT * index,
                index,
              })}
              contentContainerStyle={{ paddingVertical: 160 }}
              renderItem={({ item }) => renderItem(item, "in")}
            />
          </View>
        )}
          
        
      </View>
      <TouchableOpacity
        onPress={() => {
          if (data.height) {
            console.log("Selected Height:", data.height, unit);
              setProgress(0.9);
              saveHeight();
            
            // Navigate to the next screen
          }
        }}
        className={`rounded-lg px-8 py-3 mb-8 w-full items-center ${
          data.height ? "bg-blue-500" : "bg-gray-600"
        }`}
      >
        <Text className="text-white font-bold">Continue</Text>
      </TouchableOpacity>
    </View>
  );
};
export default startHeight;
