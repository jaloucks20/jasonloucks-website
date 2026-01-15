import { useState } from "react";
import { send } from "@emailjs/browser";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", company: "", message: "", _gotcha: "" });
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState(null); // { type: 'success' | 'error', message: string }

  const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

  const handleChange = (e) => setForm((s) => ({ ...s, [e.target.name]: e.target.value }));

  function validate() {
    if (!form.name.trim()) return "Please enter your name.";
    if (!form.email.trim()) return "Please enter your email.";
    // simple email regex
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) return "Please enter a valid email address.";
    if (!form.message.trim()) return "Please include a message.";
    if (form._gotcha) return "Spam detected."; // honeypot
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus(null);

    if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
      setStatus({ type: "error", message: "Email service is not configured. See README for setup steps." });
      return;
    }

    const error = validate();
    if (error) {
      setStatus({ type: "error", message: error });
      return;
    }

    setSending(true);
    try {
      const templateParams = {
        from_name: form.name,
        from_email: form.email,
        company: form.company,
        message: form.message,
      };

      await send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY);
      setStatus({ type: "success", message: "Message sent — thank you!" });
      setForm({ name: "", email: "", company: "", message: "", _gotcha: "" });
    } catch (err) {
      console.error("Email send error:", err);
      setStatus({ type: "error", message: "Something went wrong sending the message. Try again later." });
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold font-vscode text-white mb-4">Contact Me</h2>

        {!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY ? (
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
            <p className="text-yellow-700">The contact form is not configured. Please set <code>VITE_EMAILJS_SERVICE_ID</code>, <code>VITE_EMAILJS_TEMPLATE_ID</code>, and <code>VITE_EMAILJS_PUBLIC_KEY</code> in your environment and restart the dev server.</p>
          </div>
        ) : null}

        <form onSubmit={handleSubmit} className="bg-gray-900/50 p-8 rounded-lg shadow-md" noValidate>
          <input type="text" name="_gotcha" value={form._gotcha} onChange={handleChange} style={{ display: "none" }} tabIndex="-1" autoComplete="off" />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <label className="block">
              <span className="text-sm text-gray-300">Name</span>
              <input required name="name" value={form.name} onChange={handleChange} className="mt-1 block w-full rounded-md bg-gray-800 border border-gray-700 text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
            </label>

            <label className="block">
              <span className="text-sm text-gray-300">Email</span>
              <input required type="email" name="email" value={form.email} onChange={handleChange} className="mt-1 block w-full rounded-md bg-gray-800 border border-gray-700 text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
            </label>
          </div>

          <label className="block mt-4">
            <span className="text-sm text-gray-300">Company <span className="text-gray-500">(optional)</span></span>
            <input name="company" value={form.company} onChange={handleChange} className="mt-1 block w-full rounded-md bg-gray-800 border border-gray-700 text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
          </label>

          <label className="block mt-4">
            <span className="text-sm text-gray-300">Message</span>
            <textarea required name="message" value={form.message} onChange={handleChange} rows="6" className="mt-1 block w-full rounded-md bg-gray-800 border border-gray-700 text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"></textarea>
          </label>

            <div className="mt-6 flex items-center justify-between">
                {status ? (
                    <p
                    className={`${status.type === "success" ? "text-sky-500" : "text-red-400"}`}
                    >
                    {status.message}
                    </p>
                ) : (
                    <span /> /* keeps button on the right when no status */
                )}

                <button
                    type="submit"
                    disabled={sending}
                    className="inline-flex items-center px-6 py-2 bg-blue-800/70 hover:bg-blue-800/80 text-white font-semibold rounded-md disabled:opacity-50"
                >
                    {sending ? "Sending…" : "Send Message"}
                </button>
            </div>
        </form>
      </div>
    </section>
  );
}