import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function SignInPage() {
  return (
    <div className="flex min-h-screen items-center justify-center p-4 bg-story-paper">
      <Card className="w-full max-w-md glass">
        <CardHeader>
          <CardTitle className="font-interface">StoryLENSにログイン</CardTitle>
          <CardDescription>
            アカウントにログインして、作品の世界を映像化しましょう
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button className="w-full font-interface" variant="accent">
            メールでログイン
          </Button>
          <Button className="w-full font-interface" variant="outline">
            X (Twitter) でログイン
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

