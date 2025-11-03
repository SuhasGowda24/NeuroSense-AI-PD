import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { CardContent, CardHeader, CardTitle } from "../components/ui/card";
import Typewriter from "../components/Typewriter";
import { Activity, Brain, Shield, Clock, Users, Award, ArrowRight, BookOpen, CheckCircle, ChevronLeft, ChevronRight, User, CalendarCheck2, BrainCircuit, HeartHandshake, UserPlus, ClipboardList } from "lucide-react";

export default function Home() {
  const features = [
    { icon: Brain, 
      title: "AI-Powered Analysis", 
      description: "Advanced machine learning algorithms analyze handwriting patterns to detect early signs of Parkinson's disease", 
      color: "from-blue-500 to-blue-600" 
    },
    { icon: Clock, 
      title: "Early Detection", 
      description: "Identify potential symptoms years before traditional clinical diagnosis, enabling proactive treatment", 
      color: "from-green-500 to-green-600" 
    },
    { icon: Shield, 
      title: "Non-Invasive Testing", 
      description: "Simple handwriting tests that can be performed anywhere, anytime, without specialized equipment", 
      color: "from-purple-500 to-purple-600" 
    },
    { icon: Award, 
      title: "Clinical Accuracy", 
      description: "Research-backed algorithms with high sensitivity and specificity rates validated by medical professionals", 
      color: "from-orange-500 to-orange-600" 
    }
  ];

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

  const benefits = [
    "Quick 5-minute assessment",
    "Immediate AI-powered results",
    "Secure medical-grade platform",
    "Historical tracking and analysis",
    "Professional medical reporting",
    "Mobile and desktop compatible"
  ];

   const phrases = [
    "Detection & Assessment",
    "Learning and Awareness Hub",
    "Daily Symptom Tracking",
    "Medication Management",
    "AI-Powered Insights",
    "Personalized Health Journey",
    "Community and Caregiver Support",
    "Exercise and Wellness Guidance",
  ];
  
  const modules = [
    { title: 'Learn About PD', description: '(Basics, symptoms, treatments)', icon: BookOpen},
    { title: 'Symptom Tracker', description: '(Interactive charts)', icon: Activity},
    { title: 'My Medications', description: '(Planner / reminders)', icon: CalendarCheck2},
    { title: 'Decision Tools', description: '(What-if simulator, self-check)', icon: BrainCircuit },
    { title: 'My Journey', description: '(Timeline, milestones, export)', icon: User },
    { title: 'Caregiver Corner', description: '(Stress, self-care, guides)', icon: HeartHandshake }
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = 4;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };


  return (
    <div className="home-container">

      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <div className="hero-icon-wrapper">
            <div id="heart"></div>
          </div>

    <h1 className="hero-title text-3xl md:text-4xl font-bold text-center">
      Early Parkinson's <br />
      <span className="text-indigo-600">
        <Typewriter phrases={phrases} />
      </span>
    </h1>

      <p className="hero-subtitle">
        Revolutionary AI-powered handwriting analysis for early detection of Parkinson's disease. 
        Simple, accurate, and accessible screening that could save lives through early intervention.
      </p>
<div className="flex flex-col items-center gap-8">
  <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
    <Link to="Assignment">
      <Button className="group relative overflow-hidden bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold py-4 px-8 rounded-2xl shadow-2xl hover:shadow-blue-500/25 transform hover:scale-105 transition-all duration-300 min-w-[220px] border border-blue-400/20">
        <Activity className="w-5 h-5 mr-3 group-hover:rotate-12 transition-transform duration-300" />
        <span className="text-lg">More About Assessment</span>
      </Button>
    </Link>
    
    <Link to="/learning">
      <Button  className="bg-white/100 backdrop-blur-lg border-2 border-white/30 text-blue-700 hover:bg-blue-600 hover:text-white font-semibold py-4 px-8 rounded-2xl text-lg transition-all duration-300 min-w-[220px]">
      <BookOpen className="w-5 h-5 mr-3" />
      Learning Center
      </Button>
    </Link>
      </div>
    </div>
  </div>
</div>

      {/* Features Section */}
      <div className="features-section">
        <div className="features-header">
          <h2>Advanced Medical Technology</h2>
          <p>
            Our platform combines cutting-edge artificial intelligence with medical expertise 
            to provide accurate, early detection of Parkinson's disease symptoms.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-8">
  {features.map((feature, index) => {
    const Icon = feature.icon;

  return (
    <div key={index}  className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
      <CardHeader className="text-center pb-2">
        <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
          <Icon />
        </div>
        <CardTitle className="text-xl font-bold text-gray-900">{feature.title || "Feature Title"}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 text-center leading-relaxed"> {feature.description}</p>
      </CardContent>
    </div>
  );
})}
  </div>
  </div>

      {/* Benefits Section */}
      <div className="py-20 bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">Why Choose Our Platform?</h2>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Experience the most advanced, user-friendly Parkinson's screening technology 
              available today.
            </p>
            
            <div className="space-y-4">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-4 h-4 text-white"/>
                  </div>
                  <span className="text-gray-700 font-medium">{benefit}</span>
                </div>
              ))}
            </div>
            </div>

          <div className="relative">
              <div className="bg-white rounded-3xl shadow-2xl p-8 relative z-10">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Users className="w-8 h-8 text-white"/>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Trusted by NeuroHealth</h3>
              <div className="grid grid-cols-2 gap-6 text-center">
                <div>
                  <div className="text-3xl font-bold text-blue-600">74%</div>
                  <div className="text-sm text-gray-600">Accuracy Rate</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-green-600">10</div>
                  <div className="text-sm text-gray-600">Tests Completed</div>
                  </div>
                <div>
                  <div className="text-3xl font-bold text-purple-600">200+</div>
                  <div className="text-sm text-gray-600">Medical Centers</div>
                  </div>
                <div>
                  <div className="text-3xl font-bold text-orange-600">24/7</div>
                  <div className="text-sm text-gray-600">Available</div>
                  </div>
              </div>
            </div>
          </div>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-3xl transform rotate-6 opacity-20"></div>
        </div>
        </div> 
        </div>
        </div>

{/* Slider Panels */}
   <div className="device-slider-container">
      <div className="device-slider-wrapper">
        {/* Header */}
        <div className="slider-header">
          <h2>Seamless Experience Across All Devices</h2>
          <p>
            Access your health tracking from anywhere, on any device. Fully responsive design for desktop, tablet, and mobile.
          </p>
        </div>

        {/* Slider Container */}
        <div className="bg-white rounded-3xl p-8 md:p-16 shadow-2xl relative overflow-hidden">
          {/* Slider Wrapper */}
          <div className="relative w-full h-[400px] md:h-[500px]">
            {/* Slide 1: Home */}
            <div
              className={`absolute inset-0 flex items-center justify-center transition-opacity duration-500 ${
                currentSlide === 0 ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <img src="/assets/Home.png" alt="Home Page View"/>
            </div>

            {/* Slide 2: Auth */}
            <div
              className={`absolute inset-0 flex items-center justify-center transition-opacity duration-500 ${
                currentSlide === 1 ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <img src="/assets/Auth.png" alt="Auth Page View"/>
            </div>

            {/* Slide 3: PD */}
            <div
              className={`absolute inset-0 flex items-center justify-center transition-opacity duration-500 ${
                currentSlide === 2 ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <img src="/assets/PD.png" alt="Patient-Dashboard Page View"/>
            </div>

             {/* Slide 4: AD*/}
            <div
              className={`absolute inset-0 flex items-center justify-center transition-opacity duration-500 ${
                currentSlide === 3 ? 'opacity-100' : 'opacity-0'
              }`}
            >
                <img src="/assets/AD.png" alt="Admin-Dashboard Page View"/>
            </div>
          </div>

          {/* Arrow Controls */}
          <div className="absolute top-1/2 transform -translate-y-1/2 left-4 right-4 flex justify-between pointer-events-none">
            <button
              onClick={prevSlide}
              className="w-11 h-11 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all duration-300 hover:scale-110 pointer-events-auto"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextSlide}
              className="w-11 h-11 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all duration-300 hover:scale-110 pointer-events-auto"
              aria-label="Next slide"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Dot Controls */}
          <div className="flex justify-center gap-4 mt-10">
            {[0, 1, 2, 3].map((index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-3 rounded-full transition-all duration-300 ${
                  currentSlide === index
                    ? 'w-9 bg-blue-600'
                    : 'w-3 bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>

      {/* Modules */}
      <section className="bg-gray-100 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
            <h2 className="text-center text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              Explore Our Platform
            </h2>
            <p className="text-center text-xl text-gray-700 mb-8 leading-relaxed">
              Discover interactive tools and learning spaces designed to empower patients in managing Parkinson’s Disease.
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {modules.map((module) => (
                <ModuleCard key={module.title} {...module} />
              ))}
            </div>
        </div>
      </section>

        {/* How It Works Section */}
      <section className="bg-gray-50 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center">
            <h2 className="text-center text-3xl lg:text-4xl font-bold text-gray-900 mb-6">Your Path to Empowerment</h2>
            <p className="text-center text-xl text-gray-700 mb-8 leading-relaxed"> A clear, guided journey to take control of your neurological health.</p>
            <div className="grid md:grid-cols-3 gap-10">
                <div className="flex flex-col items-center">
                    <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mb-4 border-4 border-white shadow-lg">
                        <UserPlus className="w-10 h-10 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">1. Sign Up & Personalize</h3>
                    <p className="text-gray-800"> Create your secure profile and customize your experience for better insights.</p>
                </div>
                <div className="flex flex-col items-center">
                    <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mb-4 border-4 border-white shadow-lg">
                        <ClipboardList className="w-10 h-10 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">2. Learn & Track</h3>
                    <p className="text-gray-800">Access learning resources and monitor your progress, symptoms, and medications with ease.</p>
                </div>
                <div className="flex flex-col items-center">
                    <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mb-4 border-4 border-white shadow-lg">
                        <Users className="w-10 h-10 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">3. Connect & Grow</h3>
                    <p className="text-gray-800">Engage with our supportive community, share experiences, and learn from others on a similar journey.</p>
                </div>
              <div className="flex flex-col items-center justify-center">
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mb-4 border-4 border-white shadow-lg">
                  <Brain className="w-10 h-10 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">4. Take AI Assessment</h3>
                <p className="text-gray-800">
                   Experience real-time AI evaluation through handwriting or image tests. 
          Get instant, detailed reports—ready to view, download, and track over time.
                </p>
              </div>
            </div>
        </div>
      </section>

      {/* CTA Section */}
      <div className="cta-section">
        <h2>Ready to Take Control of Your Health?</h2>
        <p>
          Early detection can make all the difference. Start your assessment today and take 
          the first step towards proactive healthcare management.
        </p>
       <Link to="/AuthPage">
  <Button className="group relative overflow-hidden bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold py-4 px-8 rounded-2xl shadow-2xl hover:shadow-blue-500/50 transform hover:scale-105 transition-all duration-300 min-w-[220px] border border-blue-400/20 animate-[heartbeat_1.5s_ease-in-out_infinite] hover:animate-none">
    <span className="relative z-10 flex items-center justify-center text-lg">
      Get Started Now
      <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform duration-300" />
    </span>
    {/* Animated gradient border glow */}
    <span className="absolute -inset-1 bg-gradient-to-r from-blue-400 via-indigo-500 to-blue-400 rounded-2xl opacity-75 blur-sm group-hover:opacity-100 group-hover:blur-md transition-all duration-300 -z-10 animate-[heartbeat_1.5s_ease-in-out_infinite] group-hover:animate-none" />
  </Button>
</Link>
      </div>
      </div>
  );
}

