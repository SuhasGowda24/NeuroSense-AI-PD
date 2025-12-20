import { Lock, Database, UserX, Shield, Eye, FileCheck } from 'lucide-react';

export default function PrivacyPolicy() {
  const privacyPoints = [
    {
      icon: Shield,
      title: "No Third-Party Sharing",
      description: "No data is sold or shared with third parties.",
      color: "blue"
    },
    {
      icon: Lock,
      title: "Access-Controlled Storage",
      description: "All stored data is access-controlled.",
      color: "green"
    },
    {
      icon: UserX,
      title: "Data Deletion Rights",
      description: "Users may request deletion of their data.",
      color: "purple"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 py-12 px-4 sm:py-16">
      <div className="max-w-5xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl mb-4 shadow-lg">
            <Eye className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-3">Privacy Policy</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Your privacy and data security are our top priorities
          </p>
        </div>

        {/* Main Content Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 border-t-4 border-blue-600">
          <div className="flex items-start gap-4 mb-6">
            <div className="bg-blue-100 p-3 rounded-lg flex-shrink-0">
              <FileCheck className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">Our Commitment to Privacy</h2>
              <p className="text-gray-700 leading-relaxed text-lg">
                We respect your privacy. This application may collect drawing data,
                interaction metadata, and technical information solely for research
                and system improvement purposes.
              </p>
            </div>
          </div>
        </div>

        {/* Data Collection Info */}
        <div className="bg-gradient-to-r from-slate-50 to-blue-50 rounded-2xl shadow-md p-8 mb-8 border-l-4 border-slate-400">
          <div className="flex items-start gap-4">
            <div className="bg-slate-200 p-3 rounded-lg flex-shrink-0">
              <Database className="w-6 h-6 text-slate-700" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">What We Collect</h3>
              <div className="space-y-2 text-gray-700">
                <p className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold mt-1">•</span>
                  <span><strong>Drawing Data:</strong> Handwriting samples and drawing patterns submitted for analysis</span>
                </p>
                <p className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold mt-1">•</span>
                  <span><strong>Interaction Metadata:</strong> Timestamps, session information, and usage patterns</span>
                </p>
                <p className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold mt-1">•</span>
                  <span><strong>Technical Information:</strong> Device type, browser information, and performance metrics</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Privacy Guarantees Grid */}
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Your Privacy Rights</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {privacyPoints.map((point, index) => {
              const Icon = point.icon;
              const colors = {
                blue: { bg: 'bg-blue-50', iconBg: 'bg-blue-100', iconColor: 'text-blue-600', border: 'border-blue-200' },
                green: { bg: 'bg-green-50', iconBg: 'bg-green-100', iconColor: 'text-green-600', border: 'border-green-200' },
                purple: { bg: 'bg-purple-50', iconBg: 'bg-purple-100', iconColor: 'text-purple-600', border: 'border-purple-200' }
              };
              const colorScheme = colors[point.color];
              
              return (
                <div
                  key={index}
                  className={`${colorScheme.bg} rounded-xl p-6 border-2 ${colorScheme.border} hover:shadow-lg transition-all duration-300`}
                >
                  <div className={`${colorScheme.iconBg} w-12 h-12 rounded-lg flex items-center justify-center mb-4`}>
                    <Icon className={`w-6 h-6 ${colorScheme.iconColor}`} />
                  </div>
                  <h4 className="text-lg font-bold text-gray-900 mb-2">{point.title}</h4>
                  <p className="text-gray-700">{point.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Purpose Statement */}
        <div className="bg-white rounded-2xl shadow-lg p-8 border-l-4 border-blue-600">
          <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Shield className="w-6 h-6 text-blue-600" />
            Data Usage Purpose
          </h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            All collected data is used exclusively for research and system improvement purposes. 
            We are committed to maintaining the confidentiality and security of your information.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Our data practices comply with applicable privacy regulations and industry best practices 
            for handling sensitive health-related information.
          </p>
        </div>

        {/* Contact Section */}
        <div className="mt-8 text-center bg-slate-100 rounded-xl p-6 border border-slate-200">
          <p className="text-sm text-slate-600">
            Questions about our privacy practices? Contact us at{' '}
            <a href="mailto:privacy@neurosense.ai" className="text-blue-600 hover:text-blue-700 font-medium">
              privacy@neurosense.ai
            </a>
          </p>
          <p className="text-xs text-slate-500 mt-2">
            Last updated: December 2024
          </p>
        </div>

      </div>
    </div>
  );
}