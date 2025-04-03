import { Model, STRING, DATE, literal } from 'sequelize';
import db from '../lib/db.js';

class Migration extends Model {}

const model = Migration.init(
  {
    Name: {
      type: STRING,
      primaryKey: true,
    },
    AppliedAt: {
      type: DATE,
      defaultValue: literal('CURRENT_TIMESTAMP'),
    },
  },
  {
    sequelize: db,
    tableName: '_migrations',
  }
);

export default model;
