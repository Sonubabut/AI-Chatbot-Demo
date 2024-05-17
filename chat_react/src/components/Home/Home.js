import React from 'react';
import { Link } from 'react-router-dom'; // Assuming you're using React Router
import './Home.css';

const greetings = ["Welcome", "Hello", "Hi", "Hey"];
const precomputedGreetings = Array.from({ length: 100 }, () => {
  const randomIndex = crypto.getRandomValues(new Uint32Array(1))[0] % greetings.length;
  return {
    text: greetings[randomIndex],
    style: `home-container hero h1 ${randomIndex % 2 === 0 ? 'even' : 'odd'}`,
  };
});

const Home = () => {
  const randomGreeting = React.useMemo(() => {
    const index = Math.floor(Math.random() * precomputedGreetings.length);
    return precomputedGreetings[index];
  }, []);

  return (
    <div className={randomGreeting.style}>
      <div className="hero">
        <h1>{randomGreeting.text}, to the Future of AI!</h1>
        <p>Unlock the power of Artificial Intelligence and discover new possibilities</p>
      </div>
      <div className="animated-image-container">
        <div className="animated-image" />
      </div>
      <div className="call-to-action">
        <Link to="/explore" className="explore-button">Explore More</Link>
        <p>Start your AI journey today!</p>
      </div>
    </div>
  );
};

export default Home;