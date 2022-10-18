import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loadUsersStart } from "../redux/actions";

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUsersStart());
  }, []);

  return (
    <div>
      <h2>Home</h2>
    </div>
  );
};

export default Home;
