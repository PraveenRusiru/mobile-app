import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

const HomeTabDemo = () => {
  // Static Demo Data
  const demoData = {
    name: "Praveen",
    bodyFat: "28%",
    weightToLose: "8.5kg",
    maintenance: "2,450",
    mildLoss: "2,200",
    weightLoss: "1,950",
    extremeLoss: "1,450"
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* Header Section */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Text style={styles.headerTitle}>Home</Text>
            <Ionicons name="chevron-down" size={20} color="white" />
          </View>
          <View style={styles.headerIcons}>
            <Ionicons name="flame" size={26} color="#FF9500" />
            <Ionicons name="person-add-outline" size={26} color="white" style={styles.iconGap} />
            <Ionicons name="notifications-outline" size={26} color="white" />
          </View>
        </View>

        {/* Body Composition Card */}
        <View style={styles.glassCard}>
          <View style={styles.cardHeader}>
            <MaterialCommunityIcons name="Whistle-outline" size={20} color="#8E8E93" />
            <Text style={styles.cardTag}>BODY STATUS</Text>
          </View>
          
          <View style={styles.statsRow}>
            <View>
              <Text style={styles.statLabel}>Body Fat</Text>
              <Text style={styles.statValue}>{demoData.bodyFat}</Text>
            </View>
            <View style={styles.divider} />
            <View>
              <Text style={styles.statLabel}>Target Reduction</Text>
              <Text style={[styles.statValue, {color: '#FF3B30'}]}>{demoData.weightToLose}</Text>
            </View>
          </View>

          <TouchableOpacity style={styles.primaryBtn}>
            <Text style={styles.primaryBtnText}>UPDATE MEASUREMENTS</Text>
          </TouchableOpacity>
        </View>

        {/* Calorie Targets List */}
        <Text style={styles.sectionTitle}>Daily Calorie Targets</Text>
        
        <View style={styles.targetList}>
          <TargetItem label="Maintenance" kcal={demoData.maintenance} sub="Keep current weight" color="#34C759" />
          <TargetItem label="Mild Loss" kcal={demoData.mildLoss} sub="0.25 kg / week" color="#FFD60A" />
          <TargetItem label="Weight Loss" kcal={demoData.weightLoss} sub="0.50 kg / week" color="#FF9500" />
          <TargetItem label="Extreme Loss" kcal={demoData.extremeLoss} sub="1.00 kg / week" color="#FF3B30" />
        </View>

        {/* Suggestion Card (Matching your screenshot style) */}
        <View style={styles.suggestionCard}>
           <Text style={styles.suggestionTitle}>Ready to start lifting, {demoData.name}?</Text>
           <Text style={styles.suggestionSub}>Your personalized plan is ready based on your body fat metrics.</Text>
           <TouchableOpacity style={styles.outlineBtn}>
              <Text style={styles.outlineBtnText}>START WORKOUT</Text>
           </TouchableOpacity>
        </View>

      </ScrollView>

      {/* Floating Action Button Concept */}
      <TouchableOpacity style={styles.fab}>
        <Ionicons name="play" size={20} color="black" />
        <Text style={styles.fabText}>Start an Empty Workout</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

// Sub-component for Calorie Rows
const TargetItem = ({ label, kcal, sub, color }) => (
  <View style={styles.targetItem}>
    <View>
      <Text style={styles.targetLabel}>{label}</Text>
      <Text style={styles.targetSub}>{sub}</Text>
    </View>
    <View style={styles.targetRight}>
      <Text style={[styles.targetKcal, { color }]}>{kcal}</Text>
      <Text style={styles.kcalUnit}>kcal</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  scrollContent: { padding: 20, paddingBottom: 100 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 25 },
  headerLeft: { flexDirection: 'row', alignItems: 'center' },
  headerTitle: { color: 'white', fontSize: 28, fontWeight: 'bold', marginRight: 5 },
  headerIcons: { flexDirection: 'row', alignItems: 'center' },
  iconGap: { marginHorizontal: 15 },
  
  glassCard: { backgroundColor: '#1C1C1E', borderRadius: 20, padding: 20, marginBottom: 25 },
  cardHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 15 },
  cardTag: { color: '#8E8E93', fontSize: 12, fontWeight: '600', marginLeft: 5 },
  statsRow: { flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', marginBottom: 20 },
  divider: { width: 1, height: 40, backgroundColor: '#3A3A3C' },
  statLabel: { color: '#8E8E93', fontSize: 13, textAlign: 'center' },
  statValue: { color: 'white', fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginTop: 4 },
  
  primaryBtn: { backgroundColor: '#3A3A3C', padding: 12, borderRadius: 12, alignItems: 'center' },
  primaryBtnText: { color: 'white', fontWeight: 'bold', fontSize: 12 },

  sectionTitle: { color: 'white', fontSize: 20, fontWeight: 'bold', marginBottom: 15 },
  targetList: { gap: 12 },
  targetItem: { backgroundColor: '#1C1C1E', padding: 16, borderRadius: 16, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  targetLabel: { color: 'white', fontSize: 16, fontWeight: '600' },
  targetSub: { color: '#8E8E93', fontSize: 12, marginTop: 2 },
  targetRight: { alignItems: 'flex-end' },
  targetKcal: { fontSize: 18, fontWeight: 'bold' },
  kcalUnit: { color: '#8E8E93', fontSize: 10 },

  suggestionCard: { backgroundColor: '#1C1C1E', padding: 20, borderRadius: 20, marginTop: 25, borderLeftWidth: 4, borderLeftColor: '#34C759' },
  suggestionTitle: { color: 'white', fontSize: 18, fontWeight: 'bold' },
  suggestionSub: { color: '#8E8E93', fontSize: 14, marginTop: 8, lineHeight: 20 },
  outlineBtn: { borderWidth: 1, borderColor: '#3A3A3C', padding: 12, borderRadius: 25, marginTop: 15, width: 160, alignItems: 'center' },
  outlineBtnText: { color: 'white', fontWeight: '700', fontSize: 12 },

  fab: { position: 'absolute', bottom: 20, alignSelf: 'center', backgroundColor: 'white', flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 12, borderRadius: 30, elevation: 5 },
  fabText: { color: 'black', fontWeight: 'bold', marginLeft: 8 }
});

export default HomeTabDemo;