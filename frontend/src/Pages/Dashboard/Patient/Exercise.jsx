import React, { useEffect, useRef, useState } from 'react';
import { Heart, Activity, Apple, Dumbbell, Scale, Wind, PlayCircle, Target, X } from 'lucide-react';

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
      video: 'https://www.youtube.com/embed/5qap5aO4i9A',
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
      video: 'https://www.youtube.com/embed/2Vv-BfVoq4g',
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
      video: 'https://www.youtube.com/embed/2Vv-BfVoq4g',
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
      video: 'https://www.youtube.com/embed/5qap5aO4i9A',
      benefits: ["Builds muscle", "Increases metabolism"],
      steps: [
        { label: 'Light weights', seconds: 600 },
        { label: 'Resistance bands', seconds: 600 },
        { label: 'Bodyweight exercises', seconds: 300 }
      ],
      image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=1200&h=800&fit=crop',
      icon: Dumbbell,
      symptoms: ['weakness', 'mobility']
    }
  ];

  const exerciseTypes = [
    { id: 'aerobic', title: 'Aerobic Exercise', icon: Activity, symptoms: ['fatigue'] },
    { id: 'strength', title: 'Strength Training', icon: Dumbbell, symptoms: ['weakness'] },
    { id: 'balance', title: 'Balance Training', icon: Scale, symptoms: ['balance'] },
    { id: 'stretching', title: 'Stretching & Flexibility', icon: Wind, symptoms: ['stiffness'] }
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

  // --- Filter & sort program list ---
  const filteredPrograms = exercisePrograms.filter(p => {
    if (filters.difficulty !== 'All' && p.difficulty !== filters.difficulty) return false;
    if (filters.symptom !== 'all' && !p.symptoms.includes(filters.symptom)) return false;
    return true;
  }).sort((a, b) => {
    if (filters.sortBy === 'duration') return a.duration - b.duration;
    if (filters.sortBy === 'difficulty') return a.difficulty.localeCompare(b.difficulty);
    return 0;
  });

  // --- UI components ---
  // const FloatingBubbles = () => (
  //   <div className="absolute inset-0 overflow-hidden pointer-events-none">
  //     {[...Array(6)].map((_, i) => (
  //       <div
  //         key={i}
  //         className="absolute rounded-full bg-white/20"
  //         style={{
  //           width: `${12 + Math.random() * 30}px`,
  //           height: `${12 + Math.random() * 30}px`,
  //           top: `${Math.random() * 100}%`,
  //           left: `${-80 + Math.random() * 20}px`,
  //           animation: `driftRight ${12 + Math.random() * 8}s linear infinite`,
  //           animationDelay: `${Math.random() * 5}s`
  //         }}
  //       />
  //     ))}
  //   </div>
  // );

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
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <button className="px-3 py-1 bg-white rounded-full shadow" onClick={() => setActiveSection('exercise')}>Exercise</button>
            <button className="px-3 py-1 bg-white/30 rounded-full shadow" onClick={() => setActiveSection('diet')}>Diet</button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="md:col-span-2 bg-white rounded-2xl p-6 shadow">
            <h2 className="text-2xl font-bold mb-2">Quick Programs</h2>
            <p className="text-gray-600 mb-4">Programs recommended for Parkinson&apos;s symptoms and general mobility.</p>
            <div className="grid md:grid-cols-2 gap-4">
              {exercisePrograms.map(p => (
                <div key={p.id} className={`rounded-lg overflow-hidden border ${routine.includes(p.id) ? 'border-green-500' : 'border-gray-200'}`}>
                  <img src={p.image} alt={p.title} className="object-cover w-full h-36" />
                  <div className="p-3">
                    <div className="flex justify-between items-start">
                      <h3 className="font-semibold">{p.title}</h3>
                      <div className="text-xs text-gray-600">{p.durationLabel}</div>
                    </div>
                    <p className="text-sm text-gray-600 mt-2">{p.benefits.join(' • ')}</p>
                    <div className="flex gap-2 mt-3">
                      <button onClick={() => openVideo(p.video)} className="px-2 py-1 text-sm bg-blue-50 rounded">Watch</button>
                      <button onClick={() => startGuided(p)} className="px-2 py-1 text-sm bg-green-600 text-white rounded">Guided</button>
                      <button onClick={() => toggleRoutineItem(p.id)} className="px-2 py-1 text-sm bg-gray-100 rounded">{routine.includes(p.id) ? 'Remove' : 'Add'}</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl p-4 shadow">
            <h3 className="font-semibold">My Routine</h3>
            <p className="text-sm text-gray-600 mb-2">Selected programs</p>
            <ul className="space-y-2">
              {routine.length === 0 && <li className="text-sm text-gray-500">No programs yet — add some.</li>}
              {routine.map(id => {
                const p = exercisePrograms.find(x => x.id === id);
                if (!p) return null;
                return (
                  <li key={id} className="flex justify-between items-center">
                    <div>
                      <div className="font-semibold">{p.title}</div>
                      <div className="text-xs text-gray-500">{p.durationLabel}</div>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => startGuided(p)} className="px-2 py-1 bg-green-600 text-white rounded">Start</button>
                      <button onClick={() => toggleRoutineItem(p.id)} className="px-2 py-1 bg-gray-100 rounded">Remove</button>
                    </div>
                  </li>
                );
              })}
            </ul>

            <div className="mt-4 border-t pt-3">
              <div className="text-sm">Minutes today: <strong>{progress.minutesToday}</strong></div>
              <div className="text-sm">Streak: <strong>{progress.streak}</strong> days</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow mb-6">
          <h3 className="font-semibold text-lg">Symptoms-based recommendations</h3>
          <div className="flex gap-2 mt-3">
            <button onClick={() => setFilters(f => ({ ...f, symptom: 'rigidity' }))} className="px-3 py-1 bg-gray-100 rounded">Rigidity</button>
            <button onClick={() => setFilters(f => ({ ...f, symptom: 'balance' }))} className="px-3 py-1 bg-gray-100 rounded">Balance</button>
            <button onClick={() => setFilters(f => ({ ...f, symptom: 'fatigue' }))} className="px-3 py-1 bg-gray-100 rounded">Fatigue</button>
            <button onClick={() => setFilters(f => ({ ...f, symptom: 'all' }))} className="px-3 py-1 bg-gray-100 rounded">All</button>
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
    <div className= "bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between mb-6">
          <button onClick={() => setActiveSection('home')} className="text-blue-600 hover:text-blue-800 flex items-center gap-2">← Back to Home</button>
          <div className="flex items-center gap-3">
            <select value={filters.difficulty} onChange={e => setFilters(f => ({ ...f, difficulty: e.target.value }))} className="rounded px-2 py-1">
              <option>All</option>
              <option>Beginner</option>
              <option>Intermediate</option>
              <option>Advanced</option>
            </select>
            <select value={filters.sortBy} onChange={e => setFilters(f => ({ ...f, sortBy: e.target.value }))} className="rounded px-2 py-1">
              <option value="none">Sort</option>
              <option value="duration">Duration</option>
              <option value="difficulty">Difficulty</option>
            </select>
            <button onClick={() => setActiveSection('home')} className="px-2 py-1 rounded bg-gray-100">Close</button>
          </div>
        </div>

        <SafetyBox />

        <div className="mb-8 grid md:grid-cols-2 gap-6">
          <div>
            <h1 className="text-3xl font-bold mb-3">Exercise Programs</h1>
            <p className="text-gray-600 mb-4">Choose the right exercises for your needs and abilities. Use the guided mode for step-by-step help.</p>

            <div className="grid md:grid-cols-1 gap-4">
              {filteredPrograms.map(program => {
                const Icon = program.icon;
                return (
                  <div key={program.id} className="bg-white rounded-2xl shadow overflow-hidden">
                    <div className="md:flex">
                      <div className="md:w-2/5">
                        <img src={program.image} alt={program.title} className="w-full h-44 object-cover" />
                      </div>
                      <div className="md:w-3/5 p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="flex items-center gap-2"><Icon className="w-6 h-6 text-blue-600" /><h2 className="text-xl font-bold inline">{program.title}</h2></div>
                            <p className="text-sm text-gray-600 mt-2">{program.benefits.join(', ')}</p>
                          </div>
                          <div className="text-sm text-gray-500">{program.durationLabel}</div>
                        </div>

                        <div className="mt-3 flex gap-2">
                          <button onClick={() => openVideo(program.video)} className="px-3 py-1 rounded bg-blue-50">Watch Video</button>
                          <button onClick={() => startGuided(program)} className="px-3 py-1 rounded bg-green-600 text-white">Start Guided</button>
                          <button onClick={() => toggleRoutineItem(program.id)} className="px-3 py-1 rounded bg-gray-100">{routine.includes(program.id) ? 'Remove' : 'Add to My Routine'}</button>
                          {/* <button onClick={() => speak(`Program: ${program.title}. Benefits: ${program.benefits.join(', ')}`)} className="px-3 py-1 rounded bg-gray-100">🔊</button> */}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-3">Detailed Exercise Types</h2>
            <div className="space-y-4">
            {exerciseTypes.map(e => {
            const Icon = e.icon;
            return (
              <div key={e.id} className="bg-white p-4 rounded-lg shadow flex items-start gap-4">
                <Icon className="w-8 h-8 text-blue-600" />
                  <div>
                    <h3 className="font-semibold">{e.title}</h3>
                    <p className="text-sm text-gray-600">Short description and practical tips for {e.title.toLowerCase()}.</p>
                    <div className="mt-2 flex gap-2">
                      {/* <button onClick={() => speak(e.title + ' tips: Start slowly and focus on posture.')} className="px-2 py-1 rounded bg-gray-100 text-sm">Listen</button> */}
                      <button onClick={() => setRoutine(r => [...r, 1])} className="px-2 py-1 rounded bg-green-50 text-sm">Add Sample</button>
                    </div>
                  </div>
                </div>
              );
            })}

              <div className="bg-white p-4 rounded-lg shadow">
                <h4 className="font-semibold">Warm-up & Cool-down</h4>
                <p className="text-sm text-gray-600 mt-2">Don’t skip: 5–10 min warm-up and 5–10 min cool-down help reduce injury and stiffness.</p>
              </div>

              <div className="bg-white p-4 rounded-lg shadow">
                <h4 className="font-semibold">Weekly Planner</h4>
                <div className="grid grid-cols-7 gap-2 mt-2">
                  {['Mon','Tue','Wed','Thu','Fri','Sat','Sun'].map(d => (
                    <button key={d} onClick={() => setWeeklyPlan(w => ({...w, [d]: w[d] ? undefined : (routine[0] || exercisePrograms[0].id)}))} className={`p-2 rounded ${weeklyPlan[d] ? 'bg-green-600 text-white' : 'bg-gray-100'}`}>{d}</button>
                  ))}
                </div>
                <div className="mt-2 text-xs text-gray-500">Click a day to toggle a program. Saved to localStorage.</div>
              </div>

            </div>
          </div>
        </div>

        {/* Guided Mode Panel */}
        {guidedMode.program && (
          <div className="fixed bottom-6 left-6 right-6 md:right-auto md:left-6 bg-white rounded-2xl shadow-lg p-4 z-50">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-gray-500">Guided Mode — {guidedMode.program.title}</div>
                <div className="font-bold text-lg">{guidedMode.program.steps[guidedMode.stepIndex].label}</div>
                <div className="text-sm text-gray-500">Time left: {Math.floor(guidedMode.secondsLeft/60)}:{String(guidedMode.secondsLeft%60).padStart(2,'0')}</div>
              </div>
              <div className="flex items-center gap-2">
                {!guidedMode.running ? <button onClick={resumeGuided} className="px-3 py-1 bg-green-600 text-white rounded">Resume</button> : <button onClick={pauseGuided} className="px-3 py-1 bg-yellow-400 rounded">Pause</button>}
                <button onClick={stopGuided} className="px-3 py-1 bg-red-500 text-white rounded">Stop</button>
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

        <div className="bg-gradient-to-r from-green-600 to-green-500 rounded-2xl shadow-lg p-8 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">Stay Active, Stay Healthy</h2>
          <p className="text-lg mb-6">Even small amounts of daily activity can make a big difference. Combine movement, mindfulness, and good nutrition to support your well-being.</p>
          <button onClick={() => setActiveSection('exercise')} className="bg-white text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-green-50 transition-colors">Explore Exercise Programs</button>
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

      <footer className="bg-blue-900 text-white py-6 text-center"> 
        <p>© 2025 Parkinson&apos;s Wellness | Designed for awareness and education</p>
      </footer>
    </div>
  );
}









// import React, { useState } from 'react';
// import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";
// import { Button } from "../../../components/ui/button";
// import { Badge } from "../../../components/ui/badge";
// import {
//   Activity,
//   Clock,
//   PlayCircle,
//   CheckCircle,
//   Dumbbell,
//   Heart,
//   Target,
// } from 'lucide-react';

// const exercisePrograms = [
//   {
//     id: 1,
//     title: "Morning Stretching Routine",
//     duration: "15 min",
//     difficulty: "Beginner",
//     benefits: ["Reduces stiffness", "Improves flexibility"],
//     exercises: [
//       "Neck rolls - 2 min",
//       "Shoulder rotations - 3 min",
//       "Torso twists - 3 min",
//       "Leg stretches - 5 min",
//       "Deep breathing - 2 min"
//     ],
//     videoUrl: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=300&fit=crop",
//     icon: Activity
//   },
//   {
//     id: 2,
//     title: "Balance & Stability",
//     duration: "20 min",
//     difficulty: "Intermediate",
//     benefits: ["Prevents falls", "Strengthens core"],
//     exercises: [
//       "Single leg stands - 5 min",
//       "Heel-to-toe walk - 5 min",
//       "Chair exercises - 5 min",
//       "Wall push-ups - 5 min"
//     ],
//     videoUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop",
//     icon: Target
//   },
//   {
//     id: 3,
//     title: "Cardio Walking Program",
//     duration: "30 min",
//     difficulty: "All Levels",
//     benefits: ["Improves endurance", "Boosts mood"],
//     exercises: [
//       "Warm-up walk - 5 min",
//       "Brisk walking - 20 min",
//       "Cool down - 5 min"
//     ],
//     videoUrl: "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=400&h=300&fit=crop",
//     icon: Heart
//   },
//   {
//     id: 4,
//     title: "Strength Training",
//     duration: "25 min",
//     difficulty: "Intermediate",
//     benefits: ["Builds muscle", "Increases metabolism"],
//     exercises: [
//       "Light weights - 10 min",
//       "Resistance bands - 10 min",
//       "Bodyweight exercises - 5 min"
//     ],
//     videoUrl: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400&h=300&fit=crop",
//     icon: Dumbbell
//   }
// ];

// const difficultyColors = {
//   "Beginner": "bg-green-100 text-green-800",
//   "Intermediate": "bg-yellow-100 text-yellow-800",
//   "Advanced": "bg-red-100 text-red-800",
//   "All Levels": "bg-blue-100 text-blue-800"
// };

// export default function Exercise() {
//   const [selectedProgram, setSelectedProgram] = useState(null);

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 p-4 md:p-8">
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="mb-8">
//           <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2 flex items-center gap-3">
//             <Activity className="w-8 h-8 text-green-600" />
//             Exercise & Movement
//           </h1>
//           <p className="text-gray-600">
//             Stay active and manage symptoms through regular exercise
//           </p>
//         </div>

//         {/* Exercise Programs */}
//         <div className="grid md:grid-cols-2 gap-6 mb-8">
//           {exercisePrograms.map((program) => {
//             const Icon = program.icon;
//             return (
//               <Card
//                 key={program.id}
//                 className="shadow-lg border-none hover:shadow-xl transition-all cursor-pointer overflow-hidden"
//                 onClick={() => setSelectedProgram(program)}
//               >
//                 <div className="relative h-48 overflow-hidden">
//                   <img
//                     src={program.videoUrl}
//                     alt={program.title}
//                     className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
//                   />
//                   <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
//                     <div className="flex items-center gap-2 text-white">
//                       <PlayCircle className="w-8 h-8" />
//                       <span className="font-semibold">Watch Video</span>
//                     </div>
//                   </div>
//                   <Badge
//                     className={`absolute top-4 right-4 ${difficultyColors[program.difficulty]}`}
//                   >
//                     {program.difficulty}
//                   </Badge>
//                 </div>

//                 <CardContent className="pt-6">
//                   <div className="flex items-start gap-3 mb-3">
//                     <div className="p-2 bg-green-100 rounded-lg">
//                       <Icon className="w-5 h-5 text-green-600" />
//                     </div>
//                     <div className="flex-1">
//                       <h3 className="font-bold text-gray-900 text-lg mb-1">
//                         {program.title}
//                       </h3>
//                       <div className="flex items-center gap-2 text-sm text-gray-600">
//                         <Clock className="w-4 h-4" />
//                         <span>{program.duration}</span>
//                       </div>
//                     </div>
//                   </div>

//                   <div className="mb-3">
//                     <p className="text-xs font-semibold text-gray-700 mb-2">
//                       Benefits:
//                     </p>
//                     <div className="flex flex-wrap gap-1">
//                       {program.benefits.map((benefit, idx) => (
//                         <Badge key={idx} variant="secondary" className="text-xs">
//                           {benefit}
//                         </Badge>
//                       ))}
//                     </div>
//                   </div>

//                   <div className="mb-4">
//                     <p className="text-xs font-semibold text-gray-700 mb-2">
//                       Exercises:
//                     </p>
//                     <ul className="space-y-1">
//                       {program.exercises.slice(0, 3).map((exercise, idx) => (
//                         <li
//                           key={idx}
//                           className="text-xs text-gray-600 flex items-center gap-2"
//                         >
//                           <CheckCircle className="w-3 h-3 text-green-600" />
//                           {exercise}
//                         </li>
//                       ))}
//                       {program.exercises.length > 3 && (
//                         <li className="text-xs text-gray-500 italic">
//                           +{program.exercises.length - 3} more...
//                         </li>
//                       )}
//                     </ul>
//                   </div>

//                   <Button className="w-full bg-green-600 hover:bg-green-700">
//                     <PlayCircle className="w-4 h-4 mr-2" />
//                     Start Workout
//                   </Button>
//                 </CardContent>
//               </Card>
//             );
//           })}
//         </div>

//         {/* Tips Section */}
//         <Card className="shadow-xl border-none bg-gradient-to-br from-yellow-50 to-orange-50">
//           <CardHeader>
//             <CardTitle className="flex items-center gap-2">
//               <Heart className="w-5 h-5 text-orange-600" />
//               Exercise Tips for Parkinson's
//             </CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="grid md:grid-cols-2 gap-4">
//               <div className="bg-white p-4 rounded-lg">
//                 <h4 className="font-semibold text-gray-900 mb-2">
//                   🎯 Set Realistic Goals
//                 </h4>
//                 <p className="text-sm text-gray-600">
//                   Start with 10-15 minutes daily and gradually increase.
//                   Consistency matters more than intensity.
//                 </p>
//               </div>
//               <div className="bg-white p-4 rounded-lg">
//                 <h4 className="font-semibold text-gray-900 mb-2">
//                   ⏰ Best Time to Exercise
//                 </h4>
//                 <p className="text-sm text-gray-600">
//                   Exercise when your medication is working best, typically
//                   30-60 minutes after taking it.
//                 </p>
//               </div>
//               <div className="bg-white p-4 rounded-lg">
//                 <h4 className="font-semibold text-gray-900 mb-2">
//                   💧 Stay Hydrated
//                 </h4>
//                 <p className="text-sm text-gray-600">
//                   Drink water before, during, and after exercise to prevent
//                   dehydration and fatigue.
//                 </p>
//               </div>
//               <div className="bg-white p-4 rounded-lg">
//                 <h4 className="font-semibold text-gray-900 mb-2">
//                   🤝 Exercise with Others
//                 </h4>
//                 <p className="text-sm text-gray-600">
//                   Join a group class or exercise with a partner for motivation
//                   and safety.
//                 </p>
//               </div>
//             </div>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// }
