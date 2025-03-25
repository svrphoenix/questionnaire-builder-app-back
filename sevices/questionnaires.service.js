import { Op } from 'sequelize';
import sequelize from '../lib/db.js';
import { Choice, Question, Questionnaire } from '../models/index.js';
import { updateQuestionsAndChoices } from '../helpers/updateAssotiated.js';

async function getAllQuestionnaires({ page = 1, size = 10, filter = {} }) {
  const params = {
    attributes: [
      'Id',
      'Name',
      'Description',
      'QuestionCount',
      'CompletionCount',
    ],
    order: [['Name', 'ASC']],
    offset: (page - 1) * size,
    limit: +size,
  };

  if (filter.Name) {
    params.where.Name = { [Op.like]: `%${filter.Name}%` };
  }

  const result = await Questionnaire.findAndCountAll(params);

  return {
    Data: result.rows,
    Count: result.count,
    CountPages: Math.ceil(result.count / size || 1),
  };
}

async function getQuestionnaire(questionnaireId) {
  const params = {
    where: {
      Id: questionnaireId,
    },
    attributes: [
      'Id',
      'Name',
      'Description',
      'QuestionCount',
      'CompletionCount',
    ],
    include: [
      {
        association: 'Questions',
        attributes: ['QuestionText', 'QuestionType'],
        include: [
          {
            association: 'Choices',
            attributes: ['ChoiceText'],
          },
        ],
      },
    ],
    order: [['Name', 'DESC']],
  };

  const quiz = await Questionnaire.findOne(params);

  return quiz;
}

async function addQuestionnaire(newQuiz) {
  const transaction = await sequelize.transaction();

  try {
    const { Id } = await Questionnaire.create(
      {
        ...newQuiz,
        QuestionCount: newQuiz.Questions.length,
      },
      { transaction }
    );

    await updateQuestionsAndChoices(transaction, Id, newQuiz.Questions);

    await transaction.commit();
    return { Id };
  } catch (error) {
    if (transaction) await transaction.rollback();
    console.error('Error details:', error);
    throw new Error('Failed to create new questionnaire');
  }
}

async function deleteQuestionnaire(questionnaireId) {
  const transaction = await sequelize.transaction();

  try {
    const questionnaire = await Questionnaire.findByPk(questionnaireId);

    if (!questionnaire) {
      return null;
    }

    await Questionnaire.destroy({
      where: { Id: questionnaireId },
      transaction,
    });

    await transaction.commit();

    return {
      message: `Questionnaire with Id ${questionnaireId} deleted successfully`,
    };
  } catch (error) {
    if (transaction) await transaction.rollback();
    console.error('Error deleting questionnaire:', error);
    throw new Error('Failed to delete questionnaire');
  }
}

async function updateQuestionnaire(questionnaireId, updatedQuiz) {
  const questionnaire = await Questionnaire.findByPk(questionnaireId);
  if (!questionnaire) {
    return null;
  }

  const transaction = await sequelize.transaction();

  try {
    await Questionnaire.update(
      {
        ...updatedQuiz,
        QuestionCount: updatedQuiz.Questions.length,
        UpdatedAt: new Date(),
      },
      {
        where: { Id: questionnaireId },
        transaction,
      }
    );

    const oldQuestions = await Question.findAll({
      where: { QuestionnaireId: questionnaireId },
    });
    for (const question of oldQuestions) {
      await Choice.destroy({ where: { QuestionId: question.Id }, transaction });
    }
    await Question.destroy({
      where: { QuestionnaireId: questionnaireId },
      transaction,
    });

    await updateQuestionsAndChoices(
      transaction,
      questionnaireId,
      updatedQuiz.Questions
    );

    await transaction.commit();
    return { questionnaireId };
  } catch (error) {
    if (transaction) await transaction.rollback();
    console.error('Error details:', error);
    throw new Error('Failed to update questionnaire');
  }
}

async function updateQuestionnaireCompletions(questionnaireId) {
  const questionnaire = await Questionnaire.findByPk(questionnaireId);
  if (!questionnaire) {
    return null;
  }

  try {
    await Questionnaire.update(
      {
        CompletionCount: questionnaire.CompletionCount + 1,
        UpdatedAt: new Date(),
      },
      {
        where: { Id: questionnaireId },
      }
    );

    return true;
  } catch (error) {
    console.error('Error details:', error);
    throw new Error('Failed to update questionnaire');
  }
}

export {
  getAllQuestionnaires,
  getQuestionnaire,
  addQuestionnaire,
  deleteQuestionnaire,
  updateQuestionnaire,
  updateQuestionnaireCompletions,
};
