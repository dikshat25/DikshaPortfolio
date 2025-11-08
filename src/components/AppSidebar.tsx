import { Home, Briefcase, Code2, Trophy, Github, Linkedin, Mail } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

const mainItems = [
  { title: "Home", url: "/", icon: Home },
  { title: "Projects", url: "#projects", icon: Briefcase },
  { title: "Skills", url: "#skills", icon: Code2 },
  { title: "Achievements", url: "#achievements", icon: Trophy },
  { title: "Leadership", url: "/leadership", icon: Trophy },
  { title: "Contact", url: "/contact", icon: Mail },
];

const socialLinks = [
  { title: "GitHub", url: "https://github.com/dikshat25", icon: Github },
  { title: "LinkedIn", url: "https://linkedin.com/in/diksha-thongire", icon: Linkedin },
  { title: "Email", url: "mailto:diksha.thongire257@gmail.com", icon: Mail },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";

  const handleClick = (url: string) => {
    if (url.startsWith("#")) {
      const element = document.querySelector(url);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <Sidebar className={collapsed ? "w-16" : "w-64"} collapsible="icon">
      <SidebarContent className="bg-sidebar">
        <div className="px-6 py-8">
          {!collapsed && (
            <div className="animate-fade-in">
              <h2 className="text-2xl font-bold text-primary">Diksha Thongire's</h2>
              <p className="text-xs text-muted-foreground mt-1">My Playlist</p>
            </div>
          )}
          {collapsed && (
            <div className="flex justify-center">
              <h2 className="text-xl font-bold text-primary">DT</h2>
            </div>
          )}
        </div>

        <SidebarGroup>
          <SidebarGroupLabel className={collapsed ? "sr-only" : ""}>
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    {item.url.startsWith("#") ? (
                      <button
                        onClick={() => handleClick(item.url)}
                        className="flex items-center gap-3 w-full hover:bg-sidebar-accent transition-colors rounded-md px-3 py-2"
                      >
                        <item.icon className="h-5 w-5" />
                        {!collapsed && <span>{item.title}</span>}
                      </button>
                    ) : (
                      <NavLink
                        to={item.url}
                        className="flex items-center gap-3 hover:bg-sidebar-accent transition-colors rounded-md px-3 py-2"
                        activeClassName="bg-sidebar-accent text-primary font-medium"
                      >
                        <item.icon className="h-5 w-5" />
                        {!collapsed && <span>{item.title}</span>}
                      </NavLink>
                    )}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="mt-auto">
          <SidebarGroupLabel className={collapsed ? "sr-only" : ""}>
            Connect
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {socialLinks.map((link) => (
                <SidebarMenuItem key={link.title}>
                  <SidebarMenuButton asChild>
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 hover:bg-sidebar-accent transition-colors rounded-md px-3 py-2"
                    >
                      <link.icon className="h-5 w-5" />
                      {!collapsed && <span>{link.title}</span>}
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
