import propertyModel from "../models/property.model.js";
import { uploadFile } from "../services/imagekit.js";
import { ImageKit } from "@imagekit/nodejs/client.js";

export const createProperty = async (req, res) => {
    try {
        const {
            title,
            description,
            category,
            area,
            address,
            city,
            state,
            price,
            bedrooms,
            bathrooms,
            amenities,
        } = req.body;

        if (!req.files || req.files.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Please upload at least one property image."
            });
        }

        const imageUrls = [];

        for (const file of req.files) {

            const imageUrl = await uploadFile(
                file.buffer,
                `${Date.now()}-${file.originalname}`,
                "properties"
            );

            imageUrls.push(imageUrl);
        }

        const property = await propertyModel.create({
            createdBy: req.user._id,
            title,
            description,
            category,
            area,
            address,
            city,
            state,
            price,
            bedrooms,
            bathrooms,
            amenities:
                typeof amenities === "string"
                    ? amenities.split(",").map(item => item.trim())
                    : amenities,

            propertyImages: imageUrls,
            approvalStatus: "Pending",
            status: "Available"
        });

        return res.status(201).json({
            success: true,
            message: "Property submitted successfully. Waiting for admin approval.",
            property
        });

    } catch (err) {

        console.log(err);

        return res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

export const getAllProperties = async (req, res) => {

    try {

        const properties = await propertyModel
            .find({
                approvalStatus: "Approved",
                status: "Available"
            })
            .populate("createdBy", "fullname");

        return res.status(200).json({
            success: true,
            properties
        });

    } catch (err) {

        return res.status(500).json({
            success: false,
            message: err.message
        });
    }

};

export const getPropertyById = async (req, res) => {

    try {

        const property = await propertyModel
            .findById(req.params.id)
            .populate("createdBy", "fullname contact");

        if (!property) {

            return res.status(404).json({
                success: false,
                message: "Property not found."
            });
        }

        return res.status(200).json({
            success: true,
            property
        });

    } catch (err) {

        return res.status(500).json({
            success: false,
            message: err.message
        });
    }

};

export const getMyProperties = async (req, res) => {

    try {

        const properties = await propertyModel.find({
            createdBy: req.user._id
        });

        return res.status(200).json({
            success: true,
            properties
        });

    } catch (err) {

        return res.status(500).json({
            success: false,
            message: err.message
        });
    }

};

export const updateProperty = async (req, res) => {

    try {

        const property = await propertyModel.findById(req.params.id);

        if (!property) {

            return res.status(404).json({
                success: false,
                message: "Property not found."
            });
        }

        if (property.createdBy.toString() !== req.user._id.toString()) {

            return res.status(403).json({
                success: false,
                message: "Unauthorized."
            });
        }

        Object.assign(property, req.body);

        property.approvalStatus = "Pending";

        await property.save();

        return res.status(200).json({
            success: true,
            message: "Property updated successfully and sent for re-approval.",
            property
        });

    } catch (err) {

        return res.status(500).json({
            success: false,
            message: err.message
        });
    }

};

export const deleteProperty = async (req, res) => {

    try {

        const property = await propertyModel.findById(req.params.id);

        if (!property) {

            return res.status(404).json({
                success: false,
                message: "Property not found."
            });
        }

        if (property.createdBy.toString() !== req.user._id.toString()) {

            return res.status(403).json({
                success: false,
                message: "Unauthorized."
            });
        }

        await property.deleteOne();

        return res.status(200).json({
            success: true,
            message: "Property deleted successfully."
        });

    } catch (err) {

        return res.status(500).json({
            success: false,
            message: err.message
        });
    }

};