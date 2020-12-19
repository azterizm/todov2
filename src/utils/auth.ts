import axios, { AxiosResponse } from 'axios';

export const loginUser = async (
  email: string,
  password: string
): Promise<AxiosResponse<string>> => {
  const data: AxiosResponse<string> = await axios.post('https://todov2-auth.herokuapp.com/login', {
    email,
    password
  });
  return data;
};

export const createUser = async (
  name: string,
  password: string,
  email: string
): Promise<AxiosResponse<string>> => {
  const data: AxiosResponse<string> = await axios.post('https://todov2-auth.herokuapp.com/create', {
    name,
    email,
    password
  });
  return data;
};
