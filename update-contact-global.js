const fs = require('fs');
const path = require('path');

const jsonPath = path.resolve('c:/Users/ADMIN/Desktop/detaling/my-app/data/car.json');
let dataStr = fs.readFileSync(jsonPath, 'utf8');

// Replace all phone numbers starting with +91 (e.g., +91 98765 43211)
dataStr = dataStr.replace(/\+91\s+\d{5}\s+\d{5}/g, "+1 0000000000");

// Replace all tel: links for +91
dataStr = dataStr.replace(/tel:\+91\d{10}/g, "tel:+10000000000");

// Replace all @caracure.com emails
dataStr = dataStr.replace(/[a-zA-Z0-9._%+-]+@caracure\.com/g, "dummy@xyz.com");

// Replace any remaining New Delhi addresses
dataStr = dataStr.replace(/New Delhi, India - 110001/gi, "New York, USA- 110001");
dataStr = dataStr.replace(/New Delhi, India/gi, "New York, USA");

fs.writeFileSync(jsonPath, dataStr);
console.log('Final pass: All phones, emails, and addresses replaced globally.');
