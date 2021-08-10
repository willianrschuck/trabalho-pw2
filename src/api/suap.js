import { getToken } from '../services/auth'
import axios from 'axios'

const client = axios.create({
  baseURL: 'http://localhost:3030/https://suap.ifsul.edu.br',
  timeout: 20000
})

export const getBoletim = async({ano, periodo}) => {
  return client.get(`/api/v2/minhas-informacoes/boletim/${ano}/${periodo}/`,{
    headers: {
      'Authorization': `JWT ${getToken()}`,
      'Accept': '*/*'
    }
  });
}

export const getTurmas = async({ano, periodo}) => {
  return client.get(`/api/v2/minhas-informacoes/turmas-virtuais/${ano}/${periodo}/`,{
    headers: {
      'Authorization': `JWT ${getToken()}`,
      'Accept': '*/*'
    }
  });
}

export const getTurma = async(id) => {
  return client.get(`/api/v2/minhas-informacoes/turma-virtual/${id}/`,{
    headers: {
      'Authorization': `JWT ${getToken()}`,
      'Accept': '*/*'
    }
  });
}

export const getPeriodosLetivos = () => {
  return client.get('/api/v2/minhas-informacoes/meus-periodos-letivos/',{
    headers: {
      'Authorization': `JWT ${getToken()}`,
      'Accept': '*/*'
    }
  });
}