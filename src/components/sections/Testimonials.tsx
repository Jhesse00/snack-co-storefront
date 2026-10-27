import React, { useState } from 'react';
import { Star, MessageSquarePlus, Check, Sparkles, Quote } from 'lucide-react';
import { BRAND_CONFIG, Testimonial } from '../../config/snackConfig';
import { WavyDivider } from '../common/WavyDivider';

export const Testimonials: React.FC = () => {
  const [reviews, setReviews] = useState<Testimonial[]>(BRAND_CONFIG.testimonials);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [author, setAuthor] = useState('');
  const [role, setRole] = useState('');
  const [content, setContent] = useState('');
  const [flavor, setFlavor] = useState(BRAND_CONFIG.flavors[0].name);
  const [rating, setRating] = useState(5);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!author || !content) return;

    const newRev: Testimonial = {
      id: `rev-${Date.now()}`,
      author,
      role: role || 'Campus Snacker',
      content,
      rating,
      flavor,
      avatarBg: 'bg-amber-100 text-amber-800'
    };

    setReviews([newRev, ...reviews]);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setShowReviewForm(false);
      setAuthor('');
      setRole('');
      setContent('');
    }, 2000);
  };

  return (
    <section id="reviews-section" className="py-20 bg-snack-warm relative overflow-hidden">
      {/* Top wavy divider */}
      <div className="absolute top-0 left-0 right-0">
        <WavyDivider fillColor="#FFFDF7" bgColor="transparent" height={14} flip={true} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-4">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border-2 border-snack-dark shadow-playful-sm text-xs font-display font-bold text-snack-dark">
            <Sparkles size={14} className="text-amber-500 fill-amber-500" />
            <span>COMMUNITY FEEDBACK</span>
          </div>

          <h2 className="font-display font-black text-3xl sm:text-5xl text-snack-dark">
            TESTED & APPROVED ON CAMPUS
          </h2>

          <div className="flex items-center justify-center gap-2 text-amber-500 pt-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} size={22} className="fill-amber-400 text-amber-400" />
            ))}
            <span className="font-display font-extrabold text-xl text-snack-dark ml-2">4.9 / 5.0</span>
            <span className="text-gray-500 font-sans text-sm">(840+ verified student taste tests)</span>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.slice(0, 3).map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-4xl border-2 border-snack-dark p-7 shadow-playful hover:shadow-playful-lg transition-all duration-300 flex flex-col justify-between relative"
            >
              <Quote className="absolute top-6 right-6 text-snack-yellow/40 w-10 h-10 -z-0" />
              
              <div>
                {/* Rating Stars */}
                <div className="flex items-center gap-1 text-amber-400 mb-4">
                  {Array.from({ length: item.rating }).map((_, i) => (
                    <Star key={i} size={16} className="fill-amber-400" />
                  ))}
                </div>

                {/* Content */}
                <p className="font-sans text-sm text-gray-700 leading-relaxed italic mb-6">
                  "{item.content}"
                </p>
              </div>

              {/* Author & Flavor Tag */}
              <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                <div>
                  <h4 className="font-display font-bold text-sm text-snack-dark">
                    {item.author}
                  </h4>
                  <p className="font-sans text-xs text-gray-500">
                    {item.role}
                  </p>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-snack-warm text-[10px] font-display font-bold text-snack-dark border border-snack-dark/20">
                  {item.flavor.split(' ')[0]}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Add Review Action */}
        <div className="mt-12 text-center">
          {!showReviewForm ? (
            <button
              onClick={() => setShowReviewForm(true)}
              className="px-6 py-3 rounded-full bg-white hover:bg-snack-warm text-snack-dark font-display font-bold text-sm border-2 border-snack-dark shadow-playful hover:shadow-playful-sm active:translate-y-0.5 transition-all inline-flex items-center gap-2"
            >
              <MessageSquarePlus size={16} className="text-amber-600" />
              <span>Submit Student Review Simulation</span>
            </button>
          ) : (
            <form
              onSubmit={handleSubmitReview}
              className="max-w-xl mx-auto bg-white rounded-4xl border-2 border-snack-dark p-6 shadow-playful text-left space-y-4 animate-in fade-in"
            >
              <div className="flex items-center justify-between border-b pb-3">
                <h4 className="font-display font-bold text-base text-snack-dark">
                  Simulate A Review
                </h4>
                <button
                  type="button"
                  onClick={() => setShowReviewForm(false)}
                  className="text-xs text-gray-500 hover:text-black font-sans"
                >
                  Cancel
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-display font-bold text-gray-700 mb-1">
                    Your Name:
                  </label>
                  <input
                    type="text"
                    required
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    placeholder="e.g. Alex R."
                    className="w-full text-xs p-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-snack-yellow"
                  />
                </div>
                <div>
                  <label className="block text-xs font-display font-bold text-gray-700 mb-1">
                    Campus Role:
                  </label>
                  <input
                    type="text"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    placeholder="e.g. Stern Senior"
                    className="w-full text-xs p-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-snack-yellow"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-display font-bold text-gray-700 mb-1">
                  Flavor Reviewed:
                </label>
                <select
                  value={flavor}
                  onChange={(e) => setFlavor(e.target.value)}
                  className="w-full text-xs p-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-snack-yellow font-sans"
                >
                  {BRAND_CONFIG.flavors.map(f => (
                    <option key={f.id} value={f.name}>{f.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-display font-bold text-gray-700 mb-1">
                  Your Thoughts:
                </label>
                <textarea
                  required
                  rows={3}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="How was the crunch, flavor, and texture?"
                  className="w-full text-xs p-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-snack-yellow"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-full bg-snack-dark text-white font-display font-bold text-xs tracking-wide hover:bg-black transition-colors flex items-center justify-center gap-1.5"
              >
                {submitted ? (
                  <>
                    <Check size={14} className="text-emerald-400" />
                    <span>Review Added to Prototype!</span>
                  </>
                ) : (
                  <span>Post Review</span>
                )}
              </button>
            </form>
          )}
        </div>

      </div>
    </section>
  );
};
