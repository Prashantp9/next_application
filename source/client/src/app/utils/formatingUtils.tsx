export const convertUrlToString = (url: string) => {
  const regexPattern = /%20/g;
  const resultString = url.replace(regexPattern, " ");
  return resultString;
};
