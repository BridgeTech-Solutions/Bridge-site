"use client";

export function ResetCookiesButton() {
  return (
    <button
      onClick={() => {
        localStorage.removeItem("bts-cookie-consent");
        window.location.reload();
      }}
      className="text-[#0088C1] underline hover:no-underline cursor-pointer bg-transparent border-none p-0 font-inherit text-inherit"
    >
      cliquant ici pour réinitialiser vos préférences cookies
    </button>
  );
}
