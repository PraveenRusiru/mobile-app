import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';

export default function LibraryScreen() {
  const router = useRouter();
  const params = useLocalSearchParams(); // Used to catch data passed back

  const [programs, setPrograms] = useState([
    { id: '1', title: 'Favorites', count: '0 workouts', icon: 'bookmark-outline' },
    { id: '2', title: 'My Program #0', count: '1 workout', icon: 'weight-lifter' },
  ]);

  useEffect(() => {
    if (params.newProgramName) {
      const newEntry = {
        id: Date.now().toString(),
        title: params.newProgramName as string,
        count: '0 workouts',
        icon: 'weight-lifter',
      };
      setPrograms((prev) => [newEntry, ...prev]);
    }
  }, [params.newProgramName]);

  return (
    <View style={styles.screenBody}>
      <TouchableOpacity 
        style={styles.programRow} 
        onPress={() => router.push('/(workout)/create')}
      >
        <View style={styles.actionIcon}>
          <MaterialCommunityIcons name="plus" size={24} color="white" />
        </View>
        <Text style={styles.programTitle}>Add new program</Text>
      </TouchableOpacity>

      <FlatList
        data={programs}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.programRow} 
            onPress={() => router.push({
              pathname: "/(workout)/addProgramme",
              params: { id: item.id, name: item.title }
            })}
          >
            <View style={styles.itemIcon}>
              <MaterialCommunityIcons name={item.icon} size={24} color="white" />
            </View>
            <View style={styles.programText}>
              <Text style={styles.programTitle}>{item.title}</Text>
              <Text style={styles.programSub}>{item.count}</Text>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}
// ... copy your styles here
// import React, { useState } from 'react';
// import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput, SafeAreaView } from 'react-native';
// import { createStackNavigator } from '@react-navigation/stack';
// import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
// import { useRouter } from 'expo-router';

// const Stack = createStackNavigator();

// // --- 1. The Main Library Screen ---
// const LibraryScreen = ({ navigation, route }) => {
//     const router = useRouter();
//   // Mock initial data
//   const [programs, setPrograms] = useState([
//     { id: '1', title: 'Favorites', count: '0 workouts', icon: 'bookmark-outline' },
//     { id: '2', title: 'My Program #0', count: '1 workout', icon: 'weight-lifter' },
//   ]);

//   // Effect to catch new programs from the "Create" screen
//   React.useEffect(() => {
//     if (route.params?.newProgramName) {
//       const newEntry = {
//         id: Date.now().toString(),
//         title: route.params.newProgramName,
//         count: '0 workouts',
//         icon: 'weight-lifter',
//       };
//       setPrograms((prev) => [newEntry, ...prev]);
//     }
//   }, [route.params?.newProgramName]);

//     const renderItem = ({ item }) => (
      
//         <View style={styles.programRow}>
//             <TouchableOpacity 
//         style={styles.programRow} 
//         onPress={() => router.navigate("/(workout)/addProgramme")}
//             >
//                 <View style={styles.itemIcon}>
//         <MaterialCommunityIcons name={item.icon} size={24} color="white" />
//       </View>
//       <View style={styles.programText}>
//         <Text style={styles.programTitle}>{item.title}</Text>
//         <Text style={styles.programSub}>{item.count}</Text>
//       </View>
//       </TouchableOpacity>
      
//     </View>
//   );

//   return (
//     <View style={styles.screenBody}>
//       {/* Add New Program Button */}
//       <TouchableOpacity 
//         style={styles.programRow} 
//         onPress={() => navigation.navigate('CreateProgram')}
//       >
//         <View style={styles.actionIcon}>
//           <MaterialCommunityIcons name="plus" size={24} color="white" />
//         </View>
//         <Text style={styles.programTitle}>Add new program</Text>
//       </TouchableOpacity>

//       <FlatList
//         data={programs}
//         renderItem={renderItem}
//         keyExtractor={(item) => item.id}
//       />
//     </View>
//   );
// };

// // --- 2. The Create Program Screen ---
// const CreateProgramScreen = ({ navigation }) => {
//   const [name, setName] = useState('');

//   const handleCreate = () => {
//     if (name.trim().length > 0) {
//       // Pass the name back to the Library screen
//       navigation.navigate('Library', { newProgramName: name });
//     }
//   };

//   return (
//     <SafeAreaView style={styles.createContainer}>
//       <View style={styles.header}>
//         <TouchableOpacity onPress={() => navigation.goBack()}>
//           <Text style={{color: 'white', fontSize: 16}}>Cancel</Text>
//         </TouchableOpacity>
//         <Text style={styles.headerTitle}>New Program</Text>
//         <TouchableOpacity onPress={handleCreate}>
//           <Text style={[styles.createBtnText, !name && {opacity: 0.5}]}>Create</Text>
//         </TouchableOpacity>
//       </View>

//       <View style={styles.inputWrapper}>
//         <Text style={styles.inputLabel}>PROGRAM NAME</Text>
//         <TextInput
//           style={styles.input}
//           placeholder="e.g. Full Body Split"
//           placeholderTextColor="#444"
//           value={name}
//           onChangeText={setName}
//           autoFocus
//         />
//       </View>
//     </SafeAreaView>
//   );
// };

// // --- 3. The Stack Wrapper ---
// export default function WorkoutStack() {
//   return (
//     <Stack.Navigator screenOptions={{ headerShown: false }}>
//       <Stack.Screen name="Library" component={LibraryScreen} />
//       <Stack.Screen 
//         name="CreateProgram" 
//         component={CreateProgramScreen} 
//         options={{ presentation: 'modal' }} // Makes it slide up from bottom
//       />
//     </Stack.Navigator>
//   );
// }

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  screenBody: { flex: 1, backgroundColor: '#000', padding: 16 },
  programRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  itemIcon: { width: 50, height: 50, borderRadius: 8, backgroundColor: '#1C1C1E', justifyContent: 'center', alignItems: 'center', marginRight: 15 },
  actionIcon: { width: 50, height: 50, borderRadius: 8, backgroundColor: '#333', justifyContent: 'center', alignItems: 'center', marginRight: 15 },
  programTitle: { color: 'white', fontSize: 18, fontWeight: '600' },
  programSub: { color: '#8E8E93', fontSize: 14 },
  
  // Create Screen Styles
  createContainer: { flex: 1, backgroundColor: '#000' },
  header: { flexDirection: 'row', justifyContent: 'space-between', padding: 20, alignItems: 'center' },
  headerTitle: { color: 'white', fontSize: 18, fontWeight: 'bold' },
  createBtnText: { color: '#0A84FF', fontSize: 16, fontWeight: 'bold' },
  inputWrapper: { padding: 20, marginTop: 20 },
  inputLabel: { color: '#8E8E93', fontSize: 12, marginBottom: 10 },
  input: { color: 'white', fontSize: 24, borderBottomWidth: 1, borderBottomColor: '#333', paddingBottom: 10 }
});