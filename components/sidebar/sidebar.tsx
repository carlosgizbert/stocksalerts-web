import { Sidebar } from "./sidebar.styles";
import { SidebarItem } from "./sidebar-item";
import { SidebarMenu } from "./sidebar-menu";
import { useSidebarContext } from "../layout/layout-context";
import { usePathname } from "next/navigation";
import { HeaderLogo } from "./header-logo";
import FeatherIcon from "feather-icons-react";

export const SidebarWrapper = () => {
  const pathname = usePathname();
  const { collapsed, setCollapsed } = useSidebarContext();

  return (
    <aside className="h-screen z-[20] sticky top-0">
      {collapsed ? (
        <div className={Sidebar.Overlay()} onClick={setCollapsed} />
      ) : null}
      <div
        className={Sidebar({
          collapsed: collapsed,
        })}
      >
        <div className={Sidebar.Header()}>
          <HeaderLogo />
        </div>
        <div className="flex flex-col justify-between h-full">
          <div className={Sidebar.Body()}>
            
            <SidebarMenu title="Menu principal">
            <SidebarItem
              title="Início"
              icon={<FeatherIcon icon="home" size={18} strokeWidth={1.5} />}
              isActive={pathname === "/"}
              href="/"
            />
              <SidebarItem
                isActive={pathname === "/stocks"}
                title="Ativos monitorados"
                icon={<FeatherIcon icon="layers" size={18} strokeWidth={1.5} />}
                href="stocks"
              />
              <SidebarItem
                isActive={pathname === "/price-entries"}
                title="Histórico de preços"
                icon={
                  <FeatherIcon icon="activity" size={18} strokeWidth={1.5} />
                }
                href="price-entries"
              />
            </SidebarMenu>
          </div>
        </div>
      </div>
    </aside>
  );
};
