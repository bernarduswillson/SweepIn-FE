interface ToggleProps {
  active: 'Presensi' | 'Laporan'
  setActive: (value: 'Presensi' | 'Laporan') => void
}

const Toggle = (props: ToggleProps): JSX.Element => {
  const { active, setActive } = props

  return (
    <div className="w-fit flex justify-between gap-2 items-center mb-2">
      <button
        className={`poppins-bold text-sm text-white px-3 py-1.5 rounded-lg transition-all ease-in-out duration-500 ${active === 'Presensi' ? 'bg-blue_main' : 'bg-grey'}`}
        onClick={() => setActive('Presensi')}
      >
        Presensi
      </button>
      <button
        className={`poppins-bold text-sm text-white px-3 py-1.5 rounded-lg transition-all ease-in-out duration-500 ${active === 'Laporan' ? 'bg-blue_main' : 'bg-grey'}`}
        onClick={() => setActive('Laporan')}
      >
        Laporan
      </button>
    </div>
  )
}

export default Toggle
