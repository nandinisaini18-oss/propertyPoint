// ─── Admin Dummy Data ──────────────────────────────────────────────────────────
// Realistic data matching the 360Views platform.
// Swap with useAdmin() hook API calls when backend is ready.

export const dashboardStats = {
  totalProperties: 248,
  pendingApproval: 17,
  soldProperties:  129,
  totalInquiries:  84,
};

export const pendingProperties = [
  {
    _id: "pp001",
    title: "Luxury Villa — MP Nagar",
    seller: "Aman Gupta",
    city: "Bhopal",
    price: "₹2.4 Cr",
    date: "11 Jul 2026",
    status: "pending",
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=80&q=75",
  },
  {
    _id: "pp002",
    title: "Lake View Apartment",
    seller: "Riya Sharma",
    city: "Indore",
    price: "₹85 L",
    date: "10 Jul 2026",
    status: "pending",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=80&q=75",
  },
  {
    _id: "pp003",
    title: "Commercial Office — Vijay Nagar",
    seller: "Rahul Verma",
    city: "Indore",
    price: "₹1.1 Cr",
    date: "10 Jul 2026",
    status: "pending",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=80&q=75",
  },
  {
    _id: "pp004",
    title: "Modern Duplex — Arera Colony",
    seller: "Priya Jain",
    city: "Bhopal",
    price: "₹68 L",
    date: "09 Jul 2026",
    status: "pending",
    image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=80&q=75",
  },
  {
    _id: "pp005",
    title: "3BHK Flat — Malviya Nagar",
    seller: "Suresh Patel",
    city: "Delhi",
    price: "₹1.8 Cr",
    date: "09 Jul 2026",
    status: "pending",
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=80&q=75",
  },
];

export const recentInquiries = [
  {
    _id: "inq001",
    buyer: "Vikram Singh",
    property: "Luxury Villa — MP Nagar",
    seller: "Aman Gupta",
    status: "pending",
    date: "11 Jul 2026",
  },
  {
    _id: "inq002",
    buyer: "Sneha Kapoor",
    property: "Lake View Apartment",
    seller: "Riya Sharma",
    status: "contacted",
    date: "10 Jul 2026",
  },
  {
    _id: "inq003",
    buyer: "Aditya Kumar",
    property: "Commercial Office — Vijay Nagar",
    seller: "Rahul Verma",
    status: "closed",
    date: "09 Jul 2026",
  },
  {
    _id: "inq004",
    buyer: "Meera Joshi",
    property: "Modern Duplex — Arera Colony",
    seller: "Priya Jain",
    status: "pending",
    date: "09 Jul 2026",
  },
  {
    _id: "inq005",
    buyer: "Rohit Tiwari",
    property: "3BHK Flat — Malviya Nagar",
    seller: "Suresh Patel",
    status: "contacted",
    date: "08 Jul 2026",
  },
];

export const activityLog = [
  {
    _id: "act001",
    type: "approved",
    text: "Property Sea View Studio approved",
    time: "2 min ago",
  },
  {
    _id: "act002",
    type: "rejected",
    text: "Property Old City Plot rejected",
    time: "18 min ago",
  },
  {
    _id: "act003",
    type: "inquiry",
    text: "Inquiry updated — status: Contacted",
    time: "1 hr ago",
  },
  {
    _id: "act004",
    type: "user",
    text: "New user registered — Pooja Malhotra",
    time: "3 hr ago",
  },
  {
    _id: "act005",
    type: "approved",
    text: "Property IT Park Office Suite approved",
    time: "5 hr ago",
  },
  {
    _id: "act006",
    type: "rejected",
    text: "Property Basement Flat rejected",
    time: "Yesterday",
  },
];
