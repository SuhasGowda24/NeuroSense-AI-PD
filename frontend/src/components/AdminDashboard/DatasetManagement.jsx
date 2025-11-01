import React, { useState, useEffect } from "react";
import { 
  Database, Upload, Download, CheckCircle, XCircle, Clock, 
  FileText, Plus, Eye, Trash2 
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Badge } from "../../components/ui/badge";
import { Textarea } from "../../components/ui/textarea";
import { motion, AnimatePresence } from "framer-motion";
import { format } from "date-fns";

export default function DatasetManagement() {
  const [datasets, setDatasets] = useState([]);
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadData, setUploadData] = useState({
    dataset_name: "",
    description: "",
    source: "",
    file: null
  });

  // Load mock data (simulate API)
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("datasets") || "[]");
    setDatasets(stored);
  }, []);

  // Save changes to localStorage (simulate backend persistence)
  useEffect(() => {
    localStorage.setItem("datasets", JSON.stringify(datasets));
  }, [datasets]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) setUploadData({ ...uploadData, file });
  };

  const handleUpload = (e) => {
    e.preventDefault();
    if (!uploadData.file || !uploadData.dataset_name) {
      alert("Please fill all required fields");
      return;
    }

    setUploading(true);

    setTimeout(() => {
      const newDataset = {
        id: Date.now(),
        dataset_name: uploadData.dataset_name,
        file_url: URL.createObjectURL(uploadData.file),
        sample_count: Math.floor(Math.random() * 1000),
        status: "pending_validation",
        upload_date: new Date(),
        metadata: {
          description: uploadData.description,
          source: uploadData.source,
          data_format: uploadData.file.name.split(".").pop()
        }
      };

      setDatasets((prev) => [newDataset, ...prev]);
      setUploadData({ dataset_name: "", description: "", source: "", file: null });
      setShowUploadForm(false);
      setUploading(false);
    }, 1000);
  };

  const updateStatus = (id, newStatus) => {
    setDatasets((prev) =>
      prev.map((d) => (d.id === id ? { ...d, status: newStatus } : d))
    );
  };

  const deleteDataset = (id) => {
    if (!!window.confirm("Are you sure you want to delete this dataset?")) return;
    setDatasets((prev) => prev.filter((d) => d.id !== id));
  };

  const getStatusBadge = (status) => {
    const badges = {
      pending_validation: { label: "Pending", color: "bg-yellow-100 text-yellow-700", icon: Clock },
      validated: { label: "Validated", color: "bg-green-100 text-green-700", icon: CheckCircle },
      training: { label: "Training", color: "bg-blue-100 text-blue-700", icon: Clock },
      completed: { label: "Completed", color: "bg-purple-100 text-purple-700", icon: CheckCircle },
      rejected: { label: "Rejected", color: "bg-red-100 text-red-700", icon: XCircle }
    };
    return badges[status] || badges.pending_validation;
  };

  return (
    <div className="space-y-6">
      {/* Upload Section */}
      <Card className="border-none shadow-xl bg-white/90 backdrop-blur-lg">
        <CardHeader className="border-b border-green-50">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Database className="w-5 h-5 text-green-600" />
              Dataset Management
            </CardTitle>
            <Button
              onClick={() => setShowUploadForm(!showUploadForm)}
              className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              Upload Dataset
            </Button>
          </div>
        </CardHeader>

        <AnimatePresence>
          {showUploadForm && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
            >
              <CardContent className="p-6 border-t border-gray-100">
                <form onSubmit={handleUpload} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Dataset Name *</Label>
                      <Input
                        placeholder="e.g., PaHaW Dataset 2024"
                        value={uploadData.dataset_name}
                        onChange={(e) => setUploadData({ ...uploadData, dataset_name: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Source</Label>
                      <Input
                        placeholder="e.g., University Research Lab"
                        value={uploadData.source}
                        onChange={(e) => setUploadData({ ...uploadData, source: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Description</Label>
                    <Textarea
                      placeholder="Brief description of the dataset..."
                      value={uploadData.description}
                      onChange={(e) => setUploadData({ ...uploadData, description: e.target.value })}
                      rows={3}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Dataset File *</Label>
                    <Input
                      type="file"
                      onChange={handleFileChange}
                      accept=".csv,.xlsx,.json,.zip"
                      required
                    />
                    <p className="text-xs text-gray-500">
                      Supported formats: CSV, XLSX, JSON, ZIP
                    </p>
                  </div>

                  <div className="flex gap-3">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setShowUploadForm(false)}
                      className="flex-1"
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      disabled={uploading}
                      className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600"
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      {uploading ? "Uploading..." : "Upload Dataset"}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </motion.div>
          )}
        </AnimatePresence>
      </Card>

      {/* Dataset List */}
      <Card className="border-none shadow-xl bg-white/90 backdrop-blur-lg">
        <CardHeader className="border-b border-green-50">
          <CardTitle>Uploaded Datasets ({datasets.length})</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          {datasets.length === 0 ? (
            <div className="text-center py-12">
              <Database className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600 mb-2">No datasets uploaded yet</p>
              <Button onClick={() => setShowUploadForm(true)} variant="outline">
                <Plus className="w-4 h-4 mr-2" />
                Upload First Dataset
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {datasets.map((dataset, index) => {
                const statusBadge = getStatusBadge(dataset.status);
                const Icon = statusBadge.icon;

                return (
                  <motion.div
                    key={dataset.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-6 rounded-xl border border-gray-200 hover:border-green-300 hover:shadow-lg transition-all bg-white"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-bold text-gray-900">{dataset.dataset_name}</h3>
                          <Badge className={statusBadge.color}>
                            <Icon className="w-3 h-3 mr-1" />
                            {statusBadge.label}
                          </Badge>
                        </div>
                        {dataset.metadata?.description && (
                          <p className="text-sm text-gray-600 mb-3">
                            {dataset.metadata.description}
                          </p>
                        )}
                        <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                          <span className="flex items-center gap-1">
                            <FileText className="w-4 h-4" />
                            {dataset.sample_count || 0} samples
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {format(new Date(dataset.upload_date), "MMM d, yyyy")}
                          </span>
                          {dataset.metadata?.source && (
                            <span>Source: {dataset.metadata.source}</span>
                          )}
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="hover:bg-blue-50 hover:text-blue-600">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="hover:bg-green-50 hover:text-green-600"
                          onClick={() => window.open(dataset.file_url, "_blank")}
                        >
                          <Download className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="hover:bg-red-50 hover:text-red-600"
                          onClick={() => deleteDataset(dataset.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="flex gap-2 pt-4 border-t border-gray-100">
                      <Button
                        size="sm"
                        variant={dataset.status === "validated" ? "default" : "outline"}
                        onClick={() => updateStatus(dataset.id, "validated")}
                        className={dataset.status === "validated" ? "bg-green-600" : ""}
                      >
                        <CheckCircle className="w-4 h-4 mr-1" />
                        Validate
                      </Button>
                      <Button
                        size="sm"
                        variant={dataset.status === "training" ? "default" : "outline"}
                        onClick={() => updateStatus(dataset.id, "training")}
                        className={dataset.status === "training" ? "bg-blue-600" : ""}
                      >
                        <Clock className="w-4 h-4 mr-1" />
                        Training
                      </Button>
                      <Button
                        size="sm"
                        variant={dataset.status === "completed" ? "default" : "outline"}
                        onClick={() => updateStatus(dataset.id, "completed")}
                        className={dataset.status === "completed" ? "bg-purple-600" : ""}
                      >
                        <CheckCircle className="w-4 h-4 mr-1" />
                        Complete
                      </Button>
                      <Button
                        size="sm"
                        variant={dataset.status === "rejected" ? "default" : "outline"}
                        onClick={() => updateStatus(dataset.id, "rejected")}
                        className={dataset.status === "rejected" ? "bg-red-600" : ""}
                      >
                        <XCircle className="w-4 h-4 mr-1" />
                        Reject
                      </Button>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
