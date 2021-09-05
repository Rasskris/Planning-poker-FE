const getNameInitials = (firstName: string, lastName?: string) => {
  const firstLetter = `${firstName[0]}`;
  const secondLetter = lastName ? `${lastName[0]}` : '';

  return `${firstLetter}${secondLetter}`;
};

export { getNameInitials };
