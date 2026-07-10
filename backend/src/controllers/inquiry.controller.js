import inquiryModel from "../models/inquiry.model.js";
import propertyModel from "../models/property.model.js";

export const createInquiry = async (req, res) => {
    try {

        const { propertyId, message } = req.body;

        const property = await propertyModel.findById(propertyId);

        if (!property) {
            return res.status(404).json({
                success: false,
                message: "Property not found"
            });
        }

        const inquiry = await inquiryModel.create({
            buyer: req.user._id,
            property: propertyId,
            seller: property.createdBy,
            message
        });

        res.status(201).json({
            success: true,
            message: "Inquiry sent successfully",
            inquiry
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};


export const getMyInquiries = async (req, res) => {

    try {

        const inquiries = await inquiryModel
            .find({ buyer: req.user._id })
            .populate("property");

        res.status(200).json({
            success: true,
            inquiries
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};


export const deleteInquiry = async (req, res) => {

    try {

        const inquiry = await inquiryModel.findById(req.params.id);

        if (!inquiry) {
            return res.status(404).json({
                success: false,
                message: "Inquiry not found"
            });
        }

        if (inquiry.buyer.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                success: false,
                message: "Unauthorized"
            });
        }

        await inquiry.deleteOne();

        res.status(200).json({
            success: true,
            message: "Inquiry deleted successfully"
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};