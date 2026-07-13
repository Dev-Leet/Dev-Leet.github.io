import React, { useState, useEffect } from 'react';

const Footer = () => {
  const [time, setTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const formatter = new Intl.DateTimeFormat('en-US', {
        timeZone: 'Asia/Kolkata',
        year: 'numeric',
        month: 'long',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      });
      setTime(formatter.format(now));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="text-center py-8 text-slate-500 dark:text-neutral-400 text-sm border-t border-slate-200 dark:border-neutral-800 mt-12">
      <p>© {new Date().getFullYear()} Devavrat Verma. All rights reserved.</p>
      <p className="mt-2 text-xs font-mono">{time} (IST)</p>
    </footer>
  );
};

export default Footer;
