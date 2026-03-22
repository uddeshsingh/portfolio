import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, MapPin, Send, Loader2, CheckCircle2, Github, Linkedin } from "lucide-react";

const Contact = () => {
  const [formState, setFormState] = useState("idle");

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormState("sending");
    setTimeout(() => { 
      setFormState("success"); 
      setTimeout(() => setFormState("idle"), 3000); 
    }, 2000);
  };

  return (
    <div className="container-default flex-center min-h-screen relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#00f3ff]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-purple-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full max-w-5xl relative z-10">
        <div className="flex flex-col justify-center">
          <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
            <h2 className="text-5xl md:text-6xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-[--neon-blue] to-white">
              Initialize <br /> Transmission
            </h2>
            <p className="text-gray-400 text-lg mb-12 max-w-md leading-relaxed">
              I am currently open to discussing full-stack roles, cloud architecture projects, or AI collaborations.
            </p>
            <div className="flex flex-col gap-8">
              <ContactItem icon={<Mail size={24} />} label="Email Frequency" value="uddesh@utdallas.edu" href="mailto:uddesh@utdallas.edu" />
              <ContactItem icon={<MapPin size={24} />} label="Base Station" value="Dallas, TX, United States" />
              <div className="flex gap-4 mt-4">
                <SocialBtn icon={<Github size={20} />} href="https://github.com/uddeshsingh" label="GitHub" />
                <SocialBtn icon={<Linkedin size={20} />} href="https://linkedin.com/in/uddeshsingh" label="LinkedIn" />
              </div>
            </div>
          </motion.div>
        </div>

        <div className="relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotateY: 10 }}
            whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, type: "spring" }}
            className="glass-panel relative p-8 rounded-3xl overflow-hidden group bg-white/5 perspective-1000"
          >
            <CornerStyles />
            <AnimatePresence mode="wait">
              {formState === "success" ? (
                <SuccessMessage key="success" />
              ) : (
                <motion.form 
                  key="form" 
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  onSubmit={handleSubmit} 
                  className="flex flex-col gap-6 relative z-10"
                >
                  <div className="grid grid-cols-2 gap-6">
                    <InputGroup label="Identity" placeholder="Name" />
                    <InputGroup label="Coordinates" placeholder="Email" type="email" />
                  </div>
                  <InputGroup label="Transmission" placeholder="Message..." textarea />
                  <motion.button 
                    whileHover={{ scale: 1.02 }} 
                    whileTap={{ scale: 0.95 }} 
                    type="submit" 
                    disabled={formState === "sending"} 
                    className="btn-primary group/btn"
                  >
                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300" />
                    {formState === "sending" ? (
                      <> <Loader2 className="animate-spin" size={20} /> <span>Transmitting...</span> </>
                    ) : (
                      <> <Send size={20} className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" /> <span>Send Signal</span> </>
                    )}
                  </motion.button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

const ContactItem = ({ icon, label, value, href }) => (
  <motion.div whileHover={{ x: 10 }} className="flex items-center gap-4 group cursor-default">
    <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex-center text-[--neon-blue] group-hover:bg-[--neon-blue] group-hover:text-black transition-colors duration-300 shadow-[0_0_15px_rgba(0,0,0,0.5)]">{icon}</div>
    <div>
      <p className="text-xs font-mono text-gray-500 uppercase tracking-widest mb-1">{label}</p>
      {href ? <a href={href} className="text-lg text-white font-medium hover:text-[--neon-blue] transition-colors">{value}</a> : <p className="text-lg text-white font-medium">{value}</p>}
    </div>
  </motion.div>
);

const SocialBtn = ({ icon, href, label }) => (
  <motion.a 
    whileHover={{ scale: 1.2, rotate: 5 }} 
    whileTap={{ scale: 0.9 }} 
    href={href} 
    aria-label={label} 
    target="_blank" 
    rel="noreferrer" 
    className="social-icon"
  >
    {icon}
  </motion.a>
);

const InputGroup = ({ label, placeholder, type = "text", textarea }) => (
  <motion.div 
    whileHover={{ scale: 1.02 }} 
    className="flex flex-col gap-2 group"
  >
    <label className="text-xs font-mono text-[--neon-blue]/80 uppercase tracking-wider ml-1 group-focus-within:text-[--neon-blue] transition-colors">{label}</label>
    {textarea ? (
      <textarea placeholder={placeholder} rows={4} className="input-field resize-none" />
    ) : (
      <input type={type} placeholder={placeholder} className="input-field" />
    )}
  </motion.div>
);

const SuccessMessage = () => (
  <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} className="h-[400px] flex-center flex-col text-center p-6">
    <motion.div 
      initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", bounce: 0.5 }}
      className="w-20 h-20 rounded-full bg-green-500/20 text-green-400 flex-center mb-6 shadow-[0_0_30px_rgba(34,197,94,0.3)]"
    >
      <CheckCircle2 size={40} />
    </motion.div>
    <h3 className="text-3xl font-bold text-white mb-2">Transmission Received</h3>
    <p className="text-gray-400">Your signal has been locked in. I'll re-establish communication shortly.</p>
  </motion.div>
);

const CornerStyles = () => (
  <>
    <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[--neon-blue] rounded-tl-xl opacity-50 group-hover:opacity-100 transition-opacity" />
    <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[--neon-blue] rounded-tr-xl opacity-50 group-hover:opacity-100 transition-opacity" />
    <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-[--neon-blue] rounded-bl-xl opacity-50 group-hover:opacity-100 transition-opacity" />
    <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[--neon-blue] rounded-br-xl opacity-50 group-hover:opacity-100 transition-opacity" />
  </>
);

export default Contact;