import { Link } from "react-router-dom";

const socials = [
    { label: "Facebook", href: "https://www.facebook.com/profile.php?id=61587673930097" },
    { label: "Instagram", href: "https://www.instagram.com/seedrix.co/" },
    { label: "LinkedIn", href: "https://www.linkedin.com/company/seedrix-co/posts/?feedView=all" },
    { label: "Twitter", href: "https://twitter.com/seedrix" },
];

export default function Footer() {
    return (
        <footer className="bg-background py-12 border-t border-border/50">
            <div className="container mx-auto px-6 max-w-[1400px]">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
                    {/* Brand & tagline — centered on mobile, left on md+ */}
                    <div className="flex flex-col space-y-4 items-center text-center md:items-start md:text-left">
                        <Link to="/" className="flex items-center w-fit">
                            <img src="/Logo.png" alt="Logo" className="h-10 w-auto object-contain" />
                        </Link>
                        <p className="text-muted text-sm max-w-sm">
                            Digital transformation, software engineering, automation, and growth systems — built for scale.
                        </p>
                    </div>

                    {/* Contact & Socials — centered on mobile, left on sm+ */}
                    <div className="flex flex-col sm:flex-row items-center text-center sm:items-start sm:text-left gap-10 sm:gap-16">
                        <div>
                            <h4 className="text-xs font-bold uppercase tracking-widest text-muted mb-3">Contact</h4>
                            <ul className="space-y-2 text-sm font-medium">
                                <li>
                                    <a href="mailto:info@seedrix.co" className="text-foreground hover:text-primary transition-colors">
                                        info@seedrix.co
                                    </a>
                                </li>
                                <li>
                                    <a href="tel:+971544141077" className="text-foreground hover:text-primary transition-colors">
                                        +971 54 414 1077
                                    </a>
                                </li>
                                <li>
                                    <a href="tel:+971543178016" className="text-foreground hover:text-primary transition-colors">
                                        +971 54 317 8016
                                    </a>
                                </li>
                                <li className="text-muted">Dubai, UAE</li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-xs font-bold uppercase tracking-widest text-muted mb-3">Socials</h4>
                            <ul className="space-y-2">
                                {socials.map(({ label, href }) => (
                                    <li key={label}>
                                        <a
                                            href={href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-sm font-medium text-foreground hover:text-primary transition-colors"
                                        >
                                            {label}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="mt-10 pt-8 border-t border-border/50 flex flex-col sm:flex-row items-center justify-center sm:justify-between gap-4 text-xs text-muted text-center sm:text-left">
                    <p>&copy; {new Date().getFullYear()} SEEDRIX. All rights reserved.</p>
                    <div className="flex flex-wrap items-center justify-center gap-6">
                        <Link to="/about" className="hover:text-foreground transition-colors">About</Link>
                        <Link to="/#work" className="hover:text-foreground transition-colors">Work</Link>
                        <Link to="/contact" className="hover:text-foreground transition-colors">Contact</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
