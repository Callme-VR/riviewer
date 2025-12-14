import ProfileForm from "@/module/settings/components/profile-form";
import RepositoryList from "@/module/settings/components/repo-all";

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl text-primary ">Settings Page</h1>
      <p className="text-sm text-muted-foreground">
        Manage your application settings here.
      </p>
      <ProfileForm/>
      <RepositoryList/>
    </div>
  );
}
