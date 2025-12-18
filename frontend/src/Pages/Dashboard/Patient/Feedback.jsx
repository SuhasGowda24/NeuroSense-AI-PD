import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { Textarea } from "../../../components/ui/textarea";
import { 
  Heart, 
  Laptop, 
  Brain, 
  Shield, 
  CheckCircle,
  ThumbsUp,
  MessageSquare,
  Send,
  ArrowLeft
} from "lucide-react";

export default function PatientFeedback() {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    navigation_ease: 0,
    instructions_clarity: 0,
    results_understanding: 0,
    assessment_accuracy: 0,
    health_understanding: 0,
    comfort_level: 0,
    trust_level: 0,
    support_doctors: 0,
    would_recommend: 0,
    additional_feedback: ""
  });

  const handleRatingClick = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = async () => {
  try {
    setIsSubmitting(true);

    const token = localStorage.getItem("token");

    await fetch("http://localhost:5000/api/feedback", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        ...formData,
        source: "general"
      })
    });

    setSubmitted(true);

    // Redirect after success message
    setTimeout(() => {
      navigate("/reportcenter");
    }, 2000);
  } catch (err) {
    console.error(err);
    alert("Failed to submit feedback. Please try again.");
  } finally {
    setIsSubmitting(false);
  }
};

  if (submitted) {
  return (
    <div className="p-4 sm:p-6 flex items-center justify-center min-h-screen bg-gray-50">
      <Card className="max-w-2xl w-full border-none shadow-xl bg-gradient-to-br from-green-50 to-emerald-50">
        <CardContent className="p-8 sm:p-12 text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-8 h-8 text-white" />
          </div>

          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            Thank You!
          </h2>

          <p className="text-slate-700 mb-4">
            Your feedback has been successfully submitted.
          </p>

          <p className="text-sm text-slate-500">
            Redirecting you back to your reports…
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

  const RatingButtons = ({ value, onChange, label }) => (
    <div className="space-y-3">
      <label className="block text-sm font-semibold text-slate-900">{label}</label>
      <div className="flex gap-2 justify-center sm:justify-start">
        {[1, 2, 3, 4, 5].map((num) => (
          <button
            key={num}
            type="button"
            onClick={() => onChange(num)}
            className={`w-12 h-12 sm:w-14 sm:h-14 rounded-lg border-2 font-bold text-base sm:text-lg transition-all duration-200 hover:scale-105 flex-shrink-0 ${
              num === value
                ? 'bg-blue-600 text-white border-blue-600 shadow-lg'
                : 'bg-white text-slate-600 border-slate-300 hover:border-blue-400'
            }`}
          >
            {num}
          </button>
        ))}
      </div>
      <div className="flex justify-between text-xs text-slate-500 px-1">
        <span>Poor</span>
        <span>Excellent</span>
      </div>
    </div>
  );

  const allQuestionsAnswered = Object.entries(formData).every(([key, value]) => 
    key === 'additional_feedback' || value > 0
  );

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
        <div className="flex items-center gap-2 mb-2">
        <Button
            variant="ghost"
            className="text-blue-600 hover:text-blue-800"
            onClick={() => navigate("/reportcenter")}
        >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back to Reports
        </Button>
        </div>

      <div className="max-w-4xl mx-auto space-y-4 sm:space-y-6">
        {/* Header */}
        <Card className="border-none shadow-xl bg-gradient-to-br from-blue-50 to-purple-50">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0">
                <MessageSquare className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </div>
              <div>
                <CardTitle className="text-xl sm:text-2xl mb-1 sm:mb-2">Patient Feedback & Experience Form</CardTitle>
                <p className="text-sm sm:text-base text-slate-600">
                  Your feedback helps us improve care and support. Please share your honest experience.
                </p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="bg-blue-100 border border-blue-200 rounded-lg p-3 sm:p-4">
              <p className="text-xs sm:text-sm text-blue-900">
                <strong>Instructions:</strong> Please rate each question from 1 (Poor) to 5 (Excellent) by clicking on the number.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Web Application Section */}
        <Card className="border-none shadow-lg">
          <CardHeader className="border-b border-slate-200">
            <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
              <Laptop className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
              About the Web Application
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 space-y-6">
            <RatingButtons
              value={formData.navigation_ease}
              onChange={(val) => handleRatingClick('navigation_ease', val)}
              label="How easy was it to navigate and use the application?"
            />

            <RatingButtons
              value={formData.instructions_clarity}
              onChange={(val) => handleRatingClick('instructions_clarity', val)}
              label="Were the instructions and features clear and understandable?"
            />
          </CardContent>
        </Card>

        {/* AI Assessments Section */}
        <Card className="border-none shadow-lg">
          <CardHeader className="border-b border-slate-200">
            <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
              <Brain className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600" />
              About the AI Assessments
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 space-y-6">
            <RatingButtons
              value={formData.results_understanding}
              onChange={(val) => handleRatingClick('results_understanding', val)}
              label="Did you understand the results provided by the AI assessments?"
            />

            <RatingButtons
              value={formData.assessment_accuracy}
              onChange={(val) => handleRatingClick('assessment_accuracy', val)}
              label="Do you feel the assessment reflected your condition accurately?"
            />
          </CardContent>
        </Card>

        {/* Experience & Feelings Section */}
        <Card className="border-none shadow-lg">
          <CardHeader className="border-b border-slate-200">
            <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
              <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-pink-600" />
              About Your Experience
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 space-y-6">
            <RatingButtons
              value={formData.health_understanding}
              onChange={(val) => handleRatingClick('health_understanding', val)}
              label="Did the platform help you better understand your health condition?"
            />

            <RatingButtons
              value={formData.comfort_level}
              onChange={(val) => handleRatingClick('comfort_level', val)}
              label="Did you feel comfortable using this system for health monitoring?"
            />
          </CardContent>
        </Card>

        {/* Trust & Comfort Section */}
        <Card className="border-none shadow-lg">
          <CardHeader className="border-b border-slate-200">
            <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
              <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
              Trust & Comfort
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 space-y-6">
            <RatingButtons
              value={formData.trust_level}
              onChange={(val) => handleRatingClick('trust_level', val)}
              label="How much do you trust the results provided by the system?"
            />

            <RatingButtons
              value={formData.support_doctors}
              onChange={(val) => handleRatingClick('support_doctors', val)}
              label="Do you feel this tool could support doctors in making decisions?"
            />
          </CardContent>
        </Card>

        {/* Overall Feedback Section */}
        <Card className="border-none shadow-lg">
          <CardHeader className="border-b border-slate-200">
            <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
              <ThumbsUp className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600" />
              Overall Feedback
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 space-y-6">
            <RatingButtons
              value={formData.would_recommend}
              onChange={(val) => handleRatingClick('would_recommend', val)}
              label="Would you recommend this platform to others in a similar situation?"
            />
          </CardContent>
        </Card>

        {/* Additional Comments */}
        <Card className="border-none shadow-lg">
          <CardHeader className="border-b border-slate-200">
            <CardTitle className="text-base sm:text-lg">Additional Comments</CardTitle>
          </CardHeader>
          <CardContent className="p-4 sm:p-6">
            <label className="block text-sm font-semibold text-slate-900 mb-3">
              Any additional thoughts, concerns, or feedback you would like to share?
            </label>
            <Textarea
              value={formData.additional_feedback}
              onChange={(e) => setFormData({ ...formData, additional_feedback: e.target.value })}
              placeholder="Share any final thoughts..."
              className="h-32"
            />
          </CardContent>
        </Card>

        {/* Privacy Note & Submit */}
        <Card className="border-none shadow-lg bg-slate-50">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-start gap-3 mb-6">
              <Shield className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-semibold text-slate-900 mb-1">Privacy Note</p>
                <p className="text-xs sm:text-sm text-slate-700">
                  Your responses are confidential and will only be used to improve the system. We value your privacy and will handle your feedback with care.
                </p>
              </div>
            </div>
            
            <Button
              onClick={handleSubmit}
              disabled={isSubmitting || !allQuestionsAnswered}
              className="w-full h-12 sm:h-14 text-base sm:text-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>Processing...</>
              ) : !allQuestionsAnswered ? (
                <>Please answer all questions above</>
              ) : (
                <>
                  <Send className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                  Submit Feedback
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
