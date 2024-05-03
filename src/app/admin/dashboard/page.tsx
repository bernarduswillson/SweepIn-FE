import Header from '@/components/AdminHeader';
import BlueButton from '@/components/buttons/BlueButton';
import FilterBar from '@/components/inputs/UserFilterBar';
import GridContainer from '@/components/sections/DashboardGridContainer';

const DashboardPage = (): JSX.Element => {
    return (
        <div className="w-full flex flex-col items-center bg-white">
            <div className="w-11/12">

                {/* Header */}
                <div className='flex justify-between items-center'>
                    <Header title="Dashboard"/>

                    {/* Download button */}
                    <div className='w-1/12'>

                        {/* TODO: handle onclick */}
                        <BlueButton
                            text="Download"
                            type="primary"
                            size="small"
                            roundness="square"
                        />
                    </div>
                </div>

                {/* Content */}
                <div className='pt-6'>

                    {/* TODO: Handle on change filter */}
                    <FilterBar />
                    <GridContainer />
                </div>
            </div>
        </div>
    )
}

export default DashboardPage;