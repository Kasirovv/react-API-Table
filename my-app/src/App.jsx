import React from "react";
import ToDoAdd from "./components/ToDoAdd";
import ToDoTable from "./components/ToDoTable";

function App() {
  return (
    <header className="w-[100%] h-[100vh] flex flex-col  items-center py-[5vh] bg-slate-400">
      <section className="text-center w-[50%] py-[2vh] text-[35px] text-slate-700 font-serif">
        Users Table
      </section>
      <section className="w-[100%] grid place-content-center">
          <ToDoAdd/>
          <ToDoTable/>
      </section>
    </header>
  );
}

export default App;
