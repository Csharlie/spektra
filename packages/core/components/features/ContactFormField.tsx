import React from 'react';
import { Input } from '../ui/Input';
import { Textarea } from '../ui/Textarea';

export interface ContactFormFieldProps {
  type?: 'text' | 'email' | 'tel' | 'textarea';
  name: string;
  label: string;
  placeholder?: string;
  required?: boolean;
  error?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

export const ContactFormField: React.FC<ContactFormFieldProps> = ({
  type = 'text',
  name,
  label,
  placeholder,
  required = false,
  error,
  value,
  onChange,
}) => {
  const commonProps = {
    name,
    label,
    placeholder,
    required,
    error,
    value,
    onChange,
  };

  if (type === 'textarea') {
    return <Textarea {...commonProps} />;
  }

  return <Input type={type} {...commonProps} />;
};
