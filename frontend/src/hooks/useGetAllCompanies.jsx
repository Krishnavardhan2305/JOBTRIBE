import { setCompanies } from '@/redux/companySlice';
// import { setAllJobs } from '@/redux/jobSlice';
import { COMPANY_API_END_POINT } from '@/utils/constant';
import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';

const useGetAllCompanies = (companyId) => {
    const dispatch=useDispatch();
  useEffect(()=>{
    const fetchComapnies=async()=>
    {
        try 
        {
            const res=await axios.get(`${COMPANY_API_END_POINT}/get`,{withCredentials:true});
            if(res.data.success)
            {
                dispatch(setCompanies(res.data.companies));
            }
        } 
        catch (error) 
        {
            console.log(error);
        }
    }
    fetchComapnies();
  },[])
}

export default useGetAllCompanies;
