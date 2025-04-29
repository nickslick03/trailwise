const toTitleCase = (str: string) =>
  str.replace(
    /\w\S*/g,
    (txt) => txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase()
  );

const convertRuleKey = (key: string) => toTitleCase(key.replace(/_/g, ' '));

export default convertRuleKey;
