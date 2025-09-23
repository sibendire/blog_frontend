import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CollapsibleBlog from "./components/NavBar";
import FooterComponent from "./components/Footer";
import HomePage from "./components/HomePage";
import PostList from "./components/PostList";
import PostForm from "./components/PostForm";
import PostEdit from "./components/PostEdit";
import ContactForm from "./components/ContactForm";
 import TopBar from "./components/TopBar";
import PostDetails from "./components/PostDetails";
import "./App.css";
 import Signup from "./components/Signup";
  import LoginForm from "./components/LoginForm";

import LatestSidebar from "./components/LatestSidebar";
function App() {
  const handlePostCreated = (post) => {
    console.log("New post created:", post);
  };

  return (
    <div className="App d-flex flex-column min-vh-100">
      <Router>
        {/* Navbar */}
        <TopBar />
        <CollapsibleBlog />
        <LatestSidebar />

        {/* Main content */}
        <main className="flex-grow-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/category/:category" element={<HomePage />} />
            <Route path="/posts" element={<PostList />} />
            <Route path="/new" element={<PostForm onPostCreated={handlePostCreated} />} />
            <Route path="/edit/:id" element={<PostEdit />} />
            <Route path="/contact" element={<ContactForm />} />
            <Route path="/post/:id" element={<PostDetails />} />
             <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<LoginForm />} />
          </Routes>
        </main>

        {/* Footer */}
        <FooterComponent />
      </Router>
    </div>
  );
}


export default App;
