const fs = require('fs');
const path = require('path');

const jsonPath = path.resolve('c:/Users/ADMIN/Desktop/detaling/my-app/data/car.json');
const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

// 1. SubBanners for Blog Detail
data.CaracureIndustries.sections.SubBanners.variants.CaracureSubBanners1.blogDetail = {
  title: "Blog Detail",
  bgImage: "/subbanner.webp",
  breadcrumbs: [
    { label: "Home", href: "/" },
    { label: "Blog Detail", active: true }
  ]
};

// 2. Blog Detail Config
const blogData = data.CaracureIndustries.sections.Blog.variants.CaracureBlog1;
blogData.detail = {
  recentTitle: "Recent Posts",
  recentCount: 5
};

// Map Month to full name for the date
const monthMap = {
  "JAN": "January", "FEB": "February", "MAR": "March", "APR": "April",
  "MAY": "May", "JUN": "June", "JUL": "July", "AUG": "August",
  "SEP": "September", "OCT": "October", "NOV": "November", "DEC": "December"
};

// Images to use for posts 2-12
const unsplashImages = [
  "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1625047509168-a7006f817ced?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1600795493202-b2f7036d649d?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1580273916550-e323be2ae537?q=80&w=800&auto=format&fit=crop"
];

// Helper to get random item
const sample = (arr) => arr[Math.floor(Math.random() * arr.length)];

// 3. Post Updates
blogData.posts.forEach((post, idx) => {
  const monthName = monthMap[post.month] || post.month;
  post.date = `${monthName} ${post.day}, 2024`;
  
  if (post.href.includes('essential-car-maintenance-tips')) {
    // Post 1 (exact match for screenshot)
    post.intro = "Regular maintenance keeps your car running smoothly and helps prevent costly repairs. Whether you drive a new vehicle or an older one, following a few essential maintenance practices can extend its life, improve performance, and ensure your safety on the road.";
    post.sections = [
      {
        heading: "1. Keep Your Engine Oil Clean",
        paragraphs: ["Engine oil lubricates the moving parts of your engine and helps keep it cool. Over time, the oil becomes dirty and less effective, which can lead to engine damage. It's important to check your oil level regularly and change it as recommended by your vehicle's manufacturer."],
        images: [
          "https://images.unsplash.com/photo-1625047509168-a7006f817ced?q=80&w=800&auto=format&fit=crop", // oil pouring
          "https://images.unsplash.com/photo-1580273916550-e323be2ae537?q=80&w=800&auto=format&fit=crop" // tyre
        ]
      },
      {
        heading: "2. Check and Replace Tyres",
        paragraphs: ["Tyres play a crucial role in your safety and the overall performance of your car. Regularly check tyre pressure, tread depth, and look for signs of wear or damage. Properly inflated tyres improve fuel efficiency and provide better control while driving."],
        quote: "Well-maintained tyres not only give you a smoother ride but also keep you safe in all weather conditions."
      },
      {
        heading: "3. Inspect Brakes Regularly",
        paragraphs: ["Your brakes are one of the most important safety features in your car. If you notice unusual noises, reduced braking performance, or a soft brake pedal, it's time to have them inspected by a professional."]
      }
    ];
    post.outro = "By following these simple car maintenance tips, you can keep your vehicle in excellent condition, avoid unexpected breakdowns, and enjoy a safer, more comfortable driving experience.";
  } else {
    // Posts 2-12
    const subject = post.title.split(' ')[0]; // just grab a word
    post.intro = `Understanding the intricacies of your vehicle is paramount to ensuring its longevity and performance. In this post, we delve deep into "${post.title}", exploring the best practices and expert recommendations that will keep you safely on the road.`;
    
    post.sections = [
      {
        heading: `1. The Importance of ${subject}`,
        paragraphs: [
          `Every component of your vehicle plays a vital role in its overall functionality. When discussing ${subject.toLowerCase()}, it is crucial to recognize that proactive care can prevent minor issues from becoming major, costly repairs down the line.`,
          `Experts agree that regular inspections and timely interventions are the keys to a healthy vehicle. Whether you're a daily commuter or a weekend road-tripper, staying informed is your best defense against unexpected breakdowns.`
        ]
      },
      {
        heading: `2. Expert Strategies for Success`,
        paragraphs: [
          `Implementing a routine check is simple once you know what to look for. Start by consulting your owner's manual, which provides a wealth of specific information tailored to your exact make and model.`,
          `Additionally, partnering with a trusted mechanic for seasonal checkups can provide peace of mind. They have the specialized tools and trained eyes needed to spot subtle warning signs.`
        ],
        images: idx % 2 === 0 ? [sample(unsplashImages), sample(unsplashImages)] : undefined,
        quote: idx % 2 !== 0 ? `Investing a little time in understanding your car today saves a massive headache tomorrow.` : undefined
      },
      {
        heading: `3. Long-term Benefits`,
        paragraphs: [
          `The long-term benefits of these practices cannot be overstated. Not only do they preserve the resale value of your vehicle, but they also optimize fuel efficiency and ensure maximum safety for you and your passengers.`,
          `Ultimately, treating your car with respect translates to reliable transportation for years to come.`
        ]
      }
    ];
    post.outro = `We hope this guide provides you with actionable insights. Remember, the journey to a well-maintained vehicle begins with a single step. Stay proactive, drive safely, and don't hesitate to reach out to professionals when in doubt.`;
  }
  
  // Remove old 'content' field if it exists from previous prompts
  delete post.content;
});

fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2));
console.log('Blog data updated in car.json');
