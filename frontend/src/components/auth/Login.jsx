import React, { useEffect, useState } from 'react';
import Navbar from '../shared/Navbar';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { RadioGroup } from '../ui/radio-group';
import { Button } from '../ui/button';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'sonner';
import { USER_API_END_POINT } from '@/utils/constant';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading, setUser } from '@/redux/authSlice';
import { Loader2 } from 'lucide-react';

const Login = () => {
  const [inputData, setInputData] = useState({
    email: '',
    password: '',
    role: 'student', 
  });
  const {loading,user}=useSelector(store=>store.auth)
  const navigate = useNavigate();
  const dispatch=useDispatch();
  const changeEventHandler = (e) => {
    setInputData({
      ...inputData,
      [e.target.name]: e.target.value
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    // console.log(inputData);
    try {
      dispatch(setLoading(true));
      const response = await axios.post(`${USER_API_END_POINT}/login`, inputData, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });
      
      if (response.data.success) {
        dispatch(setUser(response.data.user));
        navigate('/');
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }

      console.log(response.data);
    } catch (error) {
      console.error('Error occurred during login:', error);
      toast.error(error.response?.data?.message || 'An error occurred during login.');
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
          <h1 className="font-bold text-xl mb-5">Login</h1>
          <div className="my-2">
            <Label>Email</Label>
            <Input 
              type="email" 
              value={inputData.email} 
              name="email" 
              onChange={changeEventHandler} 
              placeholder="example@gmail.com" 
              required 
            />
          </div>
          <div className="my-2">
            <Label>Password</Label>
            <Input 
              type="password" 
              value={inputData.password} 
              name="password" 
              onChange={changeEventHandler} 
              placeholder="Enter your password" 
              required 
            />
          </div>
          <div className="flex justify-between items-center">
            <RadioGroup className="flex items-center gap-4 my-5">
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  checked={inputData.role === 'student'}
                  onChange={changeEventHandler}
                  value="student"
                  className="cursor-pointer"
                />
                <Label htmlFor="role">Student</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  checked={inputData.role === 'Recruiter'}
                  onChange={changeEventHandler}
                  value="Recruiter"
                  className="cursor-pointer"
                />
                <Label htmlFor="role">Recruiter</Label>
              </div>
            </RadioGroup>
          </div>
          {
            loading?<Button><Loader2 className='mr-2 h-4 w-2 animate-spin'/>Please Wait</Button>:<Button type="submit" className="w-full my-4">Login</Button>
          }
          <span>Don't have an account? <Link to="/signup" className="text-red-600 font-bold">SIGNUP</Link></span>
        </form>
      </div>
    </div>
  );
};

export default Login;
