import { SetPasswordForm } from "@/components/forms/SetPasswordForm";
import Image from "next/image";

export const metadata = { title: "Définir mon mot de passe — BTS Admin" };

export default function SetPasswordPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">

      {/* Logo */}
      <div className="mb-8">
        <Image
          src="/logo.png"
          alt="Bridge Technologies Solutions"
          width={160}
          height={50}
          className="object-contain h-12 w-auto"
          priority
        />
      </div>

      {/* Carte */}
      <div className="w-full max-w-md bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <div className="mb-6 text-center">
          <h1 className="text-xl font-bold text-gray-900">Bienvenue !</h1>
          <p className="text-sm text-gray-500 mt-2">
            Choisissez un mot de passe pour accéder au dashboard.
          </p>
        </div>

        <SetPasswordForm />
      </div>

      <p className="mt-6 text-xs text-gray-400">
        Bridge Technologies Solutions © {new Date().getFullYear()}
      </p>
    </div>
  );
}
