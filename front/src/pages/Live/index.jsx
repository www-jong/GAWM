import axios from "axios";
import React, { Component } from "react";
import { useEffect, useState } from "react";
import { fetchUserInfo, useUserStore } from "../../stores/user.js";
import Live from "./App";

function LiveHome() {
  const user = useUserStore();
  console.log(user.user.nickname);

  useEffect(() => {
    fetchUserInfo();
  }, []);

  return (
    <>
      <Live />
    </>
  );
}
export default LiveHome;
