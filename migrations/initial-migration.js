import Questionnaire from '../models/Questionnaire.js';
import Question from '../models/Question.js';
import Choice from '../models/Choice.js';
import UserResponse from '../models/UserResponse.js';
import Answer from '../models/Answer.js';
import { Sequelize } from 'sequelize';

export async function up(queryInterface) {
  await queryInterface.createTable(
    'Questionnaires',
    Questionnaire.getAttributes()
  );
  await queryInterface.createTable('Questions', {
    ...Question.getAttributes(),
    QuestionnaireId: {
      type: Sequelize.BIGINT,
      allowNull: false,
      references: {
        model: 'Questionnaires',
        key: 'Id',
      },
      onDelete: 'CASCADE',
    },
  });

  await queryInterface.createTable('Choices', {
    ...Choice.getAttributes(),
    QuestionId: {
      type: Sequelize.BIGINT,
      allowNull: false,
      references: {
        model: 'Questions',
        key: 'Id',
      },
      onDelete: 'CASCADE',
    },
  });

  await queryInterface.createTable('UserResponses', {
    ...UserResponse.getAttributes(),
    QuestionnaireId: {
      type: Sequelize.BIGINT,
      allowNull: false,
      references: {
        model: 'Questionnaires',
        key: 'Id',
      },
      onDelete: 'CASCADE',
    },
  });

  await queryInterface.createTable('Answers', {
    ...Answer.getAttributes(),
    UserResponseId: {
      type: Sequelize.BIGINT,
      allowNull: false,
      references: {
        model: 'UserResponses',
        key: 'Id',
      },
      onDelete: 'CASCADE',
    },
    QuestionId: {
      type: Sequelize.BIGINT,
      allowNull: false,
      references: {
        model: 'Questions',
        key: 'Id',
      },
      onDelete: 'CASCADE',
    },
    ChoiceId: {
      type: Sequelize.BIGINT,
      allowNull: true,
      references: {
        model: 'Choices',
        key: 'Id',
      },
      onDelete: 'CASCADE',
    },
  });
}

export async function down(queryInterface) {
  await queryInterface.dropTable('Answers');
  await queryInterface.dropTable('UserResponses');
  await queryInterface.dropTable('Choices');
  await queryInterface.dropTable('Questions');
  await queryInterface.dropTable('Questionnaires');
}
