/**
 * API ROUTE - INSCRIPTION NEWSLETTER
 *
 * TODO :
 * - Recevoir l'email
 * - Vérifier si l'email existe déjà dans Supabase
 * - Si oui et désabonné → réactiver
 * - Si non → insérer nouveau
 * - Retourner réponse JSON
 *
 * Méthode : POST
 * Body : { email }
 * Table Supabase : newsletters
 */

import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // TODO: Valider l'email
    // TODO: Vérifier doublon dans Supabase
    // TODO: Insérer ou réactiver
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
