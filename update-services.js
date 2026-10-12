const fs = require('fs');
const path = require('path');

const jsonPath = path.resolve('c:/Users/ADMIN/Desktop/detaling/my-app/data/car.json');
const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

const servicesData = data.CaracureIndustries.sections.Services.variants.CaracureServices1;
servicesData.detail = {
  sidebarTitle: "All Services",
  includedPrefix: "What's ",
  includedHighlight: "Included?",
  processPrefix: "Our ",
  processHighlight: "Process"
};

servicesData.services.forEach(s => {
  const lowerTitle = s.title.toLowerCase();
  s.description = `Our ${lowerTitle} is designed to restore your vehicle's performance and reliability. We diagnose and fix all types of ${lowerTitle.includes('engine') ? 'engine' : 'vehicle'} issues using advanced tools and experienced technicians, ensuring your car runs smoothly and efficiently.`;
  
  s.included = [
    `Complete ${lowerTitle} diagnostics`,
    `Repair of ${lowerTitle.replace(' service', '').replace(' checkup', '')} components`,
    "Replacement of damaged parts",
    "Oil and filter change",
    "Cooling system check",
    "Performance testing"
  ];
  
  if (s.slug === 'engine-repair') {
    s.included = [
      "Complete engine diagnostics",
      "Repair of engine components",
      "Replacement of damaged parts",
      "Oil and filter change",
      "Cooling system check",
      "Performance testing"
    ];
  }

  s.processIntro = "We follow a systematic approach to identify the issue, repair the damage and ensure optimum performance for your vehicle.";
  
  s.process = [
    `Our ${lowerTitle} is designed to restore your vehicle's performance and reliability. We diagnose and fix all types of ${lowerTitle.includes('engine') ? 'engine' : 'vehicle'} issues using advanced tools and experienced technicians, ensuring your car runs smoothly and efficiently.`,
    `Our ${lowerTitle} is designed to restore your vehicle's performance and reliability. We diagnose and fix all types of ${lowerTitle.includes('engine') ? 'engine' : 'vehicle'} issues using advanced tools and experienced technicians, ensuring your car runs smoothly and efficiently.`
  ];
  
  // Clean up old fields
  delete s.features;
});

fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2));
console.log('updated car.json for services');
