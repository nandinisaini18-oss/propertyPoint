import { create } from "zustand";
// import { dummyProperties } from "../../property/data/dummyProperties";
import { pendingProperties as mockPending, recentInquiries as mockInquiries } from "../data/dummyData";

// Normalize dummy properties for admin (add seller info, approvalStatus, dates)
const defaultSellers = [
  { name: "Aman Gupta", email: "aman.gupta@360views.in", phone: "+91 98765 43210" },
  { name: "Riya Sharma", email: "riya.sharma@360views.in", phone: "+91 94250 87321" },
  { name: "Rahul Verma", email: "rahul.verma@360views.in", phone: "+91 88776 55443" },
  { name: "Priya Jain", email: "priya.jain@360views.in", phone: "+91 90011 22334" },
  { name: "Suresh Patel", email: "suresh.patel@360views.in", phone: "+91 99887 76655" }
];

const getNormalizedProperties = () => {
  return dummyProperties.map((p, index) => {
    const seller = defaultSellers[index % defaultSellers.length];
    // Set first 3 properties as "Sold" to have pre-populated sold stats
    const status = index < 3 ? "Sold" : (p.status || "For Sale");
    return {
      _id: String(p.id),
      title: p.title,
      price: p.price,
      priceValue: p.priceValue || 5000000,
      category: p.category || "Apartment",
      city: p.city || "Bhopal",
      area: p.area || 1200,
      bedrooms: p.bedrooms || 3,
      bathrooms: p.bathrooms || 2,
      status: status, // "For Sale" or "Sold"
      approvalStatus: "approved",
      image: p.image || "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&q=75",
      date: p.dateAdded || "2026-07-01",
      seller: seller.name,
      sellerEmail: seller.email,
      sellerPhone: seller.phone,
      images: [
        p.image || "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&q=75",
        "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400&q=75",
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400&q=75"
      ],
      amenities: p.amenities || ["Parking", "Power Backup"]
    };
  });
};

const getNormalizedPending = () => {
  return mockPending.map((p, index) => {
    const seller = defaultSellers[(index + 2) % defaultSellers.length];
    return {
      ...p,
      seller: p.seller || seller.name,
      sellerEmail: p.sellerEmail || seller.email,
      sellerPhone: p.sellerPhone || seller.phone,
      category: p.category || (index % 2 === 0 ? "Villa" : "Apartment"),
      city: p.city || "Indore",
      state: p.state || "Madhya Pradesh",
      price: p.price || "₹85 L",
      priceValue: p.priceValue || 8500000,
      area: p.area || 1500,
      bedrooms: p.bedrooms || 3,
      bathrooms: p.bathrooms || 2,
      approvalStatus: "pending",
      date: p.date || "2026-07-10",
      images: [
        p.image || "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=400&q=75",
        "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&q=75",
        "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&q=75"
      ],
      amenities: ["Parking", "Lift", "Security", "WiFi", "Balcony"]
    };
  });
};

const getNormalizedInquiries = () => {
  const messages = [
    "Hello, I am interested in this property and would like to arrange a viewing this weekend.",
    "Can you please share more details regarding the possession date and loan options?",
    "Is the price negotiable? I would like to schedule a call with the seller.",
    "Interested in booking. Please contact me at the earliest.",
    "Could you send some high-resolution photos and the floor plan of the property?"
  ];
  return mockInquiries.map((inq, index) => {
    return {
      _id: inq._id,
      buyer: inq.buyer,
      buyerEmail: `${inq.buyer.toLowerCase().replace(/\s+/g, ".")}@example.com`,
      buyerPhone: `+91 91234 ${50000 + index * 123}`,
      property: inq.property,
      seller: inq.seller,
      status: inq.status || "pending", // "pending", "contacted", "closed"
      date: inq.date || "2026-07-11",
      message: messages[index % messages.length]
    };
  });
};

// Calculate stats dynamically
const calculateStats = (allProps, pendingProps, inqs) => {
  return {
    totalProperties: allProps.length + pendingProps.length,
    pendingApproval: pendingProps.length,
    soldProperties: allProps.filter((p) => p.status === "Sold").length,
    totalInquiries: inqs.length
  };
};

// LocalStorage helpers
const loadKey = (key, fallback) => {
  try {
    const val = localStorage.getItem(key);
    return val ? JSON.parse(val) : fallback;
  } catch (e) {
    return fallback;
  }
};

const saveKey = (key, val) => {
  try {
    localStorage.setItem(key, JSON.stringify(val));
  } catch (e) {}
};

// Initialize default state
const initialAllProperties = loadKey("360views_all_properties", null) || getNormalizedProperties();
const initialPendingProperties = loadKey("360views_pending_properties", null) || getNormalizedPending();
const initialInquiries = loadKey("360views_inquiries", null) || getNormalizedInquiries();

saveKey("360views_all_properties", initialAllProperties);
saveKey("360views_pending_properties", initialPendingProperties);
saveKey("360views_inquiries", initialInquiries);

const useAdminStore = create((set) => ({
  allProperties: initialAllProperties,
  pendingProperties: initialPendingProperties,
  inquiries: initialInquiries,
  selectedInquiry: null,
  dashboardStats: calculateStats(initialAllProperties, initialPendingProperties, initialInquiries),

  // Actions
  setAllProperties: (properties) => set((state) => {
    saveKey("360views_all_properties", properties);
    return {
      allProperties: properties,
      dashboardStats: calculateStats(properties, state.pendingProperties, state.inquiries)
    };
  }),

  setPendingProperties: (properties) => set((state) => {
    saveKey("360views_pending_properties", properties);
    return {
      pendingProperties: properties,
      dashboardStats: calculateStats(state.allProperties, properties, state.inquiries)
    };
  }),

  setInquiries: (inquiries) => set((state) => {
    saveKey("360views_inquiries", inquiries);
    return {
      inquiries: inquiries,
      dashboardStats: calculateStats(state.allProperties, state.pendingProperties, inquiries)
    };
  }),

  setSelectedInquiry: (selectedInquiry) => set({ selectedInquiry }),

  // Custom mutations that work on state locally
  approveProperty: (id) => set((state) => {
    const propToApprove = state.pendingProperties.find((p) => p._id === id);
    if (!propToApprove) return {};
    
    const updatedPending = state.pendingProperties.filter((p) => p._id !== id);
    const updatedApproved = [
      {
        ...propToApprove,
        approvalStatus: "approved",
        status: "For Sale"
      },
      ...state.allProperties
    ];

    saveKey("360views_pending_properties", updatedPending);
    saveKey("360views_all_properties", updatedApproved);

    return {
      pendingProperties: updatedPending,
      allProperties: updatedApproved,
      dashboardStats: calculateStats(updatedApproved, updatedPending, state.inquiries)
    };
  }),

  rejectProperty: (id) => set((state) => {
    const updatedPending = state.pendingProperties.filter((p) => p._id !== id);
    saveKey("360views_pending_properties", updatedPending);
    return {
      pendingProperties: updatedPending,
      dashboardStats: calculateStats(state.allProperties, updatedPending, state.inquiries)
    };
  }),

  markPropertyAsSold: (id) => set((state) => {
    const updatedAll = state.allProperties.map((p) => 
      p._id === id ? { ...p, status: "Sold" } : p
    );
    saveKey("360views_all_properties", updatedAll);
    return {
      allProperties: updatedAll,
      dashboardStats: calculateStats(updatedAll, state.pendingProperties, state.inquiries)
    };
  }),

  deleteProperty: (id) => set((state) => {
    const updatedAll = state.allProperties.filter((p) => p._id !== id);
    const updatedPending = state.pendingProperties.filter((p) => p._id !== id);
    
    saveKey("360views_all_properties", updatedAll);
    saveKey("360views_pending_properties", updatedPending);

    return {
      allProperties: updatedAll,
      pendingProperties: updatedPending,
      dashboardStats: calculateStats(updatedAll, updatedPending, state.inquiries)
    };
  }),

  updateInquiryStatus: (id, status) => set((state) => {
    const updatedInquiries = state.inquiries.map((inq) => 
      inq._id === id ? { ...inq, status: status } : inq
    );
    saveKey("360views_inquiries", updatedInquiries);
    return {
      inquiries: updatedInquiries,
      dashboardStats: calculateStats(state.allProperties, state.pendingProperties, updatedInquiries)
    };
  })
}));

export default useAdminStore;