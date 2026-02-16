import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Utility function pour combiner les classes Tailwind CSS
 * Utilise clsx pour la logique conditionnelle et tailwind-merge pour éviter les conflits
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Formatte un numéro de téléphone pour l'affichage
 */
export function formatPhone(phone: string): string {
  return phone.replace(/(\d{3})(\d{3})(\d{3})(\d{3})/, "+$1 $2 $3 $4");
}

/**
 * Tronque un texte à une longueur donnée
 */
export function truncate(str: string, length: number): string {
  if (str.length <= length) return str;
  return str.slice(0, length) + "...";
}

/**
 * Génère un slug à partir d'une chaîne
 */
export function generateSlug(str: string): string {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Enlever les accents
    .replace(/[^a-z0-9]+/g, "-") // Remplacer les caractères spéciaux par des tirets
    .replace(/(^-|-$)/g, ""); // Enlever les tirets au début et à la fin
}

/**
 * Formate une date
 */
export function formatDate(date: Date | string, locale: string = "fr-FR"): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(d);
}

/**
 * Delay/Sleep function pour les animations
 */
export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
