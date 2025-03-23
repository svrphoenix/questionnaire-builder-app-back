import createServer from '../lib/server.js';
import sequelize, { initDatabaseConnection } from '../lib/db.js';
import { runMigrations } from '../lib/migration.js';

(async function bootstrap() {
  try {
    const dbConnected = await initDatabaseConnection();
    if (dbConnected) {
      await runMigrations(sequelize);
      await createServer();
    } else {
      console.error('Database connection failed.');
      process.exit(1);
    }
  } catch (error) {
    console.error(`Starting server error: ${error.message}`);
    process.exit(1);
  }
})();
