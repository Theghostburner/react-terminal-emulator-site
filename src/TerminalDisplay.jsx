import React, { useEffect, useMemo, useState } from 'react';
import { Terminal } from "./Terminal";
import { useTerminal } from "./Terminal/hooks";

export default function TerminalDisplay(){


    const {
        history,
        pushToHistory,
        setTerminalRef,
        resetTerminal,
      } = useTerminal();
    
      useEffect(() => {
        resetTerminal();

          
    
    
          pushToHistory(
            <>
              <div>
                <strong>You have discovered the future of tech learing! </strong> Currently this site is under construction, but we'll text you on launch, how? just follow along
              </div>
              <br />
              <br />
              <div>Type "more" to learn more and "enroll" to sign-up for beta testing!</div>
            </>
          );
      
      }, []);
    
      const commands = useMemo(() => ({
        'more': async () => {
          await pushToHistory(<>
            <div>
              <strong>We are building world's first AI based tech learning platform</strong> which lets you learn anything tech be it React, Deployment, Backend or even Full stack. <span style={{ color: 'green' }}></span>
            </div>
          </>);
        },
        'enroll': async () => {
          alert('You will be re-directed to google forms!');
          await pushToHistory(<>
            <div>
              <strong>Beta Test user detected!!</strong>
              <span style={{ color: 'orange', marginLeft: 10 }}>
                <strong>Congrats! , you have enrolled in our beta test, we'll mail you the details</strong>
              </span>
            </div>
          </>);
        },
      }), [pushToHistory]);
    
      return (
        <div className="App">
          <Terminal
            history={history}
            ref={setTerminalRef}
            promptLabel={<>$ skille/tech:</>}
            commands={commands}
          />
        </div>
      );
}