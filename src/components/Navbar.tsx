import StaggeredMenu from "@/components/StaggeredMenu";

const menuItems = [
  { label: "Home", ariaLabel: "Go to home page", link: "/" },
  { label: "About", ariaLabel: "Learn about us", link: "/about" },
  { label: "Works", ariaLabel: "View our works", link: "/#work" },
  { label: "Contact", ariaLabel: "Get in touch", link: "/contact" },
];

const socialItems = [
  { label: "Facebook", link: "https://www.facebook.com/profile.php?id=61587673930097" },
  { label: "Instagram", link: "https://www.instagram.com/seedrix.co/" },
  { label: "LinkedIn", link: "https://www.linkedin.com/company/seedrix-co/posts/?feedView=all" },
  { label: "Twitter", link: "https://twitter.com/seedrix" },
];

export default function Navbar() {
  return (
    <StaggeredMenu
      position="right"
      items={menuItems}
      socialItems={socialItems}
      displaySocials
      displayItemNumbering
      menuButtonColor="#ffffff"
      openMenuButtonColor="#fff"
      changeMenuColorOnOpen
      colors={["#181818", "#222"]}
      logoUrl="/Logo.png"
      accentColor="var(--color-primary, #45d9a3)"
      isFixed
      closeOnClickAway
    />
  );
}
