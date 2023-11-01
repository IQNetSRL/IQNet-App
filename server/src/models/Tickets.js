const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Ticket",
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      informationId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      areaId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      categoryId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      statusId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      priorityId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
    },
    { timestamps: true }
  );
};