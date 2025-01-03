import React, { useState, useEffect } from "react";
import { toast } from "sonner";
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

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone_number: "",
    address: "",
    position: "",
    avatar: null,
    current_password: "",
    new_password: "",
    new_password_confirmation: "",
  });

  useEffect(() => {
    // Fetch user data
    axiosInstance.get("/user").then((response) => {
      setUser(response.data);
      setFormData({
        name: response.data.name,
        email: response.data.email,
        phone_number: response.data.phone_number || "",
        address: response.data.address || "",
        position: response.data.position || "",
        avatar: response.data.avatar || null,
      });
    });
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleAvatarChange = (e) => {
    setFormData({ ...formData, avatar: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append("_method", "PUT");
    formDataToSend.append("name", formData.name);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("phone_number", formData.phone_number || "");
    formDataToSend.append("address", formData.address || "");
    formDataToSend.append("position", formData.position || "");

    if (formData.avatar instanceof File) {
      formDataToSend.append("avatar", formData.avatar);
    }

    try {
      const response = await axiosInstance.post(
        `/users/${user.id}`,
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Accept: "application/json",
            "X-HTTP-Method-Override": "PUT",
          },
        }
      );

      console.log("Response:", response.data);
      setUser(response.data.user);
      toast.success("Profile updated successfully");
    } catch (error) {
      console.error("Error:", error.response?.data);
      toast.error(error.response?.data?.message || "Failed to update profile");
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();

    if (formData.new_password !== formData.new_password_confirmation) {
      toast.error("New passwords don't match");
      return;
    }

    try {
      await axiosInstance.put(`/users/${user.id}/password`, {
        current_password: formData.current_password,
        new_password: formData.new_password,
        new_password_confirmation: formData.new_password_confirmation,
      });

      setFormData((prev) => ({
        ...prev,
        current_password: "",
        new_password: "",
        new_password_confirmation: "",
      }));

      toast.success("Password updated successfully");
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.response?.data?.errors?.current_password?.[0] ||
        "Failed to update password";
      toast.error(errorMessage);
    }
  };

  if (!user) return <div>Loading...</div>;

  return (
    <AdminLayout>
      <div className="container mx-auto p-4 max-w-3xl">
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
                  Manage your profile information and preferences.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit}>
                  <div className="space-y-6">
                    <div className="flex items-center space-x-4">
                      <Avatar className="h-20 w-20 bg-slate-100">
                        {user.avatar ? (
                          <AvatarImage
                            src={`http://localhost:8000/storage/${user.avatar}`}
                            alt={user.name}
                          />
                        ) : (
                          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                        )}
                      </Avatar>
                      <div>
                        <Label htmlFor="avatar">Change Avatar</Label>
                        <Input
                          type="file"
                          id="avatar"
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
                          value={formData.name}
                          onChange={handleChange}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phone_number">Phone Number</Label>
                        <Input
                          id="phone_number"
                          value={formData.phone_number}
                          onChange={handleChange}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="address">Address</Label>
                        <Input
                          id="address"
                          value={formData.address}
                          onChange={handleChange}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="position">Position</Label>
                        <Input
                          id="position"
                          value={formData.position}
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    <Button type="submit">Save Changes</Button>
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
                      <Label htmlFor="current_password">Current Password</Label>
                      <Input
                        id="current_password"
                        type="password"
                        value={formData.current_password}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            current_password: e.target.value,
                          })
                        }
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="new_password">New Password</Label>
                      <Input
                        id="new_password"
                        type="password"
                        value={formData.new_password}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            new_password: e.target.value,
                          })
                        }
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
                        value={formData.new_password_confirmation}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            new_password_confirmation: e.target.value,
                          })
                        }
                        required
                      />
                    </div>

                    <Button type="submit">Update Password</Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
};

export default ProfilePage;
