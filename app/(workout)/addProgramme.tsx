import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput, SafeAreaView } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';

export default function AddProgramme() {
    const router = useRouter();
    const params = useLocalSearchParams();
    
    const [title, setTitle] = useState('');
    const [notes, setNotes] = useState('');
    const [addedExercises, setAddedExercises] = useState<any[]>([]);

    // Effect to catch exercises passed back from selection screen
    useEffect(() => {
        // 1. Only run if newExercises has stringified data
        if (params.newExercises) {
            try {
                const selected = JSON.parse(params.newExercises as string);
                
                const formatted = selected.map((ex: any) => ({
                    // Generate a truly unique ID to avoid FlatList key collisions
                    id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
                    exercise: ex.name,
                    volume: [{ id: Date.now().toString() + '_v1', weight: '', reps: '' }]
                }));

                // 2. Append new exercises to the existing state (prevents data loss)
                setAddedExercises(prev => [...prev, ...formatted]);

                // 3. Clear the param immediately to prevent the "Maximum update depth" loop
                router.setParams({ newExercises: undefined });
            } catch (error) {
                console.error("Failed to parse exercises:", error);
            }
        }
    }, [params.newExercises]); 

    const addSet = (exerciseId: string) => {
        setAddedExercises(prev => prev.map(ex => {
            if (ex.id === exerciseId) {
                return {
                    ...ex,
                    volume: [...ex.volume, { id: Date.now().toString() + Math.random(), weight: '', reps: '' }]
                };
            }
            return ex;
        }));
    };

    const updateVolume = (exId: string, volId: string, field: 'weight' | 'reps', val: string) => {
        setAddedExercises(prev => prev.map(ex => {
            if (ex.id === exId) {
                return {
                    ...ex,
                    volume: ex.volume.map(v => v.id === volId ? { ...v, [field]: val } : v)
                };
            }
            return ex;
        }));
    };

    const handleSave = () => {
        // Final object structure for your global state
        const routine = {
            id: Date.now().toString(),
            title,
            notes,
            exercises: addedExercises
        };
        console.log("Saving Routine:", routine);
        router.push('/(workout)');
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()}>
                    <AntDesign name="close" size={26} color="#0A84FF" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Create Routine</Text>
                <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
                    <Text style={styles.saveText}>Save</Text>
                </TouchableOpacity>
            </View>

            <FlatList
                data={addedExercises}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.content}
                ListHeaderComponent={
                    <View style={{ marginBottom: 20 }}>
                        <TextInput
                            style={styles.titleInput}
                            placeholder="Routine title..."
                            placeholderTextColor="#444"
                            value={title}
                            onChangeText={setTitle}
                        />
                        <TextInput
                            style={styles.notesInput}
                            placeholder="Notes..."
                            placeholderTextColor="#444"
                            value={notes}
                            onChangeText={setNotes}
                            multiline
                        />
                    </View>
                }
                renderItem={({ item: exercise }) => (
                    <View style={styles.exerciseCard}>
                        <Text style={styles.exerciseNameText}>{exercise.exercise}</Text>
                        
                        <View style={styles.volumeHeader}>
                            <Text style={styles.columnLabel}>SET</Text>
                            <Text style={styles.columnLabel}>KG</Text>
                            <Text style={styles.columnLabel}>REPS</Text>
                            <AntDesign name="check" size={16} color="transparent" />
                        </View>

                        {exercise.volume.map((v: any, index: number) => (
                            <View key={v.id} style={styles.volumeRow}>
                                <View style={styles.setCircle}>
                                    <Text style={{color: 'white'}}>{index + 1}</Text>
                                </View>
                                <TextInput 
                                    style={styles.volumeInput} 
                                    placeholder="0" 
                                    keyboardType="numeric" 
                                    placeholderTextColor="#555"
                                    value={v.weight}
                                    onChangeText={(val) => updateVolume(exercise.id, v.id, 'weight', val)}
                                />
                                <TextInput 
                                    style={styles.volumeInput} 
                                    placeholder="0" 
                                    keyboardType="numeric" 
                                    placeholderTextColor="#555"
                                    value={v.reps}
                                    onChangeText={(val) => updateVolume(exercise.id, v.id, 'reps', val)}
                                />
                                <TouchableOpacity>
                                    <AntDesign name="checkcircle" size={22} color="#1C1C1E" />
                                </TouchableOpacity>
                            </View>
                        ))}

                        <TouchableOpacity style={styles.addSetBtn} onPress={() => addSet(exercise.id)}>
                            <Text style={styles.addSetText}>+ Add Set</Text>
                        </TouchableOpacity>
                    </View>
                )}
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <TouchableOpacity 
                            style={styles.addExerciseLargeBtn}
                            onPress={() => router.push('/(workout)/selectExercises')}
                        >
                            <Text style={styles.addExerciseLargeText}>Add Exercises</Text>
                        </TouchableOpacity>
                    </View>
                }
                ListFooterComponent={
                    addedExercises.length > 0 ? (
                        <TouchableOpacity 
                            style={[styles.addExerciseLargeBtn, {marginTop: 20, alignSelf: 'center', marginBottom: 40}]}
                            onPress={() => router.push('/(workout)/selectExercises')}
                        >
                            <Text style={styles.addExerciseLargeText}>Add Exercises</Text>
                        </TouchableOpacity>
                    ) : null
                }
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#000' },
    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16, borderBottomWidth: 0.5, borderBottomColor: '#1C1C1E' },
    headerTitle: { color: 'white', fontSize: 18, fontWeight: 'bold' },
    saveBtn: { backgroundColor: '#1C3A5E', paddingHorizontal: 16, paddingVertical: 6, borderRadius: 20 },
    saveText: { color: '#0A84FF', fontWeight: 'bold' },
    content: { padding: 16 },
    titleInput: { color: 'white', fontSize: 26, fontWeight: 'bold', marginBottom: 5 },
    notesInput: { color: '#8E8E93', fontSize: 16, marginBottom: 10 },
    exerciseCard: { backgroundColor: '#1C1C1E', padding: 15, borderRadius: 12, marginBottom: 15 },
    exerciseNameText: { color: '#0A84FF', fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
    volumeHeader: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10, marginBottom: 8 },
    columnLabel: { color: '#444', fontSize: 12, fontWeight: 'bold', width: 70, textAlign: 'center' },
    volumeRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 4, paddingVertical: 5 },
    setCircle: { width: 28, height: 28, borderRadius: 14, backgroundColor: '#333', justifyContent: 'center', alignItems: 'center' },
    volumeInput: { backgroundColor: '#333', color: 'white', width: 70, textAlign: 'center', borderRadius: 6, padding: 6, fontSize: 16 },
    addSetBtn: { marginTop: 15, paddingVertical: 10, alignItems: 'center', backgroundColor: '#333', borderRadius: 8 },
    addSetText: { color: 'white', fontWeight: 'bold', fontSize: 14 },
    emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 80 },
    addExerciseLargeBtn: { backgroundColor: 'white', paddingVertical: 15, paddingHorizontal: 60, borderRadius: 30 },
    addExerciseLargeText: { color: 'black', fontWeight: 'bold', fontSize: 16 }
});