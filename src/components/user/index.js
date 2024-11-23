import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Book from "../book/Book";

const User = () => {
  const { id } = useParams(); // Extract ID from the route
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(
          `http://192.168.29.119:5050/api/get-user/${id}`
        );
        setUser(res?.data?.user);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
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
      <Book age={user?.age} message={user.message} name={user.name} />
    </div>
  );
};

export default User;
