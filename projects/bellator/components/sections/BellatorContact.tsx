import React, { useState } from 'react';
import { cn } from '@spektra/core';
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react';
import { SectionHeading } from '../atoms';

export interface BellatorContactProps {
  title: string;
  subtitle?: string;
  description?: string;
  onSubmit?: (data: ContactFormData) => void | Promise<void>;
  contactInfo?: {
    email?: string;
    phone?: string;
    address?: string;
  };
  className?: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  message: string;
}

export const BellatorContact: React.FC<BellatorContactProps> = ({
  title,
  subtitle,
  description,
  onSubmit,
  contactInfo,
  className,
}) => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof ContactFormData, string>> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'A név megadása kötelező';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Az email cím megadása kötelező';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Érvénytelen email cím';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Az üzenet megadása kötelező';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) return;
    
    setIsSubmitting(true);
    
    try {
      if (onSubmit) {
        await onSubmit(formData);
      }
      setSubmitSuccess(true);
      setFormData({ name: '', email: '', phone: '', message: '' });
      setTimeout(() => setSubmitSuccess(false), 5000);
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof ContactFormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  return (
    <>
      <section className={cn('py-20 md:py-32 bg-gray-50', className)}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          subtitle={subtitle}
          title={title}
          description={description}
          align="center"
          className="mb-16"
        />

        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <div className="bg-white border-4 border-gym-yellow p-8">
            {submitSuccess ? (
              <div className="text-center py-12">
                <div className="w-20 h-20 bg-gym-yellow flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-12 h-12 text-black" />
                </div>
                <h3 className="text-3xl font-black text-gray-900 mb-4 uppercase">
                  Köszönjük!
                </h3>
                <p className="text-gray-600 text-lg mb-8">
                  Hamarosan felvesszük veled a kapcsolatot.
                </p>
                <button
                  onClick={() => setSubmitSuccess(false)}
                  className="px-8 py-3 bg-gym-yellow text-black font-black uppercase hover:bg-black hover:text-gym-yellow transition-all"
                >
                  Új üzenet
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-gray-900 font-black uppercase text-sm mb-2">
                    Név *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={cn(
                      "w-full px-4 py-3 border-2 focus:outline-none transition-colors",
                      errors.name ? 'border-red-500' : 'border-gray-300 focus:border-gym-yellow'
                    )}
                    placeholder="Add meg a neved"
                  />
                  {errors.name && (
                    <p className="mt-2 text-red-500 text-sm font-medium">{errors.name}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="block text-gray-900 font-black uppercase text-sm mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={cn(
                      "w-full px-4 py-3 border-2 focus:outline-none transition-colors",
                      errors.email ? 'border-red-500' : 'border-gray-300 focus:border-gym-yellow'
                    )}
                    placeholder="email@example.com"
                  />
                  {errors.email && (
                    <p className="mt-2 text-red-500 text-sm font-medium">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="phone" className="block text-gray-900 font-black uppercase text-sm mb-2">
                    Telefonszám
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-300 focus:border-gym-yellow focus:outline-none transition-colors"
                    placeholder="+36 30 123 4567"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-gray-900 font-black uppercase text-sm mb-2">
                    Üzenet *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={6}
                    className={cn(
                      "w-full px-4 py-3 border-2 focus:outline-none transition-colors resize-none",
                      errors.message ? 'border-red-500' : 'border-gray-300 focus:border-gym-yellow'
                    )}
                    placeholder="Írd meg, miben segíthetünk..."
                  />
                  {errors.message && (
                    <p className="mt-2 text-red-500 text-sm font-medium">{errors.message}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group w-full px-8 py-4 bg-gym-yellow text-black font-black text-lg uppercase hover:bg-black hover:text-gym-yellow transition-all disabled:opacity-50 flex items-center justify-center gap-3"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                      Küldés...
                    </>
                  ) : (
                    <>
                      Üzenet küldése
                      <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Contact Info Cards */}
          {contactInfo && (
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-black text-gray-900 mb-6 uppercase">
                  Kapcsolat
                </h3>
              </div>
              
              <div className="grid gap-4">
                {contactInfo.email && (
                  <div className="bg-white border-4 border-gym-yellow hover:border-black transition-all p-6 group">
                    <div className="flex items-start gap-4">
                      <div className="w-14 h-14 bg-gym-yellow group-hover:bg-black transition-colors flex items-center justify-center flex-shrink-0">
                        <Mail className="w-7 h-7 text-black group-hover:text-gym-yellow transition-colors" />
                      </div>
                      <div className="flex-1">
                        <div className="font-black text-gray-900 mb-2 uppercase tracking-wider text-sm">
                          Email
                        </div>
                        <a
                          href={`mailto:${contactInfo.email}`}
                          className="text-gray-700 hover:text-gym-yellow transition-colors font-medium text-lg break-all"
                        >
                          {contactInfo.email}
                        </a>
                      </div>
                    </div>
                  </div>
                )}
                
                {contactInfo.phone && (
                  <div className="bg-white border-4 border-gym-yellow hover:border-black transition-all p-6 group">
                    <div className="flex items-start gap-4">
                      <div className="w-14 h-14 bg-gym-yellow group-hover:bg-black transition-colors flex items-center justify-center flex-shrink-0">
                        <Phone className="w-7 h-7 text-black group-hover:text-gym-yellow transition-colors" />
                      </div>
                      <div className="flex-1">
                        <div className="font-black text-gray-900 mb-2 uppercase tracking-wider text-sm">
                          Telefon
                        </div>
                        <a
                          href={`tel:${contactInfo.phone}`}
                          className="text-gray-700 hover:text-gym-yellow transition-colors font-medium text-lg"
                        >
                          {contactInfo.phone}
                        </a>
                      </div>
                    </div>
                  </div>
                )}
                
                {contactInfo.address && (
                  <div className="bg-white border-4 border-gym-yellow hover:border-black transition-all p-6 group">
                    <div className="flex items-start gap-4">
                      <div className="w-14 h-14 bg-gym-yellow group-hover:bg-black transition-colors flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-7 h-7 text-black group-hover:text-gym-yellow transition-colors" />
                      </div>
                      <div className="flex-1">
                        <div className="font-black text-gray-900 mb-2 uppercase tracking-wider text-sm">
                          Cím
                        </div>
                        <p className="text-gray-700 font-medium leading-relaxed">
                          {contactInfo.address}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
      </section>

      {/* Google Map - Full Width Outside Container */}
      <div className="w-full border-t-8 border-b-4 border-gym-yellow overflow-hidden">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2750.123456789!2d19.85!3d46.70!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDbCsDQyJzAwLjAiTiAxOcKwNTEnMDAuMCJF!5e0!3m2!1shu!2shu!4v1234567890"
          width="100%"
          height="500"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Bellator Gym Kiskunfélegyháza"
          className="grayscale hover:grayscale-0 transition-all duration-500"
        />
      </div>
    </>
  );
};
