function SidebarButton({ icon: Icon, children, active }) {
  return (
    <button
      className={`
        flex items-center gap-3
        h-[4.5vh]
        px-5 py-4  // Increased horizontal and vertical padding
        rounded-2xl
        font-semibold
        text-[15px]
        transition-all duration-200
        ${
          active
            ? "bg-[#EEF7EA] text-[#2F6B3F]"
            : "text-[#445244] hover:bg-[#F5F7F2]"
        }
      `}
    >
      <Icon className={`w-[22px] h-[22px] shrink-0 ${active ? "text-[#4EA73F]" : "text-[#667866]"}`} />
      {children && <span>{children}</span>}
    </button>
  );
}

export default SidebarButton;