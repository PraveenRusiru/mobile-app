import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';

export default function CreateProgramScreen() {
  const [name, setName] = useState('');
  const router = useRouter();

  const handleCreate = () => {
    if (name.trim().length > 0) {
      // Navigate back and pass data via search params
      router.replace({
        pathname: '/(workout)',
        params: { newProgramName: name }
      });
    }
  };

  return (
    <SafeAreaView style={styles.createContainer}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={{color: 'white', fontSize: 16}}>Cancel</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>New Program</Text>
        <TouchableOpacity onPress={handleCreate}>
          <Text style={[styles.createBtnText, !name && {opacity: 0.5}]}>Create</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.inputWrapper}>
         <Text style={styles.inputLabel}>PROGRAM NAME</Text>
         <TextInput
          style={styles.input}
          placeholder="e.g. Full Body Split"
          placeholderTextColor="#444"
          value={name}
          onChangeText={setName}
          autoFocus
        />
      </View>
    </SafeAreaView>
  );
}

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