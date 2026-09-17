import { useState } from "react";
import { Globe2, Plus } from "lucide-react";

function AddEndpoint() {
    const [url, setUrl] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!url.trim()) {
            return;
        }
        setLoading(true);
        setError("");
        try {
            const response = await fetch("/api/requests", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    url: url.trim(),
                    options: {},
                })
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.error || "Failed to add endpoint");
            }
            console.log("Endpoint added:", data);
            setUrl("");
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="rounded-xl border border-zinc-800 bg-[#0c0c0f] p-5">
            <div className="mb-4">
                <h2 className="text-sm font-semibold text-zinc-200">Add endpoint</h2>
                <p className="mt-1 text-xs text-zinc-500">Start monitoring a new URL</p>
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row">
                <div className="relative flex-1">
                    <Globe2 size={17} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500"/>
                    <input type="url" value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://example.com" className="w-full rounded-lg border border-zinc-800 bg-zinc-900/60 py-2.5 pl-10 pr-3 text-sm text-zinc-200 outline-none placeholder:text-zinc-600 focus:border-indigo-500"/>
                </div>
                <button type="submit" disabled={loading} className="flex items-center justify-center gap-2 rounded-lg bg-indigo-500 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-400 disabled:cursor-not-allowed disabled:opacity-50">
                    <Plus size={17} />
                    {loading ? "Adding..." : "Add endpoint"}
                </button>
            </form>
            {error && (
                <p className="mt-3 text-xs text-red-400">
                {error}
                </p>
            )}
        </div>
    );
}

export default AddEndpoint;