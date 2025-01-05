import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import PasswordForm from "./PasswordForm";

export default function SecurityTab({ user }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Security Settings</CardTitle>
        <CardDescription>Update your password</CardDescription>
      </CardHeader>
      <CardContent>
        <PasswordForm user={user} />
      </CardContent>
    </Card>
  );
}
