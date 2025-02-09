// Generate blog dates 2 months apart starting from January 10, 2024
const generateBlogDates = () => {
  const dates: Date[] = [];
  const startDate = new Date('2024-01-10');
  
  for (let i = 0; i < 6; i++) {
    const date = new Date(startDate);
    date.setMonth(startDate.getMonth() + (i * 2));
    dates.push(date);
  }
  
  return dates.sort((a, b) => b.getTime() - a.getTime()); // Most recent first
};

const blogDates = generateBlogDates();

export const initialBlogs = [
  {
    id: '1',
    title: 'Ultimate Adventure Guide: Top 10 Activities in Manali for Thrill Seekers',
    excerpt: 'Explore the most thrilling adventure activities in Manali with Advikentures. From paragliding to snowboarding, discover why Manali is India\'s adventure capital.',
    content: `Looking for the ultimate adventure destination in India? Manali, with its stunning Himalayan backdrop, offers an unparalleled range of adventure activities that will get your adrenaline pumping. At Advikentures, we've curated the most exciting experiences for thrill-seekers.

    1. Paragliding in Solang Valley
    Soar like an eagle over snow-capped peaks with our certified instructors. Experience the thrill of tandem paragliding with panoramic views of the Himalayas. Our packages include professional equipment and safety briefings.

    2. White Water Rafting on Beas River
    Navigate Grade II to IV rapids on the mighty Beas River. Our experienced guides ensure both safety and excitement, making it perfect for beginners and experienced rafters alike.

    3. Skiing and Snowboarding at Rohtang Pass
    During winter months, experience world-class skiing with our professional instructors. We provide complete equipment and training for all skill levels.

    4. Mountain Biking Trails
    Explore challenging mountain trails with our premium bikes and guided tours. From beginner-friendly tracks to advanced routes, we've got something for everyone.

    5. Rock Climbing and Rappelling
    Test your limits on natural rock faces with our IRATA-certified instructors. All safety equipment and training provided by Advikentures.

    Book your adventure with Advikentures today and experience the best of Manali's thrilling activities with India's leading adventure tourism company.`,
    image: 'https://images.unsplash.com/photo-1682687220742-aba13b6e50ba',
    author: 'Rahul Sharma',
    date: blogDates[5], // January 2024
    tags: ['Adventure Sports', 'Manali', 'Travel Guide', 'Winter Sports']
  },
  {
    id: '2',
    title: 'Transform Your Life: Best Yoga and Wellness Retreats in Rishikesh 2024',
    excerpt: 'Discover the top-rated yoga retreats in Rishikesh with Advikentures. Combine spiritual awakening with luxury accommodations for the ultimate wellness experience.',
    content: `Rishikesh, the yoga capital of the world, offers a unique opportunity for spiritual growth and wellness. At Advikentures, we've carefully selected the finest retreats that combine traditional yoga practices with modern comfort.

    Why Choose Advikentures for Your Wellness Journey?
    - Certified yoga instructors with international experience
    - Luxury accommodation with Ganges views
    - Customized wellness programs
    - Combination of traditional and modern practices
    - Holistic healing approaches

    Our Most Popular Wellness Programs:
    1. 7-Day Transformation Retreat
    - Daily yoga and meditation sessions
    - Ayurvedic consultations and treatments
    - Organic vegetarian meals
    - Spiritual discourse sessions
    - Adventure activities like rafting and hiking

    2. 14-Day Intensive Yoga Teacher Training
    - Comprehensive asana practice
    - Philosophy and anatomy classes
    - Teaching methodology
    - Certification recognized worldwide

    Let Advikentures guide you on your journey to wellness and inner peace. Book your transformative retreat today.`,
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773',
    author: 'Maya Patel',
    date: blogDates[4], // March 2024
    tags: ['Wellness', 'Yoga', 'Rishikesh', 'Spiritual Retreat']
  },
  {
    id: '3',
    title: 'Secret Camping Destinations: Hidden Gems in Himachal Pradesh',
    excerpt: 'Explore exclusive camping locations in Himachal Pradesh with Advikentures. Discover pristine spots away from tourist crowds with luxury camping facilities.',
    content: `Looking for an authentic camping experience away from the crowds? Advikentures brings you exclusive access to some of Himachal's most pristine camping locations, combining adventure with comfort.

    Exclusive Camping Spots:
    1. Chandratal Lake Camp (4,300m)
    - Luxury alpine tents with heating
    - Stunning lake views
    - Star gazing sessions
    - Professional camping guides
    - Gourmet mountain cuisine

    2. Tirthan Valley Riverside Camp
    - Premium riverside location
    - Trout fishing experiences
    - Bonfire and barbecue
    - Nature walks and bird watching
    - Local cultural experiences

    3. Great Himalayan National Park Camps
    - Wildlife spotting opportunities
    - Guided trek packages
    - Eco-friendly facilities
    - Photography workshops
    - Local guide expertise

    Safety and Comfort with Advikentures:
    - High-quality camping gear
    - 24/7 support staff
    - Emergency medical facilities
    - Experienced mountain guides
    - Eco-friendly practices

    Book your wilderness adventure with Advikentures for an unforgettable camping experience.`,
    image: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4',
    author: 'Vikram Singh',
    date: blogDates[3], // May 2024
    tags: ['Camping', 'Himachal Pradesh', 'Luxury Camping', 'Wildlife']
  },
  {
    id: '4',
    title: 'Summer Adventure Guide: Best Activities in Spiti Valley',
    excerpt: 'Plan your perfect summer adventure in Spiti Valley with Advikentures. From monasteries to mountain biking, discover the best activities in this Himalayan desert.',
    content: `Spiti Valley, often called the 'Middle Land' between India and Tibet, offers unique adventure opportunities during summer months. Let Advikentures guide you through this magnificent landscape with our specially curated experiences.

    Must-Try Summer Activities:
    1. High-Altitude Mountain Biking
    - Professional bikes and safety gear
    - Guided tours with oxygen backup
    - Stunning photography opportunities
    - Technical training included

    2. Monastery Trek Circuit
    - Visit ancient monasteries
    - Local homestay experiences
    - Cultural immersion programs
    - Professional guides and porters

    3. Fossil Hunting Expeditions
    - Guided geological tours
    - Marine fossil discoveries
    - Expert naturalists
    - Photography workshops

    Why Choose Advikentures for Spiti:
    - Experienced high-altitude guides
    - Comprehensive safety measures
    - Comfortable accommodation
    - Local expertise and knowledge
    - Sustainable tourism practices

    Experience the magic of Spiti Valley with India's leading adventure tourism company.`,
    image: 'https://images.unsplash.com/photo-1544984243-ec57ea16fe25',
    author: 'Priya Sharma',
    date: blogDates[2], // July 2024
    tags: ['Spiti Valley', 'Summer Adventure', 'Cultural Tourism', 'Mountain Biking']
  },
  {
    id: '5',
    title: 'Luxury Adventure: Premium Stays and Activities in Manali',
    excerpt: 'Experience the perfect blend of luxury and adventure with Advikentures in Manali. Discover our premium accommodations and exclusive activities.',
    content: `Who says adventure can't be luxurious? At Advikentures, we specialize in combining premium accommodations with thrilling experiences in Manali. Our luxury adventure packages offer the best of both worlds.

    Premium Accommodation Options:
    1. Himalayan Forest Resort
    - Private balconies with mountain views
    - Heated infinity pool
    - Spa and wellness center
    - Gourmet restaurants
    - Adventure planning desk

    2. Riverside Luxury Camps
    - Premium glamping experience
    - Private riverside decks
    - Gourmet dining
    - Personal adventure butler
    - Exclusive activities

    Exclusive Activities:
    - Private helicopter tours
    - Customized trekking expeditions
    - Personal skiing instructors
    - Private yoga sessions
    - Gourmet mountain picnics

    Why Choose Our Luxury Packages:
    - 5-star accommodations
    - Personal adventure guides
    - Premium equipment
    - Exclusive locations
    - Customized experiences

    Let Advikentures create your perfect luxury adventure in the Himalayas.`,
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d',
    author: 'Arjun Kapoor',
    date: blogDates[1], // September 2024
    tags: ['Luxury Travel', 'Manali', 'Premium Stays', 'Adventure']
  },
  {
    id: '6',
    title: 'Winter Wonderland: Best Snow Adventures in Himachal',
    excerpt: 'Plan your winter adventure in Himachal Pradesh with Advikentures. From skiing to snow camping, discover the best winter activities and destinations.',
    content: `Winter transforms Himachal Pradesh into a magical wonderland of adventure opportunities. Advikentures brings you the most comprehensive guide to winter sports and activities in the region.

    Top Winter Destinations:
    1. Solang Valley
    - Professional ski courses
    - Snowboarding lessons
    - Snow scooter rides
    - Winter camping experiences
    - Night skiing sessions

    2. Gulaba
    - Snow hiking trails
    - Igloo building workshops
    - Snow photography tours
    - Winter survival training
    - Hot spring visits

    3. Atal Tunnel Region
    - New winter sports zone
    - Advanced skiing facilities
    - Snow leopard trails
    - Winter photography
    - Heated camping sites

    Advikentures Winter Packages Include:
    - Professional instructors
    - Quality winter gear
    - Heated accommodation
    - Safety equipment
    - Emergency support

    Experience the magic of Himalayan winters with India's most trusted adventure company.`,
    image: 'https://images.unsplash.com/photo-1551632436-cbf8dd35adfa',
    author: 'Arun Thakur',
    date: blogDates[0], // November 2024
    tags: ['Winter Sports', 'Himachal Pradesh', 'Skiing', 'Snow Adventure']
  }
];