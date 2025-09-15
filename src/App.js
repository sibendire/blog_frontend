import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CollapsibleBlog from "./components/NavBar";
import FooterComponent from "./components/Footer";
import HomePage from "./components/HomePage";
import PostList from "./components/PostList";
import PostForm from "./components/PostForm";
import PostEdit from "./components/PostEdit";
import ContactForm from "./components/ContactForm";
// import CategoryPage from "./components/CategoryPage";
import PostDetails from "./components/PostDetails";

function App() {
  // Optional callback for newly created posts
  const handlePostCreated = (post) => {
    console.log("New post created:", post);
    // You can also refresh post lists if needed
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <Router>
        {/* Navbar */}
        <CollapsibleBlog />

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
</Routes>
        </main>

        {/* Footer */}
        <FooterComponent />
      </Router>
    </div>
  );
}

export default App;
