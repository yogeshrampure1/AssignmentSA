import React, { useState } from "react";
import Quiz from "./components/Quiz";

const App: React.FC = () => {
  return (
    <div className="App">
      <h1 className="header">TODO</h1>
      <Quiz />
    </div>
  );
};

export default App;
