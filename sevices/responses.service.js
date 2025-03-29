import sequelize from '../lib/db.js';
import { Answer, Questionnaire, UserResponse } from '../models/index.js';

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

    const answers = responses
      .map(response => {
        if (Array.isArray(response.ChoiceId)) {
          return response.ChoiceId.map(choiceId => ({
            UserResponseId: userResponse.Id,
            QuestionId: response.QuestionId,
            ChoiceId: choiceId,
          }));
        }
        return {
          UserResponseId: userResponse.Id,
          QuestionId: response.QuestionId,
          AnswerText: response?.AnswerText || null,
          ChoiceId: response?.ChoiceId || null,
        };
      })
      .flat();

    await Answer.bulkCreate(answers, { transaction });

    const questionnaire = await Questionnaire.findOne({
      where: { Id: questionnaireId },
      attributes: ['CompletionCount'],
      transaction,
    });

    if (!questionnaire) {
      const error = new Error(
        `Questionnaire with ID ${questionnaireId} not found`
      );
      error.status = 404;
      throw error;
    }

    const updatedCompletionCount = questionnaire.CompletionCount + 1;

    await Questionnaire.update(
      {
        CompletionCount: updatedCompletionCount,
        UpdatedAt: new Date(),
      },
      {
        where: { Id: questionnaireId },
        transaction,
      }
    );

    await transaction.commit();

    return { message: 'Responses stored successfully' };
  } catch (error) {
    if (transaction) await transaction.rollback();

    if (error instanceof sequelize.ValidationError) {
      console.error('Validation error:', error.errors);
      error.status = 422;
    } else if (error.message.includes('Questionnaire with ID')) {
      console.error('Database error:', error.message);
      error.status = 404;
    } else {
      console.error('Unexpected error:', error);
      error.status = 500;
    }

    throw error;
  }
}

export { storeUserResponses };
