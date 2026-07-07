import { User, Organization } from "../models/index.js";

export const getProfile = async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        id: req.user.userId,
        organizationId: req.user.organizationId,
      },
      attributes: ["id", "email", "organizationId"],
      include: [
        {
          model: Organization,
          attributes: ["name"],
        },
      ],
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    return res.status(200).json({
      user: {
        id: user.id,
        email: user.email,
        organizationId: user.organizationId,
        organizationName: user.Organization.name,
      },
    });
  } catch (error) {
    console.error("Get profile error:", error);

    return res.status(500).json({
      message: "Failed to load profile",
    });
  }
};