import {
  addQuestionnaireController,
  deleteQuestionaireController,
  getAllquestionnairesController,
  getQuestionnairesController,
  updateQuestionaireController,
} from '../controllers/questionnaire.controllers.js';
import router from './index.js';

router
  .route('/questionnaires')
  .get(getAllquestionnairesController)
  .post(addQuestionnaireController);

router
  .route('/questionnaires/:id')
  .delete(deleteQuestionaireController)
  .get(getQuestionnairesController)
  .put(updateQuestionaireController);

export default router;
