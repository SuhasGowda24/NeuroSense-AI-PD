import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { Badge } from "../../../components/ui/badge";
import { 
  Heart, 
  BookOpen, 
  Users, 
  Phone, 
  MessageCircle, 
  Video,
  AlertCircle,
  CheckCircle,
  Clock,
  Calendar
} from 'lucide-react';


const caregivingResources = [
  {
    title: "Understanding Parkinson's Symptoms",
    description: "Learn to recognize and respond to common PD symptoms",
    icon: BookOpen,
    color: "text-blue-600",
    bg: "bg-blue-50"
  },
  {
    title: "Medication Management Guide",
    description: "Best practices for helping with medication schedules",
    icon: Clock,
    color: "text-purple-600",
    bg: "bg-purple-50"
  },
  {
    title: "Safety at Home",
    description: "Tips for creating a safe living environment",
    icon: AlertCircle,
    color: "text-orange-600",
    bg: "bg-orange-50"
  },
  {
    title: "Communication Strategies",
    description: "Effective ways to communicate and provide support",
    icon: MessageCircle,
    color: "text-green-600",
    bg: "bg-green-50"
  }
];

const supportServices = [
  {
    name: "24/7 Caregiver Helpline",
    description: "Immediate support and guidance",
    phone: "1-800-CARE-PD",
    available: "Always Available",
    icon: Phone
  },
  {
    name: "Virtual Support Groups",
    description: "Connect with other caregivers",
    schedule: "Every Wednesday 7 PM",
    members: "200+ caregivers",
    icon: Video
  },
  {
    name: "Respite Care Services",
    description: "Take a break when you need it",
    availability: "On-demand scheduling",
    icon: Calendar
  }
];

const selfCareChecklist = [
  { task: "Take breaks throughout the day", checked: true },
  { task: "Get adequate sleep (7-8 hours)", checked: true },
  { task: "Maintain your own health appointments", checked: false },
  { task: "Exercise regularly", checked: true },
  { task: "Connect with friends and family", checked: false },
  { task: "Join a support group", checked: true },
  { task: "Practice stress management", checked: false },
  { task: "Ask for help when needed", checked: true }
];

export default function CaregiverHub() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-blue-300 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2 flex items-center gap-3">
            <Heart className="w-8 h-8 text-pink-600" />
            Caregiver Support Hub
          </h1>
          <p className="text-gray-600">Resources and support for those caring for loved ones with Parkinson's</p>
        </div>

        {/* Hero Message */}
        <Card className="border-none shadow-2xl bg-gradient-to-br from-teal-600 via-cyan-600 to-blue-600 text-white overflow-hidden relative group">
          <CardContent className="pt-8 pb-8 text-center">
            <Heart className="w-16 h-16 text-pink-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white mb-3">
              You're Not Alone in This Journey
            </h2>
            <p className="text-white max-w-2xl mx-auto mb-6 leading-relaxed">
              Caring for someone with Parkinson's is both rewarding and challenging. 
              Remember to take care of yourself too. Your well-being matters just as much.
            </p>
            <div className="flex justify-center gap-3 flex-wrap">
                <a href="https://www.caregiveraction.org/toolbox/?_disease=parkinsons" target="_blank" rel="noopener noreferrer">
              <Button className="bg-blue-700 hover:bg-white hover:text-black">
                <Phone className="w-4 h-4 mr-2" />
                Call Support Line
              </Button>
              </a>
              <a href={"https://www.facebook.com/groups/201714486219468"} target="_blank" rel="noopener noreferrer">
                <Button variant="outline text-black">
                  <Users className="w-4 h-4 mr-2" />
                  Join Support Group
                </Button>
              </a>
            </div>
          </CardContent>
        </Card>
<div className="mb-7"></div>
        {/* Quick Stats */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-white shadow-lg border-none">
            <CardContent className="pt-6 text-center">
              <BookOpen className="w-10 h-10 text-blue-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900">50+</p>
              <p className="text-xs text-gray-600">Care Guides</p>
            </CardContent>
          </Card>
          <Card className="bg-white shadow-lg border-none">
            <CardContent className="pt-6 text-center">
              <Users className="w-10 h-10 text-purple-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900">1,000+</p>
              <p className="text-xs text-gray-600">Caregivers</p>
            </CardContent>
          </Card>
          <Card className="bg-white shadow-lg border-none">
            <CardContent className="pt-6 text-center">
              <Video className="w-10 h-10 text-green-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900">24/7</p>
              <p className="text-xs text-gray-600">Support</p>
            </CardContent>
          </Card>
          <Card className="bg-white shadow-lg border-none">
            <CardContent className="pt-6 text-center">
              <Heart className="w-10 h-10 text-pink-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900">100%</p>
              <p className="text-xs text-gray-600">Free</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          {/* Resources */}
          <div className="lg:col-span-2">
            <Card className="shadow-xl border-none mb-6">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-blue-600" />
                  Caregiving Resources
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="grid md:grid-cols-2 gap-4">
                  {caregivingResources.map((resource, index) => {
                    const Icon = resource.icon;
                    return (
                      <div 
                        key={index}
                        className="bg-white p-5 rounded-lg border-2 border-gray-100 hover:border-blue-200 hover:shadow-md transition-all cursor-pointer"
                      >
                        <div className={`w-12 h-12 ${resource.bg} rounded-lg flex items-center justify-center mb-3`}>
                          <Icon className={`w-6 h-6 ${resource.color}`} />
                        </div>
                        <h3 className="font-semibold text-gray-900 mb-2">{resource.title}</h3>
                        <p className="text-sm text-gray-600 mb-3">{resource.description}</p>
                        <Button size="sm" variant="outline" className="w-full">
                          Learn More
                        </Button>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Support Services */}
            <Card className="shadow-xl border-none">
              <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50">
                <CardTitle className="flex items-center gap-2">
                  <Phone className="w-5 h-5 text-purple-600" />
                  Support Services
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  {supportServices.map((service, index) => {
                    const Icon = service.icon;
                    return (
                      <div key={index} className="bg-white p-5 rounded-lg border-2 border-gray-100">
                        <div className="flex items-start gap-4">
                          <div className="p-3 bg-purple-50 rounded-lg">
                            <Icon className="w-6 h-6 text-purple-600" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900 mb-1">{service.name}</h3>
                            <p className="text-sm text-gray-600 mb-3">{service.description}</p>
                            <div className="flex flex-wrap gap-2">
                              {service.phone && (
                                <Badge variant="secondary" className="text-xs">
                                  📞 {service.phone}
                                </Badge>
                              )}
                              {service.schedule && (
                                <Badge variant="secondary" className="text-xs">
                                  📅 {service.schedule}
                                </Badge>
                              )}
                              {service.members && (
                                <Badge variant="secondary" className="text-xs">
                                  👥 {service.members}
                                </Badge>
                              )}
                              {service.availability && (
                                <Badge variant="secondary" className="text-xs">
                                  ⏰ {service.availability}
                                </Badge>
                              )}
                            </div>
                          </div>
                          <a href="https://www.caregiveraction.org/toolbox/?_disease=parkinsons" target="_blank" rel="noopener noreferrer">
                            <Button size="sm">Access</Button>
                          </a>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Self-Care Checklist */}
          <div>
            <Card className="shadow-xl border-none sticky top-4">
              <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50">
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  Your Self-Care Checklist
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <p className="text-sm text-gray-600 mb-4">
                  Taking care of yourself is not selfish—it's essential.
                </p>
                <div className="space-y-3">
                  {selfCareChecklist.map((item, index) => (
                    <div 
                      key={index}
                      className={`flex items-start gap-3 p-3 rounded-lg ${
                        item.checked ? 'bg-green-50' : 'bg-gray-50'
                      }`}
                    >
                      <div className={`mt-0.5 flex-shrink-0 w-5 h-5 rounded border-2 flex items-center justify-center ${
                        item.checked 
                          ? 'bg-green-600 border-green-600' 
                          : 'border-gray-300'
                      }`}>
                        {item.checked && <CheckCircle className="w-4 h-4 text-white" />}
                      </div>
                      <span className={`text-sm ${
                        item.checked ? 'text-green-900 font-medium' : 'text-gray-700'
                      }`}>
                        {item.task}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="text-sm text-yellow-900 font-medium mb-2">
                    💡 Remember:
                  </p>
                  <p className="text-xs text-yellow-800">
                    You can't pour from an empty cup. Taking care of yourself 
                    means you'll be better able to care for your loved one.
                  </p>
                </div>

                <Button className="w-full mt-4 bg-green-600 hover:bg-green-700">
                  <Heart className="w-4 h-4 mr-2" />
                  Set Self-Care Reminder
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Emergency Contacts */}
        <Card className="shadow-xl border-none bg-gradient-to-r from-red-50 to-orange-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-900">
              <AlertCircle className="w-5 h-5 text-red-600" />
              Emergency Contacts & Resources
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded-lg border-2 border-red-200">
                <h4 className="font-semibold text-gray-900 mb-2">Medical Emergency</h4>
                <p className="text-2xl font-bold text-red-600 mb-1">112</p>
                <p className="text-xs text-gray-600">For immediate medical assistance</p>
              </div>
              <div className="bg-white p-4 rounded-lg border-2 border-orange-200">
                <h4 className="font-semibold text-gray-900 mb-2">Crisis Helpline</h4>
                <p className="text-2xl font-bold text-orange-600 mb-1">988</p>
                <p className="text-xs text-gray-600">Mental health crisis support</p>
              </div>
              <div className="bg-white p-4 rounded-lg border-2 border-yellow-200">
                <h4 className="font-semibold text-gray-900 mb-2">Caregiver Support</h4>
                <p className="text-2xl font-bold text-yellow-600 mb-1">1-800-CARE-PD</p>
                <p className="text-xs text-gray-600">24/7 caregiver assistance</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}