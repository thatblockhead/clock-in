import { Session } from "@/models";

export default function SessionHistoryDisplay({ sessions }: { sessions: Session[] }) {
    return (
        <div>
            <h2>Session History</h2>
            <ul>
                {[...sessions].reverse().map((session, index) => (
                    <li key={index}>
                        <p>Start Time: {new Date(session.startTime).toLocaleString()}</p>
                        <p>End Time: {session.endTime ? new Date(session.endTime).toLocaleString() : 'Ongoing'}</p>
                        <p>Total Time: {new Date(session.totalTime).toISOString().slice(11, 19)}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}