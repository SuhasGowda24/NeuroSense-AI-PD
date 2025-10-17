import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { ArrowLeft, CheckCircle, Circle, BookOpen } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ModuleContent({ module, onBack }) {
  const [currentSection, setCurrentSection] = useState(0);
  const [completedSections, setCompletedSections] = useState([]);

  const handleComplete = () => {
    if (!completedSections.includes(currentSection)) {
      setCompletedSections([...completedSections, currentSection]);
    }
    if (currentSection < module.sections.length - 1) {
      setCurrentSection(currentSection + 1);
    }
  };

  const handlePrevious = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
    }
  };

  return (
    <div className="p-4 lg:p-8 space-y-6 max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <Button
          variant="ghost"
          onClick={onBack}
          className="mb-4 hover:bg-teal-50"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Learning
        </Button>
      </motion.div>

      <div className="grid lg:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-1"
        >
          <Card className="border-none shadow-xl bg-white/90 backdrop-blur-lg sticky top-4">
            <CardHeader className="border-b border-teal-50">
              <CardTitle className="text-base">Progress</CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600">Completed</span>
                  <span className="font-bold text-teal-600">
                    {completedSections.length}/{module.sections.length}
                  </span>
                </div>
                <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-teal-500 to-cyan-500"
                    initial={{ width: 0 }}
                    animate={{ width: `${(completedSections.length / module.sections.length) * 100}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </div>

              <div className="space-y-2">
                {module.sections.map((section, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ x: 4 }}
                    onClick={() => setCurrentSection(index)}
                    className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all ${
                      index === currentSection
                        ? "bg-teal-100 border-2 border-teal-500"
                        : "bg-gray-50 hover:bg-gray-100 border-2 border-transparent"
                    }`}
                  >
                    {completedSections.includes(index) ? (
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                    ) : (
                      <Circle className="w-5 h-5 text-gray-400 flex-shrink-0" />
                    )}
                    <span className={`text-sm font-medium ${
                      index === currentSection ? "text-teal-900" : "text-gray-700"
                    }`}>
                      {section}
                    </span>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <div className="lg:col-span-3 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="border-none shadow-2xl bg-gradient-to-br from-teal-600 to-cyan-600 text-white">
              <CardContent className="p-8">
                <Badge className="bg-white/20 text-white border-white/30 mb-4">
                  Section {currentSection + 1} of {module.sections.length}
                </Badge>
                <h1 className="text-4xl font-bold mb-3">{module.title}</h1>
                <p className="text-teal-100 text-lg">{module.description}</p>
              </CardContent>
            </Card>
          </motion.div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentSection}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="border-none shadow-xl bg-white/90 backdrop-blur-lg">
                <CardHeader className="border-b border-teal-50">
                  <CardTitle className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center">
                      <BookOpen className="w-5 h-5 text-white" />
                    </div>
                    {module.sections[currentSection]}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="prose prose-lg max-w-none">
                    <p className="text-gray-700 leading-relaxed mb-6">
                      This section covers {module.sections[currentSection].toLowerCase()}. 
                      Understanding this topic is essential for managing Parkinson's disease effectively.
                    </p>

                    <h3 className="text-xl font-bold text-gray-900 mb-4 mt-8">Key Points:</h3>
                    <ul className="space-y-3 mb-6">
                      <li className="text-gray-700">Important information about this topic</li>
                      <li className="text-gray-700">Practical tips and strategies</li>
                      <li className="text-gray-700">What to discuss with your doctor</li>
                      <li className="text-gray-700">Resources for further learning</li>
                    </ul>

                    <div className="p-6 rounded-xl bg-blue-50 border-2 border-blue-200 mb-6">
                      <p className="text-sm font-semibold text-blue-900 mb-2">💡 Pro Tip:</p>
                      <p className="text-blue-800">
                        Take notes while you read and discuss key points with your healthcare provider during your next visit.
                      </p>
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 mb-4">Applying This Knowledge:</h3>
                    <p className="text-gray-700 leading-relaxed mb-4">
                      Now that you've learned about {module.sections[currentSection].toLowerCase()}, 
                      consider how you can apply this information in your daily life.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </AnimatePresence>

          <Card className="border-none shadow-xl bg-white/90 backdrop-blur-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <Button
                  variant="outline"
                  onClick={handlePrevious}
                  disabled={currentSection === 0}
                  className="h-12"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Previous
                </Button>

                {currentSection === module.sections.length - 1 ? (
                  <Button
                    onClick={() => {
                      handleComplete();
                      setTimeout(onBack, 500);
                    }}
                    className="h-12 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Complete Module
                  </Button>
                ) : (
                  <Button
                    onClick={handleComplete}
                    className="h-12 bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700"
                  >
                    Mark Complete & Continue
                    <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}