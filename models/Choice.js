import { Model, DataTypes } from 'sequelize';
import db from '../lib/db.js';

class Choice extends Model {}

const model = Choice.init(
  {
    Id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    QuestionId: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    ChoiceText: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    CreatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false,
    },
    UpdatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false,
    },
  },
  {
    sequelize: db,
  }
);

export default model;
