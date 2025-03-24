import { storeUserResponses } from '../sevices/responses.service.js';

const createUserResponsesController = async (req, res, next) => {
  const questionaireId = req.params.id;
  const responses = req.body;
  try {
    if ((responses.lenght = 0)) {
      return res.status(422).json({ message: 'Questionnaire has no answers' });
    }

    const createdResponses = await storeUserResponses(
      1,
      questionaireId,
      responses
    );
    res.json(createdResponses);
  } catch (error) {
    next(error);
  }
};

export { createUserResponsesController };
