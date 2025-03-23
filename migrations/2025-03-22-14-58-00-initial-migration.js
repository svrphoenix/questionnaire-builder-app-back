import Sequelize, { DataTypes } from 'sequelize';

export async function up(queryInterface) {
  await queryInterface.createTable('Questionnaires', {
    Id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    Name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    Description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    QuestionCount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    CompletionCount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    CreatedAt: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      allowNull: false,
    },
    UpdatedAt: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.literal(
        'CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'
      ),
      allowNull: false,
    },
  });

  await queryInterface.createTable('Questions', {
    Id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    QuestionnaireId: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    QuestionText: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    QuestionType: {
      type: DataTypes.ENUM('text', 'single_choice', 'multiple_choices'),
      allowNull: false,
    },
    CreatedAt: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      allowNull: false,
    },
    UpdatedAt: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.literal(
        'CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'
      ),
      allowNull: false,
    },
  });

  await queryInterface.createTable('Choices', {
    Id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    QuestionId: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    ChoiceText: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    CreatedAt: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      allowNull: false,
    },
    UpdatedAt: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.literal(
        'CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'
      ),
      allowNull: false,
    },
  });

  await queryInterface.createTable('UserResponses', {
    Id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    QuestionnaireId: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    UserId: {
      type: DataTypes.BIGINT,
      allowNull: true,
    },
    CompletedAt: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      allowNull: false,
    },
  });

  await queryInterface.createTable('Answers', {
    Id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    UserResponseId: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    QuestionId: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    AnswerText: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    ChoiceId: {
      type: DataTypes.BIGINT,
      allowNull: true,
    },
    CompletedAt: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      allowNull: false,
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
