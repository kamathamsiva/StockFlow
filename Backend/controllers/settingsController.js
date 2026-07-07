import { Organization } from "../models/index.js";

export const getSettings = async (req, res) => {
  try {
    const organization = await Organization.findByPk(
      req.user.organizationId
    );

    return res.status(200).json({
      organization,
    });
  } catch (error) {
    console.error("Get settings error:", error);

    return res.status(500).json({
      message: "Failed to fetch settings",
    });
  }
};

export const updateSettings = async (req, res) => {
  try {
    const { name, defaultLowStockThreshold } = req.body;

    const organization = await Organization.findByPk(
      req.user.organizationId
    );

    if (!organization) {
      return res.status(404).json({
        message: "Organization not found",
      });
    }

    await organization.update({
      name: name ?? organization.name,
      defaultLowStockThreshold:
        defaultLowStockThreshold ??
        organization.defaultLowStockThreshold,
    });

    return res.status(200).json({
      message: "Settings updated successfully",
      organization,
    });
  } catch (error) {
    console.error("Update settings error:", error);

    return res.status(500).json({
      message: "Failed to update settings",
    });
  }
};