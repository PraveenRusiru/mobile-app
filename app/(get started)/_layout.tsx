import { Stack, useRouter, useSegments } from "expo-router";
import { Text, View, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { OnboardingProvider, useOnboarding } from "@/context/OnboardingContext";

/* ---------------- Progress Header ---------------- */
const ProgressHeader = () => {
  const { progress } = useOnboarding();

  return (
    <View className="flex-1 justify-center items-center px-4">
      <View className="w-3/4 h-1 bg-gray-500 rounded">
        <View
          className="h-full bg-blue-500 rounded"
          style={{ width: `${progress * 100}%` }}
        />
      </View>
    </View>
  );
};

/* ---------------- Back Button ---------------- */

const BackButton = () => {
  const router = useRouter();
  const { progress, setProgress } = useOnboarding();
  const segments = useSegments();

  const handleBackPress = () => {
    
    const newProgress = Math.max(0, progress - 0.2);
    setProgress(newProgress);
    router.back();
  };

  return (
    <TouchableOpacity
      onPress={handleBackPress}
      className="justify-center w-12 h-12 ms-4"
    >
      <MaterialIcons name="arrow-back" size={24} color="#fff" />
    </TouchableOpacity>
  );
};

/* ---------------- Layout ---------------- */

const GetStartedLayout = () => {
  return (
    <OnboardingProvider>
      <Stack
        screenOptions={{
          header: () => (
            <View className="flex-row items-center h-10 bg-black">
              <BackButton />
              <ProgressHeader />
            </View>
          ),
        }}
      >
        <Stack.Screen name="startGender" />
        <Stack.Screen name="goal" />
        <Stack.Screen name="heightWeight" />
        <Stack.Screen name="signup" />
      </Stack>
    </OnboardingProvider>
  );
};

export default GetStartedLayout;