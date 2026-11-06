// Dummy data - Video streaming dewasa (placeholder)
const VIDEOS = [
  {id:1,title:"Passionate Night Session",description:"Intense romantic encounter with beautiful lighting and chemistry.",category:"professional",duration:"24:15",views:"1.2M",rating:4.8,quality:"4K",thumbnail:"https://picsum.photos/seed/vid1/640/360",videoUrl:"",tags:["romantic","couple","intense"],uploadDate:"2026-10-15"},
  {id:2,title:"Amateur Homemade Fun",description:"Real couple sharing their private moments. Authentic chemistry.",category:"amateur",duration:"18:42",views:"890K",rating:4.6,quality:"1080p",thumbnail:"https://picsum.photos/seed/vid2/640/360",videoUrl:"",tags:["amateur","homemade","couple"],uploadDate:"2026-10-28"},
  {id:3,title:"Asian Beauty Solo",description:"Stunning Asian model in a sensual solo performance.",category:"asian",duration:"15:30",views:"2.1M",rating:4.9,quality:"4K",thumbnail:"https://picsum.photos/seed/vid3/640/360",videoUrl:"",tags:["asian","solo","sensual"],uploadDate:"2026-09-20"},
  {id:4,title:"Office After Hours",description:"Workplace fantasy fulfilled. Professional setting turns steamy.",category:"professional",duration:"32:10",views:"1.5M",rating:4.7,quality:"1080p",thumbnail:"https://picsum.photos/seed/vid4/640/360",videoUrl:"",tags:["office","roleplay","professional"],uploadDate:"2026-11-01"},
  {id:5,title:"Lesbian Softcore Romance",description:"Intimate and emotional connection between two women.",category:"lesbian",duration:"27:45",views:"980K",rating:4.8,quality:"4K",thumbnail:"https://picsum.photos/seed/vid5/640/360",videoUrl:"",tags:["lesbian","softcore","romantic"],uploadDate:"2026-10-05"},
  {id:6,title:"Outdoor Adventure",description:"Risky outdoor session in a secluded location.",category:"amateur",duration:"21:18",views:"1.8M",rating:4.5,quality:"1080p",thumbnail:"https://picsum.photos/seed/vid6/640/360",videoUrl:"",tags:["outdoor","amateur","public"],uploadDate:"2026-09-12"},
  {id:7,title:"Luxury Hotel Suite",description:"High-end production in a luxury suite. Elegant and cinematic.",category:"professional",duration:"35:00",views:"3.2M",rating:4.9,quality:"4K",thumbnail:"https://picsum.photos/seed/vid7/640/360",videoUrl:"",tags:["luxury","hotel","premium"],uploadDate:"2026-08-30"},
  {id:8,title:"First Time Together",description:"Nervous but excited first encounter. Sweet and genuine.",category:"amateur",duration:"16:55",views:"720K",rating:4.4,quality:"720p",thumbnail:"https://picsum.photos/seed/vid8/640/360",videoUrl:"",tags:["first-time","amateur","cute"],uploadDate:"2026-11-03"},
  {id:9,title:"Japanese Style Massage",description:"Traditional style sensual massage that turns intense.",category:"asian",duration:"29:20",views:"2.4M",rating:4.8,quality:"4K",thumbnail:"https://picsum.photos/seed/vid9/640/360",videoUrl:"",tags:["asian","massage","sensual"],uploadDate:"2026-10-18"},
  {id:10,title:"Threesome Fantasy",description:"Three people exploring boundaries. Energetic scene.",category:"professional",duration:"41:05",views:"4.1M",rating:4.7,quality:"4K",thumbnail:"https://picsum.photos/seed/vid10/640/360",videoUrl:"",tags:["threesome","group","fantasy"],uploadDate:"2026-09-05"},
  {id:11,title:"Shower Steamy Session",description:"Wet and steamy shower scene with great chemistry.",category:"amateur",duration:"14:30",views:"1.1M",rating:4.6,quality:"1080p",thumbnail:"https://picsum.photos/seed/vid11/640/360",videoUrl:"",tags:["shower","wet","amateur"],uploadDate:"2026-10-22"},
  {id:12,title:"Cosplay Night",description:"Popular characters come to life in adult cosplay.",category:"cosplay",duration:"26:40",views:"1.6M",rating:4.5,quality:"1080p",thumbnail:"https://picsum.photos/seed/vid12/640/360",videoUrl:"",tags:["cosplay","roleplay","costume"],uploadDate:"2026-11-02"},
  {id:13,title:"Morning After Glow",description:"Soft morning light, lazy intimacy. Slow and sensual.",category:"professional",duration:"19:15",views:"650K",rating:4.7,quality:"4K",thumbnail:"https://picsum.photos/seed/vid13/640/360",videoUrl:"",tags:["morning","soft","intimate"],uploadDate:"2026-10-10"},
  {id:14,title:"Gym After Workout",description:"Sweaty post-workout session in an empty gym.",category:"amateur",duration:"22:50",views:"1.3M",rating:4.6,quality:"1080p",thumbnail:"https://picsum.photos/seed/vid14/640/360",videoUrl:"",tags:["gym","fitness","athletic"],uploadDate:"2026-09-28"},
  {id:15,title:"Vintage Classic Style",description:"Retro aesthetic with modern production values.",category:"professional",duration:"33:25",views:"890K",rating:4.8,quality:"1080p",thumbnail:"https://picsum.photos/seed/vid15/640/360",videoUrl:"",tags:["vintage","classic","elegant"],uploadDate:"2026-08-15"},
  {id:16,title:"POV Intimate View",description:"First-person perspective that puts you in the moment.",category:"amateur",duration:"17:40",views:"2.7M",rating:4.5,quality:"1080p",thumbnail:"https://picsum.photos/seed/vid16/640/360",videoUrl:"",tags:["pov","immersive","intimate"],uploadDate:"2026-11-04"}
];

const CATEGORIES = [
  { id: "all", name: "Semua", icon: "fa-globe" },
  { id: "professional", name: "Professional", icon: "fa-star" },
  { id: "amateur", name: "Amateur", icon: "fa-home" },
  { id: "asian", name: "Asian", icon: "fa-heart" },
  { id: "lesbian", name: "Lesbian", icon: "fa-venus-double" },
  { id: "cosplay", name: "Cosplay", icon: "fa-mask" }
];

function getVideoById(id) { return VIDEOS.find(v => v.id === parseInt(id)); }
function getVideosByCategory(cat) { if (!cat || cat === "all") return VIDEOS; return VIDEOS.filter(v => v.category === cat); }
function getTrending() { return [...VIDEOS].sort((a, b) => { const aV = parseFloat(a.views) * (a.views.includes('M') ? 1e6 : 1e3); const bV = parseFloat(b.views) * (b.views.includes('M') ? 1e6 : 1e3); return bV - aV; }).slice(0, 8); }
function getNewest() { return [...VIDEOS].sort((a, b) => new Date(b.uploadDate) - new Date(a.uploadDate)).slice(0, 8); }
function getRecommended() { return [...VIDEOS].sort(() => Math.random() - 0.5).slice(0, 8); }
function searchVideos(query) { const q = query.toLowerCase().trim(); if (!q) return VIDEOS; return VIDEOS.filter(v => v.title.toLowerCase().includes(q) || v.description.toLowerCase().includes(q) || v.tags.some(t => t.includes(q)) || v.category.includes(q)); }
