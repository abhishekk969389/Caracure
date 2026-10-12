const fs = require('fs');
const path = require('path');

const jsonPath = path.resolve('c:/Users/ADMIN/Desktop/detaling/my-app/data/car.json');
let dataStr = fs.readFileSync(jsonPath, 'utf8');
let data = JSON.parse(dataStr);

const sec = data.CaracureIndustries.sections;

// Get the list of all actual services from the data
const allServices = sec.Services.variants.CaracureServices1.services;

// Get the Navbar config
const navItems = sec.Header.variants.CaracureHeader1.navItems;

// Find the "Services" nav item
const servicesNavItem = navItems.find(item => item.label.toLowerCase() === 'services');

if (servicesNavItem) {
  // Update its children with real services
  servicesNavItem.children = allServices.map(service => ({
    label: service.title,
    href: `/services/${service.slug}`
  }));

  // Save the updated JSON
  fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2));
  console.log('Navbar services dropdown successfully updated!');
} else {
  console.log('Could not find Services in nav items.');
}
