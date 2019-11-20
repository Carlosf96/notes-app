'use strict';
module.exports = (sequelize, DataTypes) => {
  const Note = sequelize.define('Note', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.STRING
    },
    title: DataTypes.STRING,
    body: DataTypes.STRING,
    createdAt: {
      allowNull: true,
      type: DataTypes.DATE,
      defaultValue: sequelize.NOW
    },
    updatedAt: {
      allowNull: true,
      type: DataTypes.DATE,
      defaultValue: sequelize.NOW
    }
  }, {});
  Note.associate = function(models) {
    // associations can be defined here
  };
  return Note;
};