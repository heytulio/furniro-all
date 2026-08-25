import React from "react";
import { User, Mail, Lock } from "lucide-react";
import { AlertMessage } from "@/components/AlertMessage";
import { useUpdateProfile } from "@/hooks/useUpdateProfile";

interface ProfileFormProps {
  user: {
    name?: string;
    email?: string;
    username?: string;
    surname?: string;
  } | null;
}

export const ProfileForm: React.FC<ProfileFormProps> = ({ user }) => {
  const {
    formState: { name, surname, username, email, password },
    setters: { setName, setSurname, setUsername, setEmail, setPassword },
    status: { isSubmitting, successMessage, errorMessage },
    handleSubmit,
  } = useUpdateProfile(user);

  return (
    <div className="border border-[#E8D8C4] bg-primary p-6 shadow-sm sm:p-8">
      <h2 className="mb-6 font-montserrat text-xl font-bold text-primary-text-200">
        Edit Information
      </h2>

      {successMessage && (
        <AlertMessage type="success" message={successMessage} />
      )}
      {errorMessage && <AlertMessage type="error" message={errorMessage} />}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-primary-text-200">
              First Name
            </label>
            <div className="relative">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full border border-[#E8D8C4] bg-white px-4 py-3 pl-10 text-sm focus:border-[#B88E2F] focus:outline-none"
                placeholder="Input your first name"
              />
              <User
                size={18}
                className="absolute left-3 top-3.5 text-gray-400"
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-primary-text-200">
              Last Name
            </label>
            <input
              type="text"
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
              required
              className="w-full border border-[#E8D8C4] bg-white px-4 py-3 text-sm focus:border-[#B88E2F] focus:outline-none"
              placeholder="Input your last name"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-primary-text-200">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full border border-[#E8D8C4] bg-white px-4 py-3 text-sm focus:border-[#B88E2F] focus:outline-none"
              placeholder="@username"
            />
          </div>

          <div>
            <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-primary-text-200">
              Email
            </label>
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full border border-[#E8D8C4] bg-white px-4 py-3 pl-10 text-sm focus:border-[#B88E2F] focus:outline-none"
                placeholder="Input your email"
              />
              <Mail
                size={18}
                className="absolute left-3 top-3.5 text-gray-400"
              />
            </div>
          </div>
        </div>

        <hr className="my-6 border-[#E8D8C4]" />

        <div>
          <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-primary-text-200">
            New Password (leave blank to keep current)
          </label>
          <div className="relative">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-[#E8D8C4] bg-white px-4 py-3 pl-10 text-sm focus:border-[#B88E2F] focus:outline-none"
              placeholder="••••••••"
            />
            <Lock size={18} className="absolute left-3 top-3.5 text-gray-400" />
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-over-secundary py-3 font-poppins text-sm font-bold uppercase tracking-[1px] text-primary transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto sm:px-8"
          >
            {isSubmitting ? "SAVING..." : "SAVE CHANGES"}
          </button>
        </div>
      </form>
    </div>
  );
};
