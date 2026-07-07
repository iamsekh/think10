import { motion } from 'motion/react';
import { ArrowRight, Clock } from 'lucide-react';
import { BLOG_POSTS } from '../data';

export default function Blogs() {
  return (
    <section id="insights" className="py-24 bg-white relative overflow-hidden">
      {/* Pastel Wave */}
      <div
        className="absolute inset-0 z-0 opacity-40 pointer-events-none"
        style={{
          background: "linear-gradient(120deg, #d5c5ff 0%, #a7f3d0 50%, #f0f0f0 100%)"
        }}
      />
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 space-y-4 md:space-y-0">
          <div className="max-w-2xl">
            <h2 className="font-heading font-extrabold text-[#0B1220] text-3xl md:text-4xl tracking-tight mb-4">
              Insights & <span className="text-[#059669]">Strategies</span>
            </h2>
            <p className="font-sans text-[#475569] text-lg">
              Actionable advice on scaling e-commerce, optimizing supply chains, and integrating AI into retail operations.
            </p>
          </div>
          <button className="flex items-center space-x-2 text-[#0B1220] font-heading font-bold text-sm hover:text-[#059669] transition-colors group">
            <span>View All Articles</span>
            <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {BLOG_POSTS.map((post, idx) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="group cursor-pointer flex flex-col"
            >
              <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden mb-6">
                <img 
                  src={post.imageUrl} 
                  alt={post.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-mono font-bold text-[#0B1220] uppercase tracking-wider shadow-sm">
                    {post.category}
                  </span>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 text-[#475569] text-xs font-mono mb-3">
                <span>{post.date}</span>
                <span className="w-1 h-1 rounded-full bg-[#E2E8F0]"></span>
                <div className="flex items-center space-x-1">
                  <Clock className="w-3 h-3" />
                  <span>{post.readTime}</span>
                </div>
              </div>

              <h3 className="font-heading font-bold text-[#0B1220] text-xl leading-tight mb-3 group-hover:text-[#059669] transition-colors">
                {post.title}
              </h3>
              
              <p className="font-sans text-[#475569] text-sm leading-relaxed mb-4 flex-1">
                {post.excerpt}
              </p>

              <div className="mt-auto pt-4 border-t border-[#E2E8F0]">
                <span className="text-[#059669] font-heading font-bold text-sm flex items-center space-x-1">
                  <span>Read Article</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
