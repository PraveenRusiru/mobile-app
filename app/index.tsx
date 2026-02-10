
import { View,Image ,Text, Pressable, TargetedEvent} from "react-native";
import "../global.css"
import { Redirect, useRouter } from "expo-router";

// import image from "../assets/get started image.jpeg"

const Index = () => { 
    const router  =  useRouter();
    return (
        <View className="bg-black flex-column justify-center items-center h-full w-full">
            <View className="mb-4">
                <Image 
                    source={require("../assets/get started image.jpeg")}
                    style={{ width: 550, height: 300, borderRadius: 10, }}
                    resizeMode="contain"
                />
            </View>  
            <View className="mt-4">
                <Text className="text-white text-3xl font-bold">Welcome to Our App!</Text>
            </View>
            <View className="mt-2 px-8">
                <Text className="text-white text-center text-lg">
                    Your gateway to seamless experiences. Let's get started!
                </Text>
            </View>
            <View className="mt-8 text-center">
                <Pressable className="bg-white p-3 rounded-xl" onPress={()=>{router.navigate("/(get started)/startGender")}}><Text className="text-black text-xl">Get Started</Text></Pressable>
            </View>
            <View className="mt-2">
                <Pressable className=" p-4 rounded-xl " onPress={()=>{router.navigate("/(get started)/startSignin")}}><Text className="text-gray-300 text-xl">Already Have An Account</Text></Pressable>
            </View>
        </View>
    )
}

export default Index;