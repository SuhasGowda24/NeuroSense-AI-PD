import { Scale, AlertCircle, FileText, CheckCircle, XCircle, Users } from 'lucide-react';

export default function TermsOfService() {
  const terms = [
    {
      icon: CheckCircle,
      title: "Responsible Use",
      description: "Users agree to use this platform responsibly and in accordance with applicable laws and regulations.",
      color: "green"
    },
    {
      icon: AlertCircle,
      title: "\"As-Is\" Basis",
      description: "Results are provided on an \"as-is\" basis without warranties of any kind, express or implied.",
      color: "amber"
    },
    {
      icon: XCircle,
      title: "Limited Liability",
      description: "The developers are not liable for any decisions made based on the system's output.",
      color: "red"
    },
    {
      icon: Users,
      title: "Professional Consultation",
      description: "Users must consult qualified healthcare professionals before making any medical decisions.",
      color: "blue"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-slate-100 py-12 px-4 sm:py-16">
      <div className="max-w-5xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-600 to-purple-700 rounded-2xl mb-4 shadow-lg">
            <Scale className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-3">Terms of Service</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Please read these terms carefully before using NeuroSense AI
          </p>
        </div>

        {/* Agreement Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 border-t-4 border-purple-600">
          <div className="flex items-start gap-4">
            <div className="bg-purple-100 p-3 rounded-lg flex-shrink-0">
              <FileText className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Acceptance of Terms</h2>
              <p className="text-gray-700 leading-relaxed text-lg mb-4">
                By using this platform, you agree to use it responsibly and acknowledge
                that results are provided on an "as-is" basis.
              </p>
              <p className="text-gray-700 leading-relaxed text-lg">
                These terms constitute a legally binding agreement between you and NeuroSense AI. 
                If you do not agree to these terms, please do not use this platform.
              </p>
            </div>
          </div>
        </div>

        {/* Key Terms Grid */}
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Key Terms & Conditions</h3>
          <div className="grid md:grid-cols-2 gap-6">
            {terms.map((term, index) => {
              const Icon = term.icon;
              const colors = {
                green: { bg: 'bg-green-50', iconBg: 'bg-green-100', iconColor: 'text-green-600', border: 'border-green-200' },
                amber: { bg: 'bg-amber-50', iconBg: 'bg-amber-100', iconColor: 'text-amber-600', border: 'border-amber-200' },
                red: { bg: 'bg-red-50', iconBg: 'bg-red-100', iconColor: 'text-red-600', border: 'border-red-200' },
                blue: { bg: 'bg-blue-50', iconBg: 'bg-blue-100', iconColor: 'text-blue-600', border: 'border-blue-200' }
              };
              const colorScheme = colors[term.color];
              
              return (
                <div
                  key={index}
                  className={`${colorScheme.bg} rounded-xl p-6 border-2 ${colorScheme.border} hover:shadow-lg transition-all duration-300`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`${colorScheme.iconBg} p-3 rounded-lg flex-shrink-0`}>
                      <Icon className={`w-6 h-6 ${colorScheme.iconColor}`} />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-gray-900 mb-2">{term.title}</h4>
                      <p className="text-gray-700 leading-relaxed">{term.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Disclaimer Section */}
        <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-2xl shadow-lg p-8 mb-8 border-l-4 border-red-500">
          <div className="flex items-start gap-4">
            <div className="bg-red-100 p-3 rounded-lg flex-shrink-0">
              <AlertCircle className="w-7 h-7 text-red-600" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-red-900 mb-3">Limitation of Liability</h3>
              <p className="text-gray-800 leading-relaxed mb-3">
                The developers, operators, and affiliated parties of NeuroSense AI are not liable 
                for any decisions, actions, or outcomes resulting from the use of this platform or 
                its generated outputs.
              </p>
              <p className="text-gray-800 leading-relaxed">
                This platform is intended for research and screening support only. Users assume 
                full responsibility for any decisions made based on the information provided by 
                the system.
              </p>
            </div>
          </div>
        </div>

        {/* Additional Terms */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Additional Provisions</h3>
          <div className="space-y-4 text-gray-700">
            <div className="flex items-start gap-3">
              <span className="text-purple-600 font-bold text-xl">1.</span>
              <p className="leading-relaxed">
                <strong>Prohibited Uses:</strong> You may not use this platform for any unlawful 
                purpose or in any way that violates these terms or applicable regulations.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-purple-600 font-bold text-xl">2.</span>
              <p className="leading-relaxed">
                <strong>Intellectual Property:</strong> All content, algorithms, and materials 
                on this platform are protected by intellectual property rights.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-purple-600 font-bold text-xl">3.</span>
              <p className="leading-relaxed">
                <strong>Modifications:</strong> We reserve the right to modify these terms at 
                any time. Continued use of the platform constitutes acceptance of modified terms.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-purple-600 font-bold text-xl">4.</span>
              <p className="leading-relaxed">
                <strong>Termination:</strong> We may terminate or suspend access to the platform 
                at any time, without prior notice, for conduct that violates these terms.
              </p>
            </div>
          </div>
        </div>

        {/* Contact & Updates */}
        <div className="bg-slate-100 rounded-xl p-6 border border-slate-200 text-center">
          <p className="text-sm text-slate-600 mb-2">
            Questions about these terms? Contact us at{' '}
            <a href="mailto:legal@neurosense.ai" className="text-purple-600 hover:text-purple-700 font-medium">
              legal@neurosense.ai
            </a>
          </p>
          <p className="text-xs text-slate-500">
            Last updated: December 2024 • Effective Date: December 20, 2024
          </p>
        </div>

      </div>
    </div>
  );
}