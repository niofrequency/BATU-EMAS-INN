import React, { useState } from 'react';
import { Send, MapPin, Phone, Mail, Clock, CheckCircle, Sparkles, Instagram } from 'lucide-react';
import { createContactMessage } from '../lib/dataService';
import { useLanguage } from '../context/LanguageContext';
 
export const ContactSection: React.FC = () => {
  const { lang } = useLanguage();

  const [senderName, setSenderName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('');
  const [messageText, setMessageText] = useState('');
  
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Localized text dictionary for Contact Section
  const text = {
    en: {
      badge: "Get In Touch",
      heading: "We'd Love to Hear From You",
      description: "Have questions about room availability, meeting room bookings, or our in-house restaurant? Send us an inquiry and our front desk will reply promptly.",
      addressTitle: "Hotel Address",
      addressText: "Jl. Ahmad Yani No. 82, Kwamki, Timika, Mimika, Papua",
      reservationsTitle: "Direct Reservations",
      emailTitle: "Email Inquiry",
      hoursTitle: "Front Desk Hours",
      hoursText: "24 Hours / 7 Days a Week",
      instagramTitle: "Follow Us",
      formHeading: "Send an Inquiry Message",
      formSub: "Your message is sent directly to our admin inbox system.",
      successTitle: "Thank You for Contacting Us!",
      successDesc: "Your inquiry message has been recorded into our messages database. Our reception team will review and reply to your email shortly.",
      sendAnother: "Send Another Message",
      errorFill: "Please fill in all required fields.",
      errorFailed: "Failed to send message. Please try again.",
      nameLabel: "Your Full Name",
      emailLabel: "Email Address",
      phoneLabel: "Phone Number (Optional)",
      subjectLabel: "Subject",
      msgLabel: "Message Text",
      msgPlaceholder: "Tell us about your trip dates, group requirements, or special requests...",
      submittingBtn: "Submitting Message...",
      submitBtn: "Send Message Inquiry"
    },
    id: {
      badge: "Hubungi Kami",
      heading: "Kami Ingin Mendengar Dari Anda",
      description: "Punya pertanyaan tentang ketersediaan kamar, pemesanan ruang meeting, atau restoran kami? Kirimkan pertanyaan dan resepsionis kami akan segera membalas.",
      addressTitle: "Alamat Hotel",
      addressText: "Jl. Ahmad Yani No. 82, Kwamki, Timika, Mimika, Papua",
      reservationsTitle: "Reservasi Langsung",
      emailTitle: "Pertanyaan Email",
      hoursTitle: "Jam Meja Resepsionis",
      hoursText: "24 Jam / 7 Hari Seminggu",
      instagramTitle: "Ikuti Kami",
      formHeading: "Kirim Pesan Pertanyaan",
      formSub: "Pesan Anda dikirim langsung ke sistem inbox admin kami.",
      successTitle: "Terima Kasih Telah Menghubungi Kami!",
      successDesc: "Pesan pertanyaan Anda telah dicatat ke dalam database pesan kami. Tim resepsionis kami akan meninjau dan membalas email Anda segera.",
      sendAnother: "Kirim Pesan Lain",
      errorFill: "Harap isi semua bidang yang wajib diisi.",
      errorFailed: "Gagal mengirim pesan. Silakan coba lagi.",
      nameLabel: "Nama Lengkap Anda",
      emailLabel: "Alamat Email",
      phoneLabel: "Nomor Telepon (Optional)",
      subjectLabel: "Subjek",
      msgLabel: "Teks Pesan",
      msgPlaceholder: "Ceritakan tentang tanggal perjalanan Anda, kebutuhan grup, atau permintaan khusus...",
      submittingBtn: "Mengirim Pesan...",
      submitBtn: "Kirim Pertanyaan Pesan"
    }
  }[lang];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!senderName || !email || !messageText) {
      setErrorMsg(text.errorFill);
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
      setErrorMsg(text.errorFailed);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-stone-900 text-white relative overflow-hidden w-full">
      
      <div className="absolute inset-0 bg-gradient-to-br from-stone-900 via-emerald-950/40 to-amber-950/20 pointer-events-none" />

      <div className="relative z-10 w-full px-4 sm:px-8 lg:px-16 xl:px-24">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-widest px-3 py-1 bg-amber-400/10 border border-amber-400/30 rounded-full">
                {text.badge}
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white leading-tight">
                {text.heading}
              </h2>
              <p className="text-stone-300 text-sm leading-relaxed">
                {text.description}
              </p>
            </div>

            <div className="space-y-6 pt-4 border-t border-stone-800">
              
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 flex-shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-amber-300">{text.addressTitle}</h3>
                  <p className="text-stone-300 text-sm">{text.addressText}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 flex-shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-amber-300">{text.reservationsTitle}</h3>
                  <p className="text-stone-300 text-sm">+62 822-2664-4055</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 flex-shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-amber-300">{text.emailTitle}</h3>
                  <p className="text-stone-300 text-sm">batuemasinn@gmail.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 flex-shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-amber-300">{text.hoursTitle}</h3>
                  <p className="text-stone-300 text-sm">{text.hoursText}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 flex-shrink-0">
                  <Instagram className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-amber-300">{text.instagramTitle}</h3>
                  <a
                    href="https://www.instagram.com/batuemasinn"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-stone-300 text-sm hover:text-amber-300 transition-colors"
                  >
                    @batuemasinn
                  </a>
                </div>
              </div>

            </div>
          </div>

          <div className="lg:col-span-7 bg-stone-950/90 p-8 rounded-2xl border-2 border-amber-500/30 shadow-2xl backdrop-blur-md">
            
            <div className="mb-6">
              <h3 className="font-serif text-2xl font-bold text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-400" />
                {text.formHeading}
              </h3>
              <p className="text-xs text-stone-400 mt-1">
                {text.formSub}
              </p>
            </div>

            {success ? (
              <div className="bg-emerald-950/80 border-2 border-emerald-500 p-6 rounded-xl text-center space-y-3">
                <CheckCircle className="w-12 h-12 text-emerald-400 mx-auto" />
                <h4 className="font-serif text-xl font-bold text-white">{text.successTitle}</h4>
                <p className="text-sm text-stone-200">
                  {text.successDesc}
                </p>
                <button
                  onClick={() => setSuccess(false)}
                  className="mt-4 px-6 py-2 bg-amber-500 text-stone-950 font-bold text-xs rounded-xl hover:bg-amber-400 transition-colors"
                >
                  {text.sendAnother}
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
                      {text.nameLabel} <span className="text-amber-400">*</span>
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
                      {text.emailLabel} <span className="text-amber-400">*</span>
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
                      {text.phoneLabel}
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
                      {text.subjectLabel}
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
                    {text.msgLabel} <span className="text-amber-400">*</span>
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder={text.msgPlaceholder}
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
                  <span>{submitting ? text.submittingBtn : text.submitBtn}</span>
                </button>

              </form>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};
