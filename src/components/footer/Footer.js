import React from 'react';

function Footer(props) {
  return (
    <footer>
      <div
        style={{
          width: '100%',
          backgroundColor: '#5FAD56',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          color: 'rgba(255, 255, 255, 0.75)'
        }}
      >
        <div
          style={{
            margin: 'auto',
            width: '100%'
          }}
        >
          {/* <hr /> */}
          <p
            style={{
              fontSize: '18px',
              textAlign: 'center',
              fontWeight: '500',
              color: '#000'
            }}
          >
            © 2019 KMSJamu <br />
            Knowledge Management System Jamu
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
