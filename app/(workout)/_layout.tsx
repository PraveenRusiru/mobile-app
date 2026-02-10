import { Stack } from 'expo-router';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';

export default function WorkoutLayout() {
  const router = useRouter();

  return (
    <Stack
      screenOptions={{
        headerStyle: {
              backgroundColor: '#000', // Matches your dark theme               
              },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerShadowVisible: false, // Removes the line under the header
        // This defines the custom back button for ALL screens in this folder
        headerLeft: () => (
          <TouchableOpacity 
            onPress={() => router.back()} 
            style={styles.backButton}
          >
            <Ionicons name="arrow-back-circle-outline" size={24} color="white" />
          </TouchableOpacity>
        ),
      }}
    >
      {/* index is your LibraryScreen */}
      <Stack.Screen 
        name="index" 
        options={{ 
          title: 'My Programs',
          headerLeft: () => (
          <TouchableOpacity 
            onPress={() => router.back()} 
            style={styles.backButton}
          >
            <Ionicons name="arrow-back-circle-outline" size={24} color="white" />
          </TouchableOpacity>
        ),
        }} 
      />
      
      {/* create is your CreateProgramScreen */}
      <Stack.Screen 
        name="create" 
        options={{ 
          title: 'New Program',
          presentation: 'modal', // Slides up from the bottom
          headerLeft: () => (
          <TouchableOpacity 
            onPress={() => router.back()} 
            style={styles.backButton}
          >
            <Ionicons name="arrow-back-circle-outline" size={24} color="white" />
          </TouchableOpacity>
        ),
        }} 
      />

      <Stack.Screen 
        name="routine_data" 
        options={{ 
          title: 'Add Exercises',
          headerLeft: () => (
          <TouchableOpacity 
            onPress={() => router.back()} 
            style={styles.backButton}
          >
            <Ionicons name="arrow-back-circle-outline" size={24} color="white" />
          </TouchableOpacity>
        ),
        }} 
      />

      {/* addProgramme is your Exercise Selection UI */}
      <Stack.Screen 
        name="addProgramme" 
        options={{ 
          title: 'Add Exercises',
          headerLeft: () => (
          <TouchableOpacity 
            onPress={() => router.back()} 
            style={styles.backButton}
          >
            <Ionicons name="arrow-back-circle-outline" size={24} color="white" />
          </TouchableOpacity>
        ),
        }} 
      />
      <Stack.Screen 
        name="selectExercises" 
        options={{ 
          title: 'Add Exercises',
          headerLeft: () => (
          <TouchableOpacity 
            onPress={() => router.back()} 
            style={styles.backButton}
          >
            <Ionicons name="arrow-back-circle-outline" size={24} color="white" />
          </TouchableOpacity>
        ),
        }} 
      />
    </Stack>
  );
}

const styles = StyleSheet.create({
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
    paddingRight: 15, // Increases hit area for better UX
  },
});