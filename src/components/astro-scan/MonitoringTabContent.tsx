
import React from 'react';
import PhaseFourSection from './sections/PhaseFourSection';
import PhaseFiveSection from './sections/PhaseFiveSection';
import PhaseEightSection from './sections/PhaseEightSection';

const MonitoringTabContent = () => {
  return (
    <div className="space-y-8">
      {/* Enhanced Phase 4 & Phase 5 & Phase 8 Sections */}
      <PhaseFourSection />
      <PhaseFiveSection />
      <PhaseEightSection />
    </div>
  );
};

export default MonitoringTabContent;
