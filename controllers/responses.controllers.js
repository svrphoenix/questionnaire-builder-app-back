import { storeUserResponses } from '../sevices/responses.service.js';

const createUserResponsesController = async (req, res, next) => {
  const questionnaireId = req.params.id;
  const responses = req.body;

  try {
    if (!responses || responses.length === 0) {
      const error = new Error('Questionnaire has no answers');
      error.status = 422;
      return next(error);
    }

    const createdResponses = await storeUserResponses(
      1,
      questionnaireId,
      responses
    );

    res.status(201).json(createdResponses);
  } catch (error) {
    error.status = error.status || 500;
    next(error);
  }
};

export { createUserResponsesController };
