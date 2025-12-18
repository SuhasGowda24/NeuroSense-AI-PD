import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import {
  MessageSquare,
  AlertCircle,
  CheckCircle,
  Clock,
} from "lucide-react";
import { format } from "date-fns";

/* ---------- Helpers ---------- */

const getStatusBadge = (status) => {
  const badges = {
    pending: { label: "Pending", color: "bg-yellow-100 text-yellow-700", icon: Clock },
    reviewed: { label: "Reviewed", color: "bg-blue-100 text-blue-700", icon: CheckCircle },
    resolved: { label: "Resolved", color: "bg-green-100 text-green-700", icon: CheckCircle },
    dismissed: { label: "Dismissed", color: "bg-gray-100 text-gray-700", icon: AlertCircle },
  };
  return badges[status] || badges.pending;
};

const getCategoryBadge = (category) => {
  const badges = {
    bug_report: { label: "Bug Report", color: "bg-red-100 text-red-700" },
    feature_request: { label: "Feature Request", color: "bg-purple-100 text-purple-700" },
    improvement: { label: "Improvement", color: "bg-blue-100 text-blue-700" },
    general: { label: "General", color: "bg-gray-100 text-gray-700" },
    report: { label: "Report Page", color: "bg-indigo-100 text-indigo-700" },
  };
  return badges[category] || badges.general;
};

/* ---------- Single Feedback Card ---------- */

function FeedbackItem({ feedback }) {
  const statusBadge = getStatusBadge(feedback.status);
  const categoryBadge = getCategoryBadge(feedback.source);

  return (
    <div className="p-6 rounded-xl border border-gray-200 bg-white hover:shadow-lg transition">
      
      {/* Badges */}
      {/* Category only */}
      <div className="flex items-center gap-3 mb-4">
        <Badge className={categoryBadge.color}>
          {categoryBadge.label}
        </Badge>
      </div>

      {/* User */}
      <p className="text-sm text-gray-700 mb-2">
        <strong>User ID:</strong>{" "}
        {feedback.userId?._id || feedback.userId}
      </p>

      {/* Ratings */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm mb-4">
        <p><b>Navigation Ease:</b> {feedback.navigation_ease}/5</p>
        <p><b>Instructions:</b> {feedback.instructions_clarity}/5</p>
        <p><b>Results Understanding:</b> {feedback.results_understanding}/5</p>
        <p><b>Assessment Accuracy:</b> {feedback.assessment_accuracy}/5</p>
        <p><b>Health Understanding:</b> {feedback.health_understanding}/5</p>
        <p><b>Comfort Level:</b> {feedback.comfort_level}/5</p>
        <p><b>Trust Level:</b> {feedback.trust_level}/5</p>
        <p><b>Doctor Support:</b> {feedback.support_doctors}/5</p>
        <p><b>Would Recommend:</b> {feedback.would_recommend}/5</p>
      </div>

      {/* Patient Comment */}
      <div className="mb-3">
        <p className="text-gray-900">
          <strong>Patient Comment:</strong><br />
          {feedback.additional_feedback || "No comments provided"}
        </p>
      </div>

      {/* Dates */}
      <p className="text-xs text-gray-500">
        Submitted on{" "}
        {feedback.createdAt
          ? format(new Date(feedback.createdAt), "MMM d, yyyy, p")
          : "N/A"}
      </p>

      {/* Admin Response (read-only) */}
      {feedback.response && (
        <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="font-semibold text-blue-900 mb-1">Admin Response</p>
          <p className="text-blue-800">{feedback.response}</p>
        </div>
      )}
    </div>
  );
}

/* ---------- Main Admin Page ---------- */

export default function FeedbackManagement() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFeedbacks();
  }, []);

  const loadFeedbacks = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      const res = await fetch("http://localhost:5000/api/feedback/all", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const json = await res.json();
      setFeedbacks(json.data || []);
    } catch (err) {
      console.error("Failed to load feedbacks:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="border-none shadow-xl bg-white">
        <CardHeader className="border-b border-gray-100">
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-red-600" />
            User Feedback ({feedbacks.length})
          </CardTitle>
        </CardHeader>

        <CardContent className="p-6">
          {feedbacks.length === 0 ? (
            <div className="text-center py-12">
              <MessageSquare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600">No feedback submitted yet</p>
            </div>
          ) : (
            <div className="space-y-4">
              {feedbacks.map((fb) => (
                <FeedbackItem key={fb._id} feedback={fb} />
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
