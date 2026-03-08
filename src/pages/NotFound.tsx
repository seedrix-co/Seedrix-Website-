import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col bg-background text-foreground items-center justify-center">
      <Navbar />
      <div className="text-center">
        <h2 className="text-6xl font-bold font-display mb-4">404</h2>
        <p className="text-xl text-muted mb-8">Could not find requested resource</p>
        <Link to="/" className="px-6 py-3 bg-primary text-white rounded-full hover:opacity-90 transition">
          Return Home
        </Link>
      </div>
    </main>
  );
}
