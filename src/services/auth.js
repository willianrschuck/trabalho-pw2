export const TOKEN_KEY = "suap-token";
export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null;
export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const getTarefas = () => {
  let string = localStorage.getItem('TAREFAS');
  console.log(string)
  return string !== 'undefined' ? JSON.parse(string) : [];
}

export const login = token => {
  localStorage.setItem(TOKEN_KEY, token);
};

export const logout = (setToken) => {
  localStorage.removeItem(TOKEN_KEY);
  setToken('');
};

export const authSuap = async (user, setToken) => {
  const formData = new FormData();
  formData.append("username", user.username);
  formData.append("password", user.password);
  const settings = {
    method: "POST",
    body: formData
  }
  try {
    const fetchResponse = await fetch("https://suap.ifsul.edu.br/api/v2/autenticacao/token/", settings);
    const data = await fetchResponse.json()
    if (fetchResponse.ok) {
      login(data.token);
      setToken(data.token);
    }
    return [data, null];
  } catch (error) {
    console.error(error);
    return [null, error];
  }  
}
  