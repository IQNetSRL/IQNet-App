const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "TicketHistory",
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      AreaId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      CategoryId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      StatusId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      PriorityId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      responsable: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      client: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      text: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    { timestamps: true }
  );
};