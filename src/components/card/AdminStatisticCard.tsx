import StatisticProps from "@/interface/props/StatisticProps";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

function AdminStatisticCard(props: StatisticProps) {
    const { title, icon, value, percentage } = props;

    const percentageColor = percentage < 0 ? 'text-error-500' : 'text-success-500';
    const plusOrMinus = percentage < 0 ? '' : '+';

    return (
        <Card className="w-full">
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                <CardTitle className='text-sm text-primary-500 poppins-bold mr'>
                    {title}
                </CardTitle>
                {icon}
            </CardHeader>
            <CardContent>
                <div className='text-2xl poppins-extrabold'>{value}</div>
                <p className='poppins-medium text-xs text-muted-foreground'>
                    <span className={`${percentageColor} poppins-bold`}>{plusOrMinus}{percentage}%</span>{' '}
                    dari kemarin
                </p>
            </CardContent>
        </Card>
    );
}

export default AdminStatisticCard;
