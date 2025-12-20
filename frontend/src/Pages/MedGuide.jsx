import { FileSearch, ShieldAlert, UserCheck, Brain } from 'lucide-react';

export default function MedicalGuidelines() {
  const guidelines = [
    {
      icon: FileSearch,
      color: "blue",
      title: "Research & Screening Support",
      description: "This tool is intended for research and early screening support only.",
      bgColor: "bg-blue-50",
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
      borderColor: "border-blue-200"
    },
    {
      icon: ShieldAlert,
      color: "red",
      title: "Not a Diagnostic Device",
      description: "It is not approved as a diagnostic medical device.",
      bgColor: "bg-red-50",
      iconBg: "bg-red-100",
      iconColor: "text-red-600",
      borderColor: "border-red-200"
    },
    {
      icon: UserCheck,
      color: "green",
      title: "Professional Review Required",
      description: "Results should be reviewed by qualified medical professionals.",
      bgColor: "bg-green-50",
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
      borderColor: "border-green-200"
    },
    {
      icon: Brain,
      color: "purple",
      title: "Informed Decision Making",
      description: "Users should not make health decisions based solely on AI output.",
      bgColor: "bg-purple-50",
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600",
      borderColor: "border-purple-200"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl mb-4 shadow-lg">
            <FileSearch className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-3">Medical Guidelines</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Essential information about the proper use and limitations of NeuroSense AI
          </p>
        </div>

        {/* Guidelines Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {guidelines.map((guideline, index) => {
            const Icon = guideline.icon;
            return (
              <div
                key={index}
                className={`${guideline.bgColor} rounded-2xl p-6 border-2 ${guideline.borderColor} hover:shadow-xl transition-all duration-300 hover:-translate-y-1`}
              >
                <div className="flex items-start gap-4">
                  <div className={`${guideline.iconBg} p-3 rounded-xl flex-shrink-0`}>
                    <Icon className={`w-6 h-6 ${guideline.iconColor}`} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {guideline.title}
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      {guideline.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Notice Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8 border-l-4 border-blue-600">
          <div className="flex items-start gap-4">
            <div className="bg-blue-100 p-3 rounded-lg flex-shrink-0">
              <ShieldAlert className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Compliance & Responsibility
              </h3>
              <p className="text-gray-700 leading-relaxed mb-3">
                Healthcare providers and researchers using this platform are responsible for ensuring
                compliance with applicable regulations and ethical standards in their jurisdiction.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Any clinical applications must be validated according to appropriate medical device
                standards and regulatory requirements before implementation in patient care settings.
              </p>
            </div>
          </div>
        </div>

        {/* Quick Reference Badge */}
        <div className="mt-8 text-center">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-slate-100 to-slate-200 px-6 py-3 rounded-full border border-slate-300">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            <span className="text-sm font-medium text-slate-700">
              For research and screening support use only
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}