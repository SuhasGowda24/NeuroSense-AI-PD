import React from 'react';
import { Link } from 'react-router-dom';
import { 
    Heart, 
    Mail, 
    Phone, 
    MapPin, 
    Shield, 
    FileText, 
    HelpCircle,
    // ExternalLink
} from 'lucide-react';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    const footerLinks = {
        platform: [
            { name: 'Home', path: "/" },
            { name: 'Take Assessment', path: "/assignment" },
            { name: 'How It Works', },
            { name: 'Research',}
        ],
        support: [
            { name: 'Help Center', icon: HelpCircle },
            { name: 'Contact Support', icon: Mail },
            { name: 'Medical Guidelines', icon: FileText },
            { name: 'FAQ', icon: HelpCircle }
        ],
        legal: [
            { name: 'Privacy Policy', icon: Shield },
            { name: 'Terms of Service', icon: FileText },
            { name: 'Medical Disclaimer', icon: Shield },
            { name: 'Data Security', icon: Shield }
        ]
    };

    return (
        <footer className="bg-gray-900 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="py-12">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {/* Company Info */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                                    <Heart className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg">NeuroHealth</h3>
                                    <p className="text-sm text-blue-400">AI Parkinson's Screening</p>
                                </div>
                            </div>
                            <p className="text-gray-300 text-sm leading-relaxed">
                                Advanced AI-powered handwriting analysis for early detection of Parkinson's disease. 
                                Empowering patients and healthcare professionals with innovative screening technology.
                            </p>
                            <div className="space-y-2 text-sm text-gray-300">
                                <div className="flex items-center gap-2">
                                    <Mail className="w-4 h-4 text-blue-400" />
                                    <span>support@neurohealth</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Phone className="w-4 h-4 text-blue-400" />
                                    <span>1-800-NEURO</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <MapPin className="w-4 h-4 text-blue-400" />
                                    <span>K S School of Engineering and Management</span>
                                </div>
                            </div>
                        </div>

                        {/* Platform Links */}
                        <div>
                            <h4 className="font-semibold text-white mb-4">Platform</h4>
                            <ul className="space-y-3">
                                {footerLinks.platform.map((link) => (
                                    <li key={link.name}>
                                        <Link
                                            to={link.path}
                                            className="text-gray-300 hover:text-blue-400 text-sm transition-colors duration-200 flex items-center gap-2"
                                        >
                                            {link.icon && <link.icon className="w-4 h-4" />}
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Support Links */}
                        <div>
                            <h4 className="font-semibold text-white mb-4">Support</h4>
                            <ul className="space-y-3">
                                {footerLinks.support.map((link) => (
                                    <li key={link.name}>
                                        <a
                                            href={link.path}
                                            className="text-gray-300 hover:text-blue-400 text-sm transition-colors duration-200 flex items-center gap-2"
                                        >
                                            <link.icon className="w-4 h-4" />
                                            {link.name}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Legal Links */}
                        <div>
                            <h4 className="font-semibold text-white mb-4">Legal & Privacy</h4>
                            <ul className="space-y-3">
                                {footerLinks.legal.map((link) => (
                                    <li key={link.name}>
                                        <a
                                            href={link.path}
                                            className="text-gray-300 hover:text-blue-400 text-sm transition-colors duration-200 flex items-center gap-2"
                                        >
                                            <link.icon className="w-4 h-4" />
                                            {link.name}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Medical Disclaimer */}
                <div className="border-t border-gray-800 py-6">
                    <div className="bg-yellow-900/30 border border-yellow-700/50 rounded-lg p-4 mb-6">
                        <div className="flex items-start gap-3">
                            <Shield className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                            <div>
                                <h5 className="font-semibold text-yellow-400 mb-2">Medical Disclaimer</h5>
                                <p className="text-yellow-200 text-sm leading-relaxed">
                                    NeuroHealth is a screening tool designed to assist healthcare professionals. 
                                    It is not intended to diagnose, treat, cure, or prevent any disease. 
                                    Always consult with a qualified healthcare provider for medical advice and diagnosis. 
                                    This tool should not replace professional medical consultation.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-gray-800 py-6">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <div className="flex flex-col md:flex-row items-center gap-4 text-sm text-gray-400">
                            <p>&copy; {currentYear} NeuroHealth. All rights reserved.</p>
                            <div className="flex items-center gap-4">
                                {/* <span className="flex items-center gap-1">
                                    <Shield className="w-4 h-4" />
                                    HIPAA Compliant
                                </span> */}
                                {/* <span className="flex items-center gap-1">
                                    <Shield className="w-4 h-4" />
                                    ISO 27001 Certified
                                </span> */}
                            </div>
                        </div>
                        <div className="text-sm text-gray-400">
                            <p>Powered by NeuroSense : AI Driven Parkinson Disease Prediction</p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}