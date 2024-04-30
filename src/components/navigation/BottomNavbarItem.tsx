import AttendanceIcon from "../icons/AttendanceIcon";
import ReportIcon from "../icons/ReportIcon";

interface BottomNavbarItemProps {
  text: "Presensi" | "Laporan",
  active?: boolean
};

function BottomNavbarItem(props: BottomNavbarItemProps) {
  const { text, active } = props;

  return (
    <div className="flex flex-col gap-2 items-center cursor-pointer group">
      {
        text === 'Presensi' ?
        <AttendanceIcon className="text-neutral-100" width="2rem" height="2rem" /> :
        <ReportIcon className="text-neutral-100" width="2rem" height="2rem" />
      }
      <div className={`w-fit px-2 py-0 rounded-full body-sm ${active ? 'bg-neutral-100 text-primary-500' : 'text-neutral-100'} transition-fast group-hover:bg-neutral-100 group-hover:text-primary-500`}>
        <span>{text}</span>
      </div>
    </div>
  )
}

export default BottomNavbarItem