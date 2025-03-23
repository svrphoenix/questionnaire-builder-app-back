import Questionnaire from './Questionnaire.js';
import Question from './Question.js';
import Choice from './Choice.js';
import UserResponse from './UserResponse.js';
import Answer from './Answer.js';

export const defineRelationships = () => {
  Questionnaire.hasMany(Question, { foreignKey: 'QuestionnaireId' });
  Question.belongsTo(Questionnaire, { foreignKey: 'QuestionnaireId' });

  Question.hasMany(Choice, { foreignKey: 'QuestionId' });
  Choice.belongsTo(Question, { foreignKey: 'QuestionId' });

  UserResponse.belongsTo(Questionnaire, { foreignKey: 'QuestionnaireId' });
  UserResponse.hasMany(Answer, { foreignKey: 'UserResponseId' });

  Answer.belongsTo(Question, { foreignKey: 'QuestionId' });
  Answer.belongsTo(Choice, { foreignKey: 'ChoiceId' });
};
