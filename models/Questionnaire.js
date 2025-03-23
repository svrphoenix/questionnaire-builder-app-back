import { Model, DataTypes, literal } from 'sequelize';
import db from '../lib/db.js';

class Questionnaire extends Model {}

const model = Questionnaire.init(
  {
    Id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    Name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    Description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    QuestionCount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    CompletionCount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    CreatedAt: {
      type: DataTypes.DATE,
      defaultValue: literal('CURRENT_TIMESTAMP'),
      allowNull: false,
    },
    UpdatedAt: {
      type: DataTypes.DATE,
      defaultValue: literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
      allowNull: false,
    },
  },
  {
    sequelize: db,
  }
);

export default model;
