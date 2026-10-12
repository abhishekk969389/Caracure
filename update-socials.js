const fs = require('fs');
const path = require('path');

const jsonPath = path.resolve('c:/Users/ADMIN/Desktop/detaling/my-app/data/car.json');
let dataStr = fs.readFileSync(jsonPath, 'utf8');
let data = JSON.parse(dataStr);

const urlMap = {
  'FaFacebookF': 'https://www.facebook.com',
  'FaTwitter': 'https://www.x.com',
  'FaInstagram': 'https://www.instagram.com',
  'FaLinkedinIn': 'https://www.linkedin.com',
  'FaYoutube': 'https://www.youtube.com',
};

function traverse(obj) {
  if (Array.isArray(obj)) {
    obj.forEach(traverse);
  } else if (obj !== null && typeof obj === 'object') {
    if (obj.icon && urlMap[obj.icon] && obj.href === '#') {
      obj.href = urlMap[obj.icon];
    }
    for (const key in obj) {
      traverse(obj[key]);
    }
  }
}

traverse(data);

fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2));
console.log('Social media links updated successfully.');
