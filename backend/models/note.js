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
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: new Date()
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: new Date()
    }
  }, {});
  Note.associate = function(models) {
    // associations can be defined here
  };
  return Note;
};