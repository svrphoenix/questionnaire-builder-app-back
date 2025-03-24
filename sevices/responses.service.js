import sequelize from '../lib/db.js';
import { Answer, UserResponse } from '../models/index.js';

async function storeUserResponses(userId, questionnaireId, responses) {
  const transaction = await sequelize.transaction();

  try {
    const userResponse = await UserResponse.create(
      {
        UserId: userId,
        QuestionnaireId: questionnaireId,
        CompletedAt: new Date(),
      },
      { transaction }
    );

    const answers = [];

    responses.forEach(response => {
      if (Array.isArray(response.ChoiceId)) {
        response.ChoiceId.forEach(choiceId => {
          answers.push({
            UserResponseId: userResponse.Id,
            QuestionId: response.QuestionId,
            ChoiceId: choiceId,
          });
        });
      } else {
        answers.push({
          UserResponseId: userResponse.Id,
          QuestionId: response.QuestionId,
          AnswerText: response?.AnswerText || null,
          ChoiceId: response?.ChoiceId || null,
        });
      }
    });
    await Answer.bulkCreate(answers, { transaction });

    await transaction.commit();

    return { message: 'Responses stored successfully' };
  } catch (error) {
    await transaction.rollback();
    console.error('Error storing responses:', error);
    throw new Error('Failed to store responses');
  }
}

export { storeUserResponses };
