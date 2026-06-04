function SidebarButton({icon:Icon, children, active}){
    return(
        <button 
        className={`flex items-center gap-3 px-3 py-2 min-h-9 rounded-xl text-sm font-medium transition-colors
            ${children ? "w-full" : ""}
            ${active 
                ? "bg-[#EEF2E6] text-[#2A6B2A] hover:border-[#2A6B2A]"
                : "text-[#555E55] hover:bg-[#EEF2E6] hover:text-[#2A6B2A]"
            }`}
            >
                <Icon size={18}/>
                {children && <span>{children}</span>}
            </button>
    );
}

export default SidebarButton;
