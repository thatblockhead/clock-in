import { Session } from "@/models";

export default function SessionHistoryDisplay({ sessions }: { sessions: Session[] }) {
    const totalTime = sessions.reduce((acc, session) => acc + session.totalTime, 0);
    const totalEarnings = sessions.reduce((acc, session) => acc + (session.earnings || 0), 0);

    const formatTime = (timeInMilliseconds: number) => {
        return new Date(timeInMilliseconds).toISOString().slice(11, 19);
    };

    return (
        <div>
            <h2>Session History</h2>
            <p>Total Time Across All Sessions: {formatTime(totalTime)}</p>
            <p>Total Earnings Across All Sessions: ${totalEarnings.toFixed(2)}</p>
            <ul>
                {[...sessions].reverse().map((session, index) => (
                    <li key={index}>
                        {session.jobTitle && <p>Job Title: {session.jobTitle}</p>}
                        <p>Start Time: {new Date(session.startTime).toLocaleString()}</p>
                        <p>End Time: {session.endTime ? new Date(session.endTime).toLocaleString() : 'Ongoing'}</p>
                        <p>Session Length: {new Date(session.totalTime).toISOString().slice(11, 19)}</p>
                        {session.earnings && <p>Potential Earnings: ${session.earnings.toFixed(2)}</p>}
                    </li>
                ))}
            </ul>
        </div>
    );
}