/**
 * API ROUTE - FORMULAIRE DE CONTACT
 *
 * TODO :
 * - Recevoir les données du formulaire (name, email, phone, subject, message)
 * - Valider les champs obligatoires
 * - Insérer dans Supabase (table: contacts)
 * - Retourner une réponse JSON (succès ou erreur)
 *
 * Méthode : POST
 * Body : { name, email, phone?, subject, message }
 * Table Supabase : contacts
 */

import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // TODO: Valider les champs
    // TODO: Insérer dans Supabase
    // TODO: Retourner la réponse

    return NextResponse.json(
      { message: "À implémenter" },
      { status: 501 }
    );
  } catch {
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    );
  }
}
