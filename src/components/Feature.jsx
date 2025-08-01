import React from 'react';
export default function Feature({ icon, title, children }) {
  return (
    <div className="feature-item">
      <img src={icon} alt="" className="feature-icon" />
      <h3 className="feature-item-title">{title}</h3>
      <p>{children}</p>
    </div>
  );
}
