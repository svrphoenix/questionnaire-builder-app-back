import Questionnaire from './Questionnaire.js';
import Question from './Question.js';
import Choice from './Choice.js';
import UserResponse from './UserResponse.js';
import Answer from './Answer.js';

export const defineRelationships = () => {
  Questionnaire.hasMany(Question, {
    foreignKey: 'QuestionnaireId',
    onDelete: 'CASCADE',
  });
  Question.belongsTo(Questionnaire, {
    foreignKey: 'QuestionnaireId',
    onDelete: 'CASCADE',
  });

  Question.hasMany(Choice, { foreignKey: 'QuestionId', onDelete: 'CASCADE' });
  Choice.belongsTo(Question, { foreignKey: 'QuestionId', onDelete: 'CASCADE' });

  UserResponse.belongsTo(Questionnaire, {
    foreignKey: 'QuestionnaireId',
    onDelete: 'CASCADE',
  });
  UserResponse.hasMany(Answer, {
    foreignKey: 'UserResponseId',
    onDelete: 'CASCADE',
  });

  Answer.belongsTo(Question, { foreignKey: 'QuestionId', onDelete: 'CASCADE' });
  Answer.belongsTo(Choice, { foreignKey: 'ChoiceId', onDelete: 'CASCADE' });
};
