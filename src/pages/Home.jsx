// src/pages/Home.jsx
import chatIcon from '../assets/img/icon-chat_resultat.webp';
import moneyIcon from '../assets/img/icon-money_resultat.webp';
import securityIcon from '../assets/img/icon-security_resultat.webp';
import Feature from '../components/Feature';

export default function Home() {
    console.log('Home.jsx est bien rendu');
  return (
    <main>
      <div className="hero">
        <section className="hero-content">
          <h2 className="sr-only">Promoted Content</h2>
          <p className="subtitle">No fees.</p>
          <p className="subtitle">No minimum deposit.</p>
          <p className="subtitle">High interest rates.</p>
          <p className="text">Open a savings account with Argent Bank today!</p>
        </section>
      </div>

      <section className="features">
        <h2 className="sr-only">Features</h2>
        <Feature icon={chatIcon} title="You are our #1 priority">
          Need to talk to a representative? You can get in touch through our
          24/7 chat or through a phone call in less than 5 minutes.
        </Feature>
        <Feature icon={moneyIcon} title="More savings means higher rates">
          The more you save with us, the higher your interest rate will be!
        </Feature>
        <Feature icon={securityIcon} title="Security you can trust">
          We use top of the line encryption to make sure your data and money
          is always safe.
        </Feature>
      </section>
    </main>
  );
}
