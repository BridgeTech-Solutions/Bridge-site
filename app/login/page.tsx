import Image from "next/image";
import { LoginForm } from "@/components/forms/LoginForm";

export const metadata = {
  title: "Connexion — Bridge Technologies Solutions",
};

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md">

        {/* Logo + nom */}
        <div className="flex flex-col items-center mb-8">
          <Image
            src="/logo.png"
            alt="Bridge Technologies Solutions"
            width={160}
            height={52}
            className="object-contain h-14 w-auto mb-4"
            priority
          />
          <h1 className="text-xl font-bold text-gray-900">Espace Administration</h1>
          <p className="text-sm text-gray-500 mt-1">Connectez-vous pour accéder au dashboard</p>
        </div>

        {/* Carte formulaire */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <div className="mb-6">
            <div className="h-1 w-12 rounded-full bg-[#0088C1] mb-4" />
            <h2 className="text-lg font-bold text-gray-900">Connexion</h2>
            <p className="text-sm text-gray-500 mt-0.5">Accès réservé aux administrateurs BTS</p>
          </div>
          <LoginForm />
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-gray-400 mt-6">
          &copy; {new Date().getFullYear()} Bridge Technologies Solutions
        </p>
      </div>
    </div>
  );
}
