import React from 'react';
import {
  BarChart3,
  DollarSign,
  Users,
  FileImage,
  HelpCircle,
  Settings,
  ChevronRight,
  LogOut
} from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import { SearchParamsVariables } from '../variables.global';
import { useAuthStore } from '../stores/authStore';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
  { id: 'commissions', label: 'Minhas Comissões', icon: DollarSign },
  { id: 'referrals', label: 'Indicados', icon: Users },
  { id: 'materials', label: 'Materiais de Divulgação', icon: FileImage },
  { id: 'support', label: 'Suporte', icon: HelpCircle },
  { id: 'settings', label: 'Configurações', icon: Settings }
];

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const { logout } = useAuthStore();
  const [params, setParams] = useSearchParams();
  const menuIsOpen = params.get(SearchParamsVariables.display_menu.key) === SearchParamsVariables.display_menu.values.open;

  function handleSelectOption(id: string) {
    params.set(SearchParamsVariables.display_menu.key, SearchParamsVariables.display_menu.values.closed);
    setParams(params);
    setActiveTab(id)
  };

  return (
    <aside
      data-menuisopen={menuIsOpen}
      className="data-[menuisopen=false]:hidden sm:data-[menuisopen]:block w-full sm:w-64 bg-white border-r border-gray-200 h-full"
    >

      <nav className="p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <li key={item.id}>
                <button
                  onClick={() => handleSelectOption(item.id)}
                  className={`w-full cursor-pointer flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all duration-200 group ${isActive
                    ? 'bg-gradient-to-r from-[#00c8ff]/10 to-[#0d96eb]/10 text-[#00c8ff] border-r-2 border-[#00c8ff]'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-[#444]'
                    }`}
                >
                  <Icon size={20} />
                  <span className="font-medium flex-1">{item.label}</span>
                  <ChevronRight
                    size={16}
                    className={`transition-transform duration-200 ${isActive ? 'transform rotate-90' : 'opacity-0 group-hover:opacity-100'
                      }`}
                  />
                </button>
              </li>
            );
          })}
          {/* BOTÃO LOGOUT SOMENTE EM DISPOSITIVOS MENOS DE 680PX */}
          <li>
            <button
              onClick={logout}
              className={`w-ful cursor-pointer sm:hidden flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all duration-200 group text-gray-600 hover:bg-gray-50 hover:text-[#444]`}
            >
              <LogOut size={20} />
              <span className="font-medium flex-1">Sair</span>
              <ChevronRight
                size={16}
                className={`transition-transform duration-200 opacity-0 group-hover:opacity-100`}
              />
            </button>
          </li>
        </ul>
      </nav>

    </aside>
  );
};