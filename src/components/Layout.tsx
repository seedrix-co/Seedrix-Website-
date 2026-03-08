import { Outlet } from "react-router-dom";
import { SmoothScrollProvider } from "@/components/smooth-scroll";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PixelCheck from "@/components/PixelCheck";

export default function Layout() {
  return (
    <SmoothScrollProvider>
      <Navbar />
      <Outlet />
      <Footer />
      <PixelCheck />
    </SmoothScrollProvider>
  );
}
