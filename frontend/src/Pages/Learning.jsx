import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import {
  BookOpen,
  Target,
  TrendingUp,
  Zap,
  Award,
  Sparkles,
  Video,
  CheckCircle,
} from "lucide-react";
import LearningCard from "../components/PDashboard/LearningCard";
import LearningContent from "../components/PDashboard/LearningContent";

const learningModules = {
  newly_diagnosed: [
    {
      id: "basics",
      title: "Understanding Parkinson's Disease",
      description:
        "Learn what PD is, how it affects the brain, and what to expect.",
      duration: "15 min",
      completed: true,
    },
    {
      id: "first_steps",
      title: "Your First Steps After Diagnosis",
      description: "Essential actions and mindset for newly diagnosed patients.",
      duration: "20 min",
      completed: false,
    },
    {
      id: "care_team",
      title: "Building Your Care Team",
      description: "Finding and working with the right specialists.",
      duration: "12 min",
      completed: false,
    },
  ],
  mid_stage: [
    {
      id: "exercise",
      title: "Exercise & Physical Therapy",
      description: "Staying mobile and managing symptoms through movement.",
      duration: "25 min",
      completed: false,
    },
    {
      id: "non_motor",
      title: "Non-Motor Symptoms",
      description: "Sleep, mood, cognition, and other hidden symptoms.",
      duration: "20 min",
      completed: false,
    },
  ],
};

export default function Learning() {
  const [selectedStage, setSelectedStage] = useState("newly_diagnosed");
  const [selectedModule, setSelectedModule] = useState(null);
  const [earnedCertificates, setEarnedCertificates] = useState([
    {
      title: "PD Basics Mastery",
      date: "Oct 2025",
      color: "from-teal-500 to-cyan-600",
    },
  ]);

  const stages = [
    { id: "newly_diagnosed", label: "Newly Diagnosed", icon: Target },
    { id: "mid_stage", label: "Mid Stage", icon: TrendingUp },
    { id: "advanced", label: "Advanced", icon: Zap },
    { id: "caregiver", label: "Caregiver", icon: Award },
  ];

  const modules = learningModules[selectedStage] || [];
  const completedCount = modules.filter((m) => m.completed).length;
  const progress = Math.round((completedCount / modules.length) * 100 || 0);

  if (selectedModule) {
    return (
      <LearningContent
        module={selectedModule}
        onBack={() => setSelectedModule(null)}
      />
    );
  }

  return (

    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50 py-8 px-4 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* HEADER */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-600 shadow-xl mb-4">
              <BookOpen className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-2">
              Learning Center
            </h1>
            <p className="text-gray-600 text-base lg:text-lg">
              Personalized educational content for your Parkinson’s journey
            </p>
          </div>
        </motion.div>

        {/* LEARNING STATS */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            icon={Target}
            title="Modules Completed"
            value={`${completedCount}/${modules.length}`}
            color="bg-blue-500 text-white"
          />
          <StatCard
            icon={TrendingUp}
            title="Progress"
            value={`${progress}%`}
            color="from-cyan-500 to-blue-500"
          />
          <StatCard
            icon={Award}
            title="Certificates Earned"
            value={earnedCertificates.length}
            color="from-amber-400 to-orange-500"
          />
          <StatCard
            icon={Sparkles}
            title="Learning Streak"
            value="5 Days"
            color="from-purple-500 to-pink-500"
          />
        </div>

        {/* STAGE SELECTION */}
        <Card className="border-none shadow-xl bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-xl">Select Your Stage</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {stages.map((stage) => {
                const Icon = stage.icon;
                const isActive = selectedStage === stage.id;
                return (
                  <button
                    key={stage.id}
                    onClick={() => setSelectedStage(stage.id)}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      isActive
                        ? "bg-gradient-to-br from-teal-500 to-cyan-600 text-white border-teal-400 shadow-lg"
                        : "bg-white border-gray-200 text-gray-700 hover:border-teal-300 hover:shadow-md"
                    }`}
                  >
                    <Icon
                      className={`w-6 h-6 mx-auto mb-2 ${
                        isActive ? "text-white" : "text-gray-400"
                      }`}
                    />
                    <div className="font-semibold text-sm">{stage.label}</div>
                  </button>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* LEARNING MODULES */}
        <Card className="border-none shadow-xl bg-white/90 backdrop-blur-lg">
          <CardHeader className="border-b border-teal-50">
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-teal-600" />
              Recommended for You
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 grid md:grid-cols-2 gap-4">
            {modules.map((module, index) => (
              <LearningCard
                key={module.id}
                module={module}
                index={index}
                onClick={() => setSelectedModule(module)}
              />
            ))}
          </CardContent>
        </Card>

        {/* CERTIFICATES */}
        <Card className="border-none shadow-xl bg-white/80 backdrop-blur-lg">
          <CardHeader className="border-b border-gray-100">
            <CardTitle className="flex items-center gap-2">
              <Award className="w-6 h-6 text-amber-500" />
              Earned Certificates
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {earnedCertificates.length > 0 ? (
              earnedCertificates.map((cert, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-5 rounded-xl shadow-md bg-gradient-to-br ${cert.color} text-white flex flex-col justify-between`}
                >
                  <div>
                    <h3 className="font-semibold text-lg">{cert.title}</h3>
                    <p className="text-sm opacity-90">{cert.date}</p>
                  </div>
                  <div className="flex items-center gap-2 mt-3">
                    <CheckCircle className="w-5 h-5" />
                    <span className="text-sm font-medium">Verified</span>
                  </div>
                </motion.div>
              ))
            ) : (
              <p className="text-gray-600 col-span-full text-center">
                Complete modules to earn your first certificate!
              </p>
            )}
          </CardContent>
        </Card>

        {/* COMING SOON */}
        <Card className="border-none shadow-2xl bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500 text-white relative overflow-hidden">
          <CardContent className="p-8 flex flex-col lg:flex-row items-center gap-6">
            <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center shadow-xl">
              <Video className="w-8 h-8 text-white" />
            </div>
            <div className="flex-1 text-center lg:text-left">
              <h3 className="text-2xl font-bold mb-2">Video Library Coming Soon</h3>
              <p className="text-purple-100 leading-relaxed">
                Expert-led tutorials from doctors, therapists, and patients will soon
                enhance your learning experience.
              </p>
            </div>
            <Badge className="bg-white/30 text-white border-white/40 text-sm px-4 py-2">
              Coming Soon
            </Badge>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

/* Reusable Stat Card Component */
function StatCard({ icon: Icon, title, value, color }) {
  return (
    <Card className={`border-none shadow-xl bg-gradient-to-br ${color} text-white`}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-3">
          <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
            <Icon className="w-6 h-6 text-white" />
          </div>
        </div>
        <div className="text-3xl font-bold">{value}</div>
        <div className="text-sm text-teal-100">{title}</div>
      </CardContent>
    </Card>
  );
}








// import React, { useState, useEffect } from "react";
// import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
// import { Button } from "../components/ui/button";
// import { Badge } from "../components/ui/badge";
// import { BookOpen, PlayCircle, FileText, Video, Lock, CheckCircle, Clock } from "lucide-react";
// import { motion } from "framer-motion";
// import LearningCard from "../components/PDashboard/LearningCard";
// import LearningContent from "../components/PDashboard/LearningContent";

// const learningModules = {
//   newly_diagnosed: [
//     {
//       id: "basics",
//       title: "Understanding Parkinson's Disease",
//       description: "Learn what PD is, how it affects the brain, and what to expect",
//       duration: "15 min",
//       sections: ["What is Parkinson's?", "The dopamine system", "Common symptoms", "Disease progression"],
//       completed: false
//     },
//     {
//       id: "first_steps",
//       title: "Your First Steps After Diagnosis",
//       description: "Essential actions and mindset for newly diagnosed patients",
//       duration: "20 min",
//       sections: ["Processing the diagnosis", "Building your care team", "Initial treatments", "Lifestyle changes"],
//       completed: false
//     },
//     {
//       id: "care_team",
//       title: "Building Your Care Team",
//       description: "Finding and working with the right specialists",
//       duration: "12 min",
//       sections: ["Neurologists vs Movement Disorder Specialists", "Physical therapists", "Other specialists", "In Karnataka/India"],
//       completed: false
//     },
//     {
//       id: "medications_intro",
//       title: "Introduction to PD Medications",
//       description: "Understanding your medication options and how they work",
//       duration: "18 min",
//       sections: ["Levodopa basics", "Other medications", "Side effects", "Medication timing"],
//       completed: false
//     }
//   ],
//   mid_stage: [
//     {
//       id: "fluctuations",
//       title: "Managing Motor Fluctuations",
//       description: "Dealing with on/off periods and wearing-off symptoms",
//       duration: "22 min",
//       sections: ["Understanding fluctuations", "Medication adjustments", "Protein timing", "Exercise strategies"],
//       completed: false
//     },
//     {
//       id: "exercise",
//       title: "Exercise & Physical Therapy",
//       description: "Staying mobile and managing symptoms through movement",
//       duration: "25 min",
//       sections: ["Best exercises for PD", "Gait training", "Balance work", "Local programs in Karnataka"],
//       completed: false
//     },
//     {
//       id: "non_motor",
//       title: "Non-Motor Symptoms",
//       description: "Sleep, mood, cognition, and other hidden symptoms",
//       duration: "20 min",
//       sections: ["Sleep disorders", "Depression & anxiety", "Cognitive changes", "Treatment options"],
//       completed: false
//     },
//     {
//       id: "advanced_treatments",
//       title: "Advanced Treatment Options",
//       description: "DBS, pumps, and newer therapies",
//       duration: "18 min",
//       sections: ["Deep Brain Stimulation", "Duopa pump", "Clinical trials", "When to consider"],
//       completed: false
//     }
//   ],
//   advanced: [
//     {
//       id: "daily_aids",
//       title: "Daily Living Aids & Adaptations",
//       description: "Tools and modifications for independence",
//       duration: "15 min",
//       sections: ["Home modifications", "Assistive devices", "Adaptive equipment", "Local resources"],
//       completed: false
//     },
//     {
//       id: "advanced_care",
//       title: "Advanced Care Planning",
//       description: "Planning for future care needs",
//       duration: "20 min",
//       sections: ["Care options", "Financial planning", "Legal documents", "Family discussions"],
//       completed: false
//     },
//     {
//       id: "complex_symptoms",
//       title: "Managing Complex Symptoms",
//       description: "Dyskinesias, hallucinations, and other challenges",
//       duration: "18 min",
//       sections: ["Dyskinesias", "Hallucinations", "Dysautonomia", "Treatment strategies"],
//       completed: false
//     }
//   ],
//   caregiver: [
//     {
//       id: "caregiver_basics",
//       title: "Caregiver Essentials",
//       description: "Fundamental knowledge for caring for someone with PD",
//       duration: "20 min",
//       sections: ["Understanding PD", "Daily care tasks", "Safety considerations", "Medication management"],
//       completed: false
//     },
//     {
//       id: "self_care",
//       title: "Caregiver Self-Care",
//       description: "Taking care of yourself while caring for others",
//       duration: "15 min",
//       sections: ["Recognizing burnout", "Self-care strategies", "Respite care", "Support groups"],
//       completed: false
//     },
//     {
//       id: "communication",
//       title: "Effective Communication",
//       description: "Communicating with your loved one and healthcare providers",
//       duration: "12 min",
//       sections: ["Talking about PD", "Active listening", "Healthcare discussions", "Family dynamics"],
//       completed: false
//     }
//   ]
// };

// export default function Learning() {
//   const [profile, setProfile] = useState(null);
//   const [selectedStage, setSelectedStage] = useState("newly_diagnosed");
//   const [selectedModule, setSelectedModule] = useState(null);
//   // const [loading, setLoading] = useState(true);

// //   useEffect(() => {
// //     loadProfile();
// //   }, []);

// //   const loadProfile = async () => {
// //     try {
// //       const currentUser = await User.me();
// //       const profiles = await UserProfile.filter({ user_email: currentUser.email });
// //       if (profiles.length > 0) {
// //         setProfile(profiles[0]);
// //       }
// //     } catch (error) {
// //       console.error("Error loading profile:", error);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   if (loading) {
// //     return (
// //       <div className="flex items-center justify-center min-h-screen">
// //         <motion.div
// //           animate={{ rotate: 360 }}
// //           transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
// //           className="w-12 h-12 border-4 border-teal-500 border-t-transparent rounded-full"
// //         />
// //       </div>
// //     );
// //   }

//   const modules = learningModules[profile?.stage] || learningModules.newly_diagnosed;

//   if (selectedModule) {
//     return (
//       <LearningContent
//         module={selectedModule}
//         onBack={() => setSelectedModule(null)}
//       />
//     );
//   }

//   return (
//     <div className="p-4 lg:p-8 space-y-6 max-w-7xl mx-auto">
//       <motion.div
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//       >
//         <div className="flex items-center justify-between mb-2">
//           <h1 className="text-3xl lg:text-4xl font-bold text-gray-900">Learning Center</h1>
//         </div>
//         <p className="text-gray-600">Personalized educational content for your journey</p>
//       </motion.div>

//       <div className="grid lg:grid-cols-4 gap-6">
//         <motion.div
//           initial={{ opacity: 0, x: -20 }}
//           animate={{ opacity: 1, x: 0 }}
//           className="lg:col-span-1"
//         >
//           <Card className="border-none shadow-xl bg-gradient-to-br from-teal-600 to-cyan-600 text-white sticky top-4">
//             <CardContent className="p-6">
//               <BookOpen className="w-12 h-12 mb-4" />
//               <h3 className="text-xl font-bold mb-2">Your Progress</h3>
//               <div className="space-y-3">
//                 <div>
//                   <div className="flex justify-between text-sm mb-1">
//                     <span>Modules Completed</span>
//                     <span className="font-bold">0/{modules.length}</span>
//                   </div>
//                   <div className="w-full h-3 bg-white/20 rounded-full overflow-hidden">
//                     <div className="h-full bg-white rounded-full" style={{ width: '0%' }} />
//                   </div>
//                 </div>
//                 <div className="pt-3 border-t border-white/20">
//                   <p className="text-sm text-teal-100">
//                     Complete modules to unlock certificates and track your learning journey
//                   </p>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//         </motion.div>

//         <div className="lg:col-span-3 space-y-6">
//           <Card className="border-none shadow-xl bg-white/90 backdrop-blur-lg">
//             <CardHeader className="border-b border-teal-50">
//               <CardTitle className="flex items-center gap-2">
//                 <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center">
//                   <BookOpen className="w-5 h-5 text-white" />
//                 </div>
//                 Recommended for You
//               </CardTitle>
//             </CardHeader>
//             <CardContent className="p-6">
//               <div className="grid md:grid-cols-2 gap-4">
//                 {modules.map((module, index) => (
//                   <LearningCard
//                     key={module.id}
//                     module={module}
//                     index={index}
//                     onClick={() => setSelectedModule(module)}
//                   />
//                 ))}
//               </div>
//             </CardContent>
//           </Card>

//           <Card className="border-none shadow-xl bg-gradient-to-br from-purple-600 to-pink-600 text-white">
//             <CardContent className="p-6">
//               <div className="flex items-start gap-4">
//                 <div className="w-14 h-14 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
//                   <Video className="w-7 h-7" />
//                 </div>
//                 <div className="flex-1">
//                   <h3 className="text-xl font-bold mb-2">Video Library Coming Soon</h3>
//                   <p className="text-purple-100 leading-relaxed mb-4">
//                     We're working on video content featuring doctors, patients, and caregivers sharing their experiences and expertise.
//                   </p>
//                   <Badge className="bg-white/20 text-white border-white/30">Coming Soon</Badge>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//         </div>
//       </div>
//     </div>
//   );
// }