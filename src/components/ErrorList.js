import React from "react";


export default function ErrorList({errors, cssPrefix}) {
  return (
    <div className={`
      ${cssPrefix}__panel
      ${cssPrefix}__panel-danger
      ${cssPrefix}__errors
    `}>
      <div className={`${cssPrefix}__panel-heading`}>
        <h3 className="panel-title">Errors</h3>
      </div>
      <ul className="list-group">{
        errors.map((error, i) => {
          return (
            <li key={i} className="list-group-item text-danger">{
              error.stack
            }</li>
          );
        })
      }</ul>
    </div>
  );
}

