import axios from 'axios';

const BASE_URL = "http://localhost:7777/";

class UserService {

    viewUser(userName){
        return axios.get(BASE_URL, userName);
    }

    getUsers(){
        return axios.get(BASE_URL + "list");
    }

    updateUser(userDto){
        return axios.put(BASE_URL, userDto);
    }
    
    addUser(userDto){
        return axios.post(BASE_URL, userDto);
    }

    deleteUser(userName){
        return axios.delete(BASE_URL, userName);
    }
}

export default new UserService();