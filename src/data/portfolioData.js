import React from 'react';

export const personalInfo = {
  name: "Devavrat Verma",
  role: "Versatile Software Engineer — Full Stack (MERN) & AI/ML",
  description: "Software Engineer with expertise in building scalable full-stack (MERN) apps, Android apps with Jetpack Compose, and AI/ML prototypes. Strong background in competitive programming: LeetCode Knight (2030+), active on Codeforces, CodeChef, and GeeksforGeeks. Passionate about pushing boundaries with technology.",
  email: "devavratverma30@gmail.com",
  github: "https://github.com/Dev-Leet",
  linkedin: "https://www.linkedin.com/in/devavrat-verma/",
  resume: "/Resume-Devavrat-Verma.docx", // Assuming we move it to public folder
  image: "/assets/Dev_Ver_Org.jpg", // From public/assets
  video: "/assets/self-introduction.mp4",
  videoPoster: "/assets/video-poster.png"
};

export const aboutMe = {
  title: "About Me",
  description: "Full-stack and Android engineer with hands-on experience building scalable services, AI-powered features, and sleek mobile apps. Experienced in MERN, Kotlin, Jetpack Compose, and machine learning with Python. Adept at leading projects and collaborating in teams."
};

export const projects = [
  {
    title: "CalNote — AI Powered Scheduler",
    date: "June 2026 – July 2026",
    tech: "MERN, TypeScript, Gemini API, Google Calendar API",
    description: "Architected a context-aware AI scheduling engine using the Gemini API, enabling the system to dynamically route user tasks around live competitive programming contests. Implemented the Strategy Design Pattern in a Node.js/Express backend to seamlessly toggle between multiple LLM providers. Engineered automated background scrapers via node-cron to aggregate external contest data, paired with bidirectional Google Calendar synchronization and a responsive React/Zustand frontend.",
    link: "https://github.com/Dev-Leet/CalNote"
  },
  {
    title: "Online Judge Project",
    date: "June 2025 – August 2025",
    tech: "MERN, AI APIs, Docker, AWS",
    description: "Built and deployed a full-stack online coding judge with AI-powered feedback, multi-language execution, Docker sandboxing, and Node.js/Express APIs. Deployed on AWS.",
    link: "https://github.com/Dev-Leet/OJ"
  },
  {
    title: "PocketPages — Notes App",
    date: "May 2025 – June 2025",
    tech: "Kotlin, Jetpack Compose",
    description: "Offline-first note-taking app with authentication, MVVM, and polished UI. Won 2nd place in AndroidXplore Hackathon.",
    link: "https://github.com/Dev-Leet/PocketPages"
  },
  {
    title: "Screen Dimmer Desktop App",
    date: "March 2025 – April 2025",
    tech: "C#, .NET",
    description: "Utility to reduce screen brightness below system defaults using C# Windows Forms overlay technique. Improved accessibility and usability.",
    link: "https://github.com/Dev-Leet/Screen_Dimmer"
  },
  {
    title: "Document Analysis using LLMs",
    date: "Feb 2025 – Mar 2025",
    tech: "Python, Hugging Face",
    description: "Summarization + Q&A pipeline using transformers and NLTK preprocessing. Built as a team prototype.",
    link: "https://github.com/Dev-Leet/Document-Analysis-using-LLMs-Python-"
  },
  {
    title: "House Price Prediction Model",
    date: "Oct 2024 – Dec 2024",
    tech: "Python, Scikit-learn",
    description: "Regression model with feature engineering, predicting house prices with ~80% accuracy.",
    link: "https://github.com/Dev-Leet/House-Price-Predication-Model-Python-"
  }
];

export const experience = [
  {
    title: "Virtual Research Intern — IIT Ropar",
    date: "Dec 2025 – Jan 2026",
    bullets: [
      "Worked on research-oriented technical assignments in a structured Full-time Virtual internship program.",
      "Applied system design and analytical problem-solving principles in MERN Stack.",
      "Collaborated remotely while following professional engineering practices."
    ]
  },
  {
    title: "Android App Development Intern — Imarticus Learning",
    date: "May 2025 – June 2025",
    bullets: [
      "Developed and maintained Android apps using Kotlin and Jetpack Compose.",
      "Applied MVVM architecture for scalable app design.",
      "Collaborated via Git, code reviews, and agile workflows."
    ]
  }
];

export const education = [
  {
    institution: "VIT Bhopal",
    degree: "B.Tech CSE",
    date: "Sep 2023 – Present",
    score: "CGPA: 8.36"
  },
  {
    institution: "The Aryan International School",
    degree: "High School",
    date: "Completed June 2022",
    score: "12th: 77.60% | 10th: 86.67%"
  }
];

export const skills = [
  "JavaScript", "TypeScript", "React.js", "Node.js", "Express.js", 
  "MongoDB", "SQL", "Kotlin", "Jetpack Compose", "Python", 
  "Machine Learning", "C", "C++", "Docker", "AWS", "Git", "CI/CD"
];

export const competitiveProgramming = [
  { platform: "LeetCode", link: "https://leetcode.com/u/Devavrat_Verma_7/", color: "orange" },
  { platform: "Codeforces", link: "https://codeforces.com/profile/Devavrat_Verma", color: "blue" },
  { platform: "CodeChef", link: "https://www.codechef.com/users/devavrat_verma", color: "purple" },
  { platform: "GeeksforGeeks", link: "https://www.geeksforgeeks.org/user/devavrat23mdg0/", color: "green" }
];
