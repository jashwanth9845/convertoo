import React, { Component } from "react";
import { Route, Routes } from "react-router-dom";
import HomeComponent from "./HomeComponent";
import HeaderComponent from "./headerComponent";

export default class MainComponent extends Component {
  render() {
    return (
      <>
        <HeaderComponent />
        <Routes>
          <Route path="/Home" element={<HomeComponent />} />
          <Route path="/" element={<HomeComponent />} />
        </Routes>
      </>
    );
  }
}
