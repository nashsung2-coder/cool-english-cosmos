import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronDown, Bell, Settings, BookOpen, Award, CheckCircle2, AlertCircle, Sparkles } from "lucide-react";

/**
 * ParentPage - 家長區 (Parent Zone) - 優化版
 * 
 * Design Philosophy: Deep Space Minimalism with Warmth & Clear Resource Visibility
 * - Rich resource lists categorized by listening, reading, writing, vocabulary
 * - Child progress supervision and learning analytics
 * - Encouragement booth with pet buff integration
 */

export default function ParentPage() {
  const [selectedChild, setSelectedChild] = useState("child1");
  const [activeTab, setActiveTab] = useState("resources");

  const children = [
    { id: "child1", name: "小明", grade: "國中一年級", level: "A2-B1" },
    { id: "child2", name: "小紅", grade: "國小五年級", level: "A1-A2" },
  ];

  const currentChild = children.find((c) => c.id === selectedChild);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Top Navigation */}
      <div className="sticky top-0 z-40 border-b border-white/6 bg-background/80 backdrop-cosmic">
        <div className="container py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="text-xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
              親子星港 (家長指揮中心)
            </span>
            {/* Child Switcher */}
            <div className="relative group">
              <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-sm">
                <span className="font-medium">{currentChild?.name} ({currentChild?.grade})</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              <div className="absolute left-0 mt-2 w-52 bg-cosmos-panel-dark border border-white/10 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                {children.map((child) => (
                  <button
                    key={child.id}
                    onClick={() => setSelectedChild(child.id)}
                    className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                      selectedChild === child.id
                        ? "bg-accent/20 text-accent font-medium"
                        : "hover:bg-white/5"
                    }`}
                  >
                    <div>{child.name}</div>
                    <div className="text-xs text-muted-foreground">{child.grade} · {child.level}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="p-2 rounded-lg hover:bg-white/5 transition-all relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-red-500" />
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
            <TabsList className="grid w-full grid-cols-4 bg-white/5 p-1 rounded-xl">
              <TabsTrigger value="resources">📚 官方學習資源總覽</TabsTrigger>
              <TabsTrigger value="overview">📊 學習成效與監督</TabsTrigger>
              <TabsTrigger value="colearn">🤝 親子共學與目標</TabsTrigger>
              <TabsTrigger value="booth">🎁 加油小棧與 Buff</TabsTrigger>
            </TabsList>

            {/* Resources Tab - Detailed Cool English Resources */}
            <TabsContent value="resources" className="mt-6">
              <ParentResourceLibrary />
            </TabsContent>

            {/* Overview Tab */}
            <TabsContent value="overview" className="mt-6 space-y-6">
              <AbilityLandscape />
              <RecentActivityLog />
            </TabsContent>

            {/* Co-learning Tab */}
            <TabsContent value="colearn" className="mt-6">
              <CoLearningCabin />
            </TabsContent>

            {/* Booth Tab */}
            <TabsContent value="booth" className="mt-6">
              <EncouragementBooth />
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
    <div className="glass-card p-6 md:p-8 flex flex-col md:flex-row items-center gap-8 border-l-4 border-l-emerald-400">
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-2">
          <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-500/20 text-emerald-300">
            {child?.level} 程度
          </span>
          <span className="text-xs text-muted-foreground">上次同步：今日 14:20</span>
        </div>
        <h2 className="text-2xl font-bold mb-4">
          👋 {child?.name} 本週學習狀況非常穩定！
        </h2>

        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white/5 border border-white/10 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-emerald-400 mb-1">6 / 7 天</div>
            <div className="text-xs text-muted-foreground">本週打卡天數</div>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-accent mb-1">4 篇</div>
            <div className="text-xs text-muted-foreground">完成聽讀任務</div>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-purple-400 mb-1">Lv.15</div>
            <div className="text-xs text-muted-foreground">寵物星龍等級</div>
          </div>
        </div>
      </div>

      {/* Pet Partner Widget */}
      <div className="glass-card p-6 text-center min-w-48 bg-white/5">
        <div className="text-5xl mb-2 animate-float">🐉</div>
        <div className="font-semibold text-sm mb-1">星龍夥伴</div>
        <div className="text-xs text-emerald-400 mb-3">狀態：精神奕奕 (獲得雙倍經驗 Buff)</div>
        <div className="text-xs text-muted-foreground">已陪同孩子學習 45 小時</div>
      </div>
    </div>
  );
}

/**
 * ParentResourceLibrary - 家長專用資源總覽（清楚列出可監督之資源與連結）
 */
function ParentResourceLibrary() {
  const categories = [
    {
      title: "🎧 聽力與影音學習區",
      desc: "透過動畫、生活對話與新聞，培養孩子自然語感",
      resources: [
        { name: "生活主題影片 (國中)", url: "https://www.coolenglish.edu.tw/course/view.php?id=866", level: "A2-B1", desc: "實用生活對話，附中英文字幕" },
        { name: "遊台灣學英文", url: "https://www.coolenglish.edu.tw/course/view.php?id=617", level: "A2-B2", desc: "用英文介紹台灣景點，培養文化素養" },
        { name: "ICRT News Lunchbox", url: "https://www.coolenglish.edu.tw/course/view.php?id=314", level: "A1-A2", desc: "兒童/青少年專屬英語新聞廣播" },
      ]
    },
    {
      title: "📖 閱讀與分級讀本區",
      desc: "透過精選繪本、新聞與小說，擴大辭彙量與理解力",
      resources: [
        { name: "神奇悅讀之旅 (繪本)", url: "https://www.coolenglish.edu.tw/course/view.php?id=409", level: "A2-B1", desc: "主題多元、插圖精美，附全文朗讀" },
        { name: "全球新鮮事 (VOA新聞)", url: "https://www.coolenglish.edu.tw/course/view.php?id=489", level: "B1", desc: "涵蓋奇人軼事、科學與人權議題" },
        { name: "Scholastic Everyday Book Box", url: "https://www.coolenglish.edu.tw/course/view.php?id=1134", level: "B1-B2", desc: "藍思(Lexile)分級小說與非小說讀物" },
      ]
    },
    {
      title: "✏️ 寫作與字彙強化區",
      desc: "強化文法結構、寫作偵錯與大考字彙能力",
      resources: [
        { name: "寫作修煉手冊", url: "https://www.coolenglish.edu.tw/course/view.php?id=105", level: "A2-B1", desc: "有邏輯、架構的英文表達訓練" },
        { name: "酷英AI寫作偵錯工具", url: "https://www.coolenglish.edu.tw/course/view.php?id=841", level: "All", desc: "即時揪出文法錯誤並提供修改建議" },
        { name: "詞彙量測驗與搭配詞", url: "https://www.coolenglish.edu.tw/course/view.php?id=11", level: "B1-B2", desc: "熟悉大考中心公佈之分級詞彙" },
      ]
    }
  ];

  return (
    <div className="space-y-6">
      <div className="glass-card p-6 bg-emerald-500/5 border-emerald-500/20">
        <h3 className="text-lg font-semibold mb-2 text-emerald-300">💡 給家長的陪伴指引</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          以下資源皆來自教育部 Cool English 官方平台。家長可點擊連結陪同孩子觀看，或指派為本週共學任務。當孩子完成任務後，寵物夥伴將獲得經驗值升級！
        </p>
      </div>

      {categories.map((cat, idx) => (
        <div key={idx} className="glass-card p-6">
          <h3 className="text-lg font-semibold mb-1 text-white">{cat.title}</h3>
          <p className="text-xs text-muted-foreground mb-4">{cat.desc}</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {cat.resources.map((res, rIdx) => (
              <div key={rIdx} className="bg-white/3 border border-white/6 rounded-lg p-4 flex flex-col justify-between hover:bg-white/6 transition-all">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs px-2 py-0.5 rounded bg-accent/20 text-accent font-mono">{res.level}</span>
                    <span className="text-xs text-emerald-400 font-medium">官方認證</span>
                  </div>
                  <h4 className="font-semibold text-sm mb-1 text-white">{res.name}</h4>
                  <p className="text-xs text-muted-foreground mb-4 line-clamp-2">{res.desc}</p>
                </div>
                <a
                  href={res.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full text-center py-2 rounded-lg bg-white/10 hover:bg-accent hover:text-accent-foreground text-xs font-medium transition-all"
                >
                  前往資源連結 ↗
                </a>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

/**
 * AbilityLandscape - 能力風景
 */
function AbilityLandscape() {
  const dimensions = [
    { name: "聽力理解", value: 85, status: "表現優異", color: "from-blue-400 to-blue-600" },
    { name: "口語表達", value: 72, status: "持續進步", color: "from-amber-400 to-orange-500" },
    { name: "閱讀理解", value: 80, status: "表現穩定", color: "from-emerald-400 to-teal-600" },
    { name: "寫作組織", value: 68, status: "需要加強", color: "from-purple-400 to-indigo-600" },
    { name: "字彙掌握", value: 78, status: "詞彙量充沛", color: "from-pink-400 to-rose-600" },
  ];

  return (
    <div className="glass-card p-6">
      <h3 className="text-lg font-semibold mb-6 flex items-center justify-between">
        <span>孩子各項英語能力分佈</span>
        <span className="text-xs text-emerald-400 font-normal">依據最近 30 天測驗與作業統計</span>
      </h3>

      <div className="space-y-4">
        {dimensions.map((dim) => (
          <div key={dim.name} className="space-y-1">
            <div className="flex justify-between text-sm">
              <span className="font-medium text-white">{dim.name}</span>
              <span className="text-muted-foreground">{dim.value}% ({dim.status})</span>
            </div>
            <div className="w-full h-2.5 bg-white/10 rounded-full overflow-hidden">
              <div
                className={`h-full bg-gradient-to-r ${dim.color} rounded-full transition-all duration-500`}
                style={{ width: `${dim.value}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * RecentActivityLog - 最近學習動態
 */
function RecentActivityLog() {
  const logs = [
    { time: "今日 10:15", title: "完成聽力任務：生活主題影片", reward: "寵物經驗 +150", status: "success" },
    { time: "昨日 16:40", title: "完成閱讀測驗：全球新鮮事", reward: "寵物經驗 +120", status: "success" },
    { time: "前天 19:20", title: "獲得成就：連續打卡 5 天", reward: "解鎖限定寵物裝飾", status: "achievement" },
  ];

  return (
    <div className="glass-card p-6">
      <h3 className="text-lg font-semibold mb-4">最近學習動態與寵物回饋</h3>
      <div className="space-y-3">
        {logs.map((log, idx) => (
          <div key={idx} className="flex items-center justify-between p-3 rounded-lg bg-white/3 border border-white/6">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
              <div>
                <div className="text-sm font-medium text-white">{log.title}</div>
                <div className="text-xs text-muted-foreground">{log.time}</div>
              </div>
            </div>
            <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-mono">
              {log.reward}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * CoLearningCabin - 親子共學艙
 */
function CoLearningCabin() {
  return (
    <div className="space-y-6">
      <div className="glass-card p-6">
        <h3 className="text-lg font-semibold mb-4">本週家庭共學挑戰</h3>
        <div className="bg-white/5 border border-white/10 rounded-xl p-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <span className="text-xs px-2.5 py-1 rounded-full bg-accent/20 text-accent font-medium">進行中</span>
            <h4 className="text-xl font-bold mt-2 mb-1">週末環島英語小達人</h4>
            <p className="text-sm text-muted-foreground">與孩子一同觀看「遊台灣學英文」影片並完成問答，解鎖全家專屬徽章！</p>
          </div>
          <Button className="bg-accent text-accent-foreground font-semibold px-6">
            查看挑戰詳情
          </Button>
        </div>
      </div>
    </div>
  );
}

/**
 * EncouragementBooth - 加油小棧與 Buff
 */
function EncouragementBooth() {
  const [sent, setSent] = useState(false);

  const handleSend = () => {
    setSent(true);
    setTimeout(() => setSent(false), 3000);
  };

  return (
    <div className="glass-card p-6">
      <h3 className="text-lg font-semibold mb-2">加油小棧 (發送鼓勵與遊戲 Buff)</h3>
      <p className="text-xs text-muted-foreground mb-6">發送愛心與鼓勵給孩子，將同時為他的寵物夥伴附加「雙倍經驗 Buff」！</p>

      <div className="space-y-6 max-w-xl">
        <div>
          <label className="text-xs text-muted-foreground mb-2 block">選擇鼓勵貼圖</label>
          <div className="flex gap-3">
            {["🌟", "🔥", "🏆", "💪", "❤️", "🚀"].map((emoji, idx) => (
              <button key={idx} className="text-3xl p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/20 transition-all hover:scale-110">
                {emoji}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="text-xs text-muted-foreground mb-2 block">溫馨留言</label>
          <input
            type="text"
            className="input-cosmic w-full"
            placeholder="例如：寶貝今天表現好棒！繼續加油！"
            defaultValue="寶貝今天學習好認真，爸爸媽媽以你為榮！✨"
          />
        </div>

        <Button onClick={handleSend} className="w-full bg-emerald-500 text-white font-semibold py-3">
          {sent ? "✨ 發送成功！寵物已獲得經驗 Buff！" : "發送鼓勵與 Buff 🚀"}
        </Button>
      </div>
    </div>
  );
}
