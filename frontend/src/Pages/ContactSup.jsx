import { Mail, MessageSquare, Phone, Clock, MapPin, Send, Users, Headphones } from 'lucide-react';
import { useState } from 'react';

export default function ContactSupport() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    category: 'technical',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const contactMethods = [
    {
      icon: Mail,
      title: 'Email Support',
      primary: 'support@neurohealth.com',
      secondary: 'For technical and research-related queries',
      color: 'blue',
      action: 'mailto:support@neurohealth.com'
    },
    {
      icon: Phone,
      title: 'Phone Support',
      primary: '1-800-NEURO',
      secondary: 'Monday - Friday, 9 AM - 5 PM EST',
      color: 'green',
      action: 'tel:1-800-NEURO'
    },
    // {
    //   icon: MessageSquare,
    //   title: 'Live Chat',
    //   primary: 'Available during business hours',
    //   secondary: 'Get instant help from our team',
    //   color: 'purple',
    //   action: '#chat'
    // }
  ];

  const supportCategories = [
    { value: 'technical', label: 'Technical Support' },
    { value: 'research', label: 'Research Inquiry' },
    { value: 'account', label: 'Account & Access' },
    { value: 'data', label: 'Data & Privacy' },
    { value: 'billing', label: 'Billing & Subscription' },
    { value: 'feedback', label: 'Feedback & Suggestions' }
  ];

  const departments = [
    {
      icon: Headphones,
      name: 'Technical Support',
      email: 'support@neurohealth.com',
      description: 'Platform issues, bugs, and technical questions'
    },
    {
      icon: Users,
      name: 'Research Team',
      email: 'research@neurohealth.com',
      description: 'Research collaborations and clinical studies'
    },
    {
      icon: Mail,
      name: 'General Inquiries',
      email: 'info@neurohealth.com',
      description: 'General questions and information requests'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-cyan-50 to-slate-100 py-12 px-4 sm:py-16">
      <div className="max-w-6xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-cyan-600 to-cyan-700 rounded-2xl mb-4 shadow-lg">
            <Headphones className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-3">Contact Support</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We're here to help! Reach out to our team for assistance with any questions or issues.
          </p>
        </div>

        {/* Contact Methods Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {contactMethods.map((method, index) => {
            const Icon = method.icon;
            const colors = {
              blue: { bg: 'bg-blue-50', iconBg: 'bg-blue-100', iconColor: 'text-blue-600', border: 'border-blue-200', button: 'bg-blue-600 hover:bg-blue-700' },
              green: { bg: 'bg-green-50', iconBg: 'bg-green-100', iconColor: 'text-green-600', border: 'border-green-200', button: 'bg-green-600 hover:bg-green-700' },
              purple: { bg: 'bg-purple-50', iconBg: 'bg-purple-100', iconColor: 'text-purple-600', border: 'border-purple-200', button: 'bg-purple-600 hover:bg-purple-700' }
            };
            const colorScheme = colors[method.color];
            
            return (
              <div
                key={index}
                className={`${colorScheme.bg} rounded-xl p-6 border-2 ${colorScheme.border} hover:shadow-lg transition-all duration-300`}
              >
                <div className={`${colorScheme.iconBg} w-12 h-12 rounded-lg flex items-center justify-center mb-4`}>
                  <Icon className={`w-6 h-6 ${colorScheme.iconColor}`} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{method.title}</h3>
                <p className="text-lg font-semibold text-gray-800 mb-1">{method.primary}</p>
                <p className="text-sm text-gray-600 mb-4">{method.secondary}</p>
                <a
                  href={method.action}
                  className={`inline-block w-full text-center ${colorScheme.button} text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200`}
                >
                  Contact Now
                </a>
              </div>
            );
          })}
        </div>

        {/* Contact Form */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="md:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-8 border-t-4 border-cyan-600">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Send className="w-6 h-6 text-cyan-600" />
                Send Us a Message
              </h2>
              
              {submitted && (
                <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-6 rounded">
                  <p className="text-green-800 font-medium">
                    ✓ Thank you! Your message has been sent. We'll get back to you within 24 hours.
                  </p>
                </div>
              )}

              <div className="space-y-5">
                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition-all"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition-all"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Category *
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition-all"
                  >
                    {supportCategories.map((cat) => (
                      <option key={cat.value} value={cat.value}>
                        {cat.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition-all"
                    placeholder="Brief description of your issue"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="6"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition-all resize-none"
                    placeholder="Please provide details about your question or issue..."
                  ></textarea>
                </div>

                <button
                  onClick={handleSubmit}
                  className="w-full bg-cyan-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-cyan-700 transition-colors duration-200 flex items-center justify-center gap-2"
                >
                  <Send className="w-5 h-5" />
                  Send Message
                </button>
              </div>
            </div>
          </div>

          {/* Side Info */}
          <div className="space-y-6">
            {/* Office Hours */}
            <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-cyan-500">
              <div className="flex items-start gap-3 mb-4">
                <div className="bg-cyan-100 p-2 rounded-lg">
                  <Clock className="w-5 h-5 text-cyan-600" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">Support Hours</h3>
                  <div className="space-y-1 text-sm text-gray-600">
                    <p className="font-semibold text-gray-800">Monday - Friday</p>
                    <p>9:00 AM - 5:00 PM EST</p>
                    <p className="mt-2 text-xs text-gray-500">
                      After-hours? We'll respond on the next business day.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Response Time */}
            {/* <div className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-xl p-6 border border-cyan-200">
              <h3 className="font-bold text-gray-900 mb-3">Response Time</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-cyan-600 mt-0.5">●</span>
                  <span><strong>Email:</strong> Within 24 hours</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-600 mt-0.5">●</span>
                  <span><strong>Phone:</strong> Immediate (during hours)</span>
                </li>
              </ul>
            </div> */}

            {/* Location */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-start gap-3">
                <div className="bg-slate-100 p-2 rounded-lg">
                  <MapPin className="w-5 h-5 text-slate-600" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">Our Location</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    K S School of Engineering and Management<br />
                    Bengaluru, Karnataka<br />
                    India
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Department Cards */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Contact by Department</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {departments.map((dept, index) => {
              const Icon = dept.icon;
              return (
                <div
                  key={index}
                  className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300 border border-slate-200"
                >
                  <div className="bg-cyan-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-cyan-600" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{dept.name}</h3>
                  <p className="text-sm text-gray-600 mb-3">{dept.description}</p>
                  <a
                    href={`mailto:${dept.email}`}
                    className="text-cyan-600 hover:text-cyan-700 font-medium text-sm flex items-center gap-1"
                  >
                    <Mail className="w-4 h-4" />
                    {dept.email}
                  </a>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="bg-gradient-to-r from-cyan-600 to-blue-600 rounded-2xl shadow-xl p-8 text-center text-white">
          <h3 className="text-2xl font-bold mb-3">Need Immediate Assistance?</h3>
          <p className="text-cyan-50 mb-6 max-w-2xl mx-auto">
            For urgent technical issues during business hours, call us directly or use live chat 
            for the fastest response.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+15551234567"
              className="inline-flex items-center justify-center gap-2 bg-white text-cyan-600 px-6 py-3 rounded-lg font-semibold hover:bg-cyan-50 transition-colors duration-200"
            >
              <Phone className="w-5 h-5" />
              Call Now
            </a>
            {/* <a
              href="#chat"
              className="inline-flex items-center justify-center gap-2 bg-cyan-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-cyan-800 transition-colors duration-200"
            >
              <MessageSquare className="w-5 h-5" />
              Start Live Chat
            </a> */}
          </div>
        </div>

      </div>
    </div>
  );
}