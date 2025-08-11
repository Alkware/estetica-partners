import React from 'react';
import { useAuthStore } from '../stores/authStore';
import { AlertTriangle, LogOut, Menu, X } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import { SearchParamsVariables } from '../variables.global';

export const Header: React.FC = () => {
  const [params, setParams] = useSearchParams();
  const { partner, logout } = useAuthStore();
  const menuIsOpen = params.get(SearchParamsVariables.display_menu.key) === SearchParamsVariables.display_menu.values.open;

  function handleDisplayMenu() {
    params.set(SearchParamsVariables.display_menu.key, menuIsOpen ? SearchParamsVariables.display_menu.values.closed : SearchParamsVariables.display_menu.values.open)
    setParams(params);
  };

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex gap-2 items-center">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-gradient-to-r from-[#00c8ff] to-[#0d96eb] rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">W</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-[#444]">Painel de Parceiros</h1>
              <p className="text-sm text-gray-600">Bem-vindo, {partner?.name}</p>
            </div>
          </div>

          {!partner?.is_active &&
            <div className='flex gap-3 items-center bg-orange-100 text-orange-800 px-4 rounded'>
              <div>
                <h2 className='font-semibold text-sm'>Aguarde um momento.</h2>
                <h3 className='text-sm'>Estamos ativando sua conta...</h3>
              </div>
              <AlertTriangle />
            </div>
          }
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={logout}
            className="hidden cursor-pointer sm:flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
          >
            <LogOut size={20} />
            <span className="hidden sm:block">Sair</span>
          </button>

          {
            menuIsOpen ?
              <X
                className='cursor-pointer sm:hidden'
                onClick={handleDisplayMenu}
              />
              :
              <Menu
                className='cursor-pointer sm:hidden'
                onClick={handleDisplayMenu}
              />

          }
        </div>
      </div>
    </header>
  );
};