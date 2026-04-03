import { useState } from 'react';
import { Clock } from 'lucide-react';

export default function SymptomExerciseSection({
  exercisePrograms,
  routine,
  toggleRoutineItem,
  openVideo
}) {
  const [selectedSymptom, setSelectedSymptom] = useState('all');

  const symptomInfo = {
    all: { title: 'All Programs', description: 'All exercises' },
    rigidity: { title: 'Rigidity & Stiffness', description: 'Reduce stiffness' },
    balance: { title: 'Balance', description: 'Improve stability' },
    fatigue: { title: 'Fatigue', description: 'Build endurance' },
  };

  const filteredPrograms =
    selectedSymptom === 'all'
      ? exercisePrograms
      : exercisePrograms.filter(p => p.symptoms.includes(selectedSymptom));

  return (
    <div className="mt-10">
      <h2 className="text-3xl font-bold mb-4">Exercises by Symptom</h2>

      <div className="flex gap-2 mb-6">
        {Object.keys(symptomInfo).map(key => (
          <button
            key={key}
            onClick={() => setSelectedSymptom(key)}
            className={`px-3 py-1 rounded ${
              selectedSymptom === key ? 'bg-blue-600 text-white' : 'bg-gray-100'
            }`}
          >
            {symptomInfo[key].title}
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        {filteredPrograms.map(program => (
          <div key={program.id} className="bg-white rounded-xl shadow p-4">
            <img src={program.image} alt="exercise" className="h-32 w-full object-cover rounded" />
            <h3 className="font-bold mt-2">{program.title}</h3>

            <div className="text-sm text-gray-600 flex items-center gap-1">
              <Clock className="w-4 h-4" /> {program.durationLabel}
            </div>

            <div className="flex gap-2 mt-3">
              <button
                onClick={() => openVideo(program.video)}
                className="px-3 py-1 bg-blue-50 rounded"
              >
                Video
              </button>
              <button
                onClick={() => toggleRoutineItem(program.id)}
                className="px-3 py-1 bg-gray-100 rounded"
              >
                {routine.includes(program.id) ? 'Remove' : 'Add'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
