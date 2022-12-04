import axios from 'axios';
import config from '../config/config'
import { useEffect, useState } from "react";

const GetUser = async() =>{
   try{
      const response = await axios.get(`${config.URL_API}/`)
      return response
   }
   catch(err){
      console.log(err)
   }
}

export const useGetUserById = (id) => {
   const [user, setUser] = useState({});
   useEffect(() => {
       axios.get(`${config.URL_API}/user/${id}`)
       .then(res => {setUser(res.data.data)})
   }, []);
   return [user];
}

/*export const getUserById = async(id) =>{
   try{
      const response = await axios.get(`${config.URL_API}/user/${id}`)
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
}*/