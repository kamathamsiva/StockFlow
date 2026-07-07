import sequelize from "../config/database.js";
import Organization from "./Organization.js";
import User from "./User.js";
import Product from "./Product.js";

Organization.hasMany(User, {
  foreignKey: "organizationId",
  onDelete: "CASCADE",
});

User.belongsTo(Organization, {
  foreignKey: "organizationId",
});

Organization.hasMany(Product, {
  foreignKey: "organizationId",
  onDelete: "CASCADE",
});

Product.belongsTo(Organization, {
  foreignKey: "organizationId",
});

export {
  sequelize,
  Organization,
  User,
  Product,
};