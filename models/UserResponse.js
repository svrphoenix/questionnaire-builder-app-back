import { Model, DataTypes } from 'sequelize';
import db from '../lib/db.js';

class UserResponse extends Model {}

const model = UserResponse.init(
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
    UserId: {
      type: DataTypes.BIGINT,
      allowNull: true,
    },
    CompletedAt: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      allowNull: false,
    },
  },
  {
    sequelize: db,
  }
);

export default model;
