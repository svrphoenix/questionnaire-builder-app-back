export const validateQuestionnaireInput = reqBody => {
  const errors = [];
  if (!reqBody.Name) errors.push('Questionnaire Name is required');
  if (!reqBody.Questions || reqBody.Questions.length === 0)
    errors.push('Questionnaire must have at least one question');
  return errors;
};
