import React from "react";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Sparkles, MapPin, Calendar, User, Plus } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const stageLabels = {
  newly_diagnosed: "Newly Diagnosed",
  mid_stage: "Mid-Stage",
  advanced: "Advanced",
  // caregiver: "Caregiver"
};

const stageColors = {
  newly_diagnosed: "bg-blue-100 text-blue-800 border-blue-200",
  mid_stage: "bg-yellow-100 text-yellow-800 border-yellow-200",
  advanced: "bg-orange-100 text-orange-800 border-orange-200"
  // caregiver: "bg-purple-100 text-purple-800 border-purple-200"
};

export default function WelcomeCard({ profile, user }) {
  const name = profile?.name || user?.name || "";
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";
    return "Good Evening";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="border-none shadow-2xl bg-gradient-to-br from-teal-600 via-cyan-600 to-blue-600 text-white overflow-hidden relative group">
        <motion.div 
          animate={{ 
            scale: [1, 1.1, 1],
            rotate: [0, 5, 0]
          }}
          transition={{ 
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -mr-48 -mt-48"
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, -5, 0]
          }}
          transition={{ 
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute bottom-0 left-0 w-72 h-72 bg-white/10 rounded-full -ml-36 -mb-36"
        />
        
        <CardContent className="p-6 md:p-8 relative z-10">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
            <div className="flex-1">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="flex items-center gap-2 mb-3"
              >
                <Sparkles className="w-5 h-5 text-yellow-300" />
                <span className="text-teal-100 font-medium text-sm">{getGreeting()}</span>
              </motion.div>
              
              <motion.h1 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 tracking-tight"
              >
                Welcome {name}
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="text-teal-100 text-base md:text-lg leading-relaxed"
              >
                Your journey matters, and you're not alone
              </motion.p>
            </div>

             {/* Stage Badge */}
            {profile?.stage && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
            >
             <div
                  className={`${stageColors[profile.stage]} border-2 font-semibold px-6 py-2 text-sm rounded-full shadow-lg`}
                >
                  {stageLabels[profile.stage] || profile.stage}
                </div>
              </motion.div>
            )}
          </div>
          {/* Additional Info Row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-6 flex flex-wrap  items-center gap-4"
          >
            {profile?.location && (
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md rounded-full px-5 py-2.5 shadow-lg">
                <MapPin className="w-4 h-4" />
                <span className="text-sm font-medium">{profile.location}</span>
              </div>
            )}
            {profile?.diagnosis_date && (
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md rounded-full px-5 py-2.5 shadow-lg">
                <Calendar className="w-4 h-4" />
                <span className="text-sm font-medium">
                  Diagnosed: {profile.diagnosis_date}
                </span>
              </div>
            )}
            {profile?.age && (
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md rounded-full px-5 py-2.5 shadow-lg">
                <User className="w-4 h-4" />
                <span className="text-sm font-medium">{profile.age} years</span>
              </div>
            )}
  {/* Log Health Button (bottom-right corner) */}
    <div className="flex flex-wrap gap-4 flex-1"></div>
  <div className="ml-auto">
  <Link to="/tracksymptoms">
    <Button
      size="lg"
      className="bg-white text-blue-600 hover:bg-blue-50 shadow-lg hover:shadow-xl transition-all duration-300 font-semibold px-6 py-3 text-sm rounded-full inline-flex items-center gap-2 transform hover:scale-105"
    >
      <Plus className="w-5 h-5" />
      Log Today's Health
    </Button>
  </Link>
  </div>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
}