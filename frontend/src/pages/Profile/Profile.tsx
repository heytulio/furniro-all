import { useAuth } from "@/contexts/useAuth";
import { ProfileHeader } from "@/components/ProfileHeader";
import { ProfileForm } from "@/components/ProfileForm";

const Profile = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen w-full bg-secundary py-12 px-4 font-poppins sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl space-y-8">
        <ProfileHeader
          name={user?.name}
          email={user?.email}
          surname={user?.surname}
        />
        <ProfileForm key={user?.id ?? "profile-loading"} user={user} />
      </div>
    </div>
  );
};

export default Profile;
