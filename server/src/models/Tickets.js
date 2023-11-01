const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Tickets",
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      AccountId: {
        type: DataTypes.UUID,
        allowNull: false,
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