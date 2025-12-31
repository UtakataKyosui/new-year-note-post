import React, { useState } from 'react';
import { Send, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

function App() {
  const [goal, setGoal] = useState('');
  const [server, setServer] = useState('');

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
    <div className="min-h-screen w-full flex items-center justify-center bg-background p-4 pattern-paper">

      {/* Decorative Elements */}
      <div className="fixed top-0 left-0 w-full h-2 bg-primary z-50"></div>
      <div className="fixed bottom-0 left-0 w-full h-2 bg-secondary z-50"></div>

      <Card className="w-full max-w-lg shadow-xl border-secondary/20 relative overflow-hidden backdrop-blur-sm bg-card/95">

        {/* Decorative Circle/Sun */}
        <div className="absolute -right-20 -top-20 w-40 h-40 bg-primary/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -left-20 -bottom-20 w-40 h-40 bg-secondary/10 rounded-full blur-3xl pointer-events-none"></div>

        <CardHeader className="text-center space-y-2 pb-2">
          <div className="mx-auto bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-2">
            <Sparkles className="text-primary w-6 h-6" />
          </div>
          <CardTitle className="text-3xl font-bold text-primary tracking-wide">謹賀新年</CardTitle>
          <CardDescription className="text-lg font-medium text-secondary">
            Happy New Year 2025
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6 pt-6">
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

      <div className="fixed bottom-4 text-center w-full text-xs text-muted-foreground pointer-events-none">
        &copy; 2025 New Year Goals
      </div>
    </div>
  );
}

export default App;
