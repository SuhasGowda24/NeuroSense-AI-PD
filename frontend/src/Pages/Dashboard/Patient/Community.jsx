import React from 'react';
import { Users, MapPin, Phone, Mail, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

const SupportGroup = ({ name, description, actions }) => (
  <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
    <h3 className="text-xl font-semibold text-teal-800 mb-3">{name}</h3>
    <p className="text-gray-600 mb-4">{description}</p>
    <div className="flex flex-wrap gap-2">
      {actions.map((action, idx) => (
        <a
          key={idx}
          href={action.link}
          target={action.external ? "_blank" : undefined}
          rel={action.external ? "noopener noreferrer" : undefined}
          className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg transition-colors text-sm font-medium"
        >
          {action.icon}
          {action.label}
        </a>
      ))}
    </div>
  </div>
);

export default function ParkinsonsConnect() {
  // const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const supportGroups = [
    {
      name: "PDMDS (Parkinson's Disease & Movement Disorder Society)",
      description: "India-wide and Karnataka branches. Weekly online sessions and WhatsApp support groups.",
      actions: [
        { label: "WhatsApp", link: "https://wa.me/919987216057", icon: <Phone size={16} />, external: true },
        { label: "Website", link: "https://www.parkinsonssocietyindia.com", icon: <ExternalLink size={16} />, external: true }
      ]
    },
    {
      name: "Basal Ganglia Support Group (Brains Hospital, Bengaluru)",
      description: "Monthly in-person and virtual meetings, therapy sessions, and community support.",
      actions: [
        { label: "Call", link: "tel:+919148080000", icon: <Phone size={16} /> },
        { label: "Learn More", link: "https://brainshospital.com/Basal-Ganglia-Support-Group", icon: <ExternalLink size={16} />, external: true }
      ]
    },
    {
      name: "SoulUp – Movement Disorder Support",
      description: "Therapist-led online sessions and WhatsApp peer groups for Parkinson's patients.",
      actions: [
        { label: "WhatsApp", link: "https://wa.me/916374897533", icon: <Phone size={16} />, external: true },
        { label: "Website", link: "https://www.soulup.in/products/support-groups-living-with-a-movement-disorder", icon: <ExternalLink size={16} />, external: true }
      ]
    },
    {
      name: "Parkinson's Disease Society of Karnataka (PDSK)",
      description: "Regional patient community with meet-ups, awareness drives, and counselling.",
      actions: [
        { label: "Email", link: "mailto:pdsk.blr@gmail.com", icon: <Mail size={16} /> }
      ]
    },
    {
      name: "NIMHANS Movement Disorder Clinic",
      description: "Specialist clinic with support and educational programs for Parkinson's patients.",
      actions: [
        { label: "Email", link: "mailto:mds.nimhans@gmail.com", icon: <Mail size={16} /> },
        { label: "Website", link: "https://nimhans.ac.in", icon: <ExternalLink size={16} />, external: true }
      ]
    },
    {
      name: "Manipal Hospitals – Young Onset Parkinson's Clinic",
      description: "Group therapy and online sessions for young Parkinson's patients in Karnataka.",
      actions: [
        { label: "Website", link: "https://www.manipalhospitals.com/specialities/parkinson-disease-and-movement-disorder/young-onset-parkinsons-disease-clinic/", icon: <ExternalLink size={16} />, external: true }
      ]
    },
    {
      name: "Amrita Institute of Medical Sciences",
      description: "Open to all India. Offers WhatsApp counselling and patient support.",
      actions: [
        { label: "Website", link: "https://www.amrita.edu/news/parkinsons-disease-patient-support-group-announced-at-amrita-institute-of-medical-sciences/", icon: <ExternalLink size={16} />, external: true }
      ]
    },
    {
      name: "Apollo BGS Hospital (Mysuru)",
      description: "Local support and therapy sessions for patients and caregivers in Mysuru district.",
      actions: [
        { label: "Call", link: "tel:+918214652100", icon: <Phone size={16} /> },
        { label: "Website", link: "https://www.apollohospitals.com/mysore", icon: <ExternalLink size={16} />, external: true }
      ]
    },
    {
      name: "KMC Mangalore Neurology Support",
      description: "Movement disorder clinic offering community programs for PD patients.",
      actions: [
        { label: "Email", link: "mailto:neurology.kmcmlr@manipal.edu", icon: <Mail size={16} /> },
        { label: "Website", link: "https://manipal.edu/kmc-mangalore.html", icon: <ExternalLink size={16} />, external: true }
      ]
    },
    {
      name: "KIMS Hubballi Rehabilitation Center",
      description: "Awareness, therapy workshops, and patient support network in North Karnataka.",
      actions: [
        { label: "Call", link: "tel:+918362370100", icon: <Phone size={16} /> },
        { label: "Website", link: "https://kimshubli.org", icon: <ExternalLink size={16} />, external: true }
      ]
    }
  ];

  // const scrollToSection = (id) => {
  //   document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  //   setMobileMenuOpen(false);
  // };

  return (
    <div >
      {/* Hero Section */}
      <header id="home" className="bg-teal-700 from-teal-600 to-teal-800 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <Users size={64} className="text-teal-200" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Parkinson's Community Connect</h1>
          <p className="text-xl text-teal-100">Connecting patients, caregivers, and organizations for a stronger support network</p>
        </div>
      </header>

      {/* About Section */}
      <section id="about" className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-3xl font-bold text-teal-800 mb-4 flex items-center gap-3">
            <MapPin className="text-teal-600" />
            About Us
          </h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            Parkinson's Community Connect brings together verified Parkinson's disease support groups 
            across India, starting with Karnataka. Our mission is to make it easier for patients and 
            caregivers to find trusted communities, therapies, and resources — all in one place.
          </p>
        </div>
      </section>

      {/* View Map CTA */}
      <section className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-gradient-to-r from-teal-600 to-teal-700 rounded-2xl p-8 text-center text-white shadow-xl">
          <MapPin size={48} className="mx-auto mb-4 text-teal-100" />
          <h2 className="text-2xl font-bold mb-3">Explore Communities Worldwide</h2>
          <p className="text-teal-100 mb-6">View all Parkinson's support groups on our interactive global map</p>
          <Link 
          to="/globalmap"
        className="inline-flex items-center gap-2 bg-white text-teal-700 px-6 py-3 rounded-lg font-bold text-lg hover:bg-teal-50 transition-all shadow-lg"
        >
  <MapPin size={20} />
  View Global Map
</Link>

        </div>
      </section>

      {/* Support Groups Section */}
      <section id="groups" className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-teal-800 mb-8 text-center">Support Groups in Karnataka</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {supportGroups.map((group, idx) => (
            <SupportGroup key={idx} {...group} />
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-teal-50 rounded-2xl p-8 border-2 border-teal-200">
          <h2 className="text-3xl font-bold text-teal-800 mb-4">Get in Touch</h2>
          <p className="text-gray-700 mb-6">
            Have questions or know another Parkinson's community to list here? We'd love to hear from you!
          </p>
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-gray-700">
              <Mail className="text-teal-600" size={20} />
              <a href="mailto:support@parkinsonsconnect.in" className="hover:text-teal-600">
                support@parkinsonsconnect.in
              </a>
            </div>
            <div className="flex items-center gap-3 text-gray-700">
              <Phone className="text-teal-600" size={20} />
              <a href="tel:+919876543210" className="hover:text-teal-600">
                +91 98765 43210
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-teal-100 text-gray-600 py-8 px-4 mt-12">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm">
            © 2025 Parkinson's Community Connect | This site lists publicly available Parkinson's communities. 
          </p>
        </div>
      </footer>
    </div>
  );
}