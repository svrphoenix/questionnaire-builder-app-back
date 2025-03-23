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
  const questionaireId = req.params.id;

  try {
    if (!questionaireId) {
      return res.status(400).json({ message: 'Questionaire Id is required' });
    }
    const questionaire = await getQuestionnaire(questionaireId);
    if (!questionaire)
      return res.status(404).json({
        message: `Questionaire ${questionaire} not found`,
      });
    res.json(questionaire);
  } catch (error) {
    next(error);
  }
};

const addQuestionnaireController = async (req, res, next) => {
  const newQuiz = req.body;
  try {
    if (!newQuiz.Name) {
      return res
        .status(400)
        .json({ message: 'Questionnaire Name is required' });
    }
    if ((newQuiz.Questions.lenght = 0)) {
      return res
        .status(422)
        .json({ message: 'Questionnaire has no questions' });
    }

    const addedQuiz = await addQuestionnaire(newQuiz);
    res.json(addedQuiz);
  } catch (error) {
    next(error);
  }
};

const deleteQuestionaireController = async (req, res, next) => {
  const questionaireId = req.params.id;

  try {
    if (!questionaireId) {
      return res.status(400).json({ message: 'Questionaire Id is required' });
    }
    const deleteQuestionaireId = await deleteQuestionnaire(questionaireId);
    if (deleteQuestionaireId === null)
      return res.status(404).json({
        message: `Questionaire ${questionaireId} not found`,
      });
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

const updateQuestionaireController = async (req, res, next) => {
  const questionaireId = req.params.id;
  const updatedQuiz = req.body;

  try {
    if (!questionaireId) {
      return res.status(400).json({ message: 'Questionaire Id is required' });
    }
    const updatedId = await updateQuestionnaire(questionaireId, updatedQuiz);
    if (updatedId === null)
      return res.status(404).json({
        message: `Questionaire ${questionaireId} not found`,
      });
    res.json(questionaireId);
  } catch (error) {
    next(error);
  }
};

const updateCompletionsController = async (req, res, next) => {
  const questionaireId = req.params.id;

  try {
    if (!questionaireId) {
      return res.status(400).json({ message: 'Questionaire Id is required' });
    }
    const result = await updateQuestionnaireCompletions(questionaireId);
    if (result === null)
      return res.status(404).json({
        message: `Questionaire ${questionaireId} not found`,
      });
    res.status(204).end();
  } catch (error) {
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
