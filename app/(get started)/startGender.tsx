import { useOnboarding } from "@/context/OnboardingContext";
import { useRouter } from "expo-router";
import { Image, Pressable, Text, TouchableOpacity, View } from "react-native";

const startGender = () => {
  const router = useRouter();
  //   const [selectedGender, setSelectedGender] = useState("");
  const { data, setGender, setProgress } = useOnboarding();

  return (
    <View className="bg-black flex-column h-full w-full px-4">
      <View className="pt-4">
        <Text className="text-white text-3xl font-bold">
          Select Your Gender
        </Text>
      </View>

      <View className="flex-1 justify-center items-center w-full">
        <View className="flex-row justify-center items-end gap-4">
          <Pressable onPress={() => setGender("male")} className="items-center">
            <Image
              source={require("@/assets/male character.png")}
              style={{
                width: data.gender === "male" ? 160 : 140,
                height: data.gender === "male" ? 360 : 300,
              }}
              resizeMode="contain"
            />
          </Pressable>
          <Pressable
            onPress={() => setGender("female")}
            className="items-center"
          >
            <Image
              source={require("@/assets/female character.png")}
              style={{
                width: data.gender === "female" ? 160 : 140,
                height: data.gender === "female" ? 360 : 300,
              }}
              resizeMode="contain"
            />
          </Pressable>
        </View>
      </View>

      <TouchableOpacity
        onPress={() => {
          if (data.gender) {
            setProgress(0.4);
            router.navigate("/(get started)/startGoal");
          }
        }}
        className={`rounded-lg px-8 py-3 mb-8 w-full items-center ${
          data.gender ? "bg-blue-500" : "bg-gray-600"
        }`}
      >
        <Text className="text-white text-lg font-semibold">Continue</Text>
      </TouchableOpacity>
    </View>
  );
};

export default startGender;
