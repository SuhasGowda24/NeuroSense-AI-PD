import React, { useEffect } from 'react';

const ChatPage = () => {
  useEffect(() => {
    // Check if the script is already loaded to avoid duplicates
    if (!window.chatbase || window.chatbase("getState") !== "initialized") {
      window.chatbase = (...args) => {
        if (!window.chatbase.q) {
          window.chatbase.q = [];
        }
        window.chatbase.q.push(args);
      };
      window.chatbase = new Proxy(window.chatbase, {
        get(target, prop) {
          if (prop === "q") {
            return target.q;
          }
          return (...args) => target(prop, ...args);
        }
      });

      const onLoad = function() {
        const script = document.createElement("script");
        script.src = "https://www.chatbase.co/embed.min.js";
        script.id = "fRW7lC9kjy6f6BXOoHJzV";
        script.domain = "www.chatbase.co";
        document.body.appendChild(script);
      };

      if (document.readyState === "complete") {
        onLoad();
      } else {
        window.addEventListener("load", onLoad);
      }
    }
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-4xl p-4">
        <h1 className="text-2xl font-bold text-center mb-4">Chat with Us</h1>
        <div id="chat-container" className="w-full h-96 bg-white rounded-lg shadow-lg">
          {/* The Chatbase widget will be injected here */}
        </div>
      </div>
    </div>
  );
};

export default ChatPage;


