declare module 'astro-seo' {
  export interface Props {
    title?: string;
    description?: string;
    canonical?: string;
    noindex?: boolean;
    nofollow?: boolean;
    openGraph?: {
      basic: {
        title: string;
        type: string;
        image: string;
        url?: string;
      };
      optional?: {
        description?: string;
        siteName?: string;
        audio?: string;
        video?: string;
        locale?: string;
        localeAlternate?: string[];
      };
      image?: {
        url?: string;
        secureUrl?: string;
        type?: string;
        width?: number;
        height?: number;
        alt?: string;
      };
      article?: {
        publishedTime?: string;
        modifiedTime?: string;
        expirationTime?: string;
        authors?: string[];
        section?: string;
        tags?: string[];
      };
    };
    twitter?: {
      card?: 'summary' | 'summary_large_image' | 'app' | 'player';
      site?: string;
      creator?: string;
      title?: string;
      description?: string;
      image?: string;
      imageAlt?: string;
    };
    extend?: {
      link?: Array<{ [key: string]: any }>;
      meta?: Array<{ [key: string]: any }>;
    };
  }

  export const SEO: (props: Props) => any;
}
