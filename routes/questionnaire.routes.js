import {
  addQuestionnaireController,
  deleteQuestionaireController,
  getAllquestionnairesController,
  getQuestionnairesController,
  updateCompletionsController,
  updateQuestionaireController,
} from '../controllers/questionnaire.controllers.js';
import { updateQuestionnaireCompletions } from '../sevices/questionnaires.service.js';
import router from './index.js';

router
  .route('/questionnaires')
  .get(getAllquestionnairesController)
  .post(addQuestionnaireController);

router
  .route('/questionnaires/:id')
  .delete(deleteQuestionaireController)
  .get(getQuestionnairesController)
  .put(updateQuestionaireController)
  .patch(updateCompletionsController);

export default router;
