import axios from 'axios';
import config from '../config/config'

const GetUser = async() =>{
   try{
      const response = await axios.get(`${config.URL_API}/`)
      return response
   }
   catch(err){
      console.log(err)
   }
}

const GetUserById = async(id) =>{
   try{
      const response = await axios.get(`${config.URL_API}/:${id}`)
      return response
   }
   catch(err){
      console.log(err);
   }
}

const UpdateUserById = async(userInfo)=>{
   try{
      const response = await axios.put(`${config.URL_API}/:${userInfo.id}/updateUserById`)
      console.log(response)
   }
   catch(err){
      console.log(err);
   }
}

const DelateUserById = async(id) =>{
   try{
      const response = await axios.delete(`${config.URL_API}/:${userInfo.id}/updateUserById`)
   }
   catch(err){
      console.log(err);
   }
}