import axios from 'axios';
import Cookies from 'js-cookie';

const getApiKey = () => {
    return Cookies.get('youtube_api_key') || import.meta.env.VITE_YOUTUBE_API_KEY;
};

const instance = axios.create({
    baseURL: 'https://www.googleapis.com/youtube/v3',
    params: {
        part: 'snippet',
        maxResults: 12,
        type: 'video'
    }
});

instance.interceptors.request.use(config => {
    config.params.key = getApiKey();
    return config;
});

export default instance;