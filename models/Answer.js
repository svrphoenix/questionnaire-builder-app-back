import { Model, DataTypes } from 'sequelize';
import db from '../lib/db.js';

class Answer extends Model {}

const model = Answer.init(
  {
    Id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    UserResponseId: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    QuestionId: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    AnswerText: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    ChoiceId: {
      type: DataTypes.BIGINT,
      allowNull: true,
    },
    CompleteddAt: {
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
