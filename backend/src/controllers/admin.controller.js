import propertyModel from "../models/property.model.js";
import inquiryModel from "../models/inquiry.model.js";

export const getPendingProperties = async (req, res) => {
    try {

        const properties = await propertyModel
            .find({
                approvalStatus: "Pending"
            })
            .populate("createdBy", "fullname email contact");

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

export const approveProperty = async (req, res) => {
    try {

        const property = await propertyModel.findById(req.params.id);

        if (!property) {
            return res.status(404).json({
                success: false,
                message: "Property not found."
            });
        }

        property.approvalStatus = "Approved";

        await property.save();

        return res.status(200).json({
            success: true,
            message: "Property approved successfully.",
            property
        });

    } catch (err) {

        return res.status(500).json({
            success: false,
            message: err.message
        });

    }
};

export const rejectProperty = async (req, res) => {
    try {

        const property = await propertyModel.findById(req.params.id);

        if (!property) {
            return res.status(404).json({
                success: false,
                message: "Property not found."
            });
        }

        property.approvalStatus = "Rejected";

        await property.save();

        return res.status(200).json({
            success: true,
            message: "Property rejected successfully.",
            property
        });

    } catch (err) {

        return res.status(500).json({
            success: false,
            message: err.message
        });

    }
};

export const getAllPropertiesForAdmin = async (req, res) => {
    try {

        const properties = await propertyModel
            .find()
            .populate("createdBy", "fullname email contact");

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

export const markPropertyAsSold = async (req, res) => {
    try {

        const property = await propertyModel.findById(req.params.id);

        if (!property) {
            return res.status(404).json({
                success: false,
                message: "Property not found."
            });
        }

        property.status = "Sold";

        await property.save();

        return res.status(200).json({
            success: true,
            message: "Property marked as sold.",
            property
        });

    } catch (err) {

        return res.status(500).json({
            success: false,
            message: err.message
        });

    }
};

export const getAllInquiries = async (req, res) => {
    try {

        const inquiries = await inquiryModel
            .find()
            .populate("buyer", "fullname email contact")
            .populate("seller", "fullname email contact")
            .populate("property", "title price city state");

        return res.status(200).json({
            success: true,
            inquiries
        });

    } catch (err) {

        return res.status(500).json({
            success: false,
            message: err.message
        });

    }
};

export const getInquiryById = async (req, res) => {
    try {

        const inquiry = await inquiryModel
            .findById(req.params.id)
            .populate("buyer", "fullname email contact")
            .populate("seller", "fullname email contact")
            .populate("property");

        if (!inquiry) {
            return res.status(404).json({
                success: false,
                message: "Inquiry not found."
            });
        }

        return res.status(200).json({
            success: true,
            inquiry
        });

    } catch (err) {

        return res.status(500).json({
            success: false,
            message: err.message
        });

    }
};

export const updateInquiryStatus = async (req, res) => {
    try {

        const { status } = req.body;

        if (!["Pending", "Contacted", "Closed"].includes(status)) {
            return res.status(400).json({
                success: false,
                message: "Invalid status."
            });
        }

        const inquiry = await inquiryModel.findById(req.params.id);

        if (!inquiry) {
            return res.status(404).json({
                success: false,
                message: "Inquiry not found."
            });
        }

        inquiry.status = status;

        await inquiry.save();

        return res.status(200).json({
            success: true,
            message: "Inquiry status updated successfully.",
            inquiry
        });

    } catch (err) {

        return res.status(500).json({
            success: false,
            message: err.message
        });

    }
};

export const dashboardStats = async (req, res) => {
    try {

        const totalProperties = await propertyModel.countDocuments();

        const pendingProperties = await propertyModel.countDocuments({
            approvalStatus: "Pending"
        });

        const approvedProperties = await propertyModel.countDocuments({
            approvalStatus: "Approved"
        });

        const rejectedProperties = await propertyModel.countDocuments({
            approvalStatus: "Rejected"
        });

        const soldProperties = await propertyModel.countDocuments({
            status: "Sold"
        });

        const totalInquiries = await inquiryModel.countDocuments();

        const pendingInquiries = await inquiryModel.countDocuments({
            status: "Pending"
        });

        return res.status(200).json({
            success: true,
            stats: {
                totalProperties,
                pendingProperties,
                approvedProperties,
                rejectedProperties,
                soldProperties,
                totalInquiries,
                pendingInquiries
            }
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
                message: "Property not found",
            });
        }

        await property.deleteOne();

        return res.status(200).json({
            success: true,
            message: "Property deleted successfully",
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};