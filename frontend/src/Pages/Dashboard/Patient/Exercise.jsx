import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { Badge } from "../../../components/ui/badge";
import {
  Activity,
  Clock,
  PlayCircle,
  CheckCircle,
  Dumbbell,
  Heart,
  Target,
} from 'lucide-react';

const exercisePrograms = [
  {
    id: 1,
    title: "Morning Stretching Routine",
    duration: "15 min",
    difficulty: "Beginner",
    benefits: ["Reduces stiffness", "Improves flexibility"],
    exercises: [
      "Neck rolls - 2 min",
      "Shoulder rotations - 3 min",
      "Torso twists - 3 min",
      "Leg stretches - 5 min",
      "Deep breathing - 2 min"
    ],
    videoUrl: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=300&fit=crop",
    icon: Activity
  },
  {
    id: 2,
    title: "Balance & Stability",
    duration: "20 min",
    difficulty: "Intermediate",
    benefits: ["Prevents falls", "Strengthens core"],
    exercises: [
      "Single leg stands - 5 min",
      "Heel-to-toe walk - 5 min",
      "Chair exercises - 5 min",
      "Wall push-ups - 5 min"
    ],
    videoUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop",
    icon: Target
  },
  {
    id: 3,
    title: "Cardio Walking Program",
    duration: "30 min",
    difficulty: "All Levels",
    benefits: ["Improves endurance", "Boosts mood"],
    exercises: [
      "Warm-up walk - 5 min",
      "Brisk walking - 20 min",
      "Cool down - 5 min"
    ],
    videoUrl: "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=400&h=300&fit=crop",
    icon: Heart
  },
  {
    id: 4,
    title: "Strength Training",
    duration: "25 min",
    difficulty: "Intermediate",
    benefits: ["Builds muscle", "Increases metabolism"],
    exercises: [
      "Light weights - 10 min",
      "Resistance bands - 10 min",
      "Bodyweight exercises - 5 min"
    ],
    videoUrl: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400&h=300&fit=crop",
    icon: Dumbbell
  }
];

const difficultyColors = {
  "Beginner": "bg-green-100 text-green-800",
  "Intermediate": "bg-yellow-100 text-yellow-800",
  "Advanced": "bg-red-100 text-red-800",
  "All Levels": "bg-blue-100 text-blue-800"
};

export default function Exercise() {
  const [selectedProgram, setSelectedProgram] = useState(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2 flex items-center gap-3">
            <Activity className="w-8 h-8 text-green-600" />
            Exercise & Movement
          </h1>
          <p className="text-gray-600">
            Stay active and manage symptoms through regular exercise
          </p>
        </div>

        {/* Exercise Programs */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {exercisePrograms.map((program) => {
            const Icon = program.icon;
            return (
              <Card
                key={program.id}
                className="shadow-lg border-none hover:shadow-xl transition-all cursor-pointer overflow-hidden"
                onClick={() => setSelectedProgram(program)}
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={program.videoUrl}
                    alt={program.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                    <div className="flex items-center gap-2 text-white">
                      <PlayCircle className="w-8 h-8" />
                      <span className="font-semibold">Watch Video</span>
                    </div>
                  </div>
                  <Badge
                    className={`absolute top-4 right-4 ${difficultyColors[program.difficulty]}`}
                  >
                    {program.difficulty}
                  </Badge>
                </div>

                <CardContent className="pt-6">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <Icon className="w-5 h-5 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900 text-lg mb-1">
                        {program.title}
                      </h3>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Clock className="w-4 h-4" />
                        <span>{program.duration}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mb-3">
                    <p className="text-xs font-semibold text-gray-700 mb-2">
                      Benefits:
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {program.benefits.map((benefit, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">
                          {benefit}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-xs font-semibold text-gray-700 mb-2">
                      Exercises:
                    </p>
                    <ul className="space-y-1">
                      {program.exercises.slice(0, 3).map((exercise, idx) => (
                        <li
                          key={idx}
                          className="text-xs text-gray-600 flex items-center gap-2"
                        >
                          <CheckCircle className="w-3 h-3 text-green-600" />
                          {exercise}
                        </li>
                      ))}
                      {program.exercises.length > 3 && (
                        <li className="text-xs text-gray-500 italic">
                          +{program.exercises.length - 3} more...
                        </li>
                      )}
                    </ul>
                  </div>

                  <Button className="w-full bg-green-600 hover:bg-green-700">
                    <PlayCircle className="w-4 h-4 mr-2" />
                    Start Workout
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Tips Section */}
        <Card className="shadow-xl border-none bg-gradient-to-br from-yellow-50 to-orange-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-orange-600" />
              Exercise Tips for Parkinson's
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">
                  🎯 Set Realistic Goals
                </h4>
                <p className="text-sm text-gray-600">
                  Start with 10-15 minutes daily and gradually increase.
                  Consistency matters more than intensity.
                </p>
              </div>
              <div className="bg-white p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">
                  ⏰ Best Time to Exercise
                </h4>
                <p className="text-sm text-gray-600">
                  Exercise when your medication is working best, typically
                  30-60 minutes after taking it.
                </p>
              </div>
              <div className="bg-white p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">
                  💧 Stay Hydrated
                </h4>
                <p className="text-sm text-gray-600">
                  Drink water before, during, and after exercise to prevent
                  dehydration and fatigue.
                </p>
              </div>
              <div className="bg-white p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">
                  🤝 Exercise with Others
                </h4>
                <p className="text-sm text-gray-600">
                  Join a group class or exercise with a partner for motivation
                  and safety.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
