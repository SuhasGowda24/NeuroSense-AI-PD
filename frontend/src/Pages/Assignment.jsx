import React from 'react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { TrendingUp, TrendingDown, CalendarCheck2, Lightbulb, PlayCircle, BrainCircuit, HeartHandshake, User, BookOpen, Activity } from 'lucide-react';


const ModuleCard = ({ title, description, icon: Icon, onClick }) => {
    return (
        <div onClick={onClick} className="h-full border border-gray-200 rounded-2xl p-6 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col items-center text-center bg-white">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <Icon className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">{title}</h3>
            <p className="text-sm text-gray-500 mt-1">{description}</p>
        </div>
    );
};

export default function Home() {

    const modules = [
        { title: 'My Journey', description: '(Timeline, milestones, export)', icon: User },
        { title: 'Learn About PD', description: '(Basics, symptoms, treatments)', icon: BookOpen},
        { title: 'Symptom Tracker', description: '(Interactive charts)', icon: Activity},
        { title: 'My Medications', description: '(Planner / reminders)', icon: CalendarCheck2},
        { title: 'Decision Tools', description: '(What-if simulator, self-check)', icon: BrainCircuit },
        { title: 'Caregiver Corner', description: '(Stress, self-care, guides)', icon: HeartHandshake }
    ];

    return (
    <div className="bg-white text-gray-800">
      
      {/* Hero Section */}
      <section className="bg-blue-50 text-center py-20 px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 text-gray-900 tracking-tight">
          Living With Parkinson’s, <span className="text-blue-600">Your Way</span>
        </h1>
        <div className="flex flex-col lg:flex-row items-center justify-center gap-12 max-w-6xl mx-auto mt-10">
          {/* <div className="w-full lg:w-1/2 max-w-2xl relative rounded-xl shadow-2xl overflow-hidden group cursor-pointer" >
            <img
              src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2940&auto=format&fit=crop"
              alt="Supportive healthcare professional with a patient"
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
              <PlayCircle className="w-20 h-20 text-white/80 transition-transform duration-300 group-hover:scale-110" />
            </div>
          </div> */}
          <div className="flex flex-col gap-4 w-full max-w-xs">
            <Button size="lg" className="rounded-xl shadow-md" >
              Start My Journey
            </Button>
            <Button size="lg" variant="outline" className="rounded-xl" >
              Caregiver Guide
            </Button>
          </div>
        </div>
      </section>

      {/* Dashboard Snapshot */}
      <section className="bg-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
              My Parkinson’s Dashboard
            </h2>
            <div className="grid md:grid-cols-4 gap-6 text-center">
              <Card className="p-4 shadow-sm">
                <CardHeader>
                    <CardTitle className="text-base font-medium text-gray-600">Symptom Score</CardTitle>
                </CardHeader>
                <CardContent className="flex items-center justify-center gap-2">
                    <TrendingUp className="w-6 h-6 text-orange-500"/>
                    <TrendingDown className="w-6 h-6 text-green-500"/>
                </CardContent>
              </Card>
              <Card className="p-4 shadow-sm">
                 <CardHeader>
                    <CardTitle className="text-base font-medium text-gray-600">Medication Adherence</CardTitle>
                </CardHeader>
                <CardContent>
                    <span className="text-2xl font-bold text-green-600">90%</span>
                </CardContent>
              </Card>
              <Card className="p-4 shadow-sm bg-blue-50 border-blue-200">
                 <CardHeader>
                    <CardTitle className="text-base font-medium text-gray-600 flex items-center justify-center gap-2"><Lightbulb className="w-5 h-5 text-blue-600"/>Tip of the Day</CardTitle>
                </CardHeader>
                <CardContent>
                    <em className="text-blue-700">Try walking with cues</em>
                </CardContent>
              </Card>
              <div className="flex items-center justify-center">
                <Button className="w-full" >
                  Add Today’s Symptoms
                </Button>
              </div>
            </div>
        </div>
      </section>

      {/* Modules */}
      <section className="bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">
              Explore Our Platform
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {modules.map((module) => (
                <ModuleCard key={module.title} {...module} />
              ))}
            </div>
        </div>
      </section>

    </div>
  );
}