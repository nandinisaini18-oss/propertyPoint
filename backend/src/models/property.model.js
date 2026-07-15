import mongoose from "mongoose"

const propertySchema = new mongoose.Schema({
    title : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    category: {
        type: String,
        required: true,
        enum: [
            "Apartment",
            "Flat",
            "Independent House",
            "Villa",
            "Farmhouse",

            "Residential Plot",
            "Agricultural Land",
            "Commercial Plot",

            "Office",
            "Shop",
            "Commercial Building",
            "Warehouse"
        ]
    },
    area: {
        type: Number,
        required: true
    },

    areaUnit: {
        type: String,
        enum: ["sqft", "acre"],
        default: "sqft"
    },
    address: {
        type: String,
        required: true
    },
    price : {
        type : Number,
        required : true
    },
    city : {
        type : String,
        required : true
    },
    state : {
        type : String,
        required : true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    approvalStatus: {
        type: String,
        enum: ["Pending", "Approved", "Rejected"],
        default: "Pending"
    },

    bedrooms: {
        type: Number,
        required: true
    },

    bathrooms: {
        type: Number,
        required: true
    },
    propertyImages : [
        {
            type : String,
            required : true
        }
    ],
    amenities: [
        {
            type: String,
        },
    ],
    status: {
        type: String,
        enum: ["Available", "Sold"],
        default: "Available"
    }
},
  { timestamps: true }
)

const propertyModel = mongoose.model("Property" , propertySchema)

export default propertyModel