import { Slot } from "expo-router";
import { View } from "react-native";
import { SafeAreaFrameContext, useSafeAreaInsets } from "react-native-safe-area-context";

const RootLayout = () => {
    const insets = useSafeAreaInsets();
    console.log(insets)

    return (
        <SafeAreaFrameContext value={null}>
            <View className="flex-1 bg-black" style={{ paddingTop: insets.top, paddingBottom: insets.bottom, paddingLeft: insets.left, paddingRight: insets.right }}>
            <Slot />
        </View>
        </SafeAreaFrameContext>
    )
}
export default RootLayout;