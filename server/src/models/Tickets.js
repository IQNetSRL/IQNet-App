const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Ticket = sequelize.define(
    "Tickets",
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      username: {
        type: DataTypes.TEXT,
        allowNull: false,
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
      client: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      responsable: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      text: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      comment: {
        type: DataTypes.UUID,
        allowNull: true,
      },
    },
    { timestamps: true }
  );

  Ticket.hasMany(sequelize.models.Comments, { as: "comments" });

  return Ticket;
};
