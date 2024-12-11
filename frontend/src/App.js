import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import TodoList from './components/TodoList';
import Login from './components/Login';
import Register from './components/Register';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<TodoList/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
