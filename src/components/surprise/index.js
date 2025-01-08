import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Book from "../book/Book";
import Loader from "../../shared/Loader";

const User = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(
          `https://birthday-cake-backend-1.onrender.com/api/get-user/${id}`
        );

        console.log("response from user: ", res?.data);
        setUser(res?.data?.user);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  return (
    <div className="relative">
      {loading && <Loader loading={loading} />}
      <div
        className="bg-center bg-no-repeat bg-opacity-50 bg-cover min-h-screen opacity-80 "
        style={{ backgroundImage: "url(/assets/main.jpg)" }}
      >
        {user && (
          <>
            <Book age={user?.age} message={user?.message} name={user.name} />
            <div className="flex  md:flex-row flex-col justify-center md:gap-2 px-5 my-3 font-[500] items-center lg:mt-8 md:mt-10 mt-7 mx-auto">
              <p className="text-lg">
                Create Surprise Birthday Wishes for friends{" "}
              </p>
              <Link to={"https://www.waiwishes.com"}>
                <span className="font-[600] text-center inline-flex underline">
                  Click Here
                </span>
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default User;
