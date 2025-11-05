import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { TrendingUp, Activity, Brain, BicepsFlexed } from 'lucide-react';
 import { Badge } from "../ui/badge";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer} from 'recharts';

export default function HealthProgressCard({ symptomLogs }) {
  // --- NEW LOGIC FOR WEEKLY CYCLES ---
const daysPerCycle = 7;
const totalLogs = symptomLogs.length;

// Determine which 7-day cycle we're in
const currentCycleIndex = Math.floor((totalLogs - 1) / daysPerCycle);

// Calculate start and end indices for this cycle
const startIndex = currentCycleIndex * daysPerCycle;
const endIndex = startIndex + daysPerCycle;

// Slice only that cycle's logs
const last7Days = symptomLogs.slice(startIndex, endIndex);

  
  const chartData = last7Days.map((log, index) => ({
    day: `Day ${index + 1}`,
    tremor: log.tremor_severity || 0,
    mood: log.mood_rating || 0,
    sleep: log.sleep_quality || 0,
    muscle: log.stiffness_level || 0
  }));

  const avgImprovement = last7Days.length > 1 
    ? ((last7Days[last7Days.length - 1]?.mood_rating - last7Days[0]?.mood_rating) / last7Days[0]?.mood_rating * 100).toFixed(0)
    : 0;

  const latestLog = last7Days[last7Days.length - 1] || {};

  return (
    <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-none shadow-lg hover:shadow-xl transition-all duration-300">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <Activity className="w-5 h-5 text-blue-600" />
            Health Progress
            <Badge variant="secondary" className="text-sm bg-blue-100 text-blue-700 ml-2">Week {currentCycleIndex + 1}</Badge>
          </CardTitle>
          {avgImprovement > 0 && (
            <div className="flex items-center gap-1 text-green-600 bg-green-50 px-3 py-1 rounded-full">
              <TrendingUp className="w-4 h-4" />
              <span className="text-sm font-semibold">+{avgImprovement}%</span>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-48 mb-4">
          {chartData.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <XAxis dataKey="day" stroke="#6b7280" fontSize={12} />
              <YAxis stroke="#6b7280" fontSize={12} domain={[0, 10]} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  fontSize: '12px'
                }}
              />
              <Line type="monotone" dataKey="mood" stroke="#d97706" strokeWidth={2} name="Mood" dot={{ fill: '#d97706', r: 4 , strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 7, strokeWidth: 2, stroke: '#8b5cf6' }}animationDuration={1000}/>
              <Line type="monotone" dataKey="tremor" stroke="#ef4444" strokeWidth={2} name="Tremor" dot={{ fill: '#ef4444', r: 4 }} />
              <Line type="monotone" dataKey="sleep" stroke="#3b82f6" strokeWidth={2} name="Sleep" dot={{ fill: '#3b82f6', r: 4 }} />
              <Line type="monotone" dataKey="muscle" stroke="#9333ea" strokeWidth={2} name=" Muscle Stiffness" dot={{ fill: '#9333ea', r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
          ) : (
            <p className="text-gray-400 text-center mt-12">No symptom data available yet</p>
          )}
        </div> 

        <div className="grid grid-cols-3 gap-4">
          <div className="text-center p-3 bg-white rounded-lg">
            <Brain className="w-5 h-5 text-purple-500 mx-auto mb-1" />
            <p className="text-2xl font-bold text-gray-900">{latestLog.mood_rating || 0}</p>
            <p className="text-xs text-gray-500">Mood</p>
          </div>
          <div className="text-center p-3 bg-white rounded-lg">
            <Activity className="w-5 h-5 text-red-500 mx-auto mb-1" />
            <p className="text-2xl font-bold text-gray-900">{latestLog.tremor_severity || 0}</p>
            <p className="text-xs text-gray-500">Tremor</p>
          </div>
          {/* <div className="text-center p-3 bg-white rounded-lg">
            <Moon className="w-5 h-5 text-blue-500 mx-auto mb-1" />
            <p className="text-2xl font-bold text-gray-900">{latestLog.sleep_quality || 0}</p>
            <p className="text-xs text-gray-500">Sleep</p>
          </div> */}
          <div className="text-center p-3 bg-white rounded-lg">
            <BicepsFlexed className="w-5 h-5 text-blue-500 mx-auto mb-1" />
            <p className="text-2xl font-bold text-gray-900">{latestLog.stiffness_level || 0}</p>
            <p className="text-xs text-gray-500">Muscle Stiffness</p>
          </div>
        </div>

        {avgImprovement > 0 && (
          <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-sm text-green-800 text-center font-medium">
              🎉 Your symptom control is improving — {avgImprovement}% better week-to-week!
            </p>
          </div>
        )}
        {totalLogs % daysPerCycle === 1 && totalLogs > 1 && (
  <div className="mt-3 p-2 bg-blue-50 border border-blue-200 rounded-lg text-center text-blue-700 text-sm font-medium">
    🌟 New week started — tracking Week {currentCycleIndex + 1}!
  </div>
)}
      </CardContent>
    </Card>
  );
}