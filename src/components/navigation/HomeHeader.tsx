import LogoutButton from "@/components/buttons/LogoutButton";

interface HomeHeaderProps {
  currentPage: string,
};

function HomeHeader(props: HomeHeaderProps) {
  const { currentPage } = props;

  return (
    <div className="w-full py-3 flex justify-between items-center">
      <span className="header-3 text-neutral-100">{currentPage}</span>
      <LogoutButton />
    </div>
  );
};

export default HomeHeader;