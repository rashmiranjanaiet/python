import React, { useState } from 'react';
import { EnvironmentalData, NE_LOCATIONS } from '../types';
import { MapPin, CloudRain, Thermometer, Droplets, Activity } from 'lucide-react';

interface Props {
  onSubmit: (data: EnvironmentalData) => void;
  isLoading: boolean;
}

const EpidemicForm: React.FC<Props> = ({ onSubmit, isLoading }) => {
  const [selectedState, setSelectedState] = useState<string>(NE_LOCATIONS[0].state);
  const [formData, setFormData] = useState<EnvironmentalData>({
    location: `${NE_LOCATIONS[0].districts[0]}, ${NE_LOCATIONS[0].state}`,
    temperature: 28,
    humidity: 75,
    rainfall: 15,
  });

  const handleStateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newState = e.target.value;
    setSelectedState(newState);
    const firstDistrict = NE_LOCATIONS.find(l => l.state === newState)?.districts[0] || '';
    setFormData(prev => ({ ...prev, location: `${firstDistrict}, ${newState}` }));
  };

  const handleDistrictChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, location: `${e.target.value}, ${selectedState}` }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: parseFloat(value) }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const currentDistricts = NE_LOCATIONS.find(l => l.state === selectedState)?.districts || [];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
      <div className="flex items-center gap-2 mb-6 text-slate-800">
        <Activity className="w-5 h-5 text-indigo-600" />
        <h2 className="text-xl font-bold">Environmental Inputs</h2>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Location Selection */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">State</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <select 
                value={selectedState}
                onChange={handleStateChange}
                className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-sm font-medium"
              >
                {NE_LOCATIONS.map(loc => (
                  <option key={loc.state} value={loc.state}>{loc.state}</option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">District</label>
            <select 
              value={formData.location.split(',')[0]}
              onChange={handleDistrictChange}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-sm font-medium"
            >
              {currentDistricts.map(dist => (
                <option key={dist} value={dist}>{dist}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Temperature */}
        <div>
          <div className="flex justify-between mb-2">
            <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
              <Thermometer className="w-4 h-4 text-orange-500" /> Temperature
            </label>
            <span className="text-sm font-bold text-slate-900">{formData.temperature}°C</span>
          </div>
          <input
            type="range"
            name="temperature"
            min="10"
            max="45"
            step="0.5"
            value={formData.temperature}
            onChange={handleChange}
            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
          />
        </div>

        {/* Humidity */}
        <div>
          <div className="flex justify-between mb-2">
            <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
              <Droplets className="w-4 h-4 text-blue-500" /> Humidity
            </label>
            <span className="text-sm font-bold text-slate-900">{formData.humidity}%</span>
          </div>
          <input
            type="range"
            name="humidity"
            min="20"
            max="100"
            value={formData.humidity}
            onChange={handleChange}
            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
          />
        </div>

        {/* Rainfall */}
        <div>
          <div className="flex justify-between mb-2">
            <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
              <CloudRain className="w-4 h-4 text-cyan-600" /> Rainfall (24h)
            </label>
            <span className="text-sm font-bold text-slate-900">{formData.rainfall} mm</span>
          </div>
          <input
            type="range"
            name="rainfall"
            min="0"
            max="300"
            value={formData.rainfall}
            onChange={handleChange}
            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className={`w-full py-3 px-4 rounded-lg font-bold text-white shadow-md transition-all ${
            isLoading 
              ? 'bg-slate-400 cursor-not-allowed' 
              : 'bg-indigo-600 hover:bg-indigo-700 hover:shadow-lg'
          }`}
        >
          {isLoading ? 'Analyzing Data...' : 'Run Risk Assessment'}
        </button>
      </form>
    </div>
  );
};

export default EpidemicForm;
