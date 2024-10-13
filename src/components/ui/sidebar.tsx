import { MoreVertical, ChevronLast, ChevronFirst } from "lucide-react"
import { useContext, createContext, useState, ReactNode  } from "react"
import { UserRound }from 'lucide-react'
import { useNavigate } from 'react-router-dom';
interface SidebarContextProps {
    expanded: boolean;
  }
const SidebarContext = createContext<boolean | null>(null);

interface SidebarProps {
  children: ReactNode;
}

export function Sidebar({ children }: SidebarProps) {
  const [expanded, setExpanded] = useState(true)
  const userName = localStorage.getItem('fullName')
  const email = localStorage.getItem('email') || ''
  const navigate = useNavigate();
  return (
    <aside className="h-screen">
      <nav className="h-full flex flex-col bg-white border-r shadow-sm">
        <div className="p-4 pb-2 flex justify-between items-center">
            <span className="flex">
            <img
            src="https://img.logoipsum.com/245.svg"
            className={`overflow-hidden transition-all ${
              expanded ? "w-15" : "w-5"
            }`}
            alt=""
            onClick={()=>{navigate("/")}}
          />
          <span className={`text-3xl font-medium text-primary overflow-hidden transition-all ${expanded ? "w-15" : "w-0"}`}>Budgify</span>
            </span>
          
          <button
            onClick={() => setExpanded((curr) => !curr)}
            className=" rounded-lg bg-gray-50 hover:bg-gray-100"
          >
            {expanded ? <ChevronFirst /> : <ChevronLast />}
          </button>
        </div>

        <SidebarContext.Provider value={expanded}>
          <ul className="flex-1 px-3">{children}</ul>
        </SidebarContext.Provider>

        <div className="border-t flex p-3 flex justify-center items-center">
          <UserRound className="w-10 h-10 rounded-md bg-primary-50 text-primary"/>
          <div
            className={`
              flex justify-between items-center
              overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"}
          `}
          >
            <div className="leading-4">
              <h4 className="font-semibold">{userName}</h4>
              <span className="text-xs text-gray-600">{email}</span>
            </div>
            <MoreVertical size={20} />
          </div>
        </div>
      </nav>
    </aside>
  )
}

interface SidebarItemProps {
    icon?: ReactNode;
    text: string;
    active?: boolean;
    alert?: boolean;
    navigateTo: string;
}

export function SidebarItem({ icon, text, active, alert, navigateTo }:SidebarItemProps ) {
  const expanded = useContext(SidebarContext)
  const navigate = useNavigate();
  console.log(icon, text, active, alert, expanded)
  return (
    <li
      className={`
        relative flex items-center py-2 px-3 my-1
        font-medium rounded-md cursor-pointer
        transition-colors group font-semibold
        ${
          active
            ? "bg-gradient-to-tr from-primary to-primary-300 text-primary-50 "
            : "hover:bg-primary-50 text-neutral-700"
        }
    `}
    onClick={()=>{navigate(navigateTo)}}
    >
       <div className="items-center">{icon}</div> 
      <span
        className={`overflow-hidden transition-all ${
          expanded ? "w-52 ml-3"  : "w-0"
        }`}
      >
        {text}
      </span>
      {alert && (
        <div
          className={`absolute right-2 w-2 h-2 rounded bg-indigo-400 ${
            expanded ? "" : "top-2"
          }`}
        />
      )}

      {!expanded && (
        <div
          className={`
          absolute left-full rounded-md px-2 py-1 ml-6
          bg-primary-50 text-primary-900 text-md
          invisible opacity-20 -translate-x-3 transition-all
          group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
      `}
        >
          {text}
        </div>
      )}
    </li>
  )
}