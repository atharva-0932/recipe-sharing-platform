"use client";

import { signOut } from "../actions/auth";

export default function LogoutButton() {
  return (
    <form action={signOut}>
      <button
        type="submit"
        className="text-gray-700 hover:text-gray-900"
      >
        Logout
      </button>
    </form>
  );
}



