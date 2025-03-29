import { validateQuestionnaireInput } from '../helpers/bodyValidate.js';
import {
  addQuestionnaire,
  deleteQuestionnaire,
  getAllQuestionnaires,
  getQuestionnaire,
  updateQuestionnaire,
  updateQuestionnaireCompletions,
} from '../sevices/questionnaires.service.js';

const getAllquestionnairesController = async (req, res, next) => {
  try {
    const questionnairesData = await getAllQuestionnaires(req.query);
    res.json(questionnairesData);
  } catch (error) {
    next(error);
  }
};

const getQuestionnairesController = async (req, res, next) => {
  const questionnaireId = req.params.id;

  try {
    if (!questionnaireId) {
      const error = new Error('Questionnaire Id is required');
      error.status = 400;
      return next(error);
    }
    const questionnaire = await getQuestionnaire(questionnaireId);
    if (!questionnaire) {
      const error = new Error(`Questionnaire ${questionnaireId} not found`);
      error.status = 404;
      return next(error);
    }

    res.json(questionnaire);
  } catch (error) {
    error.status = error.status || 500;
    next(error);
  }
};

const addQuestionnaireController = async (req, res, next) => {
  const errors = validateQuestionnaireInput(req.body);
  if (errors.length > 0) {
    return res.status(400).json({ message: errors.join(', ') });
  }

  try {
    const addedQuiz = await addQuestionnaire(req.body);
    res.json(addedQuiz);
  } catch (error) {
    error.status = 500;
    next(error);
  }
};

const deleteQuestionaireController = async (req, res, next) => {
  const questionnaireId = req.params.id;

  try {
    if (!questionnaireId) {
      const error = new Error('Questionnaire ID is required');
      error.status = 400;
      return next(error);
    }

    const result = await deleteQuestionnaire(questionnaireId);
    if (!result) {
      const error = new Error(`Questionnaire ${questionnaireId} not found`);
      error.status = 404;
      return next(error);
    }

    res.status(204).end();
  } catch (error) {
    error.status = error.status || 500;
    next(error);
  }
};

const updateQuestionaireController = async (req, res, next) => {
  const questionnaireId = req.params.id;

  try {
    if (!questionnaireId) {
      const error = new Error('Questionnaire ID is required');
      error.status = 400;
      return next(error);
    }

    const updatedQuiz = req.body;
    const updatedId = await updateQuestionnaire(questionnaireId, updatedQuiz);
    if (!updatedId) {
      const error = new Error(`Questionnaire ${questionnaireId} not found`);
      error.status = 404;
      return next(error);
    }

    res.json(updatedId);
  } catch (error) {
    error.status = error.status || 500;
    next(error);
  }
};

const updateCompletionsController = async (req, res, next) => {
  const questionnaireId = req.params.id;

  try {
    if (!questionnaireId) {
      const error = new Error('Questionnaire ID is required');
      error.status = 400;
      return next(error);
    }

    const result = await updateQuestionnaireCompletions(questionnaireId);
    if (!result) {
      const error = new Error(`Questionnaire ${questionnaireId} not found`);
      error.status = 404;
      return next(error);
    }

    res.status(204).end();
  } catch (error) {
    error.status = error.status || 500;
    next(error);
  }
};

export {
  getAllquestionnairesController,
  getQuestionnairesController,
  addQuestionnaireController,
  deleteQuestionaireController,
  updateQuestionaireController,
  updateCompletionsController,
};
