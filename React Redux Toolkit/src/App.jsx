import Content from "./components/Content";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";

function App() {
  return (
    <>
      <Header />
      <div className='flex'>
        <Sidebar />
        <Content />
      </div>
    </>
  );
}

export default App;
