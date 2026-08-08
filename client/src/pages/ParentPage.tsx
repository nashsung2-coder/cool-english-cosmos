import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronDown, Bell, Settings } from "lucide-react";

/**
 * ParentPage - 家長區 (Parent Zone)
 * 
 * Design Philosophy: Deep Space Minimalism with Warmth
 * - Child switcher at top
 * - Growth summary card with highlights
 * - Ability landscape (softened radar)
 * - Co-learning cabin with recommendations
 * - Growth album with milestones
 * - Encouragement booth with stickers
 */

export default function ParentPage() {
  const [selectedChild, setSelectedChild] = useState("child1");
  const [activeTab, setActiveTab] = useState("overview");

  const children = [
    { id: "child1", name: "小明", grade: "國中一年級" },
    { id: "child2", name: "小紅", grade: "國小五年級" },
  ];

  const currentChild = children.find((c) => c.id === selectedChild);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Top Navigation */}
      <div className="sticky top-0 z-40 border-b border-white/6 bg-background/80 backdrop-cosmic">
        <div className="container py-4 flex items-center justify-between">
          {/* Child Switcher */}
          <div className="relative group">
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-all">
              <span className="font-medium">{currentChild?.name}</span>
              <ChevronDown className="w-4 h-4" />
            </button>
            <div className="absolute left-0 mt-2 w-48 bg-cosmos-panel-dark border border-white/10 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
              {children.map((child) => (
                <button
                  key={child.id}
                  onClick={() => setSelectedChild(child.id)}
                  className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                    selectedChild === child.id
                      ? "bg-accent/20 text-accent"
                      : "hover:bg-white/5"
                  }`}
                >
                  <div className="font-medium">{child.name}</div>
                  <div className="text-xs text-muted-foreground">{child.grade}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-4">
            <button className="p-2 rounded-lg hover:bg-white/5 transition-all">
              <Bell className="w-5 h-5" />
            </button>
            <button className="p-2 rounded-lg hover:bg-white/5 transition-all">
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container py-8">
        <div className="space-y-6">
          {/* Growth Summary Card */}
          <GrowthSummaryCard child={currentChild} />

          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-4 bg-white/5">
              <TabsTrigger value="overview">概覽</TabsTrigger>
              <TabsTrigger value="ability">能力</TabsTrigger>
              <TabsTrigger value="colearn">親子共學</TabsTrigger>
              <TabsTrigger value="album">相簿</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="mt-6 space-y-6">
              <AbilityLandscape />
              <EncouragementBooth />
            </TabsContent>

            {/* Ability Tab */}
            <TabsContent value="ability" className="mt-6">
              <AbilityDetail />
            </TabsContent>

            {/* Co-learning Tab */}
            <TabsContent value="colearn" className="mt-6">
              <CoLearningCabin />
            </TabsContent>

            {/* Album Tab */}
            <TabsContent value="album" className="mt-6">
              <GrowthAlbum />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

/**
 * GrowthSummaryCard - 成長摘要卡
 */
function GrowthSummaryCard({ child }: { child: any }) {
  return (
    <div className="glass-card p-6 md:p-8 flex flex-col md:flex-row items-center gap-8">
      {/* Left: Greeting & Highlights */}
      <div className="flex-1">
        <h2 className="text-2xl font-bold mb-6">
          👋 {child?.name} 最近表現不錯呢！
        </h2>

        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white/5 border border-white/10 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-accent mb-1">7</div>
            <div className="text-xs text-muted-foreground">本週學習天數</div>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-accent mb-1">3</div>
            <div className="text-xs text-muted-foreground">新解鎖技能</div>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-accent mb-1">23</div>
            <div className="text-xs text-muted-foreground">連續天數</div>
          </div>
        </div>

        {/* Alert */}
        <div className="mt-6 p-4 rounded-lg bg-amber-500/10 border border-amber-500/30 text-sm">
          <span className="text-amber-300">⚠️</span> 聽力練習量下降，建議增加練習頻率
        </div>
      </div>

      {/* Right: Pet/Illustration */}
      <div className="text-center">
        <div className="text-6xl mb-4 animate-float">🐉</div>
        <div className="text-sm text-muted-foreground">星龍 Lv. 15</div>
      </div>
    </div>
  );
}

/**
 * AbilityLandscape - 能力風景（柔化雷達圖）
 */
function AbilityLandscape() {
  const dimensions = [
    { name: "聽力", value: 85, description: "聽得懂日常對話" },
    { name: "口說", value: 70, description: "能簡單交談" },
    { name: "閱讀", value: 80, description: "能理解短文" },
    { name: "寫作", value: 65, description: "能寫簡單句子" },
    { name: "字彙", value: 75, description: "詞彙量中等" },
    { name: "文法", value: 72, description: "掌握基本文法" },
  ];

  return (
    <div className="glass-card p-6">
      <h3 className="text-lg font-semibold mb-6">能力風景</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Radar */}
        <div className="flex items-center justify-center">
          <svg viewBox="0 0 200 200" className="w-full max-w-xs">
            {/* Grid circles */}
            {[1, 2, 3, 4, 5].map((i) => (
              <circle
                key={`grid-${i}`}
                cx="100"
                cy="100"
                r={(i * 30).toString()}
                fill="none"
                stroke="rgba(255,255,255,0.1)"
                strokeWidth="1"
              />
            ))}

            {/* Axes */}
            {dimensions.map((_, idx) => {
              const angle = (idx * 360) / dimensions.length;
              const rad = (angle * Math.PI) / 180;
              const x = 100 + 120 * Math.cos(rad - Math.PI / 2);
              const y = 100 + 120 * Math.sin(rad - Math.PI / 2);
              return (
                <line
                  key={`axis-${idx}`}
                  x1="100"
                  y1="100"
                  x2={x}
                  y2={y}
                  stroke="rgba(255,255,255,0.1)"
                  strokeWidth="1"
                />
              );
            })}

            {/* Data polygon */}
            <polygon
              points={dimensions
                .map((dim, idx) => {
                  const angle = (idx * 360) / dimensions.length;
                  const rad = (angle * Math.PI) / 180;
                  const r = (dim.value / 100) * 100;
                  const x = 100 + r * Math.cos(rad - Math.PI / 2);
                  const y = 100 + r * Math.sin(rad - Math.PI / 2);
                  return `${x},${y}`;
                })
                .join(" ")}
              fill="rgba(92, 201, 167, 0.15)"
              stroke="rgba(92, 201, 167, 0.6)"
              strokeWidth="2"
            />
          </svg>
        </div>

        {/* Descriptions */}
        <div className="space-y-3">
          {dimensions.map((dim) => (
            <div key={dim.name} className="flex items-center gap-3">
              <div className="text-sm font-medium min-w-12">{dim.name}</div>
              <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-mint-400 to-mint-500"
                  style={{ width: `${dim.value}%` }}
                />
              </div>
              <div className="text-xs text-muted-foreground">{dim.description}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/**
 * AbilityDetail - 能力詳細資訊
 */
function AbilityDetail() {
  return (
    <div className="glass-card p-6">
      <p className="text-muted-foreground">能力詳細分析功能開發中</p>
    </div>
  );
}

/**
 * CoLearningCabin - 親子共學艙
 */
function CoLearningCabin() {
  const recommendations = [
    {
      id: 1,
      name: "日常對話入門",
      description: "適合 A1 程度，親子一起學習日常用語",
      duration: "2 週",
      difficulty: "初級",
    },
    {
      id: 2,
      name: "新聞聽力練習",
      description: "提升聽力理解，掌握時事英文",
      duration: "4 週",
      difficulty: "中級",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Recommendations */}
      <div>
        <h3 className="text-lg font-semibold mb-4">推薦共學套餐</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {recommendations.map((rec) => (
            <div key={rec.id} className="glass-card p-4 hover:bg-white/6 transition-all">
              <h4 className="font-semibold mb-2">{rec.name}</h4>
              <p className="text-sm text-muted-foreground mb-4">{rec.description}</p>
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">{rec.duration} · {rec.difficulty}</span>
                <Button size="sm" className="bg-accent text-accent-foreground">
                  開始
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Shared Goals */}
      <div>
        <h3 className="text-lg font-semibold mb-4">共同目標</h3>
        <div className="glass-card p-6">
          <div className="text-center py-8 text-muted-foreground">
            <p className="mb-4">還沒有共同目標</p>
            <Button className="bg-accent text-accent-foreground">
              建立目標
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * GrowthAlbum - 成長相簿
 */
function GrowthAlbum() {
  const milestones = [
    {
      id: 1,
      type: "achievement",
      title: "解鎖新技能：新聞理解",
      date: "2024/08/05",
      icon: "🏆",
    },
    {
      id: 2,
      type: "milestone",
      title: "連續學習 20 天",
      date: "2024/08/03",
      icon: "🔥",
    },
    {
      id: 3,
      type: "score",
      title: "聽力測驗: 85 分",
      date: "2024/07/28",
      icon: "📊",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {milestones.map((milestone) => (
        <div key={milestone.id} className="glass-card p-6 text-center hover:bg-white/6 transition-all">
          <div className="text-4xl mb-3">{milestone.icon}</div>
          <h4 className="font-semibold mb-2">{milestone.title}</h4>
          <div className="text-xs text-muted-foreground mb-4">{milestone.date}</div>
          <Button variant="outline" size="sm">
            分享
          </Button>
        </div>
      ))}
    </div>
  );
}

/**
 * EncouragementBooth - 加油小棧
 */
function EncouragementBooth() {
  const stickers = ["👍", "🌟", "🎉", "💪", "🚀", "❤️"];
  const messages = [
    "你做得很好！",
    "繼續加油！",
    "我為你驕傲！",
    "你是最棒的！",
  ];

  return (
    <div className="glass-card p-6">
      <h3 className="text-lg font-semibold mb-6">加油小棧</h3>

      <div className="space-y-4">
        {/* Stickers */}
        <div>
          <div className="text-sm text-muted-foreground mb-3">選擇貼圖</div>
          <div className="flex gap-2 flex-wrap">
            {stickers.map((sticker, idx) => (
              <button
                key={idx}
                className="text-3xl p-2 rounded-lg hover:bg-white/10 transition-all transform hover:scale-110"
              >
                {sticker}
              </button>
            ))}
          </div>
        </div>

        {/* Messages */}
        <div>
          <div className="text-sm text-muted-foreground mb-3">快速鼓勵語</div>
          <div className="grid grid-cols-2 gap-2">
            {messages.map((msg, idx) => (
              <button
                key={idx}
                className="px-3 py-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-sm"
              >
                {msg}
              </button>
            ))}
          </div>
        </div>

        {/* Send Button */}
        <Button className="w-full bg-accent text-accent-foreground mt-4">
          發送給孩子
        </Button>

        <div className="text-xs text-muted-foreground text-center">
          每小時限制 3 次，避免打擾
        </div>
      </div>
    </div>
  );
}
