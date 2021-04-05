import React from 'react';
import FooterButton from './FooterButton';
import './footer.css';

function Footer() {
  return (
    <footer className="footer" data-testid="footer">
      <FooterButton toPage="drinks" />
      <FooterButton toPage="explore" />
      <FooterButton toPage="food" />
    </footer>
  );
}

export default Footer;
