import React from 'react'

export default function Progress ({completion}) {

  return (
    <div className="container">
      <div className="progress">
        <div className="progress-bar" role="progressbar" style={{width: `${completion}%`}} aria-valuenow={completion} aria-valuemin="0" aria-valuemax="100">{completion}%</div>
      </div>      
    </div>
    )
}