import React, { useState,useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function CreateRoutineScreen() {
    const router = useRouter();
    const [routineTitle, setRoutineTitle] = useState('');
    
    

    // This state holds the exercises being added to the current routine
    const [addedExercises, setAddedExercises] = useState<any[]>([]);

    // useEffect(() => {
        
    // },[addedExercises])
    // Function to add a new empty set to a specific exercise
    const addSet = (exerciseId: string) => {
        setAddedExercises(prev => prev.map(ex => {
            if (ex.id === exerciseId) {
                const newSet = { id: Date.now().toString(), weight: 0, reps: 0, sets: ex.volume.length + 1 };
                return { ...ex, volume: [...ex.volume, newSet] };
            }
            return ex;
        }));
    };

    // Function to update weight or reps for a specific set
    const updateSetVolume = (exerciseId: string, setId: string, field: 'weight' | 'reps', value: string) => {
        setAddedExercises(prev => prev.map(ex => {
            if (ex.id === exerciseId) {
                return {
                    ...ex,
                    volume: ex.volume.map(v => v.id === setId ? { ...v, [field]: parseInt(value) || 0 } : v)
                };
            }
            return ex;
        }));
    };

    return (
        <View style={styles.container}>
            {/* Header matching your image_b16fbb.png */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()}>
                    <AntDesign name="close" size={24} color="#0A84FF" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Create Routine</Text>
                <TouchableOpacity style={styles.saveBtn}>
                    <Text style={styles.saveText}>Save</Text>
                </TouchableOpacity>
            </View>

            <TextInput 
                style={styles.titleInput}
                placeholder="Routine title..."
                placeholderTextColor="#444"
                value={routineTitle}
                onChangeText={setRoutineTitle}
            />

            <FlatList
                data={addedExercises}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.exerciseCard}>
                        <Text style={styles.exerciseName}>{item.exercise}</Text>
                        
                        {/* Table Header for Volume */}
                        <View style={styles.volumeHeader}>
                            <Text style={styles.columnLabel}>SET</Text>
                            <Text style={styles.columnLabel}>KG</Text>
                            <Text style={styles.columnLabel}>REPS</Text>
                            <AntDesign name="check" size={16} color="transparent" />
                        </View>

                        {/* Volume Rows */}
                        {item.volume.map((v, index) => (
                            <View key={v.id} style={styles.volumeRow}>
                                <Text style={styles.setNumber}>{index + 1}</Text>
                                <TextInput 
                                    style={styles.volumeInput}
                                    keyboardType="numeric"
                                    placeholder="0"
                                    onChangeText={(val) => updateSetVolume(item.id, v.id, 'weight', val)}
                                />
                                <TextInput 
                                    style={styles.volumeInput}
                                    keyboardType="numeric"
                                    placeholder="0"
                                    onChangeText={(val) => updateSetVolume(item.id, v.id, 'reps', val)}
                                />
                                <TouchableOpacity>
                                    <AntDesign name="checkcircle" size={20} color="#1C1C1E" />
                                </TouchableOpacity>
                            </View>
                        ))}

                        <TouchableOpacity style={styles.addSetBtn} onPress={() => addSet(item.id)}>
                            <Text style={styles.addSetText}>+ Add Set</Text>
                        </TouchableOpacity>
                    </View>
                )}
                ListFooterComponent={
                    <TouchableOpacity 
                        style={styles.addExerciseBtn} 
                        onPress={() => router.push({pathname:'/(workout)/addProgramme'})}
                    >
                        <Text style={styles.addExerciseText}>Add Exercises</Text>
                    </TouchableOpacity>
                }
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#000', padding: 16 },
    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
    headerTitle: { color: 'white', fontSize: 18, fontWeight: 'bold' },
    saveBtn: { backgroundColor: '#1C3A5E', paddingHorizontal: 20, paddingVertical: 6, borderRadius: 15 },
    saveText: { color: '#0A84FF', fontWeight: 'bold' },
    titleInput: { color: 'white', fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
    
    exerciseCard: { marginBottom: 25 },
    exerciseName: { color: '#0A84FF', fontSize: 18, fontWeight: 'bold', marginBottom: 15 },
    
    volumeHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10, paddingHorizontal: 10 },
    columnLabel: { color: '#444', fontSize: 12, fontWeight: 'bold', width: 60, textAlign: 'center' },
    
    volumeRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8, backgroundColor: '#1C1C1E', padding: 10, borderRadius: 8 },
    setNumber: { color: 'white', fontWeight: 'bold', width: 30, textAlign: 'center' },
    volumeInput: { color: 'white', backgroundColor: '#333', borderRadius: 4, width: 60, textAlign: 'center', padding: 4 },
    
    addSetBtn: { backgroundColor: '#333', padding: 8, borderRadius: 5, alignItems: 'center', marginTop: 10 },
    addSetText: { color: 'white', fontWeight: 'bold', fontSize: 12 },
    
    addExerciseBtn: { backgroundColor: 'white', padding: 15, borderRadius: 25, alignItems: 'center', marginTop: 20 },
    addExerciseText: { color: 'black', fontWeight: 'bold', fontSize: 16 }
});