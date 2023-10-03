type EarningsDisplayProps = {
    wage: string | number;
    time: number;
};

export default function EarningsDisplay({ wage, time }: EarningsDisplayProps) {
    const hourlyWage = typeof wage === 'number' ? wage : 0;
    const earnings = ((time / 3600) * hourlyWage).toFixed(2);

    return (
        <p className="text-xl">
            Potential Earnings: ${""}
            <span className="font-bold text-green-600">{earnings}</span>
        </p>
    );
}