import { supabase } from "@/lib/supabaseClient";

export default function SignOut() {
  const handleSignOut = async () => {
    await supabase.auth.signOut();
    window.location.reload();
  };

  return (
    <button
      onClick={handleSignOut}
      className="bg-gradient-to-r from-red-500 to-red-600 cursor-pointer text-white px-2 sm:px-5 py-2 rounded-lg font-medium shadow-md hover:from-red-600 hover:to-red-700 transition-transform transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-red-400"
    >
      Sign Out
    </button>
  );
}
