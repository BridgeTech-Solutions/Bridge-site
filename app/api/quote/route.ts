/**
 * API ROUTE - DEMANDE DE DEVIS
 *
 * TODO :
 * - Recevoir les données (company_name, contact_name, email, phone, service_type, budget_range, description, deadline)
 * - Valider les champs obligatoires
 * - Insérer dans Supabase (table: quote_requests)
 * - Retourner réponse JSON
 *
 * Méthode : POST
 * Body : { company_name, contact_name, email, phone, service_type, budget_range?, description, deadline? }
 * Table Supabase : quote_requests
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
