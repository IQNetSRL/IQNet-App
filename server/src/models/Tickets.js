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
      responsable: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      coordinates: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      text: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    { timestamps: true }
  );
  
  Ticket.hasMany(sequelize.models.TicketHistories, { as: "history" });
  Ticket.hasMany(sequelize.models.Comments, { as: "comments" });
  Ticket.hasMany(sequelize.models.Customers, { as: "customers" });

  return Ticket;
};
