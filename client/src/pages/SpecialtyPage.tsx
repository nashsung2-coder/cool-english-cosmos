import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart3, TreePine, Map, Award, Settings } from "lucide-react";

/**
 * SpecialtyPage - 專攻區 (Specialty Zone)
 * 
 * Design Philosophy: Deep Space Minimalism
 * - Left sidebar navigation (72px) with icon buttons
 * - Main content area with four views: Dashboard, Skill Tree, Learning Path, Records
 * - Radar chart for ability visualization
 * - Glass morphism cards and cosmic animations
 */

export default function SpecialtyPage() {
  const [activeView, setActiveView] = useState<"dashboard" | "skills" | "path" | "records">("dashboard");
  const [selectedDimension, setSelectedDimension] = useState<string>("listening");

  const dimensions = [
    { id: "listening", name: "聽力", color: "#60A5FA", icon: "👂" },
    { id: "speaking", name: "口說", color: "#FFD166", icon: "🎤" },
    { id: "reading", name: "閱讀", color: "#5CE0B8", icon: "📖" },
    { id: "writing", name: "寫作", color: "#F07B6B", icon: "✏️" },
    { id: "vocabulary", name: "字彙", color: "#A977F4", icon: "📚" },
    { id: "grammar", name: "文法", color: "#5CC9A7", icon: "⚙️" },
  ];

  const navItems = [
    { id: "dashboard", icon: BarChart3, label: "戰力" },
    { id: "skills", icon: TreePine, label: "技能" },
    { id: "path", icon: Map, label: "路徑" },
    { id: "records", icon: Award, label: "紀錄" },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground flex">
      {/* Left Sidebar Navigation */}
      <aside className="w-20 border-r border-white/6 flex flex-col items-center py-6 gap-4">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveView(item.id as any)}
              className={`p-3 rounded-lg transition-all duration-200 ${
                isActive
                  ? "bg-accent text-accent-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-white/5"
              }`}
              title={item.label}
            >
              <Icon className="w-5 h-5" />
            </button>
          );
        })}

        {/* Settings at bottom */}
        <div className="mt-auto">
          <button className="p-3 rounded-lg text-muted-foreground hover:text-foreground hover:bg-white/5 transition-all duration-200">
            <Settings className="w-5 h-5" />
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-auto">
        {/* Top Status Bar */}
        <div className="sticky top-0 z-40 border-b border-white/6 bg-background/80 backdrop-cosmic">
          <div className="container py-4 flex items-center justify-between">
            <h1 className="text-2xl font-bold">
              {activeView === "dashboard" && "戰力現狀"}
              {activeView === "skills" && "技能樹"}
              {activeView === "path" && "學習路徑"}
              {activeView === "records" && "自我紀錄"}
            </h1>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                時間範圍
              </Button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="container py-8">
          {/* Dashboard View */}
          {activeView === "dashboard" && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Radar Chart - Left 60% */}
              <div className="lg:col-span-2">
                <div className="glass-card p-6">
                  <h2 className="text-xl font-semibold mb-6">六維能力評估</h2>
                  <RadarChart dimensions={dimensions} />
                  <div className="mt-6 text-center">
                    <div className="text-4xl font-bold text-accent mb-2">B1</div>
                    <div className="text-sm text-muted-foreground">綜合等級</div>
                  </div>
                </div>
              </div>

              {/* Target Setting - Right 40% */}
              <div className="space-y-4">
                <div className="glass-card p-6">
                  <h3 className="font-semibold mb-4">目標設定</h3>
                  <select className="input-cosmic w-full mb-3 text-sm">
                    <option>TOEIC 800</option>
                    <option>IELTS 6.5</option>
                    <option>TOEFL 90</option>
                  </select>
                  <div className="text-xs text-muted-foreground">
                    <div className="mb-2">需提升字彙量: 500 字</div>
                    <div>練習篇數: 20 篇</div>
                  </div>
                </div>

                {/* Stats Cards */}
                <div className="glass-card p-4">
                  <div className="text-xs text-muted-foreground mb-1">累積學習時數</div>
                  <div className="text-2xl font-bold">156 小時</div>
                </div>
                <div className="glass-card p-4">
                  <div className="text-xs text-muted-foreground mb-1">連續天數</div>
                  <div className="text-2xl font-bold">23 天</div>
                </div>
                <div className="glass-card p-4">
                  <div className="text-xs text-muted-foreground mb-1">最近檢測</div>
                  <div className="text-sm font-semibold">2024/08/01</div>
                </div>
              </div>
            </div>
          )}

          {/* Skills View */}
          {activeView === "skills" && (
            <div className="space-y-6">
              {/* Dimension Tabs */}
              <div className="flex gap-2 overflow-x-auto pb-2">
                {dimensions.map((dim) => (
                  <button
                    key={dim.id}
                    onClick={() => setSelectedDimension(dim.id)}
                    className={`px-4 py-2 rounded-lg whitespace-nowrap transition-all duration-200 ${
                      selectedDimension === dim.id
                        ? "bg-accent text-accent-foreground"
                        : "glass-card hover:bg-white/6"
                    }`}
                  >
                    {dim.icon} {dim.name}
                  </button>
                ))}
              </div>

              {/* Skill Tree */}
              <div className="glass-card p-6">
                <h3 className="text-lg font-semibold mb-6">
                  {dimensions.find((d) => d.id === selectedDimension)?.name} 技能樹
                </h3>
                <SkillTree dimension={selectedDimension} />
              </div>
            </div>
          )}

          {/* Learning Path View */}
          {activeView === "path" && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Task List */}
              <div className="lg:col-span-2 space-y-4">
                <div className="glass-card p-6">
                  <h3 className="text-lg font-semibold mb-4">今日任務</h3>
                  <TaskList />
                </div>
              </div>

              {/* Calendar Heatmap */}
              <div className="glass-card p-6">
                <h3 className="text-lg font-semibold mb-4">學習熱力圖</h3>
                <CalendarHeatmap />
              </div>
            </div>
          )}

          {/* Records View */}
          {activeView === "records" && (
            <div className="space-y-6">
              <Tabs defaultValue="achievements" className="w-full">
                <TabsList className="grid w-full grid-cols-3 bg-white/5">
                  <TabsTrigger value="achievements">成就勳章</TabsTrigger>
                  <TabsTrigger value="history">歷史雷達</TabsTrigger>
                  <TabsTrigger value="journal">學習日誌</TabsTrigger>
                </TabsList>

                <TabsContent value="achievements" className="mt-6">
                  <AchievementBadges />
                </TabsContent>

                <TabsContent value="history" className="mt-6">
                  <div className="glass-card p-6">
                    <p className="text-muted-foreground">歷史雷達圖比較功能</p>
                  </div>
                </TabsContent>

                <TabsContent value="journal" className="mt-6">
                  <LearningJournal />
                </TabsContent>
              </Tabs>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

/**
 * RadarChart - 六維能力雷達圖
 */
function RadarChart({ dimensions }: { dimensions: any[] }) {
  return (
    <div className="w-full h-64 flex items-center justify-center">
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
        {dimensions.map((dim, idx) => {
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
            .map((_, idx) => {
              const angle = (idx * 360) / dimensions.length;
              const rad = (angle * Math.PI) / 180;
              const r = 80;
              const x = 100 + r * Math.cos(rad - Math.PI / 2);
              const y = 100 + r * Math.sin(rad - Math.PI / 2);
              return `${x},${y}`;
            })
            .join(" ")}
          fill="rgba(96, 165, 250, 0.2)"
          stroke="rgba(96, 165, 250, 0.8)"
          strokeWidth="2"
        />

        {/* Labels */}
        {dimensions.map((dim, idx) => {
          const angle = (idx * 360) / dimensions.length;
          const rad = (angle * Math.PI) / 180;
          const x = 100 + 140 * Math.cos(rad - Math.PI / 2);
          const y = 100 + 140 * Math.sin(rad - Math.PI / 2);
          return (
            <text
              key={`label-${idx}`}
              x={x}
              y={y}
              textAnchor="middle"
              dominantBaseline="middle"
              fill="rgba(232, 236, 241, 0.8)"
              fontSize="12"
            >
              {dim.name}
            </text>
          );
        })}
      </svg>
    </div>
  );
}

/**
 * SkillTree - 技能樹節點展示
 */
function SkillTree({ dimension }: { dimension: string }) {
  const skills = [
    { id: 1, name: "基礎詞彙", level: "A1", status: "unlocked" },
    { id: 2, name: "日常對話", level: "A2", status: "unlocked" },
    { id: 3, name: "新聞理解", level: "B1", status: "in-progress" },
    { id: 4, name: "學術英文", level: "B2", status: "locked" },
  ];

  return (
    <div className="space-y-3">
      {skills.map((skill) => (
        <div
          key={skill.id}
          className="flex items-center gap-4 p-3 rounded-lg bg-white/3 border border-white/6 hover:bg-white/6 transition-all cursor-pointer"
        >
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
              skill.status === "unlocked"
                ? "bg-accent border-accent"
                : skill.status === "in-progress"
                  ? "bg-white/10 border-accent"
                  : "bg-white/5 border-white/10"
            }`}
          >
            {skill.status === "unlocked" && "✓"}
            {skill.status === "in-progress" && "◐"}
          </div>
          <div className="flex-1">
            <div className="font-medium">{skill.name}</div>
            <div className="text-xs text-muted-foreground">{skill.level}</div>
          </div>
          <Button variant="outline" size="sm">
            開始
          </Button>
        </div>
      ))}
    </div>
  );
}

/**
 * TaskList - 學習任務清單
 */
function TaskList() {
  const tasks = [
    {
      id: 1,
      name: "聽力練習：新聞大意",
      skill: "聽力",
      time: "15 分鐘",
      url: "https://www.coolenglish.edu.tw/course/view.php?id=4",
    },
    {
      id: 2,
      name: "閱讀測驗：世界新聞",
      skill: "閱讀",
      time: "20 分鐘",
      url: "https://www.coolenglish.edu.tw/course/view.php?id=5",
    },
    {
      id: 3,
      name: "字彙練習：詞彙題",
      skill: "字彙",
      time: "10 分鐘",
      url: "https://www.coolenglish.edu.tw/course/view.php?id=9",
    },
  ];

  return (
    <div className="space-y-3">
      {tasks.map((task) => (
        <div
          key={task.id}
          className="flex items-center justify-between p-4 rounded-lg bg-white/3 border border-white/6 hover:bg-white/6 transition-all"
        >
          <div>
            <div className="font-medium">{task.name}</div>
            <div className="text-xs text-muted-foreground mt-1">
              {task.skill} · {task.time}
            </div>
          </div>
          <a
            href={task.url}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-lg bg-accent text-accent-foreground text-sm font-medium hover:opacity-90 transition-all"
          >
            開始
          </a>
        </div>
      ))}
    </div>
  );
}

/**
 * CalendarHeatmap - 學習熱力圖
 */
function CalendarHeatmap() {
  const days = Array.from({ length: 28 }, (_, i) => ({
    day: i + 1,
    intensity: Math.floor(Math.random() * 5),
  }));

  const intensityColors = [
    "bg-white/5",
    "bg-accent/20",
    "bg-accent/40",
    "bg-accent/60",
    "bg-accent/80",
  ];

  return (
    <div className="grid grid-cols-7 gap-1">
      {days.map((day) => (
        <div
          key={day.day}
          className={`w-6 h-6 rounded-sm ${intensityColors[day.intensity]} border border-white/10 flex items-center justify-center text-xs font-medium hover:scale-110 transition-transform cursor-pointer`}
          title={`8月 ${day.day}日`}
        >
          {day.day <= 7 ? day.day : ""}
        </div>
      ))}
    </div>
  );
}

/**
 * AchievementBadges - 成就勳章展示
 */
function AchievementBadges() {
  const badges = [
    { id: 1, name: "初出茅廬", icon: "🌱", unlocked: true },
    { id: 2, name: "連續達人", icon: "🔥", unlocked: true },
    { id: 3, name: "聽力高手", icon: "👂", unlocked: false },
    { id: 4, name: "閱讀大師", icon: "📖", unlocked: false },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {badges.map((badge) => (
        <div
          key={badge.id}
          className={`p-4 rounded-lg border text-center transition-all ${
            badge.unlocked
              ? "glass-card hover:bg-white/6"
              : "bg-white/3 border-white/6 opacity-50"
          }`}
        >
          <div className="text-3xl mb-2">{badge.icon}</div>
          <div className="text-sm font-medium">{badge.name}</div>
        </div>
      ))}
    </div>
  );
}

/**
 * LearningJournal - 學習日誌
 */
function LearningJournal() {
  const entries = [
    {
      id: 1,
      date: "2024/08/08",
      summary: "完成 3 個聽力任務，新解鎖「新聞理解」技能",
      note: "今天特別專注，感覺進度明顯",
    },
    {
      id: 2,
      date: "2024/08/07",
      summary: "閱讀 2 篇新聞文章，字彙量 +15",
      note: "",
    },
  ];

  return (
    <div className="space-y-4">
      {entries.map((entry) => (
        <div key={entry.id} className="glass-card p-4">
          <div className="flex items-start justify-between mb-2">
            <div className="font-mono text-sm text-accent">{entry.date}</div>
          </div>
          <div className="text-sm mb-2">{entry.summary}</div>
          {entry.note && (
            <div className="text-xs text-muted-foreground italic">
              💭 {entry.note}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
