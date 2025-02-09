import { Zap, Feather, Gamepad } from 'lucide-react';
import { images } from './images';

export const adventureCategories = [
  {
    title: 'Extreme Adventure',
    description: 'Push your limits with our most thrilling activities',
    icon: Zap,
    activities: [
      {
        title: 'Rock Climbing',
        description: 'Scale natural rock faces with expert guidance',
        price: '₹2,499',
        duration: '3 hours',
        image: images.adventure.rockClimbing
      },
      {
        title: 'Bungee Jump',
        description: 'Experience the ultimate free fall from 160ft',
        price: '₹2,999',
        duration: '30 mins',
        image: images.adventure.bungeeJump
      },
      {
        title: 'Scad Jump',
        description: 'Controlled free fall simulation',
        price: '₹1,999',
        duration: '20 mins',
        image: 'https://rishikesh.app/te/activities/scad-jump/scad-jump-07.png'
      },
      {
        title: 'Giant Swing',
        description: 'Experience weightlessness on our giant swing',
        price: '₹1,499',
        duration: '15 mins',
        image: 'https://campinginrishikesh.in/wp-content/uploads/2023/11/giant_swing_activity.jpg'
      },
      {
        title: 'Reverse Bungee',
        description: 'Shot up into the sky with controlled launch',
        price: '₹1,799',
        duration: '10 mins',
        image: 'https://media1.thrillophilia.com/filestore/06wk70fgs0ll5nxm77ycwxxprdor_Reverse%20Bungee%20Pic1.jpg'
      },
      {
        title: 'Zip Lining',
        description: 'Soar through the air across our scenic route',
        price: '₹999',
        duration: '25 mins',
        image: 'https://www.seawatersports.com/images/activies/slide/ziplining-in-uttarakhand-price.jpg'
      }
    ]
  },
  {
    title: 'Light Adventure',
    description: 'Perfect for beginners and family fun',
    icon: Feather,
    activities: [
      {
        title: 'Rope Course',
        description: 'Navigate through challenging obstacles at various heights',
        price: '₹799',
        duration: '45 mins',
        image: 'https://adventureguru.in/wp-content/themes/AdventureGuru/assets/img/rope-course-two-rishikesh.jpg'
      },
      {
        title: 'Quick Jump',
        description: 'Experience controlled descent from height',
        price: '₹999',
        duration: '15 mins',
        image: 'https://media1.thrillophilia.com/filestore/4mqf1w6qwewjrp27i4xz1217pxgd_Quick%20Jump%20Pic2.jpg'
      },
      {
        title: 'Night Trek with Dinner',
        description: 'Guided trek under stars with campfire dinner',
        price: '₹1,999',
        duration: '4 hours',
        image: 'https://media-cdn.tripadvisor.com/media/attractions-splice-spp-674x446/0d/0a/39/c3.jpg'
      },
      {
        title: 'Sky Cycling',
        description: 'Pedal through the air on elevated tracks',
        price: '₹599',
        duration: '20 mins',
        image: 'https://elevate-tsa.com/wp-content/uploads/2020/03/Sky-Cycling-1-scaled.jpg'
      },
      {
        title: 'River Rafting',
        description: 'Navigate through exciting rapids with expert guides',
        price: '₹1,499',
        duration: '2 hours',
        image: images.adventure.rafting
      },
      {
        title: 'Wall Climbing',
        description: 'Scale indoor climbing walls with safety gear',
        price: '₹499',
        duration: '30 mins',
        image: 'https://columns.wlu.edu/wp-content/uploads/2022/10/PHOTO-2-CLIMBING-800x533.jpg'
      },
      {
        title: 'Bag Jump',
        description: 'Safe free fall onto a giant air bag',
        price: '₹799',
        duration: '15 mins',
        image: 'https://lh3.googleusercontent.com/proxy/9LfJzMyhh7Fgk8h4UXJtoVN-Al_teINVUnSSTh-T9kZ7ngtCug3v5_WfLqR2JNs89OhDKi4dG6T6WuT_hhIJIy-bBDjud4gxOVBTpD6NkrVIfX-WJAnTjHVXKJC_Hw'
      },
      {
        title: 'Adventure Safari',
        description: 'Guided tour through rugged terrain',
        price: '₹2,499',
        duration: '3 hours',
        image: 'https://adventurerishikeshindia.com/images/jungle-safari/jeep-safari-at-rajaji-national-park1.jpg'
      }
    ]
  },
  {
    title: 'Entertainment Adventure',
    description: 'Fun-filled activities for everyone',
    icon: Gamepad,
    activities: [
      {
        title: 'Bowling Alley',
        description: 'Modern bowling lanes with automatic scoring',
        price: '₹399/game',
        duration: '1 hour',
        image: 'https://content.jdmagicbox.com/comp/def_content_category/bowling-alleys/c299f4345b-bowling-alleys-4-9chk8.jpg'
      },
      {
        title: 'Arcade Games',
        description: 'Classic and modern arcade gaming experience',
        price: '₹499',
        duration: '1 hour',
        image: 'https://thegamemumbai.com/assets//images/Blogs/blog2/3.jpg'
      },
      {
        title: 'Indoor Cricket',
        description: 'Professional cricket simulator with analysis',
        price: '₹799/hour',
        duration: '1 hour',
        image: 'https://content.jdmagicbox.com/comp/dehradun/l6/9999px135.x135.220511001311.a5l6/catalogue/ayush-sports-hospitality-dehradun-cricket-clubs-c9fpxbp50p.jpg'
      },
      {
        title: 'Pool Table',
        description: 'Professional pool tables with equipment',
        price: '₹299/hour',
        duration: '1 hour',
        image: 'https://content3.jdmagicbox.com/comp/rishikesh/p9/9999px135.x135.180530112149.e4p9/catalogue/royal-s-snooker-academy-idpl-colony-rishikesh-billiard-pool-parlours-9y61chful0.jpg'
      },
      {
        title: 'Gun Shooting',
        description: 'Indoor shooting range with various targets',
        price: '₹699',
        duration: '30 mins',
        image: 'https://www.seawatersports.com/images/activies/slide/gun-shooting-in-rishikesh-cost.png'
      },
      {
        title: 'AI Archery',
        description: 'Digital archery with real-time scoring',
        price: '₹299',
        duration: '30 mins',
        image: 'https://images.squarespace-cdn.com/content/v1/5bf08152f93fd4a1803b82d5/1633541406291-CM3I9E96XDEJQOF63FPS/Range-Passes-%25281920x1080%2529.jpg'
      },
      {
        title: 'Hoverboard',
        description: 'Self-balancing board experience',
        price: '₹399',
        duration: '30 mins',
        image: 'https://scx1.b-cdn.net/csz/news/800a/2016/ridingsegway.jpg'
      },
      {
        title: 'Night Life',
        description: 'Evening entertainment with music and games',
        price: '₹999',
        duration: '4 hours',
        image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7'
      }
    ]
  }
];