export interface NavLink {
  label: string;
  href: string;
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}

export interface SiteConfig {
  siteName: string;
  siteUrl: string;
  title: string;
  description: string;
  ogImage: string;
  contact: {
    email: string;
    phone: string;
    address: string;
  };
  locations: string[];
  socialLinks: SocialLink[];
  navigation: NavLink[];
}

export const siteConfig: SiteConfig = {
  siteName: 'SCOTS',
  siteUrl: 'https://scots-catalogue.pages.dev',
  title: 'SCOTS - Orthopedic Triage Service',
  description: 'Southern Community Orthopedic Triage Service helps patients access the right musculoskeletal care at the right time.',
  ogImage: '/og-image.png',
  contact: {
    email: 'contact@scots.health.nz',
    phone: '+64 3 000 0000',
    address: 'Dunedin, Otago, New Zealand',
  },
  locations: [
    'Te Kaika Wellbeing Hub',
    'Zingari Richmond Football Club',
    'Nutrition Clinic - Otago University',
    'Chatsford Retirement Village Events Centre',
  ],
  socialLinks: [
    { platform: 'Facebook', url: 'https://facebook.com/scots', icon: 'facebook' },
    { platform: 'Instagram', url: 'https://instagram.com/scots', icon: 'instagram' },
    { platform: 'LinkedIn', url: 'https://linkedin.com/company/scots', icon: 'linkedin' },
  ],
  navigation: [
    { label: 'Services', href: '#services' },
    { label: 'Programs', href: '#programs' },
    { label: 'About', href: '#about' },
    { label: 'Testimonials', href: '#testimonials' },
    { label: 'FAQ', href: '#faq' },
    { label: 'Contact', href: '#contact' },
  ],
};
