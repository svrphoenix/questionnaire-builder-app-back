import { Model, DataTypes } from 'sequelize';
import db from '../lib/db.js';

class Question extends Model {}

const model = Question.init(
  {
    Id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    QuestionnaireId: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    QuestionText: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    QuestionType: {
      type: DataTypes.ENUM('text', 'single_choice', 'multiple_choices'),
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
