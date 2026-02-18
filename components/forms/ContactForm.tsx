/**
 * FORMULAIRE DE CONTACT
 *
 * TODO (Stagiaire 3) :
 * - Champs : nom complet, email, telephone, sujet, message
 * - Validation : nom, email et message obligatoires
 * - Envoi vers /api/contact (POST)
 * - Afficher un message de succes ou d'erreur apres envoi
 * - Desactiver le bouton pendant l'envoi (loading state)
 *
 * Utiliser les composants : Input, Textarea, Button, Label de components/ui/
 *
 * Exemple d'envoi :
 * const res = await fetch("/api/contact", {
 *   method: "POST",
 *   headers: { "Content-Type": "application/json" },
 *   body: JSON.stringify({ name, email, phone, subject, message }),
 * });
 */

"use client";

export function ContactForm() {
  return (
    <form>
      {/* TODO : implementer le formulaire */}
    </form>
  );
}
