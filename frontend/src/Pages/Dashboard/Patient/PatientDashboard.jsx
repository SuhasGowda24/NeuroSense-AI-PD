import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { Badge } from "../../../components/ui/badge";
import { Pill, BookOpen, Plus, Heart, ArrowRight, Sparkles, Dumbbell, Users, CalendarClock } from "lucide-react";
import WelcomeCard from "../../../components/PDashboard/WelcomeCard";
import QuickStats from "../../../components/PDashboard/QuickStats";
import SetupProfile from "../../../components/PDashboard/SetupProfile";
import HealthGraph from "../../../components/PDashboard/HealthGraph";
import { useSymptomLogs } from "../../../hooks/useSymptomLogs";
import MedicationSchedule from "../../../components/PDashboard/MedicationSchedule";

//Suggestions of Learning Modules
const modules = {
  newly_diagnosed: [
    { title: "Understanding Parkinson's", description: "Learn the basics of PD", progress: 0 },
  //   { title: "Your First Steps", description: "What to do after diagnosis", progress: 0 },
  //   { title: "Building Your Care Team", description: "Finding the right specialists", progress: 0 }
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

//Framer Motion Variants
const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.1 } } };
const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } };

export default function PatientDashboard() {
  const [loading, setLoading] = useState(true);
  const [ user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [showSetup, setShowSetup] = useState(false);
  // const [symptoms] = useState([]);
  const [events, setEvents] = useState([]);
  const token = localStorage.getItem("token"); // JWT stored at login
  const [medications, setMedications] = useState([]);
   const navigate = useNavigate();
  useEffect(() => {
  const fetchMedications = async () => {
    try {
      const res = await fetch("/api/medications", {
        headers: { "Authorization": `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setMedications(data);
        // fetch journey events for quick stats
        const fetchEvents = async () => {
          try {
            const res = await fetch("/api/journey", {
              headers: { "Authorization": `Bearer ${token}` },
            });
            if (res.ok) {
              const data = await res.json();
              setEvents(data);
            }
          } catch (error) {
            console.error("Error fetching journey events:", error);
          }
        };

        fetchEvents();
      }
    } catch (error) {
      console.error("Error fetching medications:", error);
    }
  };

  if (token) {
    fetchMedications();
  }
}, [token]);



  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  // Fetch Profile Data
  useEffect(() => {
  const fetchProfile = async () => {
    try {
        const res = await fetch("/api/profile/me", {
        headers: { "Authorization": `Bearer ${token}`},
      });
      if (!res.ok) throw new Error(`Failed to fetch profile`);

      const data = await res.json();
      setProfile(data); // Save profile data to local
      setUser(data.userId); // Set user to the populated user object (includes username)
      
      if (!data.stage) setShowSetup(true); // show setup if incomplete
    } catch (error) {
      console.log("Profile missing, showing setup form");
      setShowSetup(true);
    }
  };

  fetchProfile();
}, [token]);

const handleSetupComplete = (ProfileData) => {
    setProfile(ProfileData);
    setShowSetup(false);
  };

  const { data: symptomLogs = [] } = useSymptomLogs(7); // last 7 logs

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="p-6 lg:p-10 space-y-8 max-w-7xl mx-auto">
      {/* Welcome Card*/}
     <div className="bg-gray-50">
      {showSetup && <SetupProfile user={user} onComplete={handleSetupComplete} />}
      {profile && !showSetup && <WelcomeCard profile={profile} user={user} />}
    </div>
    
      {/* Quick Stats */}
      <motion.div variants={item}>
        <QuickStats symptoms={symptomLogs} events={events} medications={medications} />
      </motion.div>
      
      <div className="lg:col-span-2">
        <HealthGraph symptomLogs={symptomLogs} />
        </div>


      {/* Left Column - Medication*/}
      <div className="space-y-6">
            <motion.div variants={item}>
               <Card className="border-none shadow-xl bg-white/90 backdrop-blur-lg hover:shadow-2xl transition-all">
                <CardHeader className="border-b border-teal-50">
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center">
                        <Pill className="w-5 h-5 text-white" />
                      </div>
                      <span>Today's Medications</span>
                    </div>
                    <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                      {medications.length} medications
                    </Badge>
                  </CardTitle>
                  <Link to="/Medication">
                      <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                      <Plus className="w-4 h-4 mr-2" /> Add Medication
                      </Button>
                      </Link>
                </CardHeader>
                <CardContent className="p-6">
                  {medications.length > 0 ? (
                    <MedicationSchedule medications={medications} />
                  ) : (
                    <div className="text-center py-12">
                      <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center">
                        <Pill className="w-10 h-10 text-blue-400" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        No medications yet
                      </h3>
                      <p className="text-gray-600 mb-4">
                        Add your medications to track your schedule
                      </p>
                    </div>
                  )}
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
           {profile && modules[profile.stage]?.map((module, index) => (
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
                          Learning Module
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
<div className="mb-4"></div>
                <Link to="/Exercise">
  <div className="p-4 rounded-xl bg-gradient-to-r from-purple-50 via-pink-50 to-rose-50 border border-purple-100 hover:border-purple-300 transition-all duration-200 group cursor-pointer">
    <div className="flex items-start justify-between mb-3">
      <div className="flex-1">
        <h4 className="font-semibold text-gray-900 mb-1 group-hover:text-purple-700 transition-colors">
          Exercise
        </h4>
        <p className="text-sm text-gray-600 leading-relaxed">
          Practice your skills with interactive exercises
        </p>
      </div>
      <div className="w-10 h-10 rounded-lg bg-white/60 flex items-center justify-center group-hover:bg-purple-100 transition-colors">
        <Dumbbell className="w-5 h-5 text-purple-600" />
      </div>
    </div>
    <div className="flex items-center justify-between">
      <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden mr-3">
        <motion.div 
          className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
          initial={{ width: 0 }}
          animate={{ width: "0%" }}
          transition={{ duration: 1, delay: 0.5 }}
        />
      </div>
      <Button variant="ghost" size="sm" className="text-purple-700 hover:text-purple-800 hover:bg-purple-100 group-hover:translate-x-1 transition-all">
        Start
        <ArrowRight className="w-4 h-4 ml-2" />
      </Button>
    </div>
  </div>
</Link>

<div className="mb-4"></div>

 <Link to="/caregiver">
  <div className="p-4 rounded-xl bg-gradient-to-r from-amber-50 via-orange-50 to-yellow-50 border border-amber-100 hover:border-amber-300 transition-all duration-200 group cursor-pointer">
    <div className="flex items-start justify-between mb-3">
      <div className="flex-1">
        <h4 className="font-semibold text-gray-900 mb-1 group-hover:text-amber-700 transition-colors">
          Caregiver Corner
        </h4>
        <p className="text-sm text-gray-600 leading-relaxed">
          Resources and support for those caring for loved ones with Parkinson's
        </p>
      </div>
      <div className="w-10 h-10 rounded-lg bg-white/60 flex items-center justify-center group-hover:bg-amber-100 transition-colors">
        <Heart className="w-5 h-5 text-amber-600" />
      </div>
    </div>
    <div className="flex items-center justify-between">
      <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden mr-3">
        <motion.div 
          className="h-full bg-gradient-to-r from-amber-500 to-orange-500"
          initial={{ width: 0 }}
          animate={{ width: "0%" }}
          transition={{ duration: 1, delay: 0.5 }}
        />
      </div>
      <Button variant="ghost" size="sm" className="text-amber-700 hover:text-amber-800 hover:bg-amber-100 group-hover:translate-x-1 transition-all">
        Join
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
       {/* Quick Actions Bar */}
        <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <Button 
              variant="outline" 
              className="h-auto py-4 flex-col"
              onClick={() => navigate("/medication")}
            >
              <Pill className="w-6 h-6 mb-2 text-purple-600" />
              <span className="text-sm">Medications</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-auto py-4 flex-col"
              onClick={() => navigate("/Exercise")}
            >
              <Dumbbell className="w-6 h-6 mb-2 text-amber-600" />
              <span className="text-sm">Exercise</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-auto py-4 flex-col"
              onClick={() => navigate("/Appointments")}
            >
              <CalendarClock className="w-6 h-6 mb-2 text-teal-600" />
              <span className="text-sm">Appointments</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-auto py-4 flex-col"
               onClick={() => navigate("/Community")}
            >
              <Users className="w-6 h-6 mb-2 text-violet-600" />
              <span className="text-sm">Community</span>
            </Button>
          </div>
        </div>
    </motion.div>
  );
}


