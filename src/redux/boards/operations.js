import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
// import { setAuthHeader } from '../auth/operations.js';

// axios.defaults.baseURL = 'https://pr5-ltp-rn-back.onrender.com';

const getAuthHeaders = token => ({
  Authorization: `Bearer ${token}`,
});
export const fetchBoards = createAsyncThunk(
  'boards/fetchAll',
  async ({ userId, token }, thunkAPI) => {
    if (!token) {
      return thunkAPI.rejectWithValue('No token provided');
    }
    try {
      const { data } = await axios.get(`/boards?owner=${userId}`, {
        headers: getAuthHeaders(token),
      });
      // console.log('Fetched data:', data);
      return data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const addBoard = createAsyncThunk(
  'boards/addBoard',
  async ({ title, icon, background, token }, thunkAPI) => {
    try {
      const { data } = await axios.post(
        '/boards',
        { title, icon, background },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log('Adding board:', data);
      return data;
    } catch (error) {
      console.error('Error adding board:', error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

/* export const addBoard = createAsyncThunk(
  'boards/addBoard',
  async ({ userId, boardName, token }, thunkAPI) => {
    try {
      const { data } = await axios.post(
        '/boards',
        { title: boardName, owner: userId },
        {
          headers: getAuthHeaders(token),
        }
      );
      console.log('Adding board :', data);
      return data;
    } catch (error) {
      console.error('Error adding board:', error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
); */
export const updateBoard = createAsyncThunk(
  'boards/updateBoard',
  async ({ boardId, title, icon, background, token }, thunkAPI) => {
    try {
      console.log('boardId:', boardId, 'Payload:', { title, icon, background });
      const { data } = await axios.patch(
        `/boards/${boardId}`,
        { title, icon, background },
        {
          headers: { Authorization: `Bearer ${token}` }, // Заголовок авторизації
        }
      );
      console.log('Server response after update:', data);
      return data;
    } catch (error) {
      console.error(
        'Error while updating board:',
        error.response?.data || error.message
      );
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

export const deleteBoard = createAsyncThunk(
  'boards/deleteBoard',
  async ({ boardId, token }, thunkAPI) => {
    try {
      await axios.delete(`/boards/${boardId}`, {
        headers: getAuthHeaders(token),
      });
      return { boardId };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const fetchBoardById = createAsyncThunk(
  'boards/fetchBoardById',
  async ({ boardId, token }, thunkAPI) => {
    try {
      if (!token) {
        throw new Error('Token is missing');
      }
      console.log('Fetching board with token:', token);

      const response = await axios.get(`/boards/${boardId}`, {
        headers: getAuthHeaders(token),
      });
      console.log('Fetched board:', response.data);
      return response.data;
    } catch (error) {
      console.error('Fetch board error:', error.message);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const editColumnTitle = createAsyncThunk(
  'boards/columns/editColumnTitle',
  async ({ columnId, newTitle, token }, thunkAPI) => {
    try {
      const response = await axios.patch(
        `/columns/${columnId}`,
        { title: newTitle },
        {
          headers: {
            'Content-Type': 'application/json',
            ...getAuthHeaders(token),
          },
        }
      );
      console.log('Server response after editing column:', response.data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data.message || 'Failed to edit the column'
      );
    }
  }
);
