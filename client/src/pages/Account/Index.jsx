import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useProfileForm } from "@/hooks/useProfileForm";
import { usePasswordForm } from "@/hooks/usePasswordForm";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import AdminLayout from "@/layouts/AdminLayout";
import axiosInstance from "@/api/axios";
import SettingsLayout from "@/layouts/SettingsLayout";

const ProfilePage = () => {
  const [user, setUser] = useState(null);

  const {
    formData: profileData,
    setFormData: setProfileData,
    errors: profileErrors,
    setErrors: setProfileErrors,
    isSubmitting: isProfileSubmitting,
    setIsSubmitting: setProfileIsSubmitting,
    validateForm: validateProfileForm,
  } = useProfileForm(user);

  const {
    passwordData,
    setPasswordData,
    errors: passwordErrors,
    setErrors: setPasswordErrors,
    isSubmitting: isPasswordSubmitting,
    setIsSubmitting: setPasswordIsSubmitting,
    validatePasswordForm,
  } = usePasswordForm();

  const handleProfileChange = (e) => {
    const { id, value } = e.target;
    setProfileData((prev) => ({ ...prev, [id]: value }));
  };

  const handlePasswordChange = (e) => {
    const { id, value } = e.target;
    setPasswordData((prev) => ({ ...prev, [id]: value }));
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileData((prev) => ({ ...prev, avatar: file }));
    }
  };
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axiosInstance.get("/user");
        setUser(response.data);
        setProfileData({
          name: response.data.name || "",
          email: response.data.email || "",
          phone_number: response.data.phone_number || "",
          address: response.data.address || "",
          position: response.data.position || "",
          avatar: response.data.avatar || null,
        });
      } catch (error) {
        toast.error("Failed to fetch user data");
      }
    };
    fetchUser();
  }, []);
  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    if (!validateProfileForm()) return;

    setProfileIsSubmitting(true);
    const updateData = new FormData();

    // Explicitly append each field
    updateData.append("name", profileData.name);
    updateData.append("email", profileData.email);

    // Optional fields
    if (profileData.phone_number) {
      updateData.append("phone_number", profileData.phone_number);
    }
    if (profileData.address) {
      updateData.append("address", profileData.address);
    }
    if (profileData.position) {
      updateData.append("position", profileData.position);
    }

    // Handle avatar separately
    if (profileData.avatar instanceof File) {
      updateData.append("avatar", profileData.avatar);
    }

    try {
      const response = await axiosInstance.post(
        `/users/${user.id}`,
        updateData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Accept: "application/json",
            "X-HTTP-Method-Override": "PUT",
          },
        }
      );

      setUser(response.data.user);
      toast.success("Profile updated successfully");
    } catch (error) {
      console.error("Update failed:", error.response?.data);
      setProfileErrors(error.response?.data?.errors || {});
      toast.error(error.response?.data?.message || "Failed to update profile");
    } finally {
      setProfileIsSubmitting(false);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (!validatePasswordForm()) return;

    setPasswordIsSubmitting(true);
    try {
      await axiosInstance.put(`/users/${user.id}/password`, passwordData);
      setPasswordData({
        current_password: "",
        new_password: "",
        new_password_confirmation: "",
      });
      toast.success("Password updated successfully");
    } catch (error) {
      setPasswordErrors(error.response?.data?.errors || {});
      toast.error(error.response?.data?.message || "Failed to update password");
    } finally {
      setPasswordIsSubmitting(false);
    }
  };

  if (!user) return <div>Loading...</div>;
  return (
    <AdminLayout>
      <SettingsLayout>
        <div className="container  p-4 max-w-2xl">
          <Tabs defaultValue="profile" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
            </TabsList>

            <TabsContent value="profile">
              <Card>
                <CardHeader>
                  <CardTitle>Profile Settings</CardTitle>
                  <CardDescription>
                    Update your profile information
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleProfileSubmit}>
                    <div className="space-y-6">
                      <div className="flex items-center space-x-4">
                        <Avatar className="h-20 w-20">
                          {profileData.avatar ? (
                            <AvatarImage
                              src={
                                profileData.avatar instanceof File
                                  ? URL.createObjectURL(profileData.avatar)
                                  : `http://localhost:8000/storage/${profileData.avatar}`
                              }
                              alt={profileData.name}
                            />
                          ) : (
                            <AvatarFallback>
                              {profileData.name?.charAt(0)}
                            </AvatarFallback>
                          )}
                        </Avatar>
                        <div>
                          <Label htmlFor="avatar">Profile Picture</Label>
                          <Input
                            id="avatar"
                            type="file"
                            accept="image/*"
                            onChange={handleAvatarChange}
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Full Name</Label>
                          <Input
                            id="name"
                            value={profileData.name}
                            onChange={handleProfileChange}
                            className={
                              profileErrors.name ? "border-red-500" : ""
                            }
                            disabled={isProfileSubmitting}
                            required
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            type="email"
                            value={profileData.email}
                            onChange={handleProfileChange}
                            className={
                              profileErrors.email ? "border-red-500" : ""
                            }
                            disabled={isProfileSubmitting}
                            required
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="phone_number">Phone Number</Label>
                          <Input
                            id="phone_number"
                            value={profileData.phone_number}
                            onChange={handleProfileChange}
                            disabled={isProfileSubmitting}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="position">Position</Label>
                          <Input
                            id="position"
                            value={profileData.position}
                            onChange={handleProfileChange}
                            disabled={isProfileSubmitting}
                          />
                        </div>

                        <div className="space-y-2 col-span-2">
                          <Label htmlFor="address">Address</Label>
                          <Input
                            id="address"
                            value={profileData.address}
                            onChange={handleProfileChange}
                            disabled={isProfileSubmitting}
                          />
                        </div>
                      </div>

                      <Button type="submit" disabled={isProfileSubmitting}>
                        {isProfileSubmitting ? "Saving..." : "Save Changes"}
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="security">
              <Card>
                <CardHeader>
                  <CardTitle>Security Settings</CardTitle>
                  <CardDescription>Update your password</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handlePasswordSubmit}>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="current_password">
                          Current Password
                        </Label>
                        <Input
                          id="current_password"
                          type="password"
                          value={passwordData.current_password}
                          onChange={handlePasswordChange}
                          className={
                            passwordErrors.current_password
                              ? "border-red-500"
                              : ""
                          }
                          disabled={isPasswordSubmitting}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="new_password">New Password</Label>
                        <Input
                          id="new_password"
                          type="password"
                          value={passwordData.new_password}
                          onChange={handlePasswordChange}
                          className={
                            passwordErrors.new_password ? "border-red-500" : ""
                          }
                          disabled={isPasswordSubmitting}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="new_password_confirmation">
                          Confirm New Password
                        </Label>
                        <Input
                          id="new_password_confirmation"
                          type="password"
                          value={passwordData.new_password_confirmation}
                          onChange={handlePasswordChange}
                          className={
                            passwordErrors.new_password_confirmation
                              ? "border-red-500"
                              : ""
                          }
                          disabled={isPasswordSubmitting}
                          required
                        />
                      </div>

                      <Button type="submit" disabled={isPasswordSubmitting}>
                        {isPasswordSubmitting
                          ? "Updating..."
                          : "Update Password"}
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </SettingsLayout>
    </AdminLayout>
  );
};

export default ProfilePage;
