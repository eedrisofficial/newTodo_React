// TODO localStorage
export const getLocalStorage = (name) => {
  if (!name) {
    throw new Error("localStorage name is missing ");
  }
  return JSON.parse(localStorage.getItem(name)) || [];
};

export const setLocalStorage = (name, newData) => {
  if (!name) {
    throw new Error("Database name does not exist ");
  }
  if (!newData) {
    throw new Error("data does not exist ");
  }
  return localStorage.setItem(name, JSON.stringify(newData)) || [];
};
