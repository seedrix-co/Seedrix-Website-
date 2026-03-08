import { useNavigate } from "react-router-dom";
import ProfileCard from "@/components/ProfileCard";

export interface TeamProfileProps {
  name: string;
  role: string | string[];
  email: string;
  phone: string;
  website?: string;
  websiteLabel?: string;
  avatarUrl?: string;
}

export default function TeamProfile({
  name,
  role,
  email,
  phone,
  website = "https://www.seedrix.co",
  websiteLabel = "www.seedrix.co",
  avatarUrl = "/Logo.png",
}: TeamProfileProps) {
  const navigate = useNavigate();
  const title = Array.isArray(role) ? role.join(", ") : role;

  return (
    <main className="min-h-screen bg-black flex flex-col items-center justify-center px-4 py-24">
      <ProfileCard
        name={name}
        title={title}
        handle=""
        status="Seedrix"
        contactText="GET IN TOUCH"
        avatarUrl={avatarUrl}
        showUserInfo={true}
        enableTilt={true}
        enableMobileTilt={false}
        onContactClick={() => navigate("/contact")}
        behindGlowColor="rgba(69, 217, 163, 0.5)"
        behindGlowEnabled
        innerGradient="linear-gradient(145deg, rgba(20, 40, 30, 0.9) 0%, rgba(69, 217, 163, 0.15) 100%)"
        email={email}
        phone={phone}
        website={website}
        websiteLabel={websiteLabel}
      />
    </main>
  );
}
