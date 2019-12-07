import axios from 'axios';
const Dates = axios.create({baseURL:'http://127.0.0.1:8000/api/test'});

export default Dates;