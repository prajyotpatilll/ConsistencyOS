import { NavLink } from "react-router-dom";
import {
  LayoutGrid,
  ListChecks,
  Code2,
  Briefcase,
  GraduationCap,
} from "lucide-react";
import Sidebar from "./Sidebar.jsx";

const mobileNavItems = [
  { to: "/dashboard", label: "Home", icon: LayoutGrid },
  { to: "/tasks", label: "Tasks", icon: ListChecks },
  { to: "/dsa", label: "DSA", icon: Code2 },
  { to: "/jobs", label: "Jobs", icon: Briefcase },
  { to: "/interview", label: "Prep", icon: GraduationCap },
];

const Layout = ({ children }) => {
  return (
    <div className="flex h-screen bg-canvas">
      <Sidebar />

      <div className="flex flex-1 flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto pb-20 md:pb-0">
          {children}
        </main>

        {/* Mobile bottom nav */}
        <nav className="fixed inset-x-0 bottom-0 z-30 flex border-t border-border bg-surface md:hidden">
          {mobileNavItems.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex flex-1 flex-col items-center gap-1 py-2.5 text-[11px] font-medium ${
                  isActive ? "text-brand-600" : "text-muted"
                }`
              }
            >
              <Icon className="h-5 w-5" strokeWidth={2} />
              {label}
            </NavLink>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default Layout;
