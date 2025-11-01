import React from 'react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { TrendingUp, TrendingDown, Lightbulb } from 'lucide-react';
import { Link } from 'react-router-dom';


export default function Home() {

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
            <Link to="/AuthPage">
            <Button size="lg" className="rounded-xl shadow-md" >
              Start My Journey
            </Button>
            <div className="mb-4"></div>
            <Button size="lg" variant="outline" className="rounded-xl" >
              Caregiver Guide
            </Button>
            </Link>
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
                    <span className="text-2xl font-bold text-green-600">74%</span>
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
                <Link to="/AuthPage">
                <Button className="w-full" >
                  Add Today’s Symptoms
                </Button>
                </Link>
              </div>
            </div>
        </div>
      </section>
    </div>
  );
}