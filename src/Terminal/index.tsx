import './terminal.css';
import {ForwardedRef, forwardRef, useCallback, useEffect, useRef, useState} from "react";
import {TerminalProps} from "./types";


export const Terminal = forwardRef(
  (props: TerminalProps, ref: ForwardedRef<HTMLDivElement>) => {
    const {
      history = [],
      promptLabel = '>',

      commands = {},
    } = props;

    const inputRef = useRef<HTMLInputElement>();
    const [input, setInputValue] = useState<string>('');

    /**
     * Focus on the input whenever we render the terminal or click in the terminal
     */
    useEffect(() => {
      inputRef.current?.focus();
    });

    const focusInput = useCallback(() => {
      inputRef.current?.focus();
    }, []);


    /**
     * When user types something, we update the input value
     */
    const handleInputChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
      },
      []
    );


    const targetDate: Date = new Date('2023-10-01T00:00:00Z'); // October 1st, 2023
    const [timeRemaining, setTimeRemaining] = useState(calculateTimeRemaining());
  
    // Function to calculate the time remaining
    function calculateTimeRemaining() {
      const now: Date = new Date();
      const timeDifference: number = targetDate.getTime() - now.getTime();
  
      if (timeDifference <= 0) {
        // The target date has passed
        return {
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0
        };
      }
  
      const days: number = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
      const hours: number = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes: number = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds: number = Math.floor((timeDifference % (1000 * 60)) / 1000);
  
      return {
        days,
        hours,
        minutes,
        seconds
      };
    }
  
    // Update the time remaining every second
    useEffect(() => {
      const intervalId: NodeJS.Timeout = setInterval(() => {
        setTimeRemaining(calculateTimeRemaining());
      }, 1000);
  
      // Cleanup the interval on unmount
      return () => clearInterval(intervalId);
    }, []);
  

    /**
     * When user presses enter, we execute the command
     */
    const handleInputKeyDown = useCallback(
      (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
          const commandToExecute = commands?.[input.toLowerCase()];
          if (commandToExecute) {
            commandToExecute?.();
          }
          setInputValue('');
        }
      },
      [commands, input]
    );

    return (
      <div>
    <div className="terminal" ref={ref} onClick={focusInput}>
    <span className="terminal__prompt__label">This site will be available in : </span>
            {timeRemaining.days} Days, {timeRemaining.hours} Hourse, {timeRemaining.minutes} Minutes, {timeRemaining.seconds} Seconds
    
      {history.map((line, index) => (
        <div className="terminal__line" key={`terminal-line-${index}-${line}`}>
               {line}
        </div>
      ))}
      <div className="terminal__prompt">
        <div className="terminal__prompt__label">{promptLabel}</div>
        <div className="terminal__prompt__input">
          <input
            type="text"
            value={input}
            onKeyDown={handleInputKeyDown}
            onChange={handleInputChange}
            // @ts-ignore
            ref={inputRef}
          />
        </div>
      </div>
    </div>
    </div>
  );
});