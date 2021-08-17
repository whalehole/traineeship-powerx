import { useEffect, useRef, useState } from 'react';

const Form = () => {
    // states
    const [jobs, setJobs] = useState([]);
    const [lastID, setlastID] = useState(0);
    // refs
    const jobTitle = useRef();
    const level = useRef();
    const department = useRef();
    const summary = useRef();
    const headcount = useRef();
    // methods
    const handleSubmit = () => {
        setlastID(lastID + 1);
        setJobs(jobs.concat({id: lastID, jobTitle: jobTitle.current.value, level: level.current.value, department: department.current.value, summary: summary.current.value, headcount: headcount.current.value}));
        jobTitle.current.value = "";
        level.current.value = "internship";
        department.current.value = "";
        summary.current.value = "";
        headcount.current.value = 1;
    }
    const handleDecrement = () => {
        if (headcount.current.value > 1) {
            headcount.current.value = parseInt(headcount.current.value) - 1;
        }
    }
    const handleIncrement = () => {
        headcount.current.value = parseInt(headcount.current.value) + 1;
    }
    const handleDelete = (id) =>{
        let jobsList = [...jobs];
        jobsList.splice(jobs.findIndex(job=>job.id === id), 1)
        setJobs(jobsList);
    }

    useEffect(()=>{
        headcount.current.value = 1;
    }, [])

    return (
        <div className="grid-container">
            <h3>Add Job Posting</h3>
            <div>
                <div>
                    <label htmlFor="submitJobTitle">Job Title</label>
                    <input ref={jobTitle} id="submitJobTitle" type="text" name="jobTitle"></input>   
                </div>
                <div>
                    <label htmlFor="submitLevel">Level</label>
                    <select ref={level} id="submitLevel" name="level">
                        <option value="internship">Internship</option>
                        <option value="fullTime">Full-time</option>
                        <option value="partTime">Part-time</option>
                        <option value="traineeship">Traineeship</option>
                        <option value="apprenticeship">Apprenticeship</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="submitDepartment">Department</label>
                    <input ref={department} id="submitDepartment" type="text" name="department"></input>
                </div>
                <div>
                    <label htmlFor="Summary">Summary</label>
                    <textarea ref={summary} id="summary" type="text" name="summary"></textarea>
                </div>
                <div>
                    <label htmlFor="submitHeadcount">Headcount</label>
                    <button onClick={handleDecrement}>-</button>
                    <input ref={headcount} id="submitHeadcount" type="number"></input>
                    <button onClick={handleIncrement}>+</button>
                </div>
            </div>
            <div>
                <button onClick={handleSubmit}>Add</button>
            </div>
            {/* jobs submitted */}
            <div>
                {jobs.map(job=>{
                    return (
                        <div key={job.id}>
                            <p><span style={{fontWeight:"bold"}}>{job.jobTitle}</span> in {job.department}</p>
                            <p>Level: {job.level.charAt(0).toUpperCase() + job.level.slice(1)}</p>
                            <p>Summary: {job.summary}</p>
                            <p>Headcount: {job.headcount}</p>
                            <button onClick={()=>{handleDelete(job.id)}}>Delete</button>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Form;