import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import { Textarea } from "../../../components/ui/textarea";
import { Slider } from "../../../components/ui/slider";
import { useUpsertSymptom } from '../../../hooks/useSymptomLogs';
import { ArrowLeft, Activity, Brain, Moon, TrendingUp, CheckCircle } from 'lucide-react';
import { Link, useNavigate } from "react-router-dom";
import { format } from 'date-fns';

export default function TrackSymptoms() {
  const navigate = useNavigate();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    tremor_severity: 5,
    stiffness_level: 5,
    mood_rating: 5,
    sleep_quality: 5,
    step_count: 0,
    notes: ''
  });

const upsertSymptom = useUpsertSymptom();

const handleSubmit = (e) => {
  e.preventDefault();
  upsertSymptom.mutate(formData, {
    onSuccess: () => {
      setIsSubmitted(true);
      setTimeout(() => navigate("/patientdashboard"), 2000);
    },
    onError: (err) => alert(err.message),
  });
};

  const getRatingColor = (value) => {
    if (value <= 3) return 'text-green-600';
    if (value <= 6) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getMoodColor = (value) => {
    if (value >= 8) return 'text-green-600';
    if (value >= 5) return 'text-yellow-600';
    return 'text-red-600';
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 flex items-center justify-center p-6">
        <Card className="max-w-md w-full text-center shadow-2xl border-none">
          <CardContent className="pt-12 pb-8">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              Health Logged Successfully!
            </h2>
            <p className="text-gray-600 mb-6">
              Your symptoms have been recorded. Keep up the great work tracking your health!
            </p>
            <div className="animate-pulse text-sm text-gray-500">
              Returning to dashboard...
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-4 md:p-8">
      <div className="max-w-3xl mx-auto">
        <div className="mb-6">
            <Link to="/patientdashboard">
          <Button
            variant="ghost"
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Track Your Symptoms</h1>
          <p className="text-gray-600">
            {format(new Date(), 'EEEE, MMMM d, yyyy')}
          </p>
          {/* {todayLog && (
            <p className="text-sm text-blue-600 mt-2">
              You've already logged today. This will update your entry.
            </p>
          )} */}
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Card className="shadow-lg border-none">
            <CardHeader className="bg-gradient-to-r from-red-50 to-orange-50">
              <CardTitle className="flex items-center gap-2">
                <Activity className="w-5 h-5 text-red-600" />
                Tremor Severity
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <Label>Rate your tremor intensity (0 = none, 10 = severe)</Label>
                  <span className={`text-3xl font-bold ${getRatingColor(formData.tremor_severity)}`}>
                    {formData.tremor_severity}
                  </span>
                </div>
                <Slider
                  value={[formData.tremor_severity]}
                  onValueChange={([value]) => setFormData({...formData, tremor_severity: value})}
                  max={10}
                  step={1}
                  className="py-4"
                />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>No tremor</span>
                  <span>Mild</span>
                  <span>Moderate</span>
                  <span>Severe</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-none">
            <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50">
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-purple-600" />
                Muscle Stiffness
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <Label>How stiff do your muscles feel?</Label>
                  <span className={`text-3xl font-bold ${getRatingColor(formData.stiffness_level)}`}>
                    {formData.stiffness_level}
                  </span>
                </div>
                <Slider
                  value={[formData.stiffness_level]}
                  onValueChange={([value]) => setFormData({...formData, stiffness_level: value})}
                  max={10}
                  step={1}
                  className="py-4"
                />
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-none">
            <CardHeader className="bg-gradient-to-r from-yellow-50 to-amber-50">
              <CardTitle className="flex items-center gap-2">
                <Brain className="w-5 h-5 text-amber-600" />
                Mood & Energy
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <Label>Overall mood (0 = very low, 10 = excellent)</Label>
                  <span className={`text-3xl font-bold ${getMoodColor(formData.mood_rating)}`}>
                    {formData.mood_rating}
                  </span>
                </div>
                <Slider
                  value={[formData.mood_rating]}
                  onValueChange={([value]) => setFormData({...formData, mood_rating: value})}
                  max={10}
                  step={1}
                  className="py-4"
                />
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-none">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50">
              <CardTitle className="flex items-center gap-2">
                <Moon className="w-5 h-5 text-blue-600" />
                Sleep Quality
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <Label>How well did you sleep last night?</Label>
                  <span className={`text-3xl font-bold ${getMoodColor(formData.sleep_quality)}`}>
                    {formData.sleep_quality}
                  </span>
                </div>
                <Slider
                  value={[formData.sleep_quality]}
                  onValueChange={([value]) => setFormData({...formData, sleep_quality: value})}
                  max={10}
                  step={1}
                  className="py-4"
                />
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-none">
            <CardHeader>
              <CardTitle>Additional Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="step_count">Step Count (optional)</Label>
                <Input
                  id="step_count"
                  type="number"
                  value={formData.step_count}
                  onChange={(e) => setFormData({...formData, step_count: parseInt(e.target.value) || 0})}
                  placeholder="Enter your steps today"
                  className="mt-2"
                />
              </div>
              <div>
                <Label htmlFor="notes">Notes</Label>
                <Textarea
                  id="notes"
                  value={formData.notes}
                  onChange={(e) => setFormData({...formData, notes: e.target.value})}
                  placeholder="Any additional observations or notes about your symptoms..."
                  className="mt-2 min-h-32"
                />
              </div>
            </CardContent>
          </Card>

          <Button
            type="submit"
            size="lg"
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-lg py-6"
          >
            <CheckCircle className="w-5 h-5 mr-2" />
            Today's Health Log 
          </Button>
        </form>
      </div>
    </div>
  );
}