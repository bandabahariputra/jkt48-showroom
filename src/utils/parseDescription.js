const parseDescription = (description) => {
  const arrDescription = description
    .split('\r\n')
    .map((item) => item.replace(/"/g, '').split(':'))
    .filter((item) => item.length > 1)
    .map((item) => {
      if (item[0] === 'Twitter' || item[0] === 'Instagram') {
        return [item[0], item.pop()];
      }
      return item;
    });

  return Object.fromEntries(arrDescription);
};

export default parseDescription;
