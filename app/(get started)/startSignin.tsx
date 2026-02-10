import { View, Text, Pressable } from "react-native";
import {
  GoogleSignin,
  GoogleSigninButton,
  isErrorWithCode,
  isSuccessResponse,
  statusCodes,
  User,
} from "@react-native-google-signin/google-signin";
import { GoogleAuthProvider, getAuth, signInWithCredential } from '@react-native-firebase/auth';
import { useState } from "react";
import{CLIENT_ID} from "@env"
import { useRouter } from "expo-router";


console.log("CLIENT ID in signin:", CLIENT_ID);
GoogleSignin.configure({
  webClientId: CLIENT_ID,
  offlineAccess:true
});


const StartSignin = () => {
  const [userInfo, setUserInfo] = useState<User | null>(null);
  const router = useRouter();
  router.navigate("../(home)");
  
  const signIn = async () => {
    // Check if your device supports Google Play
    
  await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
  // Get the users ID token
  const signInResult: any = await GoogleSignin.signIn();

    console.log("SIGN IN RESULT:", signInResult);
  // Try the new style of google-sign in result, from v13+ of that module
    let idToken = signInResult.data?.idToken;
    console.log("ID TOKEN:", idToken);
    console.log("USER INFO:", signInResult.user);
    setUserInfo(signInResult.user);
  if (!idToken) {
    // if you are using older versions of google-signin, try old style result
    idToken = signInResult.idToken;
  }
  if (!idToken) {
    throw new Error('No ID token found');
  }

  // Create a Google credential with the token
  const googleCredential = GoogleAuthProvider.credential(signInResult.data.idToken);

  // Sign-in the user with the credential
  return signInWithCredential(getAuth(), googleCredential);
  }
  
  const signOut = async () => {
    try {
      await GoogleSignin.signOut();
      setUserInfo(null); // Remove user info
      console.log("User signed out successfully");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View className="bg-black flex-column h-full w-full px-4 gap-4 justify-center items-center">
      <Text className="text-white text-2xl font-bold mb-4">Sign in with Google</Text>
      <Text className="text-white text-center mb-4">
        Sign in to continue to Workout Scheduler
      </Text>
      <GoogleSigninButton
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
        onPress={signIn}
        // disabled={isInProgress}
      />
      <Pressable className="px-4 py-4" onPress={signOut}>
        <Text className="text-blue-500 text-lg  underline">Sign out</Text>
      </Pressable>
    </View>
  );
};

export default StartSignin;