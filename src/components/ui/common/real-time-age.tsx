import { useState, useEffect } from 'react';

interface RealTimeAgeProps {
  birthDate: Date;
}

export function RealTimeAge({ birthDate }: RealTimeAgeProps) {
  const calculateAge = (currentDate: Date) => {
    // Calculate actual calendar years
    let years = currentDate.getFullYear() - birthDate.getFullYear();
    
    // Create a date for this year's birthday
    const birthdayThisYear = new Date(
      currentDate.getFullYear(),
      birthDate.getMonth(),
      birthDate.getDate(),
      birthDate.getHours(),
      birthDate.getMinutes(),
      birthDate.getSeconds(),
      birthDate.getMilliseconds()
    );
    
    // If we haven't reached birthday this year yet, subtract one year
    if (currentDate < birthdayThisYear) {
      years--;
      birthdayThisYear.setFullYear(birthdayThisYear.getFullYear() - 1);
    }
    
    // Calculate time since last birthday
    const diff = currentDate.getTime() - birthdayThisYear.getTime();
    
    const days = Math.floor(diff / (24 * 60 * 60 * 1000));
    const remainderAfterDays = diff % (24 * 60 * 60 * 1000);
    
    const hours = Math.floor(remainderAfterDays / (60 * 60 * 1000));
    const remainderAfterHours = remainderAfterDays % (60 * 60 * 1000);
    
    const minutes = Math.floor(remainderAfterHours / (60 * 1000));
    const remainderAfterMinutes = remainderAfterHours % (60 * 1000);    
    const seconds = Math.floor(remainderAfterMinutes / 1000);
    const milliseconds = remainderAfterMinutes % 1000;
    
    // Format with leading zeros for consistent width
    const formattedYears = years.toString().padStart(2, '0');
    const formattedDays = days.toString().padStart(3, '0');
    const formattedHours = hours.toString().padStart(2, '0');
    const formattedMinutes = minutes.toString().padStart(2, '0');
    const formattedSeconds = seconds.toString().padStart(2, '0');
    const formattedMilliseconds = milliseconds.toString().padStart(3, '0');
    
    return `${formattedYears} years, ${formattedDays} days, ${formattedHours} hours, ${formattedMinutes} minutes, ${formattedSeconds} seconds, ${formattedMilliseconds} ms`;
  };

  // Initialize with calculated value instead of empty string
  const [age, setAge] = useState<string>(() => calculateAge(new Date()));

  useEffect(() => {
    const updateAge = () => {
      setAge(calculateAge(new Date()));
    };

    // Update frequently so milliseconds are responsive but not too heavy
    const interval = setInterval(updateAge, 50);

    return () => clearInterval(interval);
  }, [birthDate]);

  return <span className="font-mono text-sm whitespace-nowrap">{age}</span>;
}




