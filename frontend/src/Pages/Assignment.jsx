import React from "react";

export default function ParkinsonsApp() {
  return (
    <div className="main-container font-sans text-gray-800">
      {/* Header */}
      {/* <header className="header flex items-center justify-between bg-white shadow-md px-6 py-4 sticky top-0 z-50">
       

        <nav className="nav-simple flex gap-6 text-gray-700 font-medium">
          <a href="#dashboard" className="hover:text-blue-600">Dashboard</a>
          <a href="#modules" className="hover:text-blue-600">Modules</a>
          <a href="#community" className="hover:text-blue-600">Community</a>
        </nav>

      </header> */}

      {/* Hero Section */}
      <section className="hero bg-blue-50 text-center py-16 px-6">
        <h1 className="text-3xl md:text-5xl font-bold mb-6 text-blue-700">
          Living With Parkinson’s, Your Way
        </h1>
        <div className="hero-video-cta flex flex-col md:flex-row items-center justify-center gap-10">
          <div className="intro-video w-full md:w-1/2 max-w-md">
            {/* Placeholder for 2-min animated video */}
            <video
              src="intro-video.mp4"
              controls
              poster="video-thumb.jpg"
              className="w-full rounded-lg shadow-lg"
            />
          </div>
          <div className="cta-buttons flex flex-col gap-4">
            <button className="primary bg-blue-600 text-white px-6 py-3 rounded-xl shadow-md hover:bg-blue-700">
              Start My Journey
            </button>
            <button className="secondary border border-blue-600 text-blue-600 px-6 py-3 rounded-xl hover:bg-blue-50">
              Caregiver Guide
            </button>
          </div>
        </div>
      </section>

      {/* Dashboard Snapshot */}
      <section id="dashboard" className="dashboard-snapshot bg-white py-12 px-6">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          My Parkinson’s Dashboard
        </h2>
        <div className="dashboard-metrics grid md:grid-cols-4 gap-6 text-center">
          <div className="metric border rounded-lg shadow p-4">
            <span className="block font-medium">Symptom Score (Last Week)</span>
            <span className="text-xl">⬆ ⬇</span>
          </div>
          <div className="metric border rounded-lg shadow p-4">
            <span className="block font-medium">Medication Adherence</span>
            <span className="text-xl text-green-600">90%</span>
          </div>
          <div className="metric tip-of-day border rounded-lg shadow p-4">
            <span className="block font-medium">Tip of the Day:</span>
            <em className="text-blue-600">Try walking with cues</em>
          </div>
          <div className="flex items-center justify-center">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700">
              Add Today’s Symptoms
            </button>
          </div>
        </div>
      </section>

      {/* Modules */}
      <section className="modules bg-gray-50 py-12 px-6" id="modules">
        <h2 className="text-2xl font-semibold text-center mb-8">
          Explore Modules
        </h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          <div className="module-card border rounded-xl p-6 shadow hover:shadow-lg cursor-pointer">
            My Journey <br />
            <span className="text-sm text-gray-500">
              (Timeline, milestones, export)
            </span>
          </div>
          <div className="module-card border rounded-xl p-6 shadow hover:shadow-lg cursor-pointer">
            Learn About PD <br />
            <span className="text-sm text-gray-500">
              (Basics, symptoms, treatments)
            </span>
          </div>
          <div className="module-card border rounded-xl p-6 shadow hover:shadow-lg cursor-pointer">
            Symptom Tracker <br />
            <span className="text-sm text-gray-500">(Interactive charts)</span>
          </div>
          <div className="module-card border rounded-xl p-6 shadow hover:shadow-lg cursor-pointer">
            My Medications <br />
            <span className="text-sm text-gray-500">
              (Planner / reminders)
            </span>
          </div>
          <div className="module-card border rounded-xl p-6 shadow hover:shadow-lg cursor-pointer">
            Decision Tools <br />
            <span className="text-sm text-gray-500">
              (What-if simulator, self-check)
            </span>
          </div>
          <div className="module-card border rounded-xl p-6 shadow hover:shadow-lg cursor-pointer">
            Caregiver Corner <br />
            <span className="text-sm text-gray-500">
              (Stress, self-care, guides)
            </span>
          </div>
        </div>
      </section>

      {/* Community & Local */}
      <section
        className="community-local bg-white py-12 px-6 text-center"
        id="community"
      >
        <h2 className="text-2xl font-semibold mb-6">Community & Local</h2>
        <ul className="list-disc list-inside text-left max-w-xl mx-auto space-y-2">
          <li>Find patients near me / support groups</li>
          <li>Local doctors/clinics in Bengaluru/Karnataka</li>
          <li>Events: Upcoming yoga/exercise classes, webinars</li>
        </ul>
      </section>

      {/* Footer */}
      <footer className="footer bg-gray-800 text-white py-6 px-6 mt-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <span className="text-sm">
            Sources | Medical Disclaimer | Helpline: 1800-XXX-XXXX
          </span>
          <div className="flex gap-3">
            <button className="bg-gray-700 px-3 py-1 rounded hover:bg-gray-600">
              English
            </button>
            <button className="bg-gray-700 px-3 py-1 rounded hover:bg-gray-600">
              Kannada
            </button>
            <button className="bg-gray-700 px-3 py-1 rounded hover:bg-gray-600">
              Hindi
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
