import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { BirthdayCard } from '../Home/Birthday';
import Envelope from '../animation';
// import BOk from '../book/Book';
import Book from './../book/Book';
import BirthdayCake from '../github/birthdaycake';

const User = () => {
  const { id } = useParams(); 
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`http://192.168.29.47:5000/api/get-user/${id}`);
        setUser(res?.data?.user); // Set the user data if found
        setLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        console.error("Error fetching user data:", error);
        setLoading(false); // Stop loading if an error occurs
      }
    };

    fetchUser();
  }, [id]); 
  
  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>User not found.</div>;
  }

  return (
    <div>
      <h1>User Details</h1>
      <p>Name: {user.name}</p>
      <p>Age: {user.age}</p>
      <p>Message: {user.message}</p>
      <BirthdayCake/>

      {/* <Book name= {user.name} age={user.age} message={user.message}/> */}
    </div>
  );
};

export default User;
