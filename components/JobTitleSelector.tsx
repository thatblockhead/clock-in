"use client"

import { useState } from "react";
import { Job } from "@/models";

const jobData = import("../national_median_hourly_wages.json");

type JobTitleSelectorProps = {
    selectedJob: Job | null;
    setSelectedJob: React.Dispatch<React.SetStateAction<Job | null>>;
  };
  
  export default function JobTitleSelector({ selectedJob, setSelectedJob }: JobTitleSelectorProps) {
    const [query, setQuery] = useState<string>("");
    const [suggestions, setSuggestions] = useState<any[]>([]);
    const [editable, setEditable] = useState<boolean>(false);

    const handleQueryChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const newQuery = e.target.value;
        setQuery(newQuery);

        if (newQuery.length > 4) {
            const data = (await jobData).default;
            const filtered = data.filter((job: any) => job.OCC_TITLE.toLowerCase().includes(newQuery.toLowerCase()));
            setSuggestions(filtered);
        } else {
            setSuggestions([]);
        }
    };

    const handleJobSelect = (job: any) => {
        setSelectedJob({ title: job.OCC_TITLE, wage: job.H_MEDIAN });
        setQuery("");
        setSuggestions([]);
        setEditable(true);
    };

    const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement>, field: "title" | "wage") => {
        if (selectedJob) {
            setSelectedJob({ ...selectedJob, [field]: e.target.value });
        }
    };

    return (
        <div>
            <h1>Select a job title</h1>
            <label htmlFor="jobSearch">Search Job Title: </label>
            <input 
                className="bg-black text-white border border-gray-500" 
                type="text" 
                value={query} 
                onChange={handleQueryChange} 
                placeholder="Search job titles..." />
            {suggestions.length > 0 && (
                <div>
                    {suggestions.map((job, index) => (
                        <div key={index} onClick={() => handleJobSelect(job)}>
                            {job.OCC_TITLE}
                        </div>
                    ))}
                </div>
            )}
            {selectedJob && (
                <div>
                    {editable ? (
                        <>
                            <input
                                className="bg-black text-white border border-gray-500"
                                type="text"
                                value={selectedJob.title}
                                onChange={(e) => handleFieldChange(e, "title")}
                            />
                            <input
                                className="bg-black text-white border border-gray-500"
                                type="text"
                                value={selectedJob.wage}
                                onChange={(e) => handleFieldChange(e, "wage")}
                            />
                        </>
                    ) : (
                        <>
                            <span>{`Selected Job: ${selectedJob.title}`}</span>
                            <span>{`Median Hourly Wage: ${isNaN(Number(selectedJob.wage)) ? "Not available" : selectedJob.wage}`}</span>
                        </>
                    )}
                    {isNaN(Number(selectedJob.wage)) && <div>Wage data is not available. Please enter manually.</div>}
                </div>
            )}
        </div>
    );
};