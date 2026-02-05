import React from 'react';
import { RiskAnalysis, RiskLevel } from '../types';
import { AlertTriangle, ShieldAlert, BookOpen, Activity } from 'lucide-react';

interface Props {
  data: RiskAnalysis | null;
}

const AssessmentReport: React.FC<Props> = ({ data }) => {
  if (!data) {
    return (
      <div className="h-full flex flex-col items-center justify-center bg-slate-50 border-2 border-dashed border-slate-300 rounded-xl p-12 text-slate-400">
        <Activity className="w-12 h-12 mb-4 opacity-50" />
        <p className="font-medium">Awaiting environmental data inputs...</p>
        <p className="text-sm">Submit the form to generate a risk profile.</p>
      </div>
    );
  }

  const getRiskColor = (level: RiskLevel) => {
    switch (level) {
      case RiskLevel.Critical: return 'bg-red-600 text-white';
      case RiskLevel.High: return 'bg-orange-500 text-white';
      case RiskLevel.Medium: return 'bg-yellow-500 text-white';
      case RiskLevel.Low: return 'bg-emerald-500 text-white';
      default: return 'bg-slate-500 text-white';
    }
  };

  const getRiskBorder = (level: RiskLevel) => {
    switch (level) {
      case RiskLevel.Critical: return 'border-red-600';
      case RiskLevel.High: return 'border-orange-500';
      case RiskLevel.Medium: return 'border-yellow-500';
      case RiskLevel.Low: return 'border-emerald-500';
      default: return 'border-slate-500';
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className={`rounded-xl p-6 shadow-sm flex flex-col justify-center ${getRiskColor(data.riskLevel)}`}>
            <div className="flex items-center gap-2 mb-1 opacity-90">
                <AlertTriangle className="w-5 h-5" />
                <span className="text-sm font-bold uppercase tracking-wider">Risk Level</span>
            </div>
            <div className="text-4xl font-black">{data.riskLevel}</div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 flex flex-col justify-center">
             <div className="flex items-center gap-2 mb-1 text-slate-500">
                <Activity className="w-5 h-5" />
                <span className="text-sm font-bold uppercase tracking-wider">Probability</span>
            </div>
            <div className="text-4xl font-black text-slate-900">{data.probability}</div>
        </div>
      </div>

      {/* Main Report */}
      <div className={`bg-white rounded-xl shadow-md overflow-hidden border-t-4 ${getRiskBorder(data.riskLevel)}`}>
        <div className="p-6 space-y-6">
            
            {/* Primary Threat */}
            <div>
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Primary Threat</h3>
                <div className="flex items-center gap-3">
                    <ShieldAlert className="w-8 h-8 text-slate-700" />
                    <span className="text-2xl font-bold text-slate-800">{data.primaryThreat}</span>
                </div>
            </div>

            <hr className="border-slate-100" />

            {/* Analysis */}
            <div>
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Biological Analysis</h3>
                <p className="text-slate-700 leading-relaxed font-medium">
                    {data.analysis}
                </p>
            </div>

            {/* Action Plan */}
            <div className="bg-slate-50 rounded-lg p-5 border border-slate-200">
                <h3 className="text-xs font-bold text-indigo-600 uppercase tracking-widest mb-3">Action Plan</h3>
                <ul className="space-y-3">
                    {data.actionPlan.map((point, index) => (
                        <li key={index} className="flex items-start gap-3">
                            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-xs font-bold mt-0.5">
                                {index + 1}
                            </span>
                            <span className="text-slate-700 text-sm">{point}</span>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Citation */}
            <div className="flex items-center gap-2 text-slate-400 text-xs">
                <BookOpen className="w-3 h-3" />
                <span>Reference: {data.citation}</span>
            </div>
        </div>
      </div>
    </div>
  );
};

export default AssessmentReport;
