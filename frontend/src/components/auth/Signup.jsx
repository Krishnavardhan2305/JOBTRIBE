import React, { useEffect, useState } from 'react';
import Navbar from '../shared/Navbar';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { RadioGroup } from '../ui/radio-group';
import { Button } from '../ui/button';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { USER_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';
import { useDispatch, useSelector } from 'react-redux';
import store from '@/redux/store';
import { setLoading } from '@/redux/authSlice';
import { Loader2 } from 'lucide-react';

const Signup = () => {
  const [formData, setFormData] = useState({
    Name: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
    file: ""
  });
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const {loading,user}=useSelector(store=>store.auth);
  const changeEventHandler = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const changeFileHandler = (e) => {
    setFormData({ ...formData, file: e.target.files?.[0] });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append('Name', formData.Name);
    formDataToSend.append('email', formData.email);
    formDataToSend.append('phoneNumber', formData.phoneNumber);
    formDataToSend.append('password', formData.password);
    formDataToSend.append('role', formData.role);
    
    if (formData.file) {
        formDataToSend.append('file', formData.file);
    }

    try {
      dispatch(setLoading(true));
        const response = await axios.post(`${USER_API_END_POINT}/register`, formDataToSend, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
        withCredentials:true,
        });
        if(response.data.success) {
          toast.success(response.data.message);
          setTimeout(() => {
              navigate("/login");
          }, 2000);
      }
      
        /*
        Headers: Control the format of the request and response, provide authentication tokens, and specify accepted response formats.
        withCredentials: Ensures that cookies and authentication headers are sent with requests, especially for cross-origin scenarios.
         */
        console.log(response.data);
    } 
        catch (error) {
            console.error('Error occurred during registration:', error);
            toast.error(error.response.data.message);
        }
        finally{
          dispatch(setLoading(false));
        }
  };
  useEffect(()=>{
    if(user)
    {
      navigate("/");
    }
  },[])

  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center max-w-7xl mx-auto">
        <form onSubmit={submitHandler} className="w-1/2 border border-gray-200 rounded-md p-4 my-10">
          <h1 className="font-bold text-xl mb-5">Sign up</h1>
          <div className="my-2">
            <Label>Name</Label>
            <Input type="text" value={formData.Name} name="Name" onChange={changeEventHandler} placeholder="Krishna" />
          </div>
          <div className="my-2">
            <Label>Email</Label>
            <Input type="email" value={formData.email} name="email" onChange={changeEventHandler} placeholder="Krishna@gmail.com" />
          </div>
          <div className="my-2">
            <Label>Phone Number</Label>
            <Input type="number" value={formData.phoneNumber} name="phoneNumber" onChange={changeEventHandler} placeholder="99805****" />
          </div>
          <div className="my-2">
            <Label>Password</Label>
            <Input type="password" value={formData.password} name="password" onChange={changeEventHandler} placeholder="Krishna" />
          </div>
          <div className="flex justify-between items-center">
            <RadioGroup className="flex items-center gap-4 my-5">
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  checked={formData.role === 'student'}
                  onChange={changeEventHandler}
                  value="student"
                  className="cursor-pointer"
                />
                <Label htmlFor="r1">Student</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  checked={formData.role === 'Recruiter'}
                  onChange={changeEventHandler}
                  value="Recruiter"
                  className="cursor-pointer"
                />
                <Label htmlFor="r2">Recruiter</Label>
              </div>
            </RadioGroup>
            <div className="flex items-center gap-2">
              <Label>Profile:</Label>
              <Input
                accept="image/*"
                type="file"
                onChange={changeFileHandler}
                className="cursor-pointer"
              />
            </div>
          </div>
          {
            loading?<Button><Loader2 className='mr-2 h-4 w-2 animate-spin'/>Please Wait</Button>:<Button type="submit" className="w-full my-4">Signup</Button>
          }
          <span>Already have an account? <Link to="/login" className="text-red-600 font-bold">LOGIN</Link></span>
        </form>
      </div>
    </div>
  );
};

export default Signup;
