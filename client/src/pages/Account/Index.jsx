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
                            src={`/storage/${user.avatar}`}
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
        </Tabs>
      </div>
    </AdminLayout>
  );
};

export default ProfilePage;
