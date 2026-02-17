import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, SafeAreaView } from 'react-native';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';

export const MUSCLE_GROUPS = [
  { id: '1', name: 'Chest', image: require('../../assets/chest.png') },
  { id: '2', name: 'Back', image: require('../../assets/back.png') },
  { id: '3', name: 'Quads', image: require('../../assets/quads.png') },
  { id: '4', name: 'Biceps', image: require('../../assets/bicep.png') },
  { id: '5', name: 'Triceps', image: require('../../assets/tricep.png') },
  { id: '6', name: 'Shoulders', image: require('../../assets/shoulders.png') },
  { id: '7', name: 'Hamstrings', image: require('../../assets/hams.png') },
  { id: '8', name: 'Abs', image: require('../../assets/abs.png') },
  { id: '9', name: 'Glutes', image: require('../../assets/glutes.png') },
  { id: '10', name: 'Calves', image: require('../../assets/calves.png') },
  { id: '11', name: 'Forearms', image: require('../../assets/forearms.png') },
  { id: '12', name: 'Traps', image: require('../../assets/traps.png') }
];

export const EXERCISES_DB: any = {
  'Chest': [
    { id: 'c1', name: 'Barbell Bench Press', image: 'https://via.placeholder.com/150' },
    { id: 'c2', name: 'Incline Dumbbell Press', image: 'https://via.placeholder.com/150' },
    { id: 'c3', name: 'Chest Dips', image: 'https://via.placeholder.com/150' },
    { id: 'c4', name: 'Push-ups', image: 'https://via.placeholder.com/150' },
    { id: 'c5', name: 'Cable Fly', image: 'https://via.placeholder.com/150' },
  ],
  'Back': [
    { id: 'ba1', name: 'Deadlift', image: 'https://via.placeholder.com/150' },
    { id: 'ba2', name: 'Lat Pulldown', image: 'https://via.placeholder.com/150' },
    { id: 'ba3', name: 'Bent Over Row', image: 'https://via.placeholder.com/150' },
    { id: 'ba4', name: 'Pull-ups', image: 'https://via.placeholder.com/150' },
    { id: 'ba5', name: 'Seated Cable Row', image: 'https://via.placeholder.com/150' },
  ],
  'Quads': [
    { id: 'q1', name: 'Barbell Back Squat', image: 'https://via.placeholder.com/150' },
    { id: 'q2', name: 'Leg Press', image: 'https://via.placeholder.com/150' },
    { id: 'q3', name: 'Leg Extensions', image: 'https://via.placeholder.com/150' },
    { id: 'q4', name: 'Lunges', image: 'https://via.placeholder.com/150' },
  ],
  'Biceps': [
    { id: 'b1', name: 'Barbell Curl', image: 'https://via.placeholder.com/150' },
    { id: 'b2', name: 'Hammer Curl', image: 'https://via.placeholder.com/150' },
    { id: 'b3', name: 'Preacher Curl', image: 'https://via.placeholder.com/150' },
  ],
  'Triceps': [
    { id: 't1', name: 'Triceps Pushdown', image: 'https://via.placeholder.com/150' },
    { id: 't2', name: 'Skull Crusher', image: 'https://via.placeholder.com/150' },
    { id: 't3', name: 'Triceps Dips', image: 'https://via.placeholder.com/150' },
  ],
  'Shoulders': [
    { id: 's1', name: 'Overhead Press', image: 'https://via.placeholder.com/150' },
    { id: 's2', name: 'Lateral Raise', image: 'https://via.placeholder.com/150' },
    { id: 's3', name: 'Front Raise', image: 'https://via.placeholder.com/150' },
  ],
  'Hamstrings': [
    { id: 'h1', name: 'Romanian Deadlift', image: 'https://via.placeholder.com/150' },
    { id: 'h2', name: 'Lying Leg Curl', image: 'https://via.placeholder.com/150' },
  ],
  'Abs': [
    { id: 'ab1', name: 'Plank', image: 'https://via.placeholder.com/150' },
    { id: 'ab2', name: 'Crunches', image: 'https://via.placeholder.com/150' },
    { id: 'ab3', name: 'Leg Raise', image: 'https://via.placeholder.com/150' },
  ],
  'Glutes': [
    { id: 'g1', name: 'Hip Thrust', image: 'https://via.placeholder.com/150' },
    { id: 'g2', name: 'Glute Bridge', image: 'https://via.placeholder.com/150' },
  ],
  'Calves': [
    { id: 'ca1', name: 'Standing Calf Raise', image: 'https://via.placeholder.com/150' },
    { id: 'ca2', name: 'Seated Calf Raise', image: 'https://via.placeholder.com/150' },
  ],
  'Forearms': [
    { id: 'f1', name: 'Wrist Curl', image: 'https://via.placeholder.com/150' },
  ],
  'Traps': [
    { id: 'tr1', name: 'Barbell Shrug', image: 'https://via.placeholder.com/150' },
  ],
};

export default function SelectExercises() {
    const router = useRouter();
    const params = useLocalSearchParams();
    const [selectedMuscle, setSelectedMuscle] = useState('Chest');
    const [selectedIds, setSelectedIds] = useState<string[]>([]);

    useEffect(() => {
        if (params.existing) {
            const existing = JSON.parse(params.existing as string);
            setSelectedIds(existing.map((ex: any) => ex.exerciseId));
        }
    }, []);

    const toggleSelection = (id: string) => {
        setSelectedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
    };

    const handleConfirm = () => {
        const fullSelection = selectedIds.map(id => {
            const muscleKey = Object.keys(EXERCISES_DB).find(key => 
                EXERCISES_DB[key].find((ex: any) => ex.id === id)
            );
            return EXERCISES_DB[muscleKey!].find((ex: any) => ex.id === id);
        });

        router.push({
            pathname: "/(workout)/addProgramme",
            params: { updatedList: JSON.stringify(fullSelection) }
        });
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()}><AntDesign name="close" size={26} color="white" /></TouchableOpacity>
                <Text style={styles.headerTitle}>Add Exercises</Text>
                <AntDesign name="search1" size={22} color="white" />
            </View>

            <View style={styles.tabContainer}>
                <FlatList data={MUSCLE_GROUPS} horizontal showsHorizontalScrollIndicator={false}
                    renderItem={({ item }) => (
                        <TouchableOpacity 
                            style={[styles.muscleTab, selectedMuscle === item.name && styles.activeTab]} 
                            onPress={() => setSelectedMuscle(item.name)}
                        >
                            <Image source={item.image} style={styles.muscleImg} />
                            {selectedMuscle === item.name && <View style={styles.activeIndicator} />}
                        </TouchableOpacity>
                    )}
                />
            </View>

            <FlatList data={EXERCISES_DB[selectedMuscle] || []}
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.exerciseRow} onPress={() => toggleSelection(item.id)}>
                        <Image source={{ uri: item.image }} style={styles.thumb} />
                        <View style={{ flex: 1 }}><Text style={styles.whiteText}>{item.name}</Text></View>
                        <MaterialIcons 
                            name={selectedIds.includes(item.id) ? "check-box" : "check-box-outline-blank"} 
                            size={26} 
                            color={selectedIds.includes(item.id) ? "#0A84FF" : "#333"} 
                        />
                    </TouchableOpacity>
                )}
            />

            {selectedIds.length > 0 && (
                <View style={styles.btnContainer}>
                    <TouchableOpacity style={styles.floatingButton} onPress={handleConfirm}>
                        <Text style={styles.btnText}>Add {selectedIds.length} exercises</Text>
                    </TouchableOpacity>
                </View>
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#000' },
    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16 },
    headerTitle: { color: 'white', fontSize: 20, fontWeight: 'bold' },
    tabContainer: { height: 90, borderBottomWidth: 0.5, borderBottomColor: '#1C1C1E' },
    muscleTab: { marginHorizontal: 15, opacity: 0.5, alignItems: 'center' },
    activeTab: { opacity: 1 },
    activeIndicator: { height: 2, width: 25, backgroundColor: '#0A84FF', marginTop: 5 },
    muscleImg: { width: 50, height: 60, resizeMode: 'contain' },
    exerciseRow: { flexDirection: 'row', alignItems: 'center', padding: 16, borderBottomWidth: 0.5, borderBottomColor: '#1C1C1E' },
    thumb: { width: 50, height: 50, borderRadius: 8, backgroundColor: '#fff', marginRight: 15 },
    whiteText: { color: 'white', fontWeight: 'bold' },
    btnContainer: { position: 'absolute', bottom: 30, width: '100%', paddingHorizontal: 20 },
    floatingButton: { backgroundColor: 'white', paddingVertical: 18, borderRadius: 35, alignItems: 'center' },
    btnText: { color: 'black', fontWeight: 'bold', fontSize: 16 }
});