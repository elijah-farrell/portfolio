import { useState, useEffect, useRef } from 'react';
import { collection, addDoc, orderBy, query, onSnapshot, serverTimestamp } from 'firebase/firestore';
import { db } from '../../../firebase/config';
import emailjs from '@emailjs/browser';
import { FadeInOnScroll, HoverCard } from "@/components/ScrollReveal";

interface ContactSectionProps {
  currentColor: string;
}

interface Comment {
  id: string;
  content: string;
  name?: string;
  email?: string;
  createdAt: any;
}

export default function ContactSection({ currentColor }: ContactSectionProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [showPreview, setShowPreview] = useState(false);
  const [previewData, setPreviewData] = useState({
    name: '',
    email: '',
    content: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const chatWindowRef = useRef<HTMLDivElement>(null);

  // Real Firebase function to add comment
  const addComment = async (commentData: Omit<Comment, 'id'>) => {
    try {
      const docRef = await addDoc(collection(db, 'comments'), {
        content: commentData.content,
        name: commentData.name || null,
        email: commentData.email || null,
        createdAt: serverTimestamp()
      });
      
      return docRef;
    } catch (error) {
      console.error('Error adding comment:', error);
      throw error;
    }
  };

  // Email notification function using EmailJS
  const sendEmailNotification = async (comment: any) => {
    const templateParams = {
      to_email: 'elijah5003@gmail.com',
      from_name: comment.name || 'Anonymous',
      from_email: comment.email || 'N/A (No email provided)',
      message: comment.content,
      reply_to: comment.email || 'noreply@portfolio.com',
      subject: 'New Comment on Your Portfolio',
      timestamp: new Date().toLocaleString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    };

    // EmailJS credentials from environment variables
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    // Skip email if template ID is invalid
    if (!templateId) {
      console.warn('⚠️ EmailJS template ID is missing. Skipping email notification.');
      return;
    }

    try {
      await emailjs.send(serviceId, templateId, templateParams, publicKey);
    } catch (error) {
      console.error('❌ Email notification failed:', error);
      // Don't throw error - comments should still be saved even if email fails
    }
  };

  // Load comments from Firebase
  useEffect(() => {
    const q = query(collection(db, 'comments'), orderBy('createdAt', 'asc'));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const commentsData: Comment[] = [];
      snapshot.forEach((doc) => {
        commentsData.push({
          id: doc.id,
          ...doc.data()
        } as Comment);
      });
      setComments(commentsData);
      
      // Auto-scroll to bottom when new comments are added
      if (commentsData.length > 0 && chatWindowRef.current) {
        setTimeout(() => {
          chatWindowRef.current?.scrollTo({
            top: chatWindowRef.current.scrollHeight,
            behavior: 'smooth'
          });
        }, 100);
      }
    }, (error) => {
      // Silently handle errors for manual deletions or network issues
      // Only log critical errors that might indicate configuration issues
      if (error.code !== 'permission-denied' && error.code !== 'unavailable') {
        console.error('Firebase listener error:', error);
      }
    });

    return () => unsubscribe();
  }, []);

  // Auto-scroll to bottom when comments change
  useEffect(() => {
    if (comments.length > 0 && chatWindowRef.current) {
      chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
    }
  }, [comments]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    
    setPreviewData({
      name: '',
      email: '',
      content: newComment
    });
    setShowPreview(true);
  };

  const handleConfirmComment = async () => {
    setIsSubmitting(true);
    
    try {
      // Validate email if provided
      if (previewData.email && !previewData.email.includes('@')) {
        alert('Please enter a valid email address.');
        return;
      }

      // Add comment to Firebase
      await addComment({
        content: previewData.content,
        name: previewData.name || undefined,
        email: previewData.email || undefined,
        createdAt: new Date()
      });

      // Send email notification
      await sendEmailNotification({
        name: previewData.name,
        email: previewData.email,
        content: previewData.content
      });

      // Reset form
      setNewComment('');
      setShowPreview(false);
      setPreviewData({ name: '', email: '', content: '' });
      
      // Auto-scroll to bottom after posting
      setTimeout(() => {
        if (chatWindowRef.current) {
          chatWindowRef.current.scrollTo({
            top: chatWindowRef.current.scrollHeight,
            behavior: 'smooth'
          });
        }
      }, 200);
    } catch (error) {
      console.error('Error posting comment:', error);
      alert('Failed to post comment. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatDate = (date: any) => {
    if (!date) return '';
    const d = date.toDate ? date.toDate() : new Date(date);
    return d.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <section id="contact-form" className="py-20 px-4 sm:px-6 bg-gray-50 dark:bg-neutral-900">
      <div className="max-w-7xl mx-auto">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <FadeInOnScroll direction="right" duration={800} delay={400} elementId="contact-info">
            <div className="bg-white dark:bg-neutral-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-neutral-700 flex flex-col h-full">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Contact Information
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
              <a href="https://maps.google.com/?q=Watertown,NY" target="_blank" rel="noopener noreferrer" className="block">
                <HoverCard scale={1.02} shadowIntensity={15} className="bg-white dark:bg-neutral-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-neutral-700 h-full flex items-center">
                  <div className="flex items-center gap-4 w-full">
                    <div 
                      className="w-12 h-12 rounded-lg flex items-center justify-center text-white flex-shrink-0"
                      style={{ backgroundColor: currentColor }}
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-1">Location</h4>
                      <p className="text-gray-600 dark:text-gray-300">Watertown, NY</p>
                    </div>
                  </div>
                </HoverCard>
              </a>

              <a href="tel:3158040601" className="block">
                <HoverCard scale={1.02} shadowIntensity={15} className="bg-white dark:bg-neutral-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-neutral-700 h-full flex items-center">
                  <div className="flex items-center gap-4 w-full">
                    <div 
                      className="w-12 h-12 rounded-lg flex items-center justify-center text-white flex-shrink-0"
                      style={{ backgroundColor: currentColor }}
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-1">Phone</h4>
                      <p className="text-gray-600 dark:text-gray-300">(315) 804‑0601</p>
                    </div>
                  </div>
                </HoverCard>
              </a>

              <a href="mailto:elijah5003@gmail.com" className="block">
                <HoverCard scale={1.02} shadowIntensity={15} className="bg-white dark:bg-neutral-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-neutral-700 h-full flex items-center">
                  <div className="flex items-center gap-4 w-full">
                    <div 
                      className="w-12 h-12 rounded-lg flex items-center justify-center text-white flex-shrink-0"
                      style={{ backgroundColor: currentColor }}
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-1">Email</h4>
                      <p className="text-gray-600 dark:text-gray-300 text-sm">elijah5003@gmail.com</p>
                    </div>
                  </div>
                </HoverCard>
              </a>

              <a href="https://github.com/elijah-farrell" target="_blank" rel="noopener noreferrer" className="block">
                <HoverCard scale={1.02} shadowIntensity={15} className="bg-white dark:bg-neutral-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-neutral-700 h-full flex items-center">
                  <div className="flex items-center gap-4 w-full">
                    <div 
                      className="w-12 h-12 rounded-lg flex items-center justify-center text-white flex-shrink-0"
                      style={{ backgroundColor: currentColor }}
                    >
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-1">GitHub</h4>
                      <p className="text-gray-600 dark:text-gray-300">elijah-farrell</p>
                    </div>
                  </div>
                </HoverCard>
              </a>

              <a href="https://discord.com/users/zarnx" target="_blank" rel="noopener noreferrer" className="block">
                <HoverCard scale={1.02} shadowIntensity={15} className="bg-white dark:bg-neutral-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-neutral-700 h-full flex items-center">
                  <div className="flex items-center gap-4 w-full">
                    <div 
                      className="w-12 h-12 rounded-lg flex items-center justify-center text-white flex-shrink-0"
                      style={{ backgroundColor: currentColor }}
                    >
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419-.019 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1568 2.4189Z"/>
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-1">Discord</h4>
                      <p className="text-gray-600 dark:text-gray-300">zarnx</p>
                    </div>
                  </div>
                </HoverCard>
              </a>

              <a href="https://www.linkedin.com/in/elijah-farrell-915047349" target="_blank" rel="noopener noreferrer" className="block">
                <HoverCard scale={1.02} shadowIntensity={15} className="bg-white dark:bg-neutral-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-neutral-700 h-full flex items-center">
                  <div className="flex items-center gap-4 w-full">
                    <div 
                      className="w-12 h-12 rounded-lg flex items-center justify-center text-white flex-shrink-0"
                      style={{ backgroundColor: currentColor }}
                    >
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-1">LinkedIn</h4>
                      <p className="text-gray-600 dark:text-gray-300">elijah-farrell</p>
                    </div>
                  </div>
                </HoverCard>
              </a>
            </div>
          </div>
        </FadeInOnScroll>

          {/* Comment Section */}
          <FadeInOnScroll direction="left" duration={800} delay={600} elementId="contact-comments">
            <div className="bg-white dark:bg-neutral-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-neutral-700">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Leave a Comment
            </h3>
            
            {/* Comments Display */}
            <div 
              ref={chatWindowRef}
              className="h-64 overflow-y-auto mb-6 space-y-4 border border-gray-200 dark:border-neutral-500 rounded-lg p-4 bg-gray-50 dark:bg-neutral-600"
            >
              {comments.length === 0 ? (
                <p className="text-gray-500 dark:text-gray-400 text-center py-8">
                  No comments yet. Be the first to leave a comment!
                </p>
              ) : (
                comments.map((comment) => (
                  <div key={comment.id} className="bg-white dark:bg-neutral-800 rounded-lg p-4 shadow-sm">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-semibold"
                          style={{ backgroundColor: currentColor }}
                        >
                          {(comment.name || 'Anonymous').charAt(0).toUpperCase()}
                        </div>
                        <span className="font-semibold text-gray-900 dark:text-white">
                          {comment.name || 'Anonymous'}
                        </span>
                      </div>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {formatDate(comment.createdAt)}
                      </span>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                      {comment.content}
                    </p>
                  </div>
                ))
              )}
            </div>

            {/* Comment Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Your comment..."
                className="w-full p-4 border border-gray-200 dark:border-neutral-500 rounded-lg bg-white dark:bg-neutral-600 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 resize-y focus:ring-2 focus:ring-blue-500 focus:border-transparent min-h-[80px] max-h-48"
                rows={3}
                required
              />
              <button
                type="submit"
                className="w-full px-6 py-3 text-white rounded-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center justify-center gap-2"
                style={{ backgroundColor: currentColor }}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"/>
                </svg>
                <span>Send Comment</span>
              </button>
            </form>
          </div>
        </FadeInOnScroll>
        </div>
      </div>

      {/* Preview Modal */}
      {showPreview && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-neutral-800 rounded-2xl p-8 max-w-md w-full max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Preview Your Comment
            </h3>
            
            <div className="space-y-4 mb-6">
                             <div>
                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                   Name (optional) - <span className="text-orange-600 dark:text-orange-400 font-semibold">Will be displayed publicly</span>
                 </label>
                 <input
                   type="text"
                   value={previewData.name}
                   onChange={(e) => setPreviewData(prev => ({ ...prev, name: e.target.value }))}
                   className="w-full p-3 border border-gray-200 dark:border-neutral-500 rounded-lg bg-white dark:bg-neutral-600 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                   placeholder="Your name"
                 />
               </div>
               
               <div>
                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                   Email (optional) - <span className="text-green-600 dark:text-green-400 font-semibold">Private, only shared with me</span>
                 </label>
                 <input
                   type="email"
                   value={previewData.email}
                   onChange={(e) => setPreviewData(prev => ({ ...prev, email: e.target.value }))}
                   className="w-full p-3 border border-gray-200 dark:border-neutral-500 rounded-lg bg-white dark:bg-neutral-600 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                   placeholder="your.email@example.com"
                 />
               </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Comment
                </label>
                <div className="p-3 border border-gray-200 dark:border-neutral-500 rounded-lg bg-gray-50 dark:bg-neutral-600 text-gray-700 dark:text-gray-300">
                  {previewData.content}
                </div>
              </div>
            </div>
            
            <div className="flex gap-3">
              <button
                onClick={() => setShowPreview(false)}
                className="flex-1 px-4 py-2 border border-gray-300 dark:border-neutral-500 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-neutral-600 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmComment}
                disabled={isSubmitting}
                className="flex-1 px-4 py-2 text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-200 disabled:opacity-50"
                style={{ backgroundColor: currentColor }}
              >
                {isSubmitting ? 'Posting...' : 'Post Comment'}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
} 