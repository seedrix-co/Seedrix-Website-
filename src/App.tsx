import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "@/components/Layout";
import Home from "@/pages/Home";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import Waitlist from "@/pages/Waitlist";
import Works from "@/pages/Works";
import Asan from "@/pages/Asan";
import Sanji from "@/pages/Sanji";
import NotFound from "@/pages/NotFound";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="asan" element={<Asan />} />
          <Route path="asan/" element={<Asan />} />
          <Route path="sanji" element={<Sanji />} />
          <Route path="sanji/" element={<Sanji />} />
          <Route path="waitlist" element={<Waitlist />} />
          <Route path="works" element={<Works />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
