const fs = require('fs');
const path = require('path');

const jsonPath = path.resolve('c:/Users/ADMIN/Desktop/detaling/my-app/data/car.json');
let dataStr = fs.readFileSync(jsonPath, 'utf8');
let data = JSON.parse(dataStr);

const sec = data.CaracureIndustries.sections;

// 1. Update Brand data
const brand = sec.Brand.variants.CaracureBrand1;
if (brand) {
  brand.phoneLabel = "+1 0000000000";
  brand.phoneHref = "tel:+10000000000";
  brand.email = "dummy@xyz.com";
  brand.emailHref = "mailto:dummy@xyz.com";
  brand.addressLine1 = "123 Auto Street,";
  brand.addressLine2 = "New York, USA- 110001";
}

// 2. Update TopBar data
const topBar = sec.TopBar.variants.CaracureTopBar1;
if (topBar) {
  topBar.address = "123 Auto Street, New York, USA- 110001";
}

// 3. Update Header (Navbar) data
const header = sec.Header.variants.CaracureHeader1;
if (header) {
  header.contactText = "Call Anytime";
  header.contactPhone = "+1 0000000000";
}

// 4. Update Contact Page Info blocks
const contactPage = sec.ContactPage.variants.CaracureContactPage1;
if (contactPage && contactPage.contactInfo) {
  contactPage.contactInfo.forEach(info => {
    if (info.icon === "FaMapMarkerAlt" || info.title.toLowerCase().includes("address") || info.title.toLowerCase().includes("location")) {
      info.lines = ["123 Auto Street,", "New York, USA- 110001"];
    } else if (info.icon === "FaEnvelope" || info.title.toLowerCase().includes("email")) {
      info.lines = ["dummy@xyz.com"];
    } else if (info.icon === "FaPhoneAlt" || info.title.toLowerCase().includes("phone") || info.title.toLowerCase().includes("call")) {
      info.lines = ["+1 0000000000"];
    }
  });
}

// 5. Check if there are any other specific occurrences that could use updating.
// (Global search-and-replace for the old values just in case they slipped elsewhere)

// Old values we know were there: "+91 98765 43210", "info@caracure.com", "123 Auto Street, New Delhi, India"
dataStr = JSON.stringify(data, null, 2);
dataStr = dataStr.replace(/\+91\s*98765\s*43210/g, "+1 0000000000");
dataStr = dataStr.replace(/tel:\+919876543210/g, "tel:+10000000000");
dataStr = dataStr.replace(/info@caracure\.com/g, "dummy@xyz.com");
dataStr = dataStr.replace(/123 Auto Street,\s*New Delhi,\s*India\s*-\s*110001/gi, "123 Auto Street, New York, USA- 110001");
dataStr = dataStr.replace(/123 Auto Street, New Delhi, India/gi, "123 Auto Street, New York, USA");

fs.writeFileSync(jsonPath, dataStr);
console.log('Contact info updated successfully.');
