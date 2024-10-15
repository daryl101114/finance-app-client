import { MoreVertical, ChevronLast, ChevronFirst } from 'lucide-react';
import { useContext, createContext, useState, ReactNode } from 'react';
import { UserRound } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
interface SidebarContextProps {
  expanded: boolean;
}
const SidebarContext = createContext<boolean | null>(null);

interface SidebarProps {
  children: ReactNode;
}

export function Sidebar({ children }: SidebarProps) {
  const [expanded, setExpanded] = useState(true);
  const userName = localStorage.getItem('fullName');
  const email = localStorage.getItem('email') || '';
  const navigate = useNavigate();
  return (
    <aside className="h-screen">
      <nav className="bg-white flex h-full flex-col border-r shadow-sm">
        <div className="flex items-center justify-between p-4 pb-2">
          <span className="flex">
            <img
              className={`overflow-hidden transition-all ${
                expanded ? 'w-7' : 'w-7'
              }`}
              src="../../public/5.svg"
            />

            <span
              className={`overflow-hidden text-3xl font-medium text-primary transition-all ${expanded ? 'w-15' : 'w-0'}`}
            >
              Budgify
            </span>
          </span>

          <button
            onClick={() => setExpanded((curr) => !curr)}
            className="bg-gray-50 hover:bg-gray-100 rounded-lg"
          >
            {expanded ? <ChevronFirst /> : <ChevronLast />}
          </button>
        </div>

        <SidebarContext.Provider value={expanded}>
          <ul className="flex-1 px-3">{children}</ul>
        </SidebarContext.Provider>

        <div className="flex items-center justify-center border-t p-3">
          <UserRound className="h-10 w-10 rounded-md bg-primary-50 text-primary" />
          <div
            className={`flex items-center justify-between overflow-hidden transition-all ${expanded ? 'ml-3 w-52' : 'w-0'} `}
          >
            <div className="leading-4">
              <h4 className="font-semibold">{userName}</h4>
              <span className="text-gray-600 text-xs">{email}</span>
            </div>
            <MoreVertical size={20} />
          </div>
        </div>
      </nav>
    </aside>
  );
}

interface SidebarItemProps {
  icon?: ReactNode;
  text: string;
  active?: boolean;
  alert?: boolean;
  navigateTo: string;
}

export function SidebarItem({
  icon,
  text,
  active,
  alert,
  navigateTo,
}: SidebarItemProps) {
  const expanded = useContext(SidebarContext);
  const navigate = useNavigate();
  console.log(icon, text, active, alert, expanded);
  return (
    <li
      className={`group relative my-1 flex cursor-pointer items-center rounded-md px-3 py-2 font-medium font-semibold transition-colors ${
        active
          ? 'bg-gradient-to-tr from-primary to-primary-300 text-primary-50'
          : 'text-neutral-700 hover:bg-primary-50'
      } `}
      onClick={() => {
        navigate(navigateTo);
      }}
    >
      <div className="items-center">{icon}</div>
      <span
        className={`overflow-hidden transition-all ${
          expanded ? 'ml-3 w-52' : 'w-0'
        }`}
      >
        {text}
      </span>
      {alert && (
        <div
          className={`absolute right-2 h-2 w-2 rounded bg-indigo-400 ${
            expanded ? '' : 'top-2'
          }`}
        />
      )}

      {!expanded && (
        <div
          className={`text-md invisible absolute left-full ml-6 -translate-x-3 rounded-md bg-primary-50 px-2 py-1 text-primary-900 opacity-20 transition-all group-hover:visible group-hover:translate-x-0 group-hover:opacity-100`}
        >
          {text}
        </div>
      )}
    </li>
  );
}
