import { useEffect } from 'react';

/**
 * Hook personnalisé pour mettre à jour le titre, la méta-description et les mots-clés de la page.
 * @param {string} title - Le titre de la page (affiché dans l'onglet du navigateur).
 * @param {string} description - La description de la page (pour le SEO).
 * @param {string} keywords - Les mots-clés de la page (pour le SEO).
 */
export const useDocumentTitle = (title, description = "", keywords = "") => {
    useEffect(() => {
        // Mettre à jour le titre
        document.title = title;

        // Mettre à jour la méta-description
        if (description) {
            let metaDescription = document.querySelector('meta[name="description"]');
            
            // Si la balise n'existe pas, on la crée
            if (!metaDescription) {
                metaDescription = document.createElement('meta');
                metaDescription.name = "description";
                document.head.appendChild(metaDescription);
            }
            
            metaDescription.setAttribute("content", description);
        }

        // Mettre à jour les mots-clés
        if (keywords) {
            let metaKeywords = document.querySelector('meta[name="keywords"]');
            
            // Si la balise n'existe pas, on la crée
            if (!metaKeywords) {
                metaKeywords = document.createElement('meta');
                metaKeywords.name = "keywords";
                document.head.appendChild(metaKeywords);
            }
            
            metaKeywords.setAttribute("content", keywords);
        }
    }, [title, description, keywords]);
};
