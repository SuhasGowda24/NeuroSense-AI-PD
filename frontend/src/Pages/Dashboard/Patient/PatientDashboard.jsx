import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { Badge } from "../../../components/ui/badge";
import { Activity, Pill, BookOpen, Plus, Heart, ChevronRight, Calendar, ArrowRight, Sparkles } from "lucide-react";
import WelcomeCard from "../../../components/PDashboard/WelcomeCard";
import QuickStats from "../../../components/PDashboard/QuickStats";

//Suggestions
const modules = {
  newly_diagnosed: [
    { title: "Understanding Parkinson's", description: "Learn the basics of PD", progress: 0 },
    { title: "Your First Steps", description: "What to do after diagnosis", progress: 0 },
    { title: "Building Your Care Team", description: "Finding the right specialists", progress: 0 }
  ],
  mid_stage: [
    { title: "Managing Fluctuations", description: "Dealing with on/off periods", progress: 0 },
    { title: "Exercise & Therapy", description: "Staying active and mobile", progress: 0 },
    { title: "Advanced Treatments", description: "Exploring new options", progress: 0 }
  ],
  advanced: [
    { title: "Daily Living Aids", description: "Tools to maintain independence", progress: 0 },
    { title: "Advanced Care Planning", description: "Planning for the future", progress: 0 },
    { title: "Caregiver Support", description: "Help for your care team", progress: 0 }
  ],
  caregiver: [
    { title: "Caregiver Basics", description: "Essential knowledge for caregivers", progress: 0 },
    { title: "Self-Care", description: "Taking care of yourself", progress: 0 },
    { title: "Communication Tips", description: "Talking with your loved one", progress: 0 }
  ]
};


// ---- Static dummy data ----
const staticUser = { name: "Patient" };
const staticProfile = { stage: "newly_diagnosed", location: "Bengaluru" };

const staticSymptoms = [
  { id: 1, description: "Tremor", date: "2025-10-01" },
  { id: 2, description: "Rigidity", date: "2025-10-02" }
];

const staticEvents = [
  { id: 1, title: "Doctor Visit", date: "2025-10-05" },
  { id: 2, title: "Therapy Session", date: "2025-10-06" }
];

//Framer Motion Variants
const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export default function PatientDashboard() {

   const PatientDashboard = modules[staticProfile?.stage] || modules.newly_diagnosed;

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="p-6 lg:p-10 space-y-8 max-w-7xl mx-auto">
      
      {/* Welcome Card */}
      <motion.div variants={item}>
        <WelcomeCard profile={staticProfile} user={staticUser} />
      </motion.div>

      {/* Quick Stats */}
      <motion.div variants={item}>
        <QuickStats symptoms={staticSymptoms} events={staticEvents} />
      </motion.div>

      {/* Left Column - Medications */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <motion.div variants={item}>
              <Card className="border-none shadow-xl bg-white/90 backdrop-blur-lg hover:shadow-2xl transition-all h-full">
                <CardHeader className="border-b border-teal-50">
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center">
                        <Pill className="w-5 h-5 text-white" />
                      </div>
                      <span>Today's Medications</span>
                    </div>
                    <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                      0 doses
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="text-center py-12">
                    <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center">
                      <Pill className="w-10 h-10 text-blue-400" />
                    </div><br/>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      No medications yet
                    </h3><br/>
                    <p className="text-gray-600 mb-4">
                      Add your medications to track your schedule
                    </p><br/>
                    <Link to="/Medication">
                      <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                        <Plus className="w-4 h-4 mr-2" /> Add Medication
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </motion.div>


{/* Right Column - Suggestions + Reminder */}
      <motion.div variants={item} className="space-y-6">
        <Card className="border-none shadow-xl bg-white/90 backdrop-blur-lg">
          <CardHeader className="border-b border-yellow-50 bg-gradient-to-r from-yellow-50 to-orange-50">
            <CardTitle className="flex items-center gap-2">
              <motion.div
                animate={{ rotate: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Sparkles className="w-5 h-5 text-yellow-600" />
              </motion.div>
              <span className="text-lg">Suggested for You</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 space-y-3">
            {PatientDashboard.map((module, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <Link to="/Learning">
                  <div className="p-4 rounded-xl bg-gradient-to-r from-teal-50 via-cyan-50 to-blue-50 border border-teal-100 hover:border-teal-300 transition-all duration-200 group cursor-pointer">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 mb-1 group-hover:text-teal-700 transition-colors">
                          {module.title}
                        </h4>
                        <p className="text-sm text-gray-600 leading-relaxed">
                          {module.description}
                        </p>
                      </div>
                      <div className="w-10 h-10 rounded-lg bg-white/60 flex items-center justify-center group-hover:bg-teal-100 transition-colors">
                        <BookOpen className="w-5 h-5 text-teal-600" />
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden mr-3">
                        <motion.div 
                          className="h-full bg-gradient-to-r from-teal-500 to-cyan-500"
                          initial={{ width: 0 }}
                          animate={{ width: `${module.progress}%` }}
                          transition={{ duration: 1, delay: 0.5 }}
                        />
                      </div>
                      <Button variant="ghost" size="sm" className="text-teal-700 hover:text-teal-800 hover:bg-teal-100 group-hover:translate-x-1 transition-all">
                        Start
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </CardContent>
        </Card>
        
        {/* Daily Reminder Card */}
        <Card className="border-none shadow-xl bg-gradient-to-br from-teal-500 to-cyan-500 text-white">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0">
                <Heart className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-2">Daily Reminder</h3>
                <p className="text-teal-50 text-sm leading-relaxed">
                  Remember to stay hydrated, take your medications on time, and do your exercises today!
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

</div>
      {/* Quick Actions */}
      <motion.div variants={item}>
        <Card className="border-none shadow-xl bg-white/90 backdrop-blur-lg">
          <CardHeader className="border-b border-teal-50">
            <CardTitle className="text-base flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center">
                <Activity className="w-4 h-4 text-white" />
              </div>
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 space-y-2">
            <Button variant="outline" className="w-full justify-start group hover:bg-purple-50 hover:border-purple-300">
              <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center mr-3 group-hover:bg-purple-200">
                <Calendar className="w-4 h-4 text-purple-600" />
              </div>
              <span className="flex-1 text-left font-medium">Add Journey Event</span>
              <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-purple-600" />
            </Button>
            <Button variant="outline" className="w-full justify-start group hover:bg-blue-50 hover:border-blue-300">
              <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center mr-3 group-hover:bg-blue-200">
                <BookOpen className="w-4 h-4 text-blue-600" />
              </div>
              <span className="flex-1 text-left font-medium">Continue Learning</span>
              <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600" />
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}


