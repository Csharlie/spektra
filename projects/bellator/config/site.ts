export const siteConfig = {
  name: import.meta.env.VITE_SITE_NAME || 'Client A',
  url: import.meta.env.VITE_SITE_URL || 'http://localhost:3000',
  description: 'Professzionális megoldások vállalkozásoknak',
  
  contact: {
    email: 'info@clienta.hu',
    phone: '+36 20 123 4567',
    address: '1234 Budapest, Példa utca 12.',
  },
  
  social: {
    facebook: 'https://facebook.com/clienta',
    instagram: 'https://instagram.com/clienta',
    linkedin: 'https://linkedin.com/company/clienta',
  },
};
