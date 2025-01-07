const isInputEmpty = (content) => {
  if (content.length === 0) {
    return true;
  } else {
    return false;
  }
};
const isInputOver = (content, length) => {
  if (content.length > length) {
    return true;
  } else {
    return false;
  }
};
const isInputLess = (content, length) => {
  if (content.length < length) {
    return true;
  } else {
    return false;
  }
};
const isInputIncludes = (content, char) => {
  if (content.includes(char)) {
    return true;
  } else {
    return false;
  }
};
export { isInputEmpty, isInputOver, isInputLess, isInputIncludes };
