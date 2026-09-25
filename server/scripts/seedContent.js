/**
 * Populate the database with Prem's current portfolio content.
 *
 * Usage (from the server/ folder):
 *   node scripts/seedContent.js
 *
 * This REPLACES the intro/about/contact singletons and the full
 * experiences/projects collections with the content below. Safe to
 * re-run; edit the values here or later via the admin panel.
 */
require("dotenv").config();
const mongoose = require("mongoose");
const {
  Intro,
  About,
  Expreience,
  Project,
  Contact,
} = require("../models/portfolioModel");

const intro = {
  welcomeText: "Hi, I'm",
  firstName: "Prem",
  lastName: "Jadwani",
  caption: "Full-Stack & Backend Engineer",
  description:
    "I build production-grade software — from AI document pipelines to enterprise CRMs — end to end. Currently a Full-Stack Developer at Value AI Labs, where I architect scalable backend systems powered by LLMs and deployed on Azure. I care about code that ships, scales, and solves real problems.",
};

const about = {
  // Placeholder animation — swap for any Lottie URL via the admin panel.
  lottieURL:
    "https://lottie.host/fbdda05f-c1d4-4c2b-b16a-5e736671f839/pCpjnDaeTI.json",
  description1:
    "I'm a full-stack and backend engineer based in Bengaluru, India, with a B.E. in Computer Engineering from Thapar Institute of Engineering and Technology (CGPA: 8.20). My focus is building systems that handle real complexity — multi-stage AI pipelines, business rule engines, high-throughput APIs, and production databases designed from scratch. I don't just write features; I own entire systems.",
  description2:
    "At Value AI Labs, I lead backend development of an AI-powered mortgage document processing platform — 150–200 page PDFs, 66 document categories, async retry queues, and multi-client configuration, all deployed on Azure. Before that, I interned at Razorpay, cutting AuthZ API latency by 30% and reducing Enforcer CPU usage by ~40% on enterprise-scale infrastructure. What drives me is turning an ambiguous, hard problem into something clean, reliable, and maintainable.",
  skills: [
    "Golang", "TypeScript", "Python", "C++", "Node.js", "Express.js",
    "Next.js", "gRPC", "REST APIs", "PostgreSQL", "MongoDB", "MySQL",
    "Docker", "Kubernetes", "Azure", "Apache Airflow", "GPT-4 / Gemini",
    "Zod", "Jest", "Git",
  ],
};

const experiences = [
  {
    period: "Sep 2025 – Present",
    company: "Value AI Labs",
    title: "Full-Stack Developer",
    description:
      "Leading backend development of a production AI platform that processes 150–200 page mortgage PDF packages across 66 document categories. Designed async retry queues, schema versioning, and duplicate detection systems; deployed scalable services on Azure Container Apps with Blob Storage, Key Vault, and PostgreSQL. Primary backend engineer with 250+ commits shipped to production.",
  },
  {
    period: "Mar 2025 – Aug 2025",
    company: "Razorpay",
    title: "Software Developer Intern",
    description:
      "Built secure Edge Control tooling in Golang with gRPC, cutting manual policy update effort by 60%. Optimized AuthZ APIs with pagination and access-control improvements, reducing enterprise request latency by 30%; further reduced Enforcer CPU utilization by ~40% through unmarshalling and caching optimizations.",
  },
  {
    period: "Jan 2025 – Mar 2025",
    company: "STMicroelectronics Pvt. Ltd.",
    title: "Software Developer Intern",
    description:
      "Built ML-assisted log classification tooling to analyze 5000+ failure entries, reducing manual triage effort by 40%. Automated internal engineering workflows using Apache Airflow, improving pipeline reliability and reducing operational overhead.",
  },
];

const projects = [
  // Card 1
  {
    title: "PMJ Incentive CRM — Enterprise Incentive Management Platform",
    description:
      "Built a full production CRM from scratch for a 200+ location jewelry retail chain, replacing a manual monthly spreadsheet process. Designed 25 PostgreSQL tables (no ORM), a 7-type incentive slab calculation engine, a 6-level manager hierarchy with pool splits, and a dual-portal system (admin + employee) with 24 API routes. Solo end-to-end ownership.",
    technologies: ["TypeScript", "Next.js", "PostgreSQL", "SheetJS", "Docker", "Tailwind CSS"],
    image: "/projects/crm.svg",
    liveLink: "https://jellyfish-app-odugb.ondigitalocean.app/",
    githubLink: "",
    featured: true,
  },
  // Card 2
  {
    title: "Byomkesh — AI-Powered Business Verification & Risk Profiling",
    description:
      "Developed a dual-layer AI solution for enterprise merchant onboarding combining authenticity validation and risk profiling. Built the Enterprise Authenticity Validator to assess 100+ domains and SSL certificates for automated risk scoring, and integrated GPT-4 for fraud detection and fake review classification, improving detection accuracy by 25%.",
    technologies: ["Python", "Flask", "GPT-4", "PostgreSQL", "Docker"],
    image: "/projects/byomkesh.svg",
    liveLink: "",
    githubLink: "https://github.com/Prem15Razor/Byomkesh-Hack0n-",
    featured: true,
  },
  // Card 3
  {
    title: "Music Recommendation System",
    description:
      "An AI-based music recommendation engine that uses machine learning to analyze listening preferences and generate personalized playlist suggestions. Built in Python on a genre-labeled dataset with content-based similarity modeling.",
    technologies: ["Python", "Machine Learning", "Pandas", "scikit-learn"],
    image: "/projects/music.svg",
    liveLink: "",
    githubLink: "https://github.com/Prem790/Music-Recoomedation-Project-using-ML",
    featured: true,
  },
  // Card 4
  {
    title: "Coin-Vista — Real-Time Crypto Tracker",
    description:
      "A real-time cryptocurrency tracking and analysis web app. Pulls live prices, trends, and historical data from crypto APIs, visualizes them with Chart.js, and lets users sign in with Firebase Auth to build and monitor a personalized watchlist backed by Cloud Firestore.",
    technologies: ["React.js", "Chart.js", "Material-UI", "Firebase", "Firestore"],
    image: "/projects/coinvista.svg",
    liveLink: "https://coin-vista.netlify.app/",
    githubLink: "",
    featured: true,
  },
];

const contact = {
  name: "Prem Jadwani",
  email: "jadwaniprem12@gmail.com",
  mobile: "+91 9068876294",
  address: "",
  gender: "",
};

async function run() {
  if (!process.env.mongo_url) throw new Error("mongo_url is not set in .env");
  await mongoose.connect(process.env.mongo_url);

  await Intro.deleteMany({});
  await Intro.create(intro);

  await About.deleteMany({});
  await About.create(about);

  await Expreience.deleteMany({});
  await Expreience.insertMany(experiences);

  await Project.deleteMany({});
  await Project.insertMany(projects);

  await Contact.deleteMany({});
  await Contact.create(contact);

  console.log("✔ Portfolio content seeded successfully.");
  await mongoose.disconnect();
  process.exit(0);
}

run().catch((err) => {
  console.error("Content seed failed:", err.message);
  process.exit(1);
});
