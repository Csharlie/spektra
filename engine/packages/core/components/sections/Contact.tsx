import React, { useState } from 'react';
import { Button } from '../primitives/Button';
import { ContactFormField } from '../features/ContactFormField';
import { cn } from '../../utils/cn';
import { Mail, Phone, MapPin } from 'lucide-react';

export interface ContactProps {
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

export const Contact: React.FC<ContactProps> = ({
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
    <section className={cn('py-20 bg-gray-50', className)}>
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          {subtitle && (
            <p className="text-primary-600 font-semibold text-lg mb-4">
              {subtitle}
            </p>
          )}
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {title}
          </h2>
          {description && (
            <p className="text-lg text-gray-600">{description}</p>
          )}
        </div>

        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            {submitSuccess ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Köszönjük az üzenetet!
                </h3>
                <p className="text-gray-600 mb-6">
                  Hamarosan felvesszük Önnel a kapcsolatot.
                </p>
                <Button onClick={() => setSubmitSuccess(false)}>
                  Új üzenet küldése
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <ContactFormField
                  type="text"
                  name="name"
                  label="Név"
                  placeholder="Az Ön neve"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  error={errors.name}
                />
                
                <ContactFormField
                  type="email"
                  name="email"
                  label="Email cím"
                  placeholder="pelda@email.com"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  error={errors.email}
                />
                
                <ContactFormField
                  type="tel"
                  name="phone"
                  label="Telefonszám"
                  placeholder="+36 20 123 4567"
                  value={formData.phone}
                  onChange={handleChange}
                  error={errors.phone}
                />
                
                <ContactFormField
                  type="textarea"
                  name="message"
                  label="Üzenet"
                  placeholder="Írja le, miben tudunk segíteni..."
                  required
                  value={formData.message}
                  onChange={handleChange}
                  error={errors.message}
                />
                
                <Button
                  type="submit"
                  size="lg"
                  fullWidth
                  isLoading={isSubmitting}
                >
                  Üzenet küldése
                </Button>
              </form>
            )}
          </div>

          {contactInfo && (
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  Kapcsolat
                </h3>
                <div className="space-y-4">
                  {contactInfo.email && (
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Mail className="w-6 h-6 text-primary-600" />
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900 mb-1">Email</div>
                        <a
                          href={`mailto:${contactInfo.email}`}
                          className="text-primary-600 hover:text-primary-700"
                        >
                          {contactInfo.email}
                        </a>
                      </div>
                    </div>
                  )}
                  
                  {contactInfo.phone && (
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Phone className="w-6 h-6 text-primary-600" />
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900 mb-1">Telefon</div>
                        <a
                          href={`tel:${contactInfo.phone}`}
                          className="text-primary-600 hover:text-primary-700"
                        >
                          {contactInfo.phone}
                        </a>
                      </div>
                    </div>
                  )}
                  
                  {contactInfo.address && (
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-6 h-6 text-primary-600" />
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900 mb-1">Cím</div>
                        <p className="text-gray-600">{contactInfo.address}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
