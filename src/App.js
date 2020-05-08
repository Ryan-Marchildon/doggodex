import React from "react";

import Layout from "./containers/Layout/Layout";
import DogClassifier from "./containers/DogClassifier/DogClassifier";

function App() {
  return (
    <div className="App">
      <Layout>
        <DogClassifier />
      </Layout>
    </div>
  );
}

export default App;
