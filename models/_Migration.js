import { Model, STRING, DATE } from 'sequelize';
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
    },
  },
  {
    sequelize: db,
    tableName: '_migrations',
  }
);

export default model;
