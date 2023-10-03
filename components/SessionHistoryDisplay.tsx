import { Session } from "@/models";

export default function SessionHistoryDisplay({ sessions }: { sessions: Session[] }) {
    const totalTime = sessions.reduce((acc, session) => acc + session.totalTime, 0);
    const totalEarnings = sessions.reduce((acc, session) => acc + (session.earnings || 0), 0);

    const formatTime = (timeInMilliseconds: number) => {
        return new Date(timeInMilliseconds).toISOString().slice(11, 19);
    };

    return (
        <div>
            <h2 className="text-lg mt-1 mb-3 text-center border-b">Session History</h2>
            <div className="flex text-lg mb-2 justify-between">
                <p>Total Time Across All Sessions: {formatTime(totalTime)}</p>
                <p>Total Earnings Across All Sessions: ${totalEarnings.toFixed(2)}</p>
            </div>
            <table className="table-auto w-full border-collapse border border-gray-800">
                <thead>
                    <tr>
                        <th>Session Date</th>
                        <th>Start Time</th>
                        <th>End Time</th>
                        <th>Length</th>
                        <th>Job Title</th>
                        <th>Earnings</th>
                    </tr>
                </thead>
                <tbody>
                    {[...sessions].reverse().map((session, index) => (
                        <tr key={index}>
                            <td>{new Date(session.startTime).toLocaleDateString()}</td>
                            <td>{new Date(session.startTime).toLocaleTimeString()}</td>
                            <td>{session.endTime ? new Date(session.endTime).toLocaleTimeString() : 'Ongoing'}</td>
                            <td>{formatTime(session.totalTime)}</td>
                            <td>{session.jobTitle || 'N/A'}</td>
                            <td>{session.earnings ? `$${session.earnings.toFixed(2)}` : 'N/A'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}