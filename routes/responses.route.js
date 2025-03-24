import {
  createUserResponsesController,
} from '../controllers/responses.controllers.js';
import router from './index.js';

router
  .route('/responses/:id')
  .post(createUserResponsesController);

export default router;
