import React, { useEffect } from 'react'
import Navbar from './shared/Navbar'
import HeroSection from './HeroSection'
import CategoryCarousel from './CategoryCarousel'
import LatestJobs from './LatestJobs'
import Footer from './Footer'
import useGetAllJobs from '@/hooks/useGetAllJobs'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const navigate = useNavigate();
  const { user } = useSelector(store => store.auth);

  // Redirect recruiter properly
  useEffect(() => {
    if (user?.role === 'Recruiter') {
      navigate("/admin/companies");
    }
  }, [user, navigate]);

  useGetAllJobs();

  return (
    <div>
      <Navbar />
      <HeroSection />
      <CategoryCarousel />
      <LatestJobs />
      <Footer />
    </div>
  )
}

export default Home
