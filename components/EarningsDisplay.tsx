type EarningsDisplayProps = {
    wage: string | number;
    time: number;
};

export default function EarningsDisplay({ wage, time }: EarningsDisplayProps) {
    const hourlyWage = typeof wage === 'number' ? wage : 0;
    const earningsMessage = `Potential Earnings: $${((time / 3600) * hourlyWage).toFixed(2)}`;

    return <p>{earningsMessage}</p>;
}