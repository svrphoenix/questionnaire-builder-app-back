import { defineRelationships } from './assotiations.js';
import Questionnaire from './Questionnaire.js';
import Question from './Question.js';
import Choice from './Choice.js';
import UserResponse from './UserResponse.js';
import Answer from './Answer.js';
import db from '../lib/db.js';

defineRelationships();

(async () => {
  try {
    await db.sync({ alter: true });
    console.log('Database synchronized with defined relationships.');
  } catch (error) {
    console.error('Failed to sync database:', error);
  }
})();

export { Questionnaire, Question, Choice, UserResponse, Answer };
