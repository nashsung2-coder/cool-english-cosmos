import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Zap, Sword, Backpack, Heart, Sparkles, AlertCircle, CheckCircle2, Award } from "lucide-react";

/**
 * GamePage - 遊戲模式 (Game Mode) - 優化版（寵物學習連動與陪伴）
 * 
 * Design Philosophy: Deep Space Minimalism with Gamification & Emotional Bonding
 * - Pet growth directly linked to English learning tasks completed
 * - Interactive pet companionship (feeding, petting, dialog, mood status)
 * - Real-time learning reminders ("完成一個聽力任務讓寵物升級！")
 * - Achievement system driven by learning milestones
 */

export default function GamePage() {
  const [activeView, setActiveView] = useState<"pet" | "map" | "expedition" | "arena" | "backpack">("pet");
  const [selectedPlanet, setSelectedPlanet] = useState<string | null>(null);
  const [petExp, setPetExp] = useState(750);
  const [petLevel, setPetLevel] = useState(15);
  const [petMood, setPetMood] = useState("開心興奮 ✨");
  const [feedCount, setFeedCount] = useState(3);

  const handleFeed = () => {
    if (feedCount > 0) {
      setFeedCount(feedCount - 1);
      setPetExp((prev) => prev + 100);
      setPetMood("飽足幸福 💖");
    }
  };

  const planets = [
    { id: "listening", name: "聽力星", color: "#60A5FA", icon: "👂", desc: "完成聽力任務獲得音波晶石" },
    { id: "speaking", name: "口說星", color: "#FFD166", icon: "🎤", desc: "完成口說評測獲得回音羽毛" },
    { id: "reading", name: "閱讀星", color: "#5CE0B8", icon: "📖", desc: "完成分級閱讀獲得知識古卷" },
    { id: "writing", name: "寫作星", color: "#F07B6B", icon: "✏️", desc: "完成寫作偵錯獲得星光墨水" },
    { id: "vocabulary", name: "字彙星", color: "#A977F4", icon: "📚", desc: "完成字彙測驗獲得記憶水晶" },
    { id: "grammar", name: "文法星", color: "#5CC9A7", icon: "⚙️", desc: "完成文法挑戰獲得秩序之輪" },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Top Status Bar with Learning Reminder */}
      <div className="sticky top-0 z-40 border-b border-white/6 bg-background/90 backdrop-cosmic">
        <div className="container py-3 flex flex-col md:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <span className="text-xl font-bold bg-gradient-to-r from-amber-300 to-orange-400 bg-clip-text text-transparent">
              星辰冒險 (遊戲指揮艙)
            </span>
            <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-xs text-amber-300 animate-pulse">
              <Sparkles className="w-3.5 h-3.5" />
              <span>【學習提醒】完成今日 1 個聽力任務，寵物將獲得雙倍經驗與進化碎片！</span>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 text-sm font-mono">
              <Zap className="w-4 h-4 text-accent" />
              <span>能量: 1250 / 1500</span>
            </div>
            <div className="text-xs px-2.5 py-1 rounded-full bg-white/10 text-muted-foreground font-mono">
              賽季排名: Top 88
            </div>
          </div>
        </div>
      </div>

      <div className="container py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left: Companion Pet Interactive Display */}
          <div className="lg:col-span-1">
            <CompanionPetCard
              petLevel={petLevel}
              petExp={petExp}
              petMood={petMood}
              feedCount={feedCount}
              onFeed={handleFeed}
            />
          </div>

          {/* Right: Main Game Views */}
          <div className="lg:col-span-3">
            <Tabs value={activeView} onValueChange={(v) => setActiveView(v as any)}>
              <TabsList className="grid w-full grid-cols-5 bg-white/5 p-1 rounded-xl">
                <TabsTrigger value="pet">🐉 寵物養成</TabsTrigger>
                <TabsTrigger value="map">🗺️ 星際地圖</TabsTrigger>
                <TabsTrigger value="expedition">⚔️ 知識遠征</TabsTrigger>
                <TabsTrigger value="arena">🏆 競技場</TabsTrigger>
                <TabsTrigger value="backpack">🎒 背包寶庫</TabsTrigger>
              </TabsList>

              {/* Pet Training & Companion Tab */}
              <TabsContent value="pet" className="mt-6 space-y-6">
                <PetBondingSection petLevel={petLevel} />
              </TabsContent>

              {/* Star Map Tab */}
              <TabsContent value="map" className="mt-6">
                <div className="glass-card p-8">
                  <h2 className="text-xl font-semibold mb-2">六顆知識星球與學習連動</h2>
                  <p className="text-sm text-muted-foreground mb-6">點擊星球即可前往對應的 Cool English 官方學習資源，完成後寵物將自動獲得經驗升級！</p>
                  <StarMap
                    planets={planets}
                    selectedPlanet={selectedPlanet}
                    onSelectPlanet={setSelectedPlanet}
                  />
                </div>
              </TabsContent>

              {/* Expedition Tab */}
              <TabsContent value="expedition" className="mt-6">
                <ExpeditionView planets={planets} selectedPlanet={selectedPlanet} />
              </TabsContent>

              {/* Arena Tab */}
              <TabsContent value="arena" className="mt-6">
                <ArenaView />
              </TabsContent>

              {/* Backpack Tab */}
              <TabsContent value="backpack" className="mt-6">
                <BackpackView />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * CompanionPetCard - 寵物陪伴與養成卡片
 */
function CompanionPetCard({
  petLevel,
  petExp,
  petMood,
  feedCount,
  onFeed,
}: {
  petLevel: number;
  petExp: number;
  petMood: string;
  feedCount: number;
  onFeed: () => void;
}) {
  return (
    <div className="glass-card p-6 text-center space-y-4 border-t-4 border-t-amber-400">
      {/* Pet Avatar with Animation */}
      <div className="relative inline-block py-4">
        <div className="text-7xl animate-float">🐉</div>
        <span className="absolute top-2 right-0 px-2 py-0.5 rounded-full text-xs font-bold bg-accent text-accent-foreground font-mono shadow-lg">
          Lv.{petLevel}
        </span>
      </div>

      <div>
        <h3 className="text-lg font-bold text-white mb-1">星光龍 · 艾克</h3>
        <p className="text-xs text-amber-300 italic mb-2">“主人，今天也要一起背單字、探索宇宙喔！”</p>
        <div className="inline-block px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-muted-foreground">
          心情：<span className="text-white font-medium">{petMood}</span>
        </div>
      </div>

      {/* Experience Bar */}
      <div className="space-y-1.5 text-left">
        <div className="flex justify-between text-xs">
          <span className="text-muted-foreground">升級進度</span>
          <span className="text-accent font-mono">{petExp} / 1000 XP</span>
        </div>
        <div className="w-full h-2.5 bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-amber-400 to-orange-500 rounded-full transition-all duration-500"
            style={{ width: `${(petExp / 1000) * 100}%` }}
          />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-2 pt-2">
        <Button
          onClick={onFeed}
          disabled={feedCount === 0}
          className="w-full bg-gradient-to-r from-amber-400 to-orange-500 text-black font-semibold text-sm hover:opacity-90"
        >
          🍎 餵食學習果實 ({feedCount}/3)
        </Button>
        <Button variant="outline" className="w-full text-xs">
          💬 與寵物對話互動
        </Button>
      </div>

      <div className="text-xs text-muted-foreground pt-2 border-t border-white/6">
        💡 提示：前往專攻區完成英語任務可獲得更多學習果實！
      </div>
    </div>
  );
}

/**
 * PetBondingSection - 寵物養成與陪伴詳細面板
 */
function PetBondingSection({ petLevel }: { petLevel: number }) {
  return (
    <div className="space-y-6">
      {/* Companion Story & Quotes */}
      <div className="glass-card p-6 bg-gradient-to-br from-amber-500/10 to-transparent border-amber-500/20">
        <div className="flex items-center gap-3 mb-3">
          <Sparkles className="w-5 h-5 text-amber-400" />
          <h3 className="text-lg font-semibold text-white">寵物陪伴與英語學習成長日誌</h3>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed mb-4">
          你的寵物「艾克」會隨著你的英語學習打卡而成長。每完成一個聽力、閱讀或寫作任務，艾克就會吸收知識能量，解鎖全新的外觀翅膀與魔法技能！
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white/5 border border-white/10 rounded-lg p-4">
            <div className="text-xs text-muted-foreground mb-1">當前外觀階段</div>
            <div className="font-semibold text-amber-300">幼龍期 (星能羽翼)</div>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-lg p-4">
            <div className="text-xs text-muted-foreground mb-1">下一次進化條件</div>
            <div className="font-semibold text-white">達到 Lv.20 且完成 5 篇閱讀任務</div>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-lg p-4">
            <div className="text-xs text-muted-foreground mb-1">陪伴總時數</div>
            <div className="font-semibold text-emerald-400">48.5 小時</div>
          </div>
        </div>
      </div>

      {/* Learning Reminder Checklist */}
      <div className="glass-card p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <AlertCircle className="w-5 h-5 text-amber-400" />
          <span>今日寵物成長任務（完成即可餵食寵物）</span>
        </h3>
        <div className="space-y-3">
          {[
            { title: "完成 1 個聽力主題影片練習", resource: "生活主題影片", url: "https://www.coolenglish.edu.tw/course/view.php?id=866", done: true },
            { title: "完成 1 篇 VOA 閱讀測驗", resource: "全球新鮮事", url: "https://www.coolenglish.edu.tw/course/view.php?id=489", done: false },
            { title: "完成 1 次寫作偵錯練習", resource: "酷英AI寫作偵錯", url: "https://www.coolenglish.edu.tw/course/view.php?id=841", done: false },
          ].map((task, idx) => (
            <div key={idx} className="flex items-center justify-between p-4 rounded-lg bg-white/3 border border-white/6 hover:bg-white/6 transition-all">
              <div className="flex items-center gap-3">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${task.done ? "bg-emerald-500 text-white" : "bg-white/10 text-muted-foreground"}`}>
                  {task.done ? "✓" : idx + 1}
                </div>
                <div>
                  <div className={`text-sm font-medium ${task.done ? "line-through text-muted-foreground" : "text-white"}`}>
                    {task.title}
                  </div>
                  <div className="text-xs text-amber-300">獎勵：寵物經驗 +150，獲 1 顆學習果實</div>
                </div>
              </div>
              <a
                href={task.url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-lg bg-accent text-accent-foreground text-xs font-medium hover:opacity-90 transition-all"
              >
                前往學習 ↗
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/**
 * StarMap - 星圖與星球連結
 */
function StarMap({
  planets,
  selectedPlanet,
  onSelectPlanet,
}: {
  planets: any[];
  selectedPlanet: string | null;
  onSelectPlanet: (id: string) => void;
}) {
  return (
    <div className="w-full flex flex-col items-center justify-center py-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
        {planets.map((planet) => (
          <div
            key={planet.id}
            onClick={() => onSelectPlanet(planet.id)}
            className="glass-card p-5 hover:bg-white/6 transition-all cursor-pointer border-l-4"
            style={{ borderLeftColor: planet.color }}
          >
            <div className="flex items-center gap-3 mb-2">
              <span className="text-3xl">{planet.icon}</span>
              <div>
                <h4 className="font-semibold text-white">{planet.name}</h4>
                <span className="text-xs text-accent">點擊查看關卡</span>
              </div>
            </div>
            <p className="text-xs text-muted-foreground">{planet.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * ExpeditionView - 知識遠征
 */
function ExpeditionView({ planets, selectedPlanet }: { planets: any[]; selectedPlanet: string | null }) {
  const planet = planets.find((p) => p.id === selectedPlanet) || planets[0];

  const stages = [
    { id: 1, name: "初階航道：基礎對話", url: "https://www.coolenglish.edu.tw/course/view.php?id=866", difficulty: "⭐", rewards: "經驗 +100" },
    { id: 2, name: "中階航道：情境聽力", url: "https://www.coolenglish.edu.tw/course/view.php?id=90", difficulty: "⭐⭐", rewards: "經驗 +200" },
    { id: 3, name: "挑戰航道：新聞快譯", url: "https://www.coolenglish.edu.tw/course/view.php?id=4", difficulty: "⭐⭐⭐", rewards: "經驗 +400" },
  ];

  return (
    <div className="space-y-6">
      <div className="glass-card p-6 border-l-4" style={{ borderLeftColor: planet.color }}>
        <h3 className="text-xl font-semibold mb-2">{planet.name} 遠征任務</h3>
        <p className="text-sm text-muted-foreground mb-4">{planet.desc}</p>
        <span className="text-xs px-2.5 py-1 rounded bg-accent/20 text-accent font-mono">
          當前選中星球
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stages.map((stage) => (
          <div key={stage.id} className="glass-card p-5 flex flex-col justify-between hover:bg-white/6 transition-all">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-mono text-amber-300">{stage.difficulty}</span>
                <span className="text-xs text-muted-foreground">{stage.rewards}</span>
              </div>
              <h4 className="font-semibold text-sm mb-3 text-white">{stage.name}</h4>
            </div>
            <a
              href={stage.url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full text-center py-2.5 rounded-lg bg-accent text-accent-foreground text-xs font-medium hover:opacity-90 transition-all"
            >
              出發遠征 ↗
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * ArenaView - 競技場
 */
function ArenaView() {
  return (
    <div className="glass-card p-8 text-center space-y-4">
      <div className="text-5xl mb-2">⚔️</div>
      <h3 className="text-xl font-bold">星際寵物競技場</h3>
      <p className="text-sm text-muted-foreground max-w-md mx-auto">
        使用你在 Cool English 學習累積的單字與文法知識，在限時對戰中擊敗對手，贏取賽季積分與稀有裝備碎片！
      </p>
      <Button className="bg-accent text-accent-foreground font-semibold px-8 py-3 mt-4">
        開始匹配對手
      </Button>
    </div>
  );
}

/**
 * BackpackView - 背包寶庫
 */
function BackpackView() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {[
        { name: "學習果實", qty: 5, icon: "🍎", desc: "增加寵物 100 XP" },
        { name: "雙倍經驗卡", qty: 2, icon: "⚡", desc: "1小時內經驗加倍" },
        { name: "星能羽翼碎片", qty: 8, icon: "✨", desc: "寵物進化材料" },
        { name: "記憶水晶", qty: 12, icon: "💎", desc: "解鎖高級題庫" },
      ].map((item, idx) => (
        <div key={idx} className="glass-card p-5 text-center hover:bg-white/6 transition-all">
          <div className="text-4xl mb-2">{item.icon}</div>
          <h4 className="font-semibold text-sm text-white mb-1">{item.name}</h4>
          <p className="text-xs text-muted-foreground mb-3">{item.desc}</p>
          <span className="text-xs px-2 py-0.5 rounded bg-white/10 font-mono text-accent">數量：{item.qty}</span>
        </div>
      ))}
    </div>
  );
}
