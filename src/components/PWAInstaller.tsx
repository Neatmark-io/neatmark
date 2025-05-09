import React, { useEffect, useState } from "react";
import { BeforeInstallPromptEvent } from "../types";

/**
 * PWAInstaller Component
 *
 * This component handles the display and triggering of the Add to Homescreen (A2HS) prompt for Progressive Web Apps.
 * It listens for the 'beforeinstallprompt' event, stores the event object, and provides a button to trigger the prompt.
 *
 * @returns {React.ReactElement} A button that, when clicked, triggers the A2HS prompt.  The button is initially visible,
 *   and the prompt is only displayed if the user hasn't previously dismissed it.
 */
const PWAInstaller: React.FC = () => {
  /**
   * State variable to store the 'beforeinstallprompt' event.
   * This event contains the prompt() method to trigger the A2HS prompt.
   * @type {BeforeInstallPromptEvent | null}
   */
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);

  /**
   * useEffect hook to add and remove the 'beforeinstallprompt' event listener.
   *
   * The event listener captures the 'beforeinstallprompt' event, prevents its default behavior (displaying the native browser prompt),
   * and stores the event object in the 'deferredPrompt' state variable.
   *
   * The cleanup function removes the event listener when the component unmounts to avoid memory leaks.
   */
  useEffect(() => {
    /**
     * Event handler for the 'beforeinstallprompt' event.
     *
     * @param {Event} e The event object.
     */
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    };
  }, []);

  /**
   * Event handler for the "Install App" button click.
   *
   * This function triggers the A2HS prompt if a 'deferredPrompt' event is stored.
   * It then handles the user's choice (accepted or dismissed) and logs the outcome to the console.
   * Finally, it clears the 'deferredPrompt' state to prevent the prompt from being triggered again.
   */
  const handleInstallClick = () => {
    if (!deferredPrompt) {
      return;
    }

    deferredPrompt.prompt();
    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === "accepted") {
        console.log("User accepted the A2HS prompt");
      } else {
        console.log("User dismissed the A2HS prompt");
      }
      setDeferredPrompt(null);
    });
  };

  return (
    <button title="Install" onClick={handleInstallClick} className="p-2 bg-blue-500 text-white rounded">
      Install App
    </button>
  );
};

export default PWAInstaller;
