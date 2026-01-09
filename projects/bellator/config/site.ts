export const siteConfig = {
  name: import.meta.env.VITE_SITE_NAME || 'Bellator Gym',
  url: import.meta.env.VITE_SITE_URL || 'http://localhost:3000',
  description: 'Erő, kitartás, karakter - A te utad a győzelemhez',
  tagline: 'Transform Your Body, Transform Your Life',
  
  contact: {
    email: 'info@bellatorgym.hu',
    phone: '+36 30 123 4567',
    address: 'Budapest, XIII. kerület, Váci út 123.',
  },
  
  social: {
    facebook: 'https://facebook.com/bellatorgym',
    instagram: 'https://instagram.com/bellatorgym',
    youtube: 'https://youtube.com/@bellatorgym',
  },
};
