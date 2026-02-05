import React, { useState } from 'react';
import { EnvironmentalData, RiskAnalysis } from './types';
import EpidemicForm from './components/EpidemicForm';
import AssessmentReport from './components/AssessmentReport';
import DashboardChart from './components/DashboardChart';
import { generateRiskAssessment } from './services/analysisService';
import { Stethoscope } from 'lucide-react';

const App: React.FC = () => {
  const [report, setReport] = useState<RiskAnalysis | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleFormSubmit = async (data: EnvironmentalData) => {
    setLoading(true);
    setError(null);
    try {
      const result = await generateRiskAssessment(data);
      setReport(result);
    } catch (err) {
      setError("Failed to generate assessment. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 font-sans pb-10">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-indigo-600 p-2 rounded-lg">
                <Stethoscope className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900 leading-tight">EpiGuard <span className="text-indigo-600">NE</span></h1>
              <p className="text-xs text-slate-500 font-medium">Water-Borne Disease Surveillance System</p>
            </div>
          </div>
          <div className="hidden md:block">
            <span className="bg-indigo-50 text-indigo-700 text-xs font-bold px-3 py-1 rounded-full border border-indigo-100">
              Senior Epidemiologist Mode
            </span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Error Message */}
        {error && (
            <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg">
                <div className="flex">
                    <div className="flex-shrink-0">
                        <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <div className="ml-3">
                        <p className="text-sm text-red-700">{error}</p>
                    </div>
                </div>
            </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Input */}
          <div className="lg:col-span-4 space-y-6">
            <EpidemicForm onSubmit={handleFormSubmit} isLoading={loading} />
            
            {/* Context Widget */}
            <div className="bg-slate-800 text-slate-200 rounded-xl p-6 shadow-md hidden lg:block">
                <h4 className="font-bold text-white mb-2 text-sm uppercase tracking-wide">Regional Context</h4>
                <p className="text-sm leading-relaxed text-slate-300">
                    Northeast India experiences heavy monsoons, creating ideal vectors for Leptospirosis and water-borne pathogens. 
                    Monitor rainfall spikes closely > 50mm/24h.
                </p>
            </div>
          </div>

          {/* Right Column: Visualization & Report */}
          <div className="lg:col-span-8 space-y-6">
            <DashboardChart />
            <AssessmentReport data={report} />
          </div>

        </div>
      </main>
    </div>
  );
};

export default App;
