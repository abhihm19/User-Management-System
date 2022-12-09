import axios from 'axios';

const BASE_URL = "http://localhost:7777/";

class UserService {

    async viewUser(id){
        console.log(id);
        return await axios.get(BASE_URL + id);
    }

    async getUsers(){
        return await axios.get(BASE_URL);
    }

    async updateUser(id, user){
        return await axios.put(BASE_URL + id, user);
    }
    
    async addUser(user){
        return await axios.post(BASE_URL, user);
    }

    async deleteUser(id){
        console.log("Service" + id)
        return await axios.delete(BASE_URL + id);
    }
}

export default new UserService();