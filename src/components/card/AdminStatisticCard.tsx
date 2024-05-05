import StatisticProps from "@/interface/props/StatisticProps";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { easeInOut, motion } from "framer-motion";

function AdminStatisticCard(props: StatisticProps) {
    const { title, icon, value, percentage } = props;

    const percentageColor = percentage < 0 ? 'text-error-500' : 'text-success-500';
    const plusOrMinus = percentage < 0 ? '' : '+';

    return (
        <motion.div
            initial={{
                opacity: 0,
                y: 50
            }}
            whileInView={{
                opacity: 1,
                y: 0,
                transition: {
                duration: 0.5,
                ease: easeInOut
                }
            }}
            viewport={{once: true}}  
            className='w-full'
        >
            <Card className="w-full">
                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                    <CardTitle className='text-sm text-primary-500 poppins-extrabold mr'>
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
        </motion.div>
    );
}

export default AdminStatisticCard;
