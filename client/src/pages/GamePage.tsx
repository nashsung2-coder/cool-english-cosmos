import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Zap, Sword, Backpack } from "lucide-react";

/**
 * GamePage - 遊戲模式 (Game Mode)
 * 
 * Design Philosophy: Deep Space Minimalism with Gamification
 * - Pet display on left side
 * - Star map with six knowledge planets
 * - Adventure expeditions with battles
 * - Pet battles arena
 * - Treasure backpack
 */

export default function GamePage() {
  const [activeView, setActiveView] = useState<"map" | "expedition" | "arena" | "backpack">("map");
  const [selectedPlanet, setSelectedPlanet] = useState<string | null>(null);

  const planets = [
    { id: "listening", name: "聽力星", color: "#60A5FA", icon: "👂" },
    { id: "speaking", name: "口說星", color: "#FFD166", icon: "🎤" },
    { id: "reading", name: "閱讀星", color: "#5CE0B8", icon: "📖" },
    { id: "writing", name: "寫作星", color: "#F07B6B", icon: "✏️" },
    { id: "vocabulary", name: "字彙星", color: "#A977F4", icon: "📚" },
    { id: "grammar", name: "文法星", color: "#5CC9A7", icon: "⚙️" },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Top Status Bar */}
      <div className="sticky top-0 z-40 border-b border-white/6 bg-background/80 backdrop-cosmic">
        <div className="container py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold">星辰冒險</h1>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-accent" />
              <span className="font-mono">能量: 1200 / 1500</span>
            </div>
            <div className="text-sm text-muted-foreground">排名: Top 100</div>
          </div>
        </div>
      </div>

      <div className="container py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left: Pet Display */}
          <div className="lg:col-span-1">
            <PetDisplay />
          </div>

          {/* Right: Main Content */}
          <div className="lg:col-span-3">
            <Tabs value={activeView} onValueChange={(v) => setActiveView(v as any)}>
              <TabsList className="grid w-full grid-cols-4 bg-white/5 mb-6">
                <TabsTrigger value="map">星圖</TabsTrigger>
                <TabsTrigger value="expedition">遠征</TabsTrigger>
                <TabsTrigger value="arena">競技場</TabsTrigger>
                <TabsTrigger value="backpack">背包</TabsTrigger>
              </TabsList>

              {/* Star Map View */}
              <TabsContent value="map" className="mt-6">
                <div className="glass-card p-8">
                  <h2 className="text-xl font-semibold mb-8">六顆知識星球</h2>
                  <StarMap
                    planets={planets}
                    selectedPlanet={selectedPlanet}
                    onSelectPlanet={setSelectedPlanet}
                  />
                </div>
              </TabsContent>

              {/* Expedition View */}
              <TabsContent value="expedition" className="mt-6">
                <ExpeditionView planets={planets} selectedPlanet={selectedPlanet} />
              </TabsContent>

              {/* Arena View */}
              <TabsContent value="arena" className="mt-6">
                <ArenaView />
              </TabsContent>

              {/* Backpack View */}
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
 * PetDisplay - 寵物展示區
 */
function PetDisplay() {
  return (
    <div className="glass-card p-6 text-center">
      <div className="text-6xl mb-4">🐉</div>
      <h3 className="text-lg font-bold mb-1">星龍</h3>
      <div className="text-sm text-accent mb-4">Lv. 15</div>

      {/* HP and MP bars */}
      <div className="space-y-3 mb-6">
        <div>
          <div className="text-xs text-muted-foreground mb-1">HP</div>
          <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-red-500 to-red-600"
              style={{ width: "75%" }}
            />
          </div>
        </div>
        <div>
          <div className="text-xs text-muted-foreground mb-1">MP</div>
          <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-blue-600"
              style={{ width: "60%" }}
            />
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-2">
        <Button className="w-full bg-accent text-accent-foreground text-sm">
          餵食
        </Button>
        <Button variant="outline" className="w-full text-sm">
          進化
        </Button>
      </div>
    </div>
  );
}

/**
 * StarMap - 環形星圖展示
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
    <div className="w-full h-96 flex items-center justify-center">
      <svg viewBox="0 0 400 400" className="w-full max-w-sm">
        {/* Orbits */}
        <circle cx="200" cy="200" r="120" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
        <circle cx="200" cy="200" r="100" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />

        {/* Center star */}
        <circle cx="200" cy="200" r="8" fill="#F0C45A" />

        {/* Planets */}
        {planets.map((planet, idx) => {
          const angle = (idx * 360) / planets.length;
          const rad = (angle * Math.PI) / 180;
          const x = 200 + 110 * Math.cos(rad - Math.PI / 2);
          const y = 200 + 110 * Math.sin(rad - Math.PI / 2);
          const isSelected = selectedPlanet === planet.id;

          return (
            <g key={planet.id} onClick={() => onSelectPlanet(planet.id)} className="cursor-pointer">
              {/* Orbit line */}
              <line
                x1="200"
                y1="200"
                x2={x}
                y2={y}
                stroke="rgba(255,255,255,0.1)"
                strokeWidth="1"
                strokeDasharray="2,2"
              />

              {/* Planet circle */}
              <circle
                cx={x}
                cy={y}
                r={isSelected ? 18 : 12}
                fill={planet.color}
                opacity={isSelected ? 1 : 0.7}
                className="transition-all duration-300"
              />

              {/* Planet label */}
              <text
                x={x}
                y={y + 30}
                textAnchor="middle"
                fill="rgba(232, 236, 241, 0.8)"
                fontSize="12"
                className="pointer-events-none"
              >
                {planet.name}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

/**
 * ExpeditionView - 知識遠征
 */
function ExpeditionView({ planets, selectedPlanet }: { planets: any[]; selectedPlanet: string | null }) {
  const planet = planets.find((p) => p.id === selectedPlanet);

  if (!selectedPlanet || !planet) {
    return (
      <div className="glass-card p-8 text-center text-muted-foreground">
        請先從星圖中選擇一顆星球
      </div>
    );
  }

  const stages = [
    { id: 1, name: "基礎關卡", type: "normal", difficulty: "⭐", rewards: "經驗 +50" },
    { id: 2, name: "進階關卡", type: "normal", difficulty: "⭐⭐", rewards: "經驗 +100" },
    { id: 3, name: "挑戰關卡", type: "challenge", difficulty: "⭐⭐⭐", rewards: "經驗 +200" },
    { id: 4, name: "Boss 戰", type: "boss", difficulty: "⭐⭐⭐⭐", rewards: "經驗 +500" },
  ];

  return (
    <div className="space-y-4">
      <div className="glass-card p-4 border-l-4" style={{ borderLeftColor: planet.color }}>
        <h3 className="text-lg font-semibold mb-2">{planet.name} 遠征</h3>
        <p className="text-sm text-muted-foreground">選擇一個關卡開始冒險</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {stages.map((stage) => (
          <div
            key={stage.id}
            className="glass-card p-4 hover:bg-white/6 transition-all cursor-pointer"
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <h4 className="font-semibold">{stage.name}</h4>
                <div className="text-sm text-muted-foreground mt-1">{stage.difficulty}</div>
              </div>
              <div className="text-xs bg-accent/20 text-accent px-2 py-1 rounded">
                {stage.type === "boss" ? "Boss" : stage.type === "challenge" ? "挑戰" : "普通"}
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">{stage.rewards}</span>
              <Button size="sm" className="bg-accent text-accent-foreground">
                出發
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * ArenaView - 寵物競技場
 */
function ArenaView() {
  return (
    <div className="space-y-6">
      <div className="glass-card p-6">
        <h3 className="text-lg font-semibold mb-4">寵物競技場</h3>

        {/* Season Info */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-white/3 border border-white/6 rounded-lg p-4">
            <div className="text-xs text-muted-foreground mb-1">賽季排名</div>
            <div className="text-2xl font-bold">Top 100</div>
          </div>
          <div className="bg-white/3 border border-white/6 rounded-lg p-4">
            <div className="text-xs text-muted-foreground mb-1">本週勝數</div>
            <div className="text-2xl font-bold">12 勝</div>
          </div>
        </div>

        {/* Match Button */}
        <Button className="w-full bg-accent text-accent-foreground py-6 text-lg font-semibold">
          <Sword className="w-5 h-5 mr-2" />
          尋找對手 (消耗 50 能量)
        </Button>
      </div>

      {/* Match History */}
      <div className="glass-card p-6">
        <h3 className="text-lg font-semibold mb-4">最近比賽</h3>
        <div className="space-y-3">
          {[
            { opponent: "小明", result: "勝利", time: "2小時前" },
            { opponent: "小紅", result: "失敗", time: "5小時前" },
            { opponent: "小王", result: "勝利", time: "1天前" },
          ].map((match, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between p-3 rounded-lg bg-white/3 border border-white/6"
            >
              <div>
                <div className="font-medium">{match.opponent}</div>
                <div className="text-xs text-muted-foreground">{match.time}</div>
              </div>
              <div
                className={`px-3 py-1 rounded-lg text-sm font-medium ${
                  match.result === "勝利"
                    ? "bg-green-500/20 text-green-400"
                    : "bg-red-500/20 text-red-400"
                }`}
              >
                {match.result}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/**
 * BackpackView - 背包寶庫
 */
function BackpackView() {
  const items = [
    { id: 1, name: "經驗加倍卡", rarity: "rare", quantity: 3 },
    { id: 2, name: "能量恢復藥", rarity: "common", quantity: 12 },
    { id: 3, name: "傳說碎片", rarity: "legendary", quantity: 1 },
  ];

  return (
    <div className="space-y-6">
      <Tabs defaultValue="consumables" className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-white/5">
          <TabsTrigger value="consumables">消耗道具</TabsTrigger>
          <TabsTrigger value="equipment">裝備碎片</TabsTrigger>
          <TabsTrigger value="skins">寵物外觀</TabsTrigger>
          <TabsTrigger value="evolution">進化樹</TabsTrigger>
        </TabsList>

        <TabsContent value="consumables" className="mt-6">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {items.map((item) => (
              <div
                key={item.id}
                className={`p-4 rounded-lg border text-center cursor-pointer transition-all hover:scale-105 ${
                  item.rarity === "legendary"
                    ? "bg-yellow-500/10 border-yellow-500/50"
                    : item.rarity === "rare"
                      ? "bg-purple-500/10 border-purple-500/50"
                      : "bg-white/5 border-white/10"
                }`}
              >
                <div className="text-3xl mb-2">🎁</div>
                <div className="text-sm font-medium">{item.name}</div>
                <div className="text-xs text-muted-foreground mt-1">x{item.quantity}</div>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="equipment" className="mt-6">
          <div className="glass-card p-6 text-center text-muted-foreground">
            裝備合成功能開發中
          </div>
        </TabsContent>

        <TabsContent value="skins" className="mt-6">
          <div className="glass-card p-6 text-center text-muted-foreground">
            寵物外觀解鎖功能開發中
          </div>
        </TabsContent>

        <TabsContent value="evolution" className="mt-6">
          <div className="glass-card p-6 text-center text-muted-foreground">
            進化樹功能開發中
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
