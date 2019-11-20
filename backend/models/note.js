'use strict';
module.exports = (sequelize, DataTypes) => {
  const Note = sequelize.define('Note', {
    title: DataTypes.STRING,
    body: DataTypes.STRING,
  }, {});
  Note.associate = function(models) {
    // associations can be defined here
  };
  return Note;
};