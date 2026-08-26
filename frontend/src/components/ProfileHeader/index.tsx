import React from "react";

interface ProfileHeaderProps {
  name?: string;
  surname?: string;
  email?: string;
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  name,
  surname,
  email,
}) => {
  const getInitials = (name?: string, surname?: string) => {
    const fullName = `${name} ${surname}`;
    if (!fullName) return "U";
    const parts = fullName.trim().split(" ");
    if (parts.length === 1) return parts[0][0].toUpperCase();
    return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
  };

  return (
    <div className="flex flex-col items-center justify-between gap-4 border border-[#E8D8C4] bg-primary p-6 shadow-sm sm:flex-row sm:p-8">
      <div className="flex items-center gap-4">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#B88E2F] text-xl font-bold text-white shadow-inner">
          {getInitials(name, surname)}
        </div>
        <div>
          <h1 className="font-montserrat text-2xl font-bold text-primary-text-200">
            {name || "Usuário"}
          </h1>
          <p className="text-sm text-primary-text-100">{email}</p>
        </div>
      </div>
    </div>
  );
};
