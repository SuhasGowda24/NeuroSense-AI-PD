import { HelpCircle, MousePointer, Smartphone, Monitor, CheckCircle, Upload, Download, Settings, AlertCircle, Mail, BookOpen } from 'lucide-react';
import { useState } from 'react';

export default function HelpCenter() {
  const [activeCategory, setActiveCategory] = useState('getting-started');

  const categories = [
    { id: 'getting-started', name: 'Getting Started', icon: BookOpen },
    { id: 'drawing', name: 'Drawing Tools', icon: MousePointer },
    { id: 'analysis', name: 'Analysis', icon: CheckCircle },
    { id: 'troubleshooting', name: 'Troubleshooting', icon: AlertCircle }
  ];

  const faqs = {
    'getting-started': [
      {
        question: 'How do I start using NeuroSense AI?',
        answer: 'Simply navigate to the drawing canvas and begin creating your handwriting sample or drawing. The system will guide you through the process.'
      },
      {
        question: 'What devices are supported?',
        answer: 'NeuroSense AI works on desktop computers, tablets, and mobile devices. We recommend using a stylus or touch-enabled device for best results.'
      },
      {
        question: 'Do I need to create an account?',
        answer: 'Account creation may be required for certain features. Check with your administrator or research coordinator for specific requirements.'
      },
      {
        question: 'Is my data secure?',
        answer: 'Yes! We use industry-standard encryption and security measures. See our Data Security page for detailed information about how we protect your data.'
      }
    ],
    'drawing': [
      {
        question: 'What input methods can I use?',
        answer: 'You can draw using a mouse, finger (touch screen), or stylus. For best accuracy, we recommend using a stylus on a touch-enabled device.'
      },
      {
        question: 'How do I clear my drawing?',
        answer: 'Look for the "Clear" or "Reset" button on the canvas toolbar. This will erase your current drawing and allow you to start fresh.'
      },
      {
        question: 'Can I adjust brush size or color?',
        answer: 'Yes! Use the settings panel to customize brush size, color, and other drawing parameters to suit your needs.'
      },
      {
        question: 'What if I make a mistake?',
        answer: 'Most drawing interfaces include an "Undo" button. You can also clear the entire canvas and start over if needed.'
      }
    ],
    'analysis': [
      {
        question: 'How long does analysis take?',
        answer: 'Analysis typically completes within seconds to a few minutes, depending on the complexity of your drawing and current system load.'
      },
      {
        question: 'What should I do before submitting for analysis?',
        answer: 'Ensure your drawing is complete and meets any specified requirements. Check that all lines are clear and the image is not cut off.'
      },
      {
        question: 'Can I save my results?',
        answer: 'Yes! Most analysis results can be downloaded or saved. Look for the "Download" or "Save Results" button after analysis completes.'
      },
      {
        question: 'What do the analysis results mean?',
        answer: 'Results are screening indicators only and should be reviewed by qualified healthcare professionals. Refer to our Medical Disclaimer for important information.'
      }
    ],
    'troubleshooting': [
      {
        question: 'The drawing canvas is not responding',
        answer: 'Try refreshing the page. Ensure your browser is up to date and JavaScript is enabled. Check that you\'re using a supported browser (Chrome, Firefox, Safari, Edge).'
      },
      {
        question: 'My drawing looks pixelated or unclear',
        answer: 'Try using a larger brush size or drawing more slowly. On touch devices, ensure your screen is clean and your stylus is functioning properly.'
      },
      {
        question: 'Analysis failed or shows an error',
        answer: 'This may occur if the drawing is incomplete or doesn\'t meet minimum requirements. Try redrawing with clearer strokes. If the problem persists, contact support.'
      },
      {
        question: 'I can\'t access certain features',
        answer: 'Some features may require specific permissions or roles. Contact your administrator or see our support team for assistance with access issues.'
      }
    ]
  };

  const quickTips = [
    {
      icon: MousePointer,
      title: 'Multiple Input Methods',
      description: 'Use mouse, finger, or stylus to draw on the canvas.'
    },
    {
      icon: CheckCircle,
      title: 'Complete Your Drawing',
      description: 'Ensure the drawing is completed before analysis.'
    },
    {
      icon: Monitor,
      title: 'Device Compatibility',
      description: 'Supported on desktop, tablet, and mobile devices.'
    },
    {
      icon: Upload,
      title: 'Upload Options',
      description: 'Import existing images or start fresh with the canvas.'
    },
    {
      icon: Download,
      title: 'Save Results',
      description: 'Download analysis results for your records.'
    },
    {
      icon: Settings,
      title: 'Customize Settings',
      description: 'Adjust brush size, color, and other preferences.'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-slate-100 py-12 px-4 sm:py-16">
      <div className="max-w-6xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-indigo-600 to-indigo-700 rounded-2xl mb-4 shadow-lg">
            <HelpCircle className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-3">Help Center</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Find answers to common questions and learn how to make the most of NeuroSense AI
          </p>
        </div>

        {/* Quick Tips Grid */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Quick Tips</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {quickTips.map((tip, index) => {
              const Icon = tip.icon;
              return (
                <div
                  key={index}
                  className="bg-white rounded-xl p-5 shadow-md hover:shadow-lg transition-all duration-300 border border-slate-200"
                >
                  <div className="flex items-start gap-3">
                    <div className="bg-indigo-100 p-2 rounded-lg flex-shrink-0">
                      <Icon className="w-5 h-5 text-indigo-600" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-1">{tip.title}</h4>
                      <p className="text-sm text-gray-600 leading-relaxed">{tip.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Frequently Asked Questions</h2>
          
          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                    activeCategory === category.id
                      ? 'bg-indigo-600 text-white shadow-md'
                      : 'bg-slate-100 text-gray-700 hover:bg-slate-200'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {category.name}
                </button>
              );
            })}
          </div>

          {/* FAQ Items */}
          <div className="space-y-4">
            {faqs[activeCategory].map((faq, index) => (
              <div
                key={index}
                className="bg-slate-50 rounded-lg p-5 border-l-4 border-indigo-500 hover:bg-slate-100 transition-colors duration-200"
              >
                <h3 className="font-bold text-gray-900 mb-2 flex items-start gap-2">
                  <span className="text-indigo-600 mt-1">Q:</span>
                  {faq.question}
                </h3>
                <p className="text-gray-700 leading-relaxed pl-6">
                  <span className="font-semibold text-green-600">A:</span> {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Browser Compatibility */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl shadow-md p-8 mb-8 border-l-4 border-blue-500">
          <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Smartphone className="w-6 h-6 text-blue-600" />
            System Requirements
          </h3>
          <div className="grid md:grid-cols-2 gap-4 text-gray-700">
            <div>
              <h4 className="font-semibold mb-2">Supported Browsers:</h4>
              <ul className="space-y-1 text-sm">
                <li className="flex items-center gap-2">
                  <span className="text-green-600">✓</span> Google Chrome (latest)
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-600">✓</span> Mozilla Firefox (latest)
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-600">✓</span> Safari (latest)
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-600">✓</span> Microsoft Edge (latest)
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Recommended:</h4>
              <ul className="space-y-1 text-sm">
                <li className="flex items-center gap-2">
                  <span className="text-blue-600">•</span> Stable internet connection
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-blue-600">•</span> JavaScript enabled
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-blue-600">•</span> Cookies enabled
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-blue-600">•</span> Minimum 1280x720 screen resolution
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Contact Support */}
        <div className="bg-white rounded-2xl shadow-lg p-8 text-center border-t-4 border-indigo-600">
          <Mail className="w-12 h-12 text-indigo-600 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-gray-900 mb-3">Still Need Help?</h3>
          <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
            If you couldn't find the answer you're looking for, our support team is here to help. 
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:support@neurohealth"
              className="inline-flex items-center justify-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors duration-200"
            >
              <Mail className="w-5 h-5" />
              Email Support
            </a>
            {/* <a
              href="#contact"
              className="inline-flex items-center justify-center gap-2 bg-slate-100 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-slate-200 transition-colors duration-200"
            >
              <HelpCircle className="w-5 h-5" />
              Contact Form
            </a> */}
          </div>
          <p className="text-sm text-slate-600 mt-6">
            Support Hours: Monday - Friday, 9:00 AM - 5:00 PM EST
          </p>
        </div>

      </div>
    </div>
  );
}