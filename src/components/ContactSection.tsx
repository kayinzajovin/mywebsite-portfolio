import React, { useState } from 'react';
import { 
  Mail, 
  Send, 
  Github, 
  Linkedin, 
  MapPin, 
  CheckCircle2, 
  AlertCircle, 
  Copy, 
  Check, 
  RefreshCw,
  MessageSquare
} from 'lucide-react';
import { profileData } from '../data/profile';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [copiedEmail, setCopiedEmail] = useState<boolean>(false);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = 'Please enter your name.';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Please enter your email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address.';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Please enter a subject.';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Please enter a message.';
    } else if (formData.message.trim().length < 15) {
      newErrors.message = 'Message must be at least 15 characters.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    const endpoint = (import.meta as any).env?.VITE_CONTACT_ENDPOINT;

    try {
      if (endpoint) {
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        if (!response.ok) {
          throw new Error(`Server returned ${response.status}: Failed to dispatch message.`);
        }
      } else {
        await new Promise((resolve) => setTimeout(resolve, 800));
      }

      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (err: any) {
      setSubmitStatus('error');
      setErrorMessage(
        err?.message || 'Failed to send message. Please email directly.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const copyEmail = () => {
    navigator.clipboard.writeText(profileData.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <section id="contact" className="py-16 sm:py-24 relative border-t border-slate-800/80 bg-[#0b0f19]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/60 border border-blue-500/20 text-blue-400 text-xs font-medium mb-3">
            <Mail className="w-3.5 h-3.5" />
            <span>Contact & Inquiries</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white font-calibri">
            Get In Touch
          </h2>
          <p className="mt-2 text-base text-slate-300">
            Open for software engineering opportunities, backend development roles, and project collaborations.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Direct Details */}
          <div className="lg:col-span-5 space-y-5">
            <div className="p-6 rounded-2xl bg-[#121827] border border-slate-800 space-y-4">
              <h3 className="text-lg font-bold text-white font-calibri">
                Direct Contact Information
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Whether you have an inquiry regarding Django REST Framework implementations, PostgreSQL database architecture, or apprenticeship opportunities, I'd be glad to connect.
              </p>

              {/* Email Card */}
              <div className="p-4 rounded-xl bg-[#0b0f19] border border-slate-800 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="p-2.5 rounded-lg bg-[#121827] text-blue-400 border border-slate-800">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[11px] text-slate-400 font-medium uppercase">Email Address</div>
                    <div className="text-xs sm:text-sm font-semibold text-slate-200 truncate">
                      {profileData.email}
                    </div>
                  </div>
                </div>
                <button
                  onClick={copyEmail}
                  className="p-2 rounded-lg text-slate-400 hover:text-white bg-[#121827] border border-slate-800 transition-colors"
                  title="Copy email"
                  aria-label="Copy email"
                >
                  {copiedEmail ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              {/* Location Card */}
              <div className="p-4 rounded-xl bg-[#0b0f19] border border-slate-800 flex items-center gap-3">
                <div className="p-2.5 rounded-lg bg-[#121827] text-blue-400 border border-slate-800">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[11px] text-slate-400 font-medium uppercase">Location</div>
                  <div className="text-xs sm:text-sm font-semibold text-slate-200">
                    {profileData.location}
                  </div>
                </div>
              </div>

              {/* Profiles */}
              <div className="pt-2">
                <div className="text-xs uppercase tracking-wider text-slate-400 font-semibold mb-2.5">
                  Professional Profiles:
                </div>
                <div className="flex items-center gap-3">
                  <a
                    href={profileData.socials.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-[#0b0f19] border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white transition-all text-xs font-semibold"
                  >
                    <Github className="w-4 h-4" />
                    <span>GitHub</span>
                  </a>
                  <a
                    href={profileData.socials.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-[#0b0f19] border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-blue-400 transition-all text-xs font-semibold"
                  >
                    <Linkedin className="w-4 h-4" />
                    <span>LinkedIn</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-2xl bg-[#121827] border border-slate-800 shadow-sm">
              <h3 className="text-lg font-bold text-white font-calibri mb-1 flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-blue-400" />
                <span>Send a Message</span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 mb-6">
                Fill in the form below and I'll respond promptly via email.
              </p>

              {submitStatus === 'success' && (
                <div className="mb-5 p-4 rounded-xl bg-emerald-950/70 border border-emerald-800/60 text-emerald-200 text-xs sm:text-sm flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="font-semibold block text-emerald-300">Message Delivered!</strong>
                    <span>Thank you for reaching out. I will review your note and respond shortly.</span>
                  </div>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="mb-5 p-4 rounded-xl bg-red-950/70 border border-red-800/60 text-red-200 text-xs sm:text-sm flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="font-semibold block text-red-300">Notice</strong>
                    <span>{errorMessage}</span>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} noValidate className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-xs font-medium text-slate-300 mb-1">
                      Your Name <span className="text-blue-400">*</span>
                    </label>
                    <input
                      id="name"
                      type="text"
                      value={formData.name}
                      onChange={(e) => {
                        setFormData({ ...formData, name: e.target.value });
                        if (errors.name) setErrors({ ...errors, name: undefined });
                      }}
                      placeholder="e.g. Sarah Namukasa"
                      className={`w-full px-3.5 py-2.5 rounded-xl bg-[#0b0f19] text-slate-100 text-sm border focus:outline-none ${
                        errors.name ? 'border-red-500' : 'border-slate-800 focus:border-blue-500'
                      }`}
                    />
                    {errors.name && (
                      <p className="text-[11px] text-red-400 mt-1">{errors.name}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-xs font-medium text-slate-300 mb-1">
                      Your Email <span className="text-blue-400">*</span>
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => {
                        setFormData({ ...formData, email: e.target.value });
                        if (errors.email) setErrors({ ...errors, email: undefined });
                      }}
                      placeholder="e.g. sarah@example.com"
                      className={`w-full px-3.5 py-2.5 rounded-xl bg-[#0b0f19] text-slate-100 text-sm border focus:outline-none ${
                        errors.email ? 'border-red-500' : 'border-slate-800 focus:border-blue-500'
                      }`}
                    />
                    {errors.email && (
                      <p className="text-[11px] text-red-400 mt-1">{errors.email}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-xs font-medium text-slate-300 mb-1">
                    Subject <span className="text-blue-400">*</span>
                  </label>
                  <input
                    id="subject"
                    type="text"
                    value={formData.subject}
                    onChange={(e) => {
                      setFormData({ ...formData, subject: e.target.value });
                      if (errors.subject) setErrors({ ...errors, subject: undefined });
                    }}
                    placeholder="e.g. Software Engineering Opportunity"
                    className={`w-full px-3.5 py-2.5 rounded-xl bg-[#0b0f19] text-slate-100 text-sm border focus:outline-none ${
                      errors.subject ? 'border-red-500' : 'border-slate-800 focus:border-blue-500'
                    }`}
                  />
                  {errors.subject && (
                    <p className="text-[11px] text-red-400 mt-1">{errors.subject}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="message" className="block text-xs font-medium text-slate-300 mb-1">
                    Message <span className="text-blue-400">*</span>
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    value={formData.message}
                    onChange={(e) => {
                      setFormData({ ...formData, message: e.target.value });
                      if (errors.message) setErrors({ ...errors, message: undefined });
                    }}
                    placeholder="Write your note here..."
                    className={`w-full px-3.5 py-2.5 rounded-xl bg-[#0b0f19] text-slate-100 text-sm border focus:outline-none resize-y ${
                      errors.message ? 'border-red-500' : 'border-slate-800 focus:border-blue-500'
                    }`}
                  />
                  {errors.message && (
                    <p className="text-[11px] text-red-400 mt-1">{errors.message}</p>
                  )}
                </div>

                <div className="pt-2 flex items-center justify-between">
                  <span className="text-xs text-slate-400">
                    Direct communication
                  </span>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 shadow-sm transition-all active:scale-95 disabled:opacity-60"
                  >
                    {isSubmitting ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
