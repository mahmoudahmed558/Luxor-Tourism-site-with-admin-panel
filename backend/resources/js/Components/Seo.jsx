import React from 'react';
import { Head } from '@inertiajs/react';

const Seo = ({ 
    title, 
    description, 
    keywords, 
    image, 
    url, 
    type = 'website' 
}) => {
    const siteName = "Sya7a";
    const fullTitle = title ? `${title} | ${siteName}` : siteName;
    const defaultDescription = "Sya7a - Discover the beauty of Egypt with our curated tour programs and travel services.";
    const metaDescription = description || defaultDescription;
    const metaKeywords = keywords || "egypt tourism, travel egypt, tour programs, sya7a, cairo tours, luxor tours";
    
    // Use a default image if none is provided
    const metaImage = image || "/assets/img/default-og.jpg"; 
    const metaUrl = url || window.location.href;

    return (
        <Head>
            <title>{fullTitle}</title>
            <meta name="description" content={metaDescription} />
            <meta name="keywords" content={metaKeywords} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content={type} />
            <meta property="og:url" content={metaUrl} />
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={metaDescription} />
            <meta property="og:image" content={metaImage} />

            {/* Twitter */}
            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:url" content={metaUrl} />
            <meta property="twitter:title" content={fullTitle} />
            <meta property="twitter:description" content={metaDescription} />
            <meta property="twitter:image" content={metaImage} />
        </Head>
    );
};

export default Seo;
