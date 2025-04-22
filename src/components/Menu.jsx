export const Menu = (props) => {
    const {onSecChange, menuOpen, setMenuOpen} = props;

    return(
        <>
            <button onClick={() => setMenuOpen(!menuOpen)} className="z-20 fixed top-4 right-4 md:top-12 md:right-12 p-3 bg-indigo-600 w-11 h-11 rounded-md">
                <div className={`bg-white h-0.5 rounded-md w-full transition-all ${
                    menuOpen ? "rotate-45 translate-y-0.5" : ""
                }`} />
                <div className={`bg-white h-0.5 rounded-md w-full my-1 ${
                    menuOpen ? "hidden" : ""
                }`} />
                <div className={`bg-white h-0.5 rounded-md w-full transition-all ${
                    menuOpen ? "-rotate-45" : ""
                }`} />
            </button>

            {/* Menu Panel */}
            <div className={`z-10 fixed top-0 right-0 bottom-0 bg-white transition-all overflow-hidden flex flex-col ${menuOpen ? "w-full md:w-80" : "w-0"}`}>
                <div className="flex-1 flex items-start justify-center flex-col gap-6 p-8">
                    <MenuButton label="About" onClick={() => onSecChange(0)} />
                    <MenuButton label="Skills" onClick={() => onSecChange(1)} />
                    <MenuButton label="Projects" onClick={() => onSecChange(2)} />
                    <MenuButton label="Contact" onClick={() => onSecChange(3)} />
                </div>
            </div>
        </>
    )
}


const MenuButton = (props) => {
    const {label, onClick} = props;

    return(
        <button 
            onClick={onClick}
            className="text-2xl font-bold cursor-pointer hover:text-indigo-600 transition-colors"
        >
            {label}
        </button>
    )
}