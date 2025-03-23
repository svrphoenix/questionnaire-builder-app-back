import { Choice, Question } from '../models/index.js';

async function updateQuestionsAndChoices(
  transaction,
  questionnaireId,
  questions
) {
  for (const question of questions) {
    const { Choices, ...questionData } = question;

    const { Id: QuestionId } = await Question.create(
      {
        ...questionData,
        QuestionnaireId: questionnaireId,
      },
      { transaction }
    );

    if (Choices && Choices.length > 0) {
      const choiceData = Choices.map(choice => ({
        QuestionId,
        ChoiceText: choice,
      }));
      await Choice.bulkCreate(choiceData, { transaction });
    }
  }
}

export { updateQuestionsAndChoices };
