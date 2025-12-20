import { Shield, Lock, Key, Server, UserCheck, Wifi, Database, ShieldCheck } from 'lucide-react';

export default function DataSecurity() {
  const securityFeatures = [
    {
      icon: Wifi,
      title: "Secure Transmission",
      description: "Data is transmitted using secure protocols (HTTPS) with end-to-end encryption.",
      color: "blue",
      detail: "All communications between your device and our servers are encrypted using industry-standard TLS/SSL protocols."
    },
    {
      icon: Lock,
      title: "Access Control",
      description: "Stored data is protected using robust access control mechanisms.",
      color: "green",
      detail: "Multi-layered authentication and authorization systems ensure data integrity and confidentiality."
    },
    {
      icon: UserCheck,
      title: "Authorized Access Only",
      description: "Only authorized personnel can access research data.",
      color: "purple",
      detail: "Strict role-based access controls limit data access to qualified researchers and administrators."
    }
  ];

  const additionalMeasures = [
    {
      icon: Database,
      title: "Data Encryption",
      description: "All data is encrypted both in transit and at rest using AES-256 encryption standards."
    },
    {
      icon: Key,
      title: "Authentication",
      description: "Multi-factor authentication (MFA) required for all administrative access."
    },
    {
      icon: Server,
      title: "Secure Infrastructure",
      description: "Hosted on secure, compliant cloud infrastructure with regular security audits."
    },
    {
      icon: ShieldCheck,
      title: "Compliance",
      description: "Adherence to healthcare data protection standards and best practices."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-green-50 to-slate-100 py-12 px-4 sm:py-16">
      <div className="max-w-5xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-600 to-green-700 rounded-2xl mb-4 shadow-lg">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-3">Data Security</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Your data security is our highest priority. We implement industry-leading measures to protect your information.
          </p>
        </div>

        {/* Core Security Features */}
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Core Security Measures</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {securityFeatures.map((feature, index) => {
              const Icon = feature.icon;
              const colors = {
                blue: { bg: 'bg-blue-50', iconBg: 'bg-blue-100', iconColor: 'text-blue-600', border: 'border-blue-200' },
                green: { bg: 'bg-green-50', iconBg: 'bg-green-100', iconColor: 'text-green-600', border: 'border-green-200' },
                purple: { bg: 'bg-purple-50', iconBg: 'bg-purple-100', iconColor: 'text-purple-600', border: 'border-purple-200' }
              };
              const colorScheme = colors[feature.color];
              
              return (
                <div
                  key={index}
                  className={`${colorScheme.bg} rounded-xl p-6 border-2 ${colorScheme.border} hover:shadow-xl transition-all duration-300 hover:-translate-y-1`}
                >
                  <div className={`${colorScheme.iconBg} w-12 h-12 rounded-lg flex items-center justify-center mb-4`}>
                    <Icon className={`w-6 h-6 ${colorScheme.iconColor}`} />
                  </div>
                  <h4 className="text-lg font-bold text-gray-900 mb-2">{feature.title}</h4>
                  <p className="text-gray-700 leading-relaxed mb-3">{feature.description}</p>
                  <p className="text-sm text-gray-600 leading-relaxed">{feature.detail}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Security Statement Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 border-t-4 border-green-600">
          <div className="flex items-start gap-4">
            <div className="bg-green-100 p-3 rounded-lg flex-shrink-0">
              <ShieldCheck className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Security Commitment</h2>
              <p className="text-gray-700 leading-relaxed text-lg mb-4">
                At NeuroSense AI, we understand the sensitive nature of healthcare data. Our security 
                infrastructure is designed with multiple layers of protection to ensure the confidentiality, 
                integrity, and availability of your data.
              </p>
              <p className="text-gray-700 leading-relaxed text-lg">
                We continuously monitor, update, and improve our security measures to stay ahead of 
                emerging threats and maintain compliance with the latest security standards.
              </p>
            </div>
          </div>
        </div>

        {/* Additional Security Measures Grid */}
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Additional Security Layers</h3>
          <div className="grid md:grid-cols-2 gap-6">
            {additionalMeasures.map((measure, index) => {
              const Icon = measure.icon;
              return (
                <div
                  key={index}
                  className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300 border border-slate-200"
                >
                  <div className="flex items-start gap-4">
                    <div className="bg-green-100 p-3 rounded-lg flex-shrink-0">
                      <Icon className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-gray-900 mb-2">{measure.title}</h4>
                      <p className="text-gray-700 leading-relaxed">{measure.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Security Best Practices */}
        <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-2xl shadow-lg p-8 mb-8 border-l-4 border-blue-500">
          <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Shield className="w-6 h-6 text-blue-600" />
            Security Best Practices
          </h3>
          <div className="space-y-3 text-gray-700">
            <p className="flex items-start gap-3">
              <span className="text-green-600 font-bold text-lg mt-0.5">✓</span>
              <span>Regular security audits and penetration testing by third-party experts</span>
            </p>
            <p className="flex items-start gap-3">
              <span className="text-green-600 font-bold text-lg mt-0.5">✓</span>
              <span>Automated backup systems with disaster recovery protocols</span>
            </p>
            <p className="flex items-start gap-3">
              <span className="text-green-600 font-bold text-lg mt-0.5">✓</span>
              <span>24/7 security monitoring and intrusion detection systems</span>
            </p>
            <p className="flex items-start gap-3">
              <span className="text-green-600 font-bold text-lg mt-0.5">✓</span>
              <span>Regular security training for all personnel with data access</span>
            </p>
            <p className="flex items-start gap-3">
              <span className="text-green-600 font-bold text-lg mt-0.5">✓</span>
              <span>Incident response plan with immediate notification procedures</span>
            </p>
          </div>
        </div>

        {/* Contact Section */}
        <div className="bg-slate-100 rounded-xl p-6 border border-slate-200 text-center">
          <p className="text-sm text-slate-600 mb-2">
            Security concerns or questions? Contact our security team at{' '}
            <a href="mailto:security@neurosense.ai" className="text-green-600 hover:text-green-700 font-medium">
              security@neurosense.ai
            </a>
          </p>
          <p className="text-xs text-slate-500">
            Report security vulnerabilities responsibly • Last security audit: December 2024
          </p>
        </div>

      </div>
    </div>
  );
}