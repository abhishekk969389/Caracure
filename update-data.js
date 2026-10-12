const fs = require('fs');
const path = require('path');

const jsonPath = path.resolve('c:/Users/ADMIN/Desktop/detaling/my-app/data/car.json');
const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

// 1. SubBanners
const subBanners = data.CaracureIndustries.sections.SubBanners.variants.CaracureSubBanners1;
subBanners.teamDetail = {
  title: "Team Detail",
  bgImage: "/subbanner.png",
  breadcrumbs: [
    { label: "Home", href: "/" },
    { label: "Team Detail", active: true }
  ]
};
subBanners.serviceDetail = {
  title: "Service Detail",
  bgImage: "/subbanner.png",
  breadcrumbs: [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: "Service Detail", active: true }
  ]
};
subBanners.blogDetail = {
  title: "Blog Detail",
  bgImage: "/subbanner.png",
  breadcrumbs: [
    { label: "Home", href: "/" },
    { label: "Blog", href: "/blog" },
    { label: "Blog Detail", active: true }
  ]
};

// 2. Team
const team = data.CaracureIndustries.sections.Team.variants.CaracureTeam1;
team.detail = {
  badge: "Team Detail",
  titlePrefix: "Team ",
  titleHighlight: "Detail",
  description: "Meet our skilled and dedicated team members who work hard to keep your vehicle running smoothly and safely."
};

const makeSlug = str => str.toLowerCase().replace(/\s+/g, '-');
team.members.forEach((m, i) => {
  m.slug = makeSlug(m.name);
  m.bio = [
    `With years of hands-on experience in vehicle maintenance and repair, I ensure that every car receives the highest level of care and attention. My goal is to keep your vehicle in top condition and on the road safely.`,
    `With years of hands-on experience in vehicle maintenance and repair, I ensure that every car receives the highest level of care and attention. My goal is to keep your vehicle in top condition and on the road safely.`,
    `With years of hands-on experience in vehicle maintenance and repair, I ensure that every car receives the highest level of care and attention. My goal is to keep your vehicle in top condition and on the road safely.`
  ];
  m.email = `${m.slug.replace('-','.')}@caracure.com`;
  m.phone = `+91 98765 4321${i}`;
  m.phoneHref = `tel:+91987654321${i}`;
  m.socials = [
    { label: "Facebook", href: "#", icon: "FaFacebookF" },
    { label: "Instagram", href: "#", icon: "FaInstagram" },
    { label: "LinkedIn", href: "#", icon: "FaLinkedinIn" },
    { label: "X", href: "#", icon: "FaXTwitter" }
  ];
});

team.members.push({
  name: "Rohan Mehta",
  role: "Senior Mechanic",
  slug: "rohan-mehta",
  email: "rohanmehta@gmail.com",
  phone: "+91 98765 43210",
  phoneHref: "tel:+919876543210",
  image: "https://images.unsplash.com/photo-1530046339160-ce3e530c7d2f?auto=format&fit=crop&w=800&q=80",
  bio: [
    `With years of hands-on experience in vehicle maintenance and repair, I ensure that every car receives the highest level of care and attention. My goal is to keep your vehicle in top condition and on the road safely.`,
    `With years of hands-on experience in vehicle maintenance and repair, I ensure that every car receives the highest level of care and attention. My goal is to keep your vehicle in top condition and on the road safely.`,
    `With years of hands-on experience in vehicle maintenance and repair, I ensure that every car receives the highest level of care and attention. My goal is to keep your vehicle in top condition and on the road safely.`
  ],
  socials: [
    { label: "Facebook", href: "#", icon: "FaFacebookF" },
    { label: "Instagram", href: "#", icon: "FaInstagram" },
    { label: "LinkedIn", href: "#", icon: "FaLinkedinIn" },
    { label: "X", href: "#", icon: "FaXTwitter" }
  ]
});

// 3. Services
const services = data.CaracureIndustries.sections.Services.variants.CaracureServices1.services;
services.forEach(s => {
  s.description = [
    `Our ${s.title.toLowerCase()} is designed to give you the best performance and reliability for your vehicle. We use state-of-the-art equipment and high-quality parts to ensure your car is in top condition.`,
    `Our technicians are highly trained and experienced in all aspects of ${s.title.toLowerCase()}, from basic maintenance to complex repairs. We pride ourselves on offering transparent pricing and honest recommendations.`
  ];
  s.features = [
    "Comprehensive diagnostics and inspection",
    "Use of genuine and OEM quality parts",
    "Expert technicians with years of experience",
    "Transparent pricing and upfront quotes",
    "Satisfaction guarantee on all work"
  ];
  s.process = [
    { title: "Initial Inspection", text: "We thoroughly inspect your vehicle to identify any underlying issues." },
    { title: "Detailed Report", text: "We provide a complete report and an honest estimate before any work begins." },
    { title: "Expert Service", text: "Our technicians perform the service using advanced tools and high-quality parts." },
    { title: "Final Check", text: "We perform a final quality check to ensure everything is working perfectly." }
  ];
});

// 4. Blog
const blog = data.CaracureIndustries.sections.Blog.variants.CaracureBlog1.posts;
blog.forEach(p => {
  p.content = [
    `Proper car maintenance is essential for extending the life of your vehicle and ensuring your safety on the road. In this article, we dive deep into the importance of regular checks and how they can save you money in the long run.`,
    `One of the most critical aspects of car care is keeping an eye on your fluid levels. Engine oil, coolant, brake fluid, and transmission fluid all play vital roles in your car's performance. Neglecting these can lead to severe damage and costly repairs.`,
    `Another key factor is tire maintenance. Regularly checking your tire pressure and tread depth not only improves fuel efficiency but also provides better traction and handling, especially in adverse weather conditions.`,
    `Finally, don't ignore those warning lights on your dashboard. They are your car's way of telling you something needs attention. Bringing your vehicle to a trusted professional at the first sign of trouble is always the best approach.`
  ];
  p.tags = ["Maintenance", "Tips", "Safety", "Performance"];
  p.category = "Auto Repair Guide";
});

fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2));
console.log('car.json updated');
