const KEY = "token";

// Fallback for browsers that block site data, where localStorage throws.
// The user stays logged in until a reload, then lands on the login page.
let memoryToken: string | null = null;

export const getToken = (): string | null => {
  try {
    // Trust storage whenever it answers, even with null, so a log out in
    // another tab still applies.
    return localStorage.getItem(KEY);
  } catch {
    return memoryToken;
  }
};

export const setToken = (token: string) => {
  memoryToken = token;
  try {
    localStorage.setItem(KEY, token);
  } catch {
    // storage blocked: the memory copy keeps the session until reload
  }
};

export const clearToken = () => {
  memoryToken = null;
  try {
    localStorage.removeItem(KEY);
  } catch {
    // storage blocked: nothing stored to clear
  }
};
