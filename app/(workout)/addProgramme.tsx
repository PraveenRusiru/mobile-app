import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput, SafeAreaView } from 'react-native';
import { AntDesign, Entypo } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';

export default function AddProgramme() {
    const router = useRouter();
    const params = useLocalSearchParams();
    
    const [title, setTitle] = useState('');
    const [notes, setNotes] = useState('');
    const [addedExercises, setAddedExercises] = useState<any[]>([]);
    const [activeMenuId, setActiveMenuId] = useState<string | null>(null);

    // Sync incoming exercises from SelectExercises screen
    useEffect(() => {
        if (params.updatedList) {
            try {
                const incoming = JSON.parse(params.updatedList as string);
                setAddedExercises(prev => {
                    return incoming.map((inEx: any) => {
                        const existing = prev.find(p => p.exerciseId === inEx.id);
                        if (existing) return existing;

                        return {
                            id: Date.now().toString() + Math.random().toString(36).substr(2, 5),
                            exerciseId: inEx.id,
                            exercise: inEx.name,
                            volume: [{ id: Date.now().toString() + '_v1', weight: '', reps: '' }]
                        };
                    });
                });
                router.setParams({ updatedList: undefined });
            } catch (error) {
                console.error("Sync error:", error);
            }
        }
    }, [params.updatedList]);

    // --- Core Management Functions ---

    const addVolume = (exerciseId: string) => {
        setAddedExercises(prev => prev.map(ex => {
            if (ex.id === exerciseId) {
                return {
                    ...ex,
                    volume: [...ex.volume, { id: Date.now().toString(), weight: '', reps: '' }]
                };
            }
            return ex;
        }));
        setActiveMenuId(null);
    };

    const updateVolumeValue = (exId: string, volId: string, field: 'weight' | 'reps', val: string) => {
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

    const deleteVolumeSet = (exId: string, volId: string) => {
        setAddedExercises(prev => prev.map(ex => {
            if (ex.id === exId) {
                return { ...ex, volume: ex.volume.filter(v => v.id !== volId) };
            }
            return ex;
        }));
    };

    const deleteExercise = (id: string) => {
        setAddedExercises(prev => prev.filter(ex => ex.id !== id));
        setActiveMenuId(null);
    };

    const replaceExercise = (exerciseToReplace: any) => {
        setActiveMenuId(null);
        // We pass the current list but signal that we are in "replace" mode for this ID
        router.push({
            pathname: '/(workout)/selectExercises',
            params: { 
                existing: JSON.stringify(addedExercises),
                replacingId: exerciseToReplace.id 
            } 
        });
    };

    const handleSave = () => {
        const routine = { title, notes, exercises: addedExercises };
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
                        <View style={styles.exerciseRow}>
                            <View style={styles.exerciseInfo}>
                                <Text style={styles.exerciseNameText}>{exercise.exercise}</Text>
                                <Text style={styles.subText}>Press to add details</Text>
                            </View>
                            <TouchableOpacity onPress={() => setActiveMenuId(activeMenuId === exercise.id ? null : exercise.id)}>
                                <Entypo name="dots-three-vertical" size={20} color="#0A84FF" />
                            </TouchableOpacity>
                        </View>

                        {/* Action Menu Overlay */}
                        {activeMenuId === exercise.id && (
                            <View style={styles.actionMenu}>
                                <TouchableOpacity style={styles.menuItem} onPress={() => addVolume(exercise.id)}>
                                    <AntDesign name="plus" size={18} color="white" />
                                    <Text style={styles.menuText}>Add Volume</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.menuItem} onPress={() => replaceExercise(exercise)}>
                                    <AntDesign name="swap" size={18} color="white" />
                                    <Text style={styles.menuText}>Replace Exercise</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={[styles.menuItem, { borderBottomWidth: 0 }]} onPress={() => deleteExercise(exercise.id)}>
                                    <AntDesign name="delete" size={18} color="#FF3B30" />
                                    <Text style={[styles.menuText, { color: '#FF3B30' }]}>Delete Exercise</Text>
                                </TouchableOpacity>
                            </View>
                        )}

                        <View style={styles.volumeHeader}>
                            <Text style={styles.columnLabel}>SET</Text>
                            <Text style={styles.columnLabel}>KG</Text>
                            <Text style={styles.columnLabel}>REPS</Text>
                            <View style={{ width: 30 }} /> 
                        </View>

                        {exercise.volume.map((v: any, index: number) => (
                            <View key={v.id} style={styles.volumeRow}>
                                <View style={styles.setCircle}>
                                    <Text style={{color: 'white', fontSize: 12}}>{index + 1}</Text>
                                </View>
                                <TextInput 
                                    style={styles.volumeInput} 
                                    keyboardType="numeric"
                                    value={v.weight}
                                    onChangeText={(val) => updateVolumeValue(exercise.id, v.id, 'weight', val)}
                                    placeholder="0"
                                    placeholderTextColor="#555"
                                />
                                <TextInput 
                                    style={styles.volumeInput} 
                                    keyboardType="numeric"
                                    value={v.reps}
                                    onChangeText={(val) => updateVolumeValue(exercise.id, v.id, 'reps', val)}
                                    placeholder="0"
                                    placeholderTextColor="#555"
                                />
                                <TouchableOpacity onPress={() => deleteVolumeSet(exercise.id, v.id)}>
                                    <AntDesign name="minuscircle" size={20} color="#FF3B30" />
                                </TouchableOpacity>
                            </View>
                        ))}
                    </View>
                )}
                ListFooterComponent={
                    <TouchableOpacity 
                        style={styles.addExerciseLargeBtn}
                        onPress={() => router.push({
                            pathname: '/(workout)/selectExercises',
                            params: { existing: JSON.stringify(addedExercises) }
                        })}
                    >
                        <Text style={styles.addExerciseLargeText}>Add Exercises</Text>
                    </TouchableOpacity>
                }
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#000' },
    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16 },
    headerTitle: { color: 'white', fontSize: 18, fontWeight: 'bold' },
    saveBtn: { backgroundColor: '#1C3A5E', paddingHorizontal: 16, paddingVertical: 6, borderRadius: 20 },
    saveText: { color: '#0A84FF', fontWeight: 'bold' },
    content: { padding: 16 },
    titleInput: { color: 'white', fontSize: 26, fontWeight: 'bold' },
    notesInput: { color: '#8E8E93', fontSize: 16, marginBottom: 10 },
    exerciseCard: { backgroundColor: '#1C1C1E', padding: 15, borderRadius: 12, marginBottom: 15, borderWidth: 1, borderColor: '#2C2C2E' },
    exerciseRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 5 },
    exerciseInfo: { flex: 1, justifyContent: 'center' },
    exerciseNameText: { color: '#0A84FF', fontSize: 18, fontWeight: 'bold' },
    subText: { color: '#8E8E93', fontSize: 12, marginTop: 2 },
    volumeHeader: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10, marginBottom: 8, marginTop: 15 },
    columnLabel: { color: '#444', fontSize: 12, fontWeight: 'bold', width: 70, textAlign: 'center' },
    volumeRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 4, paddingHorizontal: 5 },
    volumeInput: { backgroundColor: '#333', color: 'white', width: 70, textAlign: 'center', borderRadius: 6, padding: 8, fontSize: 16 },
    setCircle: { width: 28, height: 28, borderRadius: 14, backgroundColor: '#333', justifyContent: 'center', alignItems: 'center' },
    addExerciseLargeBtn: { backgroundColor: 'white', paddingVertical: 15, borderRadius: 30, alignItems: 'center', marginTop: 20, marginBottom: 40 },
    addExerciseLargeText: { color: 'black', fontWeight: 'bold', fontSize: 16 },
    actionMenu: { backgroundColor: '#2C2C2E', borderRadius: 12, padding: 5, marginVertical: 10, borderWidth: 1, borderColor: '#444', zIndex: 10 },
    menuItem: { flexDirection: 'row', alignItems: 'center', padding: 12, borderBottomWidth: 0.5, borderBottomColor: '#444' },
    menuText: { color: 'white', fontSize: 14, fontWeight: '600', marginLeft: 12 }
});