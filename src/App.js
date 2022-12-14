import React, { useState, useEffect } from 'react'
import { FaAngleDoubleRight} from 'react-icons/fa'

const url = 'https://course-api.com/react-tabs-project'

function App() {
  const[loading, setLoading] = useState(true);
  const[jobs, setJobs] = useState([]);
  const[value, setValue] = useState(0);

  const fetchJobs = async () => {
    const response = await fetch(url);
    const newJobs = await response.json();
    setJobs(newJobs);
    setLoading(false);
  };
// a lifecycle method involves after mount, after update, and before unmount .
  useEffect(() => {
    fetchJobs();
  },[]);

  if(loading) {
    return (
      <section className='section loading'>
        <img src="./images/200.gif" alt="loadingpic" /> 
      </section>
    );
  }
  const {company, dates, duties, title} = jobs[value];

    return (
       <section className='section'>
         <div className='title'>
          <h1>Experience</h1>
          <div className='underline'></div>
         </div>
        <div className='jobs-center'>
          {/* btn-container */}
          <div className='btn-container'>
            {jobs.map((item, index) => {
              return (
                <button key={item.id} onClick={() => setValue(index)}
                className={`job-btn ${index === value && 'active-btn'}`}>
                  {item.company}
                </button>
              )
            })}
          </div>
          {/* job description */}
          <article className='job-info'>
            <h2>{title}</h2>
            <h3>{company}</h3>
            <p className='job-date'>{dates}</p>
            {duties.map((duty, index) => {
              return(
                <div key={index} className="job-desc">
                  <FaAngleDoubleRight className='job-icon'></FaAngleDoubleRight>
                    <p>{duty}</p>
                </div>
              );
            })}
          </article>
        </div>
       </section>
  );
};
export default App;
