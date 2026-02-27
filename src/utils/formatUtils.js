/**
 * Formate une quantité pour l'affichage, en gérant les kg et le pluriel.
 * @param {number} quantity - La quantité numérique.
 * @param {string} type_vente - Le type de vente ('vrac' ou 'unitaire').
 * @returns {string} La quantité formatée (ex: "1.5 kg", "200 g", "1 unité", "3 unités").
 */
export const formatDisplayQuantity = (quantity, type_vente) => {
    if (type_vente === 'vrac') {
        if (quantity >= 1000) {
            // Affiche avec une décimale si nécessaire (ex: 1.5 kg), sinon sans (ex: 2 kg)
            const kg = quantity / 1000;
            return `${parseFloat(kg.toFixed(1))} kg`;
        }
        return `${quantity} g`;
    }

    // Gère le pluriel pour les unités
    return `${quantity} unité${quantity > 1 ? 's' : ''}`;
};
