import React from 'react';

function SocialCard({ user, review }) {
  return (
    <div className="social-card">
      <h4>{user.name}</h4>
      <p>{review}</p>
    </div>
  );
}

export default SocialCard;
