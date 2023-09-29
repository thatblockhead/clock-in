export type Session = {
    startTime: number;
    endTime: number;
    totalTime: number;
    jobTitle?: string;
    earnings?: number;
};

export type Job = {
    title: string;
    wage: number;
}