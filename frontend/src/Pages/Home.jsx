import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Activity, 
    Brain, 
    Shield, 
    Clock, 
    Users, 
    Award,
    ArrowRight,
    // Heart,
    CheckCircle } from "lucide-react";

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


  const benefits = [
    "Quick 5-minute assessment",
    "Immediate AI-powered results",
    "Secure medical-grade platform",
    "Historical tracking and analysis",
    "Professional medical reporting",
    "Mobile and desktop compatible"
  ];


  return (
    <div className="home-container">

      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <div className="hero-icon-wrapper">
            <div id="heart"></div>
            {/* <Heart id="heart"/> */}
          </div>
          <h1 className="hero-title">
            Early Parkinson's <br />
            <span>Detection Platform</span>
          </h1>
          <p className="hero-subtitle">
            Revolutionary AI-powered handwriting analysis for early detection of Parkinson's disease. 
            Simple, accurate, and accessible screening that could save lives through early intervention.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link to="Assignment">
                <Button className="group relative overflow-hidden bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold py-4 px-8 rounded-2xl shadow-2xl hover:shadow-blue-500/25 transform hover:scale-105 transition-all duration-300 min-w-[220px] border border-blue-400/20">

                  <Activity className="w-5 h-5 mr-3 group-hover:rotate-12 transition-transform duration-300" />
                   <span className="text-lg">Take Assessment</span>
                </Button>
              </Link>
              <Button variant="outline" className="bg-white text-black hover:bg-blue-500 to-indigo-600 font-semibold py-4 px-8 rounded-xl backdrop-blur-sm text-lg transition-colors duration-200">
                Learn More
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
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

  // // Map each index to a specific page
  // const cardLinks = ["/card1", "/card2", "/card3", "/card4"];
  // const link = cardLinks[index] || "/";

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
              available today. Trusted by medical professionals worldwide.
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

      {/* CTA Section */}
      <div className="cta-section">
        <h2>Ready to Take Control of Your Health?</h2>
        <p>
          Early detection can make all the difference. Start your assessment today and take 
          the first step towards proactive healthcare management.
        </p>
      </div>
      </div>
  );
}

