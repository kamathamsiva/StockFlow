import { Product, Organization } from "../models/index.js";

export const getDashboard = async (req, res) => {
  try {
    const organization = await Organization.findByPk(
      req.user.organizationId
    );

    const products = await Product.findAll({
      where: {
        organizationId: req.user.organizationId,
      },
      order: [["quantity", "ASC"]],
    });

    const totalStock = products.reduce(
      (total, product) => total + Number(product.quantity),
      0
    );

    const lowStockProducts = products.filter((product) => {
      const threshold =
        product.lowStockThreshold ??
        organization.defaultLowStockThreshold;

      return product.quantity <= threshold;
    });

    return res.status(200).json({
      totalProducts: products.length,
      totalStock,
      lowStockCount: lowStockProducts.length,
      lowStockProducts,
    });
  } catch (error) {
    console.error("Dashboard error:", error);

    return res.status(500).json({
      message: "Failed to load dashboard",
    });
  }
};