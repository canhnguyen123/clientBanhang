import Header from "./inlcude/header"
import Main from "./inlcude/main";
import Footer from "./inlcude/footer"
import './css/App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer, toast } from 'react-toastify';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/free-mode';
import 'swiper/css/thumbs';
function App() {
  return (
    <div className="App">
        <ToastContainer />
      <Header/>
      <Main/>
      <Footer/>
    </div>
  );
}

export default App;
