import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { Badge } from "../../../components/ui/badge";
import { Users, Heart, BookOpen, MapPin, Video, MessageCircle, ExternalLink, PlayCircle } from 'lucide-react';

const supportGroups = [
  {
    name: "Local Parkinson's Support Group",
    location: "Community Center, Downtown",
    schedule: "Every Tuesday, 6:00 PM",
    members: 45,
    type: "In-Person"
  },
  {
    name: "Young Onset PD Support",
    location: "Virtual Meeting",
    schedule: "First Saturday, 10:00 AM",
    members: 89,
    type: "Virtual"
  },
  {
    name: "Caregiver Support Circle",
    location: "Memorial Hospital",
    schedule: "Monthly, Last Wednesday",
    members: 32,
    type: "In-Person"
  }
];

const educationalResources = [
  {
    title: "Understanding Parkinson's Disease",
    type: "Video Series",
    duration: "45 min",
    icon: PlayCircle
  },
  {
    title: "Exercise Guide for PD Patients",
    type: "PDF Download",
    duration: "20 pages",
    icon: BookOpen
  },
  {
    title: "Nutrition & Parkinson's",
    type: "Webinar",
    duration: "1 hour",
    icon: Video
  },
  {
    title: "Managing Medications Effectively",
    type: "Guide",
    duration: "15 min read",
    icon: BookOpen
  }
];

const patientStories = [
  {
    name: "Sarah M.",
    title: "Living Well with Parkinson's",
    excerpt: "Five years after diagnosis, I've learned that PD doesn't define me. Through exercise and community support...",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop"
  },
  {
    name: "James R.",
    title: "From Diagnosis to Hope",
    excerpt: "My journey with Parkinson's has taught me resilience. Every day is a new opportunity to...",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop"
  },
  {
    name: "Maria L.",
    title: "Caregiving with Love",
    excerpt: "As a caregiver for my husband with PD, I've discovered strength I didn't know I had...",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop"
  }
];

export default function Community() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 to-purple-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-3">
            <Users className="w-8 h-8 text-violet-600" />
            Community & Support
          </h1>
          <p className="text-gray-600">Connect, learn, and find support on your journey</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-none shadow-lg">
            <CardContent className="pt-6 text-center">
              <Users className="w-12 h-12 text-blue-600 mx-auto mb-3" />
              <p className="text-3xl font-bold text-gray-900 mb-1">1,200+</p>
              <p className="text-sm text-gray-600">Community Members</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-pink-50 to-rose-50 border-none shadow-lg">
            <CardContent className="pt-6 text-center">
              <Heart className="w-12 h-12 text-pink-600 mx-auto mb-3" />
              <p className="text-3xl font-bold text-gray-900 mb-1">50+</p>
              <p className="text-sm text-gray-600">Support Groups</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-violet-50 border-none shadow-lg">
            <CardContent className="pt-6 text-center">
              <BookOpen className="w-12 h-12 text-purple-600 mx-auto mb-3" />
              <p className="text-3xl font-bold text-gray-900 mb-1">100+</p>
              <p className="text-sm text-gray-600">Resources Available</p>
            </CardContent>
          </Card>
        </div>

        <Card className="shadow-xl border-none mb-8">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5 text-blue-600" />
              Local Support Groups
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              {supportGroups.map((group, index) => (
                <div key={index} className="bg-white p-6 rounded-lg border-2 border-gray-100 hover:border-blue-200 transition-colors">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">{group.name}</h3>
                      <div className="flex flex-wrap gap-2 mb-2">
                        <Badge variant="secondary">{group.type}</Badge>
                        <Badge variant="outline">{group.members} members</Badge>
                      </div>
                    </div>
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Join
                    </Button>
                  </div>
                  <div className="space-y-1 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-gray-400" />
                      <span>{group.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Video className="w-4 h-4 text-gray-400" />
                      <span>{group.schedule}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-xl border-none mb-8">
          <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50">
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-purple-600" />
              Educational Resources
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid md:grid-cols-2 gap-4">
              {educationalResources.map((resource, index) => {
                const Icon = resource.icon;
                return (
                  <div key={index} className="bg-white p-5 rounded-lg border-2 border-gray-100 hover:shadow-md transition-shadow cursor-pointer">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-purple-50 rounded-lg">
                        <Icon className="w-6 h-6 text-purple-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-1">{resource.title}</h3>
                        <div className="flex gap-2 text-sm text-gray-600">
                          <Badge variant="secondary" className="text-xs">{resource.type}</Badge>
                          <span>{resource.duration}</span>
                        </div>
                        <Button size="sm" variant="link" className="p-0 h-auto mt-2 text-purple-600">
                          Access Resource <ExternalLink className="w-3 h-3 ml-1" />
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-xl border-none">
          <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50">
            <CardTitle className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-green-600" />
              Inspiring Patient Stories
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid md:grid-cols-3 gap-6">
              {patientStories.map((story, index) => (
                <div key={index} className="bg-white rounded-lg overflow-hidden border-2 border-gray-100 hover:shadow-lg transition-shadow">
                  <img
                    src={story.image}
                    alt={story.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-5">
                    <h3 className="font-bold text-gray-900 mb-1">{story.name}</h3>
                    <p className="text-sm font-medium text-purple-600 mb-3">{story.title}</p>
                    <p className="text-sm text-gray-600 mb-4">{story.excerpt}</p>
                    <Button size="sm" variant="outline" className="w-full">
                      Read Full Story
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}