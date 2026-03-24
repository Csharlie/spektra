import React, { useState } from 'react'
import { Button } from '../basics/Button'
import { ContactFormField } from '../elements/ContactFormField'
import { cn } from '../utils/cn'
import { Mail, Phone, MapPin } from 'lucide-react'

export interface ContactFormData {
  name: string
  email: string
  phone?: string
  message: string
}

export interface ContactBlockProps {
  title: string
  subtitle?: string
  description?: string
  onSubmit?: (data: ContactFormData) => void | Promise<void>
  contactInfo?: {
    email?: string
    phone?: string
    address?: string
  }
  labels?: {
    name?: string
    email?: string
    phone?: string
    message?: string
    submit?: string
    successTitle?: string
    successMessage?: string
    newMessage?: string
    contactHeading?: string
    nameRequired?: string
    emailRequired?: string
    emailInvalid?: string
    messageRequired?: string
    namePlaceholder?: string
    emailPlaceholder?: string
    phonePlaceholder?: string
    messagePlaceholder?: string
  }
  colorScheme?: 'light' | 'dark'
  className?: string
}

const defaultLabels = {
  name: 'Név',
  email: 'Email cím',
  phone: 'Telefonszám',
  message: 'Üzenet',
  submit: 'Üzenet küldése',
  successTitle: 'Köszönjük az üzenetet!',
  successMessage: 'Hamarosan felvesszük Önnel a kapcsolatot.',
  newMessage: 'Új üzenet küldése',
  contactHeading: 'Kapcsolat',
  nameRequired: 'A név megadása kötelező',
  emailRequired: 'Az email cím megadása kötelező',
  emailInvalid: 'Érvénytelen email cím',
  messageRequired: 'Az üzenet megadása kötelező',
  namePlaceholder: 'Az Ön neve',
  emailPlaceholder: 'pelda@email.com',
  phonePlaceholder: '+36 20 123 4567',
  messagePlaceholder: 'Írja le, miben tudunk segíteni...',
}

export const ContactBlock: React.FC<ContactBlockProps> = ({
  title,
  subtitle,
  description,
  onSubmit,
  contactInfo,
  labels: labelOverrides,
  colorScheme,
  className,
}) => {
  const l = { ...defaultLabels, ...labelOverrides }

  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    message: '',
  })
  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof ContactFormData, string>> = {}

    if (!formData.name.trim()) {
      newErrors.name = l.nameRequired
    }

    if (!formData.email.trim()) {
      newErrors.email = l.emailRequired
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = l.emailInvalid
    }

    if (!formData.message.trim()) {
      newErrors.message = l.messageRequired
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validate()) return

    setIsSubmitting(true)

    try {
      if (onSubmit) {
        await onSubmit(formData)
      }
      setSubmitSuccess(true)
      setFormData({ name: '', email: '', phone: '', message: '' })
    } catch (error) {
      console.error('Form submission error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name as keyof ContactFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  return (
    <section
      data-ui-component="contact-block"
      data-ui-role="contact"
      data-color-scheme={colorScheme ?? undefined}
      className={cn('py-20 bg-muted', className)}
    >
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          {subtitle && (
            <p className="text-accent font-semibold text-lg mb-4">{subtitle}</p>
          )}
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">{title}</h2>
          {description && <p className="text-lg text-muted-foreground">{description}</p>}
        </div>

        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <div className="bg-surface rounded-2xl shadow-lg p-8">
            {submitSuccess ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-green-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-2">{l.successTitle}</h3>
                <p className="text-muted-foreground mb-6">{l.successMessage}</p>
                <Button onClick={() => setSubmitSuccess(false)}>{l.newMessage}</Button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="space-y-6"
                data-ui-type="form"
                data-ui-id="contact-form"
                data-ui-action="submit-form"
              >
                <ContactFormField
                  type="text"
                  name="name"
                  label={l.name}
                  placeholder={l.namePlaceholder}
                  required
                  value={formData.name}
                  onChange={handleChange}
                  error={errors.name}
                />

                <ContactFormField
                  type="email"
                  name="email"
                  label={l.email}
                  placeholder={l.emailPlaceholder}
                  required
                  value={formData.email}
                  onChange={handleChange}
                  error={errors.email}
                />

                <ContactFormField
                  type="tel"
                  name="phone"
                  label={l.phone}
                  placeholder={l.phonePlaceholder}
                  value={formData.phone}
                  onChange={handleChange}
                  error={errors.phone}
                />

                <ContactFormField
                  type="textarea"
                  name="message"
                  label={l.message}
                  placeholder={l.messagePlaceholder}
                  required
                  value={formData.message}
                  onChange={handleChange}
                  error={errors.message}
                />

                <Button type="submit" size="lg" fullWidth isLoading={isSubmitting}>
                  {l.submit}
                </Button>
              </form>
            )}
          </div>

          {contactInfo && (
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-6">{l.contactHeading}</h3>
                <div className="space-y-4">
                  {contactInfo.email && (
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Mail className="w-6 h-6 text-accent" />
                      </div>
                      <div>
                        <div className="font-semibold text-foreground mb-1">Email</div>
                        <a
                          href={`mailto:${contactInfo.email}`}
                          className="text-accent hover:text-accent/90"
                        >
                          {contactInfo.email}
                        </a>
                      </div>
                    </div>
                  )}

                  {contactInfo.phone && (
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Phone className="w-6 h-6 text-accent" />
                      </div>
                      <div>
                        <div className="font-semibold text-foreground mb-1">Telefon</div>
                        <a
                          href={`tel:${contactInfo.phone}`}
                          className="text-accent hover:text-accent/90"
                        >
                          {contactInfo.phone}
                        </a>
                      </div>
                    </div>
                  )}

                  {contactInfo.address && (
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-6 h-6 text-accent" />
                      </div>
                      <div>
                        <div className="font-semibold text-foreground mb-1">Cím</div>
                        <p className="text-muted-foreground">{contactInfo.address}</p>
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
  )
}
