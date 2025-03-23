import Questionnaire from './Questionnaire.js';
import Question from './Question.js';
import Choice from './Choice.js';
import UserResponse from './UserResponse.js';
import Answer from './Answer.js';
import { defineRelationships } from './assotiations.js';

defineRelationships();

export { Questionnaire, Question, Choice, UserResponse, Answer };
