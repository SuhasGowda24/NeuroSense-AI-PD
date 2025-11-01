import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Textarea } from "../../components/ui/textarea";
import { Badge } from "../../components/ui/badge";
import {
  MessageSquare,
  ThumbsUp,
  AlertCircle,
  CheckCircle,
  Clock,
  Star,
} from "lucide-react";
import { format } from "date-fns";

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
  };
  return badges[category] || badges.general;
};

function FeedbackItem({ feedback, onUpdate }) {
  const [showResponse, setShowResponse] = useState(false);
  const [responseText, setResponseText] = useState("");

  const statusBadge = getStatusBadge(feedback.status);
  const categoryBadge = getCategoryBadge(feedback.category);

  return (
    <div className="p-6 rounded-xl border border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all bg-white">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-3">
            <Badge className={statusBadge.color}>
              <statusBadge.icon className="w-3 h-3 mr-1" />
              {statusBadge.label}
            </Badge>
            <Badge className={categoryBadge.color}>{categoryBadge.label}</Badge>
            {feedback.rating && (
              <div className="flex items-center gap-1">
                {[...Array(feedback.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
            )}
          </div>

          <p className="text-gray-900 leading-relaxed mb-3">{feedback.feedback_text}</p>

          <div className="flex items-center gap-4 text-xs text-gray-500">
            <span>From: {feedback.user_email || "Anonymous"}</span>
            <span>
              {feedback.submitted_at
                ? format(new Date(feedback.submitted_at), "MMM d, yyyy")
                : format(new Date(), "MMM d, yyyy")}
            </span>
          </div>
        </div>
      </div>

      {feedback.response && (
        <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <div className="flex items-center gap-2 mb-2">
            <ThumbsUp className="w-4 h-4 text-blue-600" />
            <span className="font-semibold text-blue-900">Admin Response</span>
            {feedback.responded_at && (
              <span className="text-xs text-blue-600">
                {format(new Date(feedback.responded_at), "MMM d, yyyy")}
              </span>
            )}
          </div>
          <p className="text-blue-900 text-sm">{feedback.response}</p>
        </div>
      )}

      <div className="flex gap-2 mt-4 pt-4 border-t border-gray-100">
        {feedback.status === "pending" && (
          <>
            <Button
              size="sm"
              variant="outline"
              onClick={() => setShowResponse(!showResponse)}
              className="hover:bg-blue-50 hover:text-blue-600"
            >
              <MessageSquare className="w-4 h-4 mr-1" />
              Respond
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => onUpdate(feedback.id, "reviewed")}
              className="hover:bg-blue-50 hover:text-blue-600"
            >
              Mark as Reviewed
            </Button>
          </>
        )}
        {feedback.status !== "resolved" && (
          <Button
            size="sm"
            variant="outline"
            onClick={() => onUpdate(feedback.id, "resolved")}
            className="hover:bg-green-50 hover:text-green-600"
          >
            <CheckCircle className="w-4 h-4 mr-1" />
            Resolve
          </Button>
        )}
        <Button
          size="sm"
          variant="outline"
          onClick={() => onUpdate(feedback.id, "dismissed")}
          className="hover:bg-gray-50 hover:text-gray-600"
        >
          Dismiss
        </Button>
      </div>

      {showResponse && (
        <div className="mt-4 space-y-3 animate-in fade-in slide-in-from-top-2">
          <Textarea
            placeholder="Type your response..."
            value={responseText}
            onChange={(e) => setResponseText(e.target.value)}
            rows={3}
          />
          <div className="flex gap-2">
            <Button
              size="sm"
              onClick={() => {
                onUpdate(feedback.id, "reviewed", responseText);
                setShowResponse(false);
                setResponseText("");
              }}
              className="bg-blue-600"
            >
              Send Response
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => {
                setShowResponse(false);
                setResponseText("");
              }}
            >
              Cancel
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function FeedbackManagement() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFeedbacks();
  }, []);

  const loadFeedbacks = async () => {
    // Simulate loading from API
    setLoading(true);
    setTimeout(() => {
      const sampleFeedbacks = [
        {
          id: 1,
          user_email: "user1@example.com",
          feedback_text: "The dashboard loads slowly.",
          category: "bug_report",
          status: "pending",
          rating: 4,
          submitted_at: new Date().toISOString(),
        },
        {
          id: 2,
          user_email: "user2@example.com",
          feedback_text: "Can we have dark mode support?",
          category: "feature_request",
          status: "reviewed",
          rating: 5,
          response: "Dark mode is being planned for next update.",
          responded_at: new Date().toISOString(),
          submitted_at: new Date().toISOString(),
        },
        {
          id: 3,
          user_email: "user3@example.com",
          feedback_text: "Model accuracy seems better now!",
          category: "general",
          status: "resolved",
          rating: 5,
          submitted_at: new Date().toISOString(),
        },
      ];
      setFeedbacks(sampleFeedbacks);
      setLoading(false);
    }, 600);
  };

  const updateStatus = (feedbackId, newStatus, response = null) => {
    setFeedbacks((prev) =>
      prev.map((f) =>
        f.id === feedbackId
          ? {
              ...f,
              status: newStatus,
              response: response || f.response,
              responded_at: response ? new Date().toISOString() : f.responded_at,
            }
          : f
      )
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500"></div>
      </div>
    );
  }

  const stats = {
    pending: feedbacks.filter((f) => f.status === "pending").length,
    reviewed: feedbacks.filter((f) => f.status === "reviewed").length,
    resolved: feedbacks.filter((f) => f.status === "resolved").length,
    avgRating:
      feedbacks.length > 0
        ? (
            feedbacks
              .filter((f) => f.rating)
              .reduce((sum, f) => sum + f.rating, 0) /
            feedbacks.filter((f) => f.rating).length
          ).toFixed(1)
        : 0,
  };

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid md:grid-cols-4 gap-6">
        <Card className="border-none shadow-lg bg-gradient-to-br from-yellow-500 to-orange-500 text-white">
          <CardContent className="p-6">
            <Clock className="w-8 h-8 mb-3 opacity-80" />
            <div className="text-3xl font-bold mb-1">{stats.pending}</div>
            <div className="text-yellow-100">Pending</div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-lg bg-gradient-to-br from-blue-500 to-indigo-500 text-white">
          <CardContent className="p-6">
            <AlertCircle className="w-8 h-8 mb-3 opacity-80" />
            <div className="text-3xl font-bold mb-1">{stats.reviewed}</div>
            <div className="text-blue-100">Reviewed</div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-lg bg-gradient-to-br from-green-500 to-emerald-500 text-white">
          <CardContent className="p-6">
            <CheckCircle className="w-8 h-8 mb-3 opacity-80" />
            <div className="text-3xl font-bold mb-1">{stats.resolved}</div>
            <div className="text-green-100">Resolved</div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-lg bg-gradient-to-br from-purple-500 to-pink-500 text-white">
          <CardContent className="p-6">
            <Star className="w-8 h-8 mb-3 opacity-80" />
            <div className="text-3xl font-bold mb-1">{stats.avgRating}/5</div>
            <div className="text-purple-100">Avg Rating</div>
          </CardContent>
        </Card>
      </div>

      {/* Feedback List */}
      <Card className="border-none shadow-xl bg-white/90 backdrop-blur-lg">
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
              {feedbacks.map((feedback) => (
                <FeedbackItem
                  key={feedback.id}
                  feedback={feedback}
                  onUpdate={updateStatus}
                />
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
