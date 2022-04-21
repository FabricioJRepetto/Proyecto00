const { DataTypes } = require("sequelize");

module.exports = sequelize => {
  sequelize.define(
    "temperament",
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
      },
      temperament: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      freezeTableName: true,
      timestamps: false,
    }
  );
};
