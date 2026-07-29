import React, { useState } from 'react';
import { Send, MapPin, Phone, Mail, Clock, CheckCircle, Sparkles } from 'lucide-react';
import { createContactMessage } from '../lib/dataService';

export const ContactSection: React.FC = () => {
  const [senderName, setSenderName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('');
  const [messageText, setMessageText] = useState('');
  
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!senderName || !email || !messageText) {
      setErrorMsg('Please fill in all required fields.');
      return;
    }

    setSubmitting(true);
    setErrorMsg('');

    try {
      await createContactMessage({
        senderName,
        email,
        phone,
        subject,
        messageText
      });
      setSuccess(true);
      setSenderName('');
      setEmail('');
      setPhone('');
      setSubject('');
      setMessageText('');
    } catch (err) {
      console.error("Error submitting contact message:", err);
      setErrorMsg('Failed to send message. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-stone-900 text-white relative overflow-hidden">
      
      {/* Background Sheen */}
      <div className="absolute inset-0 bg-gradient-to-br from-stone-900 via-emerald-950/40 to-amber-950/20 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Contact Details Column */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-widest px-3 py-1 bg-amber-400/10 border border-amber-400/30 rounded-full">
                Get In Touch
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white leading-tight">
                We'd Love to Hear From You
              </h2>
              <p className="text-stone-300 text-sm leading-relaxed">
                Have questions about custom suite reservations, private events, shuttle services, or dining options? Send us an inquiry and our front desk will reply promptly.
              </p>
            </div>

            <div className="space-y-6 pt-4 border-t border-stone-800">
              
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 flex-shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-amber-300">Resort Address</h3>
                  <p className="text-stone-300 text-sm">Batu Emas Boulevard No. 88, Golden Coast Resort Zone</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 flex-shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-amber-300">Direct Reservations</h3>
                  <p className="text-stone-300 text-sm">+1 (800) 888-GOLD / +1 (555) 321-4321</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 flex-shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-amber-300">Email Inquiry</h3>
                  <p className="text-stone-300 text-sm">reservations@batuemasinn.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 flex-shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-amber-300">Front Desk Hours</h3>
                  <p className="text-stone-300 text-sm">24 Hours / 7 Days a Week</p>
                </div>
              </div>

            </div>
          </div>

          {/* Contact Form Column */}
          <div className="lg:col-span-7 bg-stone-950/90 p-8 rounded-2xl border-2 border-amber-500/30 shadow-2xl backdrop-blur-md">
            
            <div className="mb-6">
              <h3 className="font-serif text-2xl font-bold text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-400" />
                Send an Inquiry Message
              </h3>
              <p className="text-xs text-stone-400 mt-1">
                Your message is sent directly to our admin inbox system.
              </p>
            </div>

            {success ? (
              <div className="bg-emerald-950/80 border-2 border-emerald-500 p-6 rounded-xl text-center space-y-3">
                <CheckCircle className="w-12 h-12 text-emerald-400 mx-auto" />
                <h4 className="font-serif text-xl font-bold text-white">Thank You for Contacting Us!</h4>
                <p className="text-sm text-stone-200">
                  Your inquiry message has been recorded into our messages database. Our reception team will review and reply to your email shortly.
                </p>
                <button
                  onClick={() => setSuccess(false)}
                  className="mt-4 px-6 py-2 bg-amber-500 text-stone-950 font-bold text-xs rounded-xl hover:bg-amber-400 transition-colors"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                
                {errorMsg && (
                  <div className="p-3 rounded-lg bg-red-950/80 border border-red-500 text-red-200 text-xs">
                    {errorMsg}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-stone-300 mb-1">
                      Your Full Name <span className="text-amber-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Jane Doe"
                      value={senderName}
                      onChange={(e) => setSenderName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-stone-900 border border-stone-700 text-white placeholder-stone-500 focus:outline-none focus:border-amber-400 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-300 mb-1">
                      Email Address <span className="text-amber-400">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="jane@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-stone-900 border border-stone-700 text-white placeholder-stone-500 focus:outline-none focus:border-amber-400 text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-stone-300 mb-1">
                      Phone Number (Optional)
                    </label>
                    <input
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-stone-900 border border-stone-700 text-white placeholder-stone-500 focus:outline-none focus:border-amber-400 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-300 mb-1">
                      Subject
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Suite Booking Inquiry"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-stone-900 border border-stone-700 text-white placeholder-stone-500 focus:outline-none focus:border-amber-400 text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-300 mb-1">
                    Message Text <span className="text-amber-400">*</span>
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Tell us about your trip dates, group requirements, or special requests..."
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-stone-900 border border-stone-700 text-white placeholder-stone-500 focus:outline-none focus:border-amber-400 text-sm resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 hover:from-amber-500 hover:to-yellow-600 text-stone-950 font-extrabold py-3 px-6 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 text-sm disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  <span>{submitting ? 'Submitting Message...' : 'Send Message Inquiry'}</span>
                </button>

              </form>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};
