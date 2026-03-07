// app/lib/vibes.ts

import { C } from './constants';

export const vibes = [
  {
    id: "strength",
    label: "STRENGTH",
    sub: "Raw Power",
    color: C.red,
    bg: "radial-gradient(135deg at 30% 70%,rgba(232,62,62,.15) 0%,transparent 60%)",
    bgImage: "/media/vibe-strength.webp",
    hero: {
      title: "STRENGTH ZONE",
      subtitle: "Build Raw Power",
      description: "Elite strength equipment and programming designed for serious lifters. From beginners to competitive powerlifters, our strength zone has everything you need to build muscle and move serious weight.",
    },
    about: "Our strength zone features competition-grade equipment and expert coaching to help you build maximum strength safely. Whether you're learning the basics or chasing a new PR, we provide the tools, programming, and support to reach your strength goals.",
    features: [
      {
        name: "Olympic Lifting Platforms",
        description: "6 dedicated platforms with regulation bumper plates and competition barbells",
      },
      {
        name: "Power Racks & Squat Stations",
        description: "Rogue Fitness power racks with adjustable safeties and J-hooks",
      },
      {
        name: "Deadlift Platforms",
        description: "Dedicated deadlift area with Olympic bars and platform flooring",
      },
      {
        name: "Specialty Bars",
        description: "Safety squat bar, trap bar, Swiss bar, and cambered bar available",
      },
      {
        name: "Chalk Station",
        description: "Complimentary chalk for grip during heavy lifts",
      },
    ],
    classes: [
      {
        name: "Powerlifting Fundamentals",
        description: "Master the squat, bench press, and deadlift with proper technique",
        duration: "60 min",
        level: "Beginner to Intermediate",
      },
      {
        name: "Olympic Lifting",
        description: "Learn the snatch and clean & jerk with certified USAW coaches",
        duration: "75 min",
        level: "All Levels",
      },
      {
        name: "Strength Foundations",
        description: "Progressive strength program for building a solid base",
        duration: "60 min",
        level: "Beginner",
      },
      {
        name: "Max Effort Training",
        description: "Work up to heavy singles and test your strength limits",
        duration: "60 min",
        level: "Advanced",
      },
    ],
    equipment: [
      "Eleiko Competition Barbells (20kg men's, 15kg women's)",
      "Rogue Fitness Power Racks (6 stations)",
      "Bumper Plates (5kg - 25kg, full sets)",
      "Specialty Bars (Safety Squat, Trap Bar, Swiss Bar)",
      "Calibrated Steel Plates for competition training",
      "Benches, squat racks, and lifting platforms",
    ],
    coaches: ["Barrack", "linet"],
    testimonial: {
      name: "DAVID M.",
      quote: "I've added 60kg to my total in 6 months. The equipment is world-class and Barrack's programming is next level. Best strength facility in Nairobi.",
      role: "Powerlifter, 9 months",
    },
  },
  {
    id: "zen",
    label: "ZEN",
    sub: "Mind Reset",
    color: C.blue,
    bg: "radial-gradient(135deg 70% 30%,rgba(91,163,217,.12) 0%,transparent 60%)",
    bgImage: "/media/vibe-zen.webp",
    hero: {
      title: "ZEN ZONE",
      subtitle: "Find Your Center",
      description: "A sanctuary for mindfulness, yoga, and meditation. Natural light, cork flooring, and sound-dampened walls create the perfect environment to restore balance and clarity.",
    },
    about: "Step into our zen zone and leave the chaos behind. Designed specifically for yoga, meditation, and mindfulness practices, this space features natural materials, soft lighting, and acoustic treatments that create a calming atmosphere for mental and physical restoration.",
    features: [
      {
        name: "Cork Flooring",
        description: "Eco-friendly, non-slip surface perfect for yoga and bodyweight movement",
      },
      {
        name: "Natural Light",
        description: "Floor-to-ceiling windows with filtered natural light",
      },
      {
        name: "Sound Dampening",
        description: "Acoustic panels create a peaceful, quiet environment",
      },
      {
        name: "Essential Oils",
        description: "Aromatherapy diffusers with calming essential oil blends",
      },
      {
        name: "Meditation Cushions",
        description: "Buckwheat-filled zafu cushions and meditation benches",
      },
    ],
    classes: [
      {
        name: "Vinyasa Flow",
        description: "Dynamic flowing sequences linking breath with movement",
        duration: "60 min",
        level: "All Levels",
      },
      {
        name: "Yin Yoga",
        description: "Deep, passive stretches held for 3-5 minutes to release tension",
        duration: "75 min",
        level: "All Levels",
      },
      {
        name: "Guided Meditation",
        description: "Mindfulness meditation techniques to reduce stress and anxiety",
        duration: "30 min",
        level: "Beginner Friendly",
      },
      {
        name: "Breath Work",
        description: "Pranayama techniques to regulate nervous system and energy",
        duration: "45 min",
        level: "All Levels",
      },
      {
        name: "Restorative Yoga",
        description: "Gentle, supported poses for deep relaxation and recovery",
        duration: "60 min",
        level: "All Levels",
      },
    ],
    equipment: [
      "Manduka Pro Yoga Mats",
      "Yoga Blocks (cork and foam)",
      "Straps and Resistance Bands",
      "Bolsters and Blankets",
      "Meditation Cushions (zafu and zabuton)",
      "Eye pillows and aromatherapy supplies",
    ],
    coaches: ["Vincent "],
    testimonial: {
      name: "SOPHIA K.",
      quote: "Vincent 's classes changed my life. I came for flexibility and left with peace of mind. The zen zone is my sanctuary after stressful days.",
      role: "Yoga Member, 1 year",
    },
  },
  {
    id: "sweat",
    label: "SWEAT",
    sub: "Burn Zone",
    color: C.orange,
    bg: "radial-gradient(135deg at 60% 40%,rgba(255,140,66,.13) 0%,transparent 60%)",
    bgImage: "/media/vibe-sweat.webp",
    hero: {
      title: "SWEAT ZONE",
      subtitle: "High-Intensity Training",
      description: "Push your cardiovascular limits in our high-energy HIIT zone. Concept2 rowers, Assault bikes, and battle ropes create the ultimate metabolic conditioning environment.",
    },
    about: "Designed for high-intensity interval training and metabolic conditioning, the sweat zone is where you push past your limits. With top-tier cardio equipment and circuit-style setups, this space is built for maximum calorie burn and cardiovascular adaptation.",
    features: [
      {
        name: "Concept2 Rowers",
        description: "8 Model D rowers with PM5 monitors for precise tracking",
      },
      {
        name: "Assault AirBikes",
        description: "Full-body cardio machines for brutal interval training",
      },
      {
        name: "SkiErg Machines",
        description: "Upper body cardio emphasizing pull and core strength",
      },
      {
        name: "Battle Ropes",
        description: "Heavy ropes for explosive power and conditioning",
      },
      {
        name: "Plyo Equipment",
        description: "Boxes, hurdles, and agility ladders for explosive training",
      },
    ],
    classes: [
      {
        name: "HIIT Blast",
        description: "30 seconds work, 30 seconds rest circuits for maximum calorie burn",
        duration: "45 min",
        level: "Intermediate to Advanced",
      },
      {
        name: "Bootcamp",
        description: "Military-style circuits combining cardio and strength",
        duration: "60 min",
        level: "All Levels",
      },
      {
        name: "Cardio Conditioning",
        description: "Rowing, biking, and ski erg intervals to build engine",
        duration: "45 min",
        level: "Intermediate",
      },
      {
        name: "Tabata Training",
        description: "20 seconds max effort, 10 seconds rest intervals",
        duration: "30 min",
        level: "Advanced",
      },
      {
        name: "Metcon Madness",
        description: "Metabolic conditioning circuits that test your limits",
        duration: "45 min",
        level: "Advanced",
      },
    ],
    equipment: [
      "Concept2 Model D Rowers (8 units)",
      "Assault AirBike Elite (6 units)",
      "Ski Erg PM5 (4 units)",
      "Battle Ropes (50ft and 40ft)",
      "Plyo Boxes (20\", 24\", 30\")",
      "TRX Suspension Trainers",
      "Kettlebells (8kg - 32kg)",
      "Medicine Balls and Slam Balls",
    ],
    coaches: ["linet", "Daniel"],
    testimonial: {
      name: "MICHAEL T.",
      quote: "Sarah's HIIT classes are absolutely brutal in the best way. I've lost 15kg and my cardio has never been better. The sweat zone lives up to its name.",
      role: "HIIT Member, 7 months",
    },
  },
  {
    id: "recovery",
    label: "RECOVERY",
    sub: "Restore",
    color: C.ice,
    bg: "radial-gradient(135deg at 50% 80%,rgba(126,207,227,.12) 0%,transparent 60%)",
    bgImage: "/media/vibe-recovery.webp",
    hero: {
      title: "RECOVERY ZONE",
      subtitle: "Optimize Your Restoration",
      description: "State-of-the-art recovery suite featuring cold plunge, infrared sauna, compression therapy, and professional recovery tools. Train hard, recover harder.",
    },
    about: "Recovery is where gains are made. Our recovery zone features cutting-edge modalities to reduce soreness, speed healing, and optimize adaptation between training sessions. From cold plunge therapy to infrared sauna, we provide the tools elite athletes use to stay healthy and performing at their peak.",
    features: [
      {
        name: "Cold Plunge Pool",
        description: "Morozko Forge cold plunge maintained at 4°C for recovery and adaptation",
      },
      {
        name: "Infrared Sauna",
        description: "Clearlight infrared sauna for detoxification and relaxation",
      },
      {
        name: "Compression Therapy",
        description: "NormaTec compression boots for circulation and recovery",
      },
      {
        name: "Percussion Therapy",
        description: "Theragun PRO stations for self-myofascial release",
      },
      {
        name: "Foam Rolling Area",
        description: "Dedicated space with foam rollers, lacrosse balls, and mobility tools",
      },
    ],
    classes: [
      {
        name: "Mobility & Flexibility",
        description: "Improve range of motion and movement quality",
        duration: "45 min",
        level: "All Levels",
      },
      {
        name: "Recovery Yoga",
        description: "Gentle yoga focused on releasing tension and restoring",
        duration: "60 min",
        level: "All Levels",
      },
      {
        name: "Stretch & Release",
        description: "Partner-assisted stretching and myofascial release techniques",
        duration: "45 min",
        level: "All Levels",
      },
      {
        name: "Guided Foam Rolling",
        description: "Learn proper self-massage techniques for recovery",
        duration: "30 min",
        level: "Beginner Friendly",
      },
    ],
    equipment: [
      "Morozko Forge Cold Plunge (Ice Bath)",
      "Clearlight Infrared Sauna (4-person)",
      "NormaTec Compression Boots",
      "Theragun PRO (4 units available)",
      "Hyperice Hypervolt",
      "Foam Rollers (various densities)",
      "Lacrosse Balls and Massage Tools",
      "Stretching Straps and Bands",
    ],
    coaches: ["Hamisi", "Vincent "],
    testimonial: {
      name: "RACHEL W.",
      quote: "The recovery zone is a game-changer. The cold plunge after leg day speeds up my recovery so much. Hamisi's mobility classes keep me training pain-free.",
      role: "Recovery Member, 5 months",
    },
  },
];