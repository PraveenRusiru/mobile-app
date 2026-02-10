import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Modal, TextInput, Image, ScrollView } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import AntDesign from '@expo/vector-icons/AntDesign';




const MUSCLE_GROUPS = [
  { id: '1', name: 'Chest',image:require('../../assets/chest.png') },
  { id: '2', name: 'Back' ,image:require('../../assets/back.png')},
    { id: '3', name: 'Quads' ,image:require('../../assets/quads.png')},
  { id: '4', name: 'Bicep' ,image:require('../../assets/bicep.png')},
  { id: '5', name: 'Tricep',image:require('../../assets/tricep.png') },
    { id: '6', name: 'Shoulders',image:require('../../assets/shoulders.png') },
  { id: '7', name: 'Hamstrings',image:require('../../assets/hams.png') },
  { id: '8', name: 'Abs',image:require('../../assets/abs.png') },
    { id: '9', name: 'Glutes',image:require('../../assets/glutes.png') },
  { id: '10', name: 'Calves',image:require('../../assets/calves.png') },
  { id: '11', name: 'Forearms',image:require('../../assets/forearms.png') },
  { id: '12', name: 'Traps',image:require('../../assets/traps.png') }
  // ... add others
];

const EXERCISES_DB = {
  'Chest': [
    { id: 'c1', name: 'Barbell Bench Press', image: 'https://via.placeholder.com/150' },
    { id: 'c2', name: 'Incline Dumbbell Press', image: 'https://via.placeholder.com/150' },
    { id: 'c3', name: 'Decline Bench Press', image: 'https://via.placeholder.com/150' },
    { id: 'c4', name: 'Dumbbell Flys', image: 'https://via.placeholder.com/150' },
    { id: 'c5', name: 'Cable Cross-over', image: 'https://via.placeholder.com/150' },
    { id: 'c6', name: 'Push-ups', image: 'https://via.placeholder.com/150' },
    { id: 'c7', name: 'Chest Dips', image: 'https://via.placeholder.com/150' },
    { id: 'c8', name: 'Machine Chest Press', image: 'https://via.placeholder.com/150' },
    { id: 'c9', name: 'Pec Deck Fly', image: 'https://via.placeholder.com/150' },
    { id: 'c10', name: 'Landmine Press', image: 'https://via.placeholder.com/150' },
  ],
  'Back': [
    { id: 'ba1', name: 'Deadlift', image: 'https://via.placeholder.com/150' },
    { id: 'ba2', name: 'Pull-ups', image: 'https://via.placeholder.com/150' },
    { id: 'ba3', name: 'Lat Pulldown', image: 'https://via.placeholder.com/150' },
    { id: 'ba4', name: 'Bent Over Barbell Row', image: 'https://via.placeholder.com/150' },
    { id: 'ba5', name: 'Seated Cable Row', image: 'https://via.placeholder.com/150' },
    { id: 'ba6', name: 'One-Arm Dumbbell Row', image: 'https://via.placeholder.com/150' },
    { id: 'ba7', name: 'T-Bar Row', image: 'https://via.placeholder.com/150' },
    { id: 'ba8', name: 'Hyperextensions', image: 'https://via.placeholder.com/150' },
    { id: 'ba9', name: 'Face Pulls', image: 'https://via.placeholder.com/150' },
    { id: 'ba10', name: 'Straight Arm Pulldown', image: 'https://via.placeholder.com/150' },
  ],
  'Quads': [
    { id: 'q1', name: 'Barbell Back Squat', image: 'https://via.placeholder.com/150' },
    { id: 'q2', name: 'Front Squat', image: 'https://via.placeholder.com/150' },
    { id: 'q3', name: 'Leg Press', image: 'https://via.placeholder.com/150' },
    { id: 'q4', name: 'Leg Extensions', image: 'https://via.placeholder.com/150' },
    { id: 'q5', name: 'Hack Squat', image: 'https://via.placeholder.com/150' },
    { id: 'q6', name: 'Goblet Squat', image: 'https://via.placeholder.com/150' },
    { id: 'q7', name: 'Lunges', image: 'https://via.placeholder.com/150' },
    { id: 'q8', name: 'Bulgarian Split Squat', image: 'https://via.placeholder.com/150' },
    { id: 'q9', name: 'Step-ups', image: 'https://via.placeholder.com/150' },
    { id: 'q10', name: 'Sissy Squat', image: 'https://via.placeholder.com/150' },
  ],
  'Bicep': [
    { id: 'b1', name: 'Barbell Curls', image: 'https://via.placeholder.com/150' },
    { id: 'b2', name: 'Dumbbell Alternating Curls', image: 'https://via.placeholder.com/150' },
    { id: 'b3', name: 'Hammer Curls', image: 'https://via.placeholder.com/150' },
    { id: 'b4', name: 'Preacher Curls', image: 'https://via.placeholder.com/150' },
    { id: 'b5', name: 'Incline Dumbbell Curls', image: 'https://via.placeholder.com/150' },
    { id: 'b6', name: 'Concentration Curls', image: 'https://via.placeholder.com/150' },
    { id: 'b7', name: 'Cable Curls', image: 'https://via.placeholder.com/150' },
    { id: 'b8', name: 'Spider Curls', image: 'https://via.placeholder.com/150' },
    { id: 'b9', name: 'Zottman Curls', image: 'https://via.placeholder.com/150' },
    { id: 'b10', name: 'Chin-ups', image: 'https://via.placeholder.com/150' },
  ],
  'Tricep': [
    { id: 't1', name: 'Tricep Rope Pushdown', image: 'https://via.placeholder.com/150' },
    { id: 't2', name: 'Skull Crushers', image: 'https://via.placeholder.com/150' },
    { id: 't3', name: 'Close Grip Bench Press', image: 'https://via.placeholder.com/150' },
    { id: 't4', name: 'Dips', image: 'https://via.placeholder.com/150' },
    { id: 't5', name: 'Overhead Dumbbell Extension', image: 'https://via.placeholder.com/150' },
    { id: 't6', name: 'Tricep Kickbacks', image: 'https://via.placeholder.com/150' },
    { id: 't7', name: 'Bench Dips', image: 'https://via.placeholder.com/150' },
    { id: 't8', name: 'Diamond Push-ups', image: 'https://via.placeholder.com/150' },
    { id: 't9', name: 'V-Bar Pushdown', image: 'https://via.placeholder.com/150' },
    { id: 't10', name: 'One-Arm Cable Extension', image: 'https://via.placeholder.com/150' },
  ],
  'Shoulders': [
    { id: 's1', name: 'Overhead Barbell Press', image: 'https://via.placeholder.com/150' },
    { id: 's2', name: 'Dumbbell Shoulder Press', image: 'https://via.placeholder.com/150' },
    { id: 's3', name: 'Lateral Raises', image: 'https://via.placeholder.com/150' },
    { id: 's4', name: 'Front Raises', image: 'https://via.placeholder.com/150' },
    { id: 's5', name: 'Rear Delt Flys', image: 'https://via.placeholder.com/150' },
    { id: 's6', name: 'Arnold Press', image: 'https://via.placeholder.com/150' },
    { id: 's7', name: 'Upright Rows', image: 'https://via.placeholder.com/150' },
    { id: 's8', name: 'Face Pulls', image: 'https://via.placeholder.com/150' },
    { id: 's9', name: 'Push Press', image: 'https://via.placeholder.com/150' },
    { id: 's10', name: 'Bus Driver', image: 'https://via.placeholder.com/150' },
  ],
  'Hamstrings': [
    { id: 'h1', name: 'Romanian Deadlift', image: 'https://via.placeholder.com/150' },
    { id: 'h2', name: 'Lying Leg Curls', image: 'https://via.placeholder.com/150' },
    { id: 'h3', name: 'Seated Leg Curls', image: 'https://via.placeholder.com/150' },
    { id: 'h4', name: 'Sumo Squat', image: 'https://via.placeholder.com/150' },
    { id: 'h5', name: 'Good Mornings', image: 'https://via.placeholder.com/150' },
    { id: 'h6', name: 'Glute-Ham Raise', image: 'https://via.placeholder.com/150' },
    { id: 'h7', name: 'Single Leg RDL', image: 'https://via.placeholder.com/150' },
    { id: 'h8', name: 'Kettlebell Swings', image: 'https://via.placeholder.com/150' },
    { id: 'h9', name: 'Stiff-Legged Deadlift', image: 'https://via.placeholder.com/150' },
    { id: 'h10', name: 'Nordic Curls', image: 'https://via.placeholder.com/150' },
  ],
  'Abs': [
    { id: 'ab1', name: 'Crunches', image: 'https://via.placeholder.com/150' },
    { id: 'ab2', name: 'Plank', image: 'https://via.placeholder.com/150' },
    { id: 'ab3', name: 'Hanging Leg Raises', image: 'https://via.placeholder.com/150' },
    { id: 'ab4', name: 'Russian Twists', image: 'https://via.placeholder.com/150' },
    { id: 'ab5', name: 'Bicycle Crunches', image: 'https://via.placeholder.com/150' },
    { id: 'ab6', name: 'V-ups', image: 'https://via.placeholder.com/150' },
    { id: 'ab7', name: 'Mountain Climbers', image: 'https://via.placeholder.com/150' },
    { id: 'ab8', name: 'Cable Crunches', image: 'https://via.placeholder.com/150' },
    { id: 'ab9', name: 'Ab Wheel Rollout', image: 'https://via.placeholder.com/150' },
    { id: 'ab10', name: 'Flutter Kicks', image: 'https://via.placeholder.com/150' },
  ],
  'Glutes': [
    { id: 'g1', name: 'Hip Thrusts', image: 'https://via.placeholder.com/150' },
    { id: 'g2', name: 'Glute Bridges', image: 'https://via.placeholder.com/150' },
    { id: 'g3', name: 'Cable Kickbacks', image: 'https://via.placeholder.com/150' },
    { id: 'g4', name: 'Abductor Machine', image: 'https://via.placeholder.com/150' },
    { id: 'g5', name: 'Clamshells', image: 'https://via.placeholder.com/150' },
    { id: 'g6', name: 'Fire Hydrants', image: 'https://via.placeholder.com/150' },
    { id: 'g7', name: 'Sumo Deadlift', image: 'https://via.placeholder.com/150' },
    { id: 'g8', name: 'Curtsy Lunges', image: 'https://via.placeholder.com/150' },
    { id: 'g9', name: 'Donkey Kicks', image: 'https://via.placeholder.com/150' },
    { id: 'g10', name: 'Frog Pumps', image: 'https://via.placeholder.com/150' },
  ],
  'Calves': [
    { id: 'ca1', name: 'Standing Calf Raises', image: 'https://via.placeholder.com/150' },
    { id: 'ca2', name: 'Seated Calf Raises', image: 'https://via.placeholder.com/150' },
    { id: 'ca3', name: 'Donkey Calf Raises', image: 'https://via.placeholder.com/150' },
    { id: 'ca4', name: 'Leg Press Calf Raises', image: 'https://via.placeholder.com/150' },
    { id: 'ca5', name: 'Jump Rope', image: 'https://via.placeholder.com/150' },
    { id: 'ca6', name: 'Single Leg Calf Raises', image: 'https://via.placeholder.com/150' },
    { id: 'ca7', name: 'Farmers Walk on Toes', image: 'https://via.placeholder.com/150' },
    { id: 'ca8', name: 'Box Jumps', image: 'https://via.placeholder.com/150' },
    { id: 'ca9', name: 'Smith Machine Calf Raise', image: 'https://via.placeholder.com/150' },
    { id: 'ca10', name: 'Stair Climbs', image: 'https://via.placeholder.com/150' },
  ],
  'Forearms': [
    { id: 'f1', name: 'Wrist Curls', image: 'https://via.placeholder.com/150' },
    { id: 'f2', name: 'Reverse Wrist Curls', image: 'https://via.placeholder.com/150' },
    { id: 'f3', name: 'Farmers Walk', image: 'https://via.placeholder.com/150' },
    { id: 'f4', name: 'Hammer Curls', image: 'https://via.placeholder.com/150' },
    { id: 'f5', name: 'Reverse Grip Barbell Curls', image: 'https://via.placeholder.com/150' },
    { id: 'f6', name: 'Wrist Roller', image: 'https://via.placeholder.com/150' },
    { id: 'f7', name: 'Dead Hangs', image: 'https://via.placeholder.com/150' },
    { id: 'f8', name: 'Plate Pinches', image: 'https://via.placeholder.com/150' },
    { id: 'f9', name: 'Towel Pull-ups', image: 'https://via.placeholder.com/150' },
    { id: 'f10', name: 'Behind the Back Wrist Curl', image: 'https://via.placeholder.com/150' },
  ],
  'Traps': [
    { id: 'tr1', name: 'Barbell Shrugs', image: 'https://via.placeholder.com/150' },
    { id: 'tr2', name: 'Dumbbell Shrugs', image: 'https://via.placeholder.com/150' },
    { id: 'tr3', name: 'Upright Rows', image: 'https://via.placeholder.com/150' },
    { id: 'tr4', name: 'Farmer’s Carry', image: 'https://via.placeholder.com/150' },
    { id: 'tr5', name: 'Face Pulls', image: 'https://via.placeholder.com/150' },
    { id: 'tr6', name: 'Power Cleans', image: 'https://via.placeholder.com/150' },
    { id: 'tr7', name: 'Rack Pulls', image: 'https://via.placeholder.com/150' },
    { id: 'tr8', name: 'Overhead Shrugs', image: 'https://via.placeholder.com/150' },
    { id: 'tr9', name: 'Behind-the-back Shrugs', image: 'https://via.placeholder.com/150' },
    { id: 'tr10', name: 'Snatch-Grip High Pull', image: 'https://via.placeholder.com/150' },
  ],
};

export default function WorkoutManager() {
    type Volume = {
        id:string,
        weight: number,
        sets: number,
        reps : number
    }
    
    type Exercises = {
        id:string,
        exercise: string,
        volume :Volume[]
    }
    type Programms = {
        id:string,
        programms: string,
        exercises:Exercises[]
    }
    const [allprogramms,setProgramms]=useState<Programms[]>([])
  const [programs, setPrograms] = useState([]);
  const [activeProgram, setActiveProgram] = useState(null);
  const [view, setView] = useState('LIST'); // LIST, EDIT_PROGRAM, SELECT_MUSCLE, SELECT_EXERCISE
    const numColumns = 12;
    // const [exercise, setExercises] = useState<Exercises>([]);
  // --- Logic Handlers ---
  const addProgram = (name) => {
    const newProg = { id: Date.now().toString(), name, exercises: [] };
    setPrograms([...programs, newProg]);
  };

  const deleteProgram = (id) => setPrograms(programs.filter(p => p.id !== id));

  const saveExerciseToProgram = (exercise, stats) => {
    const updatedPrograms = programs.map(p => {
      if (p.id === activeProgram.id) {
        return { ...p, exercises: [...p.exercises, { ...exercise, ...stats, instanceId: Date.now() }] };
      }
      return p;
    });
    setPrograms(updatedPrograms);
    setActiveProgram(updatedPrograms.find(p => p.id === activeProgram.id));
    setView('EDIT_PROGRAM');
  };

  const removeExercise = (instanceId) => {
    const updated = { ...activeProgram, exercises: activeProgram.exercises.filter(e => e.instanceId !== instanceId) };
    setPrograms(programs.map(p => p.id === updated.id ? updated : p));
    setActiveProgram(updated);
  };

  // --- UI Components ---

  // 1. Main List of Programs
  if (view === 'LIST') return (
    <View style={styles.container}>
      <Text style={styles.title}>My Programs</Text>
      <FlatList 
              data={programs}
              renderItem={({ item }) => (
            <TouchableOpacity style={styles.card} onPress={() => {
                console.log("My program clicking")
                setActiveProgram(item);
                setView('EDIT_PROGRAM');
            }}>
            <Text style={styles.cardText}>{item.name}</Text>
            <TouchableOpacity onPress={() => deleteProgram(item.id)}>
                    <MaterialIcons name="delete" size={24} color="white" />
                </TouchableOpacity>
                  </TouchableOpacity>
                  
        )}
      />
      <TouchableOpacity style={styles.fab} onPress={() => addProgram(`Program #${programs.length + 1}`)}>
              <AntDesign name="plus" size={24} color="white" />
          </TouchableOpacity>
    </View>
  );

  // 2. Program Detail / Exercise List
  if (view === 'EDIT_PROGRAM') return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => setView('LIST')}><AntDesign name="plus" size={24} color="black" /></TouchableOpacity>
        <Text style={styles.headerTitle}>{activeProgram.name}</Text>
        <TouchableOpacity><Text style={{color: '#0A84FF'}}>Save</Text></TouchableOpacity>
      </View>

      <FlatList 
        data={activeProgram.exercises}
        renderItem={({item}) => (
          <View style={styles.exerciseItem}>
            <View>
              <Text style={styles.whiteText}>{item.name}</Text>
              <Text style={styles.grayText}>{item.sets} Sets × {item.reps} Reps @ {item.weight}kg</Text>
            </View>
            <TouchableOpacity onPress={() => removeExercise(item.instanceId)}>
              <AntDesign name="plus" size={24} color="white" />
            </TouchableOpacity>
          </View>
        )}
      />

      <TouchableOpacity style={styles.addBtn} onPress={() => setView('SELECT_MUSCLE')}>
        <Text style={styles.addBtnText}>+ ADD EXERCISE</Text>
      </TouchableOpacity>
    </View>
  );

  // 3. Muscle Group Selection
    if (view === 'SELECT_MUSCLE') return (
      
    <View style={styles.container}>
      <Text style={styles.title}>Select Muscle Group</Text>
      <FlatList 
  data={MUSCLE_GROUPS}
  horizontal={true} // Enables horizontal scrolling
  showsHorizontalScrollIndicator={true} // Hides the scrollbar for a cleaner look
  keyExtractor={(item) => item.id}
  renderItem={({item}) => (
    <TouchableOpacity 
      style={styles.horizontalMuscleCard} 
      onPress={() => { 
        setView('SELECT_EXERCISE'); 
        // Store selected muscle logic here
      }}
    >
      {/* Icon placeholder - highly recommended for fitness apps */}
      <View style={styles.iconCircle}>
              {/* <MaterialCommunityIcons name="arm-flex" size={24} color="white" /> */}
              <Image source={item.image} style={ {width: 50,height: 55,borderRadius:15}}
              />
      </View>
      <Text style={styles.whiteText}>{item.name}</Text>
    </TouchableOpacity>
  )}
  contentContainerStyle={styles.horizontalListPadding}
/>
    </View>
    );
    
    if (view === 'SELECT_EXERCISE') return (
     <View style={styles.container}>
      <Text style={styles.title}>Select Exercise</Text>
      <FlatList 
  data={MUSCLE_GROUPS}
  horizontal={true} // Enables horizontal scrolling
  showsHorizontalScrollIndicator={true} // Hides the scrollbar for a cleaner look
  keyExtractor={(item) => item.id}
  renderItem={({item}) => (
    <TouchableOpacity 
      style={styles.horizontalMuscleCard} 
      onPress={() => { 
        setView('SELECT_EXERCISE'); 
        // Store selected muscle logic here
      }}
    >
      {/* Icon placeholder - highly recommended for fitness apps */}
      <View style={styles.iconCircle}>
              {/* <MaterialCommunityIcons name="arm-flex" size={24} color="white" /> */}
              <Image source={item.image} style={ {width: 50,height: 55,borderRadius:15}}
              />
      </View>
      <Text style={styles.whiteText}>{item.name}</Text>
    </TouchableOpacity>
  )}
  contentContainerStyle={styles.horizontalListPadding}
/>
    </View>      
    )

  return null;
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000', padding: 20 },
  title: { color: 'white', fontSize: 24, fontWeight: 'bold', marginBottom: 20, marginTop: 40 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, marginTop: 40 },
  headerTitle: { color: 'white', fontSize: 18, fontWeight: 'bold' },
  card: { backgroundColor: '#1C1C1E', padding: 20, borderRadius: 12, flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  cardText: { color: 'white', fontSize: 18 },
  whiteText: { color: 'white', fontSize: 16, fontWeight: '600' },
  grayText: { color: '#8E8E93', fontSize: 14 },
  exerciseItem: { backgroundColor: '#1C1C1E', padding: 15, borderRadius: 10, marginBottom: 10, flexDirection: 'row', justifyContent: 'space-between' },
  addBtn: { borderStyle: 'dashed', borderWidth: 1, borderColor: '#444', padding: 15, borderRadius: 10, alignItems: 'center', marginTop: 10 },
  addBtnText: { color: '#8E8E93', fontWeight: 'bold' },
  muscleGrid: { flex: 1, backgroundColor: '#1C1C1E', margin: 5, padding: 20, borderRadius: 15, alignItems: 'center' },
    fab: { position: 'absolute', bottom: 30, right: 30, backgroundColor: '#0A84FF', width: 60, height: 60, borderRadius: 30, justifyContent: 'center', alignItems: 'center' },
  horizontalListPadding: {
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  horizontalMuscleCard: {
    backgroundColor: '#1C1C1E',
    padding: 15,
    borderRadius: 15,
    marginHorizontal: 8,
    alignItems: 'center',
    width: 100, // Fixed width looks best for horizontal chips
    height: 110,
    justifyContent: 'center',
  },
  iconCircle: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    backgroundColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  }
});