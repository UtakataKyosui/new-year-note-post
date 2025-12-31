import React, { useState } from 'react';
import { Send, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from "@/lib/utils";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';


import TransparentImage from '@/components/TransparentImage';

function App() {
  const [goal, setGoal] = useState('');
  const [server, setServer] = useState('');
  const [debouncedServer, setDebouncedServer] = useState('');

  // Debounce server input to fetch icon
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedServer(server);
    }, 500);
    return () => clearTimeout(timer);
  }, [server]);

  // Determine icon URL
  const serverIconUrl = debouncedServer
    ? `https://www.google.com/s2/favicons?domain=${debouncedServer.replace(/^https?:\/\//, '').replace(/\/$/, '')}&sz=128`
    : null;

  const handleShare = () => {
    if (!server) {
      alert('MisskeyサーバーのURLを入力してください');
      return;
    }

    const text = `新年あけましておめでとうございます！\n\n今年の抱負: ${goal}\n\n#HappyNewYear2025 #Misskey`;
    const cleanServer = server.replace(/^https?:\/\//, '').replace(/\/$/, '');
    const url = `https://${cleanServer}/share?text=${encodeURIComponent(text)}`;

    window.open(url, '_blank');
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background p-4 pattern-paper overflow-hidden relative">

      {/* Decorative Elements */}
      <div className="fixed top-0 left-0 w-full h-2 bg-primary z-50"></div>
      <div className="fixed bottom-0 left-0 w-full h-2 bg-primary z-50"></div>

      {/* Kadomatsu Illustrations */}
      <TransparentImage
        src="/kadomatsu_left.png"
        alt="Kadomatsu Left"
        className="fixed bottom-0 left-0 w-32 md:w-48 lg:w-64 z-0 pointer-events-none drop-shadow-xl"
      />
      <TransparentImage
        src="/kadomatsu_right.png"
        alt="Kadomatsu Right"
        className="fixed bottom-0 right-0 w-32 md:w-48 lg:w-64 z-0 pointer-events-none drop-shadow-xl"
      />

      <Card className="w-full max-w-lg shadow-xl border-secondary/20 relative overflow-visible backdrop-blur-sm bg-card/95 z-10">

        {/* Decorative Circle/Sun */}
        <div className="absolute -right-20 -top-20 w-40 h-40 bg-primary/10 rounded-full blur-3xl pointer-events-none overflow-hidden"></div>
        <div className="absolute -left-20 -bottom-20 w-40 h-40 bg-secondary/10 rounded-full blur-3xl pointer-events-none overflow-hidden"></div>

        <CardHeader className="text-center space-y-2 pb-2 relative">
          {/* Server Icon "Between Decorations" (Top Center of Card) */}
          <div className="mx-auto w-20 h-20 rounded-full flex items-center justify-center mb-4 relative bg-background border-4 border-secondary shadow-lg transition-all duration-500 ease-in-out">
            {serverIconUrl ? (
              <img
                src={serverIconUrl}
                alt="Server Icon"
                className="w-full h-full object-cover rounded-full p-0.5"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.nextElementSibling?.classList.remove('hidden');
                }}
              />
            ) : null}
            <Sparkles className={cn("text-primary w-10 h-10 absolute transition-opacity duration-300", serverIconUrl ? "hidden opacity-0" : "opacity-100")} />
            {/* Fallback for error */}
            <Sparkles className="text-primary w-10 h-10 absolute hidden" />
          </div>

          <CardTitle className="text-3xl font-bold text-primary tracking-wide">謹賀新年</CardTitle>
          <CardDescription className="text-lg font-medium text-secondary">
            Happy New Year 2025
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6 pt-2">
          <div className="space-y-2">
            <Label htmlFor="goal" className="text-base">今年の抱負</Label>
            <Textarea
              id="goal"
              placeholder="例: 毎日コードを書く、健康第一..."
              className="resize-none min-h-[100px] border-secondary/30 focus-visible:ring-secondary/50 text-lg"
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="server">Misskey Server</Label>
            <div className="relative">
              <span className="absolute left-3 top-2.5 text-muted-foreground text-sm">https://</span>
              <Input
                id="server"
                placeholder="misskey.io"
                className="pl-16 border-secondary/30 focus-visible:ring-secondary/50"
                value={server}
                onChange={(e) => setServer(e.target.value)}
              />
            </div>
          </div>
        </CardContent>

        <CardFooter className="pt-2 pb-8">
          <Button
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-lg h-12 shadow-md transition-all hover:scale-[1.02]"
            onClick={handleShare}
          >
            <Send className="w-5 h-5 mr-2" />
            抱負を投稿する
          </Button>
        </CardFooter>
      </Card>

      <div className="fixed bottom-4 text-center w-full text-xs text-muted-foreground pointer-events-none z-20">
        &copy; 2025 New Year Goals
      </div>
    </div>
  );
}

export default App;
