import React, { useEffect, useRef, useState } from 'react';
import { Heart, Activity, Apple, Dumbbell, Scale, Wind, PlayCircle, Target, X } from 'lucide-react';
import ExerciseSymptom from "../../../components/PDashboard/ExerciseSymptom";

export default function ParkinsonsGuide() {
  // --- UI state ---
  const [activeSection, setActiveSection] = useState('home');
  const [showVideo, setShowVideo] = useState(false);
  const [videoUrl, setVideoUrl] = useState('');
  const [guidedMode, setGuidedMode] = useState({ running: false, program: null, stepIndex: 0, secondsLeft: 0 });
  const [routine, setRoutine] = useState(() => JSON.parse(localStorage.getItem('myRoutine') || '[]'));
  const [progress, setProgress] = useState(() => JSON.parse(localStorage.getItem('exerciseProgress') || '{"minutesToday":0,"streak":0,"lastCompleted":""}'));
  const [filters, setFilters] = useState({ difficulty: 'All', sortBy: 'none', symptom: 'all' });
  const [weeklyPlan, setWeeklyPlan] = useState(() => JSON.parse(localStorage.getItem('weeklyPlan') || '{}'));

  const timerRef = useRef(null);
  // const audioRef = useRef(null);

  // --- Data ---
  const exercisePrograms = [
    {
      id: 1,
      title: "Morning Stretching Routine",
      duration: 15,
      durationLabel: '15 min',
      difficulty: "Beginner",
      video: 'https://www.youtube.com/embed/5QBuK-nA4FM?autoplay=1&mute=1',
      benefits: ["Reduces stiffness", "Improves flexibility"],
      steps: [
        { label: 'Neck rolls', seconds: 120 },
        { label: 'Shoulder rotations', seconds: 180 },
        { label: 'Torso twists', seconds: 180 },
        { label: 'Leg stretches', seconds: 300 },
        { label: 'Deep breathing', seconds: 120 }
      ],
      image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=1200&h=800&fit=crop',
      icon: Activity,
      symptoms: ['rigidity', 'stiffness']
    },
    {
      id: 2,
      title: "Balance & Stability",
      duration: 20,
      durationLabel: '20 min',
      difficulty: "Intermediate",
      video: 'https://www.youtube.com/embed/3QIgrJsIgz0?autoplay=1',
      benefits: ["Prevents falls", "Strengthens core"],
      steps: [
        { label: 'Single leg stands', seconds: 300 },
        { label: 'Heel-to-toe walk', seconds: 300 },
        { label: 'Chair exercises', seconds: 300 },
        { label: 'Wall push-ups', seconds: 300 }
      ],
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200&h=800&fit=crop',
      icon: Target,
      symptoms: ['balance', 'falls']
    },
    {
      id: 3,
      title: "Cardio Walking Program",
      duration: 30,
      durationLabel: '30 min',
      difficulty: "All Levels",
      video: 'https://www.youtube.com/embed/jyOk-2DmVnU?autoplay=1',
      benefits: ["Improves endurance", "Boosts mood"],
      steps: [
        { label: 'Warm-up walk', seconds: 300 },
        { label: 'Brisk walking', seconds: 1200 },
        { label: 'Cool down', seconds: 300 }
      ],
      image: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=1200&h=800&fit=crop',
      icon: Heart,
      symptoms: ['fatigue', 'slowness']
    },
    {
      id: 4,
      title: "Strength Training",
      duration: 25,
      durationLabel: '25 min',
      difficulty: "Intermediate",
      video: 'https://www.youtube.com/embed/E1D5y518nNg?autoplay=1&mute=1',
      benefits: ["Builds muscle", "Increases metabolism"],
      steps: [
        { label: 'Light weights', seconds: 600 },
        { label: 'Resistance bands', seconds: 600 },
        { label: 'Bodyweight exercises', seconds: 300 }
      ],
      image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=1200&h=800&fit=crop',
      icon: Dumbbell,
      symptoms: ['weakness', 'mobility']
    },
    {
      id: 5,
      title: "Coordination Exercises",
      duration: 20,
      durationLabel: "20 min",
      difficulty: "Intermediate",
      video: "https://www.youtube.com/embed/jyOk-2DmVnU?autoplay=1&mute=1",
      benefits: ["Improves coordination", "Enhances motor control"],
      steps: [
        { label: "Hand–eye drills", seconds: 300 },
        { label: "Finger tapping patterns", seconds: 300 },
        { label: "Object transfer tasks", seconds: 300 },
        { label: "Cross-body movements", seconds: 300 }
      ],
      image: "https://images.unsplash.com/photo-1599058917212-d750089bc07e?w=1200&h=800&fit=crop",
      icon: Target,
      symptoms: ["coordination", "slowness"]
    },

    {
      id: 6,
      title: "Gait & Walking Training",
      duration: 25,
      durationLabel: "25 min",
      difficulty: "All Levels",
      video: "https://www.youtube.com/embed/R75KyTmSikY?autoplay=1&mute=1",
      benefits: ["Improves walking", "Reduces freezing episodes"],
      steps: [
        { label: "Posture alignment", seconds: 300 },
        { label: "Heel-to-toe walking", seconds: 600 },
        { label: "Cue-based walking (rhythm)", seconds: 600 },
        { label: "Turn & stop control", seconds: 300 }
      ],
      image: "assets/gait6.jpg",
      icon: Activity,
      symptoms: ["freezing", "walking"]
    },

    {
      id: 7,
      title: "Posture Correction",
      duration: 15,
      durationLabel: "15 min",
      difficulty: "Beginner",
      video: "https://www.youtube.com/embed/E1D5y518nNg?autoplay=1&mute=1",
      benefits: ["Improves posture", "Reduces back strain"],
      steps: [
        { label: "Wall posture check", seconds: 300 },
        { label: "Shoulder retraction", seconds: 300 },
        { label: "Spine mobility drills", seconds: 300 }
      ],
      image: "https://images.unsplash.com/photo-1549576490-b0b4831ef60a?auto=format&w=1200&h=800",
      icon: Scale,
      symptoms: ["posture", "balance"]
    },

    {
      id: 8,
      title: "Breathing Exercises",
      duration: 10,
      durationLabel: "10 min",
      difficulty: "Beginner",
      video: "https://www.youtube.com/embed/jyOk-2DmVnU?autoplay=1&mute=1",
      benefits: ["Reduces fatigue", "Improves oxygen flow"],
      steps: [
        { label: "Diaphragmatic breathing", seconds: 180 },
        { label: "Box breathing", seconds: 180 },
        { label: "Relaxed nasal breathing", seconds: 240 }
      ],
      image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=1200&h=800&fit=crop",
      icon: Wind,
      symptoms: ["fatigue", "stress"]
    },

    {
      id: 9,
      title: "Relaxation & Mindfulness",
      duration: 15,
      durationLabel: "15 min",
      difficulty: "All Levels",
      video: "https://www.youtube.com/embed/E1D5y518nNg?autoplay=1&mute=1",
      benefits: ["Reduces anxiety", "Improves mental clarity"],
      steps: [
        { label: "Guided relaxation", seconds: 300 },
        { label: "Body scan awareness", seconds: 300 },
        { label: "Mindful breathing", seconds: 300 }
      ],
      image: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=1200&h=800&fit=crop",
      icon: Heart,
      symptoms: ["anxiety", "stress"]
    },

    {
      id: 10,
      title: "Fine Motor Skills Training",
      duration: 15,
      durationLabel: "15 min",
      difficulty: "Intermediate",
      video: "https://www.youtube.com/embed/wXOtMcrkMGc?autoplay=1&mute=1",
      benefits: ["Improves handwriting", "Enhances dexterity"],
      steps: [
        { label: "Finger flexion exercises", seconds: 300 },
        { label: "Grip strength drills", seconds: 300 },
        { label: "Precision movement tasks", seconds: 300 }
      ],
      image: "/assets/motor10.webp",
      icon: Dumbbell,
      symptoms: ["handwriting", "dexterity"]
    },

    {
      id: 11,
      title: "Dual-Task Training",
      duration: 20,
      durationLabel: "20 min",
      difficulty: "Advanced",
      video: "https://www.youtube.com/embed/jyOk-2DmVnU?autoplay=1&mute=1",
      benefits: ["Improves attention", "Enhances multitasking"],
      steps: [
        { label: "Walking + counting", seconds: 300 },
        { label: "Movement + memory tasks", seconds: 600 },
        { label: "Balance + reaction drills", seconds: 300 }
      ],
      image: "/assets/Dualtask11.webp",
      icon: Target,
      symptoms: ["attention", "coordination"]
    },
    {
      id: 12,
      title: "Tai Chi Flow",
      duration: 20,
      durationLabel: "20 min",
      difficulty: "Beginner",
      video: "https://www.youtube.com/embed/qw1GuSq6-uw?autoplay=1&mute=1",
      benefits: ["Improves balance", "Reduces tremor"],
      steps: [
        { label: "Weight shifting", seconds: 300 },
        { label: "Slow arm movements", seconds: 300 },
        { label: "Controlled stepping", seconds: 300 },
        { label: "Breathing integration", seconds: 300 }
      ],
      image: "/assets/taichi12.webp",
      icon: Wind,
      symptoms: ["balance", "tremor", "rigidity"]
    },

    {
      id: 13,
      title: "Chair-Based Exercises",
      duration: 15,
      durationLabel: "15 min",
      difficulty: "Beginner",
      video: "https://www.youtube.com/embed/h9NQc0LYrwE?autoplay=1&mute=1",
      benefits: ["Safe mobility", "Improves circulation"],
      steps: [
        { label: "Seated leg lifts", seconds: 300 },
        { label: "Arm raises", seconds: 300 },
        { label: "Seated twists", seconds: 300 }
      ],
      image: "assets/chairexer13.jpg",
      icon: Activity,
      symptoms: ["weakness", "balance", "mobility"]
    },

    {
      id: 14,
      title: "Dance Therapy",
      duration: 25,
      durationLabel: "25 min",
      difficulty: "All Levels",
      video: "https://www.youtube.com/embed/2Up3dZ-gMDc?autoplay=1&mute=1",
      benefits: ["Improves coordination", "Boosts mood"],
      steps: [
        { label: "Rhythmic stepping", seconds: 600 },
        { label: "Upper body flow", seconds: 600 },
        { label: "Free movement", seconds: 300 }
      ],
      image: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=1200&h=800&fit=crop",
      icon: Heart,
      symptoms: ["coordination", "mood", "rigidity"]
    },

    {
      id: 15,
      title: "Boxing Therapy (Non-Contact)",
      duration: 20,
      durationLabel: "20 min",
      difficulty: "Intermediate",
      video: "https://www.youtube.com/embed/25-7ZaY8_3o?autoplay=1&mute=1",
      benefits: ["Improves reaction time", "Enhances coordination"],
      steps: [
        { label: "Footwork drills", seconds: 300 },
        { label: "Punch combinations", seconds: 600 },
        { label: "Speed & balance drills", seconds: 300 }
      ],
      image: "https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=1200&h=800&fit=crop",
      icon: Target,
      symptoms: ["slowness", "coordination", "rigidity"]
    },

    {
      id: 16,
      title: "Yoga for Flexibility",
      duration: 30,
      durationLabel: "30 min",
      difficulty: "Beginner",
      video: "https://www.youtube.com/embed/_p8cEcvH1C4?autoplay=1&mute=1",
      benefits: ["Improves flexibility", "Reduces stiffness"],
      steps: [
        { label: "Gentle warm-up", seconds: 300 },
        { label: "Standing poses", seconds: 600 },
        { label: "Seated stretches", seconds: 600 },
        { label: "Relaxation pose", seconds: 300 }
      ],
      image: "assets/yoga16.jpg",
      icon: Wind,
      symptoms: ["stiffness", "rigidity", "stress"]
    },

    {
      id: 17,
      title: "Reaction & Reflex Training",
      duration: 15,
      durationLabel: "15 min",
      difficulty: "Advanced",
      video: "https://www.youtube.com/embed/kw5tuGpYiBI?autoplay=1&mute=1",
      benefits: ["Improves reflexes", "Enhances response speed"],
      steps: [
        { label: "Visual reaction drills", seconds: 300 },
        { label: "Hand response tasks", seconds: 300 },
        { label: "Balance + reaction", seconds: 300 }
      ],
      image: "assets/reflex17.jpg",
      icon: Target,
      symptoms: ["slowness", "attention"]
    },

    {
      id: 18,
      title: "Facial & Speech Muscle Exercises",
      duration: 10,
      durationLabel: "10 min",
      difficulty: "Beginner",
      video: "https://www.youtube.com/embed/9YWu9b_4rwI?autoplay=1&mute=1",
      benefits: ["Improves speech clarity", "Strengthens facial muscles"],
      steps: [
        { label: "Facial stretching", seconds: 180 },
        { label: "Lip & jaw movements", seconds: 180 },
        { label: "Breathing & vocal drills", seconds: 240 }
      ],
      image: "assets/facial18.webp",
      icon: Heart,
      symptoms: ["speech", "facial-control"]
    }

  ];

  const exerciseTypes = [
    { id: 'aerobic', title: 'Aerobic Exercise', icon: Activity, symptoms: ['fatigue'] },
    { id: 'strength', title: 'Strength Training', icon: Dumbbell, symptoms: ['weakness'] },
    { id: 'balance', title: 'Balance Training', icon: Scale, symptoms: ['balance'] },
    { id: 'stretching', title: 'Stretching & Flexibility', icon: Wind, symptoms: ['stiffness'] },
    { id: 'coordination', title: 'Coordination Exercises', icon: Target, symptoms: ['coordination', 'slowness'] },
    { id: 'gait', title: 'Gait & Walking Training', icon: Activity, symptoms: ['freezing', 'walking'] },
    { id: 'posture', title: 'Posture Correction', icon: Scale, symptoms: ['posture', 'balance'] },
    { id: 'breathing', title: 'Breathing Exercises', icon: Wind, symptoms: ['fatigue', 'stress'] },
    { id: 'relaxation', title: 'Relaxation & Mindfulness', icon: Heart, symptoms: ['anxiety', 'stress'] },
    { id: 'fine-motor', title: 'Fine Motor Skills', icon: Dumbbell, symptoms: ['handwriting', 'dexterity'] },
    { id: 'dual-task', title: 'Dual-Task Training', icon: Target, symptoms: ['attention', 'coordination'] },
    { id: 'tai-chi', title: 'Tai Chi & Flow', icon: Wind, symptoms: ['balance', 'tremor', 'rigidity'] },
    { id: 'chair', title: 'Chair-Based Exercises', icon: Activity, symptoms: ['weakness', 'mobility'] },
    { id: 'dance', title: 'Dance Therapy', icon: Heart, symptoms: ['coordination', 'mood'] },
    { id: 'boxing', title: 'Boxing Therapy', icon: Target, symptoms: ['slowness', 'coordination'] },
    { id: 'yoga', title: 'Yoga Therapy', icon: Wind, symptoms: ['stiffness', 'stress'] },
    { id: 'reaction', title: 'Reaction Training', icon: Target, symptoms: ['slowness', 'attention'] },
    { id: 'speech', title: 'Facial & Speech Exercises', icon: Heart, symptoms: ['speech', 'facial-control'] }
  ];

  const motivationalQuotes = [
    'You are stronger than the symptoms.',
    'One step at a time — progress is progress.',
    'Consistency builds confidence.'
  ];

  // --- Effects: persist local state ---
  useEffect(() => {
    localStorage.setItem('myRoutine', JSON.stringify(routine));
  }, [routine]);

  useEffect(() => {
    localStorage.setItem('exerciseProgress', JSON.stringify(progress));
  }, [progress]);

  useEffect(() => {
    localStorage.setItem('weeklyPlan', JSON.stringify(weeklyPlan));
  }, [weeklyPlan]);

  // --- Helpers ---
    const openVideo = (url) => {
      setVideoUrl(url);
      setShowVideo(true);
    };
  
    const toggleRoutineItem = (programId) => {
      setRoutine(r => {
        if (r.includes(programId)) return r.filter(id => id !== programId);
        return [...r, programId];
      });
    };
  
    const addMinutesToProgress = (minutes) => {
      const today = new Date().toISOString().slice(0, 10);
      setProgress(p => {
        let newStreak = p.streak;
        if (p.lastCompleted !== today && minutes > 0) {
          // simple streak logic: if lastCompleted was yesterday or earlier, increment; otherwise keep
          const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
          if (p.lastCompleted === yesterday) newStreak = (p.streak || 0) + 1;
          else if (p.lastCompleted === today) newStreak = p.streak || 0; // same day
          else newStreak = 1;
        }
        return { minutesToday: (p.lastCompleted === today ? p.minutesToday : 0) + minutes, streak: newStreak, lastCompleted: today };
      });
    };
  
    // --- Guided workout logic ---
    useEffect(() => {
      if (!guidedMode.running) {
        if (timerRef.current) {
          window.clearInterval(timerRef.current);
          timerRef.current = null;
        }
        return;
      }
  
      timerRef.current = window.setInterval(() => {
        setGuidedMode(g => {
          if (g.secondsLeft <= 1) {
            // move to next step
            const prog = g.program;
            const nextIdx = g.stepIndex + 1;
            if (!prog || nextIdx >= prog.steps.length) {
              // finished
              if (timerRef.current) {
                window.clearInterval(timerRef.current);
                timerRef.current = null;
              }
              // update progress minutes
              addMinutesToProgress(Math.ceil(prog?.steps.reduce((s, st) => s + st.seconds, 0) / 60 || 0));
              // stop guided mode
              // speak('Workout complete. Well done!');
              return { running: false, program: null, stepIndex: 0, secondsLeft: 0 };
            }
            const nextSeconds = prog.steps[nextIdx].seconds;
            // speak(`Next: ${prog.steps[nextIdx].label}.`);
            return { ...g, stepIndex: nextIdx, secondsLeft: nextSeconds };
          }
          return { ...g, secondsLeft: g.secondsLeft - 1 };
        });
      }, 1000);
  
      return () => {
        if (timerRef.current) {
          window.clearInterval(timerRef.current);
          timerRef.current = null;
        }
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [guidedMode.running]);
  
    const startGuided = (program) => {
      setGuidedMode({ running: true, program, stepIndex: 0, secondsLeft: program.steps[0].seconds });
      // speak(`Starting ${program.title}. First: ${program.steps[0].label}.`);
    };
  
    const pauseGuided = () => {
      setGuidedMode(g => ({ ...g, running: false }));
      // speak('Workout paused.');
    };
  
    const resumeGuided = () => {
      setGuidedMode(g => ({ ...g, running: true }));
      // speak('Resuming workout.');
    };
  
    const stopGuided = () => {
      setGuidedMode({ running: false, program: null, stepIndex: 0, secondsLeft: 0 });
      // speak('Workout stopped.');
    };

  const SafetyBox = () => (
    <div className="bg-gradient-to-br from-slate-50 to-blue-50">
      <h3 className={`font-semibold text-lg bg-gradient-to-br from-slate-50 to-blue-50`}>🔒 Safety Precautions</h3>
      <ul className="mt-2 space-y-1 text-sm text-gray-700">
        <li>• Clear the area of obstacles and wear supportive shoes.</li>
        <li>• Keep a stable chair or wall nearby for balance support.</li>
        <li>• Start slow and stop if you feel dizzy or overly fatigued.</li>
        <li>• Exercise when medications are at their best, usually 30–60 minutes after taking them.</li>
      </ul>
    </div>
  );

  // --- Render pages ---
  const HomePage = () => (
    <div className= "bg-gradient-to-br from-slate-50 to-blue-50">
      <div className= "relative bg-gradient-to-br from-blue-900 to-blue-600 overflow-hidden">
        <div className="relative z-10 max-w-4xl mx-auto px-6 py-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Take Control of Your Parkinson&apos;s</h1>
          <p className="text-xl md:text-2xl text-yellow-300 italic max-w-3xl mx-auto">Having Parkinson&apos;s does not mean the end of movement — it means finding new ways to move, grow, and live with strength and hope.</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12">
       <div className="max-w-7xl mx-auto px-6 py-12">
  {/* Navigation Tabs */}
  <div className="flex justify-center mb-12">
    <div className="inline-flex items-center gap-2 bg-white rounded-full p-2 shadow-lg">
      <button 
        className="px-6 py-2.5 bg-gradient-to-l from-gray-200  text-black rounded-full shadow-md font-medium transition-all hover:to-blue-700 hover:text-white" 
        onClick={() => setActiveSection('exercise')}
      >
        Exercise
      </button>
      <button 
        className="px-6 py-2.5 bg-gradient-to-l from-gray-100 text-black rounded-full font-medium transition-all hover:to-green-500 hover:text-white" 
        onClick={() => setActiveSection('diet')}
      >
        Diet
      </button>
    </div>
  </div>

  <div className="grid lg:grid-cols-3 gap-8">
    {/* Quick Programs Section */}
    <div className="lg:col-span-2">
      <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Quick Programs</h2>
          <p className="text-gray-600">Programs recommended for Parkinson&apos;s symptoms and general mobility.</p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          {exercisePrograms.map(p => (
            <div 
              key={p.id} 
              className={`group rounded-2xl overflow-hidden border-2 transition-all duration-300 hover:shadow-xl ${
                routine.includes(p.id) 
                  ? 'border-green-500 shadow-lg shadow-green-100' 
                  : 'border-gray-200 hover:border-blue-300'
              }`}
            >
              <div className="relative overflow-hidden">
                <img 
                  src={p.image} 
                  alt={p.title} 
                  className="object-cover w-full h-48 group-hover:scale-110 transition-transform duration-300" 
                />
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-gray-700">
                  {p.durationLabel}
                </div>
              </div>
              
              <div className="p-5">
                <h3 className="font-bold text-lg text-gray-800 mb-2">{p.title}</h3>
                <p className="text-sm text-gray-600 mb-4 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                  {p.benefits.join(' • ')}
                </p>
                
                <div className="flex gap-2">
                  <button 
                    onClick={() => openVideo(p.video)} 
                    className="flex-1 px-4 py-2.5 text-sm font-medium bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-100 transition-colors"
                  >
                    Watch
                  </button>
                  <button 
                    onClick={() => toggleRoutineItem(p.id)} 
                    className={`flex-1 px-4 py-2.5 text-sm font-medium rounded-xl transition-colors ${
                      routine.includes(p.id)
                        ? 'bg-red-50 text-red-600 hover:bg-red-100'
                        : 'bg-green-50 text-green-600 hover:bg-green-100'
                    }`}
                  >
                    {routine.includes(p.id) ? 'Remove' : 'Add'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>

    {/* My Routine Sidebar */}
    <div className="lg:col-span-1">
      <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-3xl p-6 shadow-xl border border-indigo-100 sticky top-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-indigo-500 rounded-full flex items-center justify-center">
            <span className="text-white text-xl">📋</span>
          </div>
          <div>
            <h3 className="font-bold text-xl text-gray-800">My Routine</h3>
            <p className="text-sm text-gray-600">Selected programs</p>
          </div>
        </div>

        <div className="space-y-3 mb-6">
          {routine.length === 0 && (
            <div className="text-center py-8">
              <div className="text-4xl mb-2">🎯</div>
              <p className="text-sm text-gray-500">No programs yet — add some to get started!</p>
            </div>
          )}
          
          {routine.map(id => {
            const p = exercisePrograms.find(x => x.id === id);
            if (!p) return null;
            return (
              <div 
                key={id} 
                className="bg-white rounded-2xl p-4 shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-800">{p.title}</h4>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-gray-500">{p.durationLabel}</span>
                      <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                      <span className="text-xs text-gray-500">{p.difficulty}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <button 
                    onClick={() => startGuided(p)} 
                    className="flex-1 px-3 py-2 bg-green-500 hover:bg-green-600 text-white text-sm font-medium rounded-lg transition-colors shadow-sm"
                  >
                    ▶ Start
                  </button>
                  <button 
                    onClick={() => toggleRoutineItem(p.id)} 
                    className="px-3 py-2 bg-red-50 hover:bg-red-100 text-red-600 text-sm font-medium rounded-lg transition-colors"
                  >
                    ✕
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Progress Stats */}
        <div className="bg-white rounded-2xl p-5 shadow-md">
          <h4 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <span className="text-xl">📊</span>
            Your Progress
          </h4>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-xl">
              <span className="text-sm text-gray-600">Minutes today</span>
              <span className="font-bold text-lg text-blue-600">{progress.minutesToday}</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-orange-50 rounded-xl">
              <span className="text-sm text-gray-600">Streak</span>
              <span className="font-bold text-lg text-orange-600">{progress.streak} 🔥</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

        <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl shadow-xl p-6 mb-16">
          <div className="flex items-center gap-3 mb-4">
            <Heart className="w-8 h-8 text-orange-600" />
            <h2 className="text-2xl font-bold text-gray-800">Exercise Tips for Parkinson&apos;s</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-lg">
              <h4 className="font-semibold mb-2">🎯 Set Realistic Goals</h4>
              <p className="text-sm text-gray-600">Start with 10-15 minutes daily and gradually increase. Consistency matters more than intensity.</p>
            </div>
            <div className="bg-white p-4 rounded-lg">
              <h4 className="font-semibold mb-2">⏰ Best Time to Exercise</h4>
              <p className="text-sm text-gray-600">Exercise when your medication is working best, typically 30-60 minutes after taking it.</p>
            </div>
            <div className="bg-white p-4 rounded-lg">
              <h4 className="font-semibold mb-2">💧 Stay Hydrated</h4>
              <p className="text-sm text-gray-600">Drink water before, during, and after exercise to prevent dehydration and fatigue.</p>
            </div>
            <div className="bg-white p-4 rounded-lg">
              <h4 className="font-semibold mb-2">🤝 Exercise with Others</h4>
              <p className="text-sm text-gray-600">Join a group class or exercise with a partner for motivation and safety.</p>
            </div>
          </div>
        </div>

        <div className="text-center text-sm text-gray-600 mt-8">{motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)]}</div>
      </div>
    </div>
  );

  const ExercisePage = () => (
  <div className="bg-gradient-to-br from-slate-50 to-blue-50 min-h-screen py-8">
    <div className="max-w-6xl mx-auto px-6">
      {/* Header Navigation */}
<div className="flex items-center justify-between mb-8">
  <button 
    onClick={() => setActiveSection('home')} 
    className="text-blue-600 hover:text-blue-800 flex items-center gap-2 font-semibold transition-colors">
    ← Back to Home
  </button>
      </div>

      {/* Safety Box */}
      <div className="max-w-4xl mx-auto mb-8">
        <div className="bg-white rounded-xl shadow-md p-6 border border-yellow-200">
          <h3 className="font-semibold text-xl text-gray-800 mb-4 flex items-center gap-2">
            🔒 Safety Precautions
          </h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex items-start gap-2">
              <span className="text-yellow-600 mt-1">•</span>
              <span>Clear the area of obstacles and wear supportive shoes.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-yellow-600 mt-1">•</span>
              <span>Keep a stable chair or wall nearby for balance support.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-yellow-600 mt-1">•</span>
              <span>Start slow and stop if you feel dizzy or overly fatigued.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-yellow-600 mt-1">•</span>
              <span>Exercise when medications are at their best, usually 30–60 minutes after taking them.</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Exercise Symptom Component */}
      <div className="max-w-4xl mx-auto mb-8">
        <ExerciseSymptom
          exercisePrograms={exercisePrograms}
          routine={routine}
          toggleRoutineItem={toggleRoutineItem}
          openVideo={openVideo}
        />
      </div>

      {/* Detailed Exercise Types */}
      <div className="max-w-4xl mx-auto mb-8">
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">Detailed Exercise Types</h2>
        <div className="space-y-6">
          {exerciseTypes.map(e => {
            const Icon = e.icon;
            return (
              <div key={e.id} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 bg-blue-50 p-3 rounded-lg">
                    <Icon className="w-8 h-8 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg text-gray-800 mb-2">{e.title}</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Short description and practical tips for {e.title.toLowerCase()}.
                    </p>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Warm-up & Cool-down */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl shadow-md border border-blue-100">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 text-2xl">🔥</div>
              <div>
                <h4 className="font-semibold text-lg text-gray-800 mb-2">Warm-up & Cool-down</h4>
                <p className="text-sm text-gray-700">
                  Don't skip: 5–10 min warm-up and 5–10 min cool-down help reduce injury and stiffness.
                </p>
              </div>
            </div>
          </div>

          {/* Weekly Planner */}
          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
            <h4 className="font-semibold text-lg text-gray-800 mb-4">Weekly Planner</h4>
            <div className="grid grid-cols-7 gap-2">
              {['Mon','Tue','Wed','Thu','Fri','Sat','Sun'].map(d => (
                <button 
                  key={d} 
                  onClick={() => setWeeklyPlan(w => ({...w, [d]: w[d] ? undefined : (routine[0] || exercisePrograms[0].id)}))} 
                  className={`p-3 rounded-lg font-medium text-sm transition-all ${
                    weeklyPlan[d] 
                      ? 'bg-green-500 text-white shadow-md transform scale-105' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>
            <p className="mt-4 text-xs text-gray-500 text-center">
              Click a day to toggle a program. Saved to localStorage.
            </p>
          </div>
        </div>
      </div>

      {/* Guided Mode Panel */}
      {guidedMode.program && (
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 w-full max-w-2xl mx-auto px-6 z-50">
          <div className="bg-white rounded-2xl shadow-2xl p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="text-sm text-gray-500 mb-1">Guided Mode — {guidedMode.program.title}</div>
                <div className="font-bold text-xl text-gray-800">{guidedMode.program.steps[guidedMode.stepIndex].label}</div>
                <div className="text-sm text-gray-500 mt-1">
                  Time left: {Math.floor(guidedMode.secondsLeft/60)}:{String(guidedMode.secondsLeft%60).padStart(2,'0')}
                </div>
              </div>
              <div className="flex items-center gap-2">
                {!guidedMode.running ? (
                  <button 
                    onClick={resumeGuided} 
                    className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors"
                  >
                    Resume
                  </button>
                ) : (
                  <button 
                    onClick={pauseGuided} 
                    className="px-4 py-2 bg-yellow-400 hover:bg-yellow-500 text-gray-800 rounded-lg font-medium transition-colors"
                  >
                    Pause
                  </button>
                )}
                <button 
                  onClick={stopGuided} 
                  className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition-colors"
                >
                  Stop
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  </div>
);

  const DietPage = () => (
    <div className= "bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-4xl mx-auto">
        <button onClick={() => setActiveSection('home')} className="mb-8 text-green-600 hover:text-green-800 flex items-center gap-2 font-semibold">← Back to Home</button>

        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <Apple className="w-10 h-10 text-green-600" />
            <h1 className="text-4xl font-bold text-gray-800">Healthy Diet Tips</h1>
          </div>
          <p className="text-xl text-gray-700 mb-8">A balanced diet can help support your overall health and make Parkinson&apos;s medications more effective.</p>

          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Nutrition Guidelines</h2>
              <div className="space-y-4">
                {[ 'Eat a variety of fruits, vegetables, whole grains, and lean proteins', 'Drink plenty of water to stay hydrated throughout the day', 'Increase fiber intake to help with digestion and prevent constipation', 'Limit processed foods, sugar, and saturated fats', 'Be aware that high-protein meals may interfere with certain medications — plan meal timing accordingly' ].map((guideline, i) => (
                  <div key={i} className="flex items-start gap-3 p-4 bg-green-50 rounded-lg">
                    <span className="text-green-600 font-bold text-xl">{i + 1}</span>
                    <p className="text-gray-700 flex-1">{guideline}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-blue-50 rounded-xl p-6 border-l-4 border-blue-600">
              <h3 className="text-xl font-bold text-gray-800 mb-2">💡 Important Note</h3>
              <p className="text-gray-700">Always consult with your healthcare provider or a registered dietitian before making significant changes to your diet, especially regarding medication timing and protein intake.</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-600 to-green-500 rounded-2xl shadow-lg p-8 md:p-12 text-white">
  <div className="max-w-3xl mx-auto text-center flex flex-col items-center gap-6">
    <h2 className="text-3xl md:text-4xl font-bold leading-tight">
      Stay Active, Stay Healthy
    </h2>

    <p className="text-base md:text-lg text-green-100 leading-relaxed">
      Even small amounts of daily activity can make a big difference.  
      Combine movement, mindfulness, and good nutrition to support your well-being.
    </p>

    <button
      onClick={() => setActiveSection('exercise')}
      className="mt-2 inline-flex items-center gap-2 bg-white text-green-700 px-8 py-3 rounded-xl font-semibold 
                 shadow-md hover:shadow-lg hover:bg-green-50 transition-all duration-200"
    >
      Explore Exercise Programs
    </button>
  </div>
</div>
      </div>
    </div>
  );

  // --- Modal video ---
  const VideoModal = () => {
    if (!showVideo) return null;
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
        <div className="bg-white rounded-lg w-[90%] md:w-3/4 max-w-4xl overflow-hidden">
          <div className="flex justify-between items-center p-3 border-b">
            <div className="font-semibold">Video</div>
            <button onClick={() => setShowVideo(false)} className="p-2"><X /></button>
          </div>
          <div className="p-3">
            <div className="aspect-video">
              <iframe title="video" src={videoUrl} className="w-full h-full" allowFullScreen />
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen">
      {activeSection === 'home' && <HomePage />}
      {activeSection === 'exercise' && <ExercisePage />}
      {activeSection === 'diet' && <DietPage />}

      {showVideo && <VideoModal />}

      <footer className="bg-blue-900 text-white py-4 text-center mt-10"> 
        <p>© 2025 Parkinson&apos;s Wellness | Designed for awareness and education</p>
      </footer>
    </div>
  );
}
