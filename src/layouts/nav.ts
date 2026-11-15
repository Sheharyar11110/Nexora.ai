import { CreditCard, FolderOpen, ImageIcon, LayoutDashboard, MessageSquare, PenLine, Settings, Users, Workflow } from "lucide-react";

export const NAV = [
  {
    label: "Workspace",
    items: [
      { to: "/app", label: "Dashboard", icon: LayoutDashboard, end: true },
      { to: "/app/chat", label: "AI Chat", icon: MessageSquare, badge: "Ultra" },
      { to: "/app/studio", label: "Image Studio", icon: ImageIcon },
      { to: "/app/writer", label: "Writer", icon: PenLine },
      { to: "/app/workflows", label: "Workflows", icon: Workflow, badge: "3" },
      { to: "/app/library", label: "Library", icon: FolderOpen },
    ],
  },
  {
    label: "Account",
    items: [
      { to: "/app/team", label: "Team", icon: Users },
      { to: "/app/billing", label: "Billing", icon: CreditCard },
      { to: "/app/settings", label: "Settings", icon: Settings },
    ],
  },
];
