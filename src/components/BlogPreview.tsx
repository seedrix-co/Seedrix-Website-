import { motion } from "framer-motion";
import { fadeUpVariant, staggerContainer, viewportReveal, viewportRevealEarly } from "@/lib/motion";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";

export default function BlogPreview() {
    const posts = [
        {
            title: "The Future of Web Motion",
            category: "Design",
            date: "Oct 12, 2024",
            img: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=800&auto=format&fit=crop",
        },
        {
            title: "Optimizing Next.js for Performance",
            category: "Engineering",
            date: "Nov 05, 2024",
            img: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?q=80&w=800&auto=format&fit=crop",
        },
        {
            title: "Building Consistent Brand Guidelines",
            category: "Branding",
            date: "Dec 18, 2024",
            img: "https://images.unsplash.com/photo-1600132806370-bf17e65e942f?q=80&w=800&auto=format&fit=crop",
        }
    ];

    return (
        <section className="py-[var(--spacing-section)] border-y border-border/50 bg-card">
            <div className="container mx-auto px-6 max-w-[1400px]">
                {/* Header */}
                <motion.div
                    initial="hidden" whileInView="visible" viewport={viewportReveal} variants={fadeUpVariant}
                    className="flex flex-col md:flex-row md:items-end justify-between mb-16"
                >
                    <h2 className="text-5xl md:text-7xl font-display uppercase tracking-tight">
                        Latest <span className="text-primary">Insights</span>
                    </h2>
                    <Link to="/blog" className="mt-6 md:mt-0 text-primary uppercase tracking-widest text-sm font-bold hover:underline underline-offset-4">
                        View All Posts
                    </Link>
                </motion.div>

                {/* Blog Cards */}
                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewportRevealEarly}
                    className="grid grid-cols-1 md:grid-cols-3 gap-8"
                >
                    {posts.map((post, i) => (
                        <motion.div key={i} variants={fadeUpVariant}>
                            <Link to={`/blog/${i}`}>
                                <Card className="border-transparent bg-transparent shadow-none hover:shadow-none hover:-translate-y-2 transition-transform duration-500 group overflow-hidden cursor-pointer">
                                    <div className="aspect-[4/3] relative rounded-2xl overflow-hidden mb-6">
                                        <img
                                            src={post.img}
                                            alt={post.title}
                                            className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                                        />
                                    </div>
                                    <div className="flex flex-col space-y-3">
                                        <div className="flex items-center space-x-4 text-xs font-bold uppercase tracking-widest text-muted">
                                            <span className="text-primary">{post.category}</span>
                                            <span>{post.date}</span>
                                        </div>
                                        <h3 className="text-2xl font-display uppercase tracking-wider group-hover:text-primary transition-colors">
                                            {post.title}
                                        </h3>
                                    </div>
                                </Card>
                            </Link>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
