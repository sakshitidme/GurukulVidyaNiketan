import React, { useEffect } from 'react';

/**
 * SEO Component for managing page metadata
 * @param {Object} props
 * @param {string} props.title - Page title
 * @param {string} props.description - Meta description
 * @param {string} [props.keywords] - Meta keywords (comma separated)
 * @param {string} [props.ogTitle] - Open Graph title
 * @param {string} [props.ogDescription] - Open Graph description
 * @param {string} [props.ogImage] - Open Graph image URL
 * @param {string} [props.ogType] - Open Graph type (default: 'website')
 */
const SEO = ({ 
  title, 
  description, 
  keywords = 'Gurukul Vidya Niketan, school in Nashik, English medium school, education Nashik', 
  ogTitle, 
  ogDescription, 
  ogImage, 
  ogType = 'website' 
}) => {
  useEffect(() => {
    // Update Document Title
    const fullTitle = `${title} | Gurukul Vidya Niketan`;
    document.title = fullTitle;

    // Update Meta Description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', description);

    // Update Meta Keywords
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.setAttribute('name', 'keywords');
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.setAttribute('content', keywords);

    // Update Open Graph Tags
    const updateOGTag = (property, content) => {
      if (!content) return;
      let tag = document.querySelector(`meta[property="${property}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute('property', property);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    };

    updateOGTag('og:title', ogTitle || fullTitle);
    updateOGTag('og:description', ogDescription || description);
    updateOGTag('og:type', ogType);
    if (ogImage) updateOGTag('og:image', ogImage);

    // Cleanup (optional, but good practice for SPAs if you want to reset defaults)
    // For now, we'll let the next page's SEO component override these.
  }, [title, description, keywords, ogTitle, ogDescription, ogImage, ogType]);

  return null; // This component doesn't render anything to the DOM
};

export default SEO;
