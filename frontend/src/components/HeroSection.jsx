import React, { useState } from 'react';
import { Button } from './ui/button';
import { Search } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
  const [query,setQuery]=useState("");
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const searchJobHandler=()=>
  {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  }

  return (
    <div className='text-center py-10'>
      <div className='flex flex-col gap-6 my-10'>
        <span className='px-4 py-2 rounded-full bg-gray-100 text-[#F83002] font-medium mx-auto'>
          A Perfect Place for Finding Your Dream Job
        </span>
        <h1 className='text-5xl font-bold leading-tight'>
          Hunt & <br /> Get Your <span className='text-[#6A38C2]'>Dream Job</span>
        </h1>
        <p className='text-gray-600 max-w-md mx-auto'>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sunt veniam corrupti facilis corporis quia.
        </p>
        <div className='w-full max-w-lg mx-auto flex items-center shadow-lg border border-gray-200 pl-4 rounded-full gap-4'>
          <input
            type='text'
            placeholder='Find your dream job'
            onChange={(e)=>setQuery(e.target.value)}
            className='flex-grow bg-transparent focus:outline-none py-3 text-gray-700 placeholder-gray-400'
          />
          <Button onClick={searchJobHandler} className='rounded-full bg-[#6A38C2] p-3'>
            <Search className='h-5 w-5 text-white' />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
