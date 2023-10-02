"use client"

import { useState } from "react";
import { Job } from "@/models";

const wageData = import("../national_median_hourly_wages.json");

type JobTitleSelectorProps = {
    selectedJob: Job | null;
    setSelectedJob: React.Dispatch<React.SetStateAction<Job | null>>;
};

export default function JobTitleSelector({ selectedJob, setSelectedJob }: JobTitleSelectorProps) {
    const [query, setQuery] = useState<string>("");
    const [showSearch, setShowSearch] = useState<boolean>(false);
    const [suggestions, setSuggestions] = useState<any[]>([]);
    const [jobData, setJobData] = useState<Job | null>(null);

    const handleQueryChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const newQuery = e.target.value;
        setQuery(newQuery);

        if (newQuery.length > 4) {
            const data = (await wageData).default;
            const filtered = data.filter((job: any) => job.OCC_TITLE.toLowerCase().includes(newQuery.toLowerCase()));
            setSuggestions(filtered);
        } else {
            setSuggestions([]);
        }
    };

    const handleJobSelect = (job: any) => {
        setJobData({ title: job.OCC_TITLE, wage: parseFloat(job.H_MEDIAN) || 0 });
        setQuery("");
        setSuggestions([]);
    };

    const handleSave = () => {
        if (jobData && !isNaN(Number(jobData.wage))) {
            setSelectedJob(jobData);
            localStorage.setItem("selectedJob", JSON.stringify(jobData));
            setJobData(null);
        }
    };

    const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement>, field: "title" | "wage") => {
        let value: string | number = e.target.value;
        if (field === "wage") {
            value = parseFloat(value);
        }
        if (jobData) {
            setJobData({ ...jobData, [field]: value });
        }
    };

    return (
        <div>
            {selectedJob ? (
                <div>
                    <span>{`Selected Job: ${selectedJob.title}`}</span>
                    <span>{`Median Hourly Wage: ${isNaN(Number(selectedJob.wage)) ? "Not available" : selectedJob.wage}`}</span>
                    <button onClick={() => setSelectedJob(null)}>Change</button>
                </div>
            ) : (
                <>
                    {!showSearch && (
                        <button 
                            onClick={() => setShowSearch(true)}
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        >
                            Select a job title
                        </button>
                    )}
                    {showSearch && (
                        <>
                            <label htmlFor="jobSearch">Search Job Title: </label>
                            <input
                                className="bg-black text-white border border-gray-500"
                                type="text"
                                value={query}
                                onChange={handleQueryChange}
                                placeholder="Search job titles..."
                            />
                            {suggestions.length > 0 && (
                                <div>
                                    {suggestions.map((job, index) => (
                                        <div key={index} onClick={() => handleJobSelect(job)}>
                                            {job.OCC_TITLE}
                                        </div>
                                    ))}
                                </div>
                            )}
                            {jobData && (
                                <div>
                                    <input
                                        className="bg-black text-white border border-gray-500"
                                        type="text"
                                        value={jobData.title}
                                        onChange={(e) => handleFieldChange(e, "title")}
                                    />
                                    <input
                                        className="bg-black text-white border border-gray-500"
                                        type="number"
                                        value={jobData.wage}
                                        onChange={(e) => handleFieldChange(e, "wage")}
                                    />
                                    {jobData.wage === 0 && (
                                        <div className="text-red-500">
                                            No wage data found. Please enter manually.
                                        </div>
                                    )}
                                    <button onClick={handleSave}>Save</button>
                                </div>
                            )}
                        </>
                    )}
                </>
            )}
        </div>
    );    
};