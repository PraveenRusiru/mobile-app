import { useOnboarding } from "@/context/OnboardingContext";
import { useRouter } from "expo-router";
import { useState } from "react";
import { View, Text, TouchableOpacity, FlatList, NativeSyntheticEvent, NativeScrollEvent } from "react-native";
import * as Haptics from "expo-haptics";
import React from "react";

const StartNeck = () => {
  const { data, setNeck, setProgress } = useOnboarding();
  type UnitSystem = "Cms" | "Feet and Inches";
  const router = useRouter();

  const [unit, setUnit] = useState<UnitSystem>("Cms");
  const [neckCm, setNecktCm] = useState<number>();
  const ITEM_HEIGHT = 80;
  // Imperial
  const [inches, setInches] = useState<number | null>(null);
  const cmNeck = Array.from({ length: 25 }, (_, i) => i + 25); // 25–50 cm
    const inchValues = Array.from({ length: 10 }, (_, i) => i + 10); // 10–20 in
    
    const handleCmScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const index = Math.round(event.nativeEvent.contentOffset.y / ITEM_HEIGHT);
    
        if (index < 0 || index >= cmNeck.length) return;
    
        const cm = cmNeck[index];
    
          if (cm !== neckCm) {
            console.log("Cm selected:", cm);
              setNecktCm(cm);
              data.neck = cm;
          Haptics.selectionAsync();
        }
      };
           
      /* ---------------- INCH SCROLL ---------------- */
      const handleInchScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
        const index = Math.round(e.nativeEvent.contentOffset.y / ITEM_HEIGHT);
        if (inchValues[index] === undefined ) return;
          setInches(inchValues[index]);
          data.neck =  inchValues[index] ; // Convert  inches to cm
        Haptics.selectionAsync();
      };
    
      /* ---------------- SAVE HEIGHT ---------------- */
      const saveNeck = () => {
        if (unit === "Cms") {
          setNeck(neckCm!);
        } else {
          const cm = Math.round( inches! * 2.54);
          setNeck(cm);
        }
        setProgress(0.9);
        router.navigate("/(get started)/startWaist");
      };
    
        const renderItem = (item: number, suffix: string) => (
          console.log("Rendering item:", item, "Current neck:", data.neck),
        <View className="h-[80px] justify-center items-center">
              <Text className="text-white text-3xl font-semibold"
              style={{fontSize: item === data.neck ? 26 : 16,
                      color: item === data.neck ? "#3b82f6" : "#888",
                      fontWeight: item === data.neck ? "600" : "400",}}
              >
            {item} {suffix}
          </Text>
        </View>
      );
  return (
    <View className="bg-black flex-column h-full w-full px-4 gap-4">
      <View className="pt-4">
        <Text className="text-white text-3xl font-bold">Enter Your Neck</Text>
        <Text className="text-gray-300 text-center mt-2">
          Please provide your neck measurement to continue.
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
          <Text className="text-black "> In</Text>
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
                      data={cmNeck}
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
                      console.log("Selected Neck:", data.neck, unit);
                        setProgress(0.9);
                        saveNeck();
                      
                      // Navigate to the next screen
                    }
                  }}
                  className={`rounded-lg px-8 py-3 mb-8 w-full items-center ${
                    data.neck ? "bg-blue-500" : "bg-gray-600"
                  }`}
                >
                  <Text className="text-white font-bold">Continue</Text>
                </TouchableOpacity>
    </View>
  );
};
export default StartNeck;
