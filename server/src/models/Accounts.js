const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Accounts",
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      level: {
        type: DataTypes.ENUM(
          "admin",
          "support",
          "sales",
        ),
        allowNull: true,
      },
    },
    { timestamps: true }
  );
};
