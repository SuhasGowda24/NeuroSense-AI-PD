import { HelpCircle, ChevronDown, Shield, Brain, Users, Lock, FileText, Settings, Search } from 'lucide-react';
import { useState } from 'react';

export default function FAQ() {
  const [openItems, setOpenItems] = useState([0]); // First item open by default
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const toggleItem = (index) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const categories = [
    { id: 'all', name: 'All Questions', icon: HelpCircle },
    { id: 'general', name: 'General', icon: FileText },
    { id: 'medical', name: 'Medical & Diagnosis', icon: Brain },
    { id: 'privacy', name: 'Privacy & Security', icon: Lock },
    { id: 'usage', name: 'Platform Usage', icon: Settings },
    { id: 'research', name: 'Research & Clinical', icon: Users }
  ];

  const faqs = [
    {
      category: 'medical',
      question: 'Is this a medical diagnosis?',
      answer: 'No. This tool provides AI-based screening support only. It is NOT a diagnostic medical device and does not provide medical diagnosis, treatment, or medical advice. All results must be reviewed and interpreted by qualified healthcare professionals. Never make health decisions based solely on this system\'s output.',
      featured: true
    },
    {
      category: 'privacy',
      question: 'Is my data safe?',
      answer: 'Yes. Data is stored securely using industry-standard encryption (AES-256) and is not shared with third parties. All data transmission uses HTTPS/TLS protocols. Access to stored data is strictly controlled with multi-factor authentication and role-based permissions. See our Data Security page for comprehensive details.',
      featured: true
    },
    {
      category: 'general',
      question: 'What is NeuroSense AI?',
      answer: 'NeuroSense AI is an advanced artificial intelligence platform designed to analyze handwriting and drawing patterns for neurological research and screening support. It uses machine learning algorithms to identify patterns that may be associated with various neurological conditions.'
    },
    {
      category: 'medical',
      question: 'Can this replace a doctor\'s evaluation?',
      answer: 'Absolutely not. This platform is intended solely for research and screening support purposes. It cannot and should not replace professional medical evaluation, diagnosis, or treatment. Always consult with qualified healthcare providers for any medical concerns or decisions.'
    },
    {
      category: 'usage',
      question: 'What devices can I use?',
      answer: 'NeuroSense AI works on desktop computers, tablets, and mobile devices. For best results, we recommend using a touch-enabled device with a stylus. The platform supports all modern browsers including Chrome, Firefox, Safari, and Edge (latest versions).'
    },
    {
      category: 'usage',
      question: 'How do I create a drawing sample?',
      answer: 'Simply navigate to the drawing canvas and use your mouse, finger, or stylus to draw. Follow any on-screen instructions for specific tasks. Ensure your drawing is complete before submitting for analysis. You can clear and restart if needed.'
    },
    {
      category: 'general',
      question: 'How accurate is the AI analysis?',
      answer: 'While our AI models are trained on extensive datasets and undergo rigorous validation, no screening tool is 100% accurate. Results should be considered screening indicators only and must be verified by healthcare professionals. Accuracy varies based on drawing quality, completion, and other factors.'
    },
    {
      category: 'privacy',
      question: 'What data do you collect?',
      answer: 'We collect drawing data, interaction metadata (timestamps, session information), and technical information (device type, browser). This data is used exclusively for research and system improvement. We do not collect personally identifiable information unless you provide it voluntarily (e.g., during account creation).'
    },
    {
      category: 'privacy',
      question: 'Can I delete my data?',
      answer: 'Yes. Users have the right to request deletion of their data at any time. Contact our support team at support@neurosense-ai.com with your deletion request. We will process it within 30 days in accordance with applicable data protection regulations.'
    },
    {
      category: 'privacy',
      question: 'Do you share data with third parties?',
      answer: 'No. We do not sell, rent, or share your data with third parties for marketing or commercial purposes. Data may only be shared in aggregated, anonymized form for research publications, or as required by law. Individual data is never shared without explicit consent.'
    },
    {
      category: 'usage',
      question: 'How long does analysis take?',
      answer: 'Analysis typically completes within seconds to a few minutes, depending on the complexity of your drawing and current system load. If analysis takes longer than expected, please check your internet connection and try again. Contact support if issues persist.'
    },
    {
      category: 'usage',
      question: 'Can I save or download my results?',
      answer: 'Yes. Most analysis results can be downloaded or saved for your records. Look for the "Download" or "Save Results" button after analysis completes. Results are typically available as PDF reports or CSV data files.'
    },
    {
      category: 'research',
      question: 'Can I use this for clinical research?',
      answer: 'Yes, with proper approval. This platform can be used as part of clinical research studies, but researchers must obtain appropriate institutional review board (IRB) approval and ensure compliance with all applicable regulations. Contact our research team at research@neurosense-ai.com for collaboration inquiries.'
    },
    {
      category: 'research',
      question: 'What conditions can the system screen for?',
      answer: 'The system is designed to identify patterns potentially associated with various neurological conditions. However, we cannot specify exact conditions as this would constitute medical claims. Screening capabilities depend on the specific models deployed and should be discussed with healthcare providers or research coordinators.'
    },
    {
      category: 'general',
      question: 'Is there a cost to use this platform?',
      answer: 'Access requirements vary. Some features may be free for research participants, while clinical or commercial use may require licensing. Contact our team for specific pricing and licensing information relevant to your use case.'
    },
    {
      category: 'usage',
      question: 'What if the system shows an error?',
      answer: 'First, try refreshing the page and ensuring your internet connection is stable. Check that you\'re using a supported browser. If the drawing is incomplete or unclear, try redrawing with clearer strokes. For persistent issues, contact support at support@neurosense-ai.com with details about the error.'
    },
    {
      category: 'general',
      question: 'Who developed NeuroSense AI?',
      answer: 'NeuroSense AI was developed by a team of AI researchers, neurologists, and healthcare professionals dedicated to advancing neurological screening through artificial intelligence. Our development follows ethical AI principles and healthcare data protection standards.'
    },
    {
      category: 'research',
      question: 'How was the AI trained?',
      answer: 'Our AI models are trained on diverse datasets of handwriting and drawing samples, collected with appropriate consent and ethical approval. Training involves supervised learning techniques with validation by medical experts. We continuously update and improve models based on new research and data.'
    },
    {
      category: 'privacy',
      question: 'Is the platform HIPAA compliant?',
      answer: 'We implement security measures consistent with healthcare data protection standards. However, specific compliance requirements (HIPAA, GDPR, etc.) depend on how the platform is deployed and used. Organizations using this platform for clinical purposes should consult with their compliance officers.'
    },
    {
      category: 'usage',
      question: 'Can I use this on behalf of someone else?',
      answer: 'If you\'re a healthcare provider or researcher, you can facilitate the drawing process for participants/patients. However, ensure you have proper consent and follow applicable regulations. The person whose data is being collected should be aware of and consent to the screening process.'
    },
    {
      category: 'general',
      question: 'What makes NeuroSense AI different from other tools?',
      answer: 'NeuroSense AI combines state-of-the-art deep learning models with neurological expertise to provide research-grade screening support. Our platform emphasizes user privacy, data security, and ethical AI practices while maintaining high analytical standards. We prioritize transparency about capabilities and limitations.'
    },
    {
      category: 'usage',
      question: 'Do I need special equipment?',
      answer: 'No special equipment is required beyond a computer, tablet, or smartphone. However, for optimal results, we recommend using a device with touch capability and a stylus, as this more closely mimics natural handwriting and drawing conditions.'
    }
  ];

  const filteredFaqs = faqs.filter(faq => {
    const matchesCategory = activeCategory === 'all' || faq.category === activeCategory;
    const matchesSearch = searchQuery === '' || 
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredFaqs = faqs.filter(faq => faq.featured);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-violet-50 to-slate-100 py-12 px-4 sm:py-16">
      <div className="max-w-5xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-violet-600 to-violet-700 rounded-2xl mb-4 shadow-lg">
            <HelpCircle className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-3">Frequently Asked Questions</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Find answers to common questions about NeuroSense AI
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search questions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-transparent outline-none transition-all"
            />
          </div>
        </div>

        {/* Featured Questions */}
        {activeCategory === 'all' && searchQuery === '' && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <span className="text-violet-600">★</span> Most Important
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {featuredFaqs.map((faq, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-violet-50 to-purple-50 rounded-xl p-6 border-2 border-violet-200 shadow-md"
                >
                  <h3 className="font-bold text-gray-900 mb-3 text-lg">{faq.question}</h3>
                  <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Category Filters */}
        <div className="mb-8">
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                    activeCategory === category.id
                      ? 'bg-violet-600 text-white shadow-md'
                      : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {category.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* FAQ Accordion */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {activeCategory === 'all' ? 'All Questions' : categories.find(c => c.id === activeCategory)?.name}
            <span className="text-gray-400 text-lg ml-2">({filteredFaqs.length})</span>
          </h2>
          
          {filteredFaqs.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No questions found matching your search.</p>
              <button
                onClick={() => { setSearchQuery(''); setActiveCategory('all'); }}
                className="mt-4 text-violet-600 hover:text-violet-700 font-medium"
              >
                Clear filters
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredFaqs.map((faq, index) => {
                const isOpen = openItems.includes(index);
                return (
                  <div
                    key={index}
                    className="border border-gray-200 rounded-lg overflow-hidden hover:border-violet-300 transition-colors duration-200"
                  >
                    <button
                      onClick={() => toggleItem(index)}
                      className="w-full flex items-center justify-between p-5 text-left bg-slate-50 hover:bg-slate-100 transition-colors duration-200"
                    >
                      <span className="font-semibold text-gray-900 pr-4">{faq.question}</span>
                      <ChevronDown
                        className={`w-5 h-5 text-violet-600 flex-shrink-0 transition-transform duration-200 ${
                          isOpen ? 'transform rotate-180' : ''
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="p-5 bg-white border-t border-gray-100">
                        <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Quick Stats */}
        <div className="mt-8 grid md:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl p-4 shadow-md text-center border-l-4 border-violet-500">
            <div className="text-3xl font-bold text-violet-600 mb-1">{faqs.length}</div>
            <div className="text-sm text-gray-600">Total Questions</div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-md text-center border-l-4 border-blue-500">
            <div className="text-3xl font-bold text-blue-600 mb-1">{faqs.filter(f => f.category === 'medical').length}</div>
            <div className="text-sm text-gray-600">Medical FAQs</div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-md text-center border-l-4 border-green-500">
            <div className="text-3xl font-bold text-green-600 mb-1">{faqs.filter(f => f.category === 'privacy').length}</div>
            <div className="text-sm text-gray-600">Privacy FAQs</div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-md text-center border-l-4 border-orange-500">
            <div className="text-3xl font-bold text-orange-600 mb-1">{faqs.filter(f => f.category === 'usage').length}</div>
            <div className="text-sm text-gray-600">Usage FAQs</div>
          </div>
        </div>

        {/* Still Have Questions */}
        <div className="mt-8 bg-gradient-to-r from-violet-600 to-purple-600 rounded-2xl shadow-xl p-8 text-center text-white">
          <h3 className="text-2xl font-bold mb-3">Still have questions?</h3>
          <p className="text-violet-100 mb-6 max-w-2xl mx-auto">
            Can't find what you're looking for? Our support team is ready to help you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contactsup"
              className="inline-flex items-center justify-center gap-2 bg-white text-violet-600 px-6 py-3 rounded-lg font-semibold hover:bg-violet-50 transition-colors duration-200"
            >
              <HelpCircle className="w-5 h-5" />
              Contact Support
            </a>
            <a
              href="/helpcenter"
              className="inline-flex items-center justify-center gap-2 bg-violet-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-violet-800 transition-colors duration-200"
            >
              <FileText className="w-5 h-5" />
              Help Center
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}