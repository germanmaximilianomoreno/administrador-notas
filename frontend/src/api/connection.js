import axios from 'axios'

const BACKEND_URL_API = process.env.REACT_APP_BACKEND_URL_API;

export const getAllNotes = async () => {
    try {
        const response = await axios.get(`${BACKEND_URL_API}/`);
        return response.data;
    } catch (e) {
        console.error('Error al obtener las notas:', e);
        throw e;
    };
};

export const postNotes = async (note) => {
    try {
        const response = await axios.post(`${BACKEND_URL_API}/`, note);
        return response.data;
    } catch (e) {
        console.error('Error al obtener las notas:', e);
        throw e;
    };
};

export const updateNote = async (note) => {
    try {
        const response = await axios.put(`${BACKEND_URL_API}/${note.id}`, note);
        return response.data;
    } catch (e) {
        console.error('Error al obtener las notas:', e);
        throw e;
    };
};

export const deleteNote = async (note) => {
    try {
        const response = await axios.delete(`${BACKEND_URL_API}/${note.id}`);
        return response.data;
    } catch (e) {
        console.error('Error al obtener las notas:', e);
        throw e;
    };
};