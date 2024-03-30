interface NavTabProps {
    selectedLogo: string;
    unselectedLogo: string;
    title: string;
    isSelected: boolean;
}

const NavTab: React.FC<NavTabProps> = ({ selectedLogo, unselectedLogo, title, isSelected, }) => {
    return (
        <div>
            <div className="flex w-[84px] px-5 justify-center items-center">
                {(isSelected) ?
                    <img src={selectedLogo} alt={title} className="h-[12px] pe-[3.5px]" />
                    :
                    <img src={unselectedLogo} alt={title} className="h-[12px] pe-[3.5px]" />}

                <h1 className="ps-1.5 font-medium">{title}</h1>
            </div>
            {
                (isSelected) ? <div className="h-[2px] w-[84px] bg-[#5501E1]"></div>
                : <div></div>
            }
        </div>
    );
}

export default NavTab;