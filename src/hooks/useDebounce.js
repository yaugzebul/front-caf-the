import { useState, useEffect } from 'react';

/**
 * Hook qui retarde la mise à jour d'une valeur.
 * @param {*} value La valeur à "débouncer".
 * @param {number} delay Le délai en millisecondes.
 * @returns La valeur après le délai.
 */
export function useDebounce(value, delay) {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        // Met à jour la valeur "débouncée" après le délai
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        // Annule le timeout si la valeur change avant la fin du délai
        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return debouncedValue;
}
