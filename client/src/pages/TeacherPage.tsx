import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart3, Package, Users, Trophy, Settings } from "lucide-react";

/**
 * TeacherPage - 教師區 (Teacher Zone)
 * 
 * Design Philosophy: Deep Space Minimalism with Professional Focus
 * - Class selector at top
 * - Four main views: Battle Status, Package Workshop, Student Overview, Honor Hall
 * - Heat map for class ability matrix
 * - Package creation wizard
 */

export default function TeacherPage() {
  const [activeView, setActiveView] = useState<"status" | "workshop" | "students" | "honor">("status");
  const [selectedClass, setSelectedClass] = useState("class1");

  const classes = [
    { id: "class1", name: "國中英文 A 班", students: 28 },
    { id: "class2", name: "國中英文 B 班", students: 30 },
    { id: "class3", name: "高中英文 C 班", students: 25 },
  ];

  const currentClass = classes.find((c) => c.id === selectedClass);

  return (
    <div className="min-h-screen bg-background text-foreground flex">
      {/* Left Sidebar Navigation */}
      <aside className="w-64 border-r border-white/6 p-6 flex flex-col">
        {/* Class Selector */}
        <div className="mb-8">
          <div className="text-xs text-muted-foreground mb-3 uppercase tracking-wider">班級選擇</div>
          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="input-cosmic w-full text-sm"
          >
            {classes.map((cls) => (
              <option key={cls.id} value={cls.id}>
                {cls.name}
              </option>
            ))}
          </select>
        </div>

        {/* Navigation */}
        <nav className="space-y-2 flex-1">
          {[
            { id: "status", icon: BarChart3, label: "班級戰情" },
            { id: "workshop", icon: Package, label: "套餐工坊" },
            { id: "students", icon: Users, label: "學生總覽" },
            { id: "honor", icon: Trophy, label: "榮譽殿堂" },
          ].map((item) => {
            const Icon = item.icon;
            const isActive = activeView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveView(item.id as any)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 text-left ${
                  isActive
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Settings */}
        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:text-foreground hover:bg-white/5 transition-all">
          <Settings className="w-5 h-5" />
          <span>班級設定</span>
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {/* Top Status Bar */}
        <div className="sticky top-0 z-40 border-b border-white/6 bg-background/80 backdrop-cosmic">
          <div className="container py-4">
            <h1 className="text-2xl font-bold">
              {activeView === "status" && "班級戰情"}
              {activeView === "workshop" && "套餐工坊"}
              {activeView === "students" && "學生總覽"}
              {activeView === "honor" && "榮譽殿堂"}
            </h1>
          </div>
        </div>

        {/* Content */}
        <div className="container py-8">
          {activeView === "status" && <ClassStatusView currentClass={currentClass} />}
          {activeView === "workshop" && <PackageWorkshopView />}
          {activeView === "students" && <StudentOverviewView />}
          {activeView === "honor" && <HonorHallView />}
        </div>
      </main>
    </div>
  );
}

/**
 * ClassStatusView - 班級戰情
 */
function ClassStatusView({ currentClass }: { currentClass: any }) {
  const summaryCards = [
    { label: "全班完成率", value: "78%", icon: "📊" },
    { label: "需關注人數", value: "5", icon: "⚠️" },
    { label: "待處理任務", value: "12", icon: "📋" },
    { label: "本週活躍度", value: "92%", icon: "🔥" },
  ];

  const students = [
    { name: "小明", listening: "B1", speaking: "A2", reading: "B1", writing: "A2" },
    { name: "小紅", listening: "A2", speaking: "A1", reading: "A2", writing: "A1" },
    { name: "小王", listening: "B1", speaking: "B1", reading: "B1", writing: "B1" },
    { name: "小李", listening: "A1", speaking: "A1", reading: "A1", writing: "A1" },
  ];

  const levelColors: { [key: string]: string } = {
    "A1": "bg-blue-500/20 text-blue-300",
    "A2": "bg-cyan-500/20 text-cyan-300",
    "B1": "bg-green-500/20 text-green-300",
    "B2": "bg-yellow-500/20 text-yellow-300",
  };

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {summaryCards.map((card, idx) => (
          <div key={idx} className="glass-card p-4 text-center">
            <div className="text-2xl mb-2">{card.icon}</div>
            <div className="text-xs text-muted-foreground mb-1">{card.label}</div>
            <div className="text-2xl font-bold text-accent">{card.value}</div>
          </div>
        ))}
      </div>

      {/* Ability Heat Map */}
      <div className="glass-card p-6">
        <h3 className="text-lg font-semibold mb-6">班級能力熱力圖</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left py-2 px-4">學生</th>
                <th className="text-center py-2 px-4">聽力</th>
                <th className="text-center py-2 px-4">口說</th>
                <th className="text-center py-2 px-4">閱讀</th>
                <th className="text-center py-2 px-4">寫作</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student, idx) => (
                <tr key={idx} className="border-b border-white/5 hover:bg-white/3 transition-colors">
                  <td className="py-3 px-4 font-medium">{student.name}</td>
                  <td className="text-center py-3 px-4">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${levelColors[student.listening]}`}>
                      {student.listening}
                    </span>
                  </td>
                  <td className="text-center py-3 px-4">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${levelColors[student.speaking]}`}>
                      {student.speaking}
                    </span>
                  </td>
                  <td className="text-center py-3 px-4">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${levelColors[student.reading]}`}>
                      {student.reading}
                    </span>
                  </td>
                  <td className="text-center py-3 px-4">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${levelColors[student.writing]}`}>
                      {student.writing}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* System Recommendations */}
      <div className="glass-card p-6">
        <h3 className="text-lg font-semibold mb-4">系統建議</h3>
        <div className="space-y-3">
          <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/30 text-sm">
            <span className="font-medium">📌 建議：</span> 小紅的口說能力偏弱，建議增加口說練習
          </div>
          <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/30 text-sm">
            <span className="font-medium">📌 建議：</span> 班級整體聽力進度良好，可嘗試進階課程
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * PackageWorkshopView - 套餐工坊
 */
function PackageWorkshopView() {
  const packages = [
    {
      id: 1,
      name: "日常對話入門",
      status: "已派發",
      students: 28,
      progress: 75,
      url: "https://www.coolenglish.edu.tw/course/view.php?id=90",
    },
    {
      id: 2,
      name: "新聞聽力進階",
      status: "草稿",
      students: 0,
      progress: 0,
      url: "https://www.coolenglish.edu.tw/course/view.php?id=4",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Action Buttons */}
      <div className="flex gap-3">
        <Button className="bg-accent text-accent-foreground">
          <Package className="w-4 h-4 mr-2" />
          新建套餐
        </Button>
        <Button variant="outline">我的模板</Button>
        <Button variant="outline">校內共享庫</Button>
      </div>

      {/* Package List */}
      <div className="space-y-4">
        {packages.map((pkg) => (
          <div key={pkg.id} className="glass-card p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h4 className="text-lg font-semibold">{pkg.name}</h4>
                <div className="text-sm text-muted-foreground mt-1">
                  派發對象: {pkg.students} 位學生
                </div>
              </div>
              <div className={`px-3 py-1 rounded-lg text-xs font-medium ${
                pkg.status === "已派發"
                  ? "bg-green-500/20 text-green-300"
                  : "bg-yellow-500/20 text-yellow-300"
              }`}>
                {pkg.status}
              </div>
            </div>

            {/* Progress */}
            {pkg.progress > 0 && (
              <div className="mb-4">
                <div className="flex justify-between text-xs mb-2">
                  <span className="text-muted-foreground">完成進度</span>
                  <span className="text-accent">{pkg.progress}%</span>
                </div>
                <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-accent to-purple-500"
                    style={{ width: `${pkg.progress}%` }}
                  />
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-2">
              <a
                href={pkg.url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-lg bg-accent text-accent-foreground text-sm font-medium hover:opacity-90 transition-all"
              >
                查看資源
              </a>
              <Button variant="outline" size="sm">
                編輯
              </Button>
              <Button variant="outline" size="sm">
                複製
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * StudentOverviewView - 學生總覽
 */
function StudentOverviewView() {
  const students = [
    { id: 1, name: "小明", level: "B1", progress: 78, trend: "↑" },
    { id: 2, name: "小紅", level: "A2", progress: 62, trend: "→" },
    { id: 3, name: "小王", level: "B1", progress: 85, trend: "↑" },
    { id: 4, name: "小李", level: "A1", progress: 45, trend: "↓" },
  ];

  return (
    <div className="glass-card p-6">
      <h3 className="text-lg font-semibold mb-6">班級學生名單</h3>
      <div className="space-y-3">
        {students.map((student) => (
          <div
            key={student.id}
            className="flex items-center justify-between p-4 rounded-lg bg-white/3 border border-white/6 hover:bg-white/6 transition-all cursor-pointer"
          >
            <div>
              <div className="font-medium">{student.name}</div>
              <div className="text-xs text-muted-foreground">等級: {student.level}</div>
            </div>
            <div className="flex items-center gap-6">
              <div className="text-right">
                <div className="text-sm font-medium">{student.progress}%</div>
                <div className="text-xs text-muted-foreground">{student.trend}</div>
              </div>
              <Button variant="outline" size="sm">
                查看詳情
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * HonorHallView - 榮譽殿堂
 */
function HonorHallView() {
  const achievements = [
    { id: 1, name: "聽力高手", students: ["小明", "小王"], icon: "👂" },
    { id: 2, name: "連續達人", students: ["小明"], icon: "🔥" },
    { id: 3, name: "進步之星", students: ["小王", "小李"], icon: "⭐" },
    { id: 4, name: "全能英才", students: ["小明"], icon: "👑" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {achievements.map((achievement) => (
        <div key={achievement.id} className="glass-card p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="text-4xl">{achievement.icon}</div>
            <h4 className="text-lg font-semibold">{achievement.name}</h4>
          </div>
          <div className="space-y-2">
            {achievement.students.map((student, idx) => (
              <div key={idx} className="text-sm text-muted-foreground">
                🏆 {student}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
