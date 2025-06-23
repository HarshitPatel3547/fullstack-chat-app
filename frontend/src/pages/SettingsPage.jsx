
import { useThemeStore } from "../store/useThemeStore";
import { Send, Sun, Moon } from "lucide-react";

const PREVIEW_MESSAGES = [
  { id: 1, content: "Hey! How's it going?", isSent: false },
  { id: 2, content: "I'm doing great! Just working on some new features.", isSent: true },
];

const SettingsPage = () => {
  const { theme, setTheme, toggleTheme } = useThemeStore();

  return (
    <div className="h-screen container mx-auto px-4 pt-20 max-w-5xl">
      <div className="space-y-6">
        <div className="flex flex-col gap-1">
          <h2 className="text-lg font-semibold">Theme</h2>
          <p className="text-sm text-base-content/70">Choose between light and dark mode</p>
        </div>

        {/* Theme Toggle Options */}
        <div className="flex gap-4">
          {/* Light Theme Button */}
          <button
            className={`
              flex items-center gap-3 p-4 rounded-lg border-2 transition-all
              ${theme === "light" 
                ? "border-primary bg-primary/10 text-primary" 
                : "border-base-300 hover:border-base-400"
              }
            `}
            onClick={() => setTheme("light")}
          >
            <Sun className="w-5 h-5" />
            <div className="text-left">
              <div className="font-medium">Light</div>
              <div className="text-sm opacity-70">Bright and clean</div>
            </div>
          </button>

          {/* Dark Theme Button */}
          <button
            className={`
              flex items-center gap-3 p-4 rounded-lg border-2 transition-all
              ${theme === "dark" 
                ? "border-primary bg-primary/10 text-primary" 
                : "border-base-300 hover:border-base-400"
              }
            `}
            onClick={() => setTheme("dark")}
          >
            <Moon className="w-5 h-5" />
            <div className="text-left">
              <div className="font-medium">Dark</div>
              <div className="text-sm opacity-70">Easy on the eyes</div>
            </div>
          </button>
        </div>

        {/* Quick Toggle Button */}
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium">Quick Toggle:</span>
          <button
            onClick={toggleTheme}
            className="btn btn-outline btn-sm gap-2"
          >
            {theme === "light" ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
            Switch to {theme === "light" ? "Dark" : "Light"}
          </button>
        </div>

        {/* Preview Section */}
        <div className="pt-4">
          <h3 className="text-lg font-semibold mb-3">Preview</h3>
          <div className="rounded-xl border border-base-300 overflow-hidden bg-base-100 shadow-lg">
            <div className="p-4 bg-base-200">
              <div className="max-w-lg mx-auto">
                {/* Mock Chat UI */}
                <div className="bg-base-100 rounded-xl shadow-sm overflow-hidden">
                  {/* Chat Header */}
                  <div className="px-4 py-3 border-b border-base-300 bg-base-100">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-content font-medium">
                        J
                      </div>
                      <div>
                        <h3 className="font-medium text-sm">John Doe</h3>
                        <p className="text-xs text-base-content/70">Online</p>
                      </div>
                    </div>
                  </div>

                  {/* Chat Messages */}
                  <div className="p-4 space-y-4 min-h-[200px] max-h-[200px] overflow-y-auto bg-base-100">
                    {PREVIEW_MESSAGES.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.isSent ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`
                            max-w-[80%] rounded-xl p-3 shadow-sm
                            ${message.isSent ? "bg-primary text-primary-content" : "bg-base-200"}
                          `}
                        >
                          <p className="text-sm">{message.content}</p>
                          <p
                            className={`
                              text-[10px] mt-1.5
                              ${message.isSent ? "text-primary-content/70" : "text-base-content/70"}
                            `}
                          >
                            12:00 PM
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Chat Input */}
                  <div className="p-4 border-t border-base-300 bg-base-100">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        className="input input-bordered flex-1 text-sm h-10"
                        placeholder="Type a message..."
                        value="This is a preview"
                        readOnly
                      />
                      <button className="btn btn-primary h-10 min-h-0">
                        <Send size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;